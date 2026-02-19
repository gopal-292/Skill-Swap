'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Clock, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'

export default function SignInPage() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await signIn('credentials', {
      email: form.email,
      password: form.password,
      redirect: false,
    })
    setLoading(false)
    if (res?.ok) {
      router.push('/dashboard')
    } else {
      setError(res?.error || 'Invalid credentials')
    }
  }

  const fillDemo = (role: 'teacher' | 'learner') => {
    if (role === 'teacher') setForm({ email: 'teacher@skillswap.demo', password: 'Demo@123' })
    else setForm({ email: 'learner@skillswap.demo', password: 'Demo@123' })
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      paddingTop: '68px', padding: '80px 1rem 2rem', position: 'relative', overflow: 'hidden',
    }}>
      <div className="orb orb-purple" style={{ width: 500, height: 500, top: -100, right: -100 }} />
      <div className="orb orb-pink" style={{ width: 400, height: 400, bottom: -100, left: -100 }} />

      <div className="glass-strong animate-fade-in-up" style={{ width: '100%', maxWidth: 440, borderRadius: 24, padding: '2.5rem', position: 'relative', zIndex: 1 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <div style={{ width: 56, height: 56, background: 'var(--gradient-main)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Clock size={28} color="white" />
            </div>
          </div>
          <h1 style={{ fontSize: '1.8rem', fontFamily: 'Outfit' }}>Welcome back</h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Sign in to your SkillSwap account</p>
        </div>

        {/* Demo accounts */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {(['teacher', 'learner'] as const).map(role => (
            <button key={role} onClick={() => fillDemo(role)} style={{
              flex: 1, padding: '0.6rem', borderRadius: 10,
              background: 'rgba(124, 92, 191, 0.1)', border: '1px solid rgba(155, 111, 247, 0.3)',
              color: 'var(--accent-violet)', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600,
              transition: 'all 0.2s',
            }}>
              👤 Demo {role === 'teacher' ? 'Teacher' : 'Learner'}
            </button>
          ))}
        </div>

        {error && (
          <div style={{ background: 'rgba(255, 82, 82, 0.1)', border: '1px solid rgba(255, 82, 82, 0.3)', borderRadius: 10, padding: '0.75rem 1rem', color: '#ff5252', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Email</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                className="input"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                style={{ paddingLeft: '2.5rem' }}
                required
              />
            </div>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                className="input"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                style={{ paddingLeft: '2.5rem', paddingRight: '3rem' }}
                required
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} style={{
                position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)',
              }}>
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <button type="submit" className="btn-gradient" disabled={loading} style={{ justifyContent: 'center', marginTop: '0.5rem', width: '100%', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Signing in…' : 'Sign In'} <ArrowRight size={16} />
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Don&apos;t have an account?{' '}
          <Link href="/auth/signup" style={{ color: 'var(--accent-violet)', fontWeight: 600, textDecoration: 'none' }}>Sign up free</Link>
        </p>
      </div>
    </div>
  )
}
