import type { CreatedCredentials } from '../components/CredentialsModal'

/**
 * O'qituvchi/o'quvchi yaratish javobidan kirish ma'lumotlarini oladi.
 *
 * Backend (`TeacherCreateResponseDto`, `StudentCreateResponseDto`) parolni
 * `userDto.temporaryPassword` da qaytaradi. Parol bo'lmasa (masalan, bor
 * foydalanuvchi boshqa markazga qo'shilganda) oyna ko'rsatilmaydi.
 */
export function createdCredentials(created: unknown): CreatedCredentials | null {
    const user = (created as { userDto?: CreatedCredentials } | null)?.userDto
    return user?.temporaryPassword ? user : null
}
