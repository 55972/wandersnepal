'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Clock, Check, X, ArrowRight, MapPin, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { tourPlans } from '@/lib/config'

type PlanType = 'all' | 'budget' | 'standard' | 'luxury' | 'trekking'
const typeLabels: Record<string, string> = { all: 'All Plans', budget: 'Budget Friendly', standard: 'Standard', luxury: 'Luxury', trekking: 'Trekking' }

export default function TourPlansClient() {
  const [selectedType, setSelectedType] = useState<PlanType>('all')
  const [expandedPlan, setExpandedPlan] = useState<string | null>(null)
  const filteredPlans = tourPlans.filter((plan) => selectedType === 'all' || plan.type === selectedType)

  return (
    <div className="min-h-screen bg-kaleo-sand pt-16 lg:pt-20">
      <div className="bg-kaleo-charcoal text-kaleo-cream py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-4">Tour Plans</h1>
          <p className="text-kaleo-cream/70 text-lg md:text-xl max-w-3xl">Curated itineraries for every type of traveler — from budget backpackers to luxury seekers.</p>
        </div>
      </div>

      <div className="sticky top-16 lg:top-20 z-40 bg-kaleo-cream border-b border-kaleo-terracotta/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <Filter className="w-4 h-4 text-kaleo-terracotta flex-shrink-0" />
            {(Object.keys(typeLabels) as PlanType[]).map((type) => (
              <button key={type} onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${selectedType === type ? 'bg-kaleo-terracotta text-white' : 'bg-white text-kaleo-charcoal hover:bg-kaleo-terracotta/10'}`}>
                {typeLabels[type]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredPlans.map((plan) => (
            <div key={plan.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
              <div className="aspect-[16/9] overflow-hidden relative">
                <img src={plan.image} alt={plan.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <Badge className="mb-2 bg-kaleo-terracotta text-white">{typeLabels[plan.type]}</Badge>
                  <h2 className="font-serif text-2xl text-white">{plan.name}</h2>
                </div>
              </div>
              <div className="p-6">
                <p className="text-kaleo-charcoal/70 text-sm mb-4">{plan.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-sm text-kaleo-charcoal/60"><Clock className="w-4 h-4" />{plan.duration}</div>
                  <div className="flex items-center gap-1 text-sm text-kaleo-charcoal/60"><MapPin className="w-4 h-4 text-kaleo-terracotta" />{plan.destinations?.length || 0} destinations</div>
                  <div className="font-serif text-xl text-kaleo-charcoal">{plan.price}<span className="text-sm text-kaleo-charcoal/50">/person</span></div>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                  <div>
                    <p className="font-medium text-kaleo-charcoal mb-1">Includes</p>
                    {plan.includes?.slice(0,3).map((item: string, i: number) => <div key={i} className="flex items-center gap-1 text-kaleo-charcoal/60"><Check className="w-3 h-3 text-green-500" />{item}</div>)}
                  </div>
                  <div>
                    <p className="font-medium text-kaleo-charcoal mb-1">Excludes</p>
                    {plan.excludes?.slice(0,3).map((item: string, i: number) => <div key={i} className="flex items-center gap-1 text-kaleo-charcoal/60"><X className="w-3 h-3 text-red-400" />{item}</div>)}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => setExpandedPlan(expandedPlan === plan.id ? null : plan.id)} variant="outline" className="flex-1 border-kaleo-terracotta text-kaleo-terracotta hover:bg-kaleo-terracotta hover:text-white text-sm">
                    {expandedPlan === plan.id ? 'Hide Details' : 'View Itinerary'}
                  </Button>
                  <Button className="flex-1 bg-kaleo-terracotta hover:bg-kaleo-charcoal text-white text-sm">
                    Book Now <ArrowRight className="ml-1 w-3 h-3" />
                  </Button>
                </div>
                {expandedPlan === plan.id && (
                  <div className="mt-4 pt-4 border-t border-kaleo-terracotta/10 space-y-3">
                    {plan.itinerary?.map((day: {day: number; title: string; description: string}) => (
                      <div key={day.day} className="border-l-2 border-kaleo-terracotta pl-3">
                        <p className="text-xs font-semibold text-kaleo-charcoal">Day {day.day}: {day.title}</p>
                        <p className="text-xs text-kaleo-charcoal/60">{day.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
