import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth, useSession } from '@/app/providers/useAuth'
import { useTheme } from '@/app/providers/useTheme'
import { errorMessage } from '@/shared/api'
import { useAttendanceRecords } from '@/shared/hooks'
import { useT } from '@/shared/i18n'
import { AppShell, AttendanceTable, Button, EmptyState, ErrorBox, SegmentedControl, type PastLessonColumn } from '@/shared/ui'
import { GroupTabs } from '../components/GroupTabs'
import { KpiRow } from '../components/KpiRow'
import { LessonBanner } from '../components/LessonBanner'
import { LessonStrip } from '../components/LessonStrip'
import { StartLessonModal } from '../components/StartLessonModal'
import { StudentDetailModal } from '../components/StudentDetailModal'
import { canFilterByDayType, groupMatchesFilter, type DayFilter } from '../lib/dayParity'
import { useGroupInfo } from '../hooks/useGroupInfo'
import { useStartLesson } from '../hooks/useStartLesson'
import { useTeacherGroups } from '../hooks/useTeacherGroups'
import type { LessonDto, StudentDto } from '@/shared/types'

export function TeacherDashboardPage() {
    const { t } = useT()
    const session = useSession()
    const { signOut } = useAuth()
    const { theme, toggleTheme } = useTheme()
    const navigate = useNavigate()

    const [dayFilter, setDayFilter] = useState<DayFilter>('all')
    // Bo'sh satr = "hali tanlanmagan"; bunda ro'yxatdagi birinchi guruh olinadi.
    const [pickedGroupId, setPickedGroupId] = useState('')
    const [activeLesson, setActiveLesson] = useState<LessonDto | null>(null)
    const [selectedStudent, setSelectedStudent] = useState<StudentDto | null>(null)
    const [isLessonModalOpen, setIsLessonModalOpen] = useState(false)

    const groupsQuery = useTeacherGroups(session.token)
    const allGroups = useMemo(() => groupsQuery.data ?? [], [groupsQuery.data])

    // Filtr faqat backend `dayType` bergandagina foydali — aks holda u
    // hamma guruhni yashirib qo'yardi, shuning uchun umuman ko'rsatilmaydi.
    const showDayFilter = canFilterByDayType(allGroups)

    const visibleGroups = useMemo(
        () => (showDayFilter ? allGroups.filter((group) => groupMatchesFilter(group, dayFilter)) : allGroups),
        [allGroups, dayFilter, showDayFilter]
    )

    // Tanlangan guruh filtrdan tushib qolsa, birinchisiga o'tamiz — aks holda
    // ekranda "guruh tanlanmagan" holati qolib ketardi.
    const selectedGroupId = visibleGroups.some((group) => group.id === pickedGroupId)
        ? pickedGroupId
        : (visibleGroups[0]?.id ?? '')

    const groupInfoQuery = useGroupInfo(session.token, selectedGroupId)
    const group = groupInfoQuery.data?.groupDto
    const students = useMemo(() => groupInfoQuery.data?.studentDto ?? [], [groupInfoQuery.data])

    // Dashboardda faqat joriy oy ko'rsatiladi — oy tanlash davomat ekranida.
    const { records } = useAttendanceRecords(session.token, selectedGroupId, 1)
    const pastColumns = useMemo<PastLessonColumn[]>(
        () =>
            records.map((record) => ({
                lessonId: record.id,
                lessonTitle: record.lessonTitle,
                date: record.date,
                attendanceMap: record.attendanceStudentMap ?? {},
            })),
        [records]
    )

    const startLesson = useStartLesson(session.token, (lesson) => {
        setActiveLesson(lesson)
        setIsLessonModalOpen(false)
    })

    function openAttendance() {
        // O'quvchilar ro'yxatini endi davomat ekrani o'zi guruh bo'yicha yuklaydi.
        navigate('/attendance', { state: { activeLesson, groupId: selectedGroupId } })
    }

    function switchGroup(groupId: string) {
        setPickedGroupId(groupId)
        // Yangi guruhda oldingi dars bannerini ko'rsatish noto'g'ri bo'lardi.
        setActiveLesson(null)
    }

    const isLoading = groupsQuery.isLoading || groupInfoQuery.isLoading
    const loadError = groupsQuery.error ?? groupInfoQuery.error

    return (
        <AppShell
            subtitle={t('teacher.role')}
            onSignOut={signOut}
            token={session.token}
            theme={theme}
            toggleTheme={toggleTheme}
            actions={
                <>
                    <Button variant="purple" size="sm" onClick={openAttendance}>
                        {t('attendance.title')}
                    </Button>
                    <Button
                        variant="brand"
                        size="sm"
                        disabled={!selectedGroupId}
                        onClick={() => setIsLessonModalOpen(true)}
                    >
                        ▶ {t('teacher.startLesson')}
                    </Button>
                    {showDayFilter && (
                        <SegmentedControl<DayFilter>
                            label={t('teacher.allDays')}
                            value={dayFilter}
                            onChange={setDayFilter}
                            options={[
                                { value: 'all', label: t('teacher.allDays') },
                                { value: 'ODD', label: t('group.dayType.ODD') },
                                { value: 'EVEN', label: t('group.dayType.EVEN') },
                            ]}
                        />
                    )}
                </>
            }
        >
            <KpiRow />

            <GroupTabs groups={visibleGroups} selectedId={selectedGroupId} onSelect={switchGroup} />

            <LessonStrip group={group} />

            {activeLesson && <LessonBanner lesson={activeLesson} onMarkAttendance={openAttendance} />}

            {isLoading && <p className="font-mono text-sm text-fg-faint">{t('teacher.loadingGroup')}</p>}

            {loadError && (
                <div className="mb-5">
                    <ErrorBox>{t('teacher.loadFailed', { message: errorMessage(loadError) })}</ErrorBox>
                </div>
            )}

            {!isLoading && !loadError && group && students.length > 0 && (
                <section>
                    <h2 className="mb-3 font-display text-lg font-semibold text-fg">
                        {t('teacher.studentsCount', { count: students.length })}
                    </h2>
                    <AttendanceTable
                        students={students}
                        pastColumns={pastColumns}
                        plannedLessonCount={group.level?.lessonCount}
                        onSelectStudent={setSelectedStudent}
                    />
                </section>
            )}

            {!isLoading && !loadError && group && students.length === 0 && (
                <EmptyState title={t('teacher.noStudents')} />
            )}

            {!isLoading && !loadError && !group && (
                <EmptyState
                    title={allGroups.length === 0 ? t('teacher.noGroups') : t('teacher.noGroupSelected')}
                    description={
                        allGroups.length === 0 ? t('teacher.noGroupsHint') : t('teacher.pickGroup')
                    }
                />
            )}

            {isLessonModalOpen && (
                <StartLessonModal
                    groupName={group?.name}
                    isPending={startLesson.isPending}
                    error={startLesson.error}
                    onSubmit={(topic) => startLesson.mutate({ groupId: selectedGroupId, topic })}
                    onClose={() => setIsLessonModalOpen(false)}
                />
            )}

            {selectedStudent && (
                <StudentDetailModal student={selectedStudent} onClose={() => setSelectedStudent(null)} />
            )}
        </AppShell>
    )
}
