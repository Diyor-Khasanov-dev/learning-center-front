'use client'

import React, { useState } from 'react'
import { HelpCircle, ChevronDown } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { TRANSLATIONS } from '@/data/translations'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'

export function FaqSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const { language } = useLanguage()
  const t = TRANSLATIONS[language].faq

  return (
    <section id='faq' className='py-24 relative overflow-hidden bg-white dark:bg-black text-neutral-900 dark:text-neutral-100 transition-colors duration-200'>
      <div className='mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10'>
        {/* Header */}
        <AnimateOnScroll variant='fade-up' delay={0}>
          <div className='text-center max-w-2xl mx-auto mb-16 space-y-4'>
            <div className='inline-flex items-center gap-2 rounded-full border border-neutral-300 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 px-4 py-1.5 text-xs font-semibold text-neutral-800 dark:text-neutral-200'>
              <HelpCircle className='h-3.5 w-3.5 text-blue-600 dark:text-blue-400' />
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

        {/* FAQ Accordion List */}
        <div className='space-y-4'>
          {t.faqs.map((faq, idx) => {
            const isOpen = openFaq === idx
            return (
              <AnimateOnScroll key={idx} variant='fade-up' delay={idx * 100}>
                <div
                  className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? 'border-blue-600 dark:border-blue-600 bg-neutral-50 dark:bg-neutral-950 shadow-xs'
                      : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 hover:border-neutral-300 dark:hover:border-neutral-700'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className='w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer'
                  >
                    <span className='text-base sm:text-lg font-bold text-neutral-900 dark:text-white leading-snug'>{faq.q}</span>
                    <div className={`flex h-8 w-8 items-center justify-center rounded-md transition-all shrink-0 ${
                      isOpen
                        ? 'bg-blue-600 text-white'
                        : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-500 dark:text-neutral-400'
                    }`}>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </button>

                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isOpen ? 'max-h-96 opacity-100 px-6 pb-6 pt-2' : 'max-h-0 opacity-0 px-6 py-0'
                    }`}
                  >
                    <div className='text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed border-t border-neutral-200 dark:border-neutral-800 pt-4 font-normal'>
                      {faq.a}
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            )
          })}
        </div>
      </div>
    </section>
  )
}
