import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { skillId, scheduledAt, duration, notes } = await req.json()

  if (!skillId || !scheduledAt) {
    return NextResponse.json({ error: 'Skill and scheduled time required' }, { status: 400 })
  }

  // Get skill and check learner isn't the teacher
  const skill = await prisma.skill.findUnique({
    where: { id: skillId },
    include: { teacher: true },
  })

  if (!skill) return NextResponse.json({ error: 'Skill not found' }, { status: 404 })
  if (skill.teacherId === session.user.id) {
    return NextResponse.json({ error: 'Cannot book your own skill' }, { status: 400 })
  }

  // Check learner has enough credits
  const learner = await prisma.user.findUnique({ where: { id: session.user.id } })
  if (!learner || learner.timeCredits < 1) {
    return NextResponse.json({ error: 'Insufficient time credits' }, { status: 400 })
  }

  // Create session and deduct credit atomically
  const [newSession] = await prisma.$transaction([
    prisma.session.create({
      data: {
        skillId,
        teacherId: skill.teacherId,
        learnerId: session.user.id,
        scheduledAt: new Date(scheduledAt),
        duration: duration || 60,
        notes,
        credits: 1,
        status: 'confirmed',
      },
    }),
    prisma.user.update({
      where: { id: session.user.id },
      data: { timeCredits: { decrement: 1 }, totalSpent: { increment: 1 } },
    }),
    prisma.transaction.create({
      data: {
        fromUserId: session.user.id,
        toUserId: skill.teacherId,
        skillId,
        credits: 1,
        transactionType: 'booking',
        description: `Booked: ${skill.title}`,
      },
    }),
  ])

  // Notify teacher
  await prisma.notification.create({
    data: {
      userId: skill.teacherId,
      type: 'booking',
      title: 'New Session Booked!',
      message: `${learner.name} has booked a session for "${skill.title}"`,
    },
  })

  return NextResponse.json(newSession, { status: 201 })
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const sessions = await prisma.session.findMany({
    where: {
      OR: [
        { teacherId: session.user.id },
        { learnerId: session.user.id },
      ],
    },
    include: {
      skill: { select: { id: true, title: true, category: true } },
      teacher: { select: { id: true, name: true, avatar: true } },
      learner: { select: { id: true, name: true, avatar: true } },
    },
    orderBy: { scheduledAt: 'asc' },
  })

  return NextResponse.json(sessions)
}
