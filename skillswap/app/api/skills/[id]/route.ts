import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const skill = await prisma.skill.findUnique({
    where: { id: params.id },
    include: {
      teacher: {
        select: {
          id: true,
          name: true,
          avatar: true,
          bio: true,
          location: true,
          timeCredits: true,
          totalEarned: true,
          streak: true,
          _count: { select: { skillsTeaching: true, sessionsAsTeacher: true } },
        },
      },
      reviews: {
        include: {
          reviewer: { select: { id: true, name: true, avatar: true } },
        },
        orderBy: { createdAt: 'desc' },
        take: 10,
      },
      _count: { select: { reviews: true, sessions: true } },
    },
  })

  if (!skill) {
    return NextResponse.json({ error: 'Skill not found' }, { status: 404 })
  }

  return NextResponse.json(skill)
}
