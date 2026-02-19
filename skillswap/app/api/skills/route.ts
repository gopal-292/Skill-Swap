import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const category = searchParams.get('category')
  const level = searchParams.get('level')
  const search = searchParams.get('search')
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '12')

  const where: Record<string, unknown> = { isActive: true }
  if (category && category !== 'all') where.category = category
  if (level && level !== 'all') where.level = level
  if (search) {
    where.OR = [
      { title: { contains: search } },
      { description: { contains: search } },
    ]
  }

  const [skills, total] = await Promise.all([
    prisma.skill.findMany({
      where,
      include: {
        teacher: { select: { id: true, name: true, avatar: true, location: true } },
        _count: { select: { reviews: true, sessions: true } },
      },
      orderBy: { rating: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.skill.count({ where }),
  ])

  return NextResponse.json({ skills, total, page, limit })
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { title, description, category, level, tags } = await req.json()

  if (!title || !description || !category) {
    return NextResponse.json({ error: 'Title, description, and category are required' }, { status: 400 })
  }

  const skill = await prisma.skill.create({
    data: {
      title,
      description,
      category,
      level: level || 'beginner',
      tags: tags ? JSON.stringify(tags) : null,
      teacherId: session.user.id,
    },
    include: { teacher: { select: { id: true, name: true, avatar: true } } },
  })

  return NextResponse.json(skill, { status: 201 })
}
