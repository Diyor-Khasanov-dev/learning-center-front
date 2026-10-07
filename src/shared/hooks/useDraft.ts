import { useCallback, useEffect, useState } from 'react'
import { readDraft, removeDraft, writeDraft } from '@/shared/lib'

/** Qiymatlar JSON ko'rinishida solishtiriladi — forma qiymatlari oddiy obyektlar. */
function same(a: unknown, b: unknown): boolean {
    return JSON.stringify(a) === JSON.stringify(b)
}

/**
 * Forma qiymati + uning qoralamasi.
 *
 * Har o'zgarish darhol yozib boriladi: "saqlash" tugmasini kutsak, sahifa
 * yangilanganda (yoki brauzer yopilganda) yozilgani yo'qolardi. Qiymat
 * boshlang'ich holatga qaytsa, qoralama ham o'chadi — bo'sh qoralama
 * keyingi safar "tiklandi" deb chalg'itmasin.
 *
 * `discard` faqat saqlanganini o'chiradi; oyna baribir yopiladi, shuning
 * uchun holatni qaytarish shart emas. `reset` esa oyna ichida turib
 * "eski qoralama kerak emas" deyish uchun.
 */
export function useDraft<T>(key: string, initial: T) {
    const [initialValue] = useState(initial)
    const [state, setState] = useState(() => {
        const saved = readDraft<T>(key)
        const restored = saved !== null && !same(saved, initial)
        return { value: restored ? (saved as T) : initial, restored }
    })
    const { value, restored } = state
    const isDirty = !same(value, initialValue)

    useEffect(() => {
        if (isDirty) writeDraft(key, value)
        else removeDraft(key)
    }, [key, value, isDirty])

    const setValue = useCallback((next: T | ((current: T) => T)) => {
        setState((current) => ({
            ...current,
            value: typeof next === 'function' ? (next as (current: T) => T)(current.value) : next,
        }))
    }, [])

    const discard = useCallback(() => removeDraft(key), [key])
    const reset = useCallback(() => setState({ value: initialValue, restored: false }), [initialValue])

    return { value, setValue, isDirty, restored, discard, reset }
}

export type DraftState<T> = ReturnType<typeof useDraft<T>>
