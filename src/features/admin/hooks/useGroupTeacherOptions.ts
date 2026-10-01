import type { SelectOption } from '@/shared/ui'
import { withCurrentTeacher } from '../lib/teacherOptions'
import type { FormValues, ModalMode } from '../types'
import { useFreeTeacherOptions } from './useFreeTeacherOptions'

function asString(value: unknown): string | undefined {
    return typeof value === 'string' ? value : undefined
}

/**
 * Guruh formasidagi o'qituvchi tanlagichi uchun variantlar.
 *
 * Kun turi va vaqt tanlangach — faqat shu vaqtda bo'sh o'qituvchilar.
 * Vaqt hali tanlanmagan yoki so'rov xato bergan bo'lsa — umumiy ro'yxat:
 * guruh yaratish hech qachon bloklanmasligi kerak.
 */
export function useGroupTeacherOptions(
    token: string,
    mode: ModalMode,
    values: FormValues,
    initialValues: FormValues,
    teacherOptions: SelectOption[]
): SelectOption[] {
    const query = useFreeTeacherOptions(
        token,
        asString(values.dayType),
        asString(values.startTime),
        asString(values.endTime)
    )

    if (!query.isSuccess || !Array.isArray(query.data)) return teacherOptions

    const currentTeacherId = mode === 'edit' ? (asString(initialValues.teacherId) ?? '') : ''
    return withCurrentTeacher(query.data, currentTeacherId, teacherOptions)
}
