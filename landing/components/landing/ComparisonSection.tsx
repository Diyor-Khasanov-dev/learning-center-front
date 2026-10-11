'use client'

import React from 'react'
import { XCircle, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { TRANSLATIONS } from '@/data/translations'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'

export function ComparisonSection() {
  const { language } = useLanguage()
  const t = TRANSLATIONS[language].comparison

  return (
    <section id='comparison' className='py-24 relative overflow-hidden bg-white dark:bg-black text-neutral-900 dark:text-neutral-100 transition-colors duration-200'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10'>
        {/* Header */}
        <AnimateOnScroll variant='fade-up' delay={0}>
          <div className='text-center max-w-3xl mx-auto mb-16 space-y-4'>
            <div className='inline-flex items-center gap-2 rounded-full border border-neutral-300 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 px-3.5 py-1 text-xs font-semibold text-neutral-800 dark:text-neutral-200'>
              <AlertTriangle className='h-3.5 w-3.5 text-blue-600 dark:text-blue-400' />
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

        {/* Side-by-Side Cards */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch'>

          {/* The Old Way */}
          <AnimateOnScroll variant='slide-right' delay={100} className='h-full'>
            <div className='rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-6 sm:p-8 space-y-6 relative overflow-hidden shadow-xs h-full'>
              <div className='flex flex-wrap items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-4 gap-2'>
                <h3 className='text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2.5'>
                  <div className='flex h-9 w-9 items-center justify-center rounded-md bg-neutral-200 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border border-neutral-300 dark:border-neutral-800'>
                    <XCircle className='h-5 w-5' />
                  </div>
                  <span>{t.oldWayTitle}</span>
                </h3>
                <span className='text-xs font-semibold bg-neutral-200 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 px-3 py-1 rounded-md border border-neutral-300 dark:border-neutral-800'>
                  {t.oldWayTag}
                </span>
              </div>

              <div className='space-y-3'>
                {t.items.map((item, idx) => (
                  <div
                    key={idx}
                    className='flex items-start gap-3.5 p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors'
                  >
                    <XCircle className='h-5 w-5 text-neutral-400 shrink-0 mt-0.5' />
                    <div>
                      <div className='text-sm font-bold text-neutral-900 dark:text-neutral-100'>{item.category}</div>
                      <div className='text-xs text-neutral-600 dark:text-neutral-400 mt-1 leading-relaxed font-medium'>{item.oldWay}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimateOnScroll>

          {/* The A.L.I.A Way (Minimal Blue Highlight) */}
          <AnimateOnScroll variant='slide-left' delay={200} className='h-full'>
            <div className='rounded-2xl border-2 border-blue-600 dark:border-blue-600 bg-white dark:bg-neutral-950 p-6 sm:p-8 space-y-6 relative overflow-hidden shadow-xl h-full'>
              <div className='flex flex-wrap items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-4 gap-2'>
                <h3 className='text-xl font-black text-neutral-900 dark:text-white flex items-center gap-2.5'>
                  <div className='flex h-9 w-9 items-center justify-center rounded-md bg-blue-600 text-white shadow-xs'>
                    <CheckCircle2 className='h-5 w-5' />
                  </div>
                  <span>{t.newWayTitle}</span>
                </h3>
                <span className='text-xs font-bold bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-md border border-blue-200 dark:border-blue-900 flex items-center gap-1.5'>
                  <Sparkles className='h-3.5 w-3.5' />
                  <span>{t.newWayTag}</span>
                </span>
              </div>

              <div className='space-y-3'>
                {t.items.map((item, idx) => (
                  <div
                    key={idx}
                    className='flex items-start gap-3.5 p-4 rounded-xl bg-blue-50/50 dark:bg-neutral-900 border border-blue-100 dark:border-neutral-800 hover:border-blue-500/50 transition-all duration-200'
                  >
                    <CheckCircle2 className='h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5' />
                    <div>
                      <div className='text-sm font-bold text-neutral-900 dark:text-neutral-100'>{item.category}</div>
                      <div className='text-xs text-neutral-700 dark:text-neutral-300 mt-1 leading-relaxed font-medium'>{item.newWay}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimateOnScroll>

        </div>
      </div>
    </section>
  )
}
