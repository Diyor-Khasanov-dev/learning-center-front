// LeadActionModal komponenti testlari — turli holatlarda (ENROLLED, REJECTED, CALL_LATER) forma xatti-harakatlarini tekshiradi
import { describe, expect, it, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '@/test/renderWithProviders'
import type { LeadDto } from '@/shared/types'
import { LeadActionModal } from './LeadActionModal'

const mockLead: LeadDto = {
    id: 'lead-123',
    fullName: 'Ali Valiyev',
    phone: '+998901234567',
    source: 'INSTAGRAM',
    status: 'NEW',
}

const mockGroupOptions = [
    { value: 'group-1', label: 'Guruh 1' },
    { value: 'group-2', label: 'Guruh 2' },
]

describe('LeadActionModal', () => {
    it('ENROLLED holatida guruh tanlanmaguncha Saqlash tugmasi faolsizlantiriladi va tanlangach onEnroll chaqiriladi', async () => {
        const onEnroll = vi.fn()

        renderWithProviders(
            <LeadActionModal
                lead={mockLead}
                status="ENROLLED"
                groupOptions={mockGroupOptions}
                isPending={false}
                onClose={vi.fn()}
                onEnroll={onEnroll}
                onReject={vi.fn()}
                onCallLater={vi.fn()}
            />
        )

        const saveButton = screen.getByRole('button', { name: /saqlash/i })
        expect(saveButton).toBeDisabled()

        const groupSelect = screen.getByRole('combobox', { name: /guruh/i })
        await userEvent.selectOptions(groupSelect, 'group-1')

        expect(saveButton).not.toBeDisabled()
        await userEvent.click(saveButton)

        expect(onEnroll).toHaveBeenCalledWith('group-1')
    })

    it('REJECTED holatida sabab va izoh bilan onReject chaqiriladi', async () => {
        const onReject = vi.fn()

        renderWithProviders(
            <LeadActionModal
                lead={mockLead}
                status="REJECTED"
                groupOptions={[]}
                isPending={false}
                onClose={vi.fn()}
                onEnroll={vi.fn()}
                onReject={onReject}
                onCallLater={vi.fn()}
            />
        )

        const noteInput = screen.getByRole('textbox', { name: /izoh/i })
        await userEvent.type(noteInput, 'Narxi qimmatlik qildi')

        const saveButton = screen.getByRole('button', { name: /saqlash/i })
        expect(saveButton).not.toBeDisabled()
        await userEvent.click(saveButton)

        expect(onReject).toHaveBeenCalledWith({
            reason: 'OTHER',
            note: 'Narxi qimmatlik qildi',
        })
    })

    it('CALL_LATER holatida vaqt tanlanmaguncha Saqlash tugmasi faolsizlantiriladi va vaqt tanlangach onCallLater chaqiriladi', async () => {
        const onCallLater = vi.fn()

        renderWithProviders(
            <LeadActionModal
                lead={mockLead}
                status="CALL_LATER"
                groupOptions={[]}
                isPending={false}
                onClose={vi.fn()}
                onEnroll={vi.fn()}
                onReject={vi.fn()}
                onCallLater={onCallLater}
            />
        )

        const saveButton = screen.getByRole('button', { name: /saqlash/i })
        expect(saveButton).toBeDisabled()

        const timeInput = screen.getByLabelText(/qo‘ng‘iroq vaqti/i)
        await userEvent.type(timeInput, '2026-10-10T10:00')

        expect(saveButton).not.toBeDisabled()
        await userEvent.click(saveButton)

        expect(onCallLater).toHaveBeenCalledWith('2026-10-10T10:00')
    })
})
