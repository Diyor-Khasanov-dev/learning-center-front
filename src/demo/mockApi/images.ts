import type { ImageDto } from '@/shared/types'
import { demoUser, json, nextId, noContent, page, type Row } from './state'

/** Predefined demo rasmlari */
export const mockImages: ImageDto[] = [
    {
        id: 'img-demo-1',
        imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        originalFileName: 'avatar-main.jpg',
    },
    {
        id: 'img-demo-2',
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
        originalFileName: 'profile-alt.jpg',
    },
    {
        id: 'img-demo-3',
        imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
        originalFileName: 'portrait.jpg',
    },
]

// Demo davomida foydalanuvchi asosiy rasmini birinchi rasm qilib qo'yamiz
if (!demoUser.imageUrl) {
    demoUser.imageUrl = mockImages[0].imageUrl
}

/**
 * Demo rejimida rasmlar bilan ishlash uchun soxta API ishlovchisi.
 */
export function handleImages(path: string, method: string, url: URL): Response | null {
    // GET /image — rasmlar ro'yxatini qaytaradi
    if (path === '/image' && method === 'GET') {
        return page(mockImages as unknown as Row[], url)
    }

    // POST /image/upload — fayl aslida yuklanmaydi, demo uchun yangi yozuv qo'shiladi
    // va avtomatik ravishda asosiy rasmga aylanadi.
    if (path === '/image/upload' && method === 'POST') {
        const sampleUrls = [
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
            'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80',
            'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80',
        ]
        const randomUrl = sampleUrls[Math.floor(Math.random() * sampleUrls.length)]
        const newImage: ImageDto = {
            id: nextId('img-'),
            imageUrl: randomUrl,
            originalFileName: `uploaded-${Date.now()}.jpg`,
        }

        mockImages.unshift(newImage)
        // Uploaded image automatically becomes the main image
        demoUser.imageUrl = newImage.imageUrl

        return json({ imageUrl: newImage })
    }

    // PUT /image/main/{id} — tanlangan rasmni asosiy deb belgilash
    if (path.startsWith('/image/main/') && method === 'PUT') {
        const id = path.replace('/image/main/', '')
        const targetImage = mockImages.find((img) => img.id === id)
        if (targetImage) {
            demoUser.imageUrl = targetImage.imageUrl
        }
        return noContent()
    }

    // DELETE /image/{id} — rasmni o'chirish
    if (path.startsWith('/image/') && method === 'DELETE') {
        const id = path.replace('/image/', '')
        const index = mockImages.findIndex((img) => img.id === id)
        if (index !== -1) {
            mockImages.splice(index, 1)
        }
        return noContent()
    }

    return null
}
