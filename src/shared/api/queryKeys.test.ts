import { describe, expect, it } from 'vitest'
import { queryKeys } from './queryKeys'

describe('queryKeys.people / peopleKind', () => {
    it('people(kind, params) queryKeys.peopleKind(kind) bilan boshlanadi', () => {
        const params = { page: 0, size: 10 }
        const full = queryKeys.people('administrators', params)
        const prefix = queryKeys.peopleKind('administrators')

        expect(full.slice(0, prefix.length)).toEqual(prefix)
    })

    it('turli params bilan ham bitta peopleKind prefiksi ostida qoladi — invalidateQueries shularning hammasini topadi', () => {
        const prefix = queryKeys.peopleKind('administrators')
        expect(queryKeys.people('administrators', { page: 0, size: 10 }).slice(0, prefix.length)).toEqual(prefix)
        expect(
            queryKeys.people('administrators', { page: 2, size: 10, search: 'ali' }).slice(0, prefix.length)
        ).toEqual(prefix)
    })
})
