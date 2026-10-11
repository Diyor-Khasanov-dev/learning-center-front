'use client'

import React, { useEffect, useRef, useState } from 'react'

export type AnimationVariant =
  | 'fade-up'
  | 'fade-down'
  | 'fade-in'
  | 'slide-left'
  | 'slide-right'
  | 'zoom-in'
  | 'zoom-out'

interface AnimateOnScrollProps {
  children: React.ReactNode
  variant?: AnimationVariant
  delay?: number // in ms
  duration?: number // in ms
  threshold?: number
  once?: boolean
  className?: string
  as?: React.ElementType
}

export function AnimateOnScroll({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 600,
  threshold = 0.15,
  once = true,
  className = '',
  as: Component = 'div',
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange)
    }

    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) {
            observer.unobserve(element)
          }
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { threshold }
    )

    observer.observe(element)

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange)
      }
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [once, threshold])

  if (prefersReducedMotion) {
    return <Component className={className}>{children}</Component>
  }

  // Define initial and visible styles based on variant
  const getVariantStyles = () => {
    switch (variant) {
      case 'fade-up':
        return isVisible
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-8 scale-[0.98]'
      case 'fade-down':
        return isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 -translate-y-8'
      case 'fade-in':
        return isVisible ? 'opacity-100' : 'opacity-0'
      case 'slide-left':
        return isVisible
          ? 'opacity-100 translate-x-0'
          : 'opacity-0 translate-x-10'
      case 'slide-right':
        return isVisible
          ? 'opacity-100 translate-x-0'
          : 'opacity-0 -translate-x-10'
      case 'zoom-in':
        return isVisible
          ? 'opacity-100 scale-100'
          : 'opacity-0 scale-90'
      case 'zoom-out':
        return isVisible
          ? 'opacity-100 scale-100'
          : 'opacity-0 scale-105'
      default:
        return isVisible ? 'opacity-100' : 'opacity-0'
    }
  }

  return (
    <Component
      ref={ref}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'transform, opacity',
      }}
      className={`transition-all duration-500 ease-out ${getVariantStyles()} ${className}`}
    >
      {children}
    </Component>
  )
}
