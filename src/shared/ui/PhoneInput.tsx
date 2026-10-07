import type { InputHTMLAttributes } from 'react'
import { formatUzPhone } from '@/shared/lib'
import { Input } from './Input'

type PhoneInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'type'> & {
    value: string
    /** Formatlangan qiymat ("+998 90 123 45 67"); serverga `normalizePhone` bilan. */
    onChange: (value: string) => void
}

/**
 * Telefon maydoni — loyihadagi HAMMA telefon shu orqali.
 *
 * Ilgari har forma o'zicha qilardi: birida format bor, birida yo'q,
 * login'da esa cheksiz raqam yozib bo'lardi. Bu yerda `+998` doim turadi
 * va qiymat ko'rsatishdan oldin ham formatlanadi — serverdan kelgan
 * "+998901234567" ham chiroyli ko'rinadi.
 */
export function PhoneInput({ value, onChange, ...props }: PhoneInputProps) {
    return (
        <Input
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+998 90 123 45 67"
            {...props}
            value={formatUzPhone(value)}
            onChange={(event) => onChange(formatUzPhone(event.target.value))}
        />
    )
}
