import type { BadgeTone } from '@/shared/ui'
import type { InvoiceStatus } from '@/shared/types'

/** Hisob holati rangi — jadvalda ham, to'lov formasida ham bir xil bo'lsin. */
export const INVOICE_STATUS_TONE: Record<InvoiceStatus, BadgeTone> = {
    PAID: 'success',
    PENDING: 'warning',
    OVERDUE: 'danger',
}
