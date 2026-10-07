import { useState, type FormEvent } from 'react'
import { errorMessage } from '@/shared/api'
import { useT } from '@/shared/i18n'
import { normalizePhone } from '@/shared/lib'
import { Button, ErrorBox, Field, Input, Modal, PhoneInput } from '@/shared/ui'
import type { OrganizationPayload } from '../api/superAdminApi'
import type { OrganizationDto } from '@/shared/types'

interface Props {
    organization: OrganizationDto | null
    isSaving: boolean
    error: unknown
    onSubmit: (body: OrganizationPayload) => void
    onClose: () => void
}

export function OrganizationFormModal({
    organization,
    isSaving,
    error,
    onSubmit,
    onClose,
}: Props) {
    const { t } = useT()
    const [name, setName] = useState(organization?.name ?? '')
    const [email, setEmail] = useState(organization?.email ?? '')
    const [phone, setPhone] = useState(organization?.phone ?? '')
    const [website, setWebsite] = useState(organization?.website ?? '')

    // `name` backendda `@Nonnull` — bo'sh yuborilsa 400 qaytadi.
    const isValid = name.trim() !== ''

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (!isValid) return
        onSubmit({ name: name.trim(), email, phone: normalizePhone(phone), website })
    }

    return (
        <Modal
            eyebrow={organization ? t('admin.editRecord') : t('admin.newRecord')}
            title={organization ? t('org.editTitle') : t('org.newTitle')}
            onClose={onClose}
        >
            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
                <Field label={t('org.name')}>
                    <Input value={name} onChange={(e) => setName(e.target.value)} required />
                </Field>
                <Field label={t('org.phone')}>
                    <PhoneInput value={phone} onChange={setPhone} />
                </Field>
                <Field label={t('org.email')}>
                    <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Field>
                <Field label={t('org.website')}>
                    <Input value={website} onChange={(e) => setWebsite(e.target.value)} />
                </Field>

                {/* Backend tashkilot bilan birga super-adminni YARATMAYDI
                    (`OrganizationService.create` da faqat tashkilot saqlanadi).
                    Buni aytmasak, tashkilot yaratgan odam unga kira oladigan
                    hisob ham paydo bo'ldi deb o'ylaydi. */}
                {!organization && (
                    <p className="text-[0.72rem] leading-snug text-fg-faint">
                        {t('org.noAdminYet')}
                    </p>
                )}

                {error != null && <ErrorBox>{errorMessage(error)}</ErrorBox>}

                <div className="mt-1 flex justify-end gap-2.5">
                    <Button onClick={onClose}>{t('common.cancel')}</Button>
                    <Button type="submit" variant="primary" disabled={isSaving || !isValid}>
                        {isSaving ? t('common.saving') : t('common.save')}
                    </Button>
                </div>
            </form>
        </Modal>
    )
}
