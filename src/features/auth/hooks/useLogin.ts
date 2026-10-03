import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { login, selectOrganization, toSession } from '../api/authApi'
import type { LoginCredentials, OrganizationViewDto, Session } from '@/shared/types'

/**
 * Kirish — bir yoki ikki bosqichda.
 *
 * Bitta markazda o'qiydigan odamga birinchi javobning o'zida token keladi.
 * Bir nechta markazda o'qiydigan o'quvchiga esa tokensiz javob va markazlar
 * ro'yxati keladi; u bittasini tanlagach ikkinchi so'rov yuboriladi.
 *
 * Ikkinchi so'rov telefon va parolni QAYTA yuboradi, chunki birinchi
 * bosqichda token berilmagan — o'zimizni tanitadigan boshqa narsa yo'q.
 * Shu sabab ma'lumotlar tanlash oralig'ida xotirada saqlanadi va sessiya
 * ochilishi bilan tashlanadi.
 *
 * `retry: false` — noto'g'ri parolni qayta-qayta yuborishning ma'nosi yo'q
 * va bu backendda hisobni bloklashi mumkin.
 */
export function useLogin(onSuccess: (session: Session) => void) {
    const [pending, setPending] = useState<{
        credentials: LoginCredentials
        organizations: OrganizationViewDto[]
    } | null>(null)

    const mutation = useMutation({
        retry: false,
        // Kirish formasi xatoni o'zi tushunarli qilib ko'rsatadi ("parol
        // noto'g'ri") — qizil xabar uni takrorlab, xom server matnini chiqarardi.
        meta: { toast: false },
        mutationFn: async (credentials: LoginCredentials) => {
            const response = await login(credentials)

            if (response?.requiresOrganizationSelection) {
                const organizations = response.organizations ?? []

                // Bitta a'zolik bo'lsa tanlaydigan narsa yo'q — so'ramasdan
                // o'tkazamiz. Aks holda foydalanuvchi bitta variantli
                // ro'yxatdan o'sha bittasini tanlab o'tirardi.
                if (organizations.length === 1) {
                    const session = toSession(
                        await selectOrganization(organizations[0].id, credentials)
                    )
                    if (!session) throw new Error('ROLE_MISSING')
                    return session
                }

                return { credentials, organizations }
            }

            const session = toSession(response)
            if (!session) throw new Error('ROLE_MISSING')
            return session
        },
        onSuccess: (result) => {
            if ('organizations' in result) {
                setPending(result)
                return
            }
            onSuccess(result)
        },
    })

    const selection = useMutation({
        retry: false,
        mutationFn: async (organizationId: string) => {
            if (!pending) throw new Error('ROLE_MISSING')
            const session = toSession(await selectOrganization(organizationId, pending.credentials))
            if (!session) throw new Error('ROLE_MISSING')
            return session
        },
        onSuccess: (session) => {
            setPending(null)
            onSuccess(session)
        },
    })

    return {
        /** Birinchi bosqich: telefon va parol. */
        submitCredentials: mutation.mutate,
        /** Ikkinchi bosqich; faqat `organizations` bo'lganda ma'noli. */
        submitOrganization: selection.mutate,
        /** Bo'sh bo'lmasa — tashkilot tanlash bosqichi ko'rsatiladi. */
        organizations: pending?.organizations ?? null,
        isPending: mutation.isPending || selection.isPending,
        error: mutation.error ?? selection.error,
    }
}
