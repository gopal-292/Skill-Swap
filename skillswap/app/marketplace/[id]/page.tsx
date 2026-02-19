'use client'
import { useState, use } from 'react'
import Link from 'next/link'
import { Star, Clock, BookOpen, MapPin, Award, Calendar, ArrowLeft, Play } from 'lucide-react'

type Params = Promise<{ id: string }>

// Demo data to render rich skill detail without DB
const SKILL_DATA: Record<string, {
  id: string; title: string; description: string; category: string; level: string; rating: number; reviewCount: number; sessionCount: number;
  teacher: { id: string; name: string; bio: string; location: string; totalEarned: number; streak: number; skillsCount: number };
  reviews: { reviewer: string; rating: number; comment: string; date: string }[];
  tags: string[];
}> = {
  '1': {
    id: '1', title: 'Python for Beginners', category: 'coding', level: 'beginner', rating: 4.9, reviewCount: 127, sessionCount: 340,
    description: 'Learn programming fundamentals with Python. No prior experience needed! We cover variables, loops, functions, OOP, and build 3 real projects. I use a hands-on approach with live coding and exercises. By the end you will be able to write Python programs independently.',
    teacher: { id: 't1', name: 'Priya Sharma', bio: 'Full-stack developer with 6 years of experience at Infosys and startups. Passionate about making tech accessible.', location: 'Mumbai, Maharashtra', totalEarned: 142, streak: 28, skillsCount: 3 },
    reviews: [
      { reviewer: 'Ravi Kumar', rating: 5, comment: 'Priya is an amazing teacher! She explained every concept clearly and patiently. I built my first app within 2 weeks.', date: '2 days ago' },
      { reviewer: 'Sneha Patel', rating: 5, comment: 'Best Python course I\'ve ever taken. Very practical and engaging. Highly recommend!', date: '1 week ago' },
      { reviewer: 'Aryan Gupta', rating: 4, comment: 'Great session, learned a lot. Would love more advanced topics next time.', date: '2 weeks ago' },
    ],
    tags: ['Python', 'Programming', 'Beginners', 'Projects', 'OOP'],
  },
}

const DEFAULT_SKILL = {
  id: 'x', title: 'Skill Not Found', category: 'coding', level: 'beginner', rating: 4.8, reviewCount: 50, sessionCount: 100,
  description: 'This skill is available for booking. Contact the teacher to learn more.',
  teacher: { id: 't1', name: 'SkillSwap Teacher', bio: 'Experienced educator on the SkillSwap platform.', location: 'India', totalEarned: 50, streak: 7, skillsCount: 2 },
  reviews: [{ reviewer: 'Student', rating: 5, comment: 'Great session!', date: '1 week ago' }],
  tags: ['Learning', 'Exchange'],
}

function Stars({ rating }: { rating: number }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} size={14} fill={i <= Math.round(rating) ? '#ffd700' : 'none'} color={i <= Math.round(rating) ? '#ffd700' : 'var(--text-muted)'} />
      ))}
    </div>
  )
}

