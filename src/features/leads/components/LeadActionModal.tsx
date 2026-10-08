import { useState } from 'react'
import { useDraft } from '@/shared/hooks'
import type { LeadDto, LeadRejectDto } from '@/shared/types'
import { REJECTION_REASONS } from '@/shared/types'
import { useT } from '@/shared/i18n'
import { Button, Field, Input, Modal, Select, type SelectOption } from '@/shared/ui'
import { dayLabel, defaultSchedule, isFuture, timeLabel, toCallAt } from '../lib/schedule'
import { ScheduleWheel } from './ScheduleWheel'

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
 * Yozilgani qoralama sifatida saqlanadi (`useDraft`) — sahifa yangilansa ham yo'qolmaydi.
 */
export function LeadActionModal(props: LeadActionModalProps) {
    const { lead, status, groupOptions, isPending, onClose, onEnroll, onReject, onCallLater } = props
    const { t, locale } = useT()
    // Oyna ochilgan payt — g'ildirakdagi "Bugun/Ertaga" va standart vaqt shundan.
    const [now] = useState(() => new Date())
    // Qoralama lid va harakat bo'yicha alohida: boshqa lidni ochganda
    // birovning izohi chiqib qolmasin.
    const draft = useDraft(`lead-action:${lead.id}:${status}`, {
        groupId: '',
        rejectReason: 'OTHER' as LeadRejectDto['reason'],
        rejectNote: '',
        schedule: defaultSchedule(now),
    })
    const { groupId, rejectReason, rejectNote, schedule } = draft.value
    const update = (patch: Partial<typeof draft.value>) => draft.setValue((current) => ({ ...current, ...patch }))
    const isScheduleValid = isFuture(schedule, new Date())
    const scheduleText = `${dayLabel(schedule.day, now, locale, { today: t('lead.today'), tomorrow: t('lead.tomorrow') })}, ${timeLabel(schedule)}`

    function cancel() {
        draft.discard()
        onClose()
    }

    function submitAction() {
        draft.discard()
        if (status === 'ENROLLED' && groupId) {
            onEnroll(groupId)
        } else if (status === 'REJECTED') {
            onReject({ reason: rejectReason, note: rejectNote.trim() || undefined })
        } else if (status === 'CALL_LATER' && isScheduleValid) {
            onCallLater(toCallAt(schedule))
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
            draft={draft}
            footer={
                <>
                    <Button onClick={cancel}>{t('common.cancel')}</Button>
                    <Button
                        variant="primary"
                        onClick={submitAction}
                        disabled={
                            (status === 'ENROLLED' && !groupId) ||
                            (status === 'CALL_LATER' && !isScheduleValid) ||
                            isPending
                        }
                    >
                        {/* Telegramdagidek: tugmaning o'zi qachonga belgilanayotganini aytadi */}
                        {status === 'CALL_LATER' ? t('lead.scheduleFor', { when: scheduleText }) : t('common.save')}
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
                        onChange={(event) => update({ groupId: event.target.value })}
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
                                update({ rejectReason: event.target.value as LeadRejectDto['reason'] })
                            }
                        />
                    </Field>
                    <Field label={t('lead.note')}>
                        <Input
                            aria-label={t('lead.note')}
                            value={rejectNote}
                            onChange={(event) => update({ rejectNote: event.target.value })}
                        />
                    </Field>
                </div>
            )}
            {status === 'CALL_LATER' && (
                <div className="space-y-2">
                    <ScheduleWheel value={schedule} onChange={(next) => update({ schedule: next })} now={now} />
                    {!isScheduleValid && <p className="text-xs text-danger-fg">{t('lead.schedulePast')}</p>}
                </div>
            )}
        </Modal>
    )
}
