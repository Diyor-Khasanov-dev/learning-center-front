import { db, fullGroup, json } from './state'

function toMinutes(timeStr: string): number {
    const parts = timeStr.split(':')
    const hours = Number(parts[0] ?? 0)
    const minutes = Number(parts[1] ?? 0)
    return hours * 60 + minutes
}

export function handleTeacher(path: string, url: URL): Response | null {
    if (path === '/teacher/filter-for-group-create') {
        const dayType = url.searchParams.get('dayType')
        const startTime = url.searchParams.get('startTime')
        const endTime = url.searchParams.get('endTime')

        if (!dayType || !startTime || !endTime) {
            return json(
                db.teachers.map((t) => ({
                    id: t.id,
                    name: t.userDto?.fullName || t.id,
                }))
            )
        }

        const reqStart = toMinutes(startTime)
        const reqEnd = toMinutes(endTime)

        const occupiedTeacherIds = new Set<string>()

        for (const group of db.groups) {
            if (group.status === 'COMPLETED' || !group.timeTable || !group.teacher?.id) continue
            if (group.timeTable.dayType !== dayType) continue
            if (!group.timeTable.startTime || !group.timeTable.endTime) continue

            const grpStart = toMinutes(group.timeTable.startTime)
            const grpEnd = toMinutes(group.timeTable.endTime)

            if (grpStart < reqEnd && grpEnd > reqStart) {
                occupiedTeacherIds.add(group.teacher.id)
            }
        }

        const freeTeachers = db.teachers
            .filter((teacher) => !occupiedTeacherIds.has(teacher.id))
            .map((teacher) => ({
                id: teacher.id,
                name: teacher.userDto?.fullName || teacher.id,
            }))

        return json(freeTeachers)
    }
    // O'qituvchi ko'rsatkichlari. Qizil va qora ro'yxat backendda ham
    // hozircha nol — demo ham xuddi shunday qaytaradi, aks holda demo
    // haqiqatdan ilgarilab ketadi.
    if (path === '/group/stats') {
        return json({
            totalStudents: 24,
            activeStudents: 22,
            newStudents: 3,
            lostStudents: 1,
            potentialFailStudents: 2,
            redList: 0,
            blackList: 0,
        })
    }

    if (path === '/group/groups') {
        // Backend `GroupNameProjection` qaytaradi: id, name va dayType.
        // Demo ham shu uchtasini bersin — ilgari `dayType` yo'q edi va
        // juft/toq filtri demoda umuman ko'rinmasdi.
        return json(
            db.groups
                .filter((group) => group.status !== 'COMPLETED')
                .map((group) => ({
                    id: group.id,
                    name: group.name,
                    dayType: group.timeTable?.dayType,
                }))
        )
    }
    if (path === '/group/groupInfo') {
        return json(fullGroup(url.searchParams.get('groupId') ?? 'g1'))
    }
    return null
}
