import { useT } from '@/shared/i18n'
import { Button, Modal } from '@/shared/ui'

interface NoFieldsModalProps {
    eyebrow: string
    title: string
    onClose: () => void
}

/** Bo'limda tahrirlanadigan maydon yo'q — forma o'rniga tushuntirish. */
export function NoFieldsModal({ eyebrow, title, onClose }: NoFieldsModalProps) {
    const { t } = useT()
    return (
        <Modal
            eyebrow={eyebrow}
            title={title}
            onClose={onClose}
            footer={<Button onClick={onClose}>{t('common.close')}</Button>}
        >
            <p className="text-sm leading-relaxed text-fg-muted">{t('admin.noFields')}</p>
        </Modal>
    )
}
