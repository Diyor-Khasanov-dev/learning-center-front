import type { ReactNode } from 'react'
import { cn } from '@/shared/lib'

/** Sahifadagi asosiy oq karta. */
export function Panel({ children, className }: { children: ReactNode; className?: string }) {
    return (
        <section
            className={cn(
                // Shisha karta: yarim shaffof fon + blur + ingichka qirra. To'q temada
                // fondan "ko'tarilib" turadi, yorug' temada oddiy oq karta.
                'rounded-2xl border border-border-base bg-surface-card/80 p-6 shadow-[var(--shadow-card)] backdrop-blur-md',
                className
            )}
        >
            {children}
        </section>
    )
}
