import { errorMessage } from '@/shared/api'
import { useT } from '@/shared/i18n'
import { ErrorBox, Pagination, Panel, SearchInput } from '@/shared/ui'
import { OrganizationTable } from './OrganizationTable'
import { useOrganizations } from '../hooks/useOrganizations'
import type { OrganizationDto } from '@/shared/types'

interface OrganizationsPanelProps {
    token: string
    page: number
    search: string
    onPageChange: (page: number) => void
    onSearchChange: (search: string) => void
    onAddSuperAdmin: (organization: OrganizationDto) => void
}

/** Sahifa 250 qatordan oshmasligi uchun tab alohida komponentda. */
export function OrganizationsPanel({
    token,
    page,
    search,
    onPageChange,
    onSearchChange,
    onAddSuperAdmin,
}: OrganizationsPanelProps) {
    const { t } = useT()
    const { organizations, totalPages, totalElements, isLoading, error } = useOrganizations(
        token,
        page,
        search
    )

    return (
        <Panel>
            <div className="mb-3 max-w-xs">
                <SearchInput
                    value={search}
                    onChange={(event) => onSearchChange(event.target.value)}
                    placeholder={t('organization.search')}
                />
            </div>

            {error != null && <ErrorBox>{errorMessage(error)}</ErrorBox>}

            <OrganizationTable
                organizations={organizations}
                isLoading={isLoading}
                onAddSuperAdmin={onAddSuperAdmin}
            />

            <Pagination
                page={page}
                totalPages={totalPages}
                totalElements={totalElements}
                onPageChange={onPageChange}
            />
        </Panel>
    )
}
