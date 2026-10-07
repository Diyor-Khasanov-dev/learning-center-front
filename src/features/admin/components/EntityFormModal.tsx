import type { FormEvent } from 'react'
import { useSession } from '@/app/providers/useAuth'
import { errorMessage } from '@/shared/api'
import { useT } from '@/shared/i18n'
import { formatHeader, normalizePhone } from '@/shared/lib'
import { Button, ErrorBox, Field, Input, Modal, PhoneInput, Select, type SelectOption } from '@/shared/ui'
import { useEntityDraft } from '../hooks/useEntityDraft'
import { useGroupTeacherOptions } from '../hooks/useGroupTeacherOptions'
import { usePhoneLookup } from '../hooks/usePhoneLookup'
import { NoFieldsModal } from './NoFieldsModal'
import { PhoneLookupHints } from './PhoneLookupHints'
import { TimeSelect } from './TimeSelect'
import type { EntityFormConfig, FormField, FormValues, ModalMode } from '../types'

interface EntityFormModalProps {
    mode: ModalMode
    /** Sarlavhada ko'rinadigan bo'lim nomi (birlikda, tarjima qilingan). */
    entityLabel: string
    initialValues: FormValues
    /** Qoralama kaliti — bo'lim va qator bo'yicha (`entity:students:new`). */
    draftKey: string
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
    draftKey,
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
    const draft = useEntityDraft(draftKey, mode, formConfig, initialValues)
    const { value: values, setValue: setValues } = draft

    /*
     * Telefon bo'yicha qidiruv — faqat yangi odam qo'shayotganda.
     * Tahrirlashda odam allaqachon ma'lum, qidirishning ma'nosi yo'q.
     */
    const isLookup = mode === 'create' && formConfig?.lookupByPhone === true
    const phone = String(values.phone ?? '')

    const { found, isSearching, decision, confirmExisting, rejectExisting, resetDecision } = usePhoneLookup(
        session.token,
        phone,
        isLookup,
        setValues
    )

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

    const freeTeachersOptions = useGroupTeacherOptions(session.token, mode, values, initialValues, teacherOptions)

    /** `optionsSource` → tayyor ro'yxat. Yangi manba qo'shish bir qator. */
    const SERVER_OPTIONS: Record<NonNullable<FormField['optionsSource']>, SelectOption[]> = {
        teachers: teacherOptions,
        groups: groupOptions,
        branches: branchOptions,
        freeTeachers: freeTeachersOptions,
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
        if (key === 'phone') resetDecision()
        setValues((current) => ({ ...current, [key]: value }))
    }

    // "Bekor qilish" — ongli tanlov: qoralama so'ramasdan o'chadi.
    const cancel = () => {
        draft.discard()
        onClose()
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        draft.discard()
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
        return <NoFieldsModal eyebrow={eyebrow} title={title} onClose={onClose} />
    }

    return (
        <Modal eyebrow={eyebrow} title={title} onClose={onClose} draft={draft}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
                {formConfig
                    ? fields
                          // Bitta filial bo'lsa (yoki umuman bo'lmasa) tanlagich
                          // yashiriladi — qiymat `handleSubmit` da qo'yiladi
                          // (yoki bo'sh qoladi).
                          .filter((field) => field.optionsSource !== 'branches' || branchOptions.length > 1)
                          .map((field) => (
                          <div key={field.key} className="flex flex-col gap-1.5">
                              <Field label={t(field.labelKey)}>
                                  {renderControl(field)}
                              </Field>
                              {field.key === 'phone' && (
                                  <PhoneLookupHints
                                      isLookup={isLookup}
                                      found={found}
                                      isSearching={isSearching}
                                      decision={decision}
                                      onConfirm={confirmExisting}
                                      onReject={rejectExisting}
                                  />
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
                    <Button onClick={cancel}>{t('common.cancel')}</Button>
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

        if (field.type === 'time') {
            return (
                <TimeSelect
                    label={t(field.labelKey)}
                    value={(values[field.key] as string | undefined) ?? ''}
                    onChange={(next) => setValue(field.key, next)}
                />
            )
        }

        return renderTextInput(field.key, field.type)
    }

    function renderTextInput(key: string, type: string = 'text') {
        const raw = values[key]
        if (type === 'tel') {
            return (
                <PhoneInput
                    disabled={isLookup && found !== null && decision === null && key !== 'phone'}
                    value={typeof raw === 'string' ? raw : ''}
                    onChange={(next) => setValue(key, next)}
                />
            )
        }
        return (
            <Input
                type={type}
                // Telefon topilib, javob berilmaguncha qolganlari o'chiq turadi:
                // aks holda administrator yozib bo'lgach ustiga boshqa ism
                // tushadi va nima o'zgarganini sezmaydi.
                disabled={isLookup && found !== null && decision === null && key !== 'phone'}
                value={
                    typeof raw === 'object' && raw !== null
                        ? JSON.stringify(raw)
                        : ((raw as string | number | undefined) ?? '')
                }
                onChange={(event) => setValue(key, event.target.value)}
            />
        )
    }
}
