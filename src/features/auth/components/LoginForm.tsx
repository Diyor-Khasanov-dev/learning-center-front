import { useState, type FormEvent } from 'react'
import { ApiError, errorMessage } from '@/shared/api'
import { useT } from '@/shared/i18n'
import { normalizePhone } from '@/shared/lib'
import { Button, ErrorBox, Field, PasswordInput, PhoneInput, Select } from '@/shared/ui'
import { useLogin } from '../hooks/useLogin'
import type { Session } from '@/shared/types'

export function LoginForm({ onLoggedIn }: { onLoggedIn: (session: Session) => void }) {
    const { t } = useT()
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)
    const [organizationId, setOrganizationId] = useState('')

    const { submitCredentials, submitOrganization, organizations, isPending, error } =
        useLogin(onLoggedIn)

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (organizations) {
            submitOrganization(organizationId)
            return
        }
        submitCredentials({ phone: normalizePhone(phone), password, rememberMe })
    }

    // Xato turi bo'yicha xabar: `403` — telefon-parol to'g'ri, lekin odam
    // tanlangan markazga tegishli emas. Bunda "parol noto'g'ri" deyish
    // chalg'itadi: odam parolini qayta-qayta terib ovora bo'ladi, holbuki
    // buni faqat administrator hal qiladi.
    function messageFor(cause: unknown) {
        if (cause instanceof Error && cause.message === 'ROLE_MISSING') return t('auth.roleMissing')
        if (cause instanceof ApiError && cause.status === 403) return t('auth.notAMember')
        return errorMessage(cause, t('auth.invalidCredentials'))
    }

    // Ikkinchi bosqichda telefon va parol maydonlari ko'rsatilmaydi: ular
    // allaqachon to'g'ri deb tasdiqlangan, qayta so'rash faqat chalg'itadi.
    if (organizations) {
        return (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <p className="text-sm leading-snug text-fg-muted">{t('auth.chooseOrganization')}</p>

                <Field label={t('auth.organization')}>
                    <Select
                        required
                        autoFocus
                        value={organizationId}
                        onChange={(event) => setOrganizationId(event.target.value)}
                        options={organizations.map((organization) => ({
                            value: organization.id,
                            label: organization.name,
                        }))}
                        placeholder={t('auth.organizationPlaceholder')}
                    />
                </Field>

                {error && <ErrorBox>{messageFor(error)}</ErrorBox>}

                <Button
                    type="submit"
                    variant="primary"
                    disabled={isPending || organizationId === ''}
                    className="mt-2 py-3"
                >
                    {isPending ? t('auth.signingIn') : t('auth.continue')}
                </Button>
            </form>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Field label={t('auth.phone')}>
                <PhoneInput required value={phone} onChange={setPhone} />
            </Field>

            <Field label={t('auth.password')}>
                <PasswordInput
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="••••••••"
                    autoComplete="current-password"
                />
            </Field>

            <label className="flex items-center gap-2 text-sm text-fg-muted">
                <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(event) => setRememberMe(event.target.checked)}
                    className="size-4 cursor-pointer"
                />
                {t('auth.keepSignedIn')}
            </label>

            {error && <ErrorBox>{messageFor(error)}</ErrorBox>}

            <Button type="submit" variant="primary" disabled={isPending} className="mt-2 py-3">
                {isPending ? t('auth.signingIn') : t('auth.signIn')}
            </Button>
        </form>
    )
}
