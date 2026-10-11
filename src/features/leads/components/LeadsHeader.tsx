import type { LeadStatus } from '@/shared/types'
import { LEAD_STATUSES } from '@/shared/types'
import { useT } from '@/shared/i18n'
import { Badge, Panel, SearchInput, Select } from '@/shared/ui'

interface LeadsHeaderProps {
    total: number
    search: string
    onSearchChange: (value: string) => void
    filter: LeadStatus | ''
    onFilterChange: (value: LeadStatus | '') => void
}

export function LeadsHeader({
    total,
    search,
    onSearchChange,
    filter,
    onFilterChange,
}: LeadsHeaderProps) {
    const { t } = useT()

    return (
        <Panel>
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <Badge tone="accent">{t('lead.eyebrow')}</Badge>
                    <h1 className="mt-3 font-display text-3xl font-semibold text-fg">
                        {t('lead.title')}
                    </h1>
                    <p className="mt-1 text-sm text-fg-muted">{t('lead.description')}</p>
                </div>
                <div className="rounded-xl border border-border-base bg-surface-card px-4 py-3 text-right">
                    <p className="text-xs text-fg-muted">{t('lead.total')}</p>
                    <p className="font-display text-2xl font-semibold text-fg">{total}</p>
                </div>
            </div>
            <div className="mt-6 flex flex-col gap-2 md:flex-row">
                <SearchInput
                    aria-label={t('lead.search')}
                    placeholder={t('lead.search')}
                    value={search}
                    onChange={(event) => onSearchChange(event.target.value)}
                />
                <Select
                    aria-label={t('lead.allStatuses')}
                    className="md:w-52"
                    placeholder={t('lead.allStatuses')}
                    value={filter}
                    options={LEAD_STATUSES.map((status) => ({
                        value: status,
                        label: t(`lead.status.${status}`),
                    }))}
                    onChange={(event) => onFilterChange(event.target.value as LeadStatus | '')}
                />
            </div>
        </Panel>
    )
}
