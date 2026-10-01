import { describe, expect, it } from 'vitest'
import { withCurrentTeacher } from './teacherOptions'

const all = [
    { value: 't1', label: 'Nodira' },
    { value: 't2', label: 'Jasur' },
    { value: 't3', label: 'Malika' },
]

describe('withCurrentTeacher', () => {
    it('joriy o‘qituvchi bo‘sh ro‘yxatda bo‘lmasa, uni boshiga qo‘shadi', () => {
        expect(withCurrentTeacher([all[1]], 't1', all)).toEqual([all[0], all[1]])
    })

    it('joriy o‘qituvchi ro‘yxatda bo‘lsa, takrorlamaydi', () => {
        expect(withCurrentTeacher([all[0], all[1]], 't1', all)).toEqual([all[0], all[1]])
    })

    it('yaratishda (joriy o‘qituvchi yo‘q) ro‘yxatni o‘zgartirmaydi', () => {
        expect(withCurrentTeacher([all[2]], '', all)).toEqual([all[2]])
    })

    it('joriy o‘qituvchi umumiy ro‘yxatda ham topilmasa, o‘zgartirmaydi', () => {
        expect(withCurrentTeacher([all[2]], 'yo‘q', all)).toEqual([all[2]])
    })
})
