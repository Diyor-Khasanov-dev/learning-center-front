import { MutationCache, QueryClient } from '@tanstack/react-query'
import { ApiError } from '@/shared/api'
import { showErrorToast } from '@/shared/ui'

/**
 * QueryClient komponent ichida yaratiladi (modul darajasida emas), aks holda
 * testlar bir-birining cache'ini meros qilib oladi.
 *
 * Har qanday saqlash (mutatsiya) xatosi o'ng yuqori burchakda qizil xabar
 * bo'lib chiqadi — bitta joyda, aks holda har ekran xatoni o'zicha va
 * ba'zan ochiq oynaning ORQASIDA ko'rsatardi. Xatoni o'zi yaxshiroq
 * ko'rsatadigan mutatsiya `meta: { toast: false }` bilan chiqib ketadi.
 */
export function createQueryClient() {
    return new QueryClient({
        mutationCache: new MutationCache({
            onError: (error, _variables, _context, mutation) => {
                if (mutation.meta?.toast === false) return
                showErrorToast(error)
            },
        }),
        defaultOptions: {
            queries: {
                // 30s — jadvalni har fokusda qayta yuklamaslik uchun yetarli,
                // lekin ma'lumot eskirib ketmaydigan darajada qisqa.
                staleTime: 30_000,
                retry: (failureCount, error) => {
                    // 4xx ni qayta urinish mantiqsiz: javob o'zgarmaydi.
                    if (error instanceof ApiError && error.status < 500) return false
                    return failureCount < 2
                },
            },
        },
    })
}
