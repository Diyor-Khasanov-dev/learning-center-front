/**
 * Sozlamalar sahifasi.
 *
 * O'zbekcha — HAQIQAT MANBAI. Yangi kalit avval shu yerga qo'shiladi,
 * keyin `ru/` va `en/` dagi shu nomli faylga.
 */
export const settings = {
    'settings.title': 'Sozlamalar',
    'settings.appearance': "Ko'rinish",
    'settings.appearanceHint': 'Til va rang rejimi shu qurilmada saqlanadi.',
    'settings.language': 'Til',
    'settings.theme': 'Rang rejimi',
    'settings.themeLight': 'Yorug’',
    'settings.themeDark': 'To’q',
    'settings.profile': 'Profil',
    'settings.profileHint': "O'z ma'lumotlaringiz.",
    'settings.password': 'Parol',
    'settings.passwordHint': 'Parolni o’zgartirish.',
    'settings.currentPassword': 'Joriy parol',
    'settings.newPassword': 'Yangi parol',
    'settings.repeatPassword': 'Yangi parolni takrorlang',
    'settings.passwordMismatch': 'Yangi parollar mos kelmadi.',
    'settings.centre': 'Markaz sozlamalari',
    'settings.centreHint': "Butun markaz uchun — faqat administrator ko'radi.",
    'settings.centreName': 'Markaz nomi',
    'settings.centreAddress': "Manzil",
    'settings.centreMapsUrl': "Google Maps havolasi",
    'settings.centreSaved': "Markaz sozlamalari saqlandi.",
    'settings.centreLoadFailed': "Markaz ma'lumotini yuklab bo‘lmadi: {{message}}",
    'settings.profileSaved': 'Profil saqlandi.',
    'settings.passwordChanged': 'Parol o‘zgartirildi.',
    'settings.passwordEmpty': 'Hamma maydonni to‘ldiring.',
    'settings.passwordTooShort': 'Yangi parol kamida 8 belgidan iborat bo‘lsin.',
    'settings.images': 'Mening rasmlarim',
    'settings.imagesHint': 'Profilingiz uchun rasmlarni boshqaring. Yuklangan rasmlardan birini asosiy rasm qilib belgilashingiz mumkin.',
    'settings.uploadImage': 'Rasm yuklash',
    'settings.setAsMain': 'Asosiy qilish',
    'settings.mainImageBadge': 'Asosiy',
    'settings.deleteImage': 'O‘chirish',
    'settings.invalidFileType': 'Faqat JPG, JPEG yoki PNG formatdagi rasmlar ruxsat etiladi.',
    'settings.fileTooLarge': 'Fayl hajmi 5 MB dan oshmasligi kerak.',
    'settings.noImages': 'Hozircha rasmlar yuklanmagan.',
    'settings.uploadSuccess': 'Rasm yuklandi va asosiy rasm qilib belgilandi.',
    'settings.setMainSuccess': 'Asosiy rasm o‘zgartirildi.',
    'settings.deleteSuccess': 'Rasm o‘chirildi.',
} as const

export type SettingsKeys = keyof typeof settings
