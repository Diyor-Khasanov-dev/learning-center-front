'use client'

import React from 'react'
import Image from 'next/image'
import { Award, Star, Quote } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { TRANSLATIONS } from '@/data/translations'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'

export function TestimonialsSection() {
  const { language } = useLanguage()
  const t = TRANSLATIONS[language].testimonials

  return (
    <section className='py-24 relative overflow-hidden bg-white dark:bg-black text-neutral-900 dark:text-neutral-100 transition-colors duration-200'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10'>
        {/* Header */}
        <AnimateOnScroll variant='fade-up' delay={0}>
          <div className='text-center max-w-3xl mx-auto mb-16 space-y-4'>
            <div className='inline-flex items-center gap-2 rounded-full border border-neutral-300 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 px-4 py-1.5 text-xs font-semibold text-neutral-800 dark:text-neutral-200'>
              <Award className='h-3.5 w-3.5 text-blue-600 dark:text-blue-400' />
              <span>{t.badge}</span>
            </div>
            <h2 className='text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-neutral-900 dark:text-white leading-tight'>
              {t.heading}
            </h2>
            <p className='text-neutral-600 dark:text-neutral-400 text-base sm:text-lg leading-relaxed'>
              {t.subheading}
            </p>
          </div>
        </AnimateOnScroll>

        {/* Testimonials Cards Grid */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {t.testimonials.map((testimonial, idx) => (
            <AnimateOnScroll key={idx} variant='fade-up' delay={idx * 150} className='h-full'>
              <div
                className='group relative rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-7 flex flex-col justify-between space-y-6 hover:border-blue-600 dark:hover:border-blue-600 transition-all duration-300 shadow-xs hover:shadow-xl hover:-translate-y-1 h-full'
              >
                <div className='space-y-4 relative'>
                  <Quote className='absolute -top-2 -right-2 h-8 w-8 text-neutral-200 dark:text-neutral-800 pointer-events-none group-hover:text-blue-600/20 transition-colors' />

                  {/* Rating Stars */}
                  <div className='flex items-center gap-1 text-blue-600 dark:text-blue-400'>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className='h-4 w-4 fill-blue-600 dark:fill-blue-400 text-blue-600 dark:text-blue-400' />
                    ))}
                  </div>

                  <p className='text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed italic font-medium'>
                    “{testimonial.quote}”
                  </p>
                </div>

                <div className='pt-5 border-t border-neutral-200 dark:border-neutral-800 space-y-4'>
                  <div className='inline-block rounded-md bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-900 px-3 py-1 text-xs font-bold text-blue-600 dark:text-blue-400'>
                    {testimonial.stats}
                  </div>

                  <div className='flex items-center gap-3.5'>
                    <Image
                      src={testimonial.image}
                      alt={`${testimonial.author} — ${testimonial.role}, ${testimonial.company}`}
                      width={48}
                      height={48}
                      className='h-12 w-12 rounded-full object-cover border-2 border-neutral-200 dark:border-neutral-800 group-hover:border-blue-600 transition-colors'
                    />
                    <div>
                      <div className='text-sm font-black text-neutral-900 dark:text-white'>{testimonial.author}</div>
                      <div className='text-xs text-neutral-500 dark:text-neutral-400 font-medium'>{testimonial.role}</div>
                      <div className='text-xs text-blue-600 dark:text-blue-400 font-bold mt-0.5'>{testimonial.company}</div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
