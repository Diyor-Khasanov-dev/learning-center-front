import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth, useSession } from '@/app/providers/useAuth'
import { useTheme } from '@/app/providers/useTheme'
import { errorMessage } from '@/shared/api'
import { useT } from '@/shared/i18n'
import { GROUP_STATUSES } from '@/shared/types'
import { Button, ErrorBox, Eyebrow, Input, Pagination, Panel, Select } from '@/shared/ui'
import { AdminSidebar, AdminTabStrip } from '../components/AdminSidebar'
import type { AdminSidebarLink } from '../components/AdminSidebar'
import { AssignStudentsModal } from '../components/AssignStudentsModal'
import { EntityFormModal } from '../components/EntityFormModal'
import { EntityTable } from '../components/EntityTable'
import { StatsRow } from '../components/StatsRow'
import { COLUMN_CONFIGS, inferColumns } from '../config/columns'
import { entityByKey } from '../config/entities'
import { FORM_CONFIGS } from '../config/forms'
import { useAdminPermissions } from '../hooks/useAdminPermissions'
import { useEntityCounts } from '../hooks/useEntityCounts'
import { useEntityList } from '../hooks/useEntityList'
import { useEntityMutations } from '../hooks/useEntityMutations'
import { useGroupOptions } from '../hooks/useGroupOptions'
import { useTeacherOptions } from '../hooks/useTeacherOptions'
import { AppShell } from '@/shared/ui'
import type { AdminRow, EntityKey, FormValues, ModalMode } from '../types'

interface FormModalState {
    mode: ModalMode
    id: string | null
    values: FormValues
}

