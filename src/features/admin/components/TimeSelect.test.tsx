import { describe, expect, it, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '@/test/renderWithProviders'
import { TimeSelect } from './TimeSelect'

describe('TimeSelect', () => {
    it('picks an hour and a ten-minute step', async () => {
        const onChange = vi.fn()
        renderWithProviders(<TimeSelect label="Boshlanish" value="" onChange={onChange} />)

        expect(screen.getByRole('combobox', { name: /daqiqa/i })).toBeDisabled()
        await userEvent.selectOptions(screen.getByRole('combobox', { name: /soat/i }), '10')
        expect(onChange).toHaveBeenLastCalledWith('10:00')
    })

    it('offers only 00–50 minutes and shows an existing value snapped', async () => {
        const onChange = vi.fn()
        renderWithProviders(<TimeSelect label="Boshlanish" value="10:14:00" onChange={onChange} />)

        const minute = screen.getByRole('combobox', { name: /daqiqa/i })
        expect(minute).toHaveValue('10')
        const values = Array.from((minute as HTMLSelectElement).options).map((option) => option.value).filter(Boolean)
        expect(values).toEqual(['00', '10', '20', '30', '40', '50'])

        await userEvent.selectOptions(minute, '30')
        expect(onChange).toHaveBeenLastCalledWith('10:30')
    })
})
