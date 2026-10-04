import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '@/test/renderWithProviders'
import { DeveloperDashboardPage } from './DeveloperDashboardPage'

vi.mock('@/app/providers/useAuth', () => ({
    useSession: () => ({ token: 'test-token', role: 'DEVELOPER', claims: {}, permissions: [] }),
    useAuth: () => ({ session: null, signIn: vi.fn(), signOut: vi.fn(), isRestoring: false }),
    useHasPermission: () => true,
}))

beforeEach(() => {
    const body = { content: [], page: { totalElements: 0, totalPages: 1 } }
    vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue({ ok: true, status: 200, text: () => Promise.resolve(JSON.stringify(body)) })
    )
})

afterEach(() => vi.unstubAllGlobals())

describe('DeveloperDashboardPage', () => {
    // Ilgari obunalar jadvali "Tashkilotlar" tabida ham ikkinchi bo'lib chiqardi.
    it('shows the subscriptions table only on its own tab', async () => {
        renderWithProviders(<DeveloperDashboardPage />)

        expect(await screen.findByRole('columnheader', { name: /tashkilot nomi/i })).toBeInTheDocument()
        expect(screen.queryByRole('columnheader', { name: /^tarif$/i })).not.toBeInTheDocument()

        await userEvent.click(screen.getByRole('radio', { name: 'Obunalar' }))

        expect(await screen.findByRole('columnheader', { name: /^tarif$/i })).toBeInTheDocument()
        expect(screen.queryByRole('columnheader', { name: /tashkilot nomi/i })).not.toBeInTheDocument()
    })
})
