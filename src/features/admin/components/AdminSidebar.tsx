import { useT } from '@/shared/i18n'
import type { TranslationKey } from '@/shared/i18n'
import { cn } from '@/shared/lib'
import type { EntityConfig, EntityKey } from '../types'

/** Sidebarning pastki guruhidagi havola — tab emas, marshrutga o'tadi. */
export interface AdminSidebarLink {
    key: string
    labelKey: TranslationKey
    onClick: () => void
}

interface AdminNavProps {
    entities: EntityConfig[]
    activeTab: EntityKey
    onTabChange: (tab: EntityKey) => void
    links?: AdminSidebarLink[]
}

interface AdminSidebarProps extends AdminNavProps {
    links: AdminSidebarLink[]
}

/**
 * Bo'limlar navigatsiyasi.
 *
 * Kompyuterda chap ustun, mobil ekranda gorizontal siljiydigan tasma.
 * Ikkita alohida komponent — bitta komponentni CSS bilan ikki xil qilishdan
 * ko'ra shu tushunarliroq va har biri o'z holatida to'g'ri ishlaydi.
 */
export function AdminSidebar({ entities, activeTab, onTabChange, links }: AdminSidebarProps) {
    const { t } = useT()

    return (
        <aside className="hidden w-55 shrink-0 flex-col border-r border-white/10 bg-sidebar py-6 text-sidebar-fg shadow-[22px_0_60px_-42px_var(--fg)] lg:flex">
            <div className="mb-3 flex items-center gap-2 border-b border-white/10 px-5 pb-6">
                <span className="rounded-sm bg-brand px-1.5 py-0.5 font-mono text-xs tracking-[0.1em] text-brand-fg">
                    ALIA
                </span>
                <span className="font-display text-base font-semibold">A.L.I.A.</span>
            </div>

            <nav className="flex flex-1 flex-col">
                {entities.map((entity) => (
                    <button
                        key={entity.key}
                        type="button"
                        onClick={() => onTabChange(entity.key)}
                        className={cn(
                            'cursor-pointer border-l-3 px-5 py-3 text-left text-sm transition-colors',
                            activeTab === entity.key
                                ? 'border-l-brand bg-brand/14 font-medium text-sidebar-fg shadow-[inset_14px_0_28px_-28px_var(--brand)]'
                                : 'border-l-transparent text-sidebar-fg/65 hover:bg-sidebar-fg/8 hover:text-sidebar-fg'
                        )}
                    >
                        {t(entity.pluralKey)}
                    </button>
                ))}

                {links.length > 0 && (
                    <>
                        <div className="mx-5 my-3 border-t border-white/10" />
                        {links.map((link) => (
                            <button
                                key={link.key}
                                type="button"
                                onClick={link.onClick}
                                className="cursor-pointer border-l-3 border-l-transparent px-5 py-3 text-left text-sm text-sidebar-fg/65 transition-colors hover:bg-sidebar-fg/8 hover:text-sidebar-fg"
                            >
                                {t(link.labelKey)}
                            </button>
                        ))}
                    </>
                )}
            </nav>

            <div className="border-t border-white/10 px-5 pt-4">
                <div className="font-mono text-[0.68rem] tracking-[0.06em] text-sidebar-fg/45 uppercase">
                    {t('admin.role')}
                </div>
            </div>
        </aside>
    )
}

/** Mobil variant — sarlavha ostidagi tasma. */
export function AdminTabStrip({ entities, activeTab, onTabChange, links }: AdminNavProps) {
    const { t } = useT()

    return (
        <div className="flex gap-2 overflow-x-auto lg:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {entities.map((entity) => (
                <button
                    key={entity.key}
                    type="button"
                    onClick={() => onTabChange(entity.key)}
                    className={cn(
                        'shrink-0 cursor-pointer rounded-full px-3.5 py-1.5 max-sm:py-2.5 max-sm:min-h-11 text-xs whitespace-nowrap transition-colors',
                        activeTab === entity.key
                            ? 'bg-fg font-semibold text-fg-inverted'
                            : 'border border-border-base text-fg-muted hover:bg-surface-hover'
                    )}
                >
                    {t(entity.pluralKey)}
                </button>
            ))}
            {links && links.length > 0 && (
                <>
                    <div className="my-auto h-4 w-px shrink-0 bg-border-base" />
                    {links.map((link) => (
                        <button
                            key={link.key}
                            type="button"
                            onClick={link.onClick}
                            className="shrink-0 cursor-pointer rounded-full border border-border-base px-3.5 py-1.5 max-sm:py-2.5 max-sm:min-h-11 text-xs whitespace-nowrap text-fg-muted transition-colors hover:bg-surface-hover hover:text-fg"
                        >
                            {t(link.labelKey)}
                        </button>
                    ))}
                </>
            )}
        </div>
    )
}
