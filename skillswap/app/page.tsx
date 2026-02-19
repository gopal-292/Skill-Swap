'use client'
import Link from 'next/link'
import { Clock, BookOpen, Star, Users, ArrowRight, Zap, Shield, Globe, Award, ChevronRight, Play } from 'lucide-react'

const FEATURES = [
  { icon: '⏰', title: 'Time-Banking', desc: '1 hour teaching = 1 credit. No money needed — ever.', color: 'var(--accent-violet)' },
  { icon: '🛒', title: 'Skill Marketplace', desc: '50+ categories: coding, languages, arts, music, crafts and more.', color: '#64b5f6' },
  { icon: '📅', title: 'Built-in Video Calls', desc: 'WebRTC-powered HD video sessions with scheduling & reminders.', color: '#81c784' },
  { icon: '🏆', title: 'Gamification', desc: 'Earn badges, climb the leaderboard, build your streak.', color: '#ffcc02' },
  { icon: '🎓', title: 'Learning Pathways', desc: 'Structured tracks with certificates to master any skill.', color: '#ff8a65' },
  { icon: '🏘️', title: 'Local Workshops', desc: 'Find nearby teachers and join community events.', color: '#f48fb1' },
]

const STEPS = [
  { n: '01', title: 'Sign Up Free', desc: 'Create your account and receive 5 starter time credits instantly.', icon: '🎁' },
  { n: '02', title: 'Browse & Book', desc: 'Explore the marketplace and book a session with 1 credit (1 hour).', icon: '🔍' },
  { n: '03', title: 'Learn & Teach', desc: 'Attend sessions, earn credits by teaching, grow your community.', icon: '🚀' },
]

const STATS = [
  { value: '10,000+', label: 'Active Learners', icon: <Users size={24} /> },
  { value: '2,500+', label: 'Skills Listed', icon: <BookOpen size={24} /> },
  { value: '50,000+', label: 'Sessions Completed', icon: <Clock size={24} /> },
  { value: '4.9★', label: 'Avg. Rating', icon: <Star size={24} /> },
]

const CATEGORIES = ['Coding', 'Languages', 'Music', 'Art & Design', 'Fitness', 'Cooking', 'Business', 'Crafts', 'Photography', 'Writing', 'Math', 'Science']

