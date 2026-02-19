'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Clock, Menu, X, Bell, ChevronDown, BookOpen, LayoutDashboard, Trophy, Users, Compass, LogOut, User } from 'lucide-react'

export function Navbar() {
  const { data: session } = useSession()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: 'rgba(10, 10, 15, 0.85)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border)',
    }}>
      <div className="page-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px' }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
          <div style={{
            width: 36, height: 36,
            background: 'var(--gradient-main)',
            borderRadius: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Clock size={20} color="white" />
          </div>
          <span style={{ fontSize: '1.3rem', fontWeight: 800, fontFamily: 'Outfit' }} className="gradient-text">
            SkillSwap
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }} className="desktop-nav">
          <NavLink href="/marketplace" icon={<BookOpen size={16} />} label="Marketplace" />
          <NavLink href="/pathways" icon={<Compass size={16} />} label="Pathways" />
          <NavLink href="/workshops" icon={<Users size={16} />} label="Workshops" />
          <NavLink href="/leaderboard" icon={<Trophy size={16} />} label="Leaderboard" />
        </div>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {session ? (
            <>
              {/* Credit balance */}
              <div className="credit-chip" style={{ cursor: 'default' }}>
                <Clock size={14} />
                <span>5 Credits</span>
              </div>
              {/* Profile dropdown */}
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    background: 'var(--bg-card)', border: '1px solid var(--border)',
                    borderRadius: 10, padding: '0.4rem 0.75rem', cursor: 'pointer',
                    color: 'var(--text-primary)', transition: 'all 0.2s',
                  }}
                >
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%',
                    background: 'var(--gradient-main)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.8rem', fontWeight: 700, color: 'white',
                  }}>
                    {session.user?.name?.[0]?.toUpperCase()}
                  </div>
                  <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{session.user?.name?.split(' ')[0]}</span>
                  <ChevronDown size={14} />
                </button>
                {profileOpen && (
                  <div style={{
                    position: 'absolute', right: 0, top: 'calc(100% + 8px)',
                    background: 'var(--bg-card)', border: '1px solid var(--border)',
                    borderRadius: 14, padding: '0.5rem', minWidth: 180,
                    boxShadow: 'var(--shadow-card)',
                  }}>
                    <DropdownItem href="/dashboard" icon={<LayoutDashboard size={15} />} label="Dashboard" onClick={() => setProfileOpen(false)} />
                    <DropdownItem href={`/profile/${session.user?.id}`} icon={<User size={15} />} label="My Profile" onClick={() => setProfileOpen(false)} />
                    <div style={{ height: 1, background: 'var(--border)', margin: '0.4rem 0' }} />
                    <button onClick={() => signOut()} style={{
                      display: 'flex', alignItems: 'center', gap: '0.6rem',
                      width: '100%', padding: '0.55rem 0.75rem', borderRadius: 8,
                      background: 'none', border: 'none', cursor: 'pointer',
                      color: '#ff6b6b', fontSize: '0.9rem', transition: 'all 0.2s',
                    }}>
                      <LogOut size={15} />Sign Out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <Link href="/auth/signin" className="btn-outline" style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem' }}>
                Sign In
              </Link>
              <Link href="/auth/signup" className="btn-gradient" style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem' }}>
                Get Started
              </Link>
            </div>
          )}

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', display: 'none' }}
            className="mobile-menu-btn"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div style={{
          background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)',
          padding: '1rem',
        }}>
          <MobileNavLink href="/marketplace" label="Marketplace" onClick={() => setMobileOpen(false)} />
          <MobileNavLink href="/pathways" label="Pathways" onClick={() => setMobileOpen(false)} />
          <MobileNavLink href="/workshops" label="Workshops" onClick={() => setMobileOpen(false)} />
          <MobileNavLink href="/leaderboard" label="Leaderboard" onClick={() => setMobileOpen(false)} />
          {!session && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
              <Link href="/auth/signin" className="btn-outline" onClick={() => setMobileOpen(false)} style={{ justifyContent: 'center' }}>Sign In</Link>
              <Link href="/auth/signup" className="btn-gradient" onClick={() => setMobileOpen(false)} style={{ justifyContent: 'center' }}>Get Started Free</Link>
            </div>
          )}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </nav>
  )
}

function NavLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link href={href} style={{
      display: 'flex', alignItems: 'center', gap: '0.4rem',
      padding: '0.45rem 0.9rem', borderRadius: 10,
      color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 500,
      textDecoration: 'none', transition: 'all 0.2s',
    }}
      onMouseEnter={e => { (e.target as HTMLElement).closest('a')!.style.color = 'var(--text-primary)'; (e.target as HTMLElement).closest('a')!.style.background = 'var(--bg-card)' }}
      onMouseLeave={e => { (e.target as HTMLElement).closest('a')!.style.color = 'var(--text-secondary)'; (e.target as HTMLElement).closest('a')!.style.background = 'transparent' }}
    >
      {icon}{label}
    </Link>
  )
}

function DropdownItem({ href, icon, label, onClick }: { href: string; icon: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <Link href={href} onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: '0.6rem',
      padding: '0.55rem 0.75rem', borderRadius: 8,
      color: 'var(--text-primary)', fontSize: '0.9rem',
      textDecoration: 'none', transition: 'background 0.2s',
    }}>
      {icon}{label}
    </Link>
  )
}

function MobileNavLink({ href, label, onClick }: { href: string; label: string; onClick: () => void }) {
  return (
    <Link href={href} onClick={onClick} style={{
      display: 'block', padding: '0.85rem 0.5rem',
      color: 'var(--text-primary)', textDecoration: 'none',
      fontWeight: 500, borderBottom: '1px solid var(--border)',
    }}>
      {label}
    </Link>
  )
}
