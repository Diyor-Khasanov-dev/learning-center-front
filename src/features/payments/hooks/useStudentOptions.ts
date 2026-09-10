import { useQuery } from '@tanstack/react-query'
import { fetchStudentOptions } from '../api/invoiceApi'

/**
 * To'lov formasidagi o'quvchi ro'yxati.
 *
 * `enabled` — bu so'rov 200 ta o'quvchini yuklaydi va u faqat forma
 * ochilganda kerak. Ilgari jadval ham undan ism olardi, shuning uchun
 * sahifa ochilishi bilan yuklanardi; endi hisob javobida ism bor.
 */
export function useStudentOptions(token: string, enabled = true) {
    const query = useQuery({
        queryKey: ['student', 'options'] as const,
        queryFn: () => fetchStudentOptions(token),
        enabled,
        staleTime: 5 * 60_000,
    })
    return query.data ?? []
}
