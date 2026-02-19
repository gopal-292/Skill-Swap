'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, Filter, Star, Clock, BookOpen, ChevronDown } from 'lucide-react'

const CATEGORIES = ['all', 'coding', 'languages', 'music', 'arts', 'fitness', 'cooking', 'crafts', 'business', 'photography', 'writing', 'math', 'science']
const LEVELS = ['all', 'beginner', 'intermediate', 'advanced']

type Skill = {
  id: string
  title: string
  description: string
  category: string
  level: string
  rating: number
  reviewCount: number
  sessionCount: number
  teacher: { id: string; name: string; avatar: string | null; location: string | null }
}

const MOCK_SKILLS: Skill[] = [
  { id: '1', title: 'Python for Beginners', description: 'Learn programming fundamentals with Python. No experience needed!', category: 'coding', level: 'beginner', rating: 4.9, reviewCount: 127, sessionCount: 340, teacher: { id: 't1', name: 'Priya Sharma', avatar: null, location: 'Mumbai' } },
  { id: '2', title: 'Conversational Spanish', description: 'Hold real conversations in Spanish within weeks using proven techniques.', category: 'languages', level: 'beginner', rating: 4.8, reviewCount: 89, sessionCount: 212, teacher: { id: 't2', name: 'Carlos Mendez', avatar: null, location: 'Delhi' } },
  { id: '3', title: 'UI/UX Design Fundamentals', description: 'Master Figma and design thinking. Build portfolio-ready projects.', category: 'arts', level: 'intermediate', rating: 4.7, reviewCount: 64, sessionCount: 178, teacher: { id: 't3', name: 'Anjali Rao', avatar: null, location: 'Bangalore' } },
  { id: '4', title: 'Guitar for Absolute Beginners', description: 'From zero to your first song. Learn chords, strumming, and rhythm.', category: 'music', level: 'beginner', rating: 4.9, reviewCount: 203, sessionCount: 520, teacher: { id: 't4', name: 'Rohan Mehta', avatar: null, location: 'Pune' } },
  { id: '5', title: 'React & Next.js Development', description: 'Build modern full-stack web apps. Learn hooks, routing, API integration.', category: 'coding', level: 'intermediate', rating: 4.8, reviewCount: 91, sessionCount: 267, teacher: { id: 't5', name: 'Vikram Nair', avatar: null, location: 'Chennai' } },
  { id: '6', title: 'Indian Classical Cooking', description: 'Master authentic Indian recipes — from basics to restaurant quality dishes.', category: 'cooking', level: 'beginner', rating: 5.0, reviewCount: 156, sessionCount: 390, teacher: { id: 't6', name: 'Meera Iyer', avatar: null, location: 'Hyderabad' } },
  { id: '7', title: 'Yoga & Mindfulness', description: 'Daily yoga practice for flexibility, strength, and mental clarity.', category: 'fitness', level: 'all', rating: 4.9, reviewCount: 310, sessionCount: 780, teacher: { id: 't7', name: 'Deepika Joshi', avatar: null, location: 'Rishikesh' } },
  { id: '8', title: 'Digital Photography', description: 'Learn composition, lighting, and post-processing. DSLR and mobile both.', category: 'photography', level: 'beginner', rating: 4.6, reviewCount: 73, sessionCount: 198, teacher: { id: 't8', name: 'Arjun Kapoor', avatar: null, location: 'Goa' } },
  { id: '9', title: 'Business English Writing', description: 'Write professional emails, reports, and presentations with confidence.', category: 'business', level: 'intermediate', rating: 4.7, reviewCount: 44, sessionCount: 120, teacher: { id: 't9', name: 'Sarah Thomas', avatar: null, location: 'Kolkata' } },
  { id: '10', title: 'Macramé & Knitting Crafts', description: 'Create beautiful handcrafted items. Great for beginners and relaxation.', category: 'crafts', level: 'beginner', rating: 4.8, reviewCount: 88, sessionCount: 220, teacher: { id: 't10', name: 'Nisha Gupta', avatar: null, location: 'Jaipur' } },
  { id: '11', title: 'Data Science with Python', description: 'Pandas, Matplotlib, Scikit-Learn. Real datasets and projects.', category: 'coding', level: 'advanced', rating: 4.9, reviewCount: 112, sessionCount: 290, teacher: { id: 't11', name: 'Aditya Singh', avatar: null, location: 'Noida' } },
  { id: '12', title: 'Creative Writing & Storytelling', description: 'Craft compelling stories. Fiction, non-fiction, screenwriting techniques.', category: 'writing', level: 'intermediate', rating: 4.7, reviewCount: 57, sessionCount: 145, teacher: { id: 't12', name: 'Kavya Pillai', avatar: null, location: 'Trivandrum' } },
]

const CAT_COLORS: Record<string, string> = {
  coding: '#64b5f6', languages: '#81c784', arts: '#f48fb1', music: '#ffcc02',
  fitness: '#ff8a65', cooking: '#a5d6a7', crafts: '#ce93d8', business: '#90caf9',
  photography: '#ff8a65', writing: '#80cbc4', math: '#ef9a9a', science: '#b39ddb',
}

