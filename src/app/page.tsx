import type { Metadata } from 'next'
import HomeClient from '@/components/HomeClient'
import { places, blogPosts } from '@/lib/config'

export const metadata: Metadata = {
  title: 'WanderNepal — Discover the Roof of the World',
  description: 'Discover Nepal — mountains, temples, wildlife, culture. Plan your perfect Nepal adventure with WanderNepal.',
  alternates: { canonical: 'https://wandernepal.com.np' },
}

// JSON-LD structured data for Google
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  name: 'WanderNepal',
  url: 'https://wandernepal.com.np',
  description: 'Complete Nepal tourism guide — trekking, temples, wildlife, culture.',
  areaServed: { '@type': 'Country', name: 'Nepal' },
  image: '/hero-everest.jpg',
}

export default function HomePage() {
  // Data fetched server-side — no loading states needed!
  const featuredPlaces = places.slice(0, 6)
  const latestPosts = blogPosts.slice(0, 3)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HomeClient featuredPlaces={featuredPlaces} latestPosts={latestPosts} />
    </>
  )
}
