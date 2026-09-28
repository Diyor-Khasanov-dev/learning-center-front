import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
    createAdmin,
    createBranch,
    createOrganization,
    deleteBranch,
    fetchAdminCount,
    fetchAnalytics,
    fetchBranches,
    fetchOrganizations,
    updateBranch,
    updateOrganization,
} from './superAdminApi'

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

describe('fetchOrganizations', () => {
    it('to‘g‘ri yo‘l va query parametrlarini yuboradi', async () => {
        const fetchMock = mockFetch({ text: '{"content":[],"totalElements":0}' })
        await fetchOrganizations(TOKEN, { page: 0, size: 10 })
        expect(fetchMock.mock.calls[0][0]).toBe('/api/v1/organization?page=0&size=10')
    })

    it('bo‘sh search parametrini query’dan tushirib qoldiradi', async () => {
        const fetchMock = mockFetch({ text: '{}' })
        await fetchOrganizations(TOKEN, { page: 0, size: 10, search: '' })
        expect(fetchMock.mock.calls[0][0]).toBe('/api/v1/organization?page=0&size=10')
    })
})

describe('createOrganization', () => {
    it('POST /organizations ga body yuboradi', async () => {
        const fetchMock = mockFetch({ text: '{"id":"1"}' })
        await createOrganization(TOKEN, { name: 'Markaz' })
        expect(fetchMock.mock.calls[0][0]).toBe('/api/v1/organization')
        expect(fetchMock.mock.calls[0][1].method).toBe('POST')
        expect(fetchMock.mock.calls[0][1].body).toBe('{"name":"Markaz"}')
    })
})

describe('updateOrganization', () => {
    it('PUT /organizations/{id} ga body yuboradi', async () => {
        const fetchMock = mockFetch({ text: '{"id":"1"}' })
        await updateOrganization(TOKEN, '1', { name: 'Markaz 2' })
        expect(fetchMock.mock.calls[0][0]).toBe('/api/v1/organization/1')
        expect(fetchMock.mock.calls[0][1].method).toBe('PUT')
        expect(fetchMock.mock.calls[0][1].body).toBe('{"name":"Markaz 2"}')
    })
})

describe('fetchBranches', () => {
    it('to‘g‘ri yo‘l va query parametrlarini yuboradi', async () => {
        const fetchMock = mockFetch({ text: '{"content":[],"totalElements":0}' })
        await fetchBranches(TOKEN, { page: 0, size: 10, search: 'Toshkent' })
        expect(fetchMock.mock.calls[0][0]).toBe('/api/v1/branch?page=0&size=10&search=Toshkent')
    })
})

describe('createBranch', () => {
    it('POST /branch ga organizationId bilan yuboradi', async () => {
        const fetchMock = mockFetch({ text: '{"id":"1"}' })
        await createBranch(TOKEN, { name: 'Filial 1', organizationId: 'o1' })
        expect(fetchMock.mock.calls[0][0]).toBe('/api/v1/branch')
        expect(fetchMock.mock.calls[0][1].method).toBe('POST')
        expect(fetchMock.mock.calls[0][1].body).toBe('{"name":"Filial 1","organizationId":"o1"}')
    })
})

describe('updateBranch', () => {
    it('PUT /branch/{id} ga organizationId siz body yuboradi', async () => {
        const fetchMock = mockFetch({ text: '{"id":"1"}' })
        await updateBranch(TOKEN, '1', { name: 'Filial 2' })
        expect(fetchMock.mock.calls[0][0]).toBe('/api/v1/branch/1')
        expect(fetchMock.mock.calls[0][1].method).toBe('PUT')
        expect(fetchMock.mock.calls[0][1].body).toBe('{"name":"Filial 2"}')
    })
})

describe('deleteBranch', () => {
    it('DELETE /branch/{id} yuboradi', async () => {
        const fetchMock = mockFetch({ text: '' })
        await deleteBranch(TOKEN, '1')
        expect(fetchMock.mock.calls[0][0]).toBe('/api/v1/branch/1')
        expect(fetchMock.mock.calls[0][1].method).toBe('DELETE')
    })
})

describe('fetchAnalytics', () => {
    it('GET /analytics/{category} yuboradi', async () => {
        const fetchMock = mockFetch({ text: '{"studentCount":10,"studentsAddedInMonth":2}' })
        const res = await fetchAnalytics(TOKEN, 'student')
        expect(fetchMock.mock.calls[0][0]).toBe('/api/v1/analytics/student')
        expect(res).toEqual({ studentCount: 10, studentsAddedInMonth: 2 })
    })
})

describe('fetchAdminCount', () => {
    it('GET /user/admins yuboradi (role filtrisiz) va totalElements ni qaytaradi', async () => {
        const fetchMock = mockFetch({ text: '{"content":[{"id":"u1"}],"totalElements":5}' })
        const count = await fetchAdminCount(TOKEN)
        expect(fetchMock.mock.calls[0][0]).toBe('/api/v1/user/admins?page=0&size=1')
        expect(count).toBe(5)
    })
})

describe('createAdmin', () => {
    it('POST /user ga role, branchId va permissions bilan yuboradi', async () => {
        const fetchMock = mockFetch({
            text: '{"id":"a1","fullName":"Kamola","phone":"+998901234567","temporaryPassword":"Ab12Cd34"}',
        })
        const result = await createAdmin(TOKEN, {
            fullName: 'Kamola',
            phone: '+998901234567',
            role: 'ADMINISTRATOR',
            branchId: 'b1',
            permissions: ['LEAD_MANAGEMENT'],
        })
        expect(fetchMock.mock.calls[0][0]).toBe('/api/v1/user')
        expect(fetchMock.mock.calls[0][1].method).toBe('POST')
        expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toEqual({
            fullName: 'Kamola',
            phone: '+998901234567',
            role: 'ADMINISTRATOR',
            branchId: 'b1',
            permissions: ['LEAD_MANAGEMENT'],
        })
        expect(result).toEqual({
            id: 'a1',
            fullName: 'Kamola',
            phone: '+998901234567',
            temporaryPassword: 'Ab12Cd34',
        })
    })
})
