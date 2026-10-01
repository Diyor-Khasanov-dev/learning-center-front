import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
    createEntity,
    deleteEntity,
    fetchBranchOptions,
    fetchEntityCount,
    fetchEntityPage,
    fetchFreeTeacherOptions,
    fetchGroupOptions,
    fetchTeacherOptions,
    updateEntity,
} from './adminApi'

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

describe('fetchEntityPage', () => {
    it('berilgan endpoint va query parametrlarini yuboradi', async () => {
        const fetchMock = mockFetch({ text: '{"content":[],"totalElements":0}' })
        await fetchEntityPage('/student', TOKEN, { page: 0, size: 10 })
        expect(fetchMock.mock.calls[0][0]).toBe('/api/v1/student?page=0&size=10')
    })

    it('bo‘sh va undefined qiymatlarni query’dan tushirib qoldiradi', async () => {
        const fetchMock = mockFetch({ text: '{}' })
        await fetchEntityPage('/teacher', TOKEN, { page: 1, size: 20, search: '', status: undefined })
        expect(fetchMock.mock.calls[0][0]).toBe('/api/v1/teacher?page=1&size=20')
    })
})

describe('fetchEntityCount', () => {
    it('sof son javobini qaytaradi', async () => {
        const fetchMock = mockFetch({ text: '5' })
        const result = await fetchEntityCount('/student', TOKEN)
        expect(fetchMock.mock.calls[0][0]).toBe('/api/v1/student/count')
        expect(result).toBe(5)
    })

    it('{ count } obyekt javobini ham qaytaradi', async () => {
        mockFetch({ text: '{"count":7}' })
        const result = await fetchEntityCount('/teacher', TOKEN)
        expect(result).toBe(7)
    })

    it('javob bo‘lmasa null qaytaradi', async () => {
        mockFetch({ text: '' })
        const result = await fetchEntityCount('/group', TOKEN)
        expect(result).toBeNull()
    })
})

describe('createEntity', () => {
    it('POST so‘rovini berilgan endpoint va body bilan yuboradi', async () => {
        const fetchMock = mockFetch({ text: '{"id":"1"}' })
        await createEntity('/student', TOKEN, { name: 'Ali' })
        expect(fetchMock.mock.calls[0][0]).toBe('/api/v1/student')
        expect(fetchMock.mock.calls[0][1].method).toBe('POST')
        expect(fetchMock.mock.calls[0][1].body).toBe('{"name":"Ali"}')
    })
})

describe('updateEntity', () => {
    it('PUT so‘rovini {endpoint}/{id} ga yuboradi', async () => {
        const fetchMock = mockFetch({ text: '{"id":"1"}' })
        await updateEntity('/student', TOKEN, '1', { name: 'Ali' })
        expect(fetchMock.mock.calls[0][0]).toBe('/api/v1/student/1')
        expect(fetchMock.mock.calls[0][1].method).toBe('PUT')
        expect(fetchMock.mock.calls[0][1].body).toBe('{"name":"Ali"}')
    })
})

describe('deleteEntity', () => {
    it('DELETE so‘rovini {endpoint}/{id} ga yuboradi', async () => {
        const fetchMock = mockFetch({ text: '' })
        await deleteEntity('/student', TOKEN, '1')
        expect(fetchMock.mock.calls[0][0]).toBe('/api/v1/student/1')
        expect(fetchMock.mock.calls[0][1].method).toBe('DELETE')
    })
})

describe('fetchTeacherOptions', () => {
    it('/teacher ga sahifalash parametrlarini yuborib, {value,label} ro‘yxatiga o‘giradi', async () => {
        const fetchMock = mockFetch({
            text: '{"content":[{"id":"t1","userDto":{"fullName":"Vali Aliyev"}}]}',
        })
        const options = await fetchTeacherOptions(TOKEN)
        expect(fetchMock.mock.calls[0][0]).toBe('/api/v1/teacher?page=0&size=200')
        expect(options).toEqual([{ value: 't1', label: 'Vali Aliyev' }])
    })

    it('fullName bo‘lmasa id ni label sifatida ishlatadi', async () => {
        mockFetch({ text: '{"content":[{"id":"t2","userDto":{}}]}' })
        const options = await fetchTeacherOptions(TOKEN)
        expect(options).toEqual([{ value: 't2', label: 't2' }])
    })
})

describe('fetchFreeTeacherOptions', () => {
    it('/teacher/filter-for-group-create ga parametrlar yuborib, {value,label} ro‘yxatiga o‘giradi', async () => {
        const fetchMock = mockFetch({
            text: '[{"id":"t1","name":"Vali Aliyev"}]',
        })
        const options = await fetchFreeTeacherOptions(TOKEN, 'ODD', '09:00', '10:30')
        expect(fetchMock.mock.calls[0][0]).toBe(
            '/api/v1/teacher/filter-for-group-create?dayType=ODD&startTime=09%3A00&endTime=10%3A30'
        )
        expect(options).toEqual([{ value: 't1', label: 'Vali Aliyev' }])
    })

    it('name bo‘lmasa id ni label sifatida ishlatadi', async () => {
        mockFetch({ text: '[{"id":"t2"}]' })
        const options = await fetchFreeTeacherOptions(TOKEN, 'EVEN', '11:00', '12:00')
        expect(options).toEqual([{ value: 't2', label: 't2' }])
    })
})

describe('fetchGroupOptions', () => {
    it('sahifalangan /group ga murojaat qiladi (/group/groups emas)', async () => {
        const fetchMock = mockFetch({ text: '{"content":[{"id":"g1","name":"Guruh 1"}]}' })
        const options = await fetchGroupOptions(TOKEN)
        expect(fetchMock.mock.calls[0][0]).toBe('/api/v1/group?page=0&size=200')
        expect(options).toEqual([{ value: 'g1', label: 'Guruh 1' }])
    })

    it('name bo‘lmasa id ni label sifatida ishlatadi', async () => {
        mockFetch({ text: '{"content":[{"id":"g2","name":""}]}' })
        const options = await fetchGroupOptions(TOKEN)
        expect(options).toEqual([{ value: 'g2', label: 'g2' }])
    })
})

describe('fetchBranchOptions', () => {
    it('/branch ga sahifalash parametrlarini yuborib, {value,label} ro‘yxatiga o‘giradi', async () => {
        const fetchMock = mockFetch({ text: '{"content":[{"id":"b1","name":"Chilonzor"}]}' })
        const options = await fetchBranchOptions(TOKEN)
        expect(fetchMock.mock.calls[0][0]).toBe('/api/v1/branch?page=0&size=200')
        expect(options).toEqual([{ value: 'b1', label: 'Chilonzor' }])
    })

    it('name bo‘lmasa id ni label sifatida ishlatadi', async () => {
        mockFetch({ text: '{"content":[{"id":"b2","name":""}]}' })
        const options = await fetchBranchOptions(TOKEN)
        expect(options).toEqual([{ value: 'b2', label: 'b2' }])
    })
})
