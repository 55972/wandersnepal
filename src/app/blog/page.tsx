import type { Metadata } from 'next'
import { blogPosts } from '@/lib/config'
import BlogClient from '@/components/BlogClient'

export const metadata: Metadata = {
  title: 'Travel Stories & Blog',
  description: 'Inspiring tales, practical tips, and firsthand experiences from travelers exploring the magic of Nepal.',
  alternates: { canonical: 'https://wandernepal.com.np/blog' },
}

export default function BlogPage() {
  return <BlogClient posts={blogPosts} />
}
