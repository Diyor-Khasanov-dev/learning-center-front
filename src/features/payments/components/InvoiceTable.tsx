import { useT } from '@/shared/i18n'
import { formatAmount, formatDate } from '@/shared/lib'
import { Badge, DataTable, IconButton, TrashIcon } from '@/shared/ui'
import type { BadgeTone, DataTableColumn } from '@/shared/ui'
import type { InvoiceDto, InvoiceStatus } from '@/shared/types'

const STATUS_TONE: Record<InvoiceStatus, BadgeTone> = {
    PAID: 'success',
    PENDING: 'warning',
    OVERDUE: 'danger',
}

interface InvoiceTableProps {
    invoices: InvoiceDto[]
    isLoading: boolean
    onDelete: (invoice: InvoiceDto) => void
}

export function InvoiceTable({ invoices, isLoading, onDelete }: InvoiceTableProps) {
    const { t } = useT()

    const columns: DataTableColumn<InvoiceDto>[] = [
        {
            key: 'invoiceNumber',
            header: t('invoice.number'),
            className: 'font-mono text-xs text-fg-muted',
            render: (invoice) => invoice.invoiceNumber ?? '—',
        },
        {
            key: 'student',
            header: t('invoice.student'),
            // Ism javobning o'zida keladi. Ilgari u yo'q edi va jadval uni
            // topish uchun butun o'quvchilar ro'yxatini yuklardi.
            render: (invoice) => invoice.enrollmentDto?.studentFullName ?? '—',
        },
        {
            key: 'amount',
            header: t('invoice.amount'),
            align: 'right',
            className: 'tabular-nums',
            render: (invoice) => formatAmount(invoice.amount),
        },
        {
            key: 'paymentStatus',
            header: t('field.status'),
            render: (invoice) =>
                invoice.paymentStatus ? (
                    <Badge tone={STATUS_TONE[invoice.paymentStatus]}>
                        {t(`invoice.status.${invoice.paymentStatus}`)}
                    </Badge>
                ) : (
                    '—'
                ),
        },
        {
            key: 'issuedAt',
            header: t('invoice.issuedAt'),
            render: (invoice) => formatDate(invoice.issuedAt) || '—',
        },
    ]

    return (
        <DataTable
            rows={invoices}
            columns={columns}
            isLoading={isLoading}
            loadingText={t('common.loading')}
            emptyText={t('invoice.empty')}
            getRowKey={(invoice) => invoice.id}
            actionsHeader={t('admin.actions')}
            renderActions={(invoice) => (
                <IconButton label={t('common.delete')} tone="danger" onClick={() => onDelete(invoice)}>
                    <TrashIcon />
                </IconButton>
            )}
        />
    )
}
