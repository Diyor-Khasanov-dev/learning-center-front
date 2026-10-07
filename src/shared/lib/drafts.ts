/**
 * Modal formalar qoralamasi — sahifa yangilansa ham yozilgan matn qolsin.
 *
 * `localStorage` da turadi, chunki qoralama ayni shu brauzerga tegishli va
 * serverga yuborilmagan. Ichida ism va telefon bo'lishi mumkin — shuning
 * uchun chiqishda hammasi o'chiriladi (`clearAllDrafts`) va eskisi
 * `MAX_AGE_MS` dan keyin o'z-o'zidan tashlanadi.
 *
 * Har chaqiruv try/catch ichida: private rejimda yoki joy tugaganda
 * `localStorage` xato tashlaydi — qoralama saqlanmasa ham forma ishlayversin.
 */
const PREFIX = 'alia:draft:'
const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000

interface StoredDraft<T> {
    savedAt: number
    value: T
}

export function readDraft<T>(key: string, now = Date.now()): T | null {
    try {
        const raw = localStorage.getItem(PREFIX + key)
        if (!raw) return null
        const stored = JSON.parse(raw) as StoredDraft<T>
        if (typeof stored?.savedAt !== 'number' || now - stored.savedAt > MAX_AGE_MS) {
            localStorage.removeItem(PREFIX + key)
            return null
        }
        return stored.value
    } catch {
        return null
    }
}

export function writeDraft<T>(key: string, value: T, now = Date.now()): void {
    try {
        localStorage.setItem(PREFIX + key, JSON.stringify({ savedAt: now, value } satisfies StoredDraft<T>))
    } catch {
        /* localStorage yopiq yoki to'lgan */
    }
}

export function removeDraft(key: string): void {
    try {
        localStorage.removeItem(PREFIX + key)
    } catch {
        /* localStorage yopiq */
    }
}

export function clearAllDrafts(): void {
    try {
        Object.keys(localStorage)
            .filter((key) => key.startsWith(PREFIX))
            .forEach((key) => localStorage.removeItem(key))
    } catch {
        /* localStorage yopiq */
    }
}
