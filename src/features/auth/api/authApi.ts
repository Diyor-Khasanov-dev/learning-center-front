import { apiFetch } from '@/shared/api'
import { decodeJwt } from '@/shared/lib'
import type { AuthResponse, LoginCredentials, Session } from '@/shared/types'

export function login(credentials: LoginCredentials) {
    return apiFetch<AuthResponse>('/auth/login', { method: 'POST', body: credentials })
}

/**
 * Kirishning ikkinchi bosqichi: tashkilot tanlangach yakuniy token olinadi.
 *
 * Telefon va parol qaytadan yuboriladi — birinchi bosqichda token
 * berilmagan, ya'ni o'zimizni tanitadigan boshqa narsa yo'q. Backend ham
 * ikkalasini qaytadan tekshiradi (`AuthService.selectOrganization`).
 */
export function selectOrganization(organizationId: string, credentials: LoginCredentials) {
    return apiFetch<AuthResponse>('/auth/select-organization', {
        method: 'POST',
        params: { organizationId },
        body: credentials,
    })
}

/**
 * httpOnly refresh cookie orqali yangi access token oladi.
 * Cookie bo'lmasa backend 401 qaytaradi — bu normal holat (kirilmagan).
 */
/**
 * Chiqish: backend httpOnly `refresh_token` cookie'sini o'chiradi.
 *
 * Cookie'ni frontend o'zi o'chira olmaydi (httpOnly). Busiz chiqqandan
 * keyin sahifa yangilansa, `refresh-token` yana sessiya beradi va odam
 * qaytib kirib qoladi.
 */
export function logout() {
    return apiFetch<void>('/auth/logout', { method: 'POST' })
}

export function refreshSession() {
    return apiFetch<AuthResponse>('/auth/refresh-token', { method: 'POST' })
}

/**
 * Token javobidan sessiya yasaydi.
 *
 * Token bo'lmasligi xato EMAS: bir nechta markazda o'qiydigan o'quvchiga
 * birinchi javob tokensiz keladi va avval tashkilot tanlanishi kerak.
 * Rolni o'qib bo'lmasa ham `null` — chaqiruvchi ikkalasini ajratadi.
 */
export function toSession(response: AuthResponse | null): Session | null {
    if (!response?.token) return null
    const claims = decodeJwt(response.token)
    if (!claims?.role) return null
    return { token: response.token, role: claims.role, claims, permissions: claims.permissions ?? [] }
}
