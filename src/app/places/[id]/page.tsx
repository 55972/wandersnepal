import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { places } from '@/lib/config'
import PlaceDetailsClient from '@/components/PlaceDetailsClient'

interface Props { params: { id: string } }

// Generate all place pages at build time for best SEO
export async function generateStaticParams() {
  return places.map((place) => ({ id: place.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const place = places.find((p) => p.id === params.id)
  if (!place) return { title: 'Destination Not Found' }
  return {
    title: place.name,
    description: place.shortDescription,
    keywords: [place.name, 'Nepal', place.category, 'travel', 'tourism'],
    alternates: { canonical: `https://wandernepal.com.np/places/${place.id}` },
    openGraph: {
      title: `${place.name} | WanderNepal`,
      description: place.shortDescription,
      images: [{ url: place.images[0], width: 1200, height: 630, alt: place.name }],
    },
  }
}

export default function PlaceDetailsPage({ params }: Props) {
  const place = places.find((p) => p.id === params.id)
  if (!place) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: place.name,
    description: place.shortDescription,
    image: place.images,
    geo: { '@type': 'GeoCoordinates', latitude: place.location.latitude, longitude: place.location.longitude },
    address: { '@type': 'PostalAddress', addressLocality: place.location.address, addressCountry: 'NP' },
    touristType: place.category,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PlaceDetailsClient place={place} />
    </>
  )
}
