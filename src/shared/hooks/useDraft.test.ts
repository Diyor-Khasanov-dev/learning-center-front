import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { readDraft, writeDraft } from '@/shared/lib'
import { useDraft } from './useDraft'

describe('useDraft', () => {
    it('saves every change so a refresh keeps it', () => {
        const first = renderHook(() => useDraft('lead-new', { name: '' }))
        act(() => first.result.current.setValue({ name: 'Ali' }))
        expect(readDraft('lead-new')).toEqual({ name: 'Ali' })
        first.unmount()

        // "Sahifa yangilandi" — yangi komponent o'sha kalit bilan
        const second = renderHook(() => useDraft('lead-new', { name: '' }))
        expect(second.result.current.value).toEqual({ name: 'Ali' })
        expect(second.result.current.restored).toBe(true)
        expect(second.result.current.isDirty).toBe(true)
    })

    it('drops the draft when the value returns to the start', () => {
        const { result } = renderHook(() => useDraft('lead-new', { name: '' }))
        act(() => result.current.setValue({ name: 'A' }))
        act(() => result.current.setValue((current) => ({ ...current, name: '' })))
        expect(readDraft('lead-new')).toBeNull()
        expect(result.current.isDirty).toBe(false)
    })

    it('discard removes the stored draft, reset goes back to the start', () => {
        writeDraft('lead-new', { name: 'Ali' })
        const { result } = renderHook(() => useDraft('lead-new', { name: '' }))
        act(() => result.current.discard())
        expect(readDraft('lead-new')).toBeNull()

        act(() => result.current.reset())
        expect(result.current.value).toEqual({ name: '' })
        expect(result.current.restored).toBe(false)
    })

    it('keeps drafts of different forms apart', () => {
        writeDraft('lead-edit:1', { name: 'Ali' })
        const { result } = renderHook(() => useDraft('lead-edit:2', { name: 'Vali' }))
        expect(result.current.value).toEqual({ name: 'Vali' })
        expect(result.current.restored).toBe(false)
    })
})
