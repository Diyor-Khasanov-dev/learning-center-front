import { useState, type InputHTMLAttributes } from 'react'
import { useT } from '@/shared/i18n'
import { cn } from '@/shared/lib'
import { EyeIcon, EyeOffIcon } from './icons'
import { Input } from './Input'

type PasswordInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>

/**
 * Parol maydoni + ko'rsatish/yashirish tugmasi.
 *
 * Telefonda parolni xato terish oson va nuqtalar ostida ko'rinmaydi —
 * foydalanuvchi nima yozganini tekshira olsin.
 */
export function PasswordInput({ className, ...props }: PasswordInputProps) {
    const { t } = useT()
    const [visible, setVisible] = useState(false)

    return (
        <div className="relative">
            <Input {...props} type={visible ? 'text' : 'password'} className={cn('pr-11', className)} />
            <button
                type="button"
                aria-label={visible ? t('auth.hidePassword') : t('auth.showPassword')}
                aria-pressed={visible}
                onClick={() => setVisible((current) => !current)}
                className="absolute inset-y-0 right-0 flex w-11 cursor-pointer items-center justify-center text-fg-muted hover:text-fg"
            >
                {visible ? <EyeOffIcon /> : <EyeIcon />}
            </button>
        </div>
    )
}
