import { apiFetch } from '@/shared/api'
import type { BranchDto, GroupOverviewDto, Page, TeacherDto, UserDto } from '@/shared/types'
import type { AdminRow } from '../types'

export interface EntityListParams {
    page: number
    size: number
    search?: string
    status?: string
    /** `apiFetch` query qurishda umumiy shakl kutadi. */
    [param: string]: string | number | undefined
}

export function fetchEntityPage(endpoint: string, token: string, params: EntityListParams) {
    return apiFetch<Page<AdminRow>>(endpoint, { token, params })
}

/**
 * Ba'zi kontrollerlar sof son (`5`), ba'zilari obyekt (`{ count: 5 }`)
 * qaytaradi — ikkalasini ham qabul qilamiz.
 * (Backendda bir xillashtirilsa, shu funksiya bir qatorga qisqaradi.)
 */
export async function fetchEntityCount(endpoint: string, token: string): Promise<number | null> {
    const raw = await apiFetch<number | { count?: number }>(`${endpoint}/count`, { token })
    const value = typeof raw === 'object' && raw !== null ? raw.count : raw
    return value === undefined || value === null ? null : Number(value)
}

export function createEntity(endpoint: string, token: string, body: unknown) {
    return apiFetch(endpoint, { method: 'POST', token, body })
}

export function updateEntity(endpoint: string, token: string, id: string, body: unknown) {
    return apiFetch(`${endpoint}/${id}`, { method: 'PUT', token, body })
}

export function deleteEntity(endpoint: string, token: string, id: string) {
    return apiFetch(`${endpoint}/${id}`, { method: 'DELETE', token })
}

/** Guruh formasidagi "Teacher" ro'yxati uchun. */
export async function fetchTeacherOptions(token: string) {
    const data = await apiFetch<Page<TeacherDto>>('/teacher', { token, params: { page: 0, size: 200 } })
    return (data?.content ?? []).map((teacher) => ({
        value: teacher.id,
        label: teacher.userDto?.fullName || teacher.id,
    }))
}

/** Guruh yaratishda bo'sh o'qituvchilar ro'yxati uchun. */
export async function fetchFreeTeacherOptions(
    token: string,
    dayType?: string,
    startTime?: string,
    endTime?: string
) {
    const data = await apiFetch<{ id: string; name?: string }[]>('/teacher/filter-for-group-create', {
        token,
        params: { dayType, startTime, endTime },
    })
    return (data ?? []).map((teacher) => ({
        value: teacher.id,
        label: teacher.name || teacher.id,
    }))
}

/**
 * Dars formasidagi "Guruh" ro'yxati uchun.
 *
 * Ataylab `/group/groups` EMAS: u kirgan foydalanuvchining o'z guruhlarini
 * qaytaradi (backendda `authenticateAndGetId()` bilan filtrlangan), ya'ni
 * administratorda ro'yxat bo'sh chiqadi. Sahifalangan `/group` esa hammasini
 * beradi.
 */
export async function fetchGroupOptions(token: string) {
    const data = await apiFetch<Page<GroupOverviewDto>>('/group', { token, params: { page: 0, size: 200 } })
    return (data?.content ?? []).map((group) => ({
        value: group.id,
        label: group.name || group.id,
    }))
}

/**
 * Yaratish formasidagi "Filial" tanlagichi uchun.
 *
 * O'quvchi, o'qituvchi va administrator yaratishda filial tanlanadi
 * (`UserCreateDto.branchId`). Tahrirlashda yo'q — `UserUpdateDto` da bu
 * maydon umuman yo'q, backend uni almashtirishga ruxsat bermaydi.
 */
export async function fetchBranchOptions(token: string) {
    const data = await apiFetch<Page<BranchDto>>('/branch', { token, params: { page: 0, size: 200 } })
    return (data?.content ?? []).map((branch) => ({
        value: branch.id,
        label: branch.name || branch.id,
    }))
}

/**
 * Telefon bo'yicha mavjud foydalanuvchi.
 *
 * Bir odam bir nechta markazda o'qishi/ishlashi mumkin, shuning uchun yangi
 * yozuv ochishdan oldin u tizimda bormi — shu tekshiriladi. Topilmasa
 * backend bo'sh tana qaytaradi, `apiFetch` esa uni `null` qiladi.
 */
export function fetchUserByPhone(token: string, phone: string) {
    return apiFetch<UserDto>('/user/phone', { token, params: { phone } })
}
