import { useT } from '@/shared/i18n'
import { Button } from './Button'

/** "Oldingi qoralama tiklandi · Tozalash" — oyna tepasida. */
export function DraftRestoredNotice({ onReset }: { onReset: () => void }) {
    const { t } = useT()
    return (
        <div className="mb-4 flex items-center justify-between gap-3 rounded-lg bg-accent-soft/60 px-3 py-2 text-xs text-fg-muted">
            <span>{t('draft.restored')}</span>
            <button type="button" onClick={onReset} className="cursor-pointer font-semibold text-accent hover:underline">
                {t('draft.clear')}
            </button>
        </div>
    )
}

interface DraftConfirmProps {
    onDiscard: () => void
    onKeep: () => void
}

/**
 * Tasodifiy yopishda so'rov. Oyna pastiga yopishib turadi (`sticky`):
 * uzun formada ham ko'zdan chetda qolmaydi.
 */
export function DraftConfirm({ onDiscard, onKeep }: DraftConfirmProps) {
    const { t } = useT()
    return (
        <div
            role="alertdialog"
            aria-label={t('draft.confirmTitle')}
            className="sticky bottom-0 mt-4 rounded-lg border border-warning/50 bg-surface-card p-4 shadow-[var(--shadow-card)]"
        >
            <p className="text-sm font-semibold text-fg">{t('draft.confirmTitle')}</p>
            <p className="mt-1 text-xs leading-relaxed text-fg-muted">{t('draft.confirmText')}</p>
            <div className="mt-3 flex flex-wrap justify-end gap-2.5">
                <Button variant="danger" onClick={onDiscard}>
                    {t('draft.discard')}
                </Button>
                <Button variant="primary" autoFocus onClick={onKeep}>
                    {t('draft.save')}
                </Button>
            </div>
        </div>
    )
}
