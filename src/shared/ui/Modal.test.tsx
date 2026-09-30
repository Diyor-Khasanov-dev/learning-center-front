import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { Modal } from './Modal'

describe('Modal', () => {
    /*
     * Oyna chaqirilgan joyning ichida emas, `document.body` da chizilishi
     * kerak: `Panel` dagi `backdrop-blur` `fixed` ni panelga qamab qo'yardi
     * va oyna panel o'lchamida qolib, tepasi qirqilardi.
     */
    it('document.body ga chiziladi, chaqirgan konteyner ichiga emas', () => {
        const { container } = render(
            <section>
                <Modal title="Yangi administrator" onClose={vi.fn()}>
                    <p>ichki matn</p>
                </Modal>
            </section>
        )

        const dialog = screen.getByRole('dialog')
        expect(container.contains(dialog)).toBe(false)
        expect(document.body.contains(dialog)).toBe(true)
    })

    it('fon bosilsa yopiladi, ichki bosishda yopilmaydi', () => {
        const onClose = vi.fn()
        render(
            <Modal title="Sarlavha" onClose={onClose}>
                <button type="button">ichki tugma</button>
            </Modal>
        )

        fireEvent.click(screen.getByRole('button', { name: 'ichki tugma' }))
        expect(onClose).not.toHaveBeenCalled()

        fireEvent.click(screen.getByRole('dialog').parentElement!)
        expect(onClose).toHaveBeenCalledTimes(1)
    })
})
