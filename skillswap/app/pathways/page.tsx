import Link from 'next/link'
import { ArrowRight, Clock, Star, Award, Check, Lock } from 'lucide-react'

const PATHWAYS = [
  {
    id: 'p1',
    title: 'Full-Stack Web Developer',
    emoji: '💻',
    duration: '12 credits',
    level: 'intermediate',
    color: '#64b5f6',
    desc: 'Go from zero to full-stack developer. Learn HTML, CSS, JS, React, Node.js, and databases.',
    skills: [
      { name: 'HTML & CSS Fundamentals', credits: 1, done: true },
      { name: 'JavaScript Essentials', credits: 2, done: true },
      { name: 'React for Beginners', credits: 2, done: false },
      { name: 'Node.js & Express', credits: 2, done: false },
      { name: 'PostgreSQL Databases', credits: 2, done: false },
      { name: 'Deploy & Go Live', credits: 1, done: false },
    ],
    cert: 'Full-Stack Web Developer Certificate',
    enrolled: 342,
  },
  {
    id: 'p2',
    title: 'Music Maestro',
    emoji: '🎵',
    duration: '8 credits',
    level: 'beginner',
    color: '#ffcc02',
    desc: 'Learn to play guitar, understand music theory, and compose your own songs.',
    skills: [
      { name: 'Guitar for Absolute Beginners', credits: 2, done: false },
      { name: 'Music Theory Basics', credits: 1, done: false },
      { name: 'Chord Progressions', credits: 2, done: false },
      { name: 'Songwriting Workshop', credits: 2, done: false },
      { name: 'Recording & Production', credits: 1, done: false },
    ],
    cert: 'Music Fundamentals Certificate',
    enrolled: 189,
  },
  {
    id: 'p3',
    title: 'Digital Creative Pro',
    emoji: '🎨',
    duration: '10 credits',
    level: 'intermediate',
    color: '#f48fb1',
    desc: 'Combine design, photography, and storytelling to become a digital creative.',
    skills: [
      { name: 'UI/UX Design Principles', credits: 2, done: false },
      { name: 'Figma Masterclass', credits: 2, done: false },
      { name: 'Digital Photography', credits: 2, done: false },
      { name: 'Photo Editing & Retouching', credits: 2, done: false },
      { name: 'Brand Identity Design', credits: 2, done: false },
    ],
    cert: 'Digital Creative Certificate',
    enrolled: 224,
  },
  {
    id: 'p4',
    title: 'Wellness & Mindfulness Coach',
    emoji: '🧘',
    duration: '6 credits',
    level: 'beginner',
    color: '#81c784',
    desc: 'Build physical and mental wellness habits with yoga, nutrition, and mindfulness.',
    skills: [
      { name: 'Yoga for Beginners', credits: 2, done: false },
      { name: 'Meditation Foundations', credits: 1, done: false },
      { name: 'Nutrition Basics', credits: 1, done: false },
      { name: 'Mindfulness in Daily Life', credits: 2, done: false },
    ],
    cert: 'Wellness Practitioner Certificate',
    enrolled: 411,
  },
]

