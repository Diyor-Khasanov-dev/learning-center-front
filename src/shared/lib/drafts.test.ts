import { afterEach, describe, expect, it } from 'vitest'
import { clearAllDrafts, readDraft, removeDraft, writeDraft } from './drafts'

describe('drafts', () => {
    afterEach(() => localStorage.clear())

    it('reads back what was written', () => {
        writeDraft('lead-new', { fullName: 'Ali' })
        expect(readDraft('lead-new')).toEqual({ fullName: 'Ali' })
    })

    it('returns null for a missing or removed draft', () => {
        expect(readDraft('nothing')).toBeNull()
        writeDraft('lead-new', { fullName: 'Ali' })
        removeDraft('lead-new')
        expect(readDraft('lead-new')).toBeNull()
    })

    it('drops drafts older than a week', () => {
        const savedAt = Date.UTC(2026, 9, 1)
        writeDraft('old', 'text', savedAt)
        expect(readDraft('old', savedAt + 6 * 86_400_000)).toBe('text')
        expect(readDraft('old', savedAt + 8 * 86_400_000)).toBeNull()
    })

    it('ignores broken JSON', () => {
        localStorage.setItem('alia:draft:broken', '{')
        expect(readDraft('broken')).toBeNull()
    })

    it('clears only drafts', () => {
        writeDraft('a', 1)
        writeDraft('b', 2)
        localStorage.setItem('clc-theme', 'dark')
        clearAllDrafts()
        expect(readDraft('a')).toBeNull()
        expect(readDraft('b')).toBeNull()
        expect(localStorage.getItem('clc-theme')).toBe('dark')
    })
})
