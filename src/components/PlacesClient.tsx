'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, Mountain, TreePine, Building2, Waves, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { type Place } from '@/lib/config'

type CategoryFilter = 'all' | 'mountain' | 'temple' | 'city' | 'wildlife' | 'lake' | 'trekking'

const categoryIcons: Record<string, React.ElementType> = {
  mountain: Mountain, temple: Building2, city: Building2, wildlife: TreePine, lake: Waves, trekking: Mountain,
}
const categoryLabels: Record<string, string> = {
  all: 'All Destinations', mountain: 'Mountains', temple: 'Temples & Heritage',
  city: 'Cities', wildlife: 'Wildlife', lake: 'Lakes', trekking: 'Trekking',
}
const categories: CategoryFilter[] = ['all', 'mountain', 'temple', 'city', 'wildlife', 'lake', 'trekking']

export default function PlacesClient({ places }: { places: Place[] }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all')

  const filteredPlaces = useMemo(() => places.filter((place) => {
    const matchesSearch = place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || place.category === selectedCategory
    return matchesSearch && matchesCategory
  }), [places, searchQuery, selectedCategory])

  return (
    <div className="min-h-screen bg-kaleo-sand pt-16 lg:pt-20">
      <div className="bg-kaleo-charcoal text-kaleo-cream py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-4">Explore Destinations</h1>
            <p className="text-kaleo-cream/70 text-lg md:text-xl">Discover Nepal&apos;s most incredible places — from the world&apos;s highest peaks to ancient temples, wildlife reserves to serene lakes.</p>
          </div>
        </div>
      </div>

      <div className="sticky top-16 lg:top-20 z-40 bg-kaleo-cream border-b border-kaleo-terracotta/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-kaleo-charcoal/40" />
              <Input type="text" placeholder="Search destinations..." value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full bg-white border-kaleo-terracotta/20" />
              {searchQuery && <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2"><X className="w-4 h-4 text-kaleo-charcoal/40" /></button>}
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {categories.map((cat) => {
                const Icon = categoryIcons[cat]
                return (
                  <Button key={cat} variant={selectedCategory === cat ? 'default' : 'outline'} size="sm"
                    onClick={() => setSelectedCategory(cat)}
                    className={selectedCategory === cat ? 'bg-kaleo-terracotta text-white whitespace-nowrap' : 'whitespace-nowrap border-kaleo-terracotta/30 text-kaleo-charcoal hover:border-kaleo-terracotta'}>
                    {Icon && <Icon className="w-3 h-3 mr-1" />}
                    {categoryLabels[cat]}
                  </Button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <p className="text-sm text-kaleo-charcoal/60 mb-6">{filteredPlaces.length} destination{filteredPlaces.length !== 1 ? 's' : ''} found</p>
        {filteredPlaces.length === 0 ? (
          <div className="text-center py-16">
            <p className="font-serif text-2xl text-kaleo-charcoal mb-4">No destinations found</p>
            <Button onClick={() => { setSearchQuery(''); setSelectedCategory('all') }} variant="outline" className="border-kaleo-terracotta text-kaleo-terracotta">Clear filters</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredPlaces.map((place) => (
              <Link key={place.id} href={`/places/${place.id}`} className="group">
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img src={place.images[0]} alt={place.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <Badge className="absolute top-3 left-3 bg-kaleo-terracotta text-white text-xs">{categoryLabels[place.category]}</Badge>
                  </div>
                  <div className="p-5">
                    <h2 className="font-serif text-xl text-kaleo-charcoal mb-1 group-hover:text-kaleo-terracotta transition-colors">{place.name}</h2>
                    <p className="text-sm text-kaleo-charcoal/60 line-clamp-2 mb-3">{place.shortDescription}</p>
                    <div className="flex items-center justify-between text-xs text-kaleo-charcoal/50">
                      <span>{place.location.address}</span>
                      <span className="text-kaleo-terracotta font-medium">Best: {place.bestTimeToVisit.split('.')[0]}</span>
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
