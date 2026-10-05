import { useEffect, useState } from 'react'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/shared/api'
import type { StudentDto, TransactionType } from '@/shared/types'
import { fetchStudentInvoices, fetchUnpaidInvoices, searchStudents } from '../api/paymentLookupApi'
import { sortInvoicesNewestFirst } from '../lib/pickInvoice'

/** Har harfda so'rov ketmasin — yozib bo'lgach bir marta. */
const SEARCH_DELAY_MS = 300
/** Bitta harf bilan butun bazani tortmaslik uchun. */
export const MIN_SEARCH_LENGTH = 2

function useDebouncedValue(value: string, delay: number) {
    const [debounced, setDebounced] = useState(value)
    useEffect(() => {
        const timer = setTimeout(() => setDebounced(value), delay)
        return () => clearTimeout(timer)
    }, [value, delay])
    return debounced
}

export function useStudentSearch(token: string, search: string) {
    const term = useDebouncedValue(search.trim(), SEARCH_DELAY_MS)
    const enabled = term.length >= MIN_SEARCH_LENGTH

    const query = useQuery({
        queryKey: queryKeys.studentSearch(term),
        queryFn: () => searchStudents(token, term),
        enabled,
        placeholderData: keepPreviousData,
    })

    return {
        students: enabled ? (query.data ?? []) : [],
        // Debounce kutilayotganda ham "qidirilmoqda" — aks holda bir lahza
        // "topilmadi" yozuvi chiqib ketadi.
        isSearching: enabled ? query.isFetching || term !== search.trim() : false,
        error: query.error,
    }
}

export function useStudentInvoices(token: string, student: StudentDto | null, type: TransactionType) {
    const query = useQuery({
        queryKey: queryKeys.studentInvoices(student?.id ?? '', type),
        queryFn: () =>
            type === 'PAID'
                ? fetchUnpaidInvoices(token, (student as StudentDto).id)
                : fetchStudentInvoices(token, student as StudentDto),
        enabled: student != null,
        select: sortInvoicesNewestFirst,
    })
    return { invoices: query.data ?? [], isLoading: query.isLoading, error: query.error }
}