export default function HomePage() {
  return (
    <div style={{ paddingTop: '68px' }}>
      {/* Hero Section */}
      <section style={{ minHeight: '92vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Background orbs */}
        <div className="orb orb-purple" style={{ width: 600, height: 600, top: -200, right: -100 }} />
        <div className="orb orb-pink" style={{ width: 400, height: 400, bottom: -100, left: -100 }} />
        <div className="orb orb-cyan" style={{ width: 300, height: 300, top: '40%', left: '40%' }} />

        <div className="page-container" style={{ position: 'relative', zIndex: 1, textAlign: 'center', width: '100%' }}>
          {/* Badge */}
          <div className="animate-fade-in-up" style={{ marginBottom: '1.5rem' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'rgba(124, 92, 191, 0.15)', border: '1px solid rgba(155, 111, 247, 0.3)',
              borderRadius: 100, padding: '0.4rem 1rem', fontSize: '0.85rem', color: 'var(--accent-violet)',
            }}>
              <Zap size={14} /> Built for HYP 7.0 — SDG 4 Quality Education
            </span>
          </div>

          {/* Headline */}
          <h1 className="animate-fade-in-up delay-100" style={{ fontSize: 'clamp(2.8rem, 6vw, 4.8rem)', marginBottom: '1.5rem', lineHeight: 1.1 }}>
            <span className="gradient-text">Learn Anything.</span>
            <br />
            <span style={{ color: 'var(--text-primary)' }}>Teach Everything.</span>
          </h1>

          <p className="animate-fade-in-up delay-200" style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: 'var(--text-secondary)',
            maxWidth: 600, margin: '0 auto 2.5rem',
          }}>
            Exchange skills using <strong style={{ color: 'var(--accent-violet)' }}>time credits</strong> — no money needed.
            Teach an hour, learn an hour. A community where knowledge is free.
          </p>

          {/* CTA Buttons */}
          <div className="animate-fade-in-up delay-300" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem' }}>
            <Link href="/auth/signup" className="btn-gradient" style={{ fontSize: '1.05rem', padding: '0.9rem 2rem' }}>
              Start Learning Free <ArrowRight size={18} />
            </Link>
            <Link href="/marketplace" className="btn-outline" style={{ fontSize: '1.05rem', padding: '0.9rem 2rem' }}>
              <Play size={16} fill="currentColor" /> Browse Skills
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="animate-fade-in-up delay-400" style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { icon: '✨', text: '5 free starter credits' },
              { icon: '🔒', text: 'Zero financial barrier' },
              { icon: '🌍', text: 'Community verified' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                {item.icon} {item.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: '4rem 0', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="page-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
            {STATS.map((stat, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ color: 'var(--accent-violet)', marginBottom: '0.5rem', display: 'flex', justifyContent: 'center' }}>{stat.icon}</div>
                <div style={{ fontSize: '2.2rem', fontWeight: 800, fontFamily: 'Outfit', background: 'var(--gradient-main)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{stat.value}</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section">
        <div className="page-container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', marginBottom: '1rem' }}>How SkillSwap Works</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: 500, margin: '0 auto' }}>Simple as 1-2-3. No fees, no barriers, just knowledge.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {STEPS.map((step, i) => (
              <div key={i} className="card" style={{ textAlign: 'center', position: 'relative' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{step.icon}</div>
                <div style={{
                  fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-violet)',
                  letterSpacing: '0.1em', marginBottom: '0.5rem',
                }}>STEP {step.n}</div>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '0.75rem' }}>{step.title}</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{step.desc}</p>
                {i < STEPS.length - 1 && (
                  <div style={{ position: 'absolute', right: -16, top: '50%', transform: 'translateY(-50%)', color: 'var(--border-light)', zIndex: 1 }}>
                    <ChevronRight size={24} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section style={{ padding: '4rem 0', background: 'var(--bg-secondary)' }}>
        <div className="page-container">
          <h2 style={{ textAlign: 'center', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', marginBottom: '3rem' }}>
            50+ Skill Categories
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
            {CATEGORIES.map((cat, i) => (
              <Link key={i} href={`/marketplace?category=${cat.toLowerCase()}`} style={{ textDecoration: 'none' }}>
                <div style={{
                  padding: '0.6rem 1.25rem', borderRadius: 100,
                  background: 'var(--bg-card)', border: '1px solid var(--border)',
                  color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 500,
                  cursor: 'pointer', transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { (e.target as HTMLElement).style.borderColor = 'var(--accent-violet)'; (e.target as HTMLElement).style.color = 'var(--accent-violet)' }}
                  onMouseLeave={e => { (e.target as HTMLElement).style.borderColor = 'var(--border)'; (e.target as HTMLElement).style.color = 'var(--text-secondary)' }}
                >{cat}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="section">
        <div className="page-container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', marginBottom: '1rem' }}>Everything You Need to Learn & Teach</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: 500, margin: '0 auto' }}>A complete platform built for your growth.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {FEATURES.map((f, i) => (
              <div key={i} className="card" style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 14, fontSize: '1.5rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  background: 'rgba(124, 92, 191, 0.1)', border: '1px solid rgba(124, 92, 191, 0.2)',
                }}>
                  {f.icon}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '0.4rem' }}>{f.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SDG Section */}
      <section style={{ padding: '4rem 0', background: 'var(--bg-secondary)' }}>
        <div className="page-container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', marginBottom: '1rem' }}>Aligned with UN Sustainable Development Goals</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {[
              { sdg: 'SDG 4', title: 'Quality Education', desc: 'Free, accessible skill development for everyone regardless of income.', color: '#c5192d', emoji: '🎓' },
              { sdg: 'SDG 8', title: 'Decent Work & Growth', desc: 'Enable skill monetization and employment opportunities for youth.', color: '#a21942', emoji: '💼' },
              { sdg: 'SDG 10', title: 'Reduced Inequalities', desc: 'Equal access to learning regardless of location or credentials.', color: '#dd1367', emoji: '🌍' },
            ].map((item, i) => (
              <div key={i} className="card" style={{ borderLeft: `3px solid ${item.color}`, paddingLeft: '1.5rem' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{item.emoji}</div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: item.color, marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.sdg}</div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section">
        <div className="page-container" style={{ textAlign: 'center' }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(124, 92, 191, 0.15), rgba(224, 64, 251, 0.1))',
            border: '1px solid rgba(155, 111, 247, 0.3)',
            borderRadius: 28, padding: '4rem 2rem', position: 'relative', overflow: 'hidden',
          }}>
            <div className="orb orb-purple" style={{ width: 300, height: 300, top: -100, right: -50, opacity: 0.5 }} />
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1rem', position: 'relative' }}>
              Ready to Start Your <span className="gradient-text">Skill Journey?</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '2.5rem', position: 'relative' }}>
              Join thousands of learners and teachers. Get 5 free credits when you sign up.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', position: 'relative' }}>
              <Link href="/auth/signup" className="btn-gradient" style={{ fontSize: '1.05rem', padding: '0.9rem 2.5rem' }}>
                Join SkillSwap Free <ArrowRight size={18} />
              </Link>
              <Link href="/marketplace" className="btn-outline" style={{ fontSize: '1.05rem', padding: '0.9rem 2.5rem' }}>
                Explore Marketplace
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border)', padding: '3rem 0', background: 'var(--bg-secondary)' }}>
        <div className="page-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2.5rem', marginBottom: '2.5rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <div style={{ width: 32, height: 32, background: 'var(--gradient-main)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Clock size={18} color="white" />
                </div>
                <span style={{ fontWeight: 800, fontSize: '1.1rem', fontFamily: 'Outfit' }} className="gradient-text">SkillSwap</span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.7 }}>
                Learn Anything. Teach Everything.<br />Building a world where knowledge is free.
              </p>
            </div>
            <div>
              <p style={{ fontWeight: 700, marginBottom: '1rem', fontSize: '0.9rem' }}>Platform</p>
              {['Marketplace', 'Pathways', 'Workshops', 'Leaderboard'].map(l => (
                <div key={l} style={{ marginBottom: '0.5rem' }}>
                  <Link href={`/${l.toLowerCase()}`} style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>{l}</Link>
                </div>
              ))}
            </div>
            <div>
              <p style={{ fontWeight: 700, marginBottom: '1rem', fontSize: '0.9rem' }}>Company</p>
              {['About', 'Blog', 'Careers', 'Contact'].map(l => (
                <div key={l} style={{ marginBottom: '0.5rem' }}>
                  <Link href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>{l}</Link>
                </div>
              ))}
            </div>
          </div>
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>© 2024 SkillSwap. Built with ❤️ for HYP 7.0</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>MIT License</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
