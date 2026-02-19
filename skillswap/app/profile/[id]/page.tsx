import { use } from 'react'
import Link from 'next/link'
import { MapPin, Clock, Star, Flame, BookOpen, ArrowLeft, Award } from 'lucide-react'

// Profile data by id
const PROFILES: Record<string, {
  name: string; bio: string; location: string; timeCredits: number; totalEarned: number;
  streak: number; rating: number; sessionsCount: number; joinedDate: string;
  skills: { id: string; title: string; category: string; level: string; rating: number; sessionCount: number }[];
  badges: { icon: string; name: string }[];
  reviews: { reviewer: string; rating: number; comment: string; skill: string; date: string }[];
}> = {
  't1': {
    name: 'Priya Sharma', bio: 'Full-stack developer with 6 years of experience. Passionate about making technology and programming accessible to everyone. I specialize in Python, web development, and machine learning. When not coding I enjoy reading and hiking.', location: 'Mumbai, Maharashtra',
    timeCredits: 18, totalEarned: 142, streak: 28, rating: 4.9, sessionsCount: 89, joinedDate: 'Jan 2024',
    skills: [
      { id: '1', title: 'Python for Beginners', category: 'coding', level: 'beginner', rating: 4.9, sessionCount: 340 },
      { id: '11', title: 'Data Science with Python', category: 'coding', level: 'advanced', rating: 4.9, sessionCount: 112 },
      { id: '5', title: 'React & Next.js', category: 'coding', level: 'intermediate', rating: 4.8, sessionCount: 90 },
    ],
    badges: [{ icon: '🏆', name: 'Top Contributor' }, { icon: '🔥', name: '28-Day Streak' }, { icon: '⭐', name: 'Top Rated' }, { icon: '🌱', name: 'Pioneer' }],
    reviews: [
      { reviewer: 'Ravi Kumar', rating: 5, comment: 'Priya is an amazing teacher! She explained every concept clearly.', skill: 'Python for Beginners', date: '2 days ago' },
      { reviewer: 'Sneha Patel', rating: 5, comment: 'Best coding session I\'ve ever had. Very practical.', skill: 'Python for Beginners', date: '1 week ago' },
      { reviewer: 'Arun Desai', rating: 4, comment: 'Great teacher, learned a lot about data science!', skill: 'Data Science with Python', date: '2 weeks ago' },
    ],
  },
}

const DEFAULT_PROFILE = {
  name: 'SkillSwap User', bio: 'Active member of the SkillSwap community.', location: 'India',
  timeCredits: 5, totalEarned: 10, streak: 3, rating: 4.7, sessionsCount: 8, joinedDate: 'Feb 2024',
  skills: [{ id: '2', title: 'Sample Skill', category: 'coding', level: 'beginner', rating: 4.5, sessionCount: 20 }],
  badges: [{ icon: '🌱', name: 'First Step' }],
  reviews: [{ reviewer: 'Student', rating: 5, comment: 'Great session!', skill: 'Sample Skill', date: '1 week ago' }],
}

function Stars({ rating }: { rating: number }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} size={13} fill={i <= Math.round(rating) ? '#ffd700' : 'none'} color={i <= Math.round(rating) ? '#ffd700' : 'var(--text-muted)'} />
      ))}
    </div>
  )
}

