import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// Complete a session - pays teacher
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const booked = await prisma.session.findUnique({
    where: { id: params.id },
    include: { skill: true },
  })

  if (!booked) return NextResponse.json({ error: 'Session not found' }, { status: 404 })
  if (booked.teacherId !== session.user.id) {
    return NextResponse.json({ error: 'Only teacher can complete session' }, { status: 403 })
  }
  if (booked.status === 'completed') {
    return NextResponse.json({ error: 'Session already completed' }, { status: 400 })
  }

  await prisma.$transaction([
    prisma.session.update({
      where: { id: params.id },
      data: { status: 'completed' },
    }),
    prisma.user.update({
      where: { id: booked.teacherId },
      data: { timeCredits: { increment: 1 }, totalEarned: { increment: 1 } },
    }),
    prisma.transaction.create({
      data: {
        fromUserId: booked.learnerId,
        toUserId: booked.teacherId,
        sessionId: params.id,
        credits: 1,
        transactionType: 'earning',
        description: `Completed: ${booked.skill.title}`,
      },
    }),
    prisma.notification.create({
      data: {
        userId: booked.learnerId,
        type: 'credit',
        title: 'Session Completed',
        message: `Your session "${booked.skill.title}" is complete! Please leave a review.`,
      },
    }),
  ])

  return NextResponse.json({ message: 'Session completed, credit transferred' })
}
