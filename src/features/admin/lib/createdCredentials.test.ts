import { describe, expect, it } from 'vitest'
import { createdCredentials } from './createdCredentials'

describe('createdCredentials', () => {
    // Ilgari `password` kutilardi — backend esa `temporaryPassword` beradi,
    // shuning uchun parol oynasi hech qachon chiqmasdi.
    it('reads the temporary password from the backend response', () => {
        const created = { id: 't1', userDto: { id: 'u1', fullName: 'Ali', phone: '+998901234567', temporaryPassword: 'k7Qm2xPz' } }

        expect(createdCredentials(created)).toMatchObject({ fullName: 'Ali', temporaryPassword: 'k7Qm2xPz' })
    })

    it('returns null when no password was generated', () => {
        expect(createdCredentials({ id: 't1', userDto: { fullName: 'Ali', temporaryPassword: null } })).toBeNull()
        expect(createdCredentials(null)).toBeNull()
    })
})
