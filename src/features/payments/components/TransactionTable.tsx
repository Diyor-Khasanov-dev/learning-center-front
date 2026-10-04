import { useT } from '@/shared/i18n'
import { formatAmount, formatDate } from '@/shared/lib'
import { Badge, DataTable, IconButton, TrashIcon } from '@/shared/ui'
import type { BadgeTone, DataTableColumn } from '@/shared/ui'
import type { TransactionDto, TransactionTypeRead } from '@/shared/types'
import { PrintIcon } from './PrintIcon'

const TYPE_TONE: Record<TransactionTypeRead, BadgeTone> = {
    PAID: 'success',
    REFUND: 'warning',
    MONTHLY_FEE: 'neutral',
    CORRECTION: 'steel',
}

interface TransactionTableProps {
    transactions: TransactionDto[]
    isLoading: boolean
    onDelete: (transaction: TransactionDto) => void
    onPrint?: (transaction: TransactionDto) => void
}

/** To'lov harakatlari: kim, qachon, qancha to'ladi yoki qaytarib oldi. */
export function TransactionTable({ transactions, isLoading, onDelete, onPrint }: TransactionTableProps) {
    const { t } = useT()


    const columns: DataTableColumn<TransactionDto>[] = [
        {
            key: 'createdAt',
            header: t('transaction.date'),
            render: (transaction) => formatDate(transaction.createdAt) || '—',
        },
        {
            key: 'student',
            header: t('invoice.student'),
            render: (transaction) => transaction.user?.userDto?.fullName ?? '—',
        },
        {
            key: 'type',
            header: t('transaction.type'),
            render: (transaction) =>
                transaction.type ? (
                    <Badge tone={TYPE_TONE[transaction.type]}>{t(`transaction.type.${transaction.type}`)}</Badge>
                ) : (
                    '—'
                ),
        },
        {
            key: 'amount',
            header: t('invoice.amount'),
            align: 'right',
            className: 'tabular-nums',
            render: (transaction) => formatAmount(transaction.amount),
        },
        {
            key: 'invoice',
            header: t('invoice.number'),
            className: 'font-mono text-xs text-fg-muted',
            render: (transaction) => transaction.invoice?.invoiceNumber ?? '—',
        },
    ]

    return (
        <DataTable
            rows={transactions}
            columns={columns}
            isLoading={isLoading}
            loadingText={t('common.loading')}
            emptyText={t('transaction.empty')}
            getRowKey={(transaction) => transaction.id}
            actionsHeader={t('admin.actions')}
            renderActions={(transaction) => (
                <div className="flex items-center gap-1">
                    {onPrint && (
                        <IconButton label={t('common.print')} onClick={() => onPrint(transaction)}>
                            <PrintIcon />
                        </IconButton>
                    )}
                    <IconButton label={t('common.delete')} tone="danger" onClick={() => onDelete(transaction)}>
                        <TrashIcon />
                    </IconButton>
                </div>
            )}
        />
    )
}
