import { demoUser, getDemoRole, json, makeToken, noContent } from './state'

export function handleAuth(path: string): Response | null {
    // Demo'da kirish har doim bir bosqichda — tashkilot tanlash faqat bir
    // nechta markazda o'qiydigan o'quvchida chiqadi, demo esa bitta markaz.
    if (path === '/auth/select-organization') {
        return json({ token: makeToken(getDemoRole()), expiry: '2099-01-01T00:00:00Z' })
    }
    // Haqiqiy backend refresh cookie'ni o'chiradi; demo'da cookie yo'q.
    if (path === '/auth/logout') return noContent()
    if (path === '/auth/refresh-token' || path === '/auth/login') {
        return json({ token: makeToken(getDemoRole()), expiry: '2099-01-01T00:00:00Z' })
    }
    if (path === '/auth/me') {
        return json(demoUser)
    }
    if (path === '/auth/change-password') {
        // Demo'da har doim muvaffaqiyatli — haqiqiy tekshiruv backendda.
        return json({ response: 'Password changed successfully' })
    }
    return null
}
