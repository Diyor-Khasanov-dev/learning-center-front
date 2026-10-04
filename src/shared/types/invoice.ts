import type { StudentDto } from './student'

export const INVOICE_STATUSES = ['PAID', 'PENDING', 'OVERDUE'] as const
export type InvoiceStatus = (typeof INVOICE_STATUSES)[number]

/** `EnrollmentDto` — o'quvchining bitta guruhdagi yozuvi. */
export interface EnrollmentDto {
    id: string
    studentId?: string
    /** Ro'yxat so'rovida keladi; bitta hisobni olganda bo'sh bo'lishi mumkin. */
    studentFullName?: string
    groupId?: string
    reason?: string
}

/**
 * `InvoiceDto` — to'lov hisobi.
 *
 * Backend to'lov modelini almashtirdi: hisob endi QOTIB turadi (12-darsdan
 * keyin avtomatik yaratiladi va summasi o'zgarmaydi), to'lovlar esa alohida
 * `TransactionDto` yozuvlari bo'lib unga bog'lanadi.
 *
 * Shu sababli eski `student` va `type` maydonlari yo'q: o'quvchi endi
 * `enrollmentDto` ichida, holat esa `paymentStatus` deb ataladi (entity'dagi
 * nom bilan bir xil, eski `status` emas).
 *
 * `amount` `BigDecimal` — JSON'da son bo'lib keladi, lekin tiyin/so'm
 * aniqligini yo'qotmaslik uchun biz uni HISOBLASHDA ishlatmaymiz, faqat
 * ko'rsatamiz.
 */
export interface InvoiceDto {
    id: string
    invoiceNumber?: string
    amount?: number
    /** `LocalDateTime` — "yyyy-MM-ddTHH:mm:ss". */
    issuedAt?: string
    enrollmentDto?: EnrollmentDto
    paymentStatus?: InvoiceStatus
}

/**
 * To'lov turi.
 *
 * Backend enum'i: `PAID`, `REFUND`, `MONTHLY_FEE`, `CORRECTION`
 * (`TransactionType.java`). Ilgari `RETURNED` edi — backend uni `REFUND`
 * ga almashtirdi (sxemadagi `@Schema` izohi hali eski nomni ko'rsatadi,
 * lekin Jackson enum nomini kutadi: `RETURNED` yuborilsa 400).
 *
 * Mijoz faqat `PAID` va `REFUND` yozadi; `MONTHLY_FEE` ni server o'zi
 * qo'yadi, `CORRECTION` uchun ekran yo'q. Shuning uchun yozish va o'qish
 * uchun alohida tiplar.
 */
export const TRANSACTION_TYPES = ['PAID', 'REFUND'] as const
export type TransactionType = (typeof TRANSACTION_TYPES)[number]
export type TransactionTypeRead = TransactionType | 'MONTHLY_FEE' | 'CORRECTION'

/** `TransactionDto` — bitta to'lov harakati (to'ladi yoki qaytarib olindi). */
export interface TransactionDto {
    id: string
    type?: TransactionTypeRead
    amount?: number
    /** Ixtiyoriy izoh — qaytarishda sababi shu yerga yoziladi. */
    note?: string
    invoice?: InvoiceDto
    /** Backend buni `user` deb ataydi, lekin ichida `StudentDto` turadi. */
    user?: StudentDto
    /** `LocalDateTime` — "yyyy-MM-ddTHH:mm:ss". */
    createdAt?: string
}
