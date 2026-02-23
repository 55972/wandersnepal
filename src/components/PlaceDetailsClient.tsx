'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, MapPin, Calendar, DollarSign, Star, Utensils, Compass, Info, Check, Send } from 'lucide-react'
import { type Place } from '@/lib/config'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'

export default function PlaceDetailsClient({ place }: { place: Place }) {
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const [reviewText, setReviewText] = useState('')
  const [rating, setRating] = useState(5)

  const handleReview = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isAuthenticated) { toast.error('Please login to leave a review'); router.push('/login'); return }
    if (!reviewText.trim()) { toast.error('Please write a review'); return }
    toast.success('Review submitted! Thank you.')
    setReviewText('')
  }

  return (
    <div className="min-h-screen bg-kaleo-sand pt-16 lg:pt-20">
      <div className="relative h-[50vh] md:h-[60vh]">
        <img src={place.images[0]} alt={place.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <button onClick={() => router.back()} className="absolute top-4 left-4 z-10 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            <Badge className="mb-4 bg-kaleo-terracotta text-white">{place.category.charAt(0).toUpperCase() + place.category.slice(1)}</Badge>
            <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white mb-2">{place.name}</h1>
            <div className="flex items-center text-white/80 text-sm md:text-base"><MapPin className="w-4 h-4 mr-1" />{place.location.address}</div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="w-full justify-start overflow-x-auto bg-white p-1 rounded-xl">
            {['overview', 'guide', 'itinerary', 'reviews'].map(tab => (
              <TabsTrigger key={tab} value={tab} className="data-[state=active]:bg-kaleo-terracotta data-[state=active]:text-white capitalize">
                {tab === 'reviews' ? `Reviews (${place.reviews.length})` : tab}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <section className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="font-serif text-2xl text-kaleo-charcoal mb-4">About {place.name}</h2>
                  <p className="text-kaleo-charcoal/70 leading-relaxed">{place.fullDescription}</p>
                </section>
                {place.religiousImportance && (
                  <section className="bg-white rounded-2xl p-6 md:p-8">
                    <h2 className="font-serif text-2xl text-kaleo-charcoal mb-4">Religious Significance</h2>
                    <p className="text-kaleo-charcoal/70 leading-relaxed">{place.religiousImportance}</p>
                  </section>
                )}
                <section className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="font-serif text-2xl text-kaleo-charcoal mb-4"><Utensils className="inline w-5 h-5 mr-2" />Local Foods</h2>
                  <div className="flex flex-wrap gap-2">{place.localFoods.map((f, i) => <Badge key={i} variant="outline" className="border-kaleo-terracotta text-kaleo-terracotta">{f}</Badge>)}</div>
                </section>
                <section className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="font-serif text-2xl text-kaleo-charcoal mb-4"><Compass className="inline w-5 h-5 mr-2" />Things To Do</h2>
                  <ul className="space-y-2">{place.thingsToDo.map((t, i) => <li key={i} className="flex items-start gap-2 text-kaleo-charcoal/70"><Check className="w-4 h-4 text-kaleo-terracotta mt-0.5 flex-shrink-0" />{t}</li>)}</ul>
                </section>
              </div>
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6">
                  <h3 className="font-serif text-xl text-kaleo-charcoal mb-4"><Info className="inline w-4 h-4 mr-2" />Quick Facts</h3>
                  <dl className="space-y-3">{Object.entries(place.quickFacts).map(([k, v]) => <div key={k}><dt className="text-xs uppercase tracking-wider text-kaleo-terracotta">{k}</dt><dd className="text-sm text-kaleo-charcoal/70">{v}</dd></div>)}</dl>
                </div>
                <div className="bg-white rounded-2xl p-6">
                  <h3 className="font-serif text-xl text-kaleo-charcoal mb-4"><Calendar className="inline w-4 h-4 mr-2" />Best Time</h3>
                  <p className="text-sm text-kaleo-charcoal/70">{place.bestTimeToVisit}</p>
                </div>
                <div className="bg-white rounded-2xl p-6">
                  <h3 className="font-serif text-xl text-kaleo-charcoal mb-4"><DollarSign className="inline w-4 h-4 mr-2" />Estimated Cost</h3>
                  <div className="space-y-2">
                    {[['Budget', place.estimatedExpenses.budget], ['Mid-Range', place.estimatedExpenses.midRange], ['Luxury', place.estimatedExpenses.luxury]].map(([l, v]) => (
                      <div key={l} className="flex justify-between text-sm"><span className="text-kaleo-charcoal/60">{l}</span><span className="font-medium text-kaleo-charcoal">{v}</span></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="guide">
            <div className="bg-white rounded-2xl p-6 md:p-8">
              <h2 className="font-serif text-2xl text-kaleo-charcoal mb-6">Travel Guide</h2>
              <p className="text-kaleo-charcoal/70 leading-relaxed whitespace-pre-line">{place.travelGuide}</p>
            </div>
          </TabsContent>

          <TabsContent value="itinerary">
            <div className="bg-white rounded-2xl p-6 md:p-8">
              <h2 className="font-serif text-2xl text-kaleo-charcoal mb-2">{place.tourPlan.duration} Itinerary</h2>
              <div className="space-y-6 mt-6">
                {place.tourPlan.itinerary.map((day) => (
                  <div key={day.day} className="border-l-2 border-kaleo-terracotta pl-6">
                    <h3 className="font-semibold text-kaleo-charcoal">Day {day.day}: {day.title}</h3>
                    <p className="text-sm text-kaleo-charcoal/70 mt-1">{day.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <div className="space-y-4">
              {place.reviews.map((review) => (
                <div key={review.id} className="bg-white rounded-2xl p-6">
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold text-kaleo-charcoal">{review.userName}</span>
                    <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />)}</div>
                  </div>
                  <p className="text-kaleo-charcoal/70 text-sm">{review.comment}</p>
                  <p className="text-xs text-kaleo-charcoal/40 mt-2">{review.date}</p>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-2xl p-6">
              <h3 className="font-serif text-xl text-kaleo-charcoal mb-4">Leave a Review</h3>
              <form onSubmit={handleReview} className="space-y-4">
                <div className="flex gap-1">{[1,2,3,4,5].map(s => <button key={s} type="button" onClick={() => setRating(s)}><Star className={`w-6 h-6 ${s <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} /></button>)}</div>
                <Textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} placeholder="Share your experience..." className="resize-none" rows={4} />
                <Button type="submit" className="bg-kaleo-terracotta hover:bg-kaleo-charcoal text-white"><Send className="w-4 h-4 mr-2" />Submit Review</Button>
              </form>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
