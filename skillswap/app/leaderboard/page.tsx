import Link from 'next/link'
import { Trophy, Clock, Star, Flame, ArrowRight } from 'lucide-react'

const LEADERS = [
  { rank: 1, name: 'Priya Sharma', location: 'Mumbai', credits: 142, streak: 28, rating: 4.9, sessions: 89, badge: '🏆', skills: ['Python', 'Web Dev', 'Machine Learning'] },
  { rank: 2, name: 'Rohan Mehta', location: 'Pune', credits: 118, streak: 21, rating: 5.0, sessions: 76, badge: '🥈', skills: ['Guitar', 'Music Theory', 'Composition'] },
  { rank: 3, name: 'Meera Iyer', location: 'Hyderabad', credits: 101, streak: 14, rating: 4.9, sessions: 68, badge: '🥉', skills: ['Indian Cooking', 'Spices', 'Baking'] },
  { rank: 4, name: 'Vikram Nair', location: 'Chennai', credits: 87, streak: 9, rating: 4.8, sessions: 54, badge: '⭐', skills: ['React', 'Node.js', 'TypeScript'] },
  { rank: 5, name: 'Deepika Joshi', location: 'Rishikesh', credits: 79, streak: 30, rating: 5.0, sessions: 61, badge: '⭐', skills: ['Yoga', 'Meditation', 'Mindfulness'] },
  { rank: 6, name: 'Carlos Mendez', location: 'Delhi', credits: 64, streak: 7, rating: 4.8, sessions: 45, badge: '⭐', skills: ['Spanish', 'French', 'Portuguese'] },
  { rank: 7, name: 'Anjali Rao', location: 'Bangalore', credits: 55, streak: 12, rating: 4.7, sessions: 38, badge: '⭐', skills: ['UI/UX', 'Figma', 'Illustration'] },
  { rank: 8, name: 'Arjun Kapoor', location: 'Goa', credits: 47, streak: 5, rating: 4.6, sessions: 33, badge: '⭐', skills: ['Photography', 'Lightroom', 'Videography'] },
  { rank: 9, name: 'Kavya Pillai', location: 'Trivandrum', credits: 39, streak: 8, rating: 4.7, sessions: 28, badge: '⭐', skills: ['Creative Writing', 'Storytelling'] },
  { rank: 10, name: 'Aditya Singh', location: 'Noida', credits: 31, streak: 3, rating: 4.9, sessions: 22, badge: '⭐', skills: ['Data Science', 'Python', 'ML'] },
]

const TOP3_HEIGHTS = ['180px', '240px', '140px']
const TOP3_ORDER = [1, 0, 2] // silver, gold, bronze order for podium

export default function LeaderboardPage() {
  return (
    <div style={{ minHeight: '100vh', paddingTop: '68px', paddingBottom: '4rem' }}>
      {/* Header */}
      <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)', padding: '3rem 0 2rem' }}>
        <div className="page-container" style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', marginBottom: '0.75rem' }}>
            🏆 <span className="gradient-text">Leaderboard</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>Top teachers ranked by time credits earned. Teach more, climb higher.</p>
        </div>
      </div>

      <div className="page-container" style={{ padding: '3rem 1.5rem' }}>
        {/* Podium */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: '1rem', marginBottom: '3rem', height: 280 }}>
          {TOP3_ORDER.map((idx) => {
            const leader = LEADERS[idx]
            const podiumIdx = idx === 0 ? 1 : idx === 1 ? 0 : 2
            return (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, maxWidth: 200 }}>
                <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>{leader.badge}</div>
                  <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'var(--gradient-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 700, color: 'white', margin: '0 auto 0.4rem' }}>
                    {leader.name[0]}
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{leader.name.split(' ')[0]}</div>
                  <div style={{ color: 'var(--accent-violet)', fontWeight: 800, fontSize: '1rem' }}>{leader.credits}⏰</div>
                </div>
                <div style={{
                  width: '100%', height: TOP3_HEIGHTS[podiumIdx], borderRadius: '14px 14px 0 0',
                  background: podiumIdx === 0 ? 'linear-gradient(135deg, #ffd700, #ff8c00)' : podiumIdx === 1 ? 'linear-gradient(135deg, #c0c0c0, #808080)' : 'linear-gradient(135deg, #cd7f32, #8b4513)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.5rem', fontWeight: 900, color: 'white', opacity: 0.9,
                }}>
                  #{leader.rank}
                </div>
              </div>
            )
          })}
        </div>

        {/* Full rankings */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {LEADERS.map((leader, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.1rem 1.5rem', background: i < 3 ? 'linear-gradient(135deg, rgba(124, 92, 191, 0.1), rgba(224, 64, 251, 0.05))' : 'var(--gradient-card)', border: `1px solid ${i < 3 ? 'rgba(155, 111, 247, 0.3)' : 'var(--border)'}`, borderRadius: 16, transition: 'all 0.3s' }}>
              {/* Rank number */}
              <div style={{ width: 36, height: 36, borderRadius: 10, background: i < 3 ? 'var(--gradient-main)' : 'var(--bg-card)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.9rem', color: i < 3 ? 'white' : 'var(--text-secondary)', flexShrink: 0 }}>
                #{leader.rank}
              </div>

              {/* Avatar */}
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: i < 3 ? 'var(--gradient-main)' : 'var(--bg-card)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', fontWeight: 700, color: i < 3 ? 'white' : 'var(--text-primary)', flexShrink: 0, border: '2px solid var(--border)' }}>
                {leader.name[0]}
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                  <strong style={{ fontSize: '0.95rem' }}>{leader.name}</strong>
                  <span style={{ font: '0.78rem', color: 'var(--text-muted)' }}>📍{leader.location}</span>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.3rem', flexWrap: 'wrap' }}>
                  {leader.skills.slice(0, 3).map(s => (
                    <span key={s} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 6, padding: '0.15rem 0.5rem', fontSize: '0.72rem', color: 'var(--text-muted)' }}>{s}</span>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div style={{ display: 'flex', gap: '1.5rem', flexShrink: 0 }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 700, color: 'var(--accent-violet)' }}>
                    <Clock size={14} />{leader.credits}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Credits</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 700, color: '#ffd700' }}>
                    <Star size={13} fill="#ffd700" />{leader.rating}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Rating</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 700, color: '#ff8a65' }}>
                    <Flame size={14} />{leader.streak}d
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Streak</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA to join */}
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>Want to see your name on the leaderboard?</p>
          <Link href="/auth/signup" className="btn-gradient">
            Start Teaching Today <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  )
}
