'use client'

import React, { useState, useEffect, useCallback } from 'react'
import {
  Zap,
  ArrowRight,
  Play,
  CheckCircle2,
  Bell,
  TrendingUp,
  Users,
  ShieldCheck,
  Sparkles,
  CreditCard,
  QrCode,
  UserPlus,
  MessageSquare,
  Pause,
  RotateCcw,
} from 'lucide-react'
import { useDemoModal } from '@/context/DemoModalContext'
import { useLanguage } from '@/context/LanguageContext'
import { TRANSLATIONS } from '@/data/translations'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'
import { CountUp } from '@/components/ui/CountUp'

interface NotificationItem {
  id: string
  title: string
  detail: string
  time: string
  type: 'payment' | 'qr' | 'lead' | 'sms'
}

const REAL_NOTIFICATIONS_POOL: Omit<NotificationItem, 'id' | 'time'>[] = [
  {
    title: "To'lov qabul qilindi",
    detail: "Azizbek T. — $120.00 (Payme)",
    type: 'payment',
  },
  {
    title: 'QR Davomat tasdiqlandi',
    detail: 'Malika S. — IELTS Intensive #2',
    type: 'qr',
  },
  {
    title: 'Yangi soʻrov tushdi',
    detail: 'Sardor B. — Telegram Bot (+998 90...)',
    type: 'lead',
  },
  {
    title: 'Ota-onaga SMS yuborildi',
    detail: 'Jasur K. markazga yetib keldi',
    type: 'sms',
  },
  {
    title: "To'lov qabul qilindi",
    detail: 'Gulnora M. — $150.00 (Click)',
    type: 'payment',
  },
  {
    title: 'QR Davomat tasdiqlandi',
    detail: 'Rustam A. — General English #5',
    type: 'qr',
  },
]

