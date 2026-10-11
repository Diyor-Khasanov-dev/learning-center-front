'use client'

import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown, Globe } from 'lucide-react'
import { useLanguage, LANGUAGE_OPTIONS, Language } from '@/context/LanguageContext'

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const currentOption = LANGUAGE_OPTIONS.find((opt) => opt.code === language) || LANGUAGE_OPTIONS[0]

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (code: Language) => {
    setLanguage(code)
    setIsOpen(false)
  }

  return (
    <div className='relative inline-block text-left shrink-0' ref={dropdownRef}>
      <button
        type='button'
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center gap-1.5 rounded-md border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 px-2.5 py-1.5 text-xs font-semibold text-neutral-800 dark:text-neutral-200 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all cursor-pointer whitespace-nowrap'
        aria-label='Select language'
      >
        <Globe className='h-3.5 w-3.5 text-blue-600 dark:text-blue-400 shrink-0' />
        <span className='uppercase font-bold tracking-wider text-[11px] shrink-0'>{currentOption.code}</span>
        <ChevronDown className={`h-3 w-3 text-neutral-400 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 text-blue-600 dark:text-blue-400' : ''}`} />
      </button>

      {isOpen && (
        <div className='absolute right-0 mt-2 w-36 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-xl z-50 p-1 animate-in fade-in zoom-in-95 duration-150'>
          {LANGUAGE_OPTIONS.map((option) => {
            const isSelected = option.code === language
            return (
              <button
                key={option.code}
                type='button'
                onClick={() => handleSelect(option.code)}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-md font-medium transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-blue-600 text-white font-bold'
                    : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900'
                }`}
              >
                <span>{option.label}</span>
                <span className={`text-[10px] uppercase font-mono font-semibold shrink-0 ${isSelected ? 'text-blue-200' : 'text-neutral-400'}`}>
                  {option.code}
                </span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
