import { useMemo, useState } from 'react'
import { useSession } from '@/app/providers/useAuth'
import { errorMessage } from '@/shared/api'
import { useT } from '@/shared/i18n'
import { Button, ErrorBox, Modal, SearchInput } from '@/shared/ui'
import { useEntityList } from '../hooks/useEntityList'
import {
    useAddEnrollment,
    useGroupEnrollments,
    useRemoveEnrollment,
} from '../hooks/useGroupEnrollments'
import { entityByKey } from '../config/entities'
import { RemoveFromGroupForm } from './RemoveFromGroupForm'
import type { AdminRow } from '../types'

/**
 * Guruhga o'quvchi biriktirish va guruhdan chiqarish.
 *
 * Backendda guruh ichida ro'yxat yo'q — `enrollment` ko'prigi orqali
 * bog'lanadi (`api/enrollmentApi.ts` ga qarang).
 */
export function AssignStudentsModal({ group, onClose }: { group: AdminRow; onClose: () => void }) {
    const { t } = useT()
    const session = useSession()
    const [search, setSearch] = useState('')
    // Sabab so'ralayotgan o'quvchi; bo'sh bo'lsa forma ochilmagan.
    const [removingStudentId, setRemovingStudentId] = useState('')

    const students = useEntityList(entityByKey('students'), session.token, { page: 0, search })
    const enrollments = useGroupEnrollments(session.token, group.id)
    const add = useAddEnrollment(session.token, group.id)
    const remove = useRemoveEnrollment(session.token, group.id)

    /** studentId → enrollment id: chiqarish o'sha id bo'yicha ketadi. */
    const enrollmentByStudent = useMemo(() => {
        const map = new Map<string, string | undefined>()
        for (const item of enrollments.data ?? []) {
            if (item.studentId) map.set(item.studentId, item.id)
        }
        return map
    }, [enrollments.data])

    function handleRemove(enrollmentId: string, reason: string) {
        remove.mutate({ id: enrollmentId, reason }, { onSuccess: () => setRemovingStudentId('') })
    }

    const failure = students.error ?? enrollments.error ?? add.error ?? remove.error

    return (
        <Modal
            eyebrow={t('admin.addStudents')}
            title={t('admin.assignTitle', { group: group.name ?? '' })}
            onClose={onClose}
            footer={<Button onClick={onClose}>{t('common.close')}</Button>}
        >
            <div className="flex flex-col gap-3">
                <SearchInput
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder={t('admin.search', { entity: t('entity.students.plural').toLowerCase() })}
                />

                {failure != null && <ErrorBox>{errorMessage(failure)}</ErrorBox>}

                {students.isLoading && <p className="text-sm text-fg-faint">{t('common.loading')}</p>}

                <ul className="flex max-h-72 flex-col overflow-y-auto">
                    {students.rows.map((student) => {
                        const isEnrolled = enrollmentByStudent.has(student.id)
                        const enrollmentId = enrollmentByStudent.get(student.id)
                        const name = student.userDto?.fullName || '—'

                        return (
                            <li
                                key={student.id}
                                className="border-b border-border-base py-2.5 last:border-b-0"
                            >
                                <div className="flex items-center justify-between gap-3">
                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-medium text-fg">{name}</p>
                                        <p className="truncate font-mono text-xs text-fg-faint">
                                            {student.userDto?.phone || '—'}
                                        </p>
                                    </div>

                                    {!isEnrolled && (
                                        <Button
                                            size="sm"
                                            variant="primary"
                                            disabled={add.isPending}
                                            onClick={() => add.mutate(student.id)}
                                        >
                                            {t('admin.addToGroup')}
                                        </Button>
                                    )}

                                    {isEnrolled && (
                                        <div className="flex shrink-0 items-center gap-2">
                                            <span className="text-sm text-success-fg">
                                                ✓ {t('admin.alreadyInGroup')}
                                            </span>
                                            {/* Eski yozuvlarda `id` bo'lmasligi mumkin — o'shanda
                                                chiqarish tugmasi ko'rsatilmaydi. */}
                                            {enrollmentId && (
                                                <Button
                                                    size="sm"
                                                    variant="danger"
                                                    onClick={() => setRemovingStudentId(student.id)}
                                                >
                                                    {t('admin.removeFromGroup')}
                                                </Button>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {removingStudentId === student.id && enrollmentId && (
                                    <RemoveFromGroupForm
                                        isPending={remove.isPending}
                                        onSubmit={(reason) => handleRemove(enrollmentId, reason)}
                                        onCancel={() => setRemovingStudentId('')}
                                    />
                                )}
                            </li>
                        )
                    })}

                    {!students.isLoading && students.rows.length === 0 && (
                        <li className="py-4 text-center text-sm text-fg-faint">
                            {t('admin.notFound', { entity: t('entity.students.plural').toLowerCase() })}
                        </li>
                    )}
                </ul>
            </div>
        </Modal>
    )
}
