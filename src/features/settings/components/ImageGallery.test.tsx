import { describe, expect, it, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '@/test/renderWithProviders'
import type { ImageDto } from '@/shared/types'
import { ImageGallery } from './ImageGallery'

describe('ImageGallery', () => {
    const images: ImageDto[] = [
        { id: 'img-1', imageUrl: 'https://example.com/avatar1.jpg', originalFileName: 'avatar1.jpg' },
        { id: 'img-2', imageUrl: 'https://example.com/avatar2.jpg', originalFileName: 'avatar2.jpg' },
    ]
    const meImageUrl = 'https://example.com/avatar1.jpg'

    it('the main image must not have a delete button, but other images must have a delete button', () => {
        const onUpload = vi.fn()
        const onSetMain = vi.fn()
        const onDelete = vi.fn()

        renderWithProviders(
            <ImageGallery
                images={images}
                meImageUrl={meImageUrl}
                onUpload={onUpload}
                onSetMain={onSetMain}
                onDelete={onDelete}
            />
        )

        // Asosiy rasmda (img-1) o'chirish tugmasi bo'lmasligi kerak,
        // faqat asosiy bo'lmagan rasmda (img-2) o'chirish tugmasi bo'lishi kerak.
        const deleteButtons = screen.getAllByRole('button', { name: /o‘chirish|delete/i })
        expect(deleteButtons).toHaveLength(1)
    })

    it('when "Set as main" is clicked, the corresponding API call / callback must be made', async () => {
        const user = userEvent.setup()
        const onUpload = vi.fn()
        const onSetMain = vi.fn()
        const onDelete = vi.fn()

        renderWithProviders(
            <ImageGallery
                images={images}
                meImageUrl={meImageUrl}
                onUpload={onUpload}
                onSetMain={onSetMain}
                onDelete={onDelete}
            />
        )

        const setMainButton = screen.getByRole('button', { name: /asosiy qilish|set as main/i })
        await user.click(setMainButton)

        // img-2 uchun onSetMain chaqirilganini tekshiramiz
        expect(onSetMain).toHaveBeenCalledTimes(1)
        expect(onSetMain).toHaveBeenCalledWith('img-2')
    })

    it('calls onDelete when delete button on non-main image is clicked', async () => {
        const user = userEvent.setup()
        const onUpload = vi.fn()
        const onSetMain = vi.fn()
        const onDelete = vi.fn()

        renderWithProviders(
            <ImageGallery
                images={images}
                meImageUrl={meImageUrl}
                onUpload={onUpload}
                onSetMain={onSetMain}
                onDelete={onDelete}
            />
        )

        const deleteButton = screen.getByRole('button', { name: /o‘chirish|delete/i })
        await user.click(deleteButton)

        expect(onDelete).toHaveBeenCalledTimes(1)
        expect(onDelete).toHaveBeenCalledWith('img-2')
    })
})
