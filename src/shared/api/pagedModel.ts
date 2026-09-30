/**
 * Spring Data `PagedModel` (VIA_DTO) javobini frontend kutgan tekis shaklga keltiradi.
 *
 * Backendda `@EnableSpringDataWebSupport(pageSerializationMode = VIA_DTO)`
 * yoqilgan, shuning uchun har bir `Page<T>` shunday keladi:
 *   `{ content: [...], page: { size, number, totalElements, totalPages } }`
 * Frontend esa (`Page<T>`, `src/shared/types/common.ts`) `totalElements` va
 * `totalPages` ni tepa darajadan o'qiydi. Bu yerda tekislanmasa hamma
 * ro'yxatda jami son 0 chiqadi va sahifalash ishlamaydi.
 *
 * Faqat aniq shu shakl o'zgartiriladi: `content` massiv VA `page` ichida son
 * bo'lsa. Boshqa har qanday javob o'zgarishsiz qaytadi.
 */
export function flattenPagedModel(value: unknown): unknown {
    if (typeof value !== 'object' || value === null || Array.isArray(value)) return value

    const record = value as Record<string, unknown>
    const page = record.page
    if (!Array.isArray(record.content) || typeof page !== 'object' || page === null) return value

    const meta = page as Record<string, unknown>
    if (typeof meta.totalElements !== 'number') return value

    return {
        ...record,
        totalElements: meta.totalElements,
        totalPages: typeof meta.totalPages === 'number' ? meta.totalPages : undefined,
    }
}
