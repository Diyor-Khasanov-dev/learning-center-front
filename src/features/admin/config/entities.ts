import type { EntityConfig, EntityKey } from '../types'

/** Chap ustundagi bo'limlar va ularga tegishli endpoint'lar. */
export const ENTITIES: EntityConfig[] = [
    { key: 'students', pluralKey: 'entity.students.plural', singularKey: 'entity.students.singular', endpoint: '/student', permission: 'STUDENT_MANAGEMENT' },
    { key: 'teachers', pluralKey: 'entity.teachers.plural', singularKey: 'entity.teachers.singular', endpoint: '/teacher', permission: 'TEACHER_MANAGEMENT' },
    { key: 'groups', pluralKey: 'entity.groups.plural', singularKey: 'entity.groups.singular', endpoint: '/group' },
    { key: 'lessons', pluralKey: 'entity.lessons.plural', singularKey: 'entity.lessons.singular', endpoint: '/lesson' },
]

export function entityByKey(key: EntityKey): EntityConfig {
    // `!` — key tipi EntityKey, ya'ni ro'yxatda albatta bor.
    return ENTITIES.find((entity) => entity.key === key)!
}

export const PAGE_SIZE = 10
