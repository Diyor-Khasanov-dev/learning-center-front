import type { ReactNode } from 'react'
import type { TranslationKey } from '@/shared/i18n'
import { formatDate } from '@/shared/lib'
import { GroupStatusBadge } from '../components/GroupStatusBadge'
import { LessonStatusBadge } from '../components/LessonStatusBadge'
import { PersonCell } from '../components/PersonCell'
import { TimetableCell } from '../components/TimetableCell'
import type { AdminRow, EntityKey } from '../types'

export interface ColumnConfig {
    key: string
    labelKey: TranslationKey
    /** Oddiy qiymat — matnga aylantiriladi. */
    get?: (row: AdminRow) => unknown
    /** Murakkab katak — o'zi JSX qaytaradi. */
    render?: (row: AdminRow) => ReactNode
}

/**
 * O'qituvchining ismi ikki xil shaklda kelishi mumkin: guruhlar ro'yxatida
 * `{ id, name }`, boshqa joyda ichma-ich `TeacherDto`. Ikkalasini shu yerda
 * yechamiz — ustun konfiguratsiyasi bundan xabardor bo'lmasin.
 */
function teacherName(row: AdminRow): string | undefined {
    const teacher = row.teacher
    if (!teacher) return undefined
    if ('userDto' in teacher && teacher.userDto) return teacher.userDto.fullName
    return 'name' in teacher ? teacher.name : undefined
}

/**
 * Ustunlar formadagi maydonlarni takrorlaydi — shunda jadvalda ichma-ich
 * obyektlarning JSON dumpi emas, haqiqiy qiymatlar ko'rinadi.
 *
 * Bu yerda yo'q entity uchun ustunlar mavjud qatorlarning kalitlaridan
 * avtomatik chiqariladi (`inferColumns`).
 */
export const COLUMN_CONFIGS: Partial<Record<EntityKey, ColumnConfig[]>> = {
    students: [
        {
            key: 'fullName',
            labelKey: 'field.fullName',
            get: (row) => row.userDto?.fullName,
            render: (row) => <PersonCell name={row.userDto?.fullName} imageUrl={row.userDto?.imageUrl} />,
        },
        { key: 'phone', labelKey: 'field.phone', get: (row) => row.userDto?.phone },
        { key: 'birthDate', labelKey: 'field.birthDate', get: (row) => row.userDto?.birthDate },
        { key: 'parentPhone', labelKey: 'field.parentPhone', get: (row) => row.parentPhone },
    ],
    teachers: [
        {
            key: 'fullName',
            labelKey: 'field.fullName',
            get: (row) => row.userDto?.fullName,
            render: (row) => <PersonCell name={row.userDto?.fullName} imageUrl={row.userDto?.imageUrl} />,
        },
        { key: 'phone', labelKey: 'field.phone', get: (row) => row.userDto?.phone },
        { key: 'birthDate', labelKey: 'field.birthDate', get: (row) => row.userDto?.birthDate },
    ],
    groups: [
        { key: 'name', labelKey: 'field.groupName', get: (row) => row.name },
        { key: 'level', labelKey: 'field.level', get: (row) => row.levelName },
        { key: 'room', labelKey: 'field.room', get: (row) => row.room },
        { key: 'teacher', labelKey: 'field.teacher', get: (row) => teacherName(row) },
        { key: 'timetable', labelKey: 'field.days', render: (row) => <TimetableCell timeTable={row.timeTable} /> },
        { key: 'startDate', labelKey: 'field.startDate', get: (row) => formatDate(row.startDate) || undefined },
        { key: 'students', labelKey: 'field.studentCount', get: (row) => row.activeStudentsCount },
        { key: 'status', labelKey: 'field.status', render: (row) => <GroupStatusBadge status={row.status} /> },
    ],
    lessons: [
        { key: 'topic', labelKey: 'field.lessonName', get: (row) => row.topic },
        { key: 'lessonDate', labelKey: 'field.lessonDate', get: (row) => formatDate(row.lessonDate) || undefined },
        { key: 'group', labelKey: 'field.groupName', get: (row) => row.group?.name },
        { key: 'teacher', labelKey: 'field.teacher', get: (row) => row.teacherDto?.userDto?.fullName },
        {
            key: 'isComplete',
            labelKey: 'field.lessonStatus',
            render: (row) => <LessonStatusBadge isComplete={row.isComplete} />,
        },
    ],
}

/** Mavjud qatorlardan ustun kalitlarini chiqaradi (konfiguratsiyasiz rejim). */
export function inferColumns(rows: AdminRow[]): string[] {
    const keys = new Set<string>()
    rows.forEach((row) => Object.keys(row).forEach((key) => keys.add(key)))
    keys.delete('id')
    return Array.from(keys)
}
