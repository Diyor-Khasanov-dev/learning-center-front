import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/shared/api'
import { fetchFreeTeacherOptions } from '../api/adminApi'

/**
 * Guruh yaratish formasida bo'sh o'qituvchilarni olish uchun hook.
 * So'rov faqat dayType, startTime va endTime mavjud bo'lganda va startTime < endTime bo'lganda yuboriladi.
 */
export function useFreeTeacherOptions(
    token: string,
    dayType?: string,
    startTime?: string,
    endTime?: string
) {
    const enabled = Boolean(token && dayType && startTime && endTime && startTime < endTime)

    return useQuery({
        queryKey: queryKeys.freeTeacherOptions(dayType, startTime, endTime),
        queryFn: () => fetchFreeTeacherOptions(token, dayType, startTime, endTime),
        enabled,
        retry: false,
        staleTime: 60_000,
    })
}
