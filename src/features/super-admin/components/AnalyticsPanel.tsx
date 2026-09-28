import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'
import { useT } from '@/shared/i18n'
import { formatAmount } from '@/shared/lib'
import { AnalyticsStatsRow } from './AnalyticsStatsRow'
import { useAnalytics } from '../hooks/useAnalytics'
import { useMonthlyInvoiceRevenue } from '../hooks/useMonthlyInvoiceRevenue'

interface AnalyticsPanelProps {
    token: string
}

export default function AnalyticsPanel({ token }: AnalyticsPanelProps) {
    const { t } = useT()
    const analytics = useAnalytics(token)
    const { chartData, isLoading: isChartLoading, isError: isChartError } = useMonthlyInvoiceRevenue(token)

    return (
        <div className="space-y-6">
            <AnalyticsStatsRow items={analytics.items} />

            <div className="rounded-lg border border-border-base bg-surface-card p-5 shadow-[0_6px_16px_-10px_rgba(31,42,61,0.25)]">
                <div className="mb-4 flex items-center justify-between">
                    <div>
                        <h3 className="font-display text-base font-semibold text-fg">
                            {t('analytics.revenueDynamics')}
                        </h3>
                        <p className="text-xs text-fg-muted">
                            {t('analytics.monthlyInvoiceRevenue')}
                        </p>
                    </div>
                </div>

                <div className="h-72 w-full">
                    {isChartLoading ? (
                        <div className="flex h-full items-center justify-center text-sm text-fg-muted">
                            ···
                        </div>
                    ) : isChartError ? (
                        <div className="flex h-full items-center justify-center text-sm text-error-fg">
                            {t('analytics.error')}
                        </div>
                    ) : (
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--color-accent)" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="var(--color-accent)" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border-base)" />
                                <XAxis
                                    dataKey="monthLabel"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: 'var(--color-fg-muted)', fontSize: 12 }}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: 'var(--color-fg-muted)', fontSize: 12 }}
                                    tickFormatter={(val) => formatAmount(val)}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'var(--color-surface-card)',
                                        borderColor: 'var(--color-border-base)',
                                        borderRadius: '0.5rem',
                                        color: 'var(--color-fg)',
                                    }}
                                    formatter={(value: unknown) => [
                                        formatAmount(typeof value === 'number' ? value : 0),
                                        t('analytics.revenue'),
                                    ]}
                                    labelStyle={{ color: 'var(--color-fg-muted)' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="amount"
                                    stroke="var(--color-accent)"
                                    strokeWidth={2}
                                    fillOpacity={1}
                                    fill="url(#revenueGradient)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </div>
        </div>
    )
}

export { AnalyticsPanel }
