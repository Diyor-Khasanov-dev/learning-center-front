import { useSyncExternalStore } from 'react'
import { createPortal } from 'react-dom'
import { errorMessage } from '@/shared/api'
import { useT } from '@/shared/i18n'
import { dismissToast, getToasts, subscribeToasts } from './toastStore'

/**
 * O'ng yuqori burchakdagi qizil xato xabarlari.
 *
 * `document.body` ga portal: oyna (`Modal`) ochiq bo'lsa ham uning USTIDA
 * ko'rinishi kerak — ilgari xato xira fon orqasidagi sahifada chiqib, ko'rinmay
 * qolardi. `z-[60]` — `Modal` (`z-50`) dan baland.
 */
export function Toaster() {
    const { t } = useT()
    const toasts = useSyncExternalStore(subscribeToasts, getToasts, getToasts)

    if (toasts.length === 0) return null

    return createPortal(
        <div className="pointer-events-none fixed inset-x-4 top-4 z-[60] flex flex-col items-end gap-2 sm:inset-x-auto sm:right-4 sm:w-96">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    role="alert"
                    className="pointer-events-auto flex w-full items-start gap-3 rounded-lg bg-danger px-4 py-3 text-sm text-white shadow-lg"
                >
                    <p className="min-w-0 flex-1 leading-snug break-words">
                        {errorMessage(toast.error, t('common.somethingWrong'))}
                    </p>
                    <button
                        type="button"
                        aria-label={t('common.close')}
                        onClick={() => dismissToast(toast.id)}
                        className="shrink-0 cursor-pointer leading-none opacity-80 hover:opacity-100"
                    >
                        ✕
                    </button>
                </div>
            ))}
        </div>,
        document.body
    )
}
