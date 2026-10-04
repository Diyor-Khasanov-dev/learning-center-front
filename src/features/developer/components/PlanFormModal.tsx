import { useState, type FormEvent } from 'react'
import { errorMessage } from '@/shared/api'
import { useT } from '@/shared/i18n'
import { Button, ErrorBox, Field, Input, Modal } from '@/shared/ui'
import { FEATURE_KEYS, type PlanDto, type PlanPayload } from '@/shared/types'

interface PlanFormModalProps {
    plan?: PlanDto | null
    isSaving: boolean
    error: unknown
    onSubmit: (body: PlanPayload) => void
    onClose: () => void
}

/**
 * Maydonlar formada majburiy (`required`), shuning uchun bo'sh qiymat bu
 * yerga deyarli kelmaydi — bu faqat himoya: `NaN` serverga ketmasin.
 */
function toLimit(value: string): number | undefined {
    const parsed = Number(value)
    return value.trim() === '' || Number.isNaN(parsed) ? undefined : parsed
}

export function PlanFormModal({ plan, isSaving, error, onSubmit, onClose }: PlanFormModalProps) {
    const { t } = useT()
    const [code, setCode] = useState(plan?.code ?? '')
    const [name, setName] = useState(plan?.name ?? '')
    const [description, setDescription] = useState(plan?.description ?? '')
    const [price, setPrice] = useState(String(plan?.price ?? ''))
    const [currency, setCurrency] = useState(plan?.currency ?? 'UZS')
    const [durationMonths, setDurationMonths] = useState(String(plan?.durationMonths ?? '1'))
    const [sortOrder, setSortOrder] = useState(String(plan?.sortOrder ?? ''))
    const [active, setActive] = useState(plan?.active ?? true)
    const [limits, setLimits] = useState<Record<string, string>>(() =>
        Object.fromEntries(FEATURE_KEYS.map((key) => [key, String(plan?.limits?.[key] ?? '')]))
    )

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        onSubmit({
            code: code.trim(),
            name: name.trim(),
            description: description.trim() || undefined,
            price: Number(price),
            currency: currency.trim().toUpperCase(),
            durationMonths: Number(durationMonths),
            sortOrder: toLimit(sortOrder),
            // `PlanUpdateDto.active` `@NotNull` — yuborilmasa tahrirlash
            // "active: must not be null" bilan yiqiladi. Yaratishda maydon yo'q.
            ...(plan ? { active } : {}),
            limits: Object.fromEntries(
                FEATURE_KEYS.map((key) => [key, toLimit(limits[key])]).filter(([, value]) => value != null)
            ),
        })
    }

    return (
        <Modal
            eyebrow={t('developer.plansTab')}
            title={plan ? t('plan.edit') : t('plan.newTitle')}
            onClose={onClose}
        >
            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
                <Field label={t('plan.code')}>
                    <Input
                        required
                        value={code}
                        onChange={(event) => setCode(event.target.value)}
                        placeholder="STANDARD"
                    />
                </Field>
                <p className="-mt-2 text-[0.72rem] leading-snug text-fg-faint">{t('plan.codeHint')}</p>

                <Field label={t('plan.name')}>
                    <Input required value={name} onChange={(event) => setName(event.target.value)} />
                </Field>

                <Field label={t('plan.description')}>
                    <Input required value={description} onChange={(event) => setDescription(event.target.value)} />
                </Field>

                <div className="grid grid-cols-2 gap-3">
                    <Field label={t('plan.price')}>
                        <Input
                            type="number"
                            min="0"
                            required
                            value={price}
                            onChange={(event) => setPrice(event.target.value)}
                        />
                    </Field>
                    <Field label={t('plan.currency')}>
                        <Input
                            required
                            maxLength={3}
                            value={currency}
                            onChange={(event) => setCurrency(event.target.value)}
                        />
                    </Field>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <Field label={t('plan.duration')}>
                        <Input
                            type="number"
                            min="1"
                            required
                            value={durationMonths}
                            onChange={(event) => setDurationMonths(event.target.value)}
                        />
                    </Field>
                    <Field label={t('plan.sortOrder')}>
                        <Input
                            type="number"
                            min="0"
                            required
                            value={sortOrder}
                            onChange={(event) => setSortOrder(event.target.value)}
                        />
                    </Field>
                </div>

                <p className="mt-1 text-xs font-medium text-fg-muted">{t('plan.limits')}</p>
                <div className="grid grid-cols-2 gap-3">
                    {FEATURE_KEYS.map((key) => (
                        <Field key={key} label={t(`feature.${key}`)}>
                            <Input
                                type="number"
                                min="0"
                                required
                                value={limits[key]}
                                onChange={(event) =>
                                    setLimits((current) => ({ ...current, [key]: event.target.value }))
                                }
                            />
                        </Field>
                    ))}
                </div>

                {plan && (
                    <label className="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
                        <input
                            type="checkbox"
                            checked={active}
                            onChange={(event) => setActive(event.target.checked)}
                            className="size-4 accent-accent"
                        />
                        {t('plan.isActive')}
                    </label>
                )}

                {error != null && <ErrorBox>{errorMessage(error)}</ErrorBox>}

                <div className="mt-1 flex justify-end gap-2.5">
                    <Button onClick={onClose}>{t('common.cancel')}</Button>
                    <Button type="submit" variant="primary" disabled={isSaving}>
                        {isSaving ? t('common.saving') : t('common.save')}
                    </Button>
                </div>
            </form>
        </Modal>
    )
}
