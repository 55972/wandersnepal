import Link from 'next/link'
import { Button } from '@/components/ui/button'
export default function NotFound() {
  return (
    <div className="min-h-screen bg-kaleo-sand flex items-center justify-center pt-16">
      <div className="text-center px-4">
        <h1 className="font-serif text-8xl text-kaleo-terracotta mb-4">404</h1>
        <h2 className="font-serif text-3xl text-kaleo-charcoal mb-4">Page Not Found</h2>
        <p className="text-kaleo-charcoal/60 mb-8 max-w-md mx-auto">The page you are looking for does not exist.</p>
        <Button asChild className="bg-kaleo-terracotta hover:bg-kaleo-charcoal text-white"><Link href="/">Back to Home</Link></Button>
      </div>
    </div>
  )
}
