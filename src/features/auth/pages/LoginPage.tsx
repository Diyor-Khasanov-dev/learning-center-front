import { useTheme } from '@/app/providers/useTheme'
import { LOCALE_LABELS, LOCALES, useT } from '@/shared/i18n'
import { Brand, SegmentedControl, ThemeToggle } from '@/shared/ui'
import { LoginForm } from '../components/LoginForm'
import type { Locale } from '@/shared/i18n'
import type { Session } from '@/shared/types'

/**
 * Ikki ustunli kirish sahifasi.
 *
 * Til tanlagichi ATAYLAB shu yerda: foydalanuvchi hali tizimga kirmagan,
 * ya'ni Sozlamalarga o'ta olmaydi — tilni kirishdan oldin tanlay olishi kerak.
 * O'ng ustun (bezak) kichik ekranlarda butunlay yashiriladi.
 */
export function LoginPage({ onLoggedIn }: { onLoggedIn: (session: Session) => void }) {
    const { t, locale, setLocale } = useT()
    const { theme, toggleTheme } = useTheme()

    return (
        <div className="grid min-h-screen lg:grid-cols-[minmax(360px,460px)_1fr]">
            <div className="flex flex-col justify-center bg-surface px-6 py-10 sm:px-14">
                <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
                    <Brand subtitle={t('auth.brand')} className="min-w-0" />
                    <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
                </div>

                <h1 className="mb-2 font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
                    {t('auth.headline')}
                </h1>
                <p className="mb-7 text-fg-muted">{t('auth.subtitle')}</p>

                <LoginForm onLoggedIn={onLoggedIn} />

                <div className="mt-7">
                    <SegmentedControl<Locale>
                        label={t('settings.language')}
                        value={locale}
                        onChange={setLocale}
                        options={LOCALES.map((code) => ({ value: code, label: LOCALE_LABELS[code] }))}
                    />
                </div>
            </div>

            <div className="relative hidden items-end overflow-hidden bg-sidebar p-14 lg:flex">
                {/* Sof bezak (aria-hidden): indigo va osmon ko'ki nurlari + mayda
                    nuqtali to'r — yangi palitradagi "chuqurlik" hissi. */}
                <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[radial-gradient(60%_50%_at_20%_15%,rgb(99_102_241/0.35),transparent_70%),radial-gradient(45%_40%_at_85%_80%,rgb(56_189_248/0.18),transparent_70%)]"
                />
                <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[radial-gradient(rgb(255_255_255/0.07)_1px,transparent_1px)] bg-size-[22px_22px]"
                />
                <div className="relative max-w-sm">
                    <span className="mb-4 inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[0.68rem] font-semibold tracking-[0.08em] text-sidebar-fg/80 uppercase backdrop-blur">
                        {t('auth.stamp')}
                    </span>
                    <p className="font-display text-3xl leading-snug font-semibold tracking-tight text-white">
                        {t('auth.quote')}
                    </p>
                </div>
            </div>
        </div>
    )
}
