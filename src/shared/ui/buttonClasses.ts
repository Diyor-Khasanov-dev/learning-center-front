import { cn } from '@/shared/lib'
import type { ButtonSize, ButtonVariant } from './Button'

/** Variant klasslari komponentdan tashqarida turadi, Fast Refresh barqaror qoladi. */
export const buttonVariantClasses: Record<ButtonVariant, string> = {
    primary: cn(
        'border border-brand/25 bg-linear-to-r from-purple via-brand to-accent text-brand-fg shadow-[0_18px_40px_-18px_var(--accent)]',
        'hover:shadow-[0_22px_48px_-18px_var(--accent)] hover:saturate-115 active:shadow-[0_12px_28px_-20px_var(--accent)]'
    ),
    brand: cn(
        'border border-brand/25 bg-linear-to-r from-purple via-brand to-accent text-brand-fg font-semibold shadow-[0_18px_40px_-18px_var(--accent)]',
        'hover:shadow-[0_22px_48px_-18px_var(--accent)] hover:saturate-115 active:shadow-[0_12px_28px_-20px_var(--accent)]'
    ),
    success: 'border border-success/20 bg-success text-white font-semibold shadow-[0_14px_30px_-22px_var(--success)] hover:brightness-105',
    purple: cn(
        'border border-purple/25 bg-linear-to-r from-purple to-accent text-white shadow-[0_16px_34px_-20px_var(--accent)]',
        'hover:shadow-[0_20px_42px_-20px_var(--accent)] hover:saturate-115'
    ),
    secondary: 'border border-border-base bg-surface-card/80 text-fg shadow-[0_12px_28px_-24px_var(--fg)] hover:border-border-strong hover:bg-surface-hover',
    ghost: 'border border-transparent text-fg-muted hover:bg-surface-hover hover:text-fg',
    danger: 'border border-danger-soft bg-danger-soft text-danger-fg hover:bg-danger hover:text-white',
}

export const buttonSizeClasses: Record<ButtonSize, string> = {
    sm: 'min-h-9 max-sm:min-h-11 px-3.5 text-xs',
    md: 'min-h-11 px-5 text-sm',
}
