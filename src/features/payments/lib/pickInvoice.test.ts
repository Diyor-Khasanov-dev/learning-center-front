import { describe, expect, it } from 'vitest'
import type { InvoiceDto } from '@/shared/types'
import { defaultInvoiceId, sortInvoicesNewestFirst } from './pickInvoice'

const invoices: InvoiceDto[] = [
    { id: 'aug', issuedAt: '2026-08-01T10:00:00', paymentStatus: 'PENDING' },
    { id: 'oct', issuedAt: '2026-10-01T10:00:00', paymentStatus: 'PAID' },
    { id: 'sep', issuedAt: '2026-09-01T10:00:00', paymentStatus: 'OVERDUE' },
]

describe('pickInvoice', () => {
    it('sorts newest first', () => {
        expect(sortInvoicesNewestFirst(invoices).map((invoice) => invoice.id)).toEqual(['oct', 'sep', 'aug'])
    })

    it('picks the newest unpaid invoice for a payment', () => {
        expect(defaultInvoiceId(invoices, 'PAID')).toBe('sep')
    })

    it('falls back to the newest invoice when all are paid', () => {
        const paid = invoices.map((invoice) => ({ ...invoice, paymentStatus: 'PAID' as const }))
        expect(defaultInvoiceId(paid, 'PAID')).toBe('oct')
    })

    it('picks the newest invoice for a refund', () => {
        expect(defaultInvoiceId(invoices, 'REFUND')).toBe('oct')
    })

    it('returns empty when the student has no invoices', () => {
        expect(defaultInvoiceId([], 'PAID')).toBe('')
    })
})
