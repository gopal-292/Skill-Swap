import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { AuthProvider } from '@/components/AuthProvider'

export const metadata: Metadata = {
  title: 'SkillSwap — Learn Anything. Teach Everything.',
  description: 'A community-based skill exchange platform using time-banking to democratize education and make learning accessible to everyone.',
  keywords: 'skill exchange, time banking, online learning, peer-to-peer education, skill marketplace',
  openGraph: {
    title: 'SkillSwap',
    description: 'Exchange skills, not money. Learn anything, teach everything.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  )
}
