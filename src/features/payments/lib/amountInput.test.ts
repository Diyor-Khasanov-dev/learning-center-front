import { describe, expect, it } from 'vitest'
import { caretAfterDigits, formatAmountInput, parseAmountInput } from './amountInput'

describe('formatAmountInput', () => {
    it('groups thousands with spaces', () => {
        expect(formatAmountInput('100')).toBe('100')
        expect(formatAmountInput('1000')).toBe('1 000')
        expect(formatAmountInput('10000')).toBe('10 000')
        expect(formatAmountInput('889000')).toBe('889 000')
        expect(formatAmountInput('1250000')).toBe('1 250 000')
    })

    it('drops non-digits and leading zeros', () => {
        expect(formatAmountInput('12a 3,4.5')).toBe('12 345')
        expect(formatAmountInput('000450')).toBe('450')
        expect(formatAmountInput('0')).toBe('0')
        expect(formatAmountInput('')).toBe('')
    })

    it('caps the length', () => {
        expect(formatAmountInput('1234567890123456')).toBe('123 456 789 012')
    })
})

describe('parseAmountInput', () => {
    it('reads the formatted value back', () => {
        expect(parseAmountInput('889 000')).toBe(889000)
        expect(Number.isNaN(parseAmountInput(''))).toBe(true)
    })
})

describe('caretAfterDigits', () => {
    it('keeps the caret after the same digit', () => {
        // "1 000" — 2 ta raqamdan keyin: "1 0|00"
        expect(caretAfterDigits('1 000', 2)).toBe(3)
        expect(caretAfterDigits('1 000', 0)).toBe(0)
        expect(caretAfterDigits('1 000', 9)).toBe(5)
    })
})
