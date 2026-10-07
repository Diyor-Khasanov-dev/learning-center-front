import { describe, expect, it, vi } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '@/test/renderWithProviders'
import { CredentialsModal } from './CredentialsModal'

describe('CredentialsModal', () => {
    it('telefon va parolni ko’rsatadi', () => {
        renderWithProviders(
            <CredentialsModal
                credentials={{ fullName: 'Jasur Alimov', phone: '+998901234567', temporaryPassword: 'k7Qm2xPz' }}
                onClose={vi.fn()}
            />
        )

        expect(screen.getByText('+998901234567')).toBeInTheDocument()
        expect(screen.getByText('k7Qm2xPz')).toBeInTheDocument()
    })

    /*
     * Parol faqat shu javobda keladi va hech qayerda saqlanmaydi.
     * Administrator buni bilmasa, oynani yopib yuboradi va o'quvchi
     * tizimga kira olmay qoladi.
     */
    it('parol qayta ko’rsatilmasligini ogohlantiradi', () => {
        renderWithProviders(
            <CredentialsModal credentials={{ phone: '+998901234567', temporaryPassword: 'k7Qm2xPz' }} onClose={vi.fn()} />
        )

        expect(screen.getByText(/boshqa ko‘rsatilmaydi/i)).toBeInTheDocument()
    })
})
