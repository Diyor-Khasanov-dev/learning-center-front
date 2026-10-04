import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '@/test/renderWithProviders'
import type { TransactionType } from '@/shared/types'
import { PaymentFormModal } from './PaymentFormModal'

const student = { id: 'st-1', userDto: { fullName: 'Aziza Karimova', phone: '+998901112233' } }
const invoices = [
    { id: 'inv-old', invoiceNumber: 'INV-001', amount: 450000, issuedAt: '2026-08-01T10:00:00', paymentStatus: 'PENDING', enrollmentDto: { id: 'e1', studentId: 'st-1' } },
    { id: 'inv-new', invoiceNumber: 'INV-002', amount: 450000, issuedAt: '2026-09-01T10:00:00', paymentStatus: 'OVERDUE', enrollmentDto: { id: 'e2', studentId: 'st-1' } },
    { id: 'inv-paid', invoiceNumber: 'INV-003', amount: 450000, issuedAt: '2026-10-01T10:00:00', paymentStatus: 'PAID', enrollmentDto: { id: 'e3', studentId: 'st-1' } },
]

function page(content: unknown[]) {
    return JSON.stringify({ content, page: { totalElements: content.length, totalPages: 1 } })
}

beforeEach(() => {
    vi.stubGlobal(
        'fetch',
        vi.fn((url: string) =>
            Promise.resolve({
                ok: true,
                status: 200,
                text: () => Promise.resolve(url.includes('/student') ? page([student]) : page(invoices)),
            })
        )
    )
})

afterEach(() => vi.unstubAllGlobals())

function render(type: TransactionType) {
    const onSubmit = vi.fn()
    renderWithProviders(
        <PaymentFormModal token="tok" type={type} isSaving={false} onSubmit={onSubmit} onClose={vi.fn()} />
    )
    return onSubmit
}

async function pickStudent() {
    await userEvent.type(screen.getByRole('searchbox', { name: /o.quvchini qidirish/i }), 'Aziza')
    await userEvent.click(await screen.findByRole('button', { name: /Aziza Karimova/ }))
}

describe('PaymentFormModal', () => {
    it('finds the student, preselects the newest unpaid invoice and sends the payment', async () => {
        const onSubmit = render('PAID')

        await pickStudent()

        // Eng yangisi to'langan — backend uni rad etadi, shuning uchun undan oldingisi.
        expect(await screen.findByRole('radio', { name: /INV-002/ })).toBeChecked()

        const amount = screen.getByLabelText(/summa/i)
        await userEvent.type(amount, '889000')
        expect(amount).toHaveValue('889 000')

        await userEvent.click(screen.getByRole('button', { name: /saqlash/i }))

        expect(onSubmit).toHaveBeenCalledWith({
            type: 'PAID',
            amount: 889000,
            studentId: 'st-1',
            invoiceId: 'inv-new',
            note: '',
        })
    })

    it('lets the user choose another invoice', async () => {
        const onSubmit = render('PAID')
        await pickStudent()

        await userEvent.click(await screen.findByRole('radio', { name: /INV-001/ }))
        await userEvent.type(screen.getByLabelText(/summa/i), '1000')
        await userEvent.click(screen.getByRole('button', { name: /saqlash/i }))

        expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ invoiceId: 'inv-old', amount: 1000 }))
    })

    it('requires a reason for a refund', async () => {
        const onSubmit = render('REFUND')
        await pickStudent()

        expect(await screen.findByRole('radio', { name: /INV-003/ })).toBeChecked()
        await userEvent.type(screen.getByLabelText(/summa/i), '100000')
        expect(screen.getByRole('button', { name: /saqlash/i })).toBeDisabled()

        await userEvent.type(screen.getByLabelText(/qaytarish sababi/i), 'O‘qishni to‘xtatdi')
        await userEvent.click(screen.getByRole('button', { name: /saqlash/i }))

        expect(onSubmit).toHaveBeenCalledWith(
            expect.objectContaining({ type: 'REFUND', amount: 100000, invoiceId: 'inv-paid', note: 'O‘qishni to‘xtatdi' })
        )
    })
})