export default function SkillDetailPage({ params }: { params: Params }) {
  const { id } = use(params)
  const skill = SKILL_DATA[id] || { ...DEFAULT_SKILL, id }
  const [booked, setBooked] = useState(false)

  const handleBook = () => {
    setBooked(true)
  }

  const catColors: Record<string, string> = {
    coding: '#64b5f6', languages: '#81c784', arts: '#f48fb1', music: '#ffcc02',
    fitness: '#ff8a65', cooking: '#a5d6a7', crafts: '#ce93d8', business: '#90caf9',
  }
  const catColor = catColors[skill.category] || 'var(--accent-violet)'

  return (
    <div style={{ minHeight: '100vh', paddingTop: '68px' }}>
      {/* Back */}
      <div className="page-container" style={{ padding: '1.5rem 1.5rem 0' }}>
        <Link href="/marketplace" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>
          <ArrowLeft size={16} /> Back to Marketplace
        </Link>
      </div>

      <div className="page-container detail-grid" style={{ padding: '2rem 1.5rem', display: 'grid', gap: '2rem' }}>
        {/* Main content */}
        <div>
          {/* Header */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              <span style={{ background: `${catColor}22`, color: catColor, borderRadius: 8, padding: '0.3rem 0.75rem', fontSize: '0.82rem', fontWeight: 600, textTransform: 'capitalize' }}>{skill.category}</span>
              <span style={{ background: 'rgba(0, 230, 118, 0.1)', color: '#00e676', borderRadius: 8, padding: '0.3rem 0.75rem', fontSize: '0.82rem', fontWeight: 600, textTransform: 'capitalize' }}>{skill.level}</span>
            </div>
            <h1 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', marginBottom: '1rem' }}>{skill.title}</h1>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Stars rating={skill.rating} />
                <strong>{skill.rating.toFixed(1)}</strong>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>({skill.reviewCount} reviews)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                <BookOpen size={14} /> {skill.sessionCount} sessions completed
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="card" style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.15rem', marginBottom: '1rem' }}>About This Skill</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>{skill.description}</p>
            {skill.tags.length > 0 && (
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
                {skill.tags.map(tag => (
                  <span key={tag} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, padding: '0.2rem 0.6rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Teacher Profile */}
          <div className="card" style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.15rem', marginBottom: '1.25rem' }}>Meet Your Teacher</h2>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'var(--gradient-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 700, color: 'white', flexShrink: 0 }}>
                {skill.teacher.name[0]}
              </div>
              <div>
                <h3 style={{ marginBottom: '0.25rem' }}>{skill.teacher.name}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                  <MapPin size={13} /> {skill.teacher.location}
                </div>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.82rem', color: 'var(--accent-violet)' }}>
                    <Clock size={12} /> {skill.teacher.totalEarned} credits earned
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.82rem', color: '#ff8a65' }}>
                    🔥 {skill.teacher.streak} day streak
                  </div>
                </div>
              </div>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7 }}>{skill.teacher.bio}</p>
            <Link href={`/profile/${skill.teacher.id}`} className="btn-outline" style={{ marginTop: '1rem', display: 'inline-flex', padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}>
              View Full Profile
            </Link>
          </div>

          {/* Reviews */}
          <div className="card">
            <h2 style={{ fontSize: '1.15rem', marginBottom: '1.25rem' }}>Reviews ({skill.reviewCount})</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {skill.reviews.map((rev, i) => (
                <div key={i} style={{ paddingBottom: '1.25rem', borderBottom: i < skill.reviews.length - 1 ? '1px solid var(--border)' : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--bg-card-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-violet)' }}>
                        {rev.reviewer[0]}
                      </div>
                      <strong style={{ fontSize: '0.9rem' }}>{rev.reviewer}</strong>
                    </div>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{rev.date}</span>
                  </div>
                  <Stars rating={rev.rating} />
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.5rem', lineHeight: 1.6 }}>{rev.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Booking sidebar */}
        <div style={{ position: 'sticky', top: '88px', height: 'fit-content' }}>
          <div className="card glass" style={{ border: '1px solid rgba(155, 111, 247, 0.3)' }}>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <div className="credit-chip" style={{ fontSize: '1.1rem', padding: '0.5rem 1.25rem', justifyContent: 'center', display: 'flex' }}>
                <Clock size={18} /> 1 Credit / Hour
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: '0.5rem' }}>= 100% Free. Zero money needed.</p>
            </div>

            {booked ? (
              <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(0, 230, 118, 0.1)', border: '1px solid rgba(0, 230, 118, 0.3)', borderRadius: 14 }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✅</div>
                <p style={{ color: '#00e676', fontWeight: 600 }}>Session Booked!</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.25rem' }}>Check your dashboard for details.</p>
              </div>
            ) : (
              <div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    <Calendar size={15} color="var(--accent-violet)" /> Flexible scheduling
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    <Play size={15} color="var(--accent-violet)" /> Built-in video call
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    <Award size={15} color="var(--accent-violet)" /> Certificate on completion
                  </div>
                </div>
                <button onClick={handleBook} className="btn-gradient" style={{ width: '100%', justifyContent: 'center', padding: '0.9rem' }}>
                  Book Session — 1 Credit
                </button>
                <Link href="/auth/signup" style={{ display: 'block', textAlign: 'center', marginTop: '0.75rem', color: 'var(--text-muted)', fontSize: '0.82rem', textDecoration: 'none' }}>
                  New? Get 5 free credits →
                </Link>
              </div>
            )}

            <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontWeight: 700 }}>{skill.rating.toFixed(1)}★</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>Rating</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontWeight: 700 }}>{skill.sessionCount}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>Sessions</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontWeight: 700 }}>{skill.reviewCount}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>Reviews</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .detail-grid { grid-template-columns: 1fr 340px; }
        @media (max-width: 900px) { .detail-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  )
}
