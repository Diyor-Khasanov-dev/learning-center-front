import { describe, expect, it } from 'vitest'
import { composeTime, MINUTES, snapTime } from './timeStep'

describe('timeStep', () => {
    it('offers minutes in steps of ten', () => {
        expect(MINUTES).toEqual(['00', '10', '20', '30', '40', '50'])
    })

    it('snaps to the nearest ten minutes', () => {
        expect(snapTime('10:14')).toBe('10:10')
        expect(snapTime('10:15:00')).toBe('10:20')
        expect(snapTime('09:30')).toBe('09:30')
    })

    // 10:60 bo'lmaydi — soatga bir qo'shiladi.
    it('rolls 60 minutes over into the next hour', () => {
        expect(snapTime('10:55')).toBe('11:00')
    })

    it('stays within the day', () => {
        expect(snapTime('23:58')).toBe('23:50')
    })

    it('rejects invalid values', () => {
        expect(snapTime('')).toBe('')
        expect(snapTime('25:00')).toBe('')
    })

    it('defaults minutes to 00 when only the hour is picked', () => {
        expect(composeTime('10', '')).toBe('10:00')
        expect(composeTime('', '30')).toBe('')
    })
})
