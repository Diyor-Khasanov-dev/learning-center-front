import { describe, expect, it } from 'vitest'
import { getMonthDateRange, getLast6MonthsRanges } from './useMonthlyInvoiceRevenue'

describe('useMonthlyInvoiceRevenue month localization', () => {
    it('formats month labels according to specified locale', () => {
        const dateRangeUz = getMonthDateRange(2025, 0, 'uz')
        expect(dateRangeUz.monthLabel.toLowerCase()).toContain('yan')

        const dateRangeRu = getMonthDateRange(2025, 0, 'ru')
        expect(dateRangeRu.monthLabel.toLowerCase()).toContain('янв')

        const dateRangeEn = getMonthDateRange(2025, 0, 'en')
        expect(dateRangeEn.monthLabel).toBe('Jan')
    })

    it('returns last 6 months ranges with correct locale formatting', () => {
        const baseDate = new Date(2025, 5, 15) // June 2025
        const rangesEn = getLast6MonthsRanges(baseDate, 'en')

        expect(rangesEn).toHaveLength(6)
        expect(rangesEn.map((r) => r.monthLabel)).toEqual(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'])
    })
})
