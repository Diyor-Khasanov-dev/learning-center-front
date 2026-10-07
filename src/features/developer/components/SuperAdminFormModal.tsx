import { useState, type FormEvent } from 'react'
import { errorMessage } from '@/shared/api'
import { useT } from '@/shared/i18n'
import { normalizePhone, UZ_PHONE_PREFIX } from '@/shared/lib'
import { Button, ErrorBox, Field, Input, Modal, PhoneInput } from '@/shared/ui'
import type { SuperAdminPayload } from '../api/developerApi'

interface SuperAdminFormModalProps {
    organizationName: string
    isSaving: boolean
    error: unknown
    onSubmit: (body: SuperAdminPayload) => void
    onClose: () => void
}

/**
 * Tashkilotga birinchi super-admin.
 *
 * Bu yerda parol QO'LDA kiritiladi — backend `AdminUserCreateDto` uni
 * so'raydi va generatsiya qilmaydi. Shuning uchun parol ekranda ochiq
 * ko'rinadi: dasturchi uni o'zi tanlaydi va markaz egasiga aytadi.
 */
export function SuperAdminFormModal({
    organizationName,
    isSaving,
    error,
    onSubmit,
    onClose,
}: SuperAdminFormModalProps) {
    const { t } = useT()
    const [fullName, setFullName] = useState('')
    const [phone, setPhone] = useState(UZ_PHONE_PREFIX)
    const [password, setPassword] = useState('')

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        onSubmit({ fullName: fullName.trim(), phone: normalizePhone(phone), password })
    }

    return (
        <Modal
            eyebrow={organizationName}
            title={t('organization.addSuperAdmin')}
            onClose={onClose}
        >
            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
                <Field label={t('field.fullName')}>
                    <Input
                        required
                        value={fullName}
                        onChange={(event) => setFullName(event.target.value)}
                    />
                </Field>

                <Field label={t('field.phone')}>
                    <PhoneInput required value={phone} onChange={setPhone} />
                </Field>

                <Field label={t('auth.password')}>
                    {/* Ataylab ochiq: dasturchi parolni o'zi tanlaydi va uni
                        markaz egasiga aytishi kerak — yashirsak, yozib
                        olishda xato qilinadi. */}
                    <Input
                        required
                        minLength={8}
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </Field>
                <p className="-mt-2 text-[0.72rem] leading-snug text-fg-faint">
                    {t('organization.passwordHint')}
                </p>

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
