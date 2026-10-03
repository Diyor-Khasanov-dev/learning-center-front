import type { LeadDto, LeadStatus } from '@/shared/types'
import { db, json, nextId, noContent, page, type Row } from './state'

export function handleLeads(
    path: string,
    method: string,
    url: URL,
    body: Record<string, unknown>
): Response | null {
    if (path === '/leads' && method === 'GET') {
        const status = url.searchParams.get('status')
        const rows = status
            ? db.leads.filter((lead) => lead.status === status)
            : db.leads
        return page(rows as unknown as Row[], url)
    }
    if (path === '/leads' && method === 'POST') {
        const level = db.groupLevels.find((item) => item.id === String(body.preferredCourseId))
        const newLead: LeadDto = {
            id: nextId('ld'),
            fullName: String(body.fullName ?? ''),
            phone: String(body.phone ?? ''),
            status: 'NEW',
            source: body.source as LeadDto['source'],
            preferredCourse: level,
            createdAt: new Date().toISOString(),
        }
        db.leads = [newLead, ...db.leads]
        return json(newLead)
    }
    if (path.startsWith('/leads/') && method === 'PUT') {
        const id = path.slice('/leads/'.length)
        const level = body.preferredCourseId
            ? db.groupLevels.find((item) => item.id === String(body.preferredCourseId))
            : undefined
        db.leads = db.leads.map((lead) => {
            if (lead.id !== id) return lead
            return {
                ...lead,
                fullName: body.fullName !== undefined ? String(body.fullName) : lead.fullName,
                phone: body.phone !== undefined ? String(body.phone) : lead.phone,
                status: (body.status as LeadStatus) ?? lead.status,
                source: body.source ? (body.source as LeadDto['source']) : lead.source,
                preferredCourse: level ?? lead.preferredCourse,
                callAt: body.callAt !== undefined ? String(body.callAt) : lead.callAt,
                updatedAt: new Date().toISOString(),
            }
        })
        const updated = db.leads.find((lead) => lead.id === id)
        return updated ? json(updated) : json({ message: 'Lead not found' }, 404)
    }
    if (path.startsWith('/leads/') && path.endsWith('/enroll') && method === 'POST') {
        const id = path.slice('/leads/'.length, -'/enroll'.length)
        db.leads = db.leads.map((lead) => (lead.id === id ? { ...lead, status: 'ENROLLED' } : lead))
        const updated = db.leads.find((lead) => lead.id === id)
        return updated ? json(updated) : json({ message: 'Lead not found' }, 404)
    }
    if (path.startsWith('/leads/') && path.endsWith('/reject') && method === 'POST') {
        const id = path.slice('/leads/'.length, -'/reject'.length)
        db.leads = db.leads.map((lead) => (lead.id === id ? { ...lead, status: 'REJECTED' } : lead))
        const updated = db.leads.find((lead) => lead.id === id)
        return updated ? json(updated) : json({ message: 'Lead not found' }, 404)
    }
    if (path.startsWith('/leads/') && path.endsWith('/callLater') && method === 'PATCH') {
        const id = path.slice('/leads/'.length, -'/callLater'.length)
        const callAtParam = url.searchParams.get('callAt') ?? undefined
        db.leads = db.leads.map((lead) =>
            lead.id === id ? { ...lead, status: 'CALL_LATER', callAt: callAtParam } : lead
        )
        const updated = db.leads.find((lead) => lead.id === id)
        return updated ? json(updated) : json({ message: 'Lead not found' }, 404)
    }
    if (path.startsWith('/leads/') && method === 'DELETE') {
        const id = path.slice('/leads/'.length)
        db.leads = db.leads.filter((lead) => lead.id !== id)
        return noContent()
    }
    return null
}
