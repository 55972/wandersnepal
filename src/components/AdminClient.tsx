'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Shield } from 'lucide-react'

export default function AdminClient() {
  const { isAdmin, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) router.push('/login')
    else if (!isAdmin) router.push('/')
  }, [isAdmin, isAuthenticated, router])

  if (!isAdmin) return null

  return (
    <div className="min-h-screen bg-kaleo-sand pt-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Shield className="w-8 h-8 text-kaleo-terracotta" />
          <h1 className="font-serif text-4xl text-kaleo-charcoal">Admin Dashboard</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[['Total Places', '14', 'Destinations in database'], ['Blog Posts', '12', 'Published articles'], ['Tour Plans', '8', 'Available packages']].map(([title, count, desc]) => (
            <div key={title} className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-serif text-3xl text-kaleo-terracotta">{count}</h3>
              <p className="font-medium text-kaleo-charcoal">{title}</p>
              <p className="text-sm text-kaleo-charcoal/60">{desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm">
          <p className="text-kaleo-charcoal/60">Admin panel — connect to your backend API to manage content.</p>
        </div>
      </div>
    </div>
  )
}
