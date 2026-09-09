import {
    attendance,
    branches,
    fullGroup,
    groupLevels,
    groups,
    invoices,
    leads,
    lessons,
    organizations,
    students,
    teachers,
} from '../mockData'
import { ADMIN_PERMISSIONS } from '@/shared/types'
import type {
    AttendanceDto,
    BranchDto,
    GroupDto,
    GroupLevelDto,
    InvoiceDto,
    LeadDto,
    LessonDto,
    OrganizationDto,
    StudentDto,
    TeacherDto,
    UserDto,
} from '@/shared/types'

export type Row = Record<string, unknown> & { id: string }

/** `GET /auth/me` javobi — demo foydalanuvchisi. */
export const demoUser: UserDto = {
    id: 'u-demo',
    // Sozlamalardagi markaz bloki shu filialni yuklaydi.
    branchId: 'b1',
    fullName: 'Demo Foydalanuvchi',
    phone: '+998 93 100 10 01',
    birthDate: '1995-06-15',
    imageUrl: undefined,
    role: 'ADMINISTRATOR',
}

export const db = {
    students: [...students] as StudentDto[],
    teachers: [...teachers] as TeacherDto[],
    groups: [...groups] as GroupDto[],
    lessons: [...lessons] as LessonDto[],
    attendance: [...attendance] as AttendanceDto[],
    invoices: [...invoices] as InvoiceDto[],
    organizations: [...organizations] as OrganizationDto[],
    branches: [...branches] as BranchDto[],
    groupLevels: [...groupLevels] as GroupLevelDto[],
    leads: [...leads] as LeadDto[],
}

export { fullGroup }

let installed = false

/** Joriy demo roli — `setDemoRole` orqali almashtiriladi. */
let currentRole = 'ADMINISTRATOR'

export function getDemoRole() {
    return currentRole
}

export function setDemoRole(role: string) {
    currentRole = role
}

export function isInstalled() {
    return installed
}

export function setInstalled(val: boolean) {
    installed = val
}

/** Testing helper: allows reinstalling mock in test runners. */
export function resetMockApiInstalledFlag() {
    installed = false
}

/**
 * Imzosiz, lekin to'g'ri tuzilgan JWT (ilova faqat payload'ni o'qiydi).
 *
 * `ADMINISTRATOR` uchun BARCHA ruxsatlar beriladi — demo cheklangan
 * administratorni emas, ilovaning to'liq imkoniyatini ko'rsatishi kerak.
 */
export function makeToken(role: string): string {
    const encode = (value: object) => {
        const bytes = new TextEncoder().encode(JSON.stringify(value))
        return btoa(String.fromCharCode(...bytes))
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '')
    }
    const permissions = role === 'ADMINISTRATOR' ? ADMIN_PERMISSIONS : undefined
    return `${encode({ alg: 'none' })}.${encode({ role, permissions, sub: 'demo', name: 'Demo user' })}.demo`
}

export function json(body: unknown, status = 200): Response {
    return new Response(JSON.stringify(body), {
        status,
        headers: { 'Content-Type': 'application/json' },
    })
}

/**
 * Tanasiz javob (`DELETE` uchun).
 *
 * `new Response(body, { status: 204 })` — brauzer buni rad etadi:
 * "Response with null body status cannot have body". Backend ham
 * `noContent()` qaytaradi, ya'ni shakl ham to'g'ri bo'ladi.
 */
export function noContent(): Response {
    return new Response(null, { status: 204 })
}

/** Spring Data `Page` ko'rinishida qaytaradi. */
export function page<T extends Row>(rows: T[], url: URL) {
    const size = Number(url.searchParams.get('size') ?? 10)
    const index = Number(url.searchParams.get('page') ?? 0)
    const search = (url.searchParams.get('search') ?? '').toLowerCase()

    const filtered = search
        ? rows.filter((row) => JSON.stringify(row).toLowerCase().includes(search))
        : rows

    return json({
        content: filtered.slice(index * size, index * size + size),
        totalPages: Math.max(1, Math.ceil(filtered.length / size)),
        totalElements: filtered.length,
    })
}

export function nextId(prefix: string) {
    return `${prefix}${Math.random().toString(36).slice(2, 8)}`
}

/**
 * Create/Update DTO'sini o'qish DTO'siga qaytaradi (backend shuni qiladi):
 * `{ user: {...} }` → `{ userDto: {...} }`, `teacherId` → to'liq o'qituvchi.
 */
export function flatten(body: Record<string, unknown>): Record<string, unknown> {
    const result: Record<string, unknown> = { ...body }

    const user = (body.userCreateDto ?? body.user) as Record<string, unknown> | undefined
    if (user) {
        result.userDto = user
        delete result.user
        delete result.userCreateDto
    }

    if (typeof body.teacherId === 'string') {
        result.teacher = db.teachers.find((teacher) => teacher.id === body.teacherId)
        delete result.teacherId
    }

    if (body.timeTable) result.timeTable = body.timeTable

    return result
}
