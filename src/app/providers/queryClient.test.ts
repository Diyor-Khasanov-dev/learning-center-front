import { afterEach, describe, expect, it } from 'vitest'
import { ApiError } from '@/shared/api'
import { dismissToast, getToasts } from '@/shared/ui/toastStore'
import { createQueryClient } from './queryClient'

function failingMutation(meta?: Record<string, unknown>) {
    const client = createQueryClient()
    return client
        .getMutationCache()
        .build(client, {
            mutationFn: () => Promise.reject(new ApiError('Level topilmadi', 404)),
            retry: false,
            meta,
        })
        .execute(undefined)
        .catch(() => undefined)
}

describe('createQueryClient', () => {
    afterEach(() => {
        for (const toast of getToasts()) dismissToast(toast.id)
    })

    it('turns a failed mutation into a toast', async () => {
        await failingMutation()

        expect(getToasts().map((toast) => (toast.error as Error).message)).toEqual(['Level topilmadi'])
    })

    it('stays silent for mutations that show their own error', async () => {
        await failingMutation({ toast: false })

        expect(getToasts()).toHaveLength(0)
    })
})
