import type { SimpleInvoiceDto, TransactionType } from '@/shared/types'

/** Yangi hisob birinchi: `issuedAt` "yyyy-MM-ddTHH:mm:ss" — satr solishtirish yetadi. */
export function sortInvoicesNewestFirst<T extends SimpleInvoiceDto>(invoices: T[]): T[] {
    return [...invoices].sort((a, b) => (b.issuedAt ?? '').localeCompare(a.issuedAt ?? ''))
}

/**
 * Forma ochilganda avtomatik tanlanadigan hisob.
 *
 * To'lovda — eng so'nggi TO'LANMAGAN hisob: backend to'langan hisobga
 * to'lov yozishni rad etadi (`INVOICE_ALREADY_PAID`), ya'ni uni tanlash
 * faqat xato beradi. Hammasi to'langan bo'lsa — eng so'nggisi, xatoni
 * backend aytadi. Qaytarishda esa pul odatda to'langan hisobdan qaytadi,
 * shuning uchun shunchaki eng so'nggisi.
 */
export function defaultInvoiceId(invoices: SimpleInvoiceDto[], type: TransactionType): string {
    const sorted = sortInvoicesNewestFirst(invoices)
    if (type === 'PAID') {
        const unpaid = sorted.find((invoice) => invoice.paymentStatus !== 'PAID')
        if (unpaid) return unpaid.id
    }
    return sorted[0]?.id ?? ''
}
