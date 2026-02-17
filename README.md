# SkillSwap 🎓
**Learn Anything. Teach Everything.**

A community-based skill exchange platform using time-banking to democratize education and make learning accessible to everyone.

[![HYP 7.0](https://img.shields.io/badge/HYP-7.0-blue)](https://hackwithyourpassion.com) [![SDG 4](https://img.shields.io/badge/SDG-4%20Quality%20Education-C5192D)](https://sdgs.un.org/goals/goal4) [![SDG 8](https://img.shields.io/badge/SDG-8%20Decent%20Work-A21942)](https://sdgs.un.org/goals/goal8) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 📋 Table of Contents
- [About](#-about)
- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [Getting Started](#-getting-started)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Database Schema](#️-database-schema)
- [SDG Alignment](#-sdg-alignment)
- [Roadmap](#️-roadmap)
- [Contributing](#-contributing)
- [Team](#-team)
- [License](#-license)

---

## 🌟 About

SkillSwap is a peer-to-peer skill exchange platform built for **HYP 7.0** under the **Open Innovation (SDG-Aligned)** theme.

### The Problem
- 68% of Indian youth lack access to quality skill development programs
- Traditional courses cost ₹10,000 - ₹1,00,000+
- Talented individuals without formal credentials cannot monetize their skills
- Geographic barriers limit access to quality education

### Our Solution
SkillSwap uses **time-banking** instead of money:

- ⏰ **1 hour of teaching = 1 time credit**
- 💰 Earn credits by teaching, spend credits by learning
- 🎁 New users receive **5 free starter credits**
- 🚫 **Zero financial barriers** to education

---

## ✨ Features

### Core Features
- ⏰ **Time-Banking System** - Currency-free skill exchange
- 🛒 **Skill Marketplace** - Browse 50+ categories (coding, languages, arts, crafts, etc.)
- ✅ **Community Verification** - Portfolios, ratings, reviews, endorsements
- 📅 **Integrated Sessions** - Built-in video calling (WebRTC), scheduling, reminders
- 🎓 **Learning Pathways** - Structured skill development tracks with certificates
- 🏘️ **Local Workshops** - Discover nearby teachers and organize community events
- 🏆 **Gamification** - Badges, leaderboards, streaks, challenges

### Advanced Features
- 📊 Real-time notifications via Socket.io
- 🎥 Session recordings (with consent)
- 📱 Fully responsive design (mobile, tablet, desktop)
- 🌐 Multi-language support
- 🔒 End-to-end encryption for video calls
- 📈 Analytics dashboard for tracking progress

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** (App Router) - React framework with SSR
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Accessible component library
- **Zustand** - State management

### Backend
- **Next.js API Routes** - Serverless functions
- **PostgreSQL** - Relational database
- **Prisma ORM** - Type-safe database client
- **Redis** - Caching and session management

### Real-Time & Communication
- **WebRTC** - Peer-to-peer video calling
- **Socket.io** - Real-time messaging
- **Simple-peer** - WebRTC wrapper

### Authentication & Security
- **NextAuth.js** - Authentication
- **bcrypt** - Password hashing
- **JWT** - Token-based sessions

### Deployment
- **Vercel** - Frontend hosting
- **Supabase** - PostgreSQL hosting
- **Redis Cloud** - Redis hosting

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm
- PostgreSQL database
- Redis instance (optional for development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourteam/skillswap.git
   cd skillswap
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   
   ```env
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/skillswap"
   
   # NextAuth
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"
   
   # OAuth Providers (optional)
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   
   # Redis (optional)
   REDIS_URL="redis://localhost:6379"
   
   # File Storage (optional)
   AWS_S3_BUCKET="your-bucket-name"
   AWS_ACCESS_KEY_ID="your-access-key"
   AWS_SECRET_ACCESS_KEY="your-secret-key"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run migrations
   npx prisma migrate dev
   
   # Seed database with sample data (optional)
   npm run seed
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📖 Usage

### For Learners
1. Sign up and receive **5 free starter credits**
2. Browse skills in the marketplace
3. View teacher profiles with portfolios and ratings
4. Book a session by spending time credits
5. Attend the session via built-in video call
6. Rate and review your teacher

### For Teachers
1. Create a skill listing with description and category
2. Upload portfolio samples and video introduction
3. Set your availability for sessions
4. Receive bookings from learners
5. Conduct sessions and earn time credits
6. Build your reputation through ratings

### Demo Accounts
For testing purposes:
- **Teacher**: `teacher@skillswap.demo` / `Demo@123`
- **Learner**: `learner@skillswap.demo` / `Demo@123`

---

## 📡 API Documentation

### Authentication
```http
POST /api/auth/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

### Skills
```http
GET /api/skills?category=coding&level=beginner
```

```http
POST /api/skills
Content-Type: application/json

{
  "title": "Web Development Basics",
  "description": "Learn HTML, CSS, and JavaScript",
  "category": "coding",
  "level": "beginner"
}
```

### Sessions
```http
POST /api/sessions
Content-Type: application/json

{
  "skillId": "uuid",
  "scheduledAt": "2024-03-15T10:00:00Z",
  "duration": 60
}
```

### Credits
```http
GET /api/users/:userId/credits
```

For complete API documentation, see [API.md](./docs/API.md)

---

## 🗄️ Database Schema

```sql
-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  name VARCHAR NOT NULL,
  bio TEXT,
  time_credits INTEGER DEFAULT 5,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Skills
CREATE TABLE skills (
  id UUID PRIMARY KEY,
  teacher_id UUID REFERENCES users(id),
  title VARCHAR NOT NULL,
  description TEXT,
  category VARCHAR,
  level VARCHAR,
  rating DECIMAL(3,2),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Sessions
CREATE TABLE sessions (
  id UUID PRIMARY KEY,
  skill_id UUID REFERENCES skills(id),
  teacher_id UUID REFERENCES users(id),
  learner_id UUID REFERENCES users(id),
  scheduled_at TIMESTAMP,
  duration INTEGER,
  status VARCHAR,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Transactions
CREATE TABLE transactions (
  id UUID PRIMARY KEY,
  from_user_id UUID REFERENCES users(id),
  to_user_id UUID REFERENCES users(id),
  session_id UUID REFERENCES sessions(id),
  credits INTEGER,
  transaction_type VARCHAR,
  created_at TIMESTAMP DEFAULT NOW()
);
```

For complete schema, see [schema.prisma](./prisma/schema.prisma)

---

## 🌍 SDG Alignment

SkillSwap directly contributes to three **United Nations Sustainable Development Goals**:

### SDG 4: Quality Education
- **Target 4.4**: Increase the number of youth and adults with relevant skills
- **Our Impact**: Free, accessible skill development for everyone

### SDG 8: Decent Work and Economic Growth
- **Target 8.6**: Reduce youth not in employment, education, or training
- **Our Impact**: Enable skill monetization and employment opportunities

### SDG 10: Reduced Inequalities
- **Our Impact**: Equal access regardless of income, location, or credentials

---

## 🗺️ Roadmap

### Phase 1: MVP (Hackathon) ✅
- [x] User authentication
- [x] Skill marketplace
- [x] Time-banking system
- [x] Session booking
- [x] Video calling integration
- [x] Rating and reviews

### Phase 2: Beta Launch (Month 1-3)
- [ ] Mobile app (React Native)
- [ ] Advanced search and filters
- [ ] Learning pathways
- [ ] Group sessions/workshops
- [ ] Payment integration for premium features

### Phase 3: Scale (Month 4-6)
- [ ] Multi-language support
- [ ] AI-powered skill recommendations
- [ ] Corporate partnerships
- [ ] Offline mode
- [ ] Analytics dashboard

### Phase 4: Expansion (Month 7-12)
- [ ] International rollout
- [ ] Blockchain-based certificates
- [ ] Integration with job platforms
- [ ] Mobile app for feature phones

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our code of conduct and development process.

---

## 👥 Team

**Team Name**: [Your Team Name]

- **[Member 1]** - Full-Stack Developer - [GitHub](https://github.com/member1) | [LinkedIn](https://linkedin.com/in/member1)
- **[Member 2]** - Frontend Developer - [GitHub](https://github.com/member2) | [LinkedIn](https://linkedin.com/in/member2)
- **[Member 3]** - Backend Developer - [GitHub](https://github.com/member3) | [LinkedIn](https://linkedin.com/in/member3)
- **[Member 4]** - UI/UX Designer - [Portfolio](https://portfolio.com) | [LinkedIn](https://linkedin.com/in/member4)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

## 🙏 Acknowledgments

- HYP 7.0 organizing committee for this opportunity
- Open-source community for amazing tools and libraries
- All our beta testers and early supporters

---

<div align="center">
  <p>Made with ❤️ for HYP 7.0</p>
  <p>Building a world where knowledge is free and accessible to all</p>
</div>
