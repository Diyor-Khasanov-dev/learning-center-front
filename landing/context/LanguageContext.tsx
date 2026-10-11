'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

export type Language = 'uz' | 'ru' | 'en'

export interface LanguageOption {
  code: Language
  label: string
}

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: 'uz', label: "O'zbekcha" },
  { code: 'ru', label: 'Русский' },
  { code: 'en', label: 'English' },
]

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

function getInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'uz'
  const storedLang = localStorage.getItem('alia-lang') as Language | null
  if (storedLang === 'uz' || storedLang === 'ru' || storedLang === 'en') {
    return storedLang
  }
  return 'uz'
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage)

  useEffect(() => {
    localStorage.setItem('alia-lang', language)
    document.documentElement.lang = language
  }, [language])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