export function HeroSection() {
  const { openDemoModal } = useDemoModal()
  const { language } = useLanguage()
  const t = TRANSLATIONS[language].hero

  // Notification engine states
  const [feedItems, setFeedItems] = useState<NotificationItem[]>([
    {
      id: '1',
      title: "To'lov qabul qilindi",
      detail: "Azizbek T. — $120.00 (Payme)",
      time: '1m ago',
      type: 'payment',
    },
    {
      id: '2',
      title: 'QR Davomat tasdiqlandi',
      detail: 'Malika S. — IELTS Intensive',
      time: '3m ago',
      type: 'qr',
    },
    {
      id: '3',
      title: 'Yangi soʻrov tushdi',
      detail: 'Sardor B. — Instagram Lead',
      time: '5m ago',
      type: 'lead',
    },
  ])

  const [unreadCount, setUnreadCount] = useState<number>(3)
  const [isRinging, setIsRinging] = useState<boolean>(false)
  const [activeToast, setActiveToast] = useState<NotificationItem | null>(null)
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true)
  const [poolIndex, setPoolIndex] = useState<number>(0)

  // Function to trigger a realistic new notification
  const triggerNewNotification = useCallback(() => {
    const template = REAL_NOTIFICATIONS_POOL[poolIndex % REAL_NOTIFICATIONS_POOL.length]
    setPoolIndex((prev) => prev + 1)

    const newItem: NotificationItem = {
      ...template,
      id: Date.now().toString(),
      time: 'Just now',
    }

    setFeedItems((prev) => [newItem, ...prev.slice(0, 3)])
    setUnreadCount((prev) => prev + 1)
    setActiveToast(newItem)
    setIsRinging(true)

    // Reset ring animation after 1.2s
    setTimeout(() => {
      setIsRinging(false)
    }, 1200)

    // Auto dismiss active toast after 3.5s
    setTimeout(() => {
      setActiveToast((current) => (current?.id === newItem.id ? null : current))
    }, 3800)
  }, [poolIndex])

  // Interval loop for automated notifications
  useEffect(() => {
    if (!isAutoPlay) return

    const interval = setInterval(() => {
      triggerNewNotification()
    }, 4500)

    return () => clearInterval(interval)
  }, [isAutoPlay, triggerNewNotification])

  const getNotificationIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'payment':
        return <CreditCard className='h-4 w-4 text-blue-600 dark:text-blue-400' />
      case 'qr':
        return <QrCode className='h-4 w-4 text-blue-600 dark:text-blue-400' />
      case 'lead':
        return <UserPlus className='h-4 w-4 text-blue-600 dark:text-blue-400' />
      case 'sms':
        return <MessageSquare className='h-4 w-4 text-blue-600 dark:text-blue-400' />
    }
  }

  return (
    <section className='relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-white dark:bg-black text-neutral-900 dark:text-neutral-100 transition-colors duration-200'>
      {/* Subtle Minimalist Background Aura */}
      <div className='pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 h-[500px] w-[600px] rounded-full bg-blue-500/5 dark:bg-blue-600/10 blur-[120px] animate-float-slow' />

      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center'>

          {/* Left Column: Hero Copy */}
          <div className='lg:col-span-6 space-y-6 text-center lg:text-left'>
            <AnimateOnScroll variant='fade-down' delay={0}>
              {/* Announcement Badge */}
              <div className='inline-flex items-center gap-2 rounded-full border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/80 px-3.5 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400 shadow-xs'>
                <Sparkles className='h-3.5 w-3.5 text-blue-600 dark:text-blue-400' />
                <span>{t.badge}</span>
              </div>
            </AnimateOnScroll>

            {/* Title */}
            <AnimateOnScroll variant='fade-up' delay={100}>
              <h1 className='text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] text-neutral-900 dark:text-white'>
                {t.titlePart1}{' '}
                <span className='text-blue-600 dark:text-blue-500 underline decoration-blue-600/30 underline-offset-8'>
                  {t.titleHighlight}
                </span>{' '}
                {t.titlePart2}
              </h1>
            </AnimateOnScroll>

            {/* Description */}
            <AnimateOnScroll variant='fade-up' delay={200}>
              <p className='text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal'>
                {t.description}
              </p>
            </AnimateOnScroll>

            {/* Action Buttons */}
            <AnimateOnScroll variant='fade-up' delay={300}>
              <div className='flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2'>
                <button
                  onClick={openDemoModal}
                  className='inline-flex items-center gap-2.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white px-7 py-3.5 text-base font-semibold shadow-xs transition-all active:scale-95 cursor-pointer group'
                >
                  <span>{t.bookDemoBtn}</span>
                  <ArrowRight className='h-4 w-4 group-hover:translate-x-1 transition-transform' />
                </button>

                <a
                  href='#tour'
                  className='inline-flex items-center gap-2.5 rounded-md border border-neutral-300 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 px-6 py-3.5 text-base font-semibold text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all active:scale-95'
                >
                  <Play className='h-3.5 w-3.5 fill-current text-blue-600 dark:text-blue-400 ml-0.5' />
                  <span>{t.watchTourBtn}</span>
                </a>
              </div>
            </AnimateOnScroll>

            {/* Minimalist Trust Badges */}
            <AnimateOnScroll variant='fade-up' delay={400}>
              <div className='flex flex-wrap items-center justify-center lg:justify-start gap-5 sm:gap-7 text-xs font-semibold text-neutral-500 dark:text-neutral-400 pt-4 border-t border-neutral-200 dark:border-neutral-800 max-w-xl mx-auto lg:mx-0'>
                <span className='flex items-center gap-1.5'>
                  <ShieldCheck className='h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0' />
                  {t.trustTrial}
                </span>
                <span className='flex items-center gap-1.5'>
                  <Zap className='h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0' />
                  {t.trustSetup}
                </span>
                <span className='flex items-center gap-1.5'>
                  <CheckCircle2 className='h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0' />
                  {t.trustMigration}
                </span>
              </div>
            </AnimateOnScroll>
          </div>

          {/* Right Column: Interactive Dashboard Preview Card */}
          <div className='lg:col-span-6 relative'>
            <AnimateOnScroll variant='zoom-in' delay={200}>
              <div className='rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-5 sm:p-6 shadow-2xl relative overflow-visible transition-colors duration-200'>

                {/* Real Notification Toast Pop-up */}
                {activeToast && (
                  <div className='absolute -top-6 right-4 z-30 animate-notification-pop bg-neutral-900 dark:bg-neutral-900 text-white rounded-xl border border-neutral-700 p-3.5 shadow-2xl flex items-start gap-3 max-w-xs sm:max-w-sm'>
                    <div className='p-2 rounded-lg bg-blue-950 border border-blue-800 shrink-0'>
                      {getNotificationIcon(activeToast.type)}
                    </div>
                    <div className='flex-1 pr-2'>
                      <div className='text-xs font-bold text-white flex items-center justify-between'>
                        <span>{activeToast.title}</span>
                        <span className='text-[9px] text-blue-400 font-mono'>{activeToast.time}</span>
                      </div>
                      <div className='text-[11px] text-neutral-300 font-medium mt-0.5 leading-snug'>
                        {activeToast.detail}
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveToast(null)}
                      className='text-neutral-400 hover:text-white text-xs font-bold cursor-pointer p-0.5'
                    >
                      ✕
                    </button>
                  </div>
                )}

                {/* Window Bar */}
                <div className='flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800 mb-5 gap-2'>
                  <div className='flex items-center gap-2'>
                    <div className='h-2.5 w-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700' />
                    <div className='h-2.5 w-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700' />
                    <div className='h-2.5 w-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700' />
                    <span className='ml-2 text-xs font-mono text-neutral-400 hidden sm:inline-block'>
                      {t.dashboardTitle}
                    </span>
                  </div>

                  <div className='flex items-center gap-2'>
                    {/* Interactive Notification Test Trigger */}
                    <button
                      onClick={triggerNewNotification}
                      className='inline-flex items-center gap-1.5 bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/80 dark:hover:bg-blue-900 border border-blue-200 dark:border-blue-800 px-2.5 py-1 rounded-md text-[11px] font-bold text-blue-600 dark:text-blue-400 transition-colors cursor-pointer active:scale-95'
                      title='Simulate Incoming Real Notification'
                    >
                      <Zap className='h-3 w-3 text-blue-600 dark:text-blue-400 animate-pulse' />
                      <span className='hidden sm:inline'>Test Notification</span>
                    </button>

                    {/* AutoPlay Toggle Button */}
                    <button
                      onClick={() => setIsAutoPlay(!isAutoPlay)}
                      className='p-1 rounded-md bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800 transition-colors cursor-pointer'
                      title={isAutoPlay ? 'Pause Live Simulation' : 'Resume Live Simulation'}
                    >
                      {isAutoPlay ? <Pause className='h-3 w-3' /> : <RotateCcw className='h-3 w-3' />}
                    </button>

                    <div className='flex items-center gap-1.5 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-900 px-2.5 py-0.5 rounded-full text-xs font-semibold text-blue-600 dark:text-blue-400'>
                      <span className='relative flex h-2 w-2'>
                        <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75' />
                        <span className='relative inline-flex rounded-full h-2 w-2 bg-blue-600' />
                      </span>
                      <span>{t.liveSystem}</span>
                    </div>
                  </div>
                </div>

                {/* Metric Cards Grid */}
                <div className='grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5'>
                  <div className='rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-3 hover:border-blue-500/50 transition-colors'>
                    <div className='text-[11px] font-semibold text-neutral-500 truncate'>{t.activeStudents}</div>
                    <div className='text-xl font-black text-neutral-900 dark:text-white mt-1'>
                      <CountUp end={1428} />
                    </div>
                    <div className='text-[10px] font-bold text-blue-600 dark:text-blue-400 mt-1 flex items-center gap-0.5'>
                      <TrendingUp className='h-3 w-3' />
                      <span>{t.thisMonth}</span>
                    </div>
                  </div>

                  <div className='rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-3 hover:border-blue-500/50 transition-colors'>
                    <div className='text-[11px] font-semibold text-neutral-500 truncate'>{t.monthlyTuition}</div>
                    <div className='text-xl font-black text-blue-600 dark:text-blue-400 mt-1'>
                      <CountUp prefix='$' end={48920} />
                    </div>
                    <div className='text-[10px] font-bold text-neutral-500 dark:text-neutral-400 mt-1'>{t.collected}</div>
                  </div>

                  <div className='rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-3 hover:border-blue-500/50 transition-colors'>
                    <div className='text-[11px] font-semibold text-neutral-500 truncate'>{t.newLeads}</div>
                    <div className='text-xl font-black text-neutral-900 dark:text-white mt-1'>
                      <CountUp end={184} />
                    </div>
                    <div className='text-[10px] font-bold text-neutral-500 dark:text-neutral-400 mt-1'>{t.readyToEnroll}</div>
                  </div>

                  <div className='rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-3 hover:border-blue-500/50 transition-colors'>
                    <div className='text-[11px] font-semibold text-neutral-500 truncate'>{t.attendanceToday}</div>
                    <div className='text-xl font-black text-blue-600 dark:text-blue-400 mt-1'>
                      <CountUp end={96.8} decimals={1} suffix='%' />
                    </div>
                    <div className='text-[10px] font-bold text-neutral-500 dark:text-neutral-400 mt-1'>{t.qrActive}</div>
                  </div>
                </div>

                {/* Revenue Graph & Real-Time Feed */}
                <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                  {/* Minimal Histogram Graph */}
                  <div className='sm:col-span-2 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-4 flex flex-col justify-between'>
                    <div className='flex items-center justify-between text-xs mb-3'>
                      <span className='font-bold text-neutral-900 dark:text-white'>{t.revenueChartTitle}</span>
                      <span className='text-[11px] text-neutral-400'>{t.revenueChartSub}</span>
                    </div>

                    {/* Histogram Bars */}
                    <div className='h-28 w-full flex items-end gap-1.5 border-b border-neutral-200 dark:border-neutral-800 pb-1'>
                      {[38, 52, 60, 48, 72, 80, 92, 68, 88, 98, 108, 124].map((height, idx) => (
                        <div key={idx} className='flex-1 flex flex-col items-center gap-1 group/bar relative'>
                          <div
                            style={{ height: `${height}%` }}
                            className={`w-full rounded-t-sm transition-all duration-500 ${
                              idx === 11
                                ? 'bg-blue-600 shadow-xs'
                                : 'bg-neutral-300 dark:bg-neutral-800 group-hover/bar:bg-blue-500/50'
                            }`}
                          />
                        </div>
                      ))}
                    </div>

                    <div className='flex justify-between text-[10px] font-semibold text-neutral-400 pt-2'>
                      <span>Jan</span>
                      <span>Mar</span>
                      <span>May</span>
                      <span>Jul</span>
                      <span>Sep</span>
                      <span className='text-blue-600 dark:text-blue-400 font-bold'>{t.chartCurrent}</span>
                    </div>
                  </div>

                  {/* Dynamic Real-Time Live Feed */}
                  <div className='rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-4 space-y-3'>
                    <div className='text-xs font-bold text-neutral-900 dark:text-white flex items-center justify-between'>
                      <span>{t.liveStreamTitle}</span>
                      <Users className='h-3.5 w-3.5 text-neutral-400' />
                    </div>

                    <div className='space-y-2 overflow-hidden'>
                      {feedItems.map((item, idx) => (
                        <div
                          key={item.id}
                          className={`flex items-center justify-between text-[11px] bg-white dark:bg-black p-2 rounded border border-neutral-200 dark:border-neutral-800 transition-all duration-300 ${
                            idx === 0 ? 'border-blue-500/60 shadow-xs scale-[1.01]' : ''
                          }`}
                        >
                          <div className='flex items-center gap-2 truncate'>
                            <span className='h-2 w-2 rounded-full bg-blue-600 shrink-0' />
                            <span className='text-neutral-700 dark:text-neutral-300 font-medium truncate'>
                              {item.detail}
                            </span>
                          </div>
                          <span className='text-[10px] font-mono text-neutral-400 shrink-0 ml-1'>
                            {item.time}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating Notification Badge */}
                <div
                  onClick={() => {
                    triggerNewNotification()
                    setUnreadCount(0)
                  }}
                  className={`absolute -bottom-4 -left-4 hidden sm:flex items-center gap-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-3 shadow-xl cursor-pointer hover:border-blue-500 transition-all active:scale-95 select-none ${
                    isRinging ? 'border-blue-600 ring-2 ring-blue-500/20' : ''
                  }`}
                  title='Click to trigger live notification'
                >
                  <div className='relative flex h-10 w-10 items-center justify-center rounded-md bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900 shrink-0'>
                    <Bell
                      className={`h-5 w-5 ${
                        isRinging ? 'animate-bell-active' : 'animate-bell-ring'
                      }`}
                    />
                    {unreadCount > 0 && (
                      <span className='absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[9px] font-bold text-white shadow-xs animate-ping-once'>
                        {unreadCount}
                      </span>
                    )}
                  </div>
                  <div>
                    <div className='text-xs font-bold text-neutral-900 dark:text-white flex items-center gap-1.5'>
                      <span>{t.smsBadgeTitle}</span>
                      <span className='text-[9px] bg-blue-600 text-white px-1.5 py-0.2 rounded font-mono uppercase tracking-wide flex items-center gap-1'>
                        <span className='h-1.5 w-1.5 rounded-full bg-white animate-pulse' />
                        Live
                      </span>
                    </div>
                    <div className='text-[11px] text-neutral-500 dark:text-neutral-400 font-medium'>
                      {t.smsBadgeSub}
                    </div>
                  </div>
                </div>

              </div>
            </AnimateOnScroll>
          </div>

        </div>
      </div>
    </section>
  )
}
