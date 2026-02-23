import { MetadataRoute } from 'next'
import { places, blogPosts } from '@/lib/config'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://wandernepal.com.np'

  const placeUrls = places.map((place) => ({
    url: `${base}/places/${place.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const blogUrls = blogPosts.map((post) => ({
    url: `${base}/blog/${post.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [
    { url: base, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${base}/places`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/tour-plans`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/tour-guides`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    ...placeUrls,
    ...blogUrls,
  ]
}
