import { useEffect, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { Eyebrow } from './Eyebrow'

interface ModalProps {
    /** Sarlavha ustidagi kichik yozuv, masalan "NEW RECORD". */
    eyebrow?: string
    title: ReactNode
    onClose: () => void
    children: ReactNode
    /** Pastdagi tugmalar qatori. */
    footer?: ReactNode
    /** Modalning kenglik klassi (standart: `max-w-md`). */
    maxWidth?: string
}

/**
 * Modal oyna.
 *
 * Uch xil yopilish yo'li bor va uchalasi ham kerak: Escape (klaviatura),
 * fon bosilishi (sichqoncha) va tugma. Ichki bosishlar `stopPropagation`
 * bilan to'xtatiladi, aks holda formaning har bosilishi oynani yopib yuboradi.
 *
 * `document.body` ga portal bilan chiqariladi: `Panel` dagi `backdrop-blur`
 * (`backdrop-filter`) `fixed` elementni butun ekranga emas, panelning o'ziga
 * bog'lab qo'yadi. Portalsiz panel ichida ochilgan oyna panel o'lchamida
 * qolib, tepasi yuqori panel ostida qirqilardi (o'lchangan: 1280×900 ekranda
 * fon 982×308 chiqqan).
 */
export function Modal({ eyebrow, title, onClose, children, footer, maxWidth = 'max-w-md' }: ModalProps) {
    useEffect(() => {
        function handleKey(event: KeyboardEvent) {
            if (event.key === 'Escape') onClose()
        }
        document.addEventListener('keydown', handleKey)
        return () => document.removeEventListener('keydown', handleKey)
    }, [onClose])

    return createPortal(
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 sm:p-5 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                role="dialog"
                aria-modal="true"
                className={`max-h-[88vh] w-full ${maxWidth} overflow-y-auto rounded-xl border border-border-base bg-surface-card/88 p-5 sm:p-7 shadow-[0_28px_80px_-32px_var(--fg)] backdrop-blur-xl`}
                onClick={(event) => event.stopPropagation()}
            >
                {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
                <h2 className="mt-1 mb-4 font-display text-xl font-semibold text-fg">{title}</h2>
                {children}
                {footer && <div className="mt-4 flex justify-end gap-2.5">{footer}</div>}
            </div>
        </div>,
        document.body
    )
}
