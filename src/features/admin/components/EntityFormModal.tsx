import { useState, type FormEvent } from 'react'
import { useSession } from '@/app/providers/useAuth'
import { errorMessage } from '@/shared/api'
import { useT } from '@/shared/i18n'
import { formatHeader, formatPhone, normalizePhone, UZ_PHONE_PREFIX } from '@/shared/lib'
import { Button, ErrorBox, Field, Input, Modal, Select, type SelectOption } from '@/shared/ui'
import { useUserByPhone } from '../hooks/useUserByPhone'
import { ExistingUserNotice } from './ExistingUserNotice'
import type { EntityFormConfig, FormField, FormValues, ModalMode } from '../types'

interface EntityFormModalProps {
    mode: ModalMode
    /** Sarlavhada ko'rinadigan bo'lim nomi (birlikda, tarjima qilingan). */
    entityLabel: string
    initialValues: FormValues
    formConfig?: EntityFormConfig
    /** Konfiguratsiyasiz rejimda maydonlar shu kalitlardan yasaladi. */
    fallbackColumns: string[]
    teacherOptions: SelectOption[]
    groupOptions: SelectOption[]
    branchOptions: SelectOption[]
    isSaving: boolean
    error: unknown
    onSubmit: (values: FormValues) => void
    onClose: () => void
}

/**
 * Yaratish/tahrirlash formasi.
 *
 * Forma qiymatlari SHU komponent ichida yashaydi: ilgari ular sahifaning
 * state'ida edi va har harf yozilganda butun dashboard qayta render bo'lardi.
 */
