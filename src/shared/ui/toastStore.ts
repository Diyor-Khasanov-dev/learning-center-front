/**
 * Qizil xato xabarlari (toast) uchun kichik global do'kon.
 *
 * Nega React state emas: xabarlar `MutationCache.onError` dan keladi — bu
 * React daraxtidan tashqarida, `QueryClient` yaratilgan joyda. Do'kon
 * `useSyncExternalStore` orqali `Toaster` ga ulanadi.
 *
 * Xabar matni emas, XATONING O'ZI saqlanadi: tarjima (`t`) faqat React
 * ichida bor, shuning uchun matn `Toaster` da chizilayotganda olinadi.
 */
export interface ToastItem {
    id: number
    error: unknown
}

/** Shuncha vaqtdan keyin xabar o'zi yo'qoladi. */
export const TOAST_DURATION_MS = 5_000
/** Bir vaqtda ko'pi bilan shuncha — ketma-ket xatolar ekranni to'ldirmasin. */
export const MAX_TOASTS = 3

let items: ToastItem[] = []
let nextId = 1
const listeners = new Set<() => void>()

function emit() {
    for (const listener of listeners) listener()
}

export function showErrorToast(error: unknown): number {
    const id = nextId++
    items = [...items, { id, error }].slice(-MAX_TOASTS)
    emit()
    setTimeout(() => dismissToast(id), TOAST_DURATION_MS)
    return id
}

export function dismissToast(id: number) {
    const next = items.filter((item) => item.id !== id)
    if (next.length === items.length) return
    items = next
    emit()
}

export function subscribeToasts(listener: () => void) {
    listeners.add(listener)
    return () => {
        listeners.delete(listener)
    }
}

export function getToasts(): ToastItem[] {
    return items
}