function SkillCard({ skill }: { skill: Skill }) {
  const catColor = CAT_COLORS[skill.category] || 'var(--accent-violet)'
  return (
    <Link href={`/marketplace/${skill.id}`} style={{ textDecoration: 'none' }}>
      <div className="card" style={{ cursor: 'pointer', height: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
          <span style={{
            background: `${catColor}22`, color: catColor, borderRadius: 8,
            padding: '0.25rem 0.65rem', fontSize: '0.78rem', fontWeight: 600, textTransform: 'capitalize',
          }}>
            {skill.category}
          </span>
          <div className="credit-chip" style={{ fontSize: '0.78rem' }}>
            <Clock size={12} />1 credit/hr
          </div>
        </div>

        <h3 style={{ fontSize: '1.05rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{skill.title}</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '1rem' }}>
          {skill.description.length > 80 ? skill.description.slice(0, 80) + '…' : skill.description}
        </p>

        {/* Teacher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            background: 'var(--gradient-main)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.8rem', fontWeight: 700, color: 'white', flexShrink: 0,
          }}>{skill.teacher.name[0]}</div>
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-primary)' }}>{skill.teacher.name}</div>
            {skill.teacher.location && <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>📍 {skill.teacher.location}</div>}
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: '1rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Star size={13} fill="#ffd700" color="#ffd700" />
            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{skill.rating.toFixed(1)}</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>({skill.reviewCount})</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <BookOpen size={13} color="var(--text-muted)" />
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{skill.sessionCount} sessions</span>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <span style={{
              background: 'rgba(0, 230, 118, 0.1)', color: '#00e676',
              borderRadius: 6, padding: '0.2rem 0.5rem', fontSize: '0.75rem', fontWeight: 600, textTransform: 'capitalize',
            }}>{skill.level}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function MarketplacePage() {
  const [category, setCategory] = useState('all')
  const [level, setLevel] = useState('all')
  const [search, setSearch] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const filtered = MOCK_SKILLS.filter(s => {
    const matchCat = category === 'all' || s.category === category
    const matchLvl = level === 'all' || s.level === level || s.level === 'all'
    const matchSearch = !search || s.title.toLowerCase().includes(search.toLowerCase()) || s.description.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchLvl && matchSearch
  })

  return (
    <div style={{ minHeight: '100vh', paddingTop: '68px' }}>
      {/* Header */}
      <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)', padding: '3rem 0 2rem' }}>
        <div className="page-container">
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', marginBottom: '0.75rem' }}>
            Skill <span className="gradient-text">Marketplace</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            Browse {MOCK_SKILLS.length}+ skills. All sessions cost just 1 time credit.
          </p>

          {/* Search bar */}
          <div style={{ position: 'relative', maxWidth: 600 }}>
            <Search size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              className="input"
              placeholder="Search skills, categories, teachers…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ paddingLeft: '3rem', fontSize: '1rem' }}
            />
          </div>
        </div>
      </div>

      <div className="page-container" style={{ padding: '2rem 1.5rem' }}>
        {/* Filter row */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <button onClick={() => setShowFilters(!showFilters)} style={{
            display: 'flex', alignItems: 'center', gap: '0.4rem',
            padding: '0.5rem 1rem', borderRadius: 10,
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.9rem',
          }}>
            <Filter size={14} /> Filters <ChevronDown size={14} />
          </button>

          {/* Category pills */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)} style={{
                padding: '0.45rem 1rem', borderRadius: 100, cursor: 'pointer',
                background: category === cat ? 'var(--gradient-main)' : 'var(--bg-card)',
                border: `1px solid ${category === cat ? 'transparent' : 'var(--border)'}`,
                color: category === cat ? 'white' : 'var(--text-secondary)',
                fontSize: '0.85rem', fontWeight: 500, transition: 'all 0.2s', textTransform: 'capitalize',
              }}>
                {cat === 'all' ? 'All Skills' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Level filter */}
        {showFilters && (
          <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 500 }}>Level:</span>
            {LEVELS.map(lvl => (
              <button key={lvl} onClick={() => setLevel(lvl)} style={{
                padding: '0.35rem 0.85rem', borderRadius: 100, cursor: 'pointer',
                background: level === lvl ? 'rgba(155, 111, 247, 0.2)' : 'var(--bg-card)',
                border: `1px solid ${level === lvl ? 'var(--accent-violet)' : 'var(--border)'}`,
                color: level === lvl ? 'var(--accent-violet)' : 'var(--text-secondary)',
                fontSize: '0.85rem', textTransform: 'capitalize', transition: 'all 0.2s',
              }}>
                {lvl === 'all' ? 'All Levels' : lvl}
              </button>
            ))}
          </div>
        )}

        {/* Results count */}
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          {filtered.length} skills found
        </p>

        {/* Grid */}
        <div className="grid-skills">
          {filtered.map(skill => <SkillCard key={skill.id} skill={skill} />)}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
            <h3 style={{ marginBottom: '0.5rem' }}>No skills found</h3>
            <p>Try a different search or category</p>
          </div>
        )}
      </div>
    </div>
  )
}
