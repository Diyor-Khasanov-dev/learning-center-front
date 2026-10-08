import { describe, expect, it } from 'vitest'
import { formatPhone, formatUzPhone, isCompleteUzPhone, isValidPhone, normalizePhone } from './phone'

describe('normalizePhone', () => {
    it('bo‘shliq, chiziqcha va qavslarni olib tashlaydi', () => {
        expect(normalizePhone(' +998 90 123-45-67 ')).toBe('+998901234567')
        expect(normalizePhone('(90) 123 45 67')).toBe('901234567')
    })
})

describe('isValidPhone', () => {
    it('bo‘shliqli yozuvni ham qabul qiladi', () => {
        expect(isValidPhone('+998 90 123 45 67')).toBe(true)
    })

    it('bo‘sh yoki juda qisqa raqamni rad etadi', () => {
        expect(isValidPhone('')).toBe(false)
        expect(isValidPhone('+9')).toBe(false)
    })

    it('nol bilan boshlangan raqamni rad etadi', () => {
        expect(isValidPhone('+0998901234567')).toBe(false)
    })
})

describe('formatPhone', () => {
    it('o‘zbek raqamini bo‘laklarga ajratadi', () => {
        expect(formatPhone('+998901234567')).toBe('+998 90 123 45 67')
    })

    // Yozib turganda ham ko'rinish buzilmasin.
    it('to‘liq bo‘lmagan raqamni ham ajratadi', () => {
        expect(formatPhone('+9989012')).toBe('+998 90 12')
        expect(formatPhone('+998')).toBe('+998 ')
    })

    /*
     * Boshqa davlatning guruhlashini bilmaymiz — noto'g'ri formatlash
     * umuman formatlamaslikdan yomonroq, shuning uchun tegmaymiz.
     */
    it('chet el raqamiga tegmaydi', () => {
        expect(formatPhone('+1 555 0100')).toBe('+1 555 0100')
        expect(formatPhone('+7 916 1234567')).toBe('+7 916 1234567')
    })

    it('ortiqcha raqamlarni tashlab yuboradi', () => {
        expect(formatPhone('+9989012345678888')).toBe('+998 90 123 45 67')
    })
})

describe('formatUzPhone', () => {
    it('always keeps the +998 prefix', () => {
        expect(formatUzPhone('')).toBe('+998 ')
        expect(formatUzPhone('+99')).toBe('+998 ')
    })

    it('formats pasted local and full numbers', () => {
        expect(formatUzPhone('901234567')).toBe('+998 90 123 45 67')
        expect(formatUzPhone('+998 (90) 123-45-67')).toBe('+998 90 123 45 67')
    })

    // Login maydoniga cheksiz raqam yozib bo'lardi.
    // Maydonda "+998 " turgan holda to'liq raqam joylansa ikkilanmasin.
    it('does not double the prefix when a full number is pasted', () => {
        expect(formatUzPhone('+998 +998 90 123 45 67')).toBe('+998 90 123 45 67')
        // Mahalliy raqam ham 99 bilan boshlanishi mumkin (Uzmobile).
        expect(formatUzPhone('+998 998123456')).toBe('+998 99 812 34 56')
    })

    it('caps the number at nine local digits', () => {
        expect(formatUzPhone('+99833333333333333333333')).toBe('+998 33 333 33 33')
    })
})

describe('isCompleteUzPhone', () => {
    it('accepts only a full Uzbek number', () => {
        expect(isCompleteUzPhone('+998 90 123 45 67')).toBe(true)
        expect(isCompleteUzPhone('+998 90 123')).toBe(false)
        expect(isCompleteUzPhone('+998 ')).toBe(false)
    })
})

describe('normalizePhone prefix only', () => {
    // Tegilmagan ixtiyoriy maydon serverga "+998" bo'lib ketmasin.
    it('treats a bare +998 as empty', () => {
        expect(normalizePhone('+998 ')).toBe('')
    })
})

