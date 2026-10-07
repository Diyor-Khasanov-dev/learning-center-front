import { useDraft } from '@/shared/hooks'
import { UZ_PHONE_PREFIX } from '@/shared/lib'
import type { EntityFormConfig, FormValues, ModalMode } from '../types'

/** `EntityFormModal` qiymatlari — qoralama bilan (sahifa yangilansa ham qoladi). */
export function useEntityDraft(
    draftKey: string,
    mode: ModalMode,
    formConfig: EntityFormConfig | undefined,
    initialValues: FormValues
) {
    return useDraft<FormValues>(
        draftKey,
        // Yangi odam qo'shayotganda har safar "+998" ni qo'lda terish shart
        // emas. Chet el raqami bo'lsa uni o'chirib yozaveradi.
        mode === 'create' && formConfig?.lookupByPhone && !initialValues.phone
            ? { ...initialValues, phone: UZ_PHONE_PREFIX }
            : initialValues
    )
}
