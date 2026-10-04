import { afterEach, describe, expect, it, vi } from 'vitest'
import { fetchStudentInvoices, searchStudents } from './paymentLookupApi'

function mockFetch(body: unknown) {
    const fetchMock = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        text: () => Promise.resolve(JSON.stringify(body)),
    })
    vi.stubGlobal('fetch', fetchMock)
    return fetchMock
}

afterEach(() => vi.unstubAllGlobals())

describe('paymentLookupApi', () => {
    it('searches students on the server', async () => {
        const fetchMock = mockFetch({ content: [{ id: 's1' }], page: { totalElements: 1, totalPages: 1 } })

        const students = await searchStudents('tok', 'Aziza')

        expect(fetchMock.mock.calls[0][0]).toBe('/api/v1/student?page=0&size=15&search=Aziza')
        expect(students.map((student) => student.id)).toEqual(['s1'])
    })

    // Bir xil ismli boshqa o'quvchining hisobi aralashib ketmasin.
    it('keeps only the chosen student’s invoices', async () => {
        const fetchMock = mockFetch({
            content: [
                { id: 'i1', enrollmentDto: { id: 'e1', studentId: 's1' } },
                { id: 'i2', enrollmentDto: { id: 'e2', studentId: 's2' } },
            ],
            page: { totalElements: 2, totalPages: 1 },
        })

        const invoices = await fetchStudentInvoices('tok', {
            id: 's1',
            userDto: { fullName: 'Aziza', phone: '+998901112233' },
        })

        expect(fetchMock.mock.calls[0][0]).toBe('/api/v1/invoice?page=0&size=50&search=%2B998901112233')
        expect(invoices.map((invoice) => invoice.id)).toEqual(['i1'])
    })
})
