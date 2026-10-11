'use client'

import React, { useState } from 'react'
import { Calculator, Clock, UserCheck, Sparkles } from 'lucide-react'
import { useDemoModal } from '@/context/DemoModalContext'
import { useLanguage } from '@/context/LanguageContext'
import { TRANSLATIONS } from '@/data/translations'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'
import { CountUp } from '@/components/ui/CountUp'

export function RoiCalculatorSection() {
  const [studentCount, setStudentCount] = useState<number>(300)
  const [branchCount, setBranchCount] = useState<number>(2)
  const { openDemoModal } = useDemoModal()
  const { language } = useLanguage()
  const t = TRANSLATIONS[language].roi

  // ROI Calculations
  const hoursSavedPerWeek = Math.round((studentCount / 20) * branchCount)
  const estimatedMoneySavedMonthly = Math.round(studentCount * 3.5 * branchCount)
  const lostLeadsRecovered = Math.round(studentCount * 0.12)

  return (
    <section id='roi' className='py-24 bg-neutral-50 dark:bg-black border-y border-neutral-200 dark:border-neutral-800 relative transition-colors duration-200 overflow-hidden text-neutral-900 dark:text-neutral-100'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 items-center'>

          {/* Left Column: Calculator Inputs */}
          <div className='lg:col-span-6 space-y-6'>
            <AnimateOnScroll variant='fade-up' delay={0}>
              <div className='inline-flex items-center gap-2 rounded-full border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3.5 py-1 text-xs font-semibold text-neutral-800 dark:text-neutral-200'>
                <Calculator className='h-3.5 w-3.5 text-blue-600 dark:text-blue-400' />
                <span>{t.badge}</span>
              </div>

              <h2 className='text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-neutral-900 dark:text-white leading-tight mt-4'>
                {t.heading}
              </h2>

              <p className='text-neutral-600 dark:text-neutral-400 text-base sm:text-lg leading-relaxed mt-2'>
                {t.subheading}
              </p>
            </AnimateOnScroll>

            {/* Slider 1: Student Count */}
            <AnimateOnScroll variant='fade-up' delay={150}>
              <div className='space-y-3 bg-white dark:bg-neutral-950 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-xs hover:border-blue-500/50 transition-colors'>
                <div className='flex justify-between items-center text-sm font-bold'>
                  <span className='text-neutral-900 dark:text-neutral-100'>{t.slider1Label}</span>
                  <span className='text-blue-600 dark:text-blue-400 text-xl font-black'>{studentCount} {t.slider1Unit}</span>
                </div>
                <input
                  type='range'
                  min='50'
                  max='2000'
                  step='25'
                  value={studentCount}
                  onChange={(e) => setStudentCount(Number(e.target.value))}
                  className='w-full accent-blue-600 cursor-pointer h-2 bg-neutral-200 dark:bg-neutral-800 rounded-lg'
                />
                <div className='flex justify-between text-[10px] text-neutral-400 font-mono font-semibold'>
                  <span>50</span>
                  <span>500</span>
                  <span>1,000</span>
                  <span>2,000+</span>
                </div>
              </div>
            </AnimateOnScroll>

            {/* Slider 2: Branch Count */}
            <AnimateOnScroll variant='fade-up' delay={250}>
              <div className='space-y-3 bg-white dark:bg-neutral-950 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-xs hover:border-blue-500/50 transition-colors'>
                <div className='flex justify-between items-center text-sm font-bold'>
                  <span className='text-neutral-900 dark:text-neutral-100'>{t.slider2Label}</span>
                  <span className='text-blue-600 dark:text-blue-400 text-xl font-black'>{branchCount} {t.slider2Unit}</span>
                </div>
                <input
                  type='range'
                  min='1'
                  max='15'
                  step='1'
                  value={branchCount}
                  onChange={(e) => setBranchCount(Number(e.target.value))}
                  className='w-full accent-blue-600 cursor-pointer h-2 bg-neutral-200 dark:bg-neutral-800 rounded-lg'
                />
                <div className='flex justify-between text-[10px] text-neutral-400 font-mono font-semibold'>
                  <span>1</span>
                  <span>5</span>
                  <span>15+</span>
                </div>
              </div>
            </AnimateOnScroll>
          </div>

          {/* Right Column: Dynamic Results Box */}
          <div className='lg:col-span-6'>
            <AnimateOnScroll variant='zoom-in' delay={200}>
              <div className='rounded-2xl border border-neutral-800 bg-neutral-900 dark:bg-black p-8 sm:p-10 shadow-2xl space-y-8 relative overflow-hidden text-white'>

                <div className='border-b border-neutral-800 pb-6'>
                  <div className='text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-2'>
                    <Sparkles className='h-3.5 w-3.5 text-blue-400' />
                    <span>{t.roiTitle}</span>
                  </div>
                  <div className='text-4xl sm:text-5xl font-black text-white mt-3'>
                    <CountUp key={`money-${estimatedMoneySavedMonthly}`} prefix='$' end={estimatedMoneySavedMonthly} />{' '}
                    <span className='text-base font-normal text-neutral-400'>{t.perMonthSaved}</span>
                  </div>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  <div className='bg-neutral-950 p-5 rounded-xl border border-neutral-800 space-y-1 hover:border-blue-800 transition-colors'>
                    <div className='flex items-center gap-2 text-xs text-neutral-300 font-bold'>
                      <Clock className='h-4 w-4 text-blue-400' />
                      <span>{t.timeSavedLabel}</span>
                    </div>
                    <div className='text-3xl font-black text-white mt-1'>
                      <CountUp key={`hours-${hoursSavedPerWeek}`} end={hoursSavedPerWeek} suffix=' h' />
                    </div>
                    <div className='text-[11px] text-neutral-400 font-medium'>{t.timeSavedSub}</div>
                  </div>

                  <div className='bg-neutral-950 p-5 rounded-xl border border-neutral-800 space-y-1 hover:border-blue-800 transition-colors'>
                    <div className='flex items-center gap-2 text-xs text-neutral-300 font-bold'>
                      <UserCheck className='h-4 w-4 text-blue-400' />
                      <span>{t.leadsRecoveredLabel}</span>
                    </div>
                    <div className='text-3xl font-black text-white mt-1'>
                      <CountUp key={`leads-${lostLeadsRecovered}`} prefix='+' end={lostLeadsRecovered} />
                    </div>
                    <div className='text-[11px] text-neutral-400 font-medium'>{t.leadsRecoveredSub}</div>
                  </div>
                </div>

                <div className='pt-2 space-y-3'>
                  <button
                    onClick={openDemoModal}
                    className='w-full rounded-md bg-blue-600 hover:bg-blue-700 py-4 text-center text-sm font-bold text-white shadow-xs transition-all cursor-pointer active:scale-95'
                  >
                    {t.auditBtn}
                  </button>
                  <p className='text-center text-[11px] text-neutral-400 font-medium'>
                    {t.benchmarkNote}
                  </p>
                </div>

              </div>
            </AnimateOnScroll>
          </div>

        </div>
      </div>
    </section>
  )
}
