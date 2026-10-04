import { describe, expect, it, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '@/test/renderWithProviders'
import type { PlanDto } from '@/shared/types'
import { PlanFormModal } from './PlanFormModal'

const plan: PlanDto = {
    id: 'p1',
    code: 'MAX',
    name: 'To‘liq',
    description: 'Barcha imkoniyatlar',
    price: 500000,
    currency: 'UZS',
    durationMonths: 1,
    sortOrder: 7,
    active: true,
    limits: { MAX_STUDENTS: 5000, MAX_TEACHERS: 50, MAX_GROUPS: 500, MAX_BRANCHES: 10, MAX_USERS: 5500 },
}

function render(current: PlanDto | null) {
    const onSubmit = vi.fn()
    renderWithProviders(
        <PlanFormModal plan={current} isSaving={false} error={null} onSubmit={onSubmit} onClose={vi.fn()} />
    )
    return onSubmit
}

describe('PlanFormModal', () => {
    // `PlanUpdateDto.active` `@NotNull` — ilgari "active: must not be null" xatosi chiqardi.
    it('sends active when editing', async () => {
        const onSubmit = render(plan)

        await userEvent.click(screen.getByRole('checkbox', { name: /faol/i }))
        await userEvent.click(screen.getByRole('button', { name: /saqlash/i }))

        expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ active: false, sortOrder: 7 }))
    })

    it('does not send active when creating and requires every field', async () => {
        const onSubmit = render(null)

        expect(screen.queryByRole('checkbox')).not.toBeInTheDocument()
        expect(screen.getByLabelText(/izoh/i)).toBeRequired()
        expect(screen.getByLabelText(/tartib raqami/i)).toBeRequired()
        expect(screen.getByLabelText(/o.quvchi/i)).toBeRequired()

        await userEvent.click(screen.getByRole('button', { name: /saqlash/i }))
        expect(onSubmit).not.toHaveBeenCalled()
    })
})
