import { useT } from '@/shared/i18n'
import { Select } from '@/shared/ui'
import { composeTime, HOURS, MINUTES, snapTime } from '../lib/timeStep'

interface TimeSelectProps {
    value: string
    onChange: (value: string) => void
    /** Maydon nomi — ekran o'quvchi "Boshlanish vaqti, soat" deb o'qiydi. */
    label: string
}

/** 24 soatlik soat + 10 daqiqalik qadam. Qiymat — "HH:mm" yoki ''. */
export function TimeSelect({ value, onChange, label }: TimeSelectProps) {
    const { t } = useT()
    const [hour = '', minute = ''] = snapTime(value).split(':')

    return (
        <div className="flex items-center gap-2">
            <Select
                aria-label={`${label}, ${t('field.hour')}`}
                placeholder="--"
                options={HOURS.map((item) => ({ value: item, label: item }))}
                value={hour}
                onChange={(event) => onChange(composeTime(event.target.value, minute))}
            />
            <span className="font-semibold text-fg-muted">:</span>
            <Select
                aria-label={`${label}, ${t('field.minute')}`}
                placeholder="--"
                disabled={!hour}
                options={MINUTES.map((item) => ({ value: item, label: item }))}
                value={minute}
                onChange={(event) => onChange(composeTime(hour, event.target.value))}
            />
        </div>
    )
}
