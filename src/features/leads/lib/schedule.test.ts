import { describe, expect, it } from 'vitest'
import { buildDayKeys, dayLabel, defaultSchedule, formatCallAt, isFuture, toCallAt } from './schedule'

// Mahalliy vaqt: 2026-10-07, chorshanba, 20:46.
const now = new Date(2026, 9, 7, 20, 46)
const words = { today: 'Bugun', tomorrow: 'Ertaga' }

describe('schedule', () => {
    it('lists days starting today without a year', () => {
        expect(buildDayKeys(now, 3)).toEqual(['2026-10-07', '2026-10-08', '2026-10-09'])
    })

    it('labels today, tomorrow and later days', () => {
        expect(dayLabel('2026-10-07', now, 'uz', words)).toBe('Bugun')
        expect(dayLabel('2026-10-08', now, 'uz', words)).toBe('Ertaga')
        expect(dayLabel('2026-10-10', now, 'uz', words)).toBe('Shan, 10 okt')
        expect(dayLabel('2026-10-10', now, 'en', words)).toBe('Sat, Oct 10')
    })

    it('defaults to the next full hour, rolling over midnight', () => {
        expect(defaultSchedule(now)).toEqual({ day: '2026-10-07', hour: 21, minute: 0 })
        expect(defaultSchedule(new Date(2026, 9, 7, 23, 30))).toEqual({ day: '2026-10-08', hour: 0, minute: 0 })
    })

    it('builds the backend value in local time', () => {
        expect(toCallAt({ day: '2026-10-10', hour: 9, minute: 5 })).toBe('2026-10-10T09:05')
    })

    it('knows whether the time is still ahead', () => {
        expect(isFuture({ day: '2026-10-07', hour: 20, minute: 40 }, now)).toBe(false)
        expect(isFuture({ day: '2026-10-07', hour: 20, minute: 50 }, now)).toBe(true)
    })

    it('formats the card time in 24h like Telegram', () => {
        expect(formatCallAt('2026-10-07T15:00:00', now, 'uz', words)).toBe('Bugun, 15:00')
        expect(formatCallAt('2026-10-09T10:30', now, 'uz', words)).toBe('Ju, 9 okt, 10:30')
        expect(formatCallAt(null, now, 'uz', words)).toBe('')
    })
})
