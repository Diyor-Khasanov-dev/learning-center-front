import { useT } from '@/shared/i18n'
import { Button, Modal } from '@/shared/ui'

export interface CreatedCredentials {
    fullName?: string
    phone?: string
    /**
     * Backenddagi `UserCreatedResponseDto.temporaryPassword`. Ilgari bu yerda
     * `password` kutilardi — nom mos kelmagani uchun o'qituvchi/o'quvchi
     * yaratilganda parol oynasi hech qachon chiqmasdi.
     */
    temporaryPassword?: string
}

/**
 * Yangi yaratilgan odamning kirish ma'lumotlari.
 *
 * Parolni backend generatsiya qiladi va u FAQAT SHU JAVOBDA keladi —
 * boshqa hech qayerda saqlanmaydi va qayta ko'rsatilmaydi. Shuning uchun
 * oyna ataylab bosqichli: administrator yopishdan oldin ko'chirib olishi
 * kerakligi aytiladi.
 */
export function CredentialsModal({
    credentials,
    onClose,
}: {
    credentials: CreatedCredentials
    onClose: () => void
}) {
    const { t } = useT()

    return (
        <Modal eyebrow={t('credentials.eyebrow')} title={t('credentials.title')} onClose={onClose}>
            <p className="mb-4 text-sm leading-snug text-fg-muted">{t('credentials.warning')}</p>

            <dl className="flex flex-col gap-2.5 rounded-lg border border-border-base bg-surface-soft p-4">
                {credentials.fullName && (
                    <div className="flex items-baseline justify-between gap-3">
                        <dt className="text-sm text-fg-muted">{t('field.fullName')}</dt>
                        <dd className="font-medium text-fg">{credentials.fullName}</dd>
                    </div>
                )}
                <div className="flex items-baseline justify-between gap-3">
                    <dt className="text-sm text-fg-muted">{t('field.phone')}</dt>
                    <dd className="font-mono font-medium text-fg">{credentials.phone}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-3 border-t border-border-base pt-2.5">
                    <dt className="text-sm text-fg-muted">{t('auth.password')}</dt>
                    {/* Tanlash oson bo'lishi uchun katta va monoshrift: bu matn
                        qo'lda ko'chiriladi yoki og'zaki aytiladi. */}
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
