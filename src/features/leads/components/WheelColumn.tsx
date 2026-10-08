import { useEffect, useRef, type KeyboardEvent } from 'react'
import { cn } from '@/shared/lib'

export interface WheelItem<T extends string | number> {
    value: T
    label: string
}

interface WheelColumnProps<T extends string | number> {
    items: WheelItem<T>[]
    value: T
    onChange: (value: T) => void
    label: string
    className?: string
}

/** Bitta qator balandligi (px) — `h-10` bilan bir xil bo'lishi SHART. */
const ITEM_HEIGHT = 40
/** Aylantirish to'xtagach shuncha kutib, markazdagisini tanlaymiz. */
const SETTLE_MS = 120

/**
 * Telegramdagidek g'ildirak ustuni: aylantirib, bosib yoki strelka
 * tugmalari bilan tanlanadi. Markazdagi qator — tanlangani.
 *
 * Kutubxona ishlatilmadi: CSS `scroll-snap` g'ildirak hissini beradi,
 * qolgani — `scrollTop` dan indeksni hisoblash.
 */
export function WheelColumn<T extends string | number>({
    items,
    value,
    onChange,
    label,
    className,
}: WheelColumnProps<T>) {
    const listRef = useRef<HTMLDivElement>(null)
    const settleTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
    const selectedIndex = Math.max(
        0,
        items.findIndex((item) => item.value === value)
    )

    // Tashqaridan qiymat o'zgarsa (yoki birinchi ochilganda) — markazga olib kelamiz.
    useEffect(() => {
        const list = listRef.current
        if (!list) return
        const target = selectedIndex * ITEM_HEIGHT
        if (Math.abs(list.scrollTop - target) > 1) list.scrollTop = target
    }, [selectedIndex])

    useEffect(() => () => clearTimeout(settleTimer.current), [])

    function handleScroll() {
        clearTimeout(settleTimer.current)
        settleTimer.current = setTimeout(() => {
            const list = listRef.current
            if (!list) return
            const index = Math.min(items.length - 1, Math.max(0, Math.round(list.scrollTop / ITEM_HEIGHT)))
            if (items[index] && items[index].value !== value) onChange(items[index].value)
        }, SETTLE_MS)
    }

    function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
        const step = event.key === 'ArrowDown' ? 1 : event.key === 'ArrowUp' ? -1 : 0
        if (!step) return
        event.preventDefault()
        const next = items[selectedIndex + step]
        if (next) onChange(next.value)
    }

    return (
        <div className={cn('relative h-50', className)}>
            {/* Markaziy tanlov chizig'i — Telegramdagi kabi ikki ingichka chiziq */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-20 h-10 border-y border-accent/60 bg-accent-soft/40"
            />
            <div
                ref={listRef}
                role="listbox"
                aria-label={label}
                tabIndex={0}
                onScroll={handleScroll}
                onKeyDown={handleKeyDown}
                className={cn(
                    'relative h-full snap-y snap-mandatory overflow-y-auto overscroll-contain py-20',
                    '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
                    // Tepa va past xiralashadi — markaz ko'zga tashlanadi
                    '[mask-image:linear-gradient(to_bottom,transparent,black_35%,black_65%,transparent)]',
                    'focus-visible:outline-2 focus-visible:outline-accent'
                )}
            >
                {items.map((item, index) => (
                    <div
                        key={item.value}
                        role="option"
                        aria-selected={index === selectedIndex}
                        onClick={() => onChange(item.value)}
                        className={cn(
                            'flex h-10 cursor-pointer snap-center items-center justify-center text-base tabular-nums whitespace-nowrap transition-colors',
                            index === selectedIndex ? 'font-semibold text-fg' : 'text-fg-faint'
                        )}
                    >
                        {item.label}
                    </div>
                ))}
            </div>
        </div>
    )
}
