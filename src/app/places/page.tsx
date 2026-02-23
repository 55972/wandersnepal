import type { Metadata } from 'next'
import { places } from '@/lib/config'
import PlacesClient from '@/components/PlacesClient'

export const metadata: Metadata = {
  title: 'Explore Destinations',
  description: "Discover Nepal's most incredible places — from the world's highest peaks to ancient temples, wildlife reserves to serene lakes.",
  alternates: { canonical: 'https://wandernepal.com.np/places' },
  openGraph: { title: 'Explore Nepal Destinations | WanderNepal', images: ['/everest-basecamp.jpg'] },
}

export default function PlacesPage() {
  return <PlacesClient places={places} />
}
