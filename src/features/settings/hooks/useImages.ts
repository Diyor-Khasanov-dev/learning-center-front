import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/shared/api'
import { deleteImage, fetchImages, setMainImage, uploadImage } from '../api/imagesApi'

/**
 * Foydalanuvchining rasmlar ro'yxatini yuklash hooki.
 */
export function useImages(token: string) {
    return useQuery({
        queryKey: queryKeys.images(),
        queryFn: () => fetchImages(token),
        staleTime: 60_000,
    })
}

/**
 * Har bir mutatsiyadan (yuklash, asosiy qilish, o'chirish) keyin
 * ham rasmlar ro'yxatini (`queryKeys.images()`), ham foydalanuvchi profilini (`queryKeys.me()`)
 * keshdan chiqarib yuboramiz (invalidate) — chunki asosiy rasm o'zgarganda
 * tepadagi (header) avatar ham darhol yangilanishi kerak.
 */
function useInvalidateImageQueries() {
    const queryClient = useQueryClient()

    return () => {
        void queryClient.invalidateQueries({ queryKey: queryKeys.images() })
        void queryClient.invalidateQueries({ queryKey: queryKeys.me() })
    }
}

/**
 * Yangi rasm yuklash mutatsiyasi.
 */
export function useUploadImage(token: string) {
    const invalidate = useInvalidateImageQueries()

    return useMutation({
        mutationFn: (file: File) => uploadImage(token, file),
        onSuccess: invalidate,
    })
}

/**
 * Rasmni asosiy deb belgilash mutatsiyasi.
 */
export function useSetMainImage(token: string) {
    const invalidate = useInvalidateImageQueries()

    return useMutation({
        mutationFn: (imageId: string) => setMainImage(token, imageId),
        onSuccess: invalidate,
    })
}

/**
 * Rasmni o'chirish mutatsiyasi.
 */
export function useDeleteImage(token: string) {
    const invalidate = useInvalidateImageQueries()

    return useMutation({
        mutationFn: (imageId: string) => deleteImage(token, imageId),
        onSuccess: invalidate,
    })
}
