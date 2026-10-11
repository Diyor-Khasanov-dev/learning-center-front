'use client'

import React, { useState } from 'react'
import { BarChart3, ArrowRight, Bell, Sparkles, CheckCircle2 } from 'lucide-react'
import { useDemoModal } from '@/context/DemoModalContext'
import { useLanguage } from '@/context/LanguageContext'
import { TRANSLATIONS } from '@/data/translations'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'

export function PlatformTourSection() {
  const [activeTourTab, setActiveTourTab] = useState('crm')
  const { openDemoModal } = useDemoModal()
  const { language } = useLanguage()
  const t = TRANSLATIONS[language].tour

  const currentTourData = t.tabs.find((tab) => tab.id === activeTourTab) || t.tabs[0]

  return (
    <section id='tour' className='py-24 relative overflow-hidden bg-white dark:bg-black text-neutral-900 dark:text-neutral-100 transition-colors duration-200'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10'>
        {/* Header */}
        <AnimateOnScroll variant='fade-up' delay={0}>
          <div className='text-center max-w-3xl mx-auto mb-14 space-y-4'>
            <div className='inline-flex items-center gap-2 rounded-full border border-neutral-300 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 px-3.5 py-1 text-xs font-semibold text-neutral-800 dark:text-neutral-200'>
              <BarChart3 className='h-3.5 w-3.5 text-blue-600 dark:text-blue-400' />
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

        {/* Tab Selector Buttons */}
        <AnimateOnScroll variant='fade-up' delay={100}>
          <div className='flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-10'>
            {t.tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTourTab(tab.id)}
                className={`rounded-md px-5 py-2.5 text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
                  activeTourTab === tab.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </AnimateOnScroll>

        {/* Active Workflow Card */}
        <AnimateOnScroll variant='zoom-in' delay={200}>
          <div className='rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6 sm:p-10 shadow-xl relative overflow-hidden transition-all duration-300'>
            <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-center'>

              {/* Left Column: Workflow Info */}
              <div className='lg:col-span-5 space-y-6'>
                <span className='inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-3 py-1 rounded-md border border-blue-200 dark:border-blue-900'>
                  <Sparkles className='h-3 w-3 text-blue-600 dark:text-blue-400' />
                  <span>{currentTourData.label}</span>
                </span>

                <h3 className='text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white leading-tight'>
                  {currentTourData.title}
                </h3>

                <p className='text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed font-normal'>
                  {currentTourData.desc}
                </p>

                {/* Metrics Grid */}
                <div className='grid grid-cols-3 gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-800'>
                  {currentTourData.metrics.map((m, idx) => (
                    <div key={idx} className='bg-neutral-50 dark:bg-neutral-900 p-3 sm:p-3.5 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:border-blue-500/50 transition-colors'>
                      <div className='text-[10px] text-neutral-500 dark:text-neutral-400 font-semibold truncate'>{m.label}</div>
                      <div className='text-sm sm:text-base font-black text-neutral-900 dark:text-white mt-1'>{m.val}</div>
                      <div className='text-[10px] text-blue-600 dark:text-blue-400 font-bold mt-0.5'>{m.trend}</div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={openDemoModal}
                  className='inline-flex items-center gap-2.5 rounded-md bg-blue-600 hover:bg-blue-700 px-6 py-3.5 text-sm font-semibold text-white transition-all cursor-pointer shadow-xs active:scale-95 group'
                >
                  <span>{t.seeDemoBtn}</span>
                  <ArrowRight className='h-4 w-4 group-hover:translate-x-1 transition-transform' />
                </button>
              </div>

              {/* Right Column: Graphical Live Interface Mockup */}
              <div className='lg:col-span-7 bg-neutral-900 dark:bg-black text-white rounded-xl border border-neutral-800 p-5 sm:p-6 space-y-4 shadow-2xl relative overflow-hidden transition-all duration-300'>
                <div className='flex items-center justify-between border-b border-neutral-800 pb-3.5'>
                  <div className='flex items-center gap-2 text-xs font-mono text-neutral-400'>
                    <div className='h-2.5 w-2.5 rounded-full bg-blue-500 animate-pulse' />
                    <span>{t.liveInterface}: {currentTourData.label}</span>
                  </div>
                  <span className='text-[10px] font-bold bg-blue-950 text-blue-400 border border-blue-900 px-2.5 py-0.5 rounded-md uppercase'>
                    {t.synced}
                  </span>
                </div>

                {/* Dynamic Content Views */}
                {activeTourTab === 'crm' && (
                  <div className='grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 animate-in fade-in duration-300'>
                    <div className='bg-neutral-950 p-3 rounded-lg border border-neutral-800 space-y-2 hover:border-blue-800 transition-colors'>
                      <div className='text-[11px] font-bold text-blue-400 uppercase tracking-wider flex items-center justify-between'>
                        <span>New Leads</span>
                        <span className='bg-blue-950 border border-blue-900 px-1.5 rounded text-[10px]'>12</span>
                      </div>
                      <div className='bg-neutral-900 p-2.5 rounded-md text-xs border border-neutral-800 space-y-1'>
                        <div className='font-bold text-white'>Anvar K.</div>
                        <div className='text-[10px] text-neutral-400'>General English</div>
                        <span className='inline-block text-[9px] font-bold bg-blue-950 text-blue-400 px-1.5 py-0.5 rounded border border-blue-900'>Instagram</span>
                      </div>
                      <div className='bg-neutral-900 p-2.5 rounded-md text-xs border border-neutral-800 space-y-1'>
                        <div className='font-bold text-white'>Malika S.</div>
                        <div className='text-[10px] text-neutral-400'>IELTS Intensive</div>
                        <span className='inline-block text-[9px] font-bold bg-neutral-800 text-neutral-300 px-1.5 py-0.5 rounded'>Website</span>
                      </div>
                    </div>

                    <div className='bg-neutral-950 p-3 rounded-lg border border-neutral-800 space-y-2 hover:border-blue-800 transition-colors'>
                      <div className='text-[11px] font-bold text-blue-400 uppercase tracking-wider flex items-center justify-between'>
                        <span>Trial Class</span>
                        <span className='bg-blue-950 border border-blue-900 px-1.5 rounded text-[10px]'>8</span>
                      </div>
                      <div className='bg-neutral-900 p-2.5 rounded-md text-xs border border-neutral-800 space-y-1'>
                        <div className='font-bold text-white'>Rustam T.</div>
                        <div className='text-[10px] text-neutral-400'>Trial: Today 15:00</div>
                        <span className='inline-block text-[9px] font-bold bg-blue-950 text-blue-400 px-1.5 py-0.5 rounded border border-blue-900'>SMS Sent</span>
                      </div>
                    </div>

                    <div className='bg-neutral-950 p-3 rounded-lg border border-neutral-800 space-y-2 hover:border-blue-800 transition-colors'>
                      <div className='text-[11px] font-bold text-blue-400 uppercase tracking-wider flex items-center justify-between'>
                        <span>Enrolled</span>
                        <span className='bg-blue-950 border border-blue-900 px-1.5 rounded text-[10px]'>5</span>
                      </div>
                      <div className='bg-neutral-900 p-2.5 rounded-md text-xs border border-blue-900 space-y-1'>
                        <div className='font-bold text-blue-400'>Shahzod B.</div>
                        <div className='text-[10px] text-neutral-400'>Tuition Paid</div>
                        <span className='inline-block text-[9px] font-bold bg-blue-950 text-blue-400 px-1.5 py-0.5 rounded border border-blue-900'>Contract Active</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTourTab === 'attendance' && (
                  <div className='space-y-3 pt-2 animate-in fade-in duration-300'>
                    <div className='flex items-center justify-between bg-neutral-950 p-3.5 rounded-lg border border-neutral-800 hover:border-blue-800 transition-colors'>
                      <div className='flex items-center gap-3'>
                        <div className='h-10 w-10 rounded-md bg-blue-950 flex items-center justify-center text-blue-400 font-bold text-xs border border-blue-900 animate-pulse'>
                          QR
                        </div>
                        <div>
                          <div className='text-xs font-bold text-white'>Kamila Y. — IELTS Group #4</div>
                          <div className='text-[10px] text-neutral-400 font-mono'>Pass ID: #884192</div>
                        </div>
                      </div>
                      <span className='text-xs font-bold text-blue-400 bg-blue-950 px-3 py-1 rounded-md border border-blue-900 flex items-center gap-1'>
                        <CheckCircle2 className='h-3.5 w-3.5 text-blue-400' /> Checked In 14:02
                      </span>
                    </div>

                    <div className='bg-neutral-950 border border-neutral-800 p-3.5 rounded-lg text-xs space-y-2 hover:border-blue-800 transition-colors'>
                      <div className='font-bold text-blue-400 flex items-center gap-2'>
                        <Bell className='h-4 w-4 text-blue-400 animate-bell-ring' />
                        <span>Automated Parent SMS Dispatch</span>
                      </div>
                      <div className='text-neutral-300 text-[11px] bg-neutral-900 p-2.5 rounded-md border border-neutral-800 font-mono'>
                        “Dear parent, Kamila checked in at Bright Academy branch #1 at 14:02.”
                      </div>
                    </div>
                  </div>
                )}

                {activeTourTab === 'payments' && (
                  <div className='space-y-3 pt-2 animate-in fade-in duration-300'>
                    <div className='grid grid-cols-2 gap-3'>
                      <div className='bg-neutral-950 p-3.5 rounded-lg border border-neutral-800 hover:border-blue-800 transition-colors'>
                        <div className='text-[10px] text-neutral-400 font-medium'>Tuition Collected</div>
                        <div className='text-xl font-black text-blue-400 mt-1'>$42,850</div>
                        <div className='text-[10px] text-neutral-400 mt-0.5'>890 Students Paid</div>
                      </div>
                      <div className='bg-neutral-950 p-3.5 rounded-lg border border-neutral-800 hover:border-blue-800 transition-colors'>
                        <div className='text-[10px] text-neutral-400 font-medium'>Overdue Debts</div>
                        <div className='text-xl font-black text-white mt-1'>$1,120</div>
                        <div className='text-[10px] text-neutral-400 mt-0.5'>Auto SMS Active</div>
                      </div>
                    </div>
                    <div className='bg-neutral-950 p-3 rounded-lg border border-neutral-800 text-xs space-y-2 hover:border-blue-800 transition-colors'>
                      <div className='flex justify-between font-bold text-neutral-200'>
                        <span>Recent Online Transactions</span>
                        <span className='text-blue-400 text-[11px] font-mono'>Auto-Receipts</span>
                      </div>
                      <div className='flex justify-between text-[11px] text-neutral-300 border-t border-neutral-800 pt-2'>
                        <span>Student: Sardor M.</span>
                        <span className='text-blue-400 font-bold'>+$120 (Payme / Click)</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTourTab === 'app' && (
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 animate-in fade-in duration-300'>
                    <div className='bg-neutral-950 p-3.5 rounded-lg border border-neutral-800 space-y-2 hover:border-blue-800 transition-colors'>
                      <div className='text-xs font-bold text-neutral-200'>Parent App Interface</div>
                      <div className='bg-neutral-900 p-3 rounded-md space-y-1.5 text-[11px] border border-neutral-800'>
                        <div className='flex justify-between font-bold text-white'>
                          <span>Jasur (9th Grade)</span>
                          <span className='text-blue-400'>98% Attendance</span>
                        </div>
                        <div className='text-[10px] text-neutral-400'>Homework Score: 95/100</div>
                        <div className='mt-2 bg-blue-950 text-blue-300 p-2 rounded text-[10px] border border-blue-900'>
                          Teacher Note: “Great progress in fluency today!”
                        </div>
                      </div>
                    </div>
                    <div className='bg-neutral-950 p-3.5 rounded-lg border border-neutral-800 space-y-2 hover:border-blue-800 transition-colors'>
                      <div className='text-xs font-bold text-neutral-200'>1-Click Mobile Payment</div>
                      <div className='bg-neutral-900 p-3 rounded-md space-y-2 text-[11px] text-center border border-neutral-800'>
                        <div className='text-neutral-400'>Tuition Due</div>
                        <div className='text-lg font-black text-white'>$120.00</div>
                        <button
                          onClick={openDemoModal}
                          className='w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-md text-xs cursor-pointer transition-colors active:scale-95'
                        >
                          Pay via Payme / Click / Card
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
