import { describe, expect, it, vi } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '@/test/renderWithProviders'
import { AdminCredentialsModal } from './AdminCredentialsModal'

describe('AdminCredentialsModal', () => {
    it('telefon va vaqtinchalik parolni ko’rsatadi', () => {
        renderWithProviders(
            <AdminCredentialsModal
                credentials={{ id: 'a1', fullName: 'Kamola Rustamova', phone: '+998901234567', temporaryPassword: 'k7Qm2xPz' }}
                onClose={vi.fn()}
            />
        )

        expect(screen.getByText('+998901234567')).toBeInTheDocument()
        expect(screen.getByText('k7Qm2xPz')).toBeInTheDocument()
    })

    /*
     * Telefon tizimda allaqachon bor bo'lsa backend yangi parol
     * yaratmaydi (`temporaryPassword: null`) — bunda parol qatori
     * o'rniga "eski paroli bilan kiradi" degan xabar chiqishi kerak,
     * aks holda administrator bo'sh joyni parol deb o'ylab qolishi mumkin.
     */
    it('parol null kelsa, parol o‘rniga mavjud akkaunt haqida xabar chiqadi', () => {
        renderWithProviders(
            <AdminCredentialsModal
                credentials={{ id: 'a1', fullName: 'Kamola Rustamova', phone: '+998901234567', temporaryPassword: null }}
                onClose={vi.fn()}
            />
        )

        expect(screen.getByText(/eski paroli bilan kiradi/i)).toBeInTheDocument()
        expect(screen.queryByText(/boshqa ko‘rsatilmaydi/i)).not.toBeInTheDocument()
    })
})
