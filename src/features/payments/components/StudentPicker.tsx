import { useState } from 'react'
import { useT } from '@/shared/i18n'
import { Button, Input } from '@/shared/ui'
import type { StudentDto } from '@/shared/types'
import { MIN_SEARCH_LENGTH, useStudentSearch } from '../hooks/usePaymentLookup'

interface StudentPickerProps {
    token: string
    selected: StudentDto | null
    onSelect: (student: StudentDto | null) => void
}

/**
 * O'quvchini ism bo'yicha serverdan qidirib tanlash.
 *
 * Tanlangach qidiruv yopiladi va o'quvchi kartasi qoladi — forma qisqa
 * bo'lsin, keyingi qadam (hisob va summa) darhol ko'rinsin.
 */
export function StudentPicker({ token, selected, onSelect }: StudentPickerProps) {
    const { t } = useT()
    const [search, setSearch] = useState('')
    const { students, isSearching } = useStudentSearch(token, selected ? '' : search)

    if (selected) {
        return (
            <div className="flex items-center justify-between gap-3 rounded-xl border border-accent/40 bg-accent-soft/40 px-4 py-3">
                <div className="min-w-0">
                    <p className="truncate font-semibold text-fg">{selected.userDto?.fullName || selected.id}</p>
                    {selected.userDto?.phone && <p className="text-sm text-fg-muted">{selected.userDto.phone}</p>}
                </div>
                <Button size="sm" onClick={() => onSelect(null)}>
                    {t('transaction.changeStudent')}
                </Button>
            </div>
        )
    }

    const term = search.trim()
    let status = ''
    if (term.length < MIN_SEARCH_LENGTH) status = t('transaction.searchHint')
    else if (isSearching && students.length === 0) status = t('transaction.searching')
    else if (students.length === 0) status = t('transaction.noStudents')

    return (
        <div className="flex flex-col gap-2">
            <Input
                type="search"
                autoFocus
                aria-label={t('transaction.studentSearch')}
                placeholder={t('transaction.studentSearchPlaceholder')}
                value={search}
                onChange={(event) => setSearch(event.target.value)}
            />
            {status ? (
                <p className="px-1 text-xs text-fg-muted">{status}</p>
            ) : (
                <ul className="max-h-64 overflow-y-auto rounded-xl border border-border-base" role="list">
                    {students.map((student) => (
                        <li key={student.id} className="border-b border-border-base last:border-b-0">
                            <button
                                type="button"
                                onClick={() => onSelect(student)}
                                className="flex w-full cursor-pointer items-center justify-between gap-3 px-4 py-2.5 text-left hover:bg-surface-hover"
                            >
                                <span className="truncate font-medium text-fg">
                                    {student.userDto?.fullName || student.id}
                                </span>
                                <span className="shrink-0 text-sm text-fg-muted">{student.userDto?.phone}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
