import { useT } from '@/shared/i18n'
import type { UserDto } from '@/shared/types'
import { ExistingUserNotice } from './ExistingUserNotice'

interface PhoneLookupHintsProps {
    isLookup: boolean
    found: UserDto | null
    isSearching: boolean
    /** `null` — hali javob yo'q; `'linked'` — tasdiqlangan; `'new'` — rad etilgan. */
    decision: 'linked' | 'new' | null
    onConfirm: () => void
    onReject: () => void
}

/**
 * Telefon maydoni ostidagi xabarlar: "shu odammi?", "ustiga yoziladi",
 * "qidirilmoqda". Maydon ostida turadi — administrator aynan shu yerga
 * qarab turadi.
 */
export function PhoneLookupHints({
    isLookup,
    found,
    isSearching,
    decision,
    onConfirm,
    onReject,
}: PhoneLookupHintsProps) {
    const { t } = useT()

    return (
        <>
            {isLookup && found && decision === null && (
                <ExistingUserNotice user={found} onConfirm={onConfirm} onReject={onReject} />
            )}
            {decision === 'new' && (
                <p className="text-[0.72rem] leading-snug text-fg-faint">{t('lookup.replacing')}</p>
            )}
            {isSearching && <p className="text-[0.72rem] leading-snug text-fg-faint">{t('common.loading')}</p>}
        </>
    )
}
