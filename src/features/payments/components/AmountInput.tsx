import { useLayoutEffect, useRef, type ChangeEvent } from 'react'
import { inputClasses } from '@/shared/ui'
import { cn } from '@/shared/lib'
import { caretAfterDigits, formatAmountInput } from '../lib/amountInput'

interface AmountInputProps {
    id?: string
    value: string
    suffix: string
    onChange: (formatted: string) => void
}

/**
 * Summa maydoni: yozilayotganda `1 000`, `889 000` ko'rinishida guruhlanadi.
 *
 * `type="number"` emas: u bo'luvchini ko'rsatolmaydi. `inputMode="numeric"`
 * telefonda baribir raqam klaviaturasini ochadi.
 */
export function AmountInput({ id, value, suffix, onChange }: AmountInputProps) {
    const inputRef = useRef<HTMLInputElement>(null)
    const pendingCaret = useRef<number | null>(null)

    // Formatlangandan keyin kursor oxirga sakramasin — o'rtadagi raqamni
    // tuzatayotgan odam uchun bu eng bezovta qiladigan narsa.
    useLayoutEffect(() => {
        if (pendingCaret.current == null || inputRef.current == null) return
        inputRef.current.setSelectionRange(pendingCaret.current, pendingCaret.current)
        pendingCaret.current = null
    }, [value])

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const raw = event.target.value
        const caret = event.target.selectionStart ?? raw.length
        const digitsBefore = raw.slice(0, caret).replace(/\D/g, '').length
        const formatted = formatAmountInput(raw)
        pendingCaret.current = caretAfterDigits(formatted, digitsBefore)
        onChange(formatted)
    }

    return (
        <div className="relative">
            <input
                ref={inputRef}
                id={id}
                inputMode="numeric"
                autoComplete="off"
                value={value}
                onChange={handleChange}
                className={cn(inputClasses, 'pr-14 font-display text-lg font-semibold tabular-nums')}
            />
            <span className="pointer-events-none absolute inset-y-0 right-3.5 flex items-center text-sm text-fg-muted">
                {suffix}
            </span>
        </div>
    )
}
