import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { deleteInvoice, fetchInvoices } from './invoiceApi'

/**
 * `httpClient.test.ts` dagi kabi — global `fetch` soxtalashtiriladi,
 * `apiFetch` ning o'zi allaqachon sinalgan, shuning uchun bu yerda faqat
 * to'g'ri yo'l/metod/parametr yuborilishini tekshiramiz.
 */
interface FakeResponse {
    ok?: boolean
    status?: number
    text?: string
}

function mockFetch({ ok = true, status = 200, text = '' }: FakeResponse) {
    const fetchMock = vi.fn().mockResolvedValue({
        ok,
        status,
        text: () => Promise.resolve(text),
        json: () => Promise.resolve(JSON.parse(text || '{}')),
    })
    vi.stubGlobal('fetch', fetchMock)
    return fetchMock
}

beforeEach(() => vi.unstubAllGlobals())
afterEach(() => vi.restoreAllMocks())

const TOKEN = 'tok'

describe('fetchInvoices', () => {
    it('to‘g‘ri yo‘l va query parametrlarini yuboradi', async () => {
        const fetchMock = mockFetch({ text: '{"content":[],"totalElements":0}' })
        await fetchInvoices(TOKEN, { page: 0, size: 10 })
        expect(fetchMock.mock.calls[0][0]).toBe('/api/v1/invoice?page=0&size=10')
        expect(fetchMock.mock.calls[0][1].method).toBeUndefined()
    })

    it('bo‘sh va undefined qiymatlarni query’dan tushirib qoldiradi', async () => {
        const fetchMock = mockFetch({ text: '{}' })
        await fetchInvoices(TOKEN, { page: 0, size: 10, search: '', status: '', from: undefined })
        expect(fetchMock.mock.calls[0][0]).toBe('/api/v1/invoice?page=0&size=10')
    })

    it('javobni Page shaklida qaytaradi', async () => {
        mockFetch({ text: '{"content":[{"id":"1"}],"totalElements":1}' })
        const result = await fetchInvoices(TOKEN, { page: 0, size: 10 })
        expect(result).toEqual({ content: [{ id: '1' }], totalElements: 1 })
    })
})

describe('deleteInvoice', () => {
    it('DELETE /invoice/{id} yuboradi', async () => {
        const fetchMock = mockFetch({ text: '' })
        await deleteInvoice(TOKEN, '1')
        expect(fetchMock.mock.calls[0][0]).toBe('/api/v1/invoice/1')
        expect(fetchMock.mock.calls[0][1].method).toBe('DELETE')
    })
})
