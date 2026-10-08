import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/shared/lib'

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /** `aria-label` va `title` uchun — ikonkali tugmada matn yo'q. */
    label: string
    tone?: 'default' | 'danger'
    children: ReactNode
}

export function IconButton({ label, tone = 'default', className, children, ...props }: IconButtonProps) {
    return (
        <button
            type="button"
            aria-label={label}
            title={label}
            className={cn(
                'inline-flex size-9 max-sm:size-11 cursor-pointer items-center justify-center rounded-lg border border-transparent',
                'transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
                'disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-surface disabled:hover:text-fg-muted',
                // Neytral kulrang — faqat ustiga kelganda yorishadi. Har qatorda
                // yorqin qizil tugma jadvalni "qichqiradigan" qilib qo'yardi.
                tone === 'danger'
                    ? 'text-fg-faint hover:bg-danger-soft hover:text-danger-fg'
                    : 'text-fg-faint hover:bg-surface-hover hover:text-fg',
                className
            )}
            {...props}
        >
            {children}
        </button>
    )
}
