'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/contexts/AuthContext'

export default function LoginClient() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    const success = await login(email, password)
    if (success) router.push('/')
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-kaleo-sand flex items-center justify-center py-12 px-4 pt-24">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <span className="text-3xl font-serif font-bold text-kaleo-charcoal">WanderNepal</span>
            <span className="text-sm text-kaleo-terracotta">.com.np</span>
          </Link>
          <p className="mt-2 text-kaleo-charcoal/60">Welcome back, traveler!</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="font-serif text-2xl text-kaleo-charcoal mb-6 text-center">Sign In</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-kaleo-charcoal mb-1 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-kaleo-charcoal/40" />
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" className="pl-10" required />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-kaleo-charcoal mb-1 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-kaleo-charcoal/40" />
                <Input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="pl-10 pr-10" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-kaleo-charcoal/40">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <Button type="submit" disabled={isLoading} className="w-full bg-kaleo-terracotta hover:bg-kaleo-charcoal text-white">
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
          <div className="mt-4 p-3 bg-kaleo-sand rounded-lg text-xs text-kaleo-charcoal/60">
            <p><strong>Demo:</strong> admin@wandernepal.com / password</p>
          </div>
          <p className="text-center text-sm text-kaleo-charcoal/60 mt-6">
            Don&apos;t have an account? <Link href="/register" className="text-kaleo-terracotta hover:underline">Register</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
