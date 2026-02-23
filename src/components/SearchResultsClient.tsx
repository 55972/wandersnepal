'use client'
import { useMemo } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Search, MapPin, BookOpen } from 'lucide-react'
import { places, blogPosts } from '@/lib/config'
import { Badge } from '@/components/ui/badge'

export default function SearchResultsClient() {
  const searchParams = useSearchParams()
  const q = searchParams.get('q') || ''

  const results = useMemo(() => {
    if (!q.trim()) return { places: [], posts: [] }
    const query = q.toLowerCase()
    return {
      places: places.filter(p => p.name.toLowerCase().includes(query) || p.shortDescription.toLowerCase().includes(query) || p.category.includes(query)),
      posts: blogPosts.filter(p => p.title.toLowerCase().includes(query) || p.excerpt.toLowerCase().includes(query) || p.tags.some(t => t.toLowerCase().includes(query))),
    }
  }, [q])

  const total = results.places.length + results.posts.length

  return (
    <div className="min-h-screen bg-kaleo-sand pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-kaleo-charcoal/60 mb-2"><Search className="w-4 h-4" /><span className="text-sm">Search results for</span></div>
          <h1 className="font-serif text-3xl text-kaleo-charcoal">&ldquo;{q}&rdquo;</h1>
          <p className="text-kaleo-charcoal/60 mt-1">{total} result{total !== 1 ? 's' : ''} found</p>
        </div>

        {total === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl">
            <Search className="w-12 h-12 text-kaleo-terracotta/30 mx-auto mb-4" />
            <h2 className="font-serif text-2xl text-kaleo-charcoal mb-2">No results found</h2>
            <p className="text-kaleo-charcoal/60">Try different keywords or browse our <Link href="/places" className="text-kaleo-terracotta underline">destinations</Link>.</p>
          </div>
        ) : (
          <div className="space-y-10">
            {results.places.length > 0 && (
              <section>
                <h2 className="font-serif text-2xl text-kaleo-charcoal mb-4 flex items-center gap-2"><MapPin className="w-5 h-5 text-kaleo-terracotta" />Destinations ({results.places.length})</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.places.map(p => (
                    <Link key={p.id} href={`/places/${p.id}`} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                      <div className="aspect-[4/3] overflow-hidden"><img src={p.images[0]} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /></div>
                      <div className="p-5">
                        <Badge className="mb-2 bg-kaleo-terracotta text-white text-xs">{p.category}</Badge>
                        <h3 className="font-serif text-lg text-kaleo-charcoal group-hover:text-kaleo-terracotta transition-colors">{p.name}</h3>
                        <p className="text-sm text-kaleo-charcoal/60 mt-1 line-clamp-2">{p.shortDescription}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
            {results.posts.length > 0 && (
              <section>
                <h2 className="font-serif text-2xl text-kaleo-charcoal mb-4 flex items-center gap-2"><BookOpen className="w-5 h-5 text-kaleo-terracotta" />Blog Posts ({results.posts.length})</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {results.posts.map(p => (
                    <Link key={p.id} href={`/blog/${p.id}`} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                      <div className="aspect-[16/10] overflow-hidden"><img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /></div>
                      <div className="p-5">
                        <span className="text-xs text-kaleo-terracotta uppercase tracking-wider">{p.category}</span>
                        <h3 className="font-serif text-base text-kaleo-charcoal group-hover:text-kaleo-terracotta transition-colors mt-1 line-clamp-2">{p.title}</h3>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
