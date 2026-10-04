import { useState } from 'react'
import type { LeadDto, LeadRejectDto } from '@/shared/types'
import { REJECTION_REASONS } from '@/shared/types'
import { useT } from '@/shared/i18n'
import { Button, Field, Input, Modal, Select, type SelectOption } from '@/shared/ui'

interface LeadActionModalProps {
    lead: LeadDto
    status: 'ENROLLED' | 'REJECTED' | 'CALL_LATER'
    groupOptions: SelectOption[]
    isPending: boolean
    onClose: () => void
    onEnroll: (groupId: string) => void
    onReject: (body: LeadRejectDto) => void
    onCallLater: (callAt: string) => void
}

/**
 * Lid ustida harakat bajarish modali (guruhga yozish, rad etish, keyinroq qo'ng'iroq qilish).
 * Forma holati modal ichida saqlanadi, shunda har safar modal ochilganda eski lid ma'lumotlari tozalanadi.
 */
export function LeadActionModal(props: LeadActionModalProps) {
    const { status, groupOptions, isPending, onClose, onEnroll, onReject, onCallLater } = props
    const { t } = useT()
    // Forma holatlari modal ichida saqlanadi va har gal modal ochilganda boshlang'ich holatga qaytadi
    const [groupId, setGroupId] = useState('')
    const [rejectReason, setRejectReason] = useState<LeadRejectDto['reason']>('OTHER')
    const [rejectNote, setRejectNote] = useState('')
    const [callAt, setCallAt] = useState('')

    function submitAction() {
        if (status === 'ENROLLED' && groupId) {
            onEnroll(groupId)
        } else if (status === 'REJECTED') {
            onReject({ reason: rejectReason, note: rejectNote.trim() || undefined })
        } else if (status === 'CALL_LATER' && callAt) {
            onCallLater(callAt)
        }
    }

    return (
        <Modal
            eyebrow={t('lead.actionEyebrow')}
            title={
                status === 'ENROLLED'
                    ? t('lead.action.ENROLLED')
                    : status === 'REJECTED'
                      ? t('lead.action.REJECTED')
                      : t('lead.action.CALL_LATER')
            }
            onClose={onClose}
            footer={
                <>
                    <Button onClick={onClose}>{t('common.cancel')}</Button>
                    <Button
                        variant="primary"
                        onClick={submitAction}
                        disabled={
                            (status === 'ENROLLED' && !groupId) ||
                            (status === 'CALL_LATER' && !callAt) ||
                            isPending
                        }
                    >
                        {t('common.save')}
                    </Button>
                </>
            }
        >
            {status === 'ENROLLED' && (
                <Field label={t('lead.group')}>
                    <Select
                        aria-label={t('lead.group')}
                        placeholder={t('lead.selectGroup')}
                        value={groupId}
                        options={groupOptions}
                        onChange={(event) => setGroupId(event.target.value)}
                    />
                </Field>
            )}
            {status === 'REJECTED' && (
                <div className="space-y-4">
                    <Field label={t('lead.rejectionReason')}>
                        <Select
                            aria-label={t('lead.rejectionReason')}
                            options={REJECTION_REASONS.map((reason) => ({
                                value: reason,
                                label: t(`lead.reason.${reason}`),
                            }))}
                            value={rejectReason}
                            onChange={(event) =>
                                setRejectReason(event.target.value as LeadRejectDto['reason'])
                            }
                        />
                    </Field>
                    <Field label={t('lead.note')}>
                        <Input
                            aria-label={t('lead.note')}
                            value={rejectNote}
                            onChange={(event) => setRejectNote(event.target.value)}
                        />
                    </Field>
                </div>
            )}
            {status === 'CALL_LATER' && (
                <Field label={t('lead.callAt')}>
                    <Input
                        aria-label={t('lead.callAt')}
                        type="datetime-local"
                        value={callAt}
                        onChange={(event) => setCallAt(event.target.value)}
                        min={new Date().toISOString().slice(0, 16)}
                    />
                </Field>
            )}
        </Modal>
    )
}
