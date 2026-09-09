/**
 * Backend ImageDto obyektida isMain maydoni yo'q.
 * Shuning uchun rasm asosiy rasm ekanligini frontendda /auth/me orqali
 * kelgan meImageUrl bilan rasmning imageUrl qiymatini solishtirish orqali aniqlaymiz.
 *
 * Kelajakda backend isMain maydonini qo'shsa, faqat shu pure funksiyaning
 * o'zi o'zgartirilishi yetarli bo'ladi.
 */
export function isMainImage(
    image: { imageUrl?: string | null } | null | undefined,
    meImageUrl?: string | null
): boolean {
    if (!image?.imageUrl || !meImageUrl) {
        return false
    }

    const trimmedImage = image.imageUrl.trim()
    const trimmedMe = meImageUrl.trim()

    if (!trimmedImage || !trimmedMe) {
        return false
    }

    return trimmedImage === trimmedMe
}
