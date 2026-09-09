import type { Role } from './common'

/** `ImageDto` — rasm ma'lumotlari DTO. */
export interface ImageDto {
    id: string
    imageUrl: string
    originalFileName?: string
}

/** `UserDto` — diqqat: maydon nomi `imageUrl` (`imgUrl` emas). */
export interface UserDto {
    id?: string
    /** Foydalanuvchi biriktirilgan filial — sozlamalardagi markaz bloki shuni yuklaydi. */
    branchId?: string
    imageUrl?: string
    fullName?: string
    phone?: string
    /** `LocalDate` — "yyyy-MM-dd". */
    birthDate?: string
    role?: Role
}

/** `PUT /user/{id}` uchun. */
export interface UserUpdatePayload {
    fullName: string
    phone: string
    birthDate: string
}

/** `POST /auth/change-password` uchun. */
export interface ChangePasswordPayload {
    oldPassword: string
    newPassword: string
    confirmPassword: string
}
