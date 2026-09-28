import { useT } from '@/shared/i18n'
import { Button, Modal } from '@/shared/ui'
import type { UserCreatedResponseDto } from '@/shared/types'

/**
 * Yangi administratorning kirish ma'lumotlari.
 *
 * `admin/components/CredentialsModal.tsx` bilan bir xil vazifa (parol
 * FAQAT shu javobda keladi), lekin bo'limlar bir-biridan import
 * qilmaydi — shuning uchun alohida, kichik nusxa.
 */
export function AdminCredentialsModal({
    credentials,
    onClose,
}: {
    credentials: UserCreatedResponseDto
    onClose: () => void
}) {
    const { t } = useT()

    return (
        <Modal eyebrow={t('credentials.eyebrow')} title={t('credentials.title')} onClose={onClose}>
            <p className="mb-4 text-sm leading-snug text-fg-muted">{t('credentials.warning')}</p>

            <dl className="flex flex-col gap-2.5 rounded-lg border border-border-base bg-surface-soft p-4">
                <div className="flex items-baseline justify-between gap-3">
                    <dt className="text-sm text-fg-muted">{t('field.fullName')}</dt>
                    <dd className="font-medium text-fg">{credentials.fullName}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-3">
                    <dt className="text-sm text-fg-muted">{t('field.phone')}</dt>
                    <dd className="font-mono font-medium text-fg">{credentials.phone}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-3 border-t border-border-base pt-2.5">
                    <dt className="text-sm text-fg-muted">{t('auth.password')}</dt>
                    <dd className="font-mono text-lg font-semibold tracking-wide text-fg select-all">
                        {credentials.temporaryPassword}
                    </dd>
                </div>
            </dl>

            <div className="mt-5 flex justify-end">
                <Button variant="primary" onClick={onClose}>
                    {t('credentials.saved')}
                </Button>
            </div>
        </Modal>
    )
}
