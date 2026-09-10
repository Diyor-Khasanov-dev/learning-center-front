import { describe, expect, it, vi } from 'vitest'
import { screen, within } from '@testing-library/react'
import { renderWithProviders } from '@/test/renderWithProviders'
import { InvoiceTable } from './InvoiceTable'
import type { InvoiceDto } from '@/shared/types'

const invoices: InvoiceDto[] = [
    {
        id: 'i1',
        invoiceNumber: 'INV-001',
        amount: 450000,
        issuedAt: '2026-07-01T09:00:00',
        paymentStatus: 'OVERDUE',
        enrollmentDto: { id: 'e1', studentId: 'st-1', studentFullName: 'Aziza Karimova' },
    },
]

describe('InvoiceTable', () => {
    it('o‘quvchi ismini javobning o‘zidan oladi', () => {
        renderWithProviders(<InvoiceTable invoices={invoices} isLoading={false} onDelete={vi.fn()} />)

        const row = screen.getByRole('row', { name: /INV-001/ })
        expect(within(row).getByText('Aziza Karimova')).toBeInTheDocument()
    })

    it('hisob holatini ko‘rsatadi', () => {
        renderWithProviders(<InvoiceTable invoices={invoices} isLoading={false} onDelete={vi.fn()} />)

        const row = screen.getByRole('row', { name: /INV-001/ })
        expect(within(row).getByText(/muddati/i)).toBeInTheDocument()
    })

    // Ro'yxat so'rovida ism keladi, lekin bitta hisobni olganda kelmasligi mumkin.
    it('ism bo‘lmasa chiziqcha qo‘yadi', () => {
        const withoutName: InvoiceDto[] = [{ ...invoices[0], enrollmentDto: { id: 'e1', studentId: 'st-1' } }]
        renderWithProviders(<InvoiceTable invoices={withoutName} isLoading={false} onDelete={vi.fn()} />)

        const row = screen.getByRole('row', { name: /INV-001/ })
        expect(within(row).getAllByText('—').length).toBeGreaterThan(0)
    })
})
