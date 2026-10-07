import { useMemo } from 'react'
import { useT } from '@/shared/i18n'
import { buildDayKeys, dayLabel, type Schedule } from '../lib/schedule'
import { WheelColumn } from './WheelColumn'

const HOURS = Array.from({ length: 24 }, (_, hour) => ({ value: hour, label: String(hour).padStart(2, '0') }))
const MINUTES = Array.from({ length: 60 }, (_, minute) => ({ value: minute, label: String(minute).padStart(2, '0') }))

interface ScheduleWheelProps {
    value: Schedule
    onChange: (value: Schedule) => void
    now: Date
}

/** Kun · soat · daqiqa — uchta g'ildirak yonma-yon (yil ko'rsatilmaydi). */
export function ScheduleWheel({ value, onChange, now }: ScheduleWheelProps) {
    const { t, locale } = useT()
    const days = useMemo(
        () =>
            buildDayKeys(now).map((key) => ({
                value: key,
                label: dayLabel(key, now, locale, { today: t('lead.today'), tomorrow: t('lead.tomorrow') }),
            })),
        [now, locale, t]
    )

    return (
        <div className="grid grid-cols-[1fr_4.5rem_4.5rem] gap-1 rounded-2xl border border-border-base bg-surface-muted/50 px-2">
            <WheelColumn label={t('lead.day')} items={days} value={value.day} onChange={(day) => onChange({ ...value, day })} />
            <WheelColumn label={t('field.hour')} items={HOURS} value={value.hour} onChange={(hour) => onChange({ ...value, hour })} />
            <WheelColumn label={t('field.minute')} items={MINUTES} value={value.minute} onChange={(minute) => onChange({ ...value, minute })} />
        </div>
    )
}
