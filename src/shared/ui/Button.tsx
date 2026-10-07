import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/shared/lib'
import { buttonSizeClasses, buttonVariantClasses } from './buttonClasses'

export type ButtonVariant = 'primary' | 'brand' | 'success' | 'purple' | 'secondary' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant
    size?: ButtonSize
    children: ReactNode
}

export function Button({
    variant = 'secondary',
    size = 'md',
    className,
    type = 'button',
    children,
    ...props
}: ButtonProps) {
    return (
        <button
            type={type}
            className={cn(
                'inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap',
                'transition-[background-color,box-shadow,filter,opacity,transform,border-color] duration-200 hover:-translate-y-0.5 active:translate-y-px',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
                'disabled:cursor-default disabled:opacity-55 disabled:active:translate-y-0',
                buttonVariantClasses[variant],
                buttonSizeClasses[size],
                className
            )}
            {...props}
        >
            {children}
        </button>
    )
}
