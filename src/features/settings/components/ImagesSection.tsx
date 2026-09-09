import { useState } from 'react'
import { useSession } from '@/app/providers/useAuth'
import { errorMessage } from '@/shared/api'
import { useT } from '@/shared/i18n'
import { useDeleteImage, useImages, useSetMainImage, useUploadImage } from '../hooks/useImages'
import { useMe } from '../hooks/useMe'
import { ImageGallery } from './ImageGallery'
import { SettingsSection } from './SettingsSection'

/**
 * Sozlamalar sahifasidagi "Mening rasmlarim" bloki.
 * Foydalanuvchiga rasmlarini ko'rish, yangisini yuklash, asosiy rasmni tanlash
 * hamda eskilarni o'chirish imkonini beradi.
 */
export function ImagesSection() {
    const { t } = useT()
    const session = useSession()
    const { data: me } = useMe(session.token)
    const { data: imagesPage, isLoading: isImagesLoading, error: imagesError } = useImages(session.token)

    const uploadMutation = useUploadImage(session.token)
    const setMainMutation = useSetMainImage(session.token)
    const deleteMutation = useDeleteImage(session.token)

    const [actionError, setActionError] = useState<string | null>(null)

    const images = imagesPage?.content ?? []

    const handleUpload = (file: File) => {
        setActionError(null)
        uploadMutation.mutate(file, {
            onError: (err) => {
                setActionError(errorMessage(err))
            },
        })
    }

    const handleSetMain = (id: string) => {
        setActionError(null)
        setMainMutation.mutate(id, {
            onError: (err) => {
                setActionError(errorMessage(err))
            },
        })
    }

    const handleDelete = (id: string) => {
        setActionError(null)
        deleteMutation.mutate(id, {
            onError: (err) => {
                setActionError(errorMessage(err))
            },
        })
    }

    const rawError = actionError || (imagesError ? errorMessage(imagesError) : null)

    return (
        <SettingsSection title={t('settings.images')} description={t('settings.imagesHint')}>
            <ImageGallery
                images={images}
                meImageUrl={me?.imageUrl}
                isLoading={isImagesLoading}
                isUploading={uploadMutation.isPending}
                isSettingMain={setMainMutation.isPending}
                isDeleting={deleteMutation.isPending}
                error={rawError}
                onUpload={handleUpload}
                onSetMain={handleSetMain}
                onDelete={handleDelete}
            />
        </SettingsSection>
    )
}
