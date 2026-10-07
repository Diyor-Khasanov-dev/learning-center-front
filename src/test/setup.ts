import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

// Har testdan keyin DOM tozalanadi — aks holda oldingi testning
// komponentlari keyingisining so'rovlariga tushib qoladi.
afterEach(cleanup)

// Forma qoralamalari `localStorage` da — bir testda yozilgani keyingisida
// "tiklandi" bo'lib chiqmasin.
afterEach(() => localStorage.clear())
