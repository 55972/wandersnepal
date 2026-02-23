'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, Calendar, User, X, ArrowLeft, Share2, Bookmark, Facebook, Twitter } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { type BlogPost } from '@/lib/config'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const categories = ['All', 'Trekking Stories', 'Travel Stories', 'Spiritual Journeys', 'Wildlife Adventures', 'Tips & Guides']

export function BlogClient({ posts }: { posts: BlogPost[] }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredPosts = useMemo(() => posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory
    return matchesSearch && matchesCategory
  }), [posts, searchQuery, selectedCategory])

  return (
    <div className="min-h-screen bg-kaleo-sand pt-16 lg:pt-20">
      <div className="bg-kaleo-charcoal text-kaleo-cream py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-4">Travel Stories</h1>
            <p className="text-kaleo-cream/70 text-lg md:text-xl">Inspiring tales, practical tips, and firsthand experiences from travelers exploring the magic of Nepal.</p>
          </div>
        </div>
      </div>

      <div className="sticky top-16 lg:top-20 z-40 bg-kaleo-cream border-b border-kaleo-terracotta/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-kaleo-charcoal/40" />
              <Input type="text" placeholder="Search stories..." value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 w-full bg-white border-kaleo-terracotta/20" />
              {searchQuery && <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2"><X className="w-4 h-4 text-kaleo-charcoal/40" /></button>}
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {categories.map((cat) => (
                <Button key={cat} variant={selectedCategory === cat ? 'default' : 'outline'} size="sm"
                  onClick={() => setSelectedCategory(cat)}
                  className={selectedCategory === cat ? 'bg-kaleo-terracotta text-white whitespace-nowrap' : 'whitespace-nowrap border-kaleo-terracotta/30 text-kaleo-charcoal'}>
                  {cat}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16">
            <p className="font-serif text-2xl text-kaleo-charcoal mb-4">No stories found</p>
            <Button onClick={() => { setSearchQuery(''); setSelectedCategory('All') }} variant="outline" className="border-kaleo-terracotta text-kaleo-terracotta">Clear filters</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`} className="group">
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6">
                    <span className="text-xs uppercase tracking-wider text-kaleo-terracotta mb-2 block">{post.category}</span>
                    <h2 className="font-serif text-lg text-kaleo-charcoal mb-2 group-hover:text-kaleo-terracotta transition-colors line-clamp-2">{post.title}</h2>
                    <p className="text-sm text-kaleo-charcoal/60 line-clamp-2 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-kaleo-charcoal/50">
                      <span className="flex items-center gap-1"><User className="w-3 h-3" />{post.author}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{post.date}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export function BlogPostClient({ post, relatedPosts }: { post: BlogPost; relatedPosts: BlogPost[] }) {
  const router = useRouter()

  const handleShare = (platform: string) => {
    const url = window.location.href
    const text = `Check out: ${post.title}`
    const urls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
    }
    if (urls[platform]) window.open(urls[platform], '_blank', 'width=600,height=400')
  }

  return (
    <div className="min-h-screen bg-kaleo-sand pt-16 lg:pt-20">
      <div className="relative h-[50vh] md:h-[60vh]">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <button onClick={() => router.back()} className="absolute top-4 left-4 z-10 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-4 bg-kaleo-terracotta text-white">{post.category}</Badge>
            <h1 className="font-serif text-3xl md:text-5xl text-white mb-4">{post.title}</h1>
            <div className="flex items-center gap-4 text-white/70 text-sm">
              <span className="flex items-center gap-1"><User className="w-4 h-4" />{post.author}</span>
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{post.date}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="bg-white rounded-2xl p-6 md:p-10 mb-8">
          <p className="text-lg text-kaleo-terracotta font-serif italic mb-6">{post.excerpt}</p>
          <div className="prose prose-lg max-w-none text-kaleo-charcoal/80 leading-relaxed">
            <p>{post.content}</p>
          </div>
          <div className="mt-8 pt-8 border-t border-kaleo-terracotta/10 flex items-center justify-between">
            <div className="flex flex-wrap gap-2">{post.tags.map((tag) => <Badge key={tag} variant="outline" className="border-kaleo-terracotta/30 text-kaleo-terracotta text-xs">{tag}</Badge>)}</div>
            <div className="flex gap-2">
              <button onClick={() => handleShare('facebook')} className="p-2 rounded-full bg-kaleo-sand hover:bg-kaleo-terracotta hover:text-white transition-colors"><Facebook className="w-4 h-4" /></button>
              <button onClick={() => handleShare('twitter')} className="p-2 rounded-full bg-kaleo-sand hover:bg-kaleo-terracotta hover:text-white transition-colors"><Twitter className="w-4 h-4" /></button>
              <button onClick={() => toast.success('Bookmarked!')} className="p-2 rounded-full bg-kaleo-sand hover:bg-kaleo-terracotta hover:text-white transition-colors"><Bookmark className="w-4 h-4" /></button>
              <button onClick={() => { navigator.clipboard?.writeText(window.location.href); toast.success('Link copied!') }} className="p-2 rounded-full bg-kaleo-sand hover:bg-kaleo-terracotta hover:text-white transition-colors"><Share2 className="w-4 h-4" /></button>
            </div>
          </div>
        </div>

        {relatedPosts.length > 0 && (
          <div>
            <h2 className="font-serif text-2xl text-kaleo-charcoal mb-6">Related Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rp) => (
                <Link key={rp.id} href={`/blog/${rp.id}`} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                  <div className="aspect-[16/10] overflow-hidden"><img src={rp.image} alt={rp.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /></div>
                  <div className="p-4"><h3 className="font-serif text-base text-kaleo-charcoal group-hover:text-kaleo-terracotta transition-colors line-clamp-2">{rp.title}</h3></div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default BlogClient
