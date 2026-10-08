/**
 * Telefonni backend kutgan ko'rinishga keltiradi: faqat `+` va raqamlar.
 * Foydalanuvchi `+998 90 123-45-67` deb yozadi — ilgari bunday yozuv
 * validatsiyadan o'tmay, "Saqlash" tugmasi jimgina o'chib qolar edi.
 */
export function normalizePhone(raw: string): string {
    const digits = raw.replace(/[^\d]/g, '')
    // Faqat "+998" — maydon bo'sh qoldirilgan degani. `PhoneInput` prefiksni
    // doim ko'rsatadi, shuning uchun ixtiyoriy maydon (ota-ona telefoni)
    // tegilmasa ham "+998" bo'lib keladi — uni serverga raqam deb yubormaymiz.
    if (digits === '998' && raw.trim().startsWith('+')) return ''
    return raw.trim().startsWith('+') ? `+${digits}` : digits
}

/** E.164: ixtiyoriy `+`, birinchi raqam 0 emas, jami 2..15 raqam. */
const PHONE_RE = /^\+?[1-9]\d{1,14}$/

export function isValidPhone(raw: string): boolean {
    return PHONE_RE.test(normalizePhone(raw))
}

/** O'zbekiston raqamining bo'laklari: +998 90 123 45 67. */
const UZ_GROUPS = [2, 3, 2, 2]

/**
 * Yozish paytida o'qishga qulay ko'rinish beradi.
 *
 * Faqat O'zbekiston raqamiga (`998`) tegadi: qolganlarida har davlatning
 * o'z guruhlashi bor va biz uni bilmaymiz, shuning uchun tegmaymiz —
 * xato formatlash umuman formatlamaslikdan yomonroq.
 *
 * Bu FAQAT ko'rinish uchun. Serverga yuborishdan oldin `normalizePhone`
 * chaqiriladi, aks holda "+998 90 …" va "+99890…" ikki xil satr bo'lib,
 * telefon bo'yicha qidiruv ham, yagonalik sharti ham buziladi.
 */
export function formatPhone(raw: string): string {
    const digits = raw.replace(/\D/g, '')
    if (!digits.startsWith('998')) return raw

    const rest = digits.slice(3, 12)
    const parts: string[] = []
    let offset = 0
    for (const size of UZ_GROUPS) {
        if (offset >= rest.length) break
        parts.push(rest.slice(offset, offset + size))
        offset += size
    }

    return `+998${parts.length ? ' ' + parts.join(' ') : ' '}`
}

/** Yangi raqam yozishni boshlashdagi qiymat — har safar `+998` terilmasin. */
export const UZ_PHONE_PREFIX = '+998 '

/** `+998` dan keyingi raqamlar soni: 90 123 45 67. */
const UZ_LOCAL_DIGITS = 9

/**
 * Faqat O'zbekiston raqami uchun maydon ko'rinishi: har doim `+998 ` bilan
 * boshlanadi va 9 ta raqamdan ortig'ini qabul qilmaydi.
 *
 * Loyiha hozircha faqat O'zbekiston uchun — ilgari login maydoniga
 * `+99833333333333333` kabi cheksiz raqam yozib bo'lardi. Foydalanuvchi
 * `901234567` yoki `998901234567` ni joylashtirsa ham to'g'ri chiqadi.
 */
export function formatUzPhone(raw: string): string {
    let digits = raw.replace(/\D/g, '')
    // Prefiksdan raqam o'chirilsa ("+99") — bu raqam emas, bo'sh maydon.
    // Aks holda o'chirilgan "99" mahalliy raqam bo'lib qo'shilib ketardi.
    if ('998'.startsWith(digits)) return formatPhone('+998')
    // Mavjud "+998 " ustiga to'liq raqam joylansa "998998…" bo'ladi —
    // ortiqcha prefikslarni olib tashlaymiz, mahalliy qism 9 ta raqam.
    while (digits.startsWith('998') && digits.length > UZ_LOCAL_DIGITS) digits = digits.slice(3)
    return formatPhone(`+998${digits.slice(0, UZ_LOCAL_DIGITS)}`)
}

/** To'liq kiritilgan O'zbekiston raqami: +998 va 9 ta raqam. */
export function isCompleteUzPhone(raw: string): boolean {
    return /^\+998\d{9}$/.test(normalizePhone(raw))
}

