import { describe, expect, it } from 'vitest'
import { fireEvent, screen } from '@testing-library/react'
import { renderWithProviders } from '@/test/renderWithProviders'
import { Avatar } from './Avatar'

describe('Avatar', () => {
    it('rasm bo‘lmasa ism bosh harflarini ko‘rsatadi', () => {
        renderWithProviders(<Avatar name="Aziza Karimova" />)
        expect(screen.getByText('AK')).toBeInTheDocument()
    })

    it('`silhouette` so‘ralganda bosh harflar o‘rniga siluet chizadi', () => {
        const { container } = renderWithProviders(<Avatar name="Aziza Karimova" fallback="silhouette" />)
        expect(screen.queryByText('AK')).not.toBeInTheDocument()
        expect(container.querySelector('svg')).toBeInTheDocument()
    })

    it('rasm berilsa uni ko‘rsatadi', () => {
        renderWithProviders(<Avatar name="Aziza Karimova" src="https://example.test/a.jpg" />)
        expect(screen.getByRole('presentation', { hidden: true })).toBeInTheDocument()
    })

    // S3 manzili eskirsa yoki tarmoq uzilsa foydalanuvchi siniq rasm ko'rmasin.
    it('rasm yuklanmasa zaxiraga o‘tadi', () => {
        renderWithProviders(<Avatar name="Aziza Karimova" src="https://example.test/yoq.jpg" />)

        fireEvent.error(screen.getByRole('presentation', { hidden: true }))

        expect(screen.getByText('AK')).toBeInTheDocument()
    })
})
