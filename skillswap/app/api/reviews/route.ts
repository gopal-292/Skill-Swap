import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { rating, comment, skillId, sessionId, revieweeId } = await req.json()

  if (!rating || !skillId || !sessionId || !revieweeId) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  // Verify session exists and reviewer was a participant
  const bookedSession = await prisma.session.findUnique({ where: { id: sessionId } })
  if (!bookedSession) return NextResponse.json({ error: 'Session not found' }, { status: 404 })
  if (bookedSession.learnerId !== session.user.id && bookedSession.teacherId !== session.user.id) {
    return NextResponse.json({ error: 'Not a participant' }, { status: 403 })
  }

  const review = await prisma.review.create({
    data: {
      rating,
      comment,
      skillId,
      sessionId,
      reviewerId: session.user.id,
      revieweeId,
    },
  })

  // Update skill rating
  const allReviews = await prisma.review.findMany({ where: { skillId } })
  const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length

  await prisma.skill.update({
    where: { id: skillId },
    data: { rating: avgRating, reviewCount: allReviews.length },
  })

  return NextResponse.json(review, { status: 201 })
}
