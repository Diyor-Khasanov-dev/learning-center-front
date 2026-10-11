import { createElement } from 'react'
import { useT } from '@/shared/i18n'
import type { NavSection } from '@/shared/ui'
import { PEOPLE_SECTIONS, SETTINGS_SECTIONS, type SectionItem, type SuperAdminSection } from '../lib/sections'

/** Super-admin bo'limlari umumiy chap menyu (`AppShell` `nav`) uchun. */
export function useSuperAdminNav(
    active: SuperAdminSection,
    onChange: (section: SuperAdminSection) => void,
    needsAttention: SuperAdminSection[],
    lockedTo?: SuperAdminSection
): NavSection[] {
    const { t } = useT()
    const toItem = (item: SectionItem) => ({
        key: item.key,
        label: t(item.labelKey),
        icon: createElement(item.Icon),
        active: item.key === active,
        // Filial yo'q bo'lsa qolgan bo'limlar ochilmaydi
        disabled: lockedTo !== undefined && item.key !== lockedTo,
        dot: needsAttention.includes(item.key),
        onClick: () => onChange(item.key),
    })
    return [
        { key: 'people', label: t('superAdmin.group.people'), items: PEOPLE_SECTIONS.map(toItem) },
        { key: 'settings', label: t('superAdmin.group.settings'), items: SETTINGS_SECTIONS.map(toItem) },
    ]
}
