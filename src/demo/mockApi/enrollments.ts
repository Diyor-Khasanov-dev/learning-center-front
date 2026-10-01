import { groupRoster } from '../mockData'
import { json, noContent, pagedModel } from './state'

export function handleEnrollments(
    path: string,
    method: string,
    url: URL,
    body: Record<string, unknown>
): Response | null {
    if (path === '/enrollments' && method === 'GET') {
        const groupId = url.searchParams.get('groupId') ?? ''
        const ids = groupRoster[groupId] ?? []
        // Enrollment id si demo'da guruh+o'quvchidan yasaladi —
        // haqiqiy backendda u alohida yozuvning id si.
        const content = ids.map((studentId) => ({ id: `e-${groupId}-${studentId}`, studentId, groupId }))
        return json(pagedModel(content, content.length))
    }
    if (path === '/enrollments' && method === 'POST') {
        const groupId = String(body.groupId)
        const studentId = String(body.studentId)
        groupRoster[groupId] = [...(groupRoster[groupId] ?? []), studentId]
        return json({ id: `e-${groupId}-${studentId}`, studentId, groupId })
    }
    if (path.startsWith('/enrollments/') && method === 'DELETE') {
        // `e-<groupId>-<studentId>` ni teskari yechamiz.
        const [, groupId, studentId] = path.split('/')[2].split('-')
        groupRoster[groupId] = (groupRoster[groupId] ?? []).filter((id) => id !== studentId)
        return noContent()
    }
    return null
}
