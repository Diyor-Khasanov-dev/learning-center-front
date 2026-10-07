import { useT } from '@/shared/i18n'
import { Button, Field, Input, SearchInput, Select } from '@/shared/ui'
import type { InvoiceStatus } from '@/shared/types'

interface InvoiceFiltersProps {
    search: string
    status: InvoiceStatus | ''
    from: string
    to: string
    statuses: readonly InvoiceStatus[]
    onSearchChange: (value: string) => void
    onStatusChange: (value: InvoiceStatus | '') => void
    onFromChange: (value: string) => void
    onToChange: (value: string) => void
    onClearDates: () => void
}

/**
 * Hisoblar ro'yxati filtri.
 *
 * Holat bo'yicha filtr saqlanib qoldi, garchi `InvoiceDto` da `status`
 * maydoni bo'lmasa ham: backend uni server tomonda tekshiradi, ya'ni
 * "faqat to'lanmaganlarini ko'rsat" ishlaydi — shunchaki ustun bo'lib
 * ko'rinmaydi.
 */
export function InvoiceFilters({
    search,
    status,
    from,
    to,
    statuses,
    onSearchChange,
    onStatusChange,
    onFromChange,
    onToChange,
    onClearDates,
}: InvoiceFiltersProps) {
    const { t } = useT()

    return (
        <div className="mb-4 flex flex-wrap items-end gap-2.5">
            <Field label={t('field.status')} className="w-full sm:w-auto">
                <Select
                    aria-label={t('admin.filterStatus')}
                    // `w-auto` EMAS: `inputClasses` ichida `w-full` bor va ikkalasi
                    // bir xil breakpoint'da bo'lgani uchun qaysi biri yutishi CSS
                    // tartibiga qolib ketadi. `sm:` esa aniq keyin keladi.
                    className="w-full sm:w-44"
                    options={[
                        { value: '', label: t('invoice.allStatuses') },
                        ...statuses.map((value) => ({ value, label: t(`invoice.status.${value}`) })),
                    ]}
                    value={status}
                    onChange={(event) => onStatusChange(event.target.value as InvoiceStatus | '')}
                />
            </Field>

            <Field label={t('invoice.search')} className="w-full sm:w-auto">
                <SearchInput
                    className="w-full min-w-0 sm:w-56"
                    placeholder={t('invoice.search')}
                    value={search}
                    onChange={(event) => onSearchChange(event.target.value)}
                />
            </Field>

            <div className="flex w-full flex-wrap items-end gap-2.5 sm:w-auto">
                <Field label={t('invoice.from')} className="flex-1 sm:w-36 sm:flex-none">
                    <Input type="date" className="w-full" value={from} onChange={(e) => onFromChange(e.target.value)} />
                </Field>

                <Field label={t('invoice.to')} className="flex-1 sm:w-36 sm:flex-none">
                    <Input type="date" className="w-full" value={to} onChange={(e) => onToChange(e.target.value)} />
                </Field>

                {(from || to) && (
                    <Button size="sm" className="w-full sm:w-auto" onClick={onClearDates}>
                        {t('invoice.clearDates')}
                    </Button>
                )}
            </div>
        </div>
    )
}
