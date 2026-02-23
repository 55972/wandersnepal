'use client'
import { useEffect, useRef } from 'react'
import type Lenis from '@studio-freight/lenis'

export const useLenis = () => {
  const lenisRef = useRef<Lenis | null>(null)
  useEffect(() => {
    let lenis: Lenis
    import('@studio-freight/lenis').then(({ default: Lenis }) => {
      import('gsap').then(({ gsap }) => {
        import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
          gsap.registerPlugin(ScrollTrigger)
          lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true })
          lenisRef.current = lenis
          lenis.on('scroll', ScrollTrigger.update)
          gsap.ticker.add((time) => lenis.raf(time * 1000))
          gsap.ticker.lagSmoothing(0)
        })
      })
    })
    return () => { if (lenis) { lenis.destroy() } }
  }, [])
  return lenisRef
}
export default useLenis
