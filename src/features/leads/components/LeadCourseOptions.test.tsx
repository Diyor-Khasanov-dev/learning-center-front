import { afterEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { LocaleProvider } from '@/app/providers/LocaleProvider'
import { queryKeys } from '@/shared/api'
import { createTestQueryClient } from '@/test/renderWithProviders'
import { NewLeadModal } from './NewLeadModal'

afterEach(() => vi.unstubAllGlobals())

/*
 * Regressiya: admin paneli `/group-level/names` ni XOM shaklda (`{id, name}`)
 * keshga yozadi. Lid formasi ilgari shu kalitni ishlatgani uchun kesh "yangi"
 * hisoblanib so'rov ketmasdi va kurs ro'yxati bo'sh variantlar bilan chiqardi.
 */
describe('lid formasidagi kurs ro‘yxati', () => {
    it('admin paneli keshga yozgan darajalar bo‘lsa ham kurs nomlari chiqadi', async () => {
        vi.stubGlobal(
            'fetch',
            vi.fn().mockResolvedValue({
                ok: true,
                status: 200,
                text: () => Promise.resolve('[{"id":"lvl-1","name":"Elementary"}]'),
            })
        )
        const client = createTestQueryClient()
        // Admin paneli `useGroupLevelNames` aynan shunday yozadi.
        client.setQueryData(queryKeys.groupLevelNameOptions(), [{ id: 'lvl-1', name: 'Elementary' }])

        render(
            <QueryClientProvider client={client}>
                <LocaleProvider>
                    <NewLeadModal token="tok" onClose={vi.fn()} onSubmit={vi.fn()} />
                </LocaleProvider>
            </QueryClientProvider>
        )

        const option = await screen.findByRole('option', { name: 'Elementary' })
        expect((option as HTMLOptionElement).value).toBe('lvl-1')
    })
})
