import { useState, type FormEvent } from 'react'
import { errorMessage } from '@/shared/api'
import { useT } from '@/shared/i18n'
import { isCompleteUzPhone, normalizePhone, UZ_PHONE_PREFIX } from '@/shared/lib'
import { Button, ErrorBox, Field, Input, Modal, PhoneInput } from '@/shared/ui'
import type { OrganizationPayload } from '../api/developerApi'

interface OrganizationFormModalProps {
    isSaving: boolean
    error: unknown
    onSubmit: (body: OrganizationPayload) => void
    onClose: () => void
}

export function OrganizationFormModal({
    isSaving,
    error,
    onSubmit,
    onClose,
}: OrganizationFormModalProps) {
    const { t } = useT()
    const [name, setName] = useState('')
    const [phone, setPhone] = useState(UZ_PHONE_PREFIX)
    const [email, setEmail] = useState('')
    const [website, setWebsite] = useState('')
    const [daysBeforeDebt, setDaysBeforeDebt] = useState('')

    // Telefon maydoni "+998" bilan boshlanadi — `required` uni to'ldirilgan
    // deb hisoblaydi, shuning uchun to'liq raqamni alohida tekshiramiz.
    const isPhoneValid = isCompleteUzPhone(phone)

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (!isPhoneValid) return
        const days = Number(daysBeforeDebt)
        onSubmit({
            name: name.trim(),
            phone: normalizePhone(phone) || undefined,
            email: email.trim() || undefined,
            website: website.trim() || undefined,
            daysBeforeDebt: daysBeforeDebt.trim() === '' || Number.isNaN(days) ? undefined : days,
        })
    }

    return (
        <Modal
            eyebrow={t('developer.organizationsTab')}
            title={t('organization.newTitle')}
            onClose={onClose}
        >
            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
                <Field label={t('field.organizationName')}>
                    <Input required value={name} onChange={(event) => setName(event.target.value)} />
                </Field>

                <Field label={t('field.phone')}>
                    <PhoneInput required value={phone} onChange={setPhone} />
                </Field>

                <Field label={t('organization.email')}>
                    <Input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </Field>

                <Field label={t('organization.website')}>
                    <Input value={website} onChange={(event) => setWebsite(event.target.value)} />
                </Field>

                <Field label={t('organization.daysBeforeDebt')}>
                    <Input
                        type="number"
                        min="0"
                        required
                        value={daysBeforeDebt}
                        onChange={(event) => setDaysBeforeDebt(event.target.value)}
                    />
                </Field>

                {error != null && <ErrorBox>{errorMessage(error)}</ErrorBox>}

                <div className="mt-1 flex justify-end gap-2.5">
                    <Button onClick={onClose}>{t('common.cancel')}</Button>
                    <Button type="submit" variant="primary" disabled={isSaving || !isPhoneValid}>
                        {isSaving ? t('common.saving') : t('common.save')}
                    </Button>
                </div>
            </form>
        </Modal>
    )
}
