import { afterEach, describe, expect, it, vi } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '@/test/renderWithProviders'
import { LoginForm } from './LoginForm'

/** Imzosiz, lekin to’g’ri tuzilgan JWT (faqat payload o’qiladi). */
function tokenWithRole(role: string): string {
    const encode = (value: object) =>
        btoa(JSON.stringify(value)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
    return `${encode({ alg: 'HS256' })}.${encode({ role })}.sig`
}

function mockLoginResponse(body: object, ok = true, status = 200) {
    vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue({
            ok,
            status,
            text: () => Promise.resolve(JSON.stringify(body)),
            json: () => Promise.resolve(body),
        })
    )
}

/** Ikki bosqich: login tashkilot so'raydi, `select-organization` token beradi. */
function mockTwoStepLogin(organizations: { id: string; name: string }[], token: string) {
    const respond = (payload: unknown) => ({
        ok: true,
        status: 200,
        text: () => Promise.resolve(JSON.stringify(payload)),
        json: () => Promise.resolve(payload),
    })

    vi.stubGlobal(
        'fetch',
        vi.fn().mockImplementation((url: string) =>
            Promise.resolve(
                String(url).includes('/auth/select-organization')
                    ? respond({ token })
                    : respond({ requiresOrganizationSelection: true, organizations })
            )
        )
    )
}

/** Login so'rovining tanasi — birinchi chaqiruv tashkilotlar ro'yxati bo'lishi mumkin. */
function loginRequestBody() {
    const call = vi.mocked(fetch).mock.calls.find(([url]) => String(url).includes('/auth/login'))
    return JSON.parse(String(call?.[1]?.body))
}

afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
})

