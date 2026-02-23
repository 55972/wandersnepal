import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import { AuthProvider } from '@/contexts/AuthContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  metadataBase: new URL('https://wandernepal.com.np'),
  title: {
    default: 'WanderNepal — Discover the Roof of the World',
    template: '%s | WanderNepal',
  },
  description: 'Discover Nepal — A Complete Tourism Guide to the Roof of the World. Explore mountains, temples, wildlife, ancient culture, trekking routes, and tour plans.',
  keywords: ['Nepal tourism', 'Nepal travel guide', 'Everest trekking', 'Kathmandu', 'Pokhara', 'Nepal tour packages', 'Himalayan adventures'],
  authors: [{ name: 'WanderNepal' }],
  creator: 'WanderNepal',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://wandernepal.com.np',
    siteName: 'WanderNepal',
    title: 'WanderNepal — Discover the Roof of the World',
    description: 'Your complete guide to traveling Nepal — trekking, temples, wildlife, and culture.',
    images: [{ url: '/hero-everest.jpg', width: 1200, height: 630, alt: 'Mount Everest — Nepal' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WanderNepal — Discover the Roof of the World',
    description: 'Your complete guide to traveling Nepal.',
    images: ['/hero-everest.jpg'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  alternates: { canonical: 'https://wandernepal.com.np' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Toaster position="top-right" />
        </AuthProvider>
      </body>
    </html>
  )
}
