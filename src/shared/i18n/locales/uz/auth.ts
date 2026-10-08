/**
 * Kirish sahifasi.
 *
 * O'zbekcha — HAQIQAT MANBAI. Yangi kalit avval shu yerga qo'shiladi,
 * keyin `ru/` va `en/` dagi shu nomli faylga.
 */
export const auth = {
    'auth.brand': 'Academic Lead & Intelligence Assistant',
    'auth.headline': 'Xush kelibsiz.',
    'auth.subtitle': "To'xtagan joyingizdan davom eting.",
    'auth.phone': 'Telefon raqami',
    'auth.password': 'Parol',
    'auth.showPassword': 'Parolni ko‘rsatish',
    'auth.hidePassword': 'Parolni yashirish',
    'auth.continue': 'Davom etish',
    'auth.chooseOrganization': 'Siz bir nechta o‘quv markazida o‘qiysiz. Qaysi biriga kirmoqchisiz?',
    'auth.organization': 'Tashkilot',
    'auth.organizationPlaceholder': 'Tashkilotni tanlang',
    'auth.keepSignedIn': 'Meni eslab qol',
    'auth.signIn': 'Kirish',
    'auth.signingIn': 'Kirilmoqda…',
    'auth.notAMember': 'Bu markazga kirish huquqingiz yo‘q. Administratorga murojaat qiling.',
    'auth.invalidCredentials': "Telefon raqami yoki parol noto'g'ri",
    'auth.roleMissing': "Kirildi, lekin tokendan rolni o'qib bo'lmadi.",
    'auth.stamp': 'Birinchi semestrdan beri',
    'auth.quote':
        "“Har bir kurs, har bir guruh, har bir kichik yutuq — yaxshi registrator daftar yuritganday yozib boriladi.”",
} as const

export type AuthKeys = keyof typeof auth
