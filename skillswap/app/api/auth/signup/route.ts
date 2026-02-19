import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
  try {
    const { email, password, name } = await req.json()

    if (!email || !password || !name) {
      return NextResponse.json({ error: 'All fields required' }, { status: 400 })
    }

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ error: 'Email already in use' }, { status: 409 })
    }

    const hashed = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashed,
        timeCredits: 5,
      },
    })

    // Log starter bonus transaction
    await prisma.transaction.create({
      data: {
        fromUserId: user.id,
        toUserId: user.id,
        credits: 5,
        transactionType: 'starter_bonus',
        description: 'Welcome! 5 starter credits to begin your learning journey.',
      },
    })

    return NextResponse.json(
      { message: 'Account created successfully', userId: user.id },
      { status: 201 }
    )
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Unknown error'
    console.error('[signup error]', msg, error)
    return NextResponse.json(
      { error: process.env.NODE_ENV === 'development' ? msg : 'Internal server error' },
      { status: 500 }
    )
  }
}
