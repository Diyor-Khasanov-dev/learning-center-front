import { act, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it } from 'vitest'
import { ApiError } from '@/shared/api'
import { renderWithProviders } from '@/test/renderWithProviders'
import { Toaster } from './Toaster'
import { dismissToast, getToasts, showErrorToast } from './toastStore'

describe('Toaster', () => {
    afterEach(() => {
        act(() => {
            for (const toast of getToasts()) dismissToast(toast.id)
        })
    })

    it('shows the server message as it came', () => {
        renderWithProviders(<Toaster />)

        act(() => {
            showErrorToast(new ApiError('Level topilmadi', 404))
        })

        expect(screen.getByRole('alert')).toHaveTextContent('Level topilmadi')
    })

    it('closes on the close button', async () => {
        renderWithProviders(<Toaster />)
        act(() => {
            showErrorToast(new ApiError('Level topilmadi', 404))
        })

        await userEvent.click(screen.getByRole('button', { name: 'Yopish' }))

        expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    })
})