export function EntityFormModal({
    mode,
    entityLabel,
    initialValues,
    formConfig,
    fallbackColumns,
    teacherOptions,
    groupOptions,
    branchOptions,
    isSaving,
    error,
    onSubmit,
    onClose,
}: EntityFormModalProps) {
    const { t } = useT()
    const session = useSession()
    const [values, setValues] = useState<FormValues>(() =>
        // Yangi odam qo'shayotganda har safar "+998" ni qo'lda terish shart
        // emas. Chet el raqami bo'lsa uni o'chirib yozaveradi.
        mode === 'create' && formConfig?.lookupByPhone && !initialValues.phone
            ? { ...initialValues, phone: UZ_PHONE_PREFIX }
            : initialValues
    )

    /*
     * Telefon bo'yicha qidiruv — faqat yangi odam qo'shayotganda.
     * Tahrirlashda odam allaqachon ma'lum, qidirishning ma'nosi yo'q.
     */
    const isLookup = mode === 'create' && formConfig?.lookupByPhone === true
    const phone = String(values.phone ?? '')

    /** `null` — hali javob yo'q; `'linked'` — tasdiqlangan; `'new'` — rad etilgan. */
    const [decision, setDecision] = useState<'linked' | 'new' | null>(null)
    const { found, isSearching } = useUserByPhone(
        session.token,
        normalizePhone(phone),
        isLookup && decision === null
    )

    /**
     * Tasdiqlangach ma'lumot to'ladi, lekin BLOKLANMAYDI.
     *
     * Sabab: raqam boshqa odamga o'tgan bo'lishi mumkin va o'shanda yangi
     * egasining ismi yozilishi kerak. Formada nima tursa, o'sha yuboriladi —
     * backend mavjud odamni yangilaydi. Administrator xato yozsa, odam
     * o'zi kelib aytadi va administrator to'g'rilaydi.
     */
    function confirmExisting() {
        if (!found) return
        setValues((current) => ({
            ...current,
            fullName: found.fullName ?? current.fullName,
            birthDate: found.birthDate ?? current.birthDate,
        }))
        setDecision('linked')
    }

    const eyebrow = mode === 'create' ? t('admin.newRecord') : t('admin.editRecord')
    const title =
        mode === 'create'
            ? t('admin.newTitle', { entity: entityLabel })
            : t('admin.editTitle', { entity: entityLabel })

    const fields: FormField[] = formConfig
        ? typeof formConfig.fields === 'function'
            ? formConfig.fields(mode)
            : formConfig.fields
        : []

    /** `optionsSource` → tayyor ro'yxat. Yangi manba qo'shish bir qator. */
    const SERVER_OPTIONS: Record<NonNullable<FormField['optionsSource']>, SelectOption[]> = {
        teachers: teacherOptions,
        groups: groupOptions,
        branches: branchOptions,
    }

    /*
     * Filial bitta bo'lsa tanlov ma'nosiz — administrator bitta variantni
     * bosib o'tirmasin. Forma tanlagichni yashiradi (pastda, `fields.map`
     * ichida) va qiymatni faqat YUBORISHDA qo'yadi — `values` state'iga
     * yozilmaydi, aks holda maydon hali ko'rinmayotgan paytda ham (variantlar
     * hali yuklanayotganda) noto'g'ri qiymat "muzlab" qolishi mumkin edi.
     */
    const soleBranchId = branchOptions.length === 1 ? branchOptions[0].value : undefined

    function setValue(key: string, value: unknown) {
        // Raqam o'zgarsa oldingi qaror kuchini yo'qotadi — boshqa odam
        // haqida gap ketyapti.
        if (key === 'phone') setDecision(null)
        setValues((current) => ({ ...current, [key]: value }))
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        // Bo'shliqlar faqat ko'rinish uchun edi: serverga tozalangan
        // ko'rinishda ketmasa, "+998 90 …" va "+99890…" ikki xil raqam
        // bo'lib qoladi va yagonalik sharti ishlamaydi.
        onSubmit({
            ...values,
            ...(soleBranchId ? { branchId: soleBranchId } : {}),
            ...(values.phone ? { phone: normalizePhone(String(values.phone)) } : {}),
            ...(values.parentPhone
                ? { parentPhone: normalizePhone(String(values.parentPhone)) }
                : {}),
        })
    }

    if (!formConfig && fallbackColumns.length === 0) {
        return (
            <Modal
                eyebrow={eyebrow}
                title={title}
                onClose={onClose}
                footer={<Button onClick={onClose}>{t('common.close')}</Button>}
            >
                <p className="text-sm leading-relaxed text-fg-muted">{t('admin.noFields')}</p>
            </Modal>
        )
    }

    return (
        <Modal eyebrow={eyebrow} title={title} onClose={onClose}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
                {formConfig
                    ? fields
                          // Bitta filial bo'lsa (yoki umuman bo'lmasa) tanlagich
                          // yashiriladi — qiymat yuqoridagi `useEffect` orqali
                          // avtomatik qo'yiladi (yoki bo'sh qoladi).
                          .filter((field) => field.optionsSource !== 'branches' || branchOptions.length > 1)
                          .map((field) => (
                          <div key={field.key} className="flex flex-col gap-1.5">
                              <Field label={t(field.labelKey)}>
                                  {renderControl(field)}
                              </Field>
                              {/* Xabar telefon maydonining ostida turadi:
                                  administrator aynan shu yerga qarab turadi. */}
                              {field.key === 'phone' && isLookup && found && decision === null && (
                                  <ExistingUserNotice
                                      user={found}
                                      onConfirm={confirmExisting}
                                      onReject={() => setDecision('new')}
                                  />
                              )}
                              {field.key === 'phone' && decision === 'new' && (
                                  <p className="text-[0.72rem] leading-snug text-fg-faint">
                                      {t('lookup.replacing')}
                                  </p>
                              )}
                              {field.key === 'phone' && isSearching && (
                                  <p className="text-[0.72rem] leading-snug text-fg-faint">
                                      {t('common.loading')}
                                  </p>
                              )}
                          </div>
                      ))
                    : fallbackColumns.map((key) => (
                          <Field key={key} label={formatHeader(key)}>
                              {renderTextInput(key)}
                          </Field>
                      ))}

                {mode === 'create' && formConfig?.createHintKey && (
                    <p className="text-[0.72rem] leading-snug text-fg-faint">
                        {t(formConfig.createHintKey)}
                    </p>
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

    function renderControl(field: FormField) {
        if (field.type === 'select') {
            const options: SelectOption[] = field.optionsSource
                ? // Serverdan kelgan nomlar tarjima qilinmaydi — ular
                  // foydalanuvchi kiritgan ma'lumot.
                  SERVER_OPTIONS[field.optionsSource]
                : (field.options ?? []).map((option) => ({
                      value: option.value,
                      label: t(option.labelKey),
                  }))
            return (
                <Select
                    placeholder={t('field.select')}
                    options={options}
                    value={(values[field.key] as string | undefined) ?? ''}
                    onChange={(event) => setValue(field.key, event.target.value)}
                />
            )
        }

        return renderTextInput(field.key, field.type)
    }

    function renderTextInput(key: string, type: string = 'text') {
        const raw = values[key]
        return (
            <Input
                type={type}
                // Telefon topilib, javob berilmaguncha qolganlari o'chiq turadi:
                // aks holda administrator yozib bo'lgach ustiga boshqa ism
                // tushadi va nima o'zgarganini sezmaydi.
                disabled={isLookup && found !== null && decision === null && key !== 'phone'}
                // `time` inputi 24 soatlik ko'rinishda chiqsin
                lang={type === 'time' ? 'ru-RU' : undefined}
                value={
                    typeof raw === 'object' && raw !== null
                        ? JSON.stringify(raw)
                        : ((raw as string | number | undefined) ?? '')
                }
                onChange={(event) =>
                    setValue(key, type === 'tel' ? formatPhone(event.target.value) : event.target.value)
                }
            />
        )
    }
}
