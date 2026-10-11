import { describe, expect, it, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '@/test/renderWithProviders'
import { AppShell } from './AppShell'
import { Button } from './Button'
import { AppNavContext } from './navTypes'

vi.mock('@/shared/hooks', () => ({
    useMe: () => ({ data: { fullName: 'Aziza Karimova', role: 'ADMINISTRATOR' } }),
}))

describe('AppShell', () => {
    // Tugmalar kompyuterda ham, telefonda ham BIR marta chiziladi — faqat
    // joyi o'zgaradi. Ikki nusxa ekran o'quvchida ikki marta o'qilardi.
    it('shows the page title and renders each action once', () => {
        renderWithProviders(
            <AppShell subtitle="Lidlar" token="t" onSignOut={vi.fn()} actions={<Button>Forma havolasi</Button>}>
                <p>kontent</p>
            </AppShell>
        )
        expect(screen.getByText('Lidlar')).toBeInTheDocument()
        expect(screen.getAllByRole('button', { name: 'Forma havolasi' })).toHaveLength(1)
    })
})

describe('AppShell navigation', () => {
    it('lists page sections before the shared links and drops the duplicate home link', async () => {
        const onStudents = vi.fn()
        renderWithProviders(
            <AppNavContext.Provider
                value={[{ key: 'global', label: "Bo'limlar", items: [
                    { key: 'home', label: 'Bosh sahifa', onClick: vi.fn() },
                    { key: 'settings', label: 'Sozlamalar', onClick: vi.fn() },
                ] }]}
            >
                <AppShell
                    subtitle="O'quvchilar"
                    token="t"
                    onSignOut={vi.fn()}
                    nav={[{ key: 'entities', items: [{ key: 'students', label: "O'quvchilar", active: true, onClick: onStudents }] }]}
                >
                    <p>kontent</p>
                </AppShell>
            </AppNavContext.Provider>
        )
        expect(screen.getByRole('button', { name: "O'quvchilar" })).toHaveAttribute('aria-current', 'page')
        expect(screen.getByRole('button', { name: 'Sozlamalar' })).toBeInTheDocument()
        expect(screen.queryByRole('button', { name: 'Bosh sahifa' })).not.toBeInTheDocument()
        await userEvent.click(screen.getByRole('button', { name: "O'quvchilar" }))
        expect(onStudents).toHaveBeenCalled()
    })

    it('opens the menu as a drawer on phones', async () => {
        renderWithProviders(
            <AppNavContext.Provider value={[{ key: 'global', items: [{ key: 'settings', label: 'Sozlamalar', onClick: vi.fn() }] }]}>
                <AppShell subtitle="Bosh sahifa" token="t" onSignOut={vi.fn()}>
                    <p>kontent</p>
                </AppShell>
            </AppNavContext.Provider>
        )
        // Kompyuter menyusi + yon menyu — ikkinchisi ochilgach ikkita "Sozlamalar"
        expect(screen.getAllByRole('button', { name: 'Sozlamalar' })).toHaveLength(1)
        await userEvent.click(screen.getByRole('button', { name: "Bo'limlar" }))
        expect(screen.getAllByRole('button', { name: 'Sozlamalar' })).toHaveLength(2)
    })
})
