import { cn } from '@/shared/lib'
import type { ButtonSize, ButtonVariant } from './Button'

/** Variant klasslari komponentdan tashqarida turadi, Fast Refresh barqaror qoladi. */
export const buttonVariantClasses: Record<ButtonVariant, string> = {
    // Asosiy harakat — kapsula shaklida, indigo gradient. Soya rangli
    // "dog'" emas: pastga tushadigan yumshoq nur.
    primary: cn(
        'rounded-full border border-white/10 bg-linear-to-r from-purple via-brand to-accent text-brand-fg font-medium shadow-[0_8px_24px_-10px_var(--brand)]',
        'hover:shadow-[0_12px_28px_-10px_var(--brand)] hover:brightness-110'
    ),
    brand: cn(
        'rounded-full border border-white/10 bg-linear-to-r from-purple via-brand to-accent text-brand-fg font-semibold shadow-[0_8px_24px_-10px_var(--brand)]',
        'hover:shadow-[0_12px_28px_-10px_var(--brand)] hover:brightness-110'
    ),
    success: 'rounded-lg border border-success/20 bg-success text-white font-semibold hover:brightness-105',
    purple: cn(
        'rounded-full border border-white/10 bg-linear-to-r from-purple to-accent text-white shadow-[0_8px_24px_-10px_var(--brand)]',
        'hover:brightness-110'
    ),
    secondary: 'rounded-lg border border-border-base bg-surface-card text-fg shadow-[0_1px_2px_rgb(15_23_42/0.04)] hover:border-border-strong hover:bg-surface-hover',
    ghost: 'rounded-lg border border-transparent text-fg-muted hover:bg-surface-hover hover:text-fg',
    danger: 'rounded-lg border border-danger-soft bg-danger-soft text-danger-fg hover:bg-danger hover:text-white',
}

export const buttonSizeClasses: Record<ButtonSize, string> = {
    sm: 'min-h-9 max-sm:min-h-11 px-3.5 text-xs',
    md: 'min-h-11 px-5 text-sm',
}
