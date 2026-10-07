import type { ReactNode } from 'react'
import { useT } from '@/shared/i18n'
import { BookOpenIcon, FolderIcon, StatCard, TeacherIcon, UsersIcon } from '@/shared/ui'
import type { EntityConfig, EntityKey } from '../types'

/**
 * Har bo'limning belgisi va yumshoq rangi. Ilgari kartaning tepasida
 * to'rt xil yorqin chiziq bor edi — "arzon" ko'rinardi; endi rang faqat
 * kichik ikonka foniga beriladi.
 */
const ENTITY_ICON: Record<EntityKey, { icon: ReactNode; tone: string }> = {
    students: { icon: <UsersIcon />, tone: 'bg-accent-soft text-accent-fg' },
    teachers: { icon: <TeacherIcon />, tone: 'bg-steel-soft text-steel-fg' },
    groups: { icon: <FolderIcon />, tone: 'bg-success-soft text-success-fg' },
    lessons: { icon: <BookOpenIcon />, tone: 'bg-amber-soft text-amber-fg' },
}

interface StatsRowProps {
    entities: EntityConfig[]
    counts: Partial<Record<EntityKey, number | null | undefined>>
}

/**
 * `null` — sonini o'qib bo'lmadi ("—"), `undefined` — hali yuklanmoqda ("···").
 * Ikkalasini ajratish muhim: nol emas, xato ekanini ko'rsatish kerak.
 *
 * O'sish foizi ("+8% bu hafta") ataylab yo'q: backend hozircha oylik
 * dinamikani bermaydi, o'ylab topilgan raqam ko'rsatilmaydi.
 */
export function StatsRow({ entities, counts }: StatsRowProps) {
    const { t } = useT()

    return (
        <div className="mb-6 grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
            {entities.map((entity) => (
                <StatCard
                    key={entity.key}
                    label={t(entity.pluralKey)}
                    icon={ENTITY_ICON[entity.key].icon}
                    tone={ENTITY_ICON[entity.key].tone}
                    value={counts[entity.key] === null ? '—' : (counts[entity.key] ?? '···')}
                />
            ))}
        </div>
    )
}
