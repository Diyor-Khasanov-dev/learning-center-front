'use client'

import React from 'react'
import { Sparkles, CheckCircle2, ArrowRight } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { Dropdown } from '@/components/ui/Dropdown'
import { useDemoModal } from '@/context/DemoModalContext'
import { useLanguage } from '@/context/LanguageContext'
import { TRANSLATIONS } from '@/data/translations'

export function DemoModal() {
  const {
    isDemoModalOpen,
    closeDemoModal,
    demoStep,
    setDemoStep,
    demoForm,
    setDemoForm,
    demoSubmitted,
    handleDemoSubmit,
  } = useDemoModal()

  const { language } = useLanguage()
  const t = TRANSLATIONS[language].demoModal

  return (
    <Modal
      isOpen={isDemoModalOpen}
      onClose={closeDemoModal}
      maxWidth='lg'
      title={
        demoSubmitted ? null : (
          <div className='space-y-1.5'>
            <div className='inline-flex items-center gap-1.5 rounded-full bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-900 px-3 py-1 text-[11px] font-semibold text-blue-600 dark:text-blue-400'>
              <Sparkles className='h-3 w-3 text-blue-600 dark:text-blue-400' /> {t.personalizedWalkthrough}
            </div>
            <h3 className='text-2xl font-black text-neutral-900 dark:text-white'>{t.title}</h3>
          </div>
        )
      }
      description={
        demoSubmitted
          ? null
          : t.subtitle
      }
    >
      {demoSubmitted ? (
        <div className='py-8 text-center space-y-4 animate-in zoom-in-95 duration-200'>
          <div className='h-16 w-16 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-900 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto shadow-xs'>
            <CheckCircle2 className='h-8 w-8' />
          </div>
          <h3 className='text-2xl font-black text-neutral-900 dark:text-white'>{t.confirmedTitle}</h3>
          <p className='text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-sm mx-auto font-normal'>
            {t.confirmedMessage}
          </p>
        </div>
      ) : (
        <form onSubmit={handleDemoSubmit} className='space-y-4'>
          {/* Step Indicator */}
          <div className='flex items-center gap-2 pb-2 border-b border-neutral-200 dark:border-neutral-800 text-xs font-semibold'>
            <button
              type='button'
              onClick={() => setDemoStep(1)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                demoStep === 1
                  ? 'bg-blue-600 text-white font-bold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white bg-neutral-100 dark:bg-neutral-900'
              }`}
            >
              <span className='h-4 w-4 rounded-full bg-white/20 flex items-center justify-center text-[10px]'>1</span>
              <span>{t.stepContact}</span>
            </button>
            <span className='text-neutral-400 dark:text-neutral-600'>/</span>
            <button
              type='button'
              onClick={() => {
                if (demoForm.name && demoForm.phone && demoForm.centerName) {
                  setDemoStep(2)
                }
              }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                demoStep === 2
                  ? 'bg-blue-600 text-white font-bold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white bg-neutral-100 dark:bg-neutral-900'
              }`}
            >
              <span className='h-4 w-4 rounded-full bg-white/20 flex items-center justify-center text-[10px]'>2</span>
              <span>{t.stepScale}</span>
            </button>
          </div>

          {demoStep === 1 ? (
            <div className='space-y-4 animate-in fade-in duration-200'>
              <div>
                <label className='block text-xs font-semibold text-neutral-800 dark:text-neutral-200 mb-1.5'>{t.fullNameLabel}</label>
                <input
                  type='text'
                  required
                  placeholder={t.fullNamePlaceholder}
                  value={demoForm.name}
                  onChange={(e) => setDemoForm({ ...demoForm, name: e.target.value })}
                  className='w-full rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-4 py-2.5 text-xs sm:text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600'
                />
              </div>

              <div>
                <label className='block text-xs font-semibold text-neutral-800 dark:text-neutral-200 mb-1.5'>{t.phoneLabel}</label>
                <input
                  type='tel'
                  required
                  placeholder={t.phonePlaceholder}
                  value={demoForm.phone}
                  onChange={(e) => setDemoForm({ ...demoForm, phone: e.target.value })}
                  className='w-full rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-4 py-2.5 text-xs sm:text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600'
                />
              </div>

              <div>
                <label className='block text-xs font-semibold text-neutral-800 dark:text-neutral-200 mb-1.5'>{t.centerNameLabel}</label>
                <input
                  type='text'
                  required
                  placeholder={t.centerNamePlaceholder}
                  value={demoForm.centerName}
                  onChange={(e) => setDemoForm({ ...demoForm, centerName: e.target.value })}
                  className='w-full rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-4 py-2.5 text-xs sm:text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600'
                />
              </div>

              <button
                type='button'
                onClick={() => {
                  if (demoForm.name && demoForm.phone && demoForm.centerName) {
                    setDemoStep(2)
                  }
                }}
                disabled={!demoForm.name || !demoForm.phone || !demoForm.centerName}
                className='w-full flex items-center justify-center gap-2 rounded-md bg-blue-600 hover:bg-blue-700 py-3 text-xs font-bold text-white shadow-xs transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'
              >
                <span>{t.nextCapacityBtn}</span>
                <ArrowRight className='h-4 w-4' />
              </button>
            </div>
          ) : (
            <div className='space-y-4 animate-in fade-in duration-200'>
              <Dropdown<string>
                label={t.studentsDropdownLabel}
                options={t.studentsOptions}
                value={demoForm.studentsCount}
                onChange={(val) => setDemoForm({ ...demoForm, studentsCount: val })}
                searchable={true}
                searchPlaceholder={t.studentsSearchPlaceholder}
              />

              <div>
                <label className='block text-xs font-semibold text-neutral-800 dark:text-neutral-200 mb-1.5'>{t.preferredTimeLabel}</label>
                <div className='grid grid-cols-2 gap-2 text-xs'>
                  {t.timeOptions.map((time) => (
                    <button
                      key={time}
                      type='button'
                      onClick={() => setDemoForm({ ...demoForm, preferredTime: time })}
                      className={`p-2.5 rounded-md border text-left transition-all cursor-pointer ${
                        demoForm.preferredTime === time
                          ? 'border-blue-600 bg-blue-600 text-white font-bold'
                          : 'border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <div className='flex gap-3 pt-2'>
                <button
                  type='button'
                  onClick={() => setDemoStep(1)}
                  className='w-1/3 rounded-md border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 py-3 text-xs font-bold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors cursor-pointer'
                >
                  {t.backBtn}
                </button>

                <button
                  type='submit'
                  className='w-2/3 rounded-md bg-blue-600 hover:bg-blue-700 py-3 text-xs font-bold text-white shadow-xs transition-all cursor-pointer'
                >
                  {t.confirmBtn}
                </button>
              </div>
            </div>
          )}
        </form>
      )}
    </Modal>
  )
}