export default function PathwaysPage() {
  return (
    <div style={{ minHeight: '100vh', paddingTop: '68px', paddingBottom: '4rem' }}>
      {/* Header */}
      <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)', padding: '3rem 0 2rem' }}>
        <div className="page-container">
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', marginBottom: '0.75rem' }}>
            🗺️ Learning <span className="gradient-text">Pathways</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: 600 }}>
            Structured learning tracks designed by experts. Complete all skills in a pathway and earn a certificate.
          </p>
        </div>
      </div>

      <div className="page-container" style={{ padding: '2.5rem 1.5rem' }}>
        {/* Info banner */}
        <div style={{ background: 'linear-gradient(135deg, rgba(124, 92, 191, 0.1), rgba(0, 230, 118, 0.05))', border: '1px solid rgba(155, 111, 247, 0.2)', borderRadius: 16, padding: '1.25rem 1.5rem', marginBottom: '2.5rem', display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ fontSize: '1.5rem' }}>🎓</div>
          <div>
            <div style={{ fontWeight: 600, marginBottom: '0.2rem' }}>Complete a pathway — earn a certificate</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Each pathway is a sequence of skills from SkillSwap teachers. Every skill costs 1 credit per hour.</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {PATHWAYS.map((p, pi) => {
            const done = p.skills.filter(s => s.done).length
            const total = p.skills.length
            const pct = (done / total) * 100
            return (
              <div key={p.id} className="card" style={{ padding: '2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '2rem' }} className={`pathway-grid-${pi}`}>
                  {/* Left */}
                  <div>
                    <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap', alignItems: 'center' }}>
                      <span style={{ fontSize: '2rem' }}>{p.emoji}</span>
                      <div>
                        <h2 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>{p.title}</h2>
                        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                          <span style={{ background: `${p.color}22`, color: p.color, borderRadius: 6, padding: '0.2rem 0.6rem', fontSize: '0.78rem', fontWeight: 600, textTransform: 'capitalize' }}>{p.level}</span>
                          <div className="credit-chip" style={{ fontSize: '0.78rem' }}><Clock size={12} />{p.duration}</div>
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>👥 {p.enrolled} enrolled</span>
                        </div>
                      </div>
                    </div>

                    <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.7, fontSize: '0.9rem' }}>{p.desc}</p>

                    {/* Skills list */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                      {p.skills.map((skill, si) => (
                        <div key={si} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 0.85rem', borderRadius: 10, background: skill.done ? 'rgba(0, 230, 118, 0.08)' : 'var(--bg-card)', border: `1px solid ${skill.done ? 'rgba(0, 230, 118, 0.2)' : 'var(--border)'}` }}>
                          <div style={{ width: 22, height: 22, borderRadius: '50%', background: skill.done ? '#00e676' : 'var(--bg-card-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            {skill.done ? <Check size={12} color="black" /> : <Lock size={11} color="var(--text-muted)" />}
                          </div>
                          <span style={{ flex: 1, fontSize: '0.9rem', color: skill.done ? 'var(--text-primary)' : 'var(--text-secondary)', textDecoration: skill.done ? 'none' : 'none' }}>{skill.name}</span>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{skill.credits}cr</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right: Progress + CTA */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div className="card glass" style={{ padding: '1.5rem', textAlign: 'center' }}>
                      <div style={{ position: 'relative', width: 100, height: 100, margin: '0 auto 1rem' }}>
                        <svg viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
                          <circle cx="50" cy="50" r="40" fill="none" stroke="var(--border)" strokeWidth="8" />
                          <circle cx="50" cy="50" r="40" fill="none" stroke="url(#grad)" strokeWidth="8"
                            strokeDasharray={`${2 * Math.PI * 40}`}
                            strokeDashoffset={`${2 * Math.PI * 40 * (1 - pct / 100)}`}
                            strokeLinecap="round" />
                          <defs>
                            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#7c5cbf" />
                              <stop offset="100%" stopColor="#e040fb" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                          <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>{Math.round(pct)}%</div>
                        </div>
                      </div>
                      <div style={{ fontWeight: 600, marginBottom: '0.3rem' }}>{done}/{total} Completed</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '1rem' }}>
                        🎓 {p.cert}
                      </div>
                      <Link href="/marketplace" className="btn-gradient" style={{ display: 'flex', justifyContent: 'center', width: '100%', fontSize: '0.9rem' }}>
                        {done === 0 ? 'Start Pathway' : 'Continue'} <ArrowRight size={14} />
                      </Link>
                    </div>

                    <div style={{ padding: '1rem', background: 'rgba(255, 215, 0, 0.08)', border: '1px solid rgba(255, 215, 0, 0.2)', borderRadius: 12, display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                      <Award size={18} color="#ffd700" style={{ flexShrink: 0 }} />
                      <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Complete to earn <strong style={{ color: '#ffd700' }}>{p.cert}</strong></div>
                    </div>
                  </div>
                </div>
                <style>{`.pathway-grid-${pi} { grid-template-columns: 1fr 280px; } @media(max-width:900px){.pathway-grid-${pi}{grid-template-columns:1fr!important;}}`}</style>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
