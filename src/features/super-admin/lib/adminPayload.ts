import type { AdminPermission, UserCreatePayload } from '@/shared/types'

export interface AdminFormValues {
    fullName: string
    phone: string
    branchId: string
    permissions: AdminPermission[]
}

/**
 * `AdminCreateModal` formasidan `POST /user` tanasiga.
 *
 * `soleBranchId` — filiallar ro'yxatida bitta dona bo'lsa shu yerga
 * keladi va formadagi (yashirilgan, bo'sh) `branchId` o'rnini bosadi.
 * Ikkitadan ko'p bo'lganda `undefined` — administrator o'zi tanlagan
 * qiymat (`values.branchId`) ishlatiladi.
 */
export function buildAdminCreatePayload(
    values: AdminFormValues,
    soleBranchId: string | undefined
): UserCreatePayload {
    return {
        fullName: values.fullName,
        phone: values.phone,
        role: 'ADMINISTRATOR',
        branchId: soleBranchId ?? (values.branchId || undefined),
        permissions: values.permissions,
    }
}
