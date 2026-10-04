import { apiFetch } from '@/shared/api'
import type { Page, TransactionDto, TransactionType } from '@/shared/types'

const ENDPOINT = '/transaction'

export interface TransactionListParams {
    page: number
    size: number
    search?: string
    [param: string]: string | number | undefined
}

export function fetchTransactions(token: string, params: TransactionListParams) {
    return apiFetch<Page<TransactionDto>>(ENDPOINT, { token, params })
}

export interface CreateTransactionPayload {
    type: TransactionType
    amount: number
    studentId: string
    /** Backendda `@NotNull` — forma uni har doim tanlab yuboradi. */
    invoiceId: string
    note?: string
}

/**
 * To'lov yozuvini yaratadi.
 *
 * Hisob (`invoiceId`) endi forma tomonidan tanlanadi: backend uni
 * `@NotNull` qilgan, yubormasak 400.
 *
 * Summaning ISHORASINI mijoz qo'yadi. Backend uni turga qarab
 * o'zgartirmaydi — `balance = balance + amount` deb shundoq qo'shadi.
 * Shuning uchun pul qaytarilganda manfiy son yuboriladi, aks holda qarz
 * kamayish o'rniga ko'payib ketadi. Backendning o'zi ham ichkarida
 * shunday qiladi: oylik to'lov `monthlyFee.negate()` bilan yoziladi.
 */
export function createTransaction(token: string, body: CreateTransactionPayload) {
    const signedAmount = body.type === 'REFUND' ? -Math.abs(body.amount) : Math.abs(body.amount)
    const note = body.note?.trim() || undefined
    return apiFetch<TransactionDto>(ENDPOINT, {
        method: 'POST',
        token,
        body: { ...body, amount: signedAmount, note },
    })
}

export function deleteTransaction(token: string, id: string) {
    return apiFetch(`${ENDPOINT}/${id}`, { method: 'DELETE', token })
}
