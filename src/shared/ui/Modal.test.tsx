import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { Modal } from './Modal'
import { renderWithProviders } from '@/test/renderWithProviders'

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

describe('Modal with a draft', () => {
    const draft = (isDirty: boolean) => ({ isDirty, restored: false, discard: vi.fn(), reset: vi.fn() })

    it('closes at once when nothing was typed', () => {
        const onClose = vi.fn()
        renderWithProviders(
            <Modal title="Sarlavha" onClose={onClose} draft={draft(false)}>
                <p>forma</p>
            </Modal>
        )
        fireEvent.keyDown(document, { key: 'Escape' })
        expect(onClose).toHaveBeenCalledTimes(1)
    })

    it('asks before closing by Escape or backdrop, and keeps the draft', () => {
        const onClose = vi.fn()
        const state = draft(true)
        renderWithProviders(
            <Modal title="Sarlavha" onClose={onClose} draft={state}>
                <p>forma</p>
            </Modal>
        )

        fireEvent.keyDown(document, { key: 'Escape' })
        expect(onClose).not.toHaveBeenCalled()
        expect(screen.getByRole('alertdialog', { name: /saqlansinmi/i })).toBeInTheDocument()

        // Yana Escape — formaga qaytadi
        fireEvent.keyDown(document, { key: 'Escape' })
        expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument()

        fireEvent.click(screen.getByRole('dialog').parentElement!)
        fireEvent.click(screen.getByRole('button', { name: 'Qoralamani saqlash' }))
        expect(onClose).toHaveBeenCalledTimes(1)
        expect(state.discard).not.toHaveBeenCalled()
    })

    it('discards the draft on request', () => {
        const onClose = vi.fn()
        const state = draft(true)
        renderWithProviders(
            <Modal title="Sarlavha" onClose={onClose} draft={state}>
                <p>forma</p>
            </Modal>
        )
        fireEvent.keyDown(document, { key: 'Escape' })
        fireEvent.click(screen.getByRole('button', { name: "O'chirish" }))
        expect(state.discard).toHaveBeenCalledTimes(1)
        expect(onClose).toHaveBeenCalledTimes(1)
    })

    it('offers to clear a restored draft', () => {
        const state = { ...draft(true), restored: true }
        renderWithProviders(
            <Modal title="Sarlavha" onClose={vi.fn()} draft={state}>
                <p>forma</p>
            </Modal>
        )
        expect(screen.getByText('Oldingi qoralama tiklandi')).toBeInTheDocument()
        fireEvent.click(screen.getByRole('button', { name: 'Tozalash' }))
        expect(state.reset).toHaveBeenCalledTimes(1)
    })
})