describe('LoginForm', () => {
    it('telefon va parolni yuboradi, sessiyani qaytaradi', async () => {
        const user = userEvent.setup()
        mockLoginResponse({ token: tokenWithRole('ADMINISTRATOR') })
        const onLoggedIn = vi.fn()

        renderWithProviders(<LoginForm onLoggedIn={onLoggedIn} />)

        await user.type(screen.getByLabelText(/telefon raqami/i), '+998901234567')
        await user.type(screen.getByLabelText(/^parol$/i), 'secret')
        await user.click(screen.getByRole('button', { name: /kirish/i }))

        await waitFor(() => expect(onLoggedIn).toHaveBeenCalledTimes(1))
        expect(onLoggedIn.mock.calls[0][0]).toMatchObject({ role: 'ADMINISTRATOR' })
    })

    it('"Keep me signed in" holatini so’rovga qo’shadi', async () => {
        const user = userEvent.setup()
        mockLoginResponse({ token: tokenWithRole('TEACHER') })

        renderWithProviders(<LoginForm onLoggedIn={vi.fn()} />)

        await user.type(screen.getByLabelText(/telefon raqami/i), '+998901234567')
        await user.type(screen.getByLabelText(/^parol$/i), 'secret')
        await user.click(screen.getByLabelText(/meni eslab qol/i))
        await user.click(screen.getByRole('button', { name: /kirish/i }))

        await waitFor(() => expect(loginRequestBody()).toMatchObject({ rememberMe: true }))
    })

    /*
     * Telefon-parol to'g'ri, lekin odam tanlangan markazga a'zo emas:
     * backend `403` qaytaradi. "Parol noto'g'ri" deb yozsak, odam parolini
     * qayta-qayta terib ovora bo'ladi — holbuki buni administrator hal qiladi.
     */
    it('a’zo bo’lmagan markaz tanlansa administratorga yo’naltiradi', async () => {
        const user = userEvent.setup()
        mockLoginResponse({ message: 'Forbidden' }, false, 403)

        renderWithProviders(<LoginForm onLoggedIn={vi.fn()} />)

        await user.type(screen.getByLabelText(/telefon raqami/i), '+998901234567')
        await user.type(screen.getByLabelText(/^parol$/i), 'secret')
        await user.click(screen.getByRole('button', { name: /kirish/i }))

        expect(await screen.findByRole('alert')).toHaveTextContent(/administrator/i)
    })

    /*
     * Backend hozir bitta a'zolikda ham ro'yxat qaytaryapti (undagi `return`
     * tushib qolgan). Bitta variantli ro'yxatdan tanlashni so'rash ma'nosiz,
     * shuning uchun forma o'zi o'tkazib yuboradi — backend tuzatilgandan
     * keyin ham bu to'g'ri xatti-harakat bo'lib qoladi.
     */
    it('bitta a’zolik bo’lsa tanlashni so’ramasdan kiradi', async () => {
        const user = userEvent.setup()
        mockTwoStepLogin([{ id: 'org-1', name: 'Alia markazi' }], tokenWithRole('ADMINISTRATOR'))
        const onLoggedIn = vi.fn()

        renderWithProviders(<LoginForm onLoggedIn={onLoggedIn} />)

        await user.type(screen.getByLabelText(/telefon raqami/i), '+998901234567')
        await user.type(screen.getByLabelText(/^parol$/i), 'secret')
        await user.click(screen.getByRole('button', { name: /kirish/i }))

        await waitFor(() => expect(onLoggedIn).toHaveBeenCalledTimes(1))
        expect(screen.queryByLabelText(/tashkilot/i)).not.toBeInTheDocument()
    })

    /*
     * Bir nechta markazda o'qiydigan o'quvchi: birinchi javobda token emas,
     * markazlar ro'yxati keladi va faqat tanlangandan keyin kiriladi.
     */
    it('bir nechta markaz bo’lsa avval tanlashni so’raydi', async () => {
        const user = userEvent.setup()
        mockTwoStepLogin(
            [
                { id: 'org-1', name: 'Alia markazi' },
                { id: 'org-2', name: 'Bilim markazi' },
            ],
            tokenWithRole('STUDENT')
        )
        const onLoggedIn = vi.fn()

        renderWithProviders(<LoginForm onLoggedIn={onLoggedIn} />)

        await user.type(screen.getByLabelText(/telefon raqami/i), '+998901234567')
        await user.type(screen.getByLabelText(/^parol$/i), 'secret')
        await user.click(screen.getByRole('button', { name: /kirish/i }))

        const select = await screen.findByLabelText(/tashkilot/i)
        expect(onLoggedIn).not.toHaveBeenCalled()

        await user.selectOptions(select, 'org-2')
        await user.click(screen.getByRole('button', { name: /davom etish/i }))

        await waitFor(() => expect(onLoggedIn).toHaveBeenCalledTimes(1))
        expect(onLoggedIn.mock.calls[0][0]).toMatchObject({ role: 'STUDENT' })
    })

    it('noto’g’ri ma’lumotda xato xabarini ko’rsatadi', async () => {
        const user = userEvent.setup()
        mockLoginResponse({ message: "Telefon raqami yoki parol noto'g'ri" }, false, 401)
        const onLoggedIn = vi.fn()

        renderWithProviders(<LoginForm onLoggedIn={onLoggedIn} />)

        await user.type(screen.getByLabelText(/telefon raqami/i), '+998900000000')
        await user.type(screen.getByLabelText(/^parol$/i), 'wrong')
        await user.click(screen.getByRole('button', { name: /kirish/i }))

        expect(await screen.findByRole('alert')).toHaveTextContent(/noto’g’ri|noto'g'ri/i)
        expect(onLoggedIn).not.toHaveBeenCalled()
    })

    // Token kelgan, lekin ichida rol yo'q — bunda dashboard tanlab bo'lmaydi.
    it('tokenda rol bo’lmasa kirishga ruxsat bermaydi', async () => {
        const user = userEvent.setup()
        const encode = (value: object) => btoa(JSON.stringify(value)).replace(/=+$/, '')
        mockLoginResponse({ token: `${encode({ alg: 'HS256' })}.${encode({ sub: '1' })}.sig` })
        const onLoggedIn = vi.fn()

        renderWithProviders(<LoginForm onLoggedIn={onLoggedIn} />)

        await user.type(screen.getByLabelText(/telefon raqami/i), '+998901234567')
        await user.type(screen.getByLabelText(/^parol$/i), 'secret')
        await user.click(screen.getByRole('button', { name: /kirish/i }))

        expect(await screen.findByRole('alert')).toHaveTextContent(/rol/i)
        expect(onLoggedIn).not.toHaveBeenCalled()
    })
})
