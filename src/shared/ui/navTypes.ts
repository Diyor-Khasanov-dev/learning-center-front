import { createContext, type ReactNode } from 'react'

/** Chap menyudagi bitta band. */
export interface NavItem {
    key: string
    label: string
    icon?: ReactNode
    active?: boolean
    onClick: () => void
    disabled?: boolean
    /** Qizil nuqta — bajarilishi kerak bo'lgan ish bor. */
    dot?: boolean
}

/** Bandlar guruhi; `label` bo'lsa guruh yig'ilib-ochiladi. */
export interface NavSection {
    key: string
    label?: string
    items: NavItem[]
}

/**
 * Rolga qarab umumiy havolalar (Bosh sahifa, Lidlar, To'lovlar, Sozlamalar).
 *
 * Context — chunki `shared` `app` dan import qila olmaydi (1-qoida): ro'yxatni
 * `app` qatlami yig'ib beradi, `AppShell` esa shu yerdan o'qiydi. Har sahifa
 * faqat o'z bo'limlarini (`nav` prop) beradi.
 */
export const AppNavContext = createContext<NavSection[]>([])
