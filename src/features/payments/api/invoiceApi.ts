import { apiFetch } from '@/shared/api'
import type { GroupOverviewDto, InvoiceDto, InvoiceStatus, Page } from '@/shared/types'

const ENDPOINT = '/invoice'

export interface InvoiceListParams {
    page: number
    size: number
    search?: string
    status?: InvoiceStatus | ''
    /** `LocalDateTime` kutiladi — "yyyy-MM-ddTHH:mm:ss". */
    from?: string
    to?: string
    [param: string]: string | number | undefined
}

export function fetchInvoices(token: string, params: InvoiceListParams) {
    return apiFetch<Page<InvoiceDto>>(ENDPOINT, { token, params })
}

/**
 * Guruhga shu oy uchun hisob yaratadi.
 *
 * Odatda hisoblar oylik darslar tugagach AVTOMATIK yaratiladi. Bu tugma
 * o'sha avtomatika ishlamay qolgan holat uchun — administrator qo'lda
 * ishga tushiradi.
 *
 * Backend guruhdagi har bir o'quvchiga bittadan hisob yozadi va javob
 * tanasini qaytarmaydi (204). Ikkinchi marta chaqirilsa `409` beradi —
 * chaqiruvchi shuni ushlab tushunarli xabar ko'rsatadi.
 */
export function createGroupInvoice(token: string, groupId: string) {
    return apiFetch<void>(`${ENDPOINT}/${groupId}`, { method: 'POST', token })
}

/**
 * Hisobni o'chirish.
 *
 * Qolgan yozish amallari backenddan olib tashlandi: `PUT /invoice/{id}`
 * (holatni o'zgartirish) va `POST /invoice/return` (pul qaytarish) endi
 * yo'q. Hisob 12-darsdan keyin avtomatik yaratiladi, pul qaytarish esa
 * `REFUND` turidagi tranzaksiya bo'lib yoziladi.
 */
export function deleteInvoice(token: string, id: string) {
    return apiFetch(`${ENDPOINT}/${id}`, { method: 'DELETE', token })
}

/** Hisob yaratish tugmasidagi guruh tanlagichi. */
export async function fetchGroupOptions(token: string) {
    const data = await apiFetch<Page<GroupOverviewDto>>('/group', { token, params: { page: 0, size: 200 } })
    return (data?.content ?? []).map((group) => ({
        value: group.id,
        label: group.name || group.id,
    }))
}
