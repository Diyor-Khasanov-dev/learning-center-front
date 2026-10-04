import { describe, expect, it, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '@/test/renderWithProviders'
import { OrganizationFormModal } from './OrganizationFormModal'

describe('OrganizationFormModal', () => {
    it('requires name, a full phone number and days before debt', async () => {
        const onSubmit = vi.fn()
        renderWithProviders(
            <OrganizationFormModal isSaving={false} error={null} onSubmit={onSubmit} onClose={vi.fn()} />
        )

        expect(screen.getByLabelText(/qarzgacha kun/i)).toBeRequired()
        await userEvent.type(screen.getByLabelText(/tashkilot nomi/i), 'Ilm markazi')
        await userEvent.type(screen.getByLabelText(/qarzgacha kun/i), '5')

        // Faqat "+998" — saqlab bo'lmaydi.
        expect(screen.getByRole('button', { name: /saqlash/i })).toBeDisabled()

        await userEvent.type(screen.getByLabelText(/telefon/i), '901234567')
        await userEvent.click(screen.getByRole('button', { name: /saqlash/i }))

        expect(onSubmit).toHaveBeenCalledWith(
            expect.objectContaining({ name: 'Ilm markazi', phone: '+998901234567', daysBeforeDebt: 5 })
        )
    })
})