export default function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const profile = PROFILES[id] || DEFAULT_PROFILE

  return (
    <div style={{ minHeight: '100vh', paddingTop: '68px', paddingBottom: '4rem' }}>
      <div className="page-container" style={{ padding: '1.5rem 1.5rem 0' }}>
        <Link href="/marketplace" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>
          <ArrowLeft size={16} /> Back
        </Link>
      </div>

      <div className="page-container profile-grid" style={{ padding: '2rem 1.5rem', display: 'grid', gridTemplateColumns: '300px 1fr', gap: '2rem' }}>
        {/* Left sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Profile card */}
          <div className="card" style={{ textAlign: 'center' }}>
            {/* Avatar */}
            <div style={{ width: 90, height: 90, borderRadius: '50%', background: 'var(--gradient-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.2rem', fontWeight: 700, color: 'white', margin: '0 auto 1.25rem', boxShadow: 'var(--shadow-glow)' }}>
              {profile.name[0]}
            </div>
            <h1 style={{ fontSize: '1.3rem', marginBottom: '0.25rem' }}>{profile.name}</h1>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>
              <MapPin size={13} /> {profile.location}
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
              {[
                { label: 'Credits Earned', value: profile.totalEarned, color: 'var(--accent-violet)', icon: <Clock size={14} /> },
                { label: 'Sessions', value: profile.sessionsCount, color: '#64b5f6', icon: <BookOpen size={14} /> },
                { label: 'Rating', value: `${profile.rating}★`, color: '#ffd700', icon: <Star size={14} /> },
                { label: 'Streak', value: `${profile.streak}d`, color: '#ff8a65', icon: <Flame size={14} /> },
              ].map((stat, i) => (
                <div key={i} style={{ padding: '0.85rem', background: 'var(--bg-card)', borderRadius: 12, border: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem', color: stat.color, fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.25rem' }}>
                    {stat.icon} {stat.value}
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>{stat.label}</div>
                </div>
              ))}
            </div>

            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', paddingTop: '0.75rem', borderTop: '1px solid var(--border)' }}>
              Member since {profile.joinedDate}
            </div>
          </div>

          {/* Badges */}
          <div className="card">
            <h2 style={{ fontSize: '1rem', marginBottom: '1rem' }}>🏅 Badges</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
              {profile.badges.map((b, i) => (
                <div key={i} style={{ padding: '0.4rem 0.7rem', borderRadius: 8, background: 'rgba(124, 92, 191, 0.1)', border: '1px solid rgba(155, 111, 247, 0.2)', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  {b.icon} {b.name}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Bio */}
          <div className="card">
            <h2 style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>About</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>{profile.bio}</p>
          </div>

          {/* Skills */}
          <div className="card">
            <h2 style={{ fontSize: '1.1rem', marginBottom: '1.25rem' }}>Skills Teaching ({profile.skills.length})</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {profile.skills.map(skill => (
                <Link key={skill.id} href={`/marketplace/${skill.id}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'var(--bg-card)', borderRadius: 12, border: '1px solid var(--border)', transition: 'all 0.2s' }}>
                  <div>
                    <div style={{ fontWeight: 600, marginBottom: '0.25rem', color: 'var(--text-primary)' }}>{skill.title}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'capitalize', background: 'var(--bg-card-hover)', borderRadius: 6, padding: '0.15rem 0.5rem' }}>{skill.category}</span>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'capitalize' }}>{skill.level}</span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', justifyContent: 'flex-end' }}>
                      <Stars rating={skill.rating} />
                      <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{skill.rating}</span>
                    </div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: '0.25rem' }}>{skill.sessionCount} sessions</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div className="card">
            <h2 style={{ fontSize: '1.1rem', marginBottom: '1.25rem' }}>Reviews</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {profile.reviews.map((r, i) => (
                <div key={i} style={{ paddingBottom: '1.25rem', borderBottom: i < profile.reviews.length - 1 ? '1px solid var(--border)' : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--bg-card-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-violet)' }}>
                        {r.reviewer[0]}
                      </div>
                      <div>
                        <strong style={{ fontSize: '0.9rem' }}>{r.reviewer}</strong>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>on {r.skill}</div>
                      </div>
                    </div>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{r.date}</span>
                  </div>
                  <Stars rating={r.rating} />
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.5rem', lineHeight: 1.6 }}>{r.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .profile-grid { grid-template-columns: 300px 1fr; }
        @media(max-width: 800px){ .profile-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  )
}
