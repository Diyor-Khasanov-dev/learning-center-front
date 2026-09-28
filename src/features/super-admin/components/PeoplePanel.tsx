import { useState } from 'react'
import { errorMessage } from '@/shared/api'
import { useT } from '@/shared/i18n'
import { Avatar, Button, ErrorBox, Input, Pagination, Panel } from '@/shared/ui'
import type { UserCreatedResponseDto } from '@/shared/types'
import { AdminCreateModal } from './AdminCreateModal'
import { AdminCredentialsModal } from './AdminCredentialsModal'
import { SimpleTable } from './SimpleTable'
import { usePeople } from '../hooks/usePeople'
import { useBranches, useCreateAdmin } from '../hooks/useSuperAdminData'
import type { PeopleKind, PersonRow } from '../api/superAdminApi'

interface PeoplePanelProps {
    token: string
    kind: PeopleKind
    page: number
    search: string
    onPageChange: (page: number) => void
    onSearchChange: (search: string) => void
}

/**
 * O'quvchi, o'qituvchi va administrator — bitta jadval.
 *
 * Uchalasida ham ko'rsatiladigan narsa bir xil (ism, telefon, tug'ilgan
 * sana), faqat manba boshqa. Uchta alohida komponent yozilsa uchta joyda
 * bir xil tuzatish qilishga to'g'ri kelardi.
 *
 * QO'SHISH faqat administratorlar uchun shu yerda ("+ Administrator"):
 * o'quvchi va o'qituvchini administrator panelida qo'shish mantiqiy —
 * kundalik ish shu yerda; administratorni esa faqat super-admin qo'sha
 * oladi, ya'ni shu panel — yagona o'rin.
 */
export function PeoplePanel({
    token,
    kind,
    page,
    search,
    onPageChange,
    onSearchChange,
}: PeoplePanelProps) {
    const { t } = useT()
    const { rows, totalPages, totalElements, isLoading, error } = usePeople(
        token,
        kind,
        page,
        search
    )

    const [showCreate, setShowCreate] = useState(false)
    const [credentials, setCredentials] = useState<UserCreatedResponseDto | null>(null)

    // Filiallar ro'yxati faqat administrator qo'shishda kerak, lekin
    // `SuperAdminDashboardPage` allaqachon shu so'rovni (`token, 0, ''`)
    // yuborgan — kesh bo'lgani uchun bu yerda qayta so'rov ketmaydi.
    const branches = useBranches(token, 0, '')
    const branchOptions = branches.rows.map((branch) => ({
        value: branch.id,
        label: branch.name || branch.id,
    }))
    const createAdmin = useCreateAdmin(token)

    const columns = [
        {
            key: 'fullName',
            label: t('field.fullName'),
            render: (row: PersonRow) => (
                <div className="flex items-center gap-2.5">
                    <Avatar
                        name={row.userDto?.fullName}
                        src={row.userDto?.imageUrl}
                        size="sm"
                        fallback="silhouette"
                    />
                    <span className="font-medium text-fg">{row.userDto?.fullName || '—'}</span>
                </div>
            ),
        },
        {
            key: 'phone',
            label: t('field.phone'),
            render: (row: PersonRow) => (
                <span className="font-mono text-sm">{row.userDto?.phone || '—'}</span>
            ),
        },
        {
            key: 'birthDate',
            label: t('field.birthDate'),
            render: (row: PersonRow) => row.userDto?.birthDate || '—',
        },
    ]

    return (
        <Panel>
            <div className="mb-3 flex flex-wrap items-center gap-2">
                <Input
                    className="max-w-xs flex-1"
                    value={search}
                    onChange={(event) => onSearchChange(event.target.value)}
                    placeholder={t('superAdmin.search')}
                />
                {kind === 'administrators' && (
                    <Button variant="primary" size="sm" onClick={() => setShowCreate(true)}>
                        {t('superAdmin.admin.new')}
                    </Button>
                )}
            </div>

            {error != null && <ErrorBox>{errorMessage(error)}</ErrorBox>}

            <SimpleTable
                rows={rows}
                columns={columns}
                isLoading={isLoading}
                emptyText={t('superAdmin.peopleEmpty')}
            />

            <Pagination
                page={page}
                totalPages={totalPages}
                totalElements={totalElements}
                onPageChange={onPageChange}
            />

            {showCreate && (
                <AdminCreateModal
                    branchOptions={branchOptions}
                    isSaving={createAdmin.isPending}
                    error={createAdmin.error}
                    onClose={() => setShowCreate(false)}
                    onSubmit={(payload) =>
                        createAdmin.mutate(payload, {
                            onSuccess: (created) => {
                                setShowCreate(false)
                                setCredentials(created)
                            },
                        })
                    }
                />
            )}

            {credentials && (
                <AdminCredentialsModal credentials={credentials} onClose={() => setCredentials(null)} />
            )}
        </Panel>
    )
}
