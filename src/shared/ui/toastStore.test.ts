import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { MAX_TOASTS, TOAST_DURATION_MS, dismissToast, getToasts, showErrorToast, subscribeToasts } from './toastStore'

describe('toastStore', () => {
    beforeEach(() => {
        vi.useFakeTimers()
    })

    afterEach(() => {
        for (const toast of getToasts()) dismissToast(toast.id)
        vi.useRealTimers()
    })

    it('shows a toast and notifies subscribers', () => {
        const listener = vi.fn()
        const unsubscribe = subscribeToasts(listener)

        showErrorToast(new Error('Saqlab bo‘lmadi'))

        expect(getToasts()).toHaveLength(1)
        expect(listener).toHaveBeenCalledTimes(1)
        unsubscribe()
    })

    it('dismisses itself after the duration', () => {
        showErrorToast(new Error('x'))

        vi.advanceTimersByTime(TOAST_DURATION_MS - 1)
        expect(getToasts()).toHaveLength(1)

        vi.advanceTimersByTime(1)
        expect(getToasts()).toHaveLength(0)
    })

    it('keeps only the latest toasts', () => {
        for (let i = 0; i < MAX_TOASTS + 2; i++) showErrorToast(new Error(`xato ${i}`))

        const messages = getToasts().map((toast) => (toast.error as Error).message)
        expect(messages).toEqual(['xato 2', 'xato 3', 'xato 4'])
    })
})
