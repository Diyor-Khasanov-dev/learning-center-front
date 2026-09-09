import { useRef, useState, type ChangeEvent } from 'react'
import type { ImageDto } from '@/shared/types'
import { Badge, Button, ErrorBox, TrashIcon } from '@/shared/ui'
import { useT } from '@/shared/i18n'
import { isMainImage } from '../lib/mainImage'

interface ImageGalleryProps {
    images: ImageDto[]
    meImageUrl?: string | null
    isLoading?: boolean
    isUploading?: boolean
    isSettingMain?: boolean
    isDeleting?: boolean
    error?: string | null
    onUpload: (file: File) => void
    onSetMain: (id: string) => void
    onDelete: (id: string) => void
}

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024 // Approx 5 MB max size
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png']
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png']

export function ImageGallery({
    images,
    meImageUrl,
    isLoading = false,
    isUploading = false,
    isSettingMain = false,
    isDeleting = false,
    error = null,
    onUpload,
    onSetMain,
    onDelete,
}: ImageGalleryProps) {
    const { t } = useT()
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [localError, setLocalError] = useState<string | null>(null)

    // Fayl tanlanganda validatsiya qilamiz (MIME type, extension, size)
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLocalError(null)
        const file = e.target.files?.[0]
        if (!file) return

        // Fayl kengaytmasi va turini tekshirish
        const fileNameLower = file.name.toLowerCase()
        const hasValidExt = ALLOWED_EXTENSIONS.some((ext) => fileNameLower.endsWith(ext))
        const hasValidType = ALLOWED_MIME_TYPES.includes(file.type)

        if (!hasValidExt && !hasValidType) {
            setLocalError(t('settings.invalidFileType'))
            if (fileInputRef.current) fileInputRef.current.value = ''
            return
        }

        // Fayl hajmini tekshirish (maksimum 5MB)
        if (file.size > MAX_FILE_SIZE_BYTES) {
            setLocalError(t('settings.fileTooLarge'))
            if (fileInputRef.current) fileInputRef.current.value = ''
            return
        }

        onUpload(file)
        if (fileInputRef.current) fileInputRef.current.value = ''
    }

    const displayedError = localError || error

    return (
        <div className="space-y-4">
            {/* Yuklash bloki */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-surface-panel p-4">
                <div>
                    <h4 className="text-sm font-medium text-fg">{t('settings.uploadImage')}</h4>
                    <p className="text-xs text-fg-muted">
                        JPG, JPEG, PNG (max 5MB)
                    </p>
                </div>
                <div>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/png"
                        onChange={handleFileChange}
                        className="hidden"
                        id="image-file-input"
                        aria-label={t('settings.uploadImage')}
                    />
                    <Button
                        size="sm"
                        variant="primary"
                        disabled={isUploading}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        {isUploading ? t('common.loading') : t('settings.uploadImage')}
                    </Button>
                </div>
            </div>

            {/* Xatolar */}
            {displayedError && <ErrorBox>{displayedError}</ErrorBox>}

            {/* Yuklanmoqda holati */}
            {isLoading ? (
                <p className="text-sm text-fg-faint">{t('common.loading')}</p>
            ) : images.length === 0 ? (
                <p className="py-4 text-center text-sm text-fg-muted">{t('settings.noImages')}</p>
            ) : (
                /* Rasmlar paneli: Responsive Grid */
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                    {images.map((img) => {
                        const isMain = isMainImage(img, meImageUrl)

                        return (
                            <div
                                key={img.id}
                                className={`relative flex flex-col justify-between overflow-hidden rounded-xl border p-3 transition-colors ${
                                    isMain
                                        ? 'border-accent bg-accent/5'
                                        : 'border-border bg-surface-panel'
                                }`}
                            >
                                {/* Rasm ko'rinishi va Belgilar */}
                                <div className="relative mb-3 flex aspect-square items-center justify-center overflow-hidden rounded-lg bg-surface-elevated">
                                    <img
                                        src={img.imageUrl}
                                        alt={img.originalFileName || 'User image'}
                                        className="h-full w-full object-cover"
                                    />
                                    {isMain && (
                                        <div className="absolute top-2 left-2">
                                            <Badge tone="accent">{t('settings.mainImageBadge')}</Badge>
                                        </div>
                                    )}
                                </div>

                                {/* Amallar paneli */}
                                <div className="flex items-center justify-between gap-2 pt-1">
                                    {isMain ? (
                                        <span className="text-xs font-medium text-accent">
                                            {t('settings.mainImageBadge')}
                                        </span>
                                    ) : (
                                        <>
                                            <Button
                                                size="sm"
                                                variant="secondary"
                                                disabled={isSettingMain || isDeleting}
                                                onClick={() => onSetMain(img.id)}
                                            >
                                                {t('settings.setAsMain')}
                                            </Button>

                                            {/* Backend talabi: Asosiy rasmda o'chirish tugmasi umuman bo'lmasligi kerak.
                                                Aynan shuning uchun faqat !isMain holatida render qilinadi. */}
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                disabled={isSettingMain || isDeleting}
                                                onClick={() => onDelete(img.id)}
                                                aria-label={`${t('settings.deleteImage')}`}
                                                className="text-danger hover:bg-danger/10"
                                            >
                                                <TrashIcon />
                                                <span className="hidden sm:inline">
                                                    {t('settings.deleteImage')}
                                                </span>
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
    )
}
