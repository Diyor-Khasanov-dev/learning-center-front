'use client'

import React, { useSyncExternalStore } from 'react'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'

interface ThemeToggleProps {
  className?: string
}

const emptySubscribe = () => () => {}

export function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme()
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )

  if (!isMounted) {
    return (
      <div className={`h-9 w-9 rounded-md border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 ${className}`} />
    )
  }

  return (
    <button
      onClick={toggleTheme}
      type='button'
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className={`relative inline-flex h-9 w-9 items-center justify-center rounded-md border transition-all duration-200 cursor-pointer ${
        theme === 'dark'
          ? 'border-neutral-800 bg-neutral-900 text-neutral-300 hover:bg-neutral-800 hover:text-white'
          : 'border-neutral-200 bg-neutral-100 text-neutral-700 hover:bg-neutral-200 hover:text-black'
      } ${className}`}
    >
      {theme === 'dark' ? (
        <Sun className='h-4 w-4 text-blue-400 transition-transform duration-300 rotate-0 hover:rotate-45' />
      ) : (
        <Moon className='h-4 w-4 text-blue-600 transition-transform duration-300 rotate-0 hover:-rotate-12' />
      )}
    </button>
  )
}
