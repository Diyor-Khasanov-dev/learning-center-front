import { apiFetch } from '@/shared/api'
import type { ImageDto, Page } from '@/shared/types'

/**
 * Rasm yuklanganda backend qaytaradigan javob shakli.
 * Muhim: backend `imageUrl` kalitida string emas, `ImageDto` obyektini qaytaradi.
 */
export interface UploadImageResponse {
    imageUrl: ImageDto
}

/**
 * Tizimga kirgan foydalanuvchining barcha yuklangan rasmlarini olish.
 * Backend avtomatik tarzda faqat joriy foydalanuvchiga tegishli rasmlarni filtrlaydi.
 */
export function fetchImages(
    token: string,
    params?: { page?: number; size?: number; search?: string }
) {
    return apiFetch<Page<ImageDto>>('/image', { token, params })
}

/**
 * Yangi rasm yuklash.
 * `FormData` obyekti orqali `file` kalitida uzatiladi.
 * `apiFetch` `FormData` berilganda `Content-Type` sarlavhasini avtomatik yechib oladi.
 */
export function uploadImage(token: string, file: File) {
    const formData = new FormData()
    formData.append('file', file)

    return apiFetch<UploadImageResponse>('/image/upload', {
        token,
        method: 'POST',
        body: formData,
    })
}

/**
 * Tanlangan rasmni joriy foydalanuvchining asosiy rasmi (avatar) sifatida belgilash.
 * Backend 204 No Content qaytaradi.
 */
export function setMainImage(token: string, id: string) {
    return apiFetch<void>(`/image/main/${id}`, {
        token,
        method: 'PUT',
    })
}

/**
 * Rasmni o'chirish.
 * Backend talabi: asosiy rasmni o'chirib bo'lmaydi — avval boshqasini asosiy qilish kerak.
 * Backend 204 No Content qaytaradi.
 */
export function deleteImage(token: string, id: string) {
    return apiFetch<void>(`/image/${id}`, {
        token,
        method: 'DELETE',
    })
}
