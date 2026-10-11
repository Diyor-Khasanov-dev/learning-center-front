'use client'

import React, { useState } from 'react'
import { DollarSign, CheckCircle2, Sparkles } from 'lucide-react'
import { useDemoModal } from '@/context/DemoModalContext'
import { useLanguage } from '@/context/LanguageContext'
import { TRANSLATIONS } from '@/data/translations'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'
import { CountUp } from '@/components/ui/CountUp'

export function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual')
  const { openDemoModal } = useDemoModal()
  const { language } = useLanguage()
  const t = TRANSLATIONS[language].pricing

  return (
    <section id='pricing' className='py-24 bg-neutral-50 dark:bg-black border-y border-neutral-200 dark:border-neutral-800 relative transition-colors duration-200 overflow-hidden text-neutral-900 dark:text-neutral-100'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10'>
        {/* Header */}
        <AnimateOnScroll variant='fade-up' delay={0}>
          <div className='text-center max-w-3xl mx-auto mb-12 space-y-4'>
            <div className='inline-flex items-center gap-2 rounded-full border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-4 py-1.5 text-xs font-semibold text-neutral-800 dark:text-neutral-200'>
              <DollarSign className='h-3.5 w-3.5 text-blue-600 dark:text-blue-400' />
              <span>{t.badge}</span>
            </div>
            <h2 className='text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-neutral-900 dark:text-white leading-tight'>
              {t.heading}
            </h2>
            <p className='text-neutral-600 dark:text-neutral-400 text-base sm:text-lg leading-relaxed'>
              {t.subheading}
            </p>

            {/* Billing Cycle Toggle */}
            <div className='pt-2 inline-flex items-center gap-2 bg-white dark:bg-neutral-950 p-1.5 rounded-full border border-neutral-200 dark:border-neutral-800 shadow-xs'>
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`rounded-full px-5 py-2 text-xs font-bold transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
                  billingCycle === 'monthly'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                {t.monthlyBilling}
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`rounded-full px-5 py-2 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap active:scale-95 ${
                  billingCycle === 'annual'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                <span>{t.annualBilling}</span>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold ${
                  billingCycle === 'annual'
                    ? 'bg-blue-700 text-white'
                    : 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900'
                }`}>
                  {t.savePercent}
                </span>
              </button>
            </div>
          </div>
        </AnimateOnScroll>

        {/* Pricing Cards Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch pt-4'>
          {t.plans.map((plan, idx) => {
            const price = billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice
            return (
              <AnimateOnScroll key={idx} variant='fade-up' delay={idx * 150} className='h-full'>
                <div
                  className={`relative rounded-2xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 h-full ${
                    plan.highlight
                      ? 'border-2 border-blue-600 bg-white dark:bg-neutral-950 shadow-xl scale-105 z-10 hover:shadow-2xl'
                      : 'border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 hover:border-blue-500/50 shadow-xs hover:shadow-lg'
                  }`}
                >
                  {plan.highlight && (
                    <div className='absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-4 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white shadow-sm flex items-center gap-1.5 whitespace-nowrap animate-badge-bounce'>
                      <Sparkles className='h-3 w-3 text-white' />
                      <span>Most Popular</span>
                    </div>
                  )}

                  <div className='space-y-6'>
                    <div>
                      <h3 className='text-2xl font-black text-neutral-900 dark:text-white'>{plan.name}</h3>
                      <p className='text-xs text-neutral-500 dark:text-neutral-400 mt-2 leading-relaxed font-normal'>{plan.desc}</p>
                    </div>

                    <div className='border-y border-neutral-200 dark:border-neutral-800 py-5 space-y-1.5'>
                      <div className='flex items-baseline gap-1.5'>
                        <span className='text-4xl sm:text-5xl font-black text-neutral-900 dark:text-white'>
                          <CountUp key={`price-${price}`} prefix='$' end={price} />
                        </span>
                        <span className='text-xs text-neutral-500 dark:text-neutral-400 font-semibold'>{t.perMonthBranch}</span>
                      </div>
                      <div className='text-xs text-blue-600 dark:text-blue-400 font-bold'>
                        {plan.studentsLimit} • {plan.branchesLimit}
                      </div>
                    </div>

                    <div className='space-y-3.5'>
                      <div className='text-xs font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-200'>{t.includedFeaturesTitle}</div>
                      {plan.features.map((feat, i) => (
                        <div key={i} className='flex items-start gap-2.5 text-xs text-neutral-700 dark:text-neutral-300 font-medium'>
                          <CheckCircle2 className='h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5' />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className='mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-800'>
                    <button
                      onClick={openDemoModal}
                      className={`w-full rounded-md py-3.5 text-center text-sm font-bold transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
                        plan.highlight
                          ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
                          : 'bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800'
                      }`}
                    >
                      {plan.cta}
                    </button>
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
