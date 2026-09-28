import { useT } from '@/shared/i18n'
import { cn } from '@/shared/lib'
import type { AnalyticsCategory } from '@/shared/types'
import { ANALYTICS_CATEGORIES, type AnalyticsItemResult } from '../hooks/useAnalytics'

const CATEGORY_ACCENT: Record<AnalyticsCategory, string> = {
    student: 'border-t-emerald-500',
    teacher: 'border-t-indigo-500',
    lead: 'border-t-amber-500',
    invoice: 'border-t-sky-500',
    enrollment: 'border-t-purple-500',
    branch: 'border-t-rose-500',
}

export function AnalyticsStatsRow({
    items,
}: {
    items: Record<AnalyticsCategory, AnalyticsItemResult>
}) {
    const { t } = useT()

    return (
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {ANALYTICS_CATEGORIES.map((category) => {
                const item = items[category]
                const hasError = Boolean(item?.error)
                const totalText = hasError
                    ? t('analytics.error')
                    : item?.total === null
                      ? '—'
                      : item?.total === undefined
                        ? '···'
                        : String(item.total)

                const thisMonthText = hasError
                    ? null
                    : item?.thisMonth === null || item?.thisMonth === undefined
                      ? null
                      : t('analytics.thisMonth', { count: item.thisMonth })

                return (
                    <div
                        key={category}
                        className={cn(
                            'flex flex-col justify-between rounded-lg border border-t-3 border-border-base bg-surface-card p-4',
                            'shadow-[0_6px_16px_-10px_rgba(31,42,61,0.25)] transition-transform hover:-translate-y-0.5',
                            CATEGORY_ACCENT[category]
                        )}
                    >
                        <div>
                            <div className="mb-1 truncate font-mono text-[0.62rem] tracking-[0.06em] text-fg-faint uppercase">
                                {t(`analytics.${category}` as Parameters<typeof t>[0])}
                            </div>
                            <div
                                className={cn(
                                    'font-display text-2xl font-semibold tabular-nums text-fg sm:text-3xl',
                                    hasError && 'text-xs font-normal text-error-fg'
                                )}
                            >
                                {totalText}
                            </div>
                        </div>

                        <div className="mt-2 min-h-5 text-xs font-medium text-success-fg">
                            {thisMonthText ?? (item?.isLoading ? '···' : '')}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
