'use client'

import React from 'react'
import { Building2 } from 'lucide-react'
import { PARTNER_LOGOS } from '@/data/landing-data'
import { useLanguage } from '@/context/LanguageContext'
import { TRANSLATIONS } from '@/data/translations'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'
import { CountUp } from '@/components/ui/CountUp'

export function StatsSection() {
  const { language } = useLanguage()
  const t = TRANSLATIONS[language].stats

  // Helper function to extract numeric count and suffix
  const parseStatValue = (valStr: string) => {
    if (valStr.includes('300,000')) return { end: 300000, suffix: '+', prefix: '' }
    if (valStr.includes('1,200')) return { end: 1200, suffix: '+', prefix: '' }
    if (valStr.includes('98%')) return { end: 98, suffix: '%', prefix: '' }
    if (valStr.includes('30 min') || valStr.includes('30 мин') || valStr.includes('30 daqiqa')) {
      const unit = valStr.replace('30', '').trim()
      return { end: 30, suffix: ` ${unit}`, prefix: '< ' }
    }
    return null
  }

  return (
    <section className='border-y border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-black py-10 transition-colors duration-200'>
      <div className='mx-auto max-w-7xl px-6'>
        {/* Stats Grid */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-8 mb-10 text-center'>
          {t.stats.map((stat, idx) => {
            const parsed = parseStatValue(stat.value)
            return (
              <AnimateOnScroll key={idx} variant='fade-up' delay={idx * 100}>
                <div className='space-y-1 group cursor-default'>
                  <div className='text-3xl sm:text-4xl font-black text-blue-600 dark:text-blue-500 group-hover:scale-105 transition-transform duration-200'>
                    {parsed ? (
                      <CountUp
                        end={parsed.end}
                        prefix={parsed.prefix}
                        suffix={parsed.suffix}
                      />
                    ) : (
                      stat.value
                    )}
                  </div>
                  <div className='text-sm font-bold text-neutral-900 dark:text-neutral-100'>
                    {stat.label}
                  </div>
                  <div className='text-xs text-neutral-500 dark:text-neutral-400'>
                    {stat.sub}
                  </div>
                </div>
              </AnimateOnScroll>
            )
          })}
        </div>

        {/* Trusted Institutions Marquee */}
        <AnimateOnScroll variant='fade-in' delay={300}>
          <div className='pt-6 border-t border-neutral-200 dark:border-neutral-800'>
            <p className='text-center text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-6'>
              {t.partnerHeading}
            </p>
            <div className='flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-85'>
              {PARTNER_LOGOS.map((partner, idx) => (
                <div
                  key={idx}
                  className='flex items-center gap-2 text-xs sm:text-sm font-semibold text-neutral-700 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-105 transition-all duration-200 cursor-default'
                >
                  <Building2 className='h-4 w-4 text-blue-600 dark:text-blue-500' />
                  <span>{partner}</span>
                </div>
              ))}
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
