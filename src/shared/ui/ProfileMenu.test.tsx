import { afterEach, describe, expect, it, vi } from 'vitest'
import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '@/test/renderWithProviders'
import { ProfileMenu } from './ProfileMenu'

/** `useMe` — tarmoqqa chiqmasin, faqat menyu xatti-harakati tekshirilyapti. */
vi.mock('@/shared/hooks', () => ({
    useMe: () => ({ data: { fullName: 'Aziza Karimova', role: 'TEACHER' } }),
}))

afterEach(() => {
    vi.restoreAllMocks()
})

describe('ProfileMenu', () => {
    it('avatar bosilganda menyu ochiladi', async () => {
        const user = userEvent.setup()
        renderWithProviders(<ProfileMenu token="t" onSignOut={vi.fn()} />)

        expect(screen.queryByRole('menu')).not.toBeInTheDocument()

        await user.click(screen.getByRole('button', { name: /menyu/i }))

        expect(screen.getByRole('menu')).toBeInTheDocument()
        // Ism endi avatar yonida ham bor (kompyuterda) — menyu ichidagisini tekshiramiz
        expect(within(screen.getByRole('menu')).getByText('Aziza Karimova')).toBeInTheDocument()
    })

    it('"Chiqish" bosilganda onSignOut chaqiriladi', async () => {
        const user = userEvent.setup()
        const onSignOut = vi.fn()
        renderWithProviders(<ProfileMenu token="t" onSignOut={onSignOut} />)

        await user.click(screen.getByRole('button', { name: /menyu/i }))
        await user.click(screen.getByRole('menuitem', { name: /chiqish/i }))

        expect(onSignOut).toHaveBeenCalledTimes(1)
    })

    it('Escape bosilganda menyu yopiladi', async () => {
        const user = userEvent.setup()
        renderWithProviders(<ProfileMenu token="t" onSignOut={vi.fn()} />)

        await user.click(screen.getByRole('button', { name: /menyu/i }))
        expect(screen.getByRole('menu')).toBeInTheDocument()

        await user.keyboard('{Escape}')

        expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    })
})
