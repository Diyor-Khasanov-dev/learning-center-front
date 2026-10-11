import { createElement } from 'react'
import { useNavigate } from 'react-router-dom'
import { useT } from '@/shared/i18n'
import type { NavSection } from '@/shared/ui'
import { AdminNavIcon, type AdminSidebarLink } from '../components/AdminSidebar'
import type { EntityConfig, EntityKey } from '../types'

/**
 * Admin menyusi: bo'limlar (chap menyu, `AppShell` `nav`) va telefondagi
 * tasma uchun havolalar. Sahifa 250 qatordan oshmasin deb alohida.
 */
export function useAdminNav(
    entities: EntityConfig[],
    activeTab: EntityKey,
    onTabChange: (tab: EntityKey) => void,
    permissions: { leads: boolean; invoices: boolean }
) {
    const { t } = useT()
    const navigate = useNavigate()

    const nav: NavSection[] = [
        {
            key: 'entities',
            items: entities.map((item) => ({
                key: item.key,
                label: t(item.pluralKey),
                icon: createElement(AdminNavIcon, { navKey: item.key }),
                active: item.key === activeTab,
                onClick: () => onTabChange(item.key),
            })),
        },
    ]

    const links: AdminSidebarLink[] = [
        { key: 'group-levels', labelKey: 'groupLevel.title', onClick: () => navigate('/group-levels') },
        permissions.leads && { key: 'leads', labelKey: 'lead.title', onClick: () => navigate('/leads') },
        permissions.invoices && { key: 'payments', labelKey: 'invoice.title', onClick: () => navigate('/payments') },
    ].filter((link): link is AdminSidebarLink => Boolean(link))

    return { nav, links }
}
