import { useRef, useState } from 'react'
import { useSession } from '@/app/providers/useAuth'
import { errorMessage } from '@/shared/api'
import { useT } from '@/shared/i18n'
import { Badge, Button, ErrorBox } from '@/shared/ui'
import { useDeleteImage, useImages, useSetMainImage, useUploadImage } from '../hooks/useImages'
import { useMe } from '../hooks/useMe'
import { isMainImage } from '../lib/mainImage'
import { SettingsSection } from './SettingsSection'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5 MB
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png']
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png']

interface ImageGalleryProps {
    token?: string
}

export function ImageGallery({ token: propToken }: ImageGalleryProps) {
    const { t } = useT()
    const session = useSession()
    const activeToken = propToken ?? session.token

    const { data: me } = useMe(activeToken)
    const { data: imagesData, isLoading, error: fetchError } = useImages(activeToken)

    const uploadMutation = useUploadImage(activeToken)
    const setMainMutation = useSetMainImage(activeToken)
    const deleteMutation = useDeleteImage(activeToken)

    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [actionError, setActionError] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const validateFile = (file: File): string | null => {
        const fileType = file.type.toLowerCase()
        const fileName = file.name.toLowerCase()

        const isMimeValid = ALLOWED_MIME_TYPES.includes(fileType)
        const isExtensionValid = ALLOWED_EXTENSIONS.some((ext) => fileName.endsWith(ext))

        if (!isMimeValid && !isExtensionValid) {
            return t('settings.invalidFileType')
        }

        if (file.size > MAX_FILE_SIZE) {
            return t('settings.fileTooLarge')
        }

        return null
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setActionError(null)
        const file = e.target.files?.[0]
        if (!file) {
            setSelectedFile(null)
            return
        }

        const errorMsg = validateFile(file)
        if (errorMsg) {
            setActionError(errorMsg)
            setSelectedFile(null)
            if (fileInputRef.current) fileInputRef.current.value = ''
            return
        }

        setSelectedFile(file)
    }

    const handleUpload = () => {
        if (!selectedFile) return
        setActionError(null)

        const errorMsg = validateFile(selectedFile)
        if (errorMsg) {
            setActionError(errorMsg)
            return
        }

        uploadMutation.mutate(selectedFile, {
            onSuccess: () => {
                setSelectedFile(null)
                if (fileInputRef.current) fileInputRef.current.value = ''
            },
            onError: (err) => {
                setActionError(errorMessage(err, t('settings.uploadError')))
            },
        })
    }

    const handleSetMain = (imageId?: string) => {
        if (!imageId) return
        setActionError(null)

        setMainMutation.mutate(imageId, {
            onError: (err) => {
                setActionError(errorMessage(err, t('settings.setMainError')))
            },
        })
    }

    const handleDelete = (imageId?: string) => {
        if (!imageId) return
        setActionError(null)

        deleteMutation.mutate(imageId, {
            onError: (err) => {
                setActionError(errorMessage(err, t('settings.deleteError')))
            },
        })
    }

    const images = imagesData?.content ?? []

    return (
        <SettingsSection title={t('settings.myImages')} description={t('settings.myImagesHint')}>
            <div className="space-y-4">
                {/* Fayl yuklash formasi */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <label htmlFor="image-file-input" className="sr-only">
                        {t('settings.selectImageFile')}
                    </label>
                    <input
                        id="image-file-input"
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/png"
                        onChange={handleFileChange}
                        className="block w-full text-sm text-fg-muted file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-surface-elevated file:text-fg hover:file:bg-surface-hover cursor-pointer"
                    />
                    <Button
                        onClick={handleUpload}
                        disabled={!selectedFile || uploadMutation.isPending}
                        variant="primary"
                        size="sm"
                    >
                        {uploadMutation.isPending ? t('settings.uploading') : t('settings.uploadImage')}
                    </Button>
                </div>

                {/* Xatoliklar ko'rsatuvchi oyna */}
                {actionError && <ErrorBox>{actionError}</ErrorBox>}
                {fetchError && <ErrorBox>{errorMessage(fetchError)}</ErrorBox>}

                {/* Yuklanish holati */}
                {isLoading && <p className="text-sm text-fg-faint">{t('common.loading')}</p>}

                {/* Rasmlar yo'q holat */}
                {!isLoading && images.length === 0 && (
                    <p className="text-sm text-fg-muted">{t('settings.noImages')}</p>
                )}

                {/* Rasmlar to'plami grid ko'rinishida */}
                {images.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {images.map((img) => {
                            const isMain = isMainImage(img, me?.imageUrl)

                            return (
                                <div
                                    key={img.id ?? img.imageUrl}
                                    className="relative flex flex-col items-center rounded-lg border border-border-base bg-surface p-3 gap-3 overflow-hidden shadow-xs"
                                >
                                    <div className="relative w-full h-36 rounded-md overflow-hidden bg-surface-elevated">
                                        <img
                                            src={img.imageUrl}
                                            alt={img.originalFileName ?? t('settings.uploadedProfileImage')}
                                            className="h-full w-full object-cover"
                                        />
                                        {isMain && (
                                            <div className="absolute top-2 right-2">
                                                <Badge tone="success">{t('settings.mainImage')}</Badge>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex w-full items-center justify-center gap-2">
                                        {!isMain && (
                                            <>
                                                <Button
                                                    size="sm"
                                                    variant="secondary"
                                                    onClick={() => handleSetMain(img.id)}
                                                    disabled={setMainMutation.isPending}
                                                >
                                                    {t('settings.setAsMain')}
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="danger"
                                                    onClick={() => handleDelete(img.id)}
                                                    disabled={deleteMutation.isPending}
                                                >
                                                    {t('settings.deleteImage')}
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </SettingsSection>
    )
}