export function AdminDashboardPage() {
    const { t } = useT()
    const session = useSession()
    const { signOut } = useAuth()
    const { theme, toggleTheme } = useTheme()
    const navigate = useNavigate()

    const { visibleEntities, hasLeadPermission, hasInvoicePermission } = useAdminPermissions()

    const [activeTab, setActiveTab] = useState<EntityKey>(() => visibleEntities[0]?.key ?? 'groups')
    const [page, setPage] = useState(0)
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('STARTING')
    const [formModal, setFormModal] = useState<FormModalState | null>(null)
    const [assignGroup, setAssignGroup] = useState<AdminRow | null>(null)

    const entity = entityByKey(activeTab)
    const formConfig = FORM_CONFIGS[activeTab]
    const columnConfigs = COLUMN_CONFIGS[activeTab]

    const plural = t(entity.pluralKey)
    const singular = t(entity.singularKey)

    const list = useEntityList(entity, session.token, {
        page,
        search,
        // Status filtri faqat guruhlarda ma'noga ega.
        status: activeTab === 'groups' ? statusFilter : undefined,
    })
    const counts = useEntityCounts(session.token, visibleEntities)
    const teacherOptions = useTeacherOptions(session.token)
    const groupOptions = useGroupOptions(session.token)
    const { save, remove } = useEntityMutations(entity, session.token)

    const columns = columnConfigs ? columnConfigs.map((column) => column.key) : inferColumns(list.rows)

    const sidebarLinks: AdminSidebarLink[] = [
        { key: 'group-levels', labelKey: 'groupLevel.title', onClick: () => navigate('/group-levels') },
        hasLeadPermission && { key: 'leads', labelKey: 'lead.title', onClick: () => navigate('/leads') },
        hasInvoicePermission && {
            key: 'payments',
            labelKey: 'invoice.title',
            onClick: () => navigate('/payments'),
        },
    ].filter((link): link is AdminSidebarLink => Boolean(link))

    /** Tab almashganda sahifalash va filtrlarni tozalaymiz — aks holda yangi
     *  bo'limda "3-sahifa, qidiruv: Ali" holati qolib ketadi. */
    function changeTab(tab: EntityKey) {
        setActiveTab(tab)
        setPage(0)
        setSearch('')
        setStatusFilter('STARTING')
    }

    function openCreate() {
        const values = formConfig
            ? formConfig.getInitialValues(null)
            : Object.fromEntries(columns.map((column) => [column, '']))
        setFormModal({ mode: 'create', id: null, values })
    }

    function openEdit(row: AdminRow) {
        const values = formConfig ? formConfig.getInitialValues(row) : { ...row }
        setFormModal({ mode: 'edit', id: row.id, values })
    }

    function handleSubmit(values: FormValues) {
        if (!formModal) return

        let body: unknown
        if (formConfig) {
            body =
                formModal.mode === 'create'
                    ? formConfig.buildCreatePayload(values)
                    : formConfig.buildUpdatePayload(values)
        } else {
            const generic = { ...values }
            delete generic.id
            body = generic
        }

        save.mutate(
            { mode: formModal.mode, id: formModal.id, body },
            { onSuccess: () => setFormModal(null) }
        )
    }

    function handleDelete(row: AdminRow) {
        if (!confirm(t('admin.deleteConfirm', { entity: singular.toLowerCase() }))) return
        remove.mutate(row.id)
    }

    return (
        <div className="flex min-h-screen bg-surface">
            <AdminSidebar
                entities={visibleEntities}
                activeTab={activeTab}
                onTabChange={changeTab}
                links={sidebarLinks}
            />

            {/* `min-w-0` shart: busiz keng jadval flex elementni cho'zib yuboradi */}
            <div className="min-w-0 flex-1">
                <AppShell
                    subtitle={t('admin.role')}
                    onSignOut={signOut}
                    token={session.token}
                    theme={theme}
                    toggleTheme={toggleTheme}
                    secondary={
                        <AdminTabStrip
                            entities={visibleEntities}
                            activeTab={activeTab}
                            onTabChange={changeTab}
                            links={sidebarLinks}
                        />
                    }
                >
                    <StatsRow entities={visibleEntities} counts={counts} />

                    <Panel>
                        <header className="mb-5 flex flex-wrap items-end justify-between gap-3">
                            <div className="min-w-0">
                                <Eyebrow>{t('admin.records')}</Eyebrow>
                                <h1 className="mt-1 font-display text-2xl font-semibold text-fg">{plural}</h1>
                            </div>

                            <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto">
                                {activeTab === 'groups' && (
                                    <Select
                                        aria-label={t('admin.filterStatus')}
                                        className="w-full sm:w-auto"
                                        options={GROUP_STATUSES.map((status) => ({
                                            value: status,
                                            label: t(`status.${status}`),
                                        }))}
                                        value={statusFilter}
                                        onChange={(event) => {
                                            setStatusFilter(event.target.value)
                                            setPage(0)
                                        }}
                                    />
                                )}
                                <Input
                                    className="min-w-40 flex-1 sm:w-56 sm:flex-none"
                                    placeholder={t('admin.search', { entity: plural.toLowerCase() })}
                                    value={search}
                                    onChange={(event) => {
                                        setSearch(event.target.value)
                                        setPage(0)
                                    }}
                                />
                                <Button variant="primary" onClick={openCreate}>
                                    {t('admin.new', { entity: singular.toLowerCase() })}
                                </Button>
                            </div>
                        </header>

                        {list.error && (
                            <div className="mb-4">
                                <ErrorBox>
                                    {t('admin.loadFailed', {
                                        entity: plural.toLowerCase(),
                                        message: errorMessage(list.error),
                                    })}
                                </ErrorBox>
                            </div>
                        )}

                        {remove.error && (
                            <div className="mb-4">
                                <ErrorBox>
                                    {t('admin.deleteFailed', { message: errorMessage(remove.error) })}
                                </ErrorBox>
                            </div>
                        )}

                        {!list.error && (
                            <EntityTable
                                rows={list.rows}
                                columns={columns}
                                columnConfigs={columnConfigs}
                                isLoading={list.isLoading}
                                entityLabel={plural.toLowerCase()}
                                onAssignStudents={activeTab === 'groups' ? setAssignGroup : undefined}
                                onEdit={openEdit}
                                onDelete={handleDelete}
                            />
                        )}

                        <Pagination
                            page={page}
                            totalPages={list.totalPages}
                            totalElements={list.totalElements}
                            onPageChange={setPage}
                        />
                    </Panel>
                </AppShell>
            </div>

            {formModal && (
                <EntityFormModal
                    // `key` — tab yoki qator almashganda forma state'i toza
                    // boshlanishi uchun (React komponentni qayta yaratadi).
                    key={`${activeTab}-${formModal.id ?? 'new'}`}
                    mode={formModal.mode}
                    entityLabel={singular}
                    initialValues={formModal.values}
                    formConfig={formConfig}
                    fallbackColumns={columns}
                    teacherOptions={teacherOptions}
                    groupOptions={groupOptions}
                    isSaving={save.isPending}
                    error={save.error}
                    onSubmit={handleSubmit}
                    onClose={() => setFormModal(null)}
                />
            )}

            {assignGroup && (
                <AssignStudentsModal group={assignGroup} onClose={() => setAssignGroup(null)} />
            )}
        </div>
    )
}
