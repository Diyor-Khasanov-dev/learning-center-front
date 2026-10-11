import type { ComponentType } from 'react'
import type { TranslationKey } from '@/shared/i18n'
import { BuildingIcon, ChartIcon, LayersIcon, ShieldIcon, TeacherIcon, UsersIcon } from '@/shared/ui'

export type SuperAdminSection = 'analytics' | 'students' | 'teachers' | 'administrators' | 'branches' | 'organization'

export interface SectionItem {
    key: SuperAdminSection
    labelKey: TranslationKey
    Icon: ComponentType
}

/**
 * Bo'limlar ikki guruhga bo'lingan: odamlar va sozlama.
 *
 * Tashkilotlar RO'YXATI ataylab yo'q — super-admin bitta markazning egasi
 * va boshqalarnikini ko'rmasligi kerak. "Tashkilot" bo'limi faqat o'zinikini
 * ochadi.
 */
export const PEOPLE_SECTIONS: SectionItem[] = [
    { key: 'analytics', labelKey: 'superAdmin.section.analytics', Icon: ChartIcon },
    { key: 'students', labelKey: 'superAdmin.section.students', Icon: UsersIcon },
    { key: 'teachers', labelKey: 'superAdmin.section.teachers', Icon: TeacherIcon },
    { key: 'administrators', labelKey: 'superAdmin.section.administrators', Icon: ShieldIcon },
]

export const SETTINGS_SECTIONS: SectionItem[] = [
    { key: 'branches', labelKey: 'superAdmin.section.branches', Icon: LayersIcon },
    { key: 'organization', labelKey: 'superAdmin.section.organization', Icon: BuildingIcon },
]
