import { useState } from 'react'
import { normalizePhone } from '@/shared/lib'
import type { FormValues } from '../types'
import { useUserByPhone } from './useUserByPhone'

/** `null` — hali javob yo'q; `'linked'` — tasdiqlangan; `'new'` — rad etilgan. */
export type LookupDecision = 'linked' | 'new' | null

/**
 * Yangi odam qo'shayotganda telefon bo'yicha mavjud foydalanuvchini qidirish.
 *
 * Tahrirlashda (`enabled = false`) odam allaqachon ma'lum, qidirilmaydi.
 */
export function usePhoneLookup(
    token: string,
    phone: string,
    enabled: boolean,
    setValues: (update: (current: FormValues) => FormValues) => void
) {
    const [decision, setDecision] = useState<LookupDecision>(null)
    const { found, isSearching } = useUserByPhone(token, normalizePhone(phone), enabled && decision === null)

    /**
     * Tasdiqlangach ma'lumot to'ladi, lekin BLOKLANMAYDI.
     *
     * Sabab: raqam boshqa odamga o'tgan bo'lishi mumkin va o'shanda yangi
     * egasining ismi yozilishi kerak. Formada nima tursa, o'sha yuboriladi —
     * backend mavjud odamni yangilaydi. Administrator xato yozsa, odam
     * o'zi kelib aytadi va administrator to'g'rilaydi.
     */
    function confirmExisting() {
        if (!found) return
        setValues((current) => ({
            ...current,
            fullName: found.fullName ?? current.fullName,
            birthDate: found.birthDate ?? current.birthDate,
        }))
        setDecision('linked')
    }

    return {
        found,
        isSearching,
        decision,
        confirmExisting,
        rejectExisting: () => setDecision('new'),
        // Raqam o'zgarsa oldingi qaror kuchini yo'qotadi — boshqa odam haqida gap ketyapti.
        resetDecision: () => setDecision(null),
    }
}
