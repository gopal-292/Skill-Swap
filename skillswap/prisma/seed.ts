// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PrismaClient } = require('@prisma/client')
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create users
  const teacherPassword = await bcrypt.hash('Demo@123', 10)
  const learnerPassword = await bcrypt.hash('Demo@123', 10)

  const teacher = await prisma.user.upsert({
    where: { email: 'teacher@skillswap.demo' },
    update: {},
    create: {
      email: 'teacher@skillswap.demo',
      name: 'Priya Sharma',
      password: teacherPassword,
      bio: 'Full-stack developer with 6 years of experience. Passionate about Python and web development.',
      location: 'Mumbai, Maharashtra',
      timeCredits: 18,
      totalEarned: 13,
      streak: 28,
    },
  })

  const learner = await prisma.user.upsert({
    where: { email: 'learner@skillswap.demo' },
    update: {},
    create: {
      email: 'learner@skillswap.demo',
      name: 'Aryan Gupta',
      password: learnerPassword,
      bio: 'Eager learner. Love coding and music.',
      location: 'Delhi',
      timeCredits: 4,
      totalSpent: 1,
      streak: 5,
    },
  })

  // Create starter bonus transactions
  await prisma.transaction.upsert({
    where: { id: 'starter-teacher' },
    update: {},
    create: {
      id: 'starter-teacher',
      fromUserId: teacher.id,
      toUserId: teacher.id,
      credits: 5,
      transactionType: 'starter_bonus',
      description: 'Welcome starter credits',
    },
  })

  await prisma.transaction.upsert({
    where: { id: 'starter-learner' },
    update: {},
    create: {
      id: 'starter-learner',
      fromUserId: learner.id,
      toUserId: learner.id,
      credits: 5,
      transactionType: 'starter_bonus',
      description: 'Welcome starter credits',
    },
  })

  // Create skills
  const skills = [
    { title: 'Python for Beginners', description: 'Learn programming fundamentals with Python. No experience needed! Cover variables, loops, functions, OOP, and build 3 real projects.', category: 'coding', level: 'beginner', rating: 4.9, reviewCount: 127, sessionCount: 340, teacherId: teacher.id },
    { title: 'Data Science with Python', description: 'Pandas, Matplotlib, Scikit-Learn. Real datasets and machine learning projects.', category: 'coding', level: 'advanced', rating: 4.9, reviewCount: 112, sessionCount: 290, teacherId: teacher.id },
    { title: 'React & Next.js Development', description: 'Build modern full-stack web apps. Learn hooks, routing, API integration, and deployment.', category: 'coding', level: 'intermediate', rating: 4.8, reviewCount: 91, sessionCount: 267, teacherId: teacher.id },
  ]

  for (const s of skills) {
    await prisma.skill.create({ data: s }).catch(() => null) // Ignore if already exists
  }

  // Create badges
  const badges = [
    { id: 'badge-first', name: 'First Step', description: 'Completed first session', icon: '🌱', condition: '{"type":"sessions","threshold":1}' },
    { id: 'badge-fire', name: 'On Fire', description: '7-day learning streak', icon: '🔥', condition: '{"type":"streak","threshold":7}' },
    { id: 'badge-star', name: 'Top Rated', description: 'Received 5-star review', icon: '⭐', condition: '{"type":"rating","threshold":5}' },
    { id: 'badge-champ', name: 'Champion', description: 'Earned 50 credits', icon: '🏆', condition: '{"type":"credits","threshold":50}' },
  ]

  for (const b of badges) {
    await prisma.badge.upsert({ where: { id: b.id }, update: {}, create: b })
  }

  console.log('✅ Seed complete!')
  console.log('📧 Demo accounts:')
  console.log('   Teacher: teacher@skillswap.demo / Demo@123')
  console.log('   Learner: learner@skillswap.demo / Demo@123')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
