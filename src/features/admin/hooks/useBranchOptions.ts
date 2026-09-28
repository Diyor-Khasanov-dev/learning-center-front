import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/shared/api'
import { fetchBranchOptions } from '../api/adminApi'

/** Yaratish formasidagi "Filial" tanlagichi uchun variantlar. */
export function useBranchOptions(token: string) {
    const query = useQuery({
        queryKey: queryKeys.branchOptions(),
        queryFn: () => fetchBranchOptions(token),
        // O'qituvchilar/guruhlar ro'yxatidagi kabi: kamdan-kam o'zgaradi.
        staleTime: 5 * 60_000,
    })
    return query.data ?? []
}
