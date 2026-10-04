import { useSession } from '@/app/providers/useAuth'
import { useMyOrganization } from '@/shared/hooks'
import { useT } from '@/shared/i18n'
import { formatAmount, formatDate } from '@/shared/lib'
import { Button, Modal } from '@/shared/ui'
import type { InvoiceDto, TransactionDto } from '@/shared/types'
import { PrintIcon } from './PrintIcon'

interface PaymentReceiptModalProps {
    transaction?: TransactionDto | null
    invoice?: InvoiceDto | null
    /** Guruhlar ro'yxati — chekda id emas, nom chiqishi uchun. */
    groupOptions?: { value: string; label: string }[]
    onClose: () => void
}

/**
 * To'lov kvitansiyasi (A5 shaklidagi chek) modali.
 *
 * O'quvchining ismi, guruhi, to'lov summasi, sana, to'lov turi va qolgan
 * balans ma'lumotlarini A5 formatida ko'rsatadi va `window.print()` orqali
 * chop etish imkonini beradi.
 */
export function PaymentReceiptModal({
    transaction,
    invoice,
    groupOptions = [],
    onClose,
}: PaymentReceiptModalProps) {
    const { t } = useT()
    const session = useSession()
    const { data: organization } = useMyOrganization(
        session.token,
        session.claims?.organizationId as string | undefined
    )

    // Tranzaksiya yoki Hisobdan ma'lumotlarni yig'amiz
    const studentName =
        transaction?.user?.userDto?.fullName ||
        transaction?.invoice?.enrollmentDto?.studentFullName ||
        invoice?.enrollmentDto?.studentFullName ||
        '—'

    // `EnrollmentDto` da guruh NOMI yo'q, faqat `groupId`. Uni shundoq
    // chop etsak chekda UUID chiqadi — shuning uchun ro'yxatdan nomini
    // topamiz. Topilmasa qatorni umuman ko'rsatmaymiz: bo'sh joy
    // tushunarsiz identifikatordan yaxshiroq.
    const groupId = transaction?.invoice?.enrollmentDto?.groupId || invoice?.enrollmentDto?.groupId
    const groupName = groupOptions.find((option) => option.value === groupId)?.label

    const amount = transaction?.amount ?? invoice?.amount
    const formattedAmount = formatAmount(amount)

    const dateStr = transaction?.createdAt || invoice?.issuedAt
    const formattedDate = dateStr ? formatDate(dateStr) : '—'

    // To'lov turi
    let paymentMethod = '—'
    if (transaction?.type) {
        if (transaction.type === 'PAID') paymentMethod = t('transaction.type.PAID')
        else if (transaction.type === 'REFUND') paymentMethod = t('transaction.type.REFUND')
        else if (transaction.type === 'MONTHLY_FEE') paymentMethod = t('transaction.type.MONTHLY_FEE')
        else if (transaction.type === 'CORRECTION') paymentMethod = t('transaction.type.CORRECTION')
    } else if (invoice?.paymentStatus) {
        paymentMethod = t(`invoice.status.${invoice.paymentStatus}`)
    }

    // Qolgan balans (faqat o'quvchi obyektida bo'ladi)
    const balance = transaction?.user?.balance
    const formattedBalance = balance !== undefined && balance !== null ? formatAmount(balance) : '—'

    function handlePrint() {
        window.print()
    }


    return (
        <Modal
            eyebrow={t('transaction.eyebrow')}
            title={t('transaction.receiptTitle')}
            onClose={onClose}
        >
            <style>{`
                @media print {
                    body * {
                        visibility: hidden !important;
                    }
                    #payment-receipt-print-area, #payment-receipt-print-area * {
                        visibility: visible !important;
                    }
                    #payment-receipt-print-area {
                        position: absolute !important;
                        left: 0 !important;
                        top: 0 !important;
                        width: 148mm !important;
                        min-height: 210mm !important;
                        padding: 15mm !important;
                        margin: 0 !important;
                        background: #ffffff !important;
                        color: #000000 !important;
                        box-shadow: none !important;
                        border: 1px solid #cccccc !important;
                    }
                    @page {
                        size: A5 portrait;
                        margin: 0;
                    }
                }
            `}</style>

            <div
                id="payment-receipt-print-area"
                className="my-2 rounded-lg border border-border-base bg-surface-card p-5 shadow-sm text-fg"
            >
                {/* Chek sarlavhasi */}
                <div className="border-b border-border-base pb-3 mb-4 text-center">
                    <p className="text-xs font-semibold tracking-wider text-fg-muted uppercase">
                        {organization?.name || t('transaction.receiptEyebrow')}
                    </p>
                    <h3 className="text-lg font-bold font-display text-fg mt-0.5">
                        {t('transaction.receiptTitle').toUpperCase()}
                    </h3>
                    {(transaction?.id || invoice?.invoiceNumber) && (
                        <p className="text-[0.75rem] font-mono text-fg-muted mt-1">
                            № {transaction?.invoice?.invoiceNumber || invoice?.invoiceNumber || transaction?.id?.slice(0, 8)}
                        </p>
                    )}
                </div>

                {/* Kvitansiya tafsilotlari */}
                <div className="flex flex-col gap-2.5 text-sm">
                    <div className="flex justify-between items-center py-1 border-b border-border-base/50">
                        <span className="text-fg-muted font-medium">{t('invoice.student')}:</span>
                        <span className="font-semibold text-fg text-right">{studentName}</span>
                    </div>

                    {groupName && (
                        <div className="flex justify-between items-center py-1 border-b border-border-base/50">
                            <span className="text-fg-muted font-medium">
                                {t('invoice.createForGroup')}:
                            </span>
                            <span className="font-semibold text-fg text-right">{groupName}</span>
                        </div>
                    )}

                    <div className="flex justify-between items-center py-1 border-b border-border-base/50">
                        <span className="text-fg-muted font-medium">{t('transaction.type')}:</span>
                        <span className="font-medium text-fg text-right">{paymentMethod}</span>
                    </div>

                    <div className="flex justify-between items-center py-1 border-b border-border-base/50">
                        <span className="text-fg-muted font-medium">{t('transaction.date')}:</span>
                        <span className="font-medium text-fg text-right">{formattedDate}</span>
                    </div>

                    <div className="flex justify-between items-center py-1 border-b border-border-base/50">
                        <span className="text-fg-muted font-medium">{t('invoice.amount')}:</span>
                        <span className="font-bold text-fg text-right tabular-nums text-base">{formattedAmount}</span>
                    </div>

                    <div className="flex justify-between items-center py-1 pt-2">
                        <span className="text-fg-muted font-medium">{t('transaction.remainingBalance')}:</span>
                        <span className="font-semibold text-fg text-right tabular-nums">{formattedBalance}</span>
                    </div>
                </div>
            </div>

            <div className="mt-5 flex justify-end gap-2.5">
                <Button onClick={onClose}>{t('common.close')}</Button>
                <Button variant="primary" onClick={handlePrint} className="gap-1.5">
                    <PrintIcon />
                    {t('common.print')}
                </Button>
            </div>
        </Modal>
    )
}
