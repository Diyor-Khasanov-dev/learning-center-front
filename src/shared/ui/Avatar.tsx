import { useState } from 'react'
import { cn, initials } from '@/shared/lib'

interface AvatarProps {
    name?: string
    src?: string
    size?: 'sm' | 'md' | 'lg'
    /** `initials` — ism bosh harflari (standart), `silhouette` — jinsni bildirmaydigan neytral siymo. */
    fallback?: 'initials' | 'silhouette'
    /**
     * Ismga qarab yumshoq rang tanlanadi (jadvallarda). Bir xil odam doim
     * bir xil rangda — ro'yxatda ko'z bilan topish oson bo'ladi.
     */
    colorful?: boolean
}

const COLORFUL_TONES = [
    'bg-accent-soft text-accent-fg',
    'bg-steel-soft text-steel-fg',
    'bg-success-soft text-success-fg',
    'bg-amber-soft text-amber-fg',
    'bg-danger-soft text-danger-fg',
] as const

function toneFor(name = ''): string {
    let hash = 0
    for (const char of name) hash = (hash * 31 + char.charCodeAt(0)) >>> 0
    return COLORFUL_TONES[hash % COLORFUL_TONES.length]
}

// `sm` — jadval qatori uchun: kattaroq rasm qatorni cho'zib yuboradi va
// ekranga sig'adigan o'quvchi soni kamayadi.
const SIZE_CLASSES = { sm: 'size-8 text-xs', md: 'size-11 text-sm', lg: 'size-13 text-base' } as const

/** Bosh va yelka — jinsni bildirmaydigan neytral siluet, `currentColor` bilan chiziladi. */
function SilhouetteIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-3/5 w-3/5">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20a8 8 0 0 1 16 0z" />
        </svg>
    )
}

/**
 * Rasm bo'lsa rasm, bo'lmasa `fallback` ga qarab bosh harflar yoki siluet.
 *
 * Rasm YUKLANMAY qolsa ham o'sha zaxira ko'rsatiladi. Bu kerak, chunki
 * `imageUrl` — S3 dagi tashqi manzil: fayl o'chirilgan, tarmoq uzilgan yoki
 * manzil eskirgan bo'lishi mumkin. Busiz foydalanuvchi siniq rasm belgisini
 * ko'radi va bu xatolikdek tuyuladi.
 */
export function Avatar({ name, src, size = 'md', fallback = 'initials', colorful = false }: AvatarProps) {
    const classes = cn('shrink-0 rounded-full', SIZE_CLASSES[size])
    // Bayroq emas, YIQILGAN MANZIL saqlanadi: shunda yangi rasm berilganda
    // holatni effekt bilan tozalash kerak bo'lmaydi, o'zi to'g'ri hisoblanadi.
    const [failedSrc, setFailedSrc] = useState<string>()

    if (src && failedSrc !== src) {
        return (
            <img
                src={src}
                alt=""
                onError={() => setFailedSrc(src)}
                className={cn(classes, 'object-cover ring-1 ring-border-base')}
            />
        )
    }

    return (
        <div
            className={cn(
                classes,
                'flex items-center justify-center font-display font-bold ring-1 ring-border-base',
                colorful ? toneFor(name) : 'bg-brand text-brand-fg'
            )}
        >
            {fallback === 'silhouette' ? <SilhouetteIcon /> : initials(name)}
        </div>
    )
}
