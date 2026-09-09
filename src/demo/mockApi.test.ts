import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { apiFetch } from '@/shared/api'
import { installMockApi, resetMockApiInstalledFlag } from './mockApi'

describe('mockApi', () => {
    const originalFetch = window.fetch

    beforeEach(() => {
        resetMockApiInstalledFlag()
        installMockApi()
    })

    afterEach(() => {
        resetMockApiInstalledFlag()
        window.fetch = originalFetch
    })

    it('PUT /user/u-demo updates user profile without returning 404', async () => {
        const data = await apiFetch<Record<string, unknown>>('/user/u-demo', {
            method: 'PUT',
            body: {
                fullName: 'New Demo Name',
                phone: '+998 90 999 99 99',
                birthDate: '2000-01-01',
            },
        })

        expect(data).not.toBeNull()
        expect(data?.fullName).toBe('New Demo Name')
        expect(data?.phone).toBe('+998 90 999 99 99')
    })

    it('handles /leads endpoints correctly', async () => {
        // GET /leads
        const getPage = await apiFetch<Record<string, unknown>>('/leads', { token: 'demo' })
        expect(getPage).not.toBeNull()
        const content = getPage?.content as Array<Record<string, unknown>>
        expect(content.length).toBeGreaterThan(0)

        // POST /leads
        const created = await apiFetch<Record<string, unknown>>('/leads', {
            method: 'POST',
            token: 'demo',
            body: {
                fullName: 'Test Lead',
                phone: '+998 90 000 00 00',
                source: 'INSTAGRAM',
                preferredCourse: 'lvl-a1',
            },
        })
        expect(created?.fullName).toBe('Test Lead')
        expect(created?.status).toBe('NEW')

        const leadId = created?.id as string

        // PUT /leads/:id
        const updated = await apiFetch<Record<string, unknown>>(`/leads/${leadId}`, {
            method: 'PUT',
            token: 'demo',
            body: {
                fullName: 'Updated Lead',
                status: 'NEW',
            },
        })
        expect(updated?.fullName).toBe('Updated Lead')

        // PATCH /leads/:id/callLater
        const calledLater = await apiFetch<Record<string, unknown>>(`/leads/${leadId}/callLater`, {
            method: 'PATCH',
            token: 'demo',
            params: { callAt: '2026-09-01T10:00:00' },
        })
        expect(calledLater?.status).toBe('CALL_LATER')
        expect(calledLater?.callAt).toBe('2026-09-01T10:00:00')

        // POST /leads/:id/enroll
        const enrolled = await apiFetch<Record<string, unknown>>(`/leads/${leadId}/enroll`, {
            method: 'POST',
            token: 'demo',
            params: { groupId: 'g1' },
        })
        expect(enrolled?.status).toBe('ENROLLED')

        // DELETE /leads/:id
        await expect(apiFetch(`/leads/${leadId}`, { method: 'DELETE', token: 'demo' })).resolves.toBeNull()
    })

    it('handles /group-level endpoints correctly', async () => {
        // GET /group-level/names
        const names = await apiFetch<Array<Record<string, unknown>>>('/group-level/names', { token: 'demo' })
        expect(Array.isArray(names)).toBe(true)
        expect(names?.[0]).toHaveProperty('id')
        expect(names?.[0]).toHaveProperty('name')

        // GET /group-level
        const levels = await apiFetch<Array<Record<string, unknown>>>('/group-level', { token: 'demo' })
        expect(Array.isArray(levels)).toBe(true)
        expect(levels!.length).toBeGreaterThan(0)

        // POST /group-level
        const created = await apiFetch<Record<string, unknown>>('/group-level', {
            method: 'POST',
            token: 'demo',
            body: {
                name: 'C1 Advanced',
                lessonCount: 30,
                durationInMonths: 6,
                monthlyFee: 600000,
            },
        })
        expect(created?.name).toBe('C1 Advanced')

        const levelId = created?.id as string

        // PUT /group-level/:id
        const updated = await apiFetch<Record<string, unknown>>(`/group-level/${levelId}`, {
            method: 'PUT',
            token: 'demo',
            body: {
                monthlyFee: 650000,
            },
        })
        expect(updated?.monthlyFee).toBe(650000)

        // DELETE /group-level/:id
        await expect(apiFetch(`/group-level/${levelId}`, { method: 'DELETE', token: 'demo' })).resolves.toBeNull()
    })

    it('handles /analytics/:category endpoints correctly', async () => {
        const categories = ['student', 'teacher', 'lead', 'invoice', 'enrollment', 'branch']
        for (const cat of categories) {
            const data = await apiFetch<Record<string, unknown>>(`/analytics/${cat}`, { token: 'demo' })
            expect(data).not.toBeNull()
            expect(typeof data).toBe('object')
        }
    })

    it('handles /image endpoints correctly', async () => {
        // GET /image
        const pageRes = await apiFetch<Record<string, unknown>>('/image', { token: 'demo' })
        expect(pageRes).not.toBeNull()
        const content = pageRes?.content as Array<Record<string, unknown>>
        expect(content.length).toBeGreaterThan(0)

        // POST /image/upload
        const uploadRes = await apiFetch<Record<string, unknown>>('/image/upload', {
            method: 'POST',
            token: 'demo',
            body: new FormData(),
        })
        expect(uploadRes).not.toBeNull()
        expect(uploadRes?.imageUrl).toHaveProperty('id')

        const imageObj = uploadRes?.imageUrl as Record<string, unknown>
        const newId = imageObj.id as string

        // PUT /image/main/:id
        await expect(apiFetch(`/image/main/${newId}`, { method: 'PUT', token: 'demo' })).resolves.toBeNull()

        // DELETE /image/:id
        await expect(apiFetch(`/image/${newId}`, { method: 'DELETE', token: 'demo' })).resolves.toBeNull()
    })
})
