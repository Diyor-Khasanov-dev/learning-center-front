import type { SelectOption } from '@/shared/ui'

/**
 * Bo'sh o'qituvchilar ro'yxatiga guruhning HOZIRGI o'qituvchisini qo'shadi.
 *
 * Tahrirlashda backend joriy o'qituvchini "band" deb hisoblaydi — u shu
 * guruhning o'zi bilan band. Qo'shilmasa, tanlagich bo'sh ko'rinadi va
 * saqlashda o'qituvchi jimgina almashib ketishi mumkin edi.
 */
export function withCurrentTeacher(
    free: SelectOption[],
    currentTeacherId: string,
    allTeachers: SelectOption[]
): SelectOption[] {
    if (!currentTeacherId || free.some((item) => item.value === currentTeacherId)) return free
    const current = allTeachers.find((item) => item.value === currentTeacherId)
    return current ? [current, ...free] : free
}
