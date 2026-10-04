import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createTransaction, deleteTransaction, fetchTransactions } from './transactionApi'

function mockFetch(text: string) {
    const fetchMock = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        text: () => Promise.resolve(text),
        json: () => Promise.resolve(JSON.parse(text || '{}')),
    })
    vi.stubGlobal('fetch', fetchMock)
    return fetchMock
}

beforeEach(() => vi.unstubAllGlobals())
afterEach(() => vi.restoreAllMocks())

const TOKEN = 'tok'

describe('fetchTransactions', () => {
    it('to‘g‘ri yo‘l va query parametrlarini yuboradi', async () => {
        const fetchMock = mockFetch('{"content":[],"totalElements":0}')
        await fetchTransactions(TOKEN, { page: 0, size: 10 })
        expect(fetchMock.mock.calls[0][0]).toBe('/api/v1/transaction?page=0&size=10')
    })

    it('bo‘sh qidiruvni query’dan tushirib qoldiradi', async () => {
        const fetchMock = mockFetch('{}')
        await fetchTransactions(TOKEN, { page: 0, size: 10, search: '' })
        expect(fetchMock.mock.calls[0][0]).toBe('/api/v1/transaction?page=0&size=10')
    })
})

describe('createTransaction', () => {
    it('POST /transaction ga tur, summa, o‘quvchi va hisobni yuboradi', async () => {
        const fetchMock = mockFetch('{"id":"t1"}')
        await createTransaction(TOKEN, { type: 'PAID', amount: 400000, studentId: 'st-1', invoiceId: 'inv-1' })

        expect(fetchMock.mock.calls[0][0]).toBe('/api/v1/transaction')
        expect(fetchMock.mock.calls[0][1].method).toBe('POST')
        expect(fetchMock.mock.calls[0][1].body).toBe(
            '{"type":"PAID","amount":400000,"studentId":"st-1","invoiceId":"inv-1"}'
        )
    })

    it('qaytarish sababini izoh sifatida yuboradi, bo‘sh izohni tushiradi', async () => {
        const fetchMock = mockFetch('{"id":"t4"}')
        await createTransaction(TOKEN, { type: 'PAID', amount: 1, studentId: 's', invoiceId: 'i', note: '  ' })
        await createTransaction(TOKEN, { type: 'REFUND', amount: 1, studentId: 's', invoiceId: 'i', note: ' Ko‘chib ketdi ' })

        expect(JSON.parse(fetchMock.mock.calls[0][1].body)).not.toHaveProperty('note')
        expect(JSON.parse(fetchMock.mock.calls[1][1].body).note).toBe('Ko‘chib ketdi')
    })
})

describe('createTransaction ishorasi', () => {
    // Backend summani turga qarab o'zgartirmaydi — qaytarim manfiy bo'lmasa
    // o'quvchining qarzi kamayish o'rniga ko'payib ketadi.
    it('qaytarimni manfiy qilib yuboradi', async () => {
        const fetchMock = mockFetch('{"id":"t2"}')
        await createTransaction(TOKEN, { type: 'REFUND', amount: 100000, studentId: 'st-1', invoiceId: 'inv-1' })

        expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toMatchObject({ type: 'REFUND', amount: -100000 })
    })

    it('to‘lovni musbat qoldiradi', async () => {
        const fetchMock = mockFetch('{"id":"t3"}')
        await createTransaction(TOKEN, { type: 'PAID', amount: 100000, studentId: 'st-1', invoiceId: 'inv-1' })

        expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toMatchObject({ type: 'PAID', amount: 100000 })
    })
})

describe('deleteTransaction', () => {
    it('DELETE /transaction/{id} yuboradi', async () => {
        const fetchMock = mockFetch('')
        await deleteTransaction(TOKEN, 't1')
        expect(fetchMock.mock.calls[0][0]).toBe('/api/v1/transaction/t1')
        expect(fetchMock.mock.calls[0][1].method).toBe('DELETE')
    })
})
