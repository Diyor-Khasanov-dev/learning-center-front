import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '@/test/renderWithProviders'
import { SettingsPage } from './SettingsPage'

const { sessionState } = vi.hoisted(() => ({ sessionState: { role: 'DEVELOPER' } }))

vi.mock('@/app/providers/useAuth', () => ({
    useSession: () => ({ token: 'test-token', role: sessionState.role, claims: {}, permissions: [] }),
    useAuth: () => ({ session: null, signIn: vi.fn(), signOut: vi.fn(), isRestoring: false }),
    useHasPermission: () => true,
}))

beforeEach(() => {
    vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue({ ok: true, status: 200, text: () => Promise.resolve('[]') })
    )
})

afterEach(() => vi.unstubAllGlobals())

describe('SettingsPage', () => {
    // Dasturchi tashkilotga tegishli emas — profil va rasm backendda unga yopiq.
    it('shows only appearance and password to the developer', () => {
        sessionState.role = 'DEVELOPER'
        renderWithProviders(<SettingsPage />)

        expect(screen.getByText('Parol', { exact: true })).toBeInTheDocument()
        expect(screen.queryByText('Profil', { exact: true })).not.toBeInTheDocument()
    })

    it('keeps the profile for other roles', () => {
        sessionState.role = 'TEACHER'
        renderWithProviders(<SettingsPage />)

        expect(screen.getByText('Profil', { exact: true })).toBeInTheDocument()
    })
})
