import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const user = await prisma.user.findUnique({
    where: { id: params.id },
    select: {
      id: true,
      name: true,
      timeCredits: true,
      totalEarned: true,
      totalSpent: true,
      transactionsFrom: {
        orderBy: { createdAt: 'desc' },
        take: 20,
        include: { toUser: { select: { name: true } } },
      },
      transactionsTo: {
        orderBy: { createdAt: 'desc' },
        take: 20,
        include: { fromUser: { select: { name: true } } },
      },
    },
  })

  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  return NextResponse.json(user)
}
