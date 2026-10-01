import { describe, expect, it } from 'vitest'
import { flattenPagedModel } from './pagedModel'

describe('flattenPagedModel', () => {
    // Productiondagi haqiqiy javob shakli (VIA_DTO): shu tekislanmagani uchun
    // super-admin "filial yo'q" deb qulflanib qolgan edi.
    it('VIA_DTO javobidagi totalElements va totalPages ni tepa darajaga chiqaradi', () => {
        const raw = {
            content: [{ id: 'b1' }, { id: 'b2' }],
            page: { size: 10, number: 0, totalElements: 2, totalPages: 1 },
        }
        expect(flattenPagedModel(raw)).toMatchObject({
            content: [{ id: 'b1' }, { id: 'b2' }],
            totalElements: 2,
            totalPages: 1,
        })
    })

    it('eski tekis Page shaklini o‘zgarishsiz qaytaradi', () => {
        const raw = { content: [{ id: 'b1' }], totalElements: 1, totalPages: 1 }
        expect(flattenPagedModel(raw)).toBe(raw)
    })

    it('Page bo‘lmagan javoblarga tegmaydi', () => {
        const dto = { id: 'u1', page: { totalElements: 5 } }
        expect(flattenPagedModel(dto)).toBe(dto)
        expect(flattenPagedModel([1, 2])).toEqual([1, 2])
        expect(flattenPagedModel(5)).toBe(5)
        expect(flattenPagedModel(null)).toBeNull()
    })
})
