'use client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
import { Clock, Star, BookOpen, Award, TrendingUp, Calendar, ArrowRight, Flame } from 'lucide-react'

const BADGES = [
  { icon: '🌱', name: 'First Step', desc: 'Completed first session', earned: true },
  { icon: '🔥', name: 'On Fire', desc: '7-day learning streak', earned: true },
  { icon: '⭐', name: 'Top Rated', desc: 'Received 5-star review', earned: true },
  { icon: '🏆', name: 'Champion', desc: 'Earned 50 credits', earned: false },
  { icon: '🌍', name: 'World Teacher', desc: 'Taught 100 sessions', earned: false },
  { icon: '💎', name: 'Diamond', desc: 'Earned 200 credits', earned: false },
]

const UPCOMING = [
  { skill: 'Python for Beginners', teacher: 'Priya Sharma', date: 'Today, 6:00 PM', type: 'learning', status: 'confirmed' },
  { skill: 'Guitar Basics', teacher: 'Rohan Mehta', date: 'Tomorrow, 10:00 AM', type: 'learning', status: 'confirmed' },
  { skill: 'Web Development', teacher: 'You (Teaching)', date: 'Fri, 4:00 PM', type: 'teaching', status: 'pending' },
]

const TRANSACTIONS = [
  { type: 'spent', amount: 1, desc: 'Booked: Python for Beginners', date: '2 hrs ago' },
  { type: 'earned', amount: 1, desc: 'Completed: Spanish Conversation', date: 'Yesterday' },
  { type: 'bonus', amount: 5, desc: 'Starter bonus — Welcome!', date: '3 days ago' },
  { type: 'spent', amount: 1, desc: 'Booked: Yoga & Mindfulness', date: '4 days ago' },
]

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/auth/signin')
  }, [status, router])

  if (status === 'loading') {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div style={{ width: 40, height: 40, border: '3px solid var(--border)', borderTopColor: 'var(--accent-violet)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
      </div>
    )
  }

  const name = session?.user?.name || 'Learner'

  return (
    <div style={{ minHeight: '100vh', paddingTop: '88px', paddingBottom: '4rem' }}>
      <div className="page-container">
        {/* Greeting */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h1 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}>
            Welcome back, <span className="gradient-text">{name.split(' ')[0]}</span> 👋
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Here&apos;s your learning overview for today.</p>
        </div>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
          {[
            { icon: <Clock size={22} />, label: 'Time Credits', value: '5', color: 'var(--accent-violet)', desc: 'Available to spend' },
            { icon: <TrendingUp size={22} />, label: 'Credits Earned', value: '6', color: '#00e676', desc: 'From teaching' },
            { icon: <BookOpen size={22} />, label: 'Sessions Done', value: '3', color: '#64b5f6', desc: 'Total completed' },
            { icon: <Flame size={22} />, label: 'Learning Streak', value: '7', color: '#ff8a65', desc: 'Days in a row' },
          ].map((stat, i) => (
            <div key={i} className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ width: 50, height: 50, borderRadius: 14, background: `${stat.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: stat.color, flexShrink: 0 }}>
                {stat.icon}
              </div>
              <div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'Outfit', color: stat.color }}>{stat.value}</div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{stat.label}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>{stat.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '1.5rem' }} className="dash-grid">
          {/* Left column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Upcoming Sessions */}
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.1rem' }}>Upcoming Sessions</h2>
                <Link href="/marketplace" className="btn-outline" style={{ padding: '0.4rem 0.9rem', fontSize: '0.82rem' }}>
                  Find Skills <ArrowRight size={13} />
                </Link>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {UPCOMING.map((s, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'var(--bg-card)', borderRadius: 14, border: '1px solid var(--border)' }}>
                    <div>
                      <div style={{ fontWeight: 600, marginBottom: '0.2rem' }}>{s.skill}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>{s.teacher}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.3rem', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                        <Calendar size={12} /> {s.date}
                      </div>
                    </div>
                    <div>
                      <span style={{
                        background: s.type === 'teaching' ? 'rgba(0, 229, 255, 0.1)' : 'rgba(155, 111, 247, 0.1)',
                        color: s.type === 'teaching' ? '#00e5ff' : 'var(--accent-violet)',
                        borderRadius: 8, padding: '0.3rem 0.75rem', fontSize: '0.78rem', fontWeight: 600,
                      }}>
                        {s.type === 'teaching' ? '🎓 Teaching' : '📖 Learning'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Badges */}
            <div className="card">
              <h2 style={{ fontSize: '1.1rem', marginBottom: '1.25rem' }}>🏅 Your Badges</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                {BADGES.map((badge, i) => (
                  <div key={i} style={{ textAlign: 'center', padding: '1rem', borderRadius: 14, background: badge.earned ? 'rgba(124, 92, 191, 0.1)' : 'var(--bg-card)', border: `1px solid ${badge.earned ? 'rgba(155, 111, 247, 0.3)' : 'var(--border)'}`, opacity: badge.earned ? 1 : 0.4 }}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.4rem' }}>{badge.icon}</div>
                    <div style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.2rem' }}>{badge.name}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>{badge.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Credit Balance */}
            <div className="card" style={{ background: 'linear-gradient(135deg, rgba(124, 92, 191, 0.15), rgba(224, 64, 251, 0.1))', border: '1px solid rgba(155, 111, 247, 0.3)', textAlign: 'center', padding: '2rem' }}>
              <Clock size={32} color="var(--accent-violet)" style={{ marginBottom: '0.75rem' }} />
              <div style={{ fontSize: '3.5rem', fontWeight: 900, fontFamily: 'Outfit' }} className="gradient-text">5</div>
              <div style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Time Credits Available</div>
              <Link href="/marketplace" className="btn-gradient" style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                Spend Credits <ArrowRight size={16} />
              </Link>
              <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-around', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontWeight: 700, color: '#00e676' }}>6</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Earned</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontWeight: 700, color: '#ff5252' }}>2</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Spent</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontWeight: 700, color: 'var(--accent-violet)' }}>5</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Bonus</div>
                </div>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="card">
              <h2 style={{ fontSize: '1.1rem', marginBottom: '1.25rem' }}>Recent Transactions</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {TRANSACTIONS.map((tx, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', background: 'var(--bg-card)', borderRadius: 10 }}>
                    <div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 500 }}>{tx.desc}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>{tx.date}</div>
                    </div>
                    <div style={{
                      fontWeight: 700, fontSize: '0.95rem',
                      color: tx.type === 'earned' ? '#00e676' : tx.type === 'bonus' ? 'var(--accent-violet)' : '#ff5252',
                    }}>
                      {tx.type === 'spent' ? '-' : '+'}{tx.amount}⏰
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick actions */}
            <div className="card">
              <h2 style={{ fontSize: '1.1rem', marginBottom: '1.25rem' }}>Quick Actions</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  { href: '/marketplace', label: 'Browse New Skills', icon: '🛒' },
                  { href: '/marketplace?teach=true', label: 'List a Skill to Teach', icon: '🎓' },
                  { href: '/leaderboard', label: 'View Leaderboard', icon: '🏆' },
                  { href: '/pathways', label: 'Learning Pathways', icon: '🗺️' },
                ].map((action, i) => (
                  <Link key={i} href={action.href} style={{
                    display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem',
                    background: 'var(--bg-card)', borderRadius: 12, border: '1px solid var(--border)',
                    textDecoration: 'none', color: 'var(--text-primary)', fontSize: '0.9rem',
                    transition: 'all 0.2s', fontWeight: 500,
                  }}>
                    <span style={{ fontSize: '1.2rem' }}>{action.icon}</span> {action.label}
                    <ArrowRight size={14} style={{ marginLeft: 'auto', color: 'var(--text-muted)' }} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .dash-grid { grid-template-columns: 1fr 380px; }
        @media (max-width: 900px) { .dash-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  )
}
