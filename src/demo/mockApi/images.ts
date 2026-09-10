import type { ImageDto } from '@/shared/types'
import { demoUser, json, nextId, noContent, page, type Row } from './state'

/**
 * Demo rasmlari — `data:` URI ko'rinishida.
 *
 * NEGA tashqi manzil emas: demo backendsiz ishlashi kerak va uni internetsiz
 * noutbukda ham ko'rsatishimiz mumkin. Ilgari bu yerda Unsplash havolalari
 * turgan edi va tarmoq bo'lmaganda galereya siniq rasmlar bilan chiqardi.
 * Shriftlar ham xuddi shu sababdan bundle ichiga solingan.
 */
function swatch(background: string, initials: string): string {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400">
        <rect width="400" height="400" fill="${background}"/>
        <text x="50%" y="50%" dy="0.35em" text-anchor="middle"
              font-family="system-ui, sans-serif" font-size="150" fill="#ffffff">${initials}</text>
    </svg>`
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

export const demoImages: ImageDto[] = [
    { id: 'img-demo-1', imageUrl: swatch('#7c3aed', 'DF'), originalFileName: 'profil-1.svg' },
    { id: 'img-demo-2', imageUrl: swatch('#0f766e', 'DF'), originalFileName: 'profil-2.svg' },
    { id: 'img-demo-3', imageUrl: swatch('#b45309', 'DF'), originalFileName: 'profil-3.svg' },
]

// Demoda boshlang'ich profil rasmi sifatida birinchi rasmni biriktirib qo'yamiz.
if (!demoUser.imageUrl && demoImages[0]) {
    demoUser.imageUrl = demoImages[0].imageUrl
}

export function handleImages(
    path: string,
    method: string,
    url: URL,
    body: Record<string, unknown>
): Response | null {
    if (!path.startsWith('/image')) return null

    // GET /image
    if (path === '/image' && method === 'GET') {
        return page(demoImages as unknown as Row[], url)
    }

    // POST /image/upload
    if (path === '/image/upload' && method === 'POST') {
        const newImage: ImageDto = {
            id: nextId('img-'),
            imageUrl: swatch('#be123c', 'YA'),
            originalFileName: typeof body?.originalFileName === 'string' ? body.originalFileName : 'uploaded-image.jpg',
        }
        demoImages.unshift(newImage)
        demoUser.imageUrl = newImage.imageUrl
        return json({ imageUrl: newImage })
    }

    // PUT /image/main/{id}
    if (path.startsWith('/image/main/') && method === 'PUT') {
        const imageId = path.replace('/image/main/', '')
        const target = demoImages.find((img) => img.id === imageId)
        if (target) {
            demoUser.imageUrl = target.imageUrl
        }
        return noContent()
    }

    // DELETE /image/{id}
    if (path.startsWith('/image/') && method === 'DELETE') {
        const imageId = path.replace('/image/', '')
        const index = demoImages.findIndex((img) => img.id === imageId)
        if (index >= 0) {
            demoImages.splice(index, 1)
        }
        return noContent()
    }

    return null
}
