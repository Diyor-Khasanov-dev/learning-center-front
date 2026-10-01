import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useFreeTeacherOptions } from './useFreeTeacherOptions'

function createWrapper() {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    })
    return ({ children }: { children: ReactNode }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
}

describe('useFreeTeacherOptions', () => {
    beforeEach(() => {
        vi.stubGlobal(
            'fetch',
            vi.fn().mockResolvedValue({
                ok: true,
                status: 200,
                text: () => Promise.resolve(JSON.stringify([{ id: 't1', name: 'Nodira' }])),
            })
        )
    })

    afterEach(() => {
        vi.restoreAllMocks()
    })

    it('barcha parametrlar bor va startTime < endTime bo‘lganda so‘rov yuboradi', async () => {
        const wrapper = createWrapper()
        const { result } = renderHook(
            () => useFreeTeacherOptions('tok', 'ODD', '09:00', '10:30'),
            { wrapper }
        )

        await waitFor(() => expect(result.current.isSuccess).toBe(true))
        expect(result.current.data).toEqual([{ value: 't1', label: 'Nodira' }])
    })

    it('startTime >= endTime bo‘lganda so‘rov yubormaydi (enabled=false)', () => {
        const wrapper = createWrapper()
        const { result } = renderHook(
            () => useFreeTeacherOptions('tok', 'ODD', '11:00', '10:30'),
            { wrapper }
        )

        expect(result.current.fetchStatus).toBe('idle')
    })
})
