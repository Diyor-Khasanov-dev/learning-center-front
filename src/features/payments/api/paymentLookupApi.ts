import { ApiError, apiFetch } from '@/shared/api'
import type { InvoiceDto, Page, SimpleInvoiceDto, StudentDto } from '@/shared/types'

/** Natijalar ro'yxati qisqa bo'lsin — kerakli odam topilmasa, ism aniqlashtiriladi. */
export const STUDENT_SEARCH_SIZE = 15

/**
 * To'lov formasidagi o'quvchi qidiruvi.
 *
 * Ilgari forma 200 ta o'quvchini bitta `<select>` ga yuklardi — 300–400
 * o'quvchili markazda kerakli odamni ro'yxatdan topib bo'lmaydi, 200 dan
 * keyingilari esa umuman chiqmasdi. Endi qidiruv serverda: `GET /student`
 * `search` ni ism bo'yicha qidiradi (telefon bo'yicha hali qidirmaydi).
 */
export async function searchStudents(token: string, search: string): Promise<StudentDto[]> {
    const data = await apiFetch<Page<StudentDto>>('/student', {
        token,
        params: { page: 0, size: STUDENT_SEARCH_SIZE, search },
    })
    return data?.content ?? []
}

/**
 * To'lov uchun: o'quvchining TO'LANMAGAN hisoblari.
 *
 * `GET /invoice/student/{id}` to'lanmagan hisoblarni qaytaradi. Hammasi
 * to'langan (yoki hisob umuman yo'q) bo'lsa backend `409 AlreadyExists`
 * beradi — bu xato emas, oddiy holat, shuning uchun bo'sh ro'yxat
 * qaytaramiz va forma o'z matnini ko'rsatadi. Backend xabar matnini
 * bermaydi (`messages*.properties` yo'q — "MessageKey not found: …").
 */
export async function fetchUnpaidInvoices(token: string, studentId: string): Promise<SimpleInvoiceDto[]> {
    try {
        return (await apiFetch<SimpleInvoiceDto[]>(`/invoice/student/${studentId}`, { token })) ?? []
    } catch (error) {
        if (error instanceof ApiError && error.status === 409) return []
        throw error
    }
}

/**
 * Pul qaytarish uchun: o'quvchining BARCHA hisoblari.
 *
 * Yuqoridagi endpoint to'langan hisoblarni bermaydi, pul esa odatda aynan
 * to'langan hisobdan qaytariladi. "O'quvchi bo'yicha barcha hisoblar"
 * endpointi yo'q. `GET /invoice`
 * `search` ni ism, telefon, guruh nomi va hisob raqami bo'yicha qidiradi —
 * telefon bilan qidirib, natijani `studentId` bo'yicha aniq filtrlaymiz
 * (bir xil ismli ikki o'quvchi bo'lishi mumkin). Telefon bo'lmasa — ism.
 */
export async function fetchStudentInvoices(token: string, student: StudentDto): Promise<InvoiceDto[]> {
    const search = student.userDto?.phone || student.userDto?.fullName || ''
    const data = await apiFetch<Page<InvoiceDto>>('/invoice', {
        token,
        params: { page: 0, size: 50, search },
    })
    return (data?.content ?? []).filter((invoice) => invoice.enrollmentDto?.studentId === student.id)
}
