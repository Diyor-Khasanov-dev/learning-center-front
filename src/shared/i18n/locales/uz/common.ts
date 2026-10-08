/**
 * Umumiy matnlar: tugmalar, navigatsiya, hafta kunlari, xato holatlari.
 *
 * O'zbekcha — HAQIQAT MANBAI. Yangi kalit avval shu yerga qo'shiladi,
 * keyin `ru/` va `en/` dagi shu nomli faylga.
 */
export const common = {
    'common.save': 'Saqlash',
    'common.saving': 'Saqlanmoqda…',
    'common.cancel': 'Bekor qilish',
    'common.print': 'Chop etish',
    'common.close': 'Yopish',
    'common.edit': 'Tahrirlash',
    'common.delete': "O'chirish",
    'common.signOut': 'Chiqish',
    'common.loading': 'Yuklanmoqda…',
    'common.empty': '—',
    'common.prev': 'Oldingi',
    'common.next': 'Keyingi',
    'common.pageInfo': '{{page}} / {{total}}-sahifa · jami {{count}}',
    'common.somethingWrong': 'Nimadir xato ketdi. Qaytadan urinib ko’ring.',
    'common.back': 'Orqaga',
    'common.notConnected': 'Ulanmagan',
    'common.exportCsv': 'Excel ga yuklash',
    'draft.restored': 'Oldingi qoralama tiklandi',
    'draft.clear': 'Tozalash',
    'draft.confirmTitle': 'Yozganlaringiz saqlansinmi?',
    'draft.confirmText': 'Qoralama shu brauzerda qoladi — oynani keyin ochsangiz davom ettirasiz.',
    'draft.save': 'Qoralamani saqlash',
    'draft.discard': "O'chirish",
    'nav.home': 'Bosh sahifa',
    'nav.attendance': 'Davomat',
    'nav.settings': 'Sozlamalar',
    'nav.menu': 'Menyu',
    'nav.theme': 'Tema',
    'nav.theme.dark': 'To’q',
    'nav.theme.light': 'Yorug’',
    'error.notFound': 'Bunday sahifa yo‘q',
    'error.notFoundHint': 'Manzil noto‘g‘ri yoki sahifa ko‘chirilgan.',
    'pending.title': 'Backend hali tayyor emas',
    'pending.body':
        "Bu blok uchun endpoint hali yo'q. Ko'rinish tayyor — endpoint qo'shilgach, ma'lumot shu yerda chiqadi.",
    'pending.short': 'Endpoint yo’q',
} as const

export type CommonKeys = keyof typeof common
