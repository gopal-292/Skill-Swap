'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Clock, Mail, Lock, User, Eye, EyeOff, ArrowRight, Check } from 'lucide-react'

export default function SignUpPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error); setLoading(false); return }
      router.push('/auth/signin?registered=true')
    } catch {
      setError('Something went wrong. Try again.')
      setLoading(false)
    }
  }

  const perks = ['5 free starter credits', 'Access all skill categories', 'Join live video sessions', 'Earn by teaching others']

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      paddingTop: '68px', padding: '80px 1rem 2rem', position: 'relative', overflow: 'hidden',
    }}>
      <div className="orb orb-purple" style={{ width: 500, height: 500, top: -100, left: -100 }} />
      <div className="orb orb-pink" style={{ width: 400, height: 400, bottom: -100, right: -100 }} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', maxWidth: 880, width: '100%', position: 'relative', zIndex: 1 }}
        className="signup-grid">
        {/* Left: Perks */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
            <div style={{ width: 44, height: 44, background: 'var(--gradient-main)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Clock size={22} color="white" />
            </div>
            <span style={{ fontWeight: 800, fontSize: '1.3rem', fontFamily: 'Outfit' }} className="gradient-text">SkillSwap</span>
          </div>
          <h2 style={{ fontSize: '2.2rem', lineHeight: 1.2, marginBottom: '1rem' }}>
            Join the <span className="gradient-text">knowledge revolution</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.7 }}>
            Over 10,000 learners and teachers exchange skills every day — no money, just time.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {perks.map((perk, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: 24, height: 24, background: 'rgba(0, 230, 118, 0.15)', border: '1px solid rgba(0, 230, 118, 0.4)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Check size={13} color="#00e676" />
                </div>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{perk}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Form */}
        <div className="glass-strong" style={{ borderRadius: 24, padding: '2.5rem' }}>
          <h1 style={{ fontSize: '1.6rem', marginBottom: '0.5rem', fontFamily: 'Outfit' }}>Create your account</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.75rem', fontSize: '0.9rem' }}>Get 5 free time credits instantly</p>

          {error && (
            <div style={{ background: 'rgba(255, 82, 82, 0.1)', border: '1px solid rgba(255, 82, 82, 0.3)', borderRadius: 10, padding: '0.75rem 1rem', color: '#ff5252', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Full Name</label>
              <div style={{ position: 'relative' }}>
                <User size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input className="input" type="text" placeholder="John Doe" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={{ paddingLeft: '2.5rem' }} required />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Email</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input className="input" type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={{ paddingLeft: '2.5rem' }} required />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input className="input" type={showPassword ? 'text' : 'password'} placeholder="Min. 8 characters" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} style={{ paddingLeft: '2.5rem', paddingRight: '3rem' }} required minLength={8} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <button type="submit" className="btn-gradient" disabled={loading} style={{ justifyContent: 'center', marginTop: '0.5rem', width: '100%', opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Creating account…' : 'Create Free Account'} <ArrowRight size={16} />
            </button>
          </form>
          <p style={{ textAlign: 'center', marginTop: '1.25rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            Already have an account?{' '}
            <Link href="/auth/signin" style={{ color: 'var(--accent-violet)', fontWeight: 600, textDecoration: 'none' }}>Sign in</Link>
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .signup-grid { grid-template-columns: 1fr !important; }
          .signup-grid > div:first-child { display: none !important; }
        }
      `}</style>
    </div>
  )
}
