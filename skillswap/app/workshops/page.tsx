import Link from 'next/link'
import { MapPin, Users, Calendar, ArrowRight, Clock } from 'lucide-react'

const WORKSHOPS = [
  {
    id: 'w1', title: 'Python Bootcamp Weekend', organizer: 'Priya Sharma', location: 'Bandra Community Center, Mumbai',
    date: 'Sat, Mar 1 — 10 AM to 5 PM', attendees: 18, maxAttendees: 25, category: 'coding',
    credits: 3, tags: ['Python', 'Beginners', 'In-person'],
    desc: 'A full-day hands-on Python workshop. Bring your laptop! From basics to building a mini web app.',
  },
  {
    id: 'w2', title: 'Language Exchange Café', organizer: 'Carlos Mendez', location: 'Third Wave Coffee, Connaught Place, Delhi',
    date: 'Sun, Mar 2 — 4 PM to 7 PM', attendees: 12, maxAttendees: 20, category: 'languages',
    credits: 1, tags: ['Spanish', 'French', 'Languages', 'Social'],
    desc: 'Practice conversational languages in a relaxed café environment. All languages welcome!',
  },
  {
    id: 'w3', title: 'Outdoor Yoga & Mindfulness', organizer: 'Deepika Joshi', location: 'Lal Bagh Botanical Garden, Bangalore',
    date: 'Sat, Mar 1 — 6 AM to 8 AM', attendees: 30, maxAttendees: 40, category: 'fitness',
    credits: 1, tags: ['Yoga', 'Morning', 'Outdoor', 'Beginner-friendly'],
    desc: 'Start your weekend with sunrise yoga and guided mindfulness meditation in the beautiful garden.',
  },
  {
    id: 'w4', title: 'Indian Spice Masterclass', organizer: 'Meera Iyer', location: 'Meera\'s Kitchen Studio, Hyderabad',
    date: 'Sun, Mar 9 — 11 AM to 2 PM', attendees: 8, maxAttendees: 12, category: 'cooking',
    credits: 2, tags: ['Cooking', 'Spices', 'Hands-on'],
    desc: 'Learn the art of Indian spice blending. You\'ll make garam masala, sambar powder, and more from scratch.',
  },
  {
    id: 'w5', title: 'Photography Walk: Street Photography', organizer: 'Arjun Kapoor', location: 'Fontainhas Latin Quarter, Goa',
    date: 'Fri, Mar 7 — 4 PM to 7 PM', attendees: 9, maxAttendees: 15, category: 'photography',
    credits: 2, tags: ['Photography', 'Street', 'Outdoor'],
    desc: 'Explore the colorful streets of Fontainhas while learning street photography techniques.',
  },
  {
    id: 'w6', title: 'Open Mic Craft Session', organizer: 'Nisha Gupta', location: 'The Craft Hub, Jaipur',
    date: 'Sat, Mar 8 — 2 PM to 6 PM', attendees: 14, maxAttendees: 20, category: 'crafts',
    credits: 2, tags: ['Crafts', 'Macramé', 'Hands-on', 'Social'],
    desc: 'Learn macramé and knitting basics in a social, creative atmosphere. Materials provided!',
  },
]

const CAT_COLORS: Record<string, string> = {
  coding: '#64b5f6', languages: '#81c784', fitness: '#ff8a65', cooking: '#a5d6a7', photography: '#ff8a65', crafts: '#ce93d8',
}

export default function WorkshopsPage() {
  return (
    <div style={{ minHeight: '100vh', paddingTop: '68px', paddingBottom: '4rem' }}>
      {/* Header */}
      <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)', padding: '3rem 0 2rem' }}>
        <div className="page-container">
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', marginBottom: '0.75rem' }}>
            🏘️ Local <span className="gradient-text">Workshops</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>Find nearby teachers and join community events in your city.</p>
        </div>
      </div>

      <div className="page-container" style={{ padding: '2.5rem 1.5rem' }}>
        {/* Info banner */}
        <div style={{ background: 'linear-gradient(135deg, rgba(124, 92, 191, 0.1), rgba(0, 229, 255, 0.05))', border: '1px solid rgba(155, 111, 247, 0.2)', borderRadius: 16, padding: '1.25rem 1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ fontSize: '1.5rem' }}>📍</div>
          <div>
            <div style={{ fontWeight: 600, marginBottom: '0.2rem' }}>Discover in-person learning</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Workshops near you. Pay with time credits — no cash needed.</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
          {WORKSHOPS.map((ws) => {
            const catColor = CAT_COLORS[ws.category] || 'var(--accent-violet)'
            const fillPct = (ws.attendees / ws.maxAttendees) * 100
            const isFull = ws.attendees >= ws.maxAttendees

            return (
              <div key={ws.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <span style={{ background: `${catColor}22`, color: catColor, borderRadius: 8, padding: '0.25rem 0.65rem', fontSize: '0.78rem', fontWeight: 600, textTransform: 'capitalize' }}>{ws.category}</span>
                  <div className="credit-chip" style={{ fontSize: '0.78rem' }}><Clock size={12} />{ws.credits} credits</div>
                </div>

                <h3 style={{ fontSize: '1.05rem', marginBottom: '0.5rem' }}>{ws.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1rem', lineHeight: 1.5, flex: 1 }}>{ws.desc}</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    <MapPin size={13} /> {ws.location}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    <Calendar size={13} /> {ws.date}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    <Users size={13} /> {ws.attendees}/{ws.maxAttendees} attendees
                  </div>
                </div>

                {/* Capacity bar */}
                <div style={{ marginBottom: '0.75rem' }}>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${fillPct}%`, background: isFull ? '#ff5252' : 'var(--gradient-main)' }} />
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
                    {isFull ? '🔴 Full' : `${ws.maxAttendees - ws.attendees} spots left`}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                  {ws.tags.map(tag => (
                    <span key={tag} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 6, padding: '0.15rem 0.5rem', fontSize: '0.72rem', color: 'var(--text-muted)' }}>#{tag}</span>
                  ))}
                </div>

                <button
                  disabled={isFull}
                  style={{
                    background: isFull ? 'var(--bg-card)' : 'var(--gradient-main)',
                    color: isFull ? 'var(--text-muted)' : 'white',
                    border: 'none', borderRadius: 10, padding: '0.75rem',
                    cursor: isFull ? 'not-allowed' : 'pointer',
                    fontWeight: 600, fontSize: '0.9rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                  }}
                >
                  {isFull ? 'Workshop Full' : `Join Workshop — ${ws.credits} Credit${ws.credits > 1 ? 's' : ''}`}
                  {!isFull && <ArrowRight size={14} />}
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
