import { handleAnalytics } from './analytics'
import { handleAttendance } from './attendance'
import { handleAuth } from './auth'
import { handleCrud } from './crud'
import { handleEnrollments } from './enrollments'
import { handleGroupLevels } from './groupLevels'
import { handleImages } from './images'
import { handleInvoices } from './invoices'
import { handleLeads } from './leads'
import { isInstalled, resetMockApiInstalledFlag, setDemoRole, setInstalled } from './state'
import { handleStudents } from './students'
import { handleSuperAdmin } from './superAdmin'
import { handleTeacher } from './teacher'

export { setDemoRole, resetMockApiInstalledFlag }

/** `fetch` ni bir marta almashtiradi (qayta chaqirilsa hech narsa qilmaydi). */
export function installMockApi() {
    if (isInstalled()) return
    setInstalled(true)

    const fetchImpl = typeof window !== 'undefined' ? window.fetch : globalThis.fetch
    const original = fetchImpl.bind(typeof window !== 'undefined' ? window : globalThis)

    const mockFetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
        const raw = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url
        if (!raw.includes('/api/v1/')) return original(input as RequestInfo, init)

        const origin =
            typeof window !== 'undefined' && window.location && window.location.origin && window.location.origin !== 'null'
                ? window.location.origin
                : 'http://localhost'
        const url = new URL(raw, origin)
        const path = url.pathname.replace('/api/v1', '')
        const method = (init?.method ?? 'GET').toUpperCase()
        let body: Record<string, unknown> = {}
        if (init?.body && typeof init.body === 'string') {
            try {
                body = JSON.parse(init.body) as Record<string, unknown>
            } catch {
                body = {}
            }
        }

        // Haqiqiy tarmoqqa o'xshasin — spinner'lar ko'rinib qolsin.
        await new Promise((resolve) => setTimeout(resolve, 180))

        const authRes = handleAuth(path)
        if (authRes) return authRes

        const enrollmentsRes = handleEnrollments(path, method, url, body)
        if (enrollmentsRes) return enrollmentsRes

        const studentsRes = handleStudents(path, method, url)
        if (studentsRes) return studentsRes

        const teacherRes = handleTeacher(path, url)
        if (teacherRes) return teacherRes

        const attendanceRes = handleAttendance(path, method, body)
        if (attendanceRes) return attendanceRes

        const leadsRes = handleLeads(path, method, url, body)
        if (leadsRes) return leadsRes

        const groupLevelsRes = handleGroupLevels(path, method, body)
        if (groupLevelsRes) return groupLevelsRes

        const analyticsRes = handleAnalytics(path, method)
        if (analyticsRes) return analyticsRes

        const superAdminRes = handleSuperAdmin(path, method, url, body)
        if (superAdminRes) return superAdminRes

        const imagesRes = handleImages(path, method, url)
        if (imagesRes) return imagesRes

        const invoicesRes = handleInvoices(path, method, url, body)
        if (invoicesRes) return invoicesRes

        const crudRes = handleCrud(path, method, url, body)
        if (crudRes) return crudRes

        return new Response(JSON.stringify({ message: `No mock for ${method} ${path}` }), {
            status: 405,
            headers: { 'Content-Type': 'application/json' },
        })
    }

    if (typeof window !== 'undefined') window.fetch = mockFetch
    if (typeof globalThis !== 'undefined') globalThis.fetch = mockFetch
}
