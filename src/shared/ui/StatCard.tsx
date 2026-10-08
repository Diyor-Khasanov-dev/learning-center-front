import type { ReactNode } from 'react'
import { cn } from '@/shared/lib'

interface StatCardProps {
    label: string
    value: ReactNode
    /** Ikonka foni va rangi, masalan `bg-accent-soft text-accent-fg`. */
    icon?: ReactNode
    tone?: string
    /** Raqam ostidagi kichik yozuv — faqat HAQIQIY ma'lumot (masalan "+3 bu oyda"). */
    hint?: ReactNode
    /** Qiymat yo'q/xato — raqam xiraroq ko'rinadi. */
    muted?: boolean
    compact?: boolean
}

/**
 * Statistika kartasi — admin, o'qituvchi va super-admin panellarida bir xil.
 *
 * Ilgari har panelda o'zicha edi va tepasida turli neon chiziqlar bor edi;
 * endi shisha karta, rang faqat kichik ikonka fonida.
 */
export function StatCard({ label, value, icon, tone, hint, muted = false, compact = false }: StatCardProps) {
    return (
        <div
            className={cn(
                'flex items-center gap-4 rounded-2xl border border-border-base bg-surface-card/80 backdrop-blur-md',
                'shadow-[var(--shadow-card)] transition-transform duration-200 hover:-translate-y-0.5',
                compact ? 'p-3.5' : 'p-4 sm:p-5'
            )}
        >
            {icon && (
                <span className={cn('hidden size-11 shrink-0 items-center justify-center rounded-xl sm:flex', tone)}>
                    {icon}
                </span>
            )}
            <div className="min-w-0">
                <div className="truncate text-xs font-medium text-fg-muted">{label}</div>
                <div
                    className={cn(
                        'font-display font-bold tracking-tight tabular-nums',
                        compact ? 'text-xl' : 'text-2xl sm:text-3xl',
                        muted ? 'text-fg-faint' : 'text-fg'
                    )}
                >
                    {value}
                </div>
                {hint && <div className="mt-0.5 truncate text-xs font-medium text-success-fg">{hint}</div>}
            </div>
        </div>
    )
}
