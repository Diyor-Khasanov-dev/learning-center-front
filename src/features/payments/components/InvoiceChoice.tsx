import { useT } from '@/shared/i18n'
import { cn, formatAmount, formatDate } from '@/shared/lib'
import { Badge } from '@/shared/ui'
import type { InvoiceDto } from '@/shared/types'
import { INVOICE_STATUS_TONE } from '../lib/invoiceStatusTone'

interface InvoiceChoiceProps {
    invoices: InvoiceDto[]
    isLoading: boolean
    value: string
    onChange: (invoiceId: string) => void
}

/**
 * O'quvchining hisoblari — radio ro'yxat. Odatda hech narsa bosilmaydi:
 * eng so'nggi mos hisob forma ochilganda o'zi tanlanadi.
 */
export function InvoiceChoice({ invoices, isLoading, value, onChange }: InvoiceChoiceProps) {
    const { t } = useT()

    if (isLoading) return <p className="px-1 text-xs text-fg-muted">{t('transaction.invoicesLoading')}</p>
    if (invoices.length === 0) {
        return <p className="rounded-xl bg-warning-soft px-4 py-3 text-sm text-warning-fg">{t('transaction.noInvoices')}</p>
    }

    return (
        <div role="radiogroup" aria-label={t('transaction.invoice')} className="flex max-h-56 flex-col gap-2 overflow-y-auto">
            {invoices.map((invoice) => (
                <label
                    key={invoice.id}
                    className={cn(
                        'flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-2.5',
                        invoice.id === value ? 'border-accent bg-accent-soft/40' : 'border-border-base hover:bg-surface-hover'
                    )}
                >
                    <input
                        type="radio"
                        name="invoice"
                        value={invoice.id}
                        checked={invoice.id === value}
                        onChange={() => onChange(invoice.id)}
                        className="accent-accent"
                    />
                    <span className="min-w-0 flex-1">
                        <span className="block font-medium text-fg">{invoice.invoiceNumber || invoice.id}</span>
                        <span className="block text-xs whitespace-nowrap text-fg-muted">{formatDate(invoice.issuedAt)}</span>
                    </span>
                    <span className="font-semibold tabular-nums text-fg">{formatAmount(invoice.amount)}</span>
                    {invoice.paymentStatus && (
                        <Badge tone={INVOICE_STATUS_TONE[invoice.paymentStatus]}>
                            {t(`invoice.status.${invoice.paymentStatus}`)}
                        </Badge>
                    )}
                </label>
            ))}
        </div>
    )
}
