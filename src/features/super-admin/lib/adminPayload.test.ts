import { describe, expect, it } from 'vitest'
import { buildAdminCreatePayload } from './adminPayload'

describe('buildAdminCreatePayload', () => {
    it('rolni ADMINISTRATOR qilib qo‘yadi va tanlangan ruxsatlarni yuboradi', () => {
        const payload = buildAdminCreatePayload(
            { fullName: 'Kamola Rustamova', phone: '+998901234567', branchId: 'b2', permissions: ['LEAD_MANAGEMENT'] },
            undefined
        )
        expect(payload).toEqual({
            fullName: 'Kamola Rustamova',
            phone: '+998901234567',
            role: 'ADMINISTRATOR',
            branchId: 'b2',
            permissions: ['LEAD_MANAGEMENT'],
        })
    })

    it('filial bitta bo‘lsa (soleBranchId berilsa) forma qiymatini bosib o‘tadi', () => {
        const payload = buildAdminCreatePayload(
            { fullName: 'Sardor Mirzayev', phone: '+998901234567', branchId: '', permissions: [] },
            'b1'
        )
        expect(payload.branchId).toBe('b1')
    })

    it('filial ko‘p bo‘lganda (soleBranchId yo‘q) administrator tanlagan qiymat ishlatiladi', () => {
        const payload = buildAdminCreatePayload(
            { fullName: 'Sardor Mirzayev', phone: '+998901234567', branchId: 'b3', permissions: [] },
            undefined
        )
        expect(payload.branchId).toBe('b3')
    })

    it('filial tanlanmagan va bitta ham bo‘lmasa branchId yuborilmaydi', () => {
        const payload = buildAdminCreatePayload(
            { fullName: 'Sardor Mirzayev', phone: '+998901234567', branchId: '', permissions: [] },
            undefined
        )
        expect(payload.branchId).toBeUndefined()
    })
})
