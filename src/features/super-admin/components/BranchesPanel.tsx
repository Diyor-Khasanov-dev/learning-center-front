import { useState } from 'react'
import { errorMessage } from '@/shared/api'
import { useT } from '@/shared/i18n'
import { Button, ErrorBox, Eyebrow, Pagination, Panel, SearchInput } from '@/shared/ui'
import { BranchFormModal } from './BranchFormModal'
import { SimpleTable, type SimpleColumn } from './SimpleTable'
import { useBranches, useBranchMutations } from '../hooks/useSuperAdminData'
import type { BranchDto } from '@/shared/types'

interface BranchesPanelProps {
    token: string
    page: number
    search: string
    /** Super-adminning O'Z tashkiloti — filial faqat shunga ochiladi. */
    organizationId?: string
    organizationName?: string
    onPageChange: (page: number) => void
    onSearchChange: (search: string) => void
}

export function BranchesPanel({
    token,
    page,
    search,
    organizationId,
    organizationName,
    onPageChange,
    onSearchChange,
}: BranchesPanelProps) {
    const { t } = useT()
    const branches = useBranches(token, page, search)
    const mutations = useBranchMutations(token)
    const [form, setForm] = useState<{ value: BranchDto | null } | null>(null)

    const columns: SimpleColumn<BranchDto>[] = [
        { key: 'name', label: t('branch.name'), render: (row) => row.name || '—' },
        {
            key: 'address',
            label: t('branch.address'),
            render: (row) => (
                <span className="inline-block max-w-60 truncate text-fg-muted">
                    {row.address || '—'}
                </span>
            ),
        },
    ]

    return (
        <Panel>
            <header className="mb-5 flex flex-wrap items-end justify-between gap-3">
                <div className="min-w-0">
                    <Eyebrow>{t('superAdmin.section.branches')}</Eyebrow>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <SearchInput
                        className="min-w-40 flex-1 sm:w-56 sm:flex-none"
                        placeholder={t('superAdmin.search')}
                        value={search}
                        onChange={(event) => onSearchChange(event.target.value)}
                    />
                    <Button variant="primary" size="sm" onClick={() => setForm({ value: null })}>
                        {t('branch.new')}
                    </Button>
                </div>
            </header>

            {branches.error != null && <ErrorBox>{errorMessage(branches.error)}</ErrorBox>}
            {mutations.remove.error != null && (
                <ErrorBox>{errorMessage(mutations.remove.error)}</ErrorBox>
            )}

            <SimpleTable
                rows={branches.rows}
                columns={columns}
                isLoading={branches.isLoading}
                emptyText={t('branch.empty')}
                onEdit={(row) => setForm({ value: row })}
                onDelete={(row) => {
                    if (!confirm(t('branch.deleteConfirm', { name: row.name ?? '' }))) return
                    mutations.remove.mutate(row.id)
                }}
            />

            <Pagination
                page={page}
                totalPages={branches.totalPages}
                totalElements={branches.totalElements}
                onPageChange={onPageChange}
            />

            {form && (
                <BranchFormModal
                    branch={form.value}
                    // Bitta variant: o'z tashkiloti. Boshqalarini ko'rsatish
                    // ham, tanlashga qo'yish ham mumkin emas.
                    organizationOptions={
                        organizationId
                            ? [{ value: organizationId, label: organizationName ?? organizationId }]
                            : []
                    }
                    isSaving={mutations.save.isPending}
                    error={mutations.save.error}
                    onSubmit={(body) =>
                        mutations.save.mutate(
                            { id: form.value?.id ?? null, body },
                            { onSuccess: () => setForm(null) }
                        )
                    }
                    onClose={() => setForm(null)}
                />
            )}
        </Panel>
    )
}
