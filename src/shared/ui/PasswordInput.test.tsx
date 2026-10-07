import { describe, expect, it } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '@/test/renderWithProviders'
import { PasswordInput } from './PasswordInput'

describe('PasswordInput', () => {
    it('shows and hides the typed password', async () => {
        renderWithProviders(<PasswordInput aria-label="Parol" defaultValue="secret" />)
        const input = screen.getByLabelText('Parol')
        expect(input).toHaveAttribute('type', 'password')

        await userEvent.click(screen.getByRole('button', { name: /parolni ko.rsatish/i }))
        expect(input).toHaveAttribute('type', 'text')

        await userEvent.click(screen.getByRole('button', { name: /parolni yashirish/i }))
        expect(input).toHaveAttribute('type', 'password')
    })
})
