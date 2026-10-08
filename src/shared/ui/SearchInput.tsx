import type { InputHTMLAttributes } from 'react'
import { cn } from '@/shared/lib'
import { SearchIcon } from './icons'
import { inputBaseClasses } from './inputClasses'

type SearchInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>

/** Chap tomonida lupa belgisi bo'lgan, yumaloq qidiruv maydoni. */
export function SearchInput({ className, ...props }: SearchInputProps) {
    return (
        <div className={cn('relative', className)}>
            <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-fg-faint">
                <SearchIcon />
            </span>
            <input type="search" {...props} className={cn(inputBaseClasses, 'rounded-full pr-4 pl-10')} />
        </div>
    )
}
