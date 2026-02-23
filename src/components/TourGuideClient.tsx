'use client'
import { useState } from 'react'
import { Mail, Phone, Star, Award, Languages, Calendar, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { tourGuides } from '@/lib/config'

export default function TourGuideClient() {
  const [selectedGuide, setSelectedGuide] = useState<string | null>(null)
  const [formData, setFormData] = useState({ name: '', email: '', dates: '', message: '' })

  const handleContact = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success('Message sent! The guide will contact you within 24 hours.')
    setFormData({ name: '', email: '', dates: '', message: '' })
    setSelectedGuide(null)
  }

  return (
    <div className="min-h-screen bg-kaleo-sand pt-16 lg:pt-20">
      <div className="bg-kaleo-charcoal text-kaleo-cream py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-4">Expert Tour Guides</h1>
          <p className="text-kaleo-cream/70 text-lg md:text-xl max-w-3xl">Connect with our certified local guides who bring Nepal&apos;s mountains, culture, and wildlife to life.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tourGuides.map((guide) => (
            <div key={guide.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 rounded-full bg-kaleo-sand flex items-center justify-center">
                      <span className="text-3xl font-serif text-kaleo-terracotta">{guide.name.charAt(0)}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h2 className="font-serif text-xl text-kaleo-charcoal">{guide.name}</h2>
                        <p className="text-sm text-kaleo-terracotta">{guide.specialization}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium text-kaleo-charcoal">{guide.rating}</span>
                        <span className="text-xs text-kaleo-charcoal/50">({guide.reviews})</span>
                      </div>
                    </div>
                    <p className="text-sm text-kaleo-charcoal/70 mb-4">{guide.bio}</p>
                    <div className="grid grid-cols-2 gap-3 mb-4 text-xs text-kaleo-charcoal/60">
                      <div className="flex items-center gap-1"><Award className="w-3 h-3 text-kaleo-terracotta" />{guide.experience}</div>
                      <div className="flex items-center gap-1"><Languages className="w-3 h-3 text-kaleo-terracotta" />{guide.languages.join(', ')}</div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {guide.regions.map((r: string) => <Badge key={r} variant="outline" className="border-kaleo-terracotta/30 text-kaleo-terracotta text-xs">{r}</Badge>)}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-lg text-kaleo-charcoal">{guide.pricePerDay}<span className="text-sm text-kaleo-charcoal/50">/day</span></span>
                      <Button onClick={() => setSelectedGuide(guide.id)} className="bg-kaleo-terracotta hover:bg-kaleo-charcoal text-white text-sm"><Send className="w-3 h-3 mr-1" />Book Guide</Button>
                    </div>
                  </div>
                </div>
              </div>

              {selectedGuide === guide.id && (
                <div className="border-t border-kaleo-terracotta/10 p-6 bg-kaleo-sand/50">
                  <h3 className="font-serif text-lg text-kaleo-charcoal mb-4">Contact {guide.name}</h3>
                  <form onSubmit={handleContact} className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <Input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Your name" required />
                      <Input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="Email" required />
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-kaleo-terracotta" />
                      <Input value={formData.dates} onChange={(e) => setFormData({...formData, dates: e.target.value})} placeholder="Preferred dates (e.g. Oct 15–22)" />
                    </div>
                    <Textarea value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} placeholder="Tell about your trip plans..." rows={3} />
                    <div className="flex gap-2">
                      <Button type="submit" className="bg-kaleo-terracotta hover:bg-kaleo-charcoal text-white"><Send className="w-4 h-4 mr-2" />Send Message</Button>
                      <Button type="button" variant="outline" onClick={() => setSelectedGuide(null)}>Cancel</Button>
                    </div>
                    <div className="flex gap-3 text-sm text-kaleo-charcoal/60">
                      <a href={`mailto:${guide.email}`} className="flex items-center gap-1 hover:text-kaleo-terracotta"><Mail className="w-3 h-3" />{guide.email}</a>
                      <a href={`tel:${guide.phone}`} className="flex items-center gap-1 hover:text-kaleo-terracotta"><Phone className="w-3 h-3" />{guide.phone}</a>
                    </div>
                  </form>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
