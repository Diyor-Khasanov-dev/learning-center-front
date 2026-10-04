import { apiFetch } from '@/shared/api'
import type { InvoiceDto, Page, StudentDto } from '@/shared/types'

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
 * Tanlangan o'quvchining hisoblari.
 *
 * Backendda "o'quvchi bo'yicha hisoblar" endpointi yo'q. `GET /invoice`
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
