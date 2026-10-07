import { formatDayMonth } from '@/shared/lib'

/**
 * "Keyinroq qo'ng'iroq" vaqti — Telegramdagi "xabarni rejalashtirish"
 * kabi uchta g'ildirak: kun (yilsiz), soat, daqiqa.
 *
 * Sana `Date` ga UTC sifatida berilmaydi: hamma narsa MAHALLIY vaqtda,
 * aks holda Toshkentda kechqurun tanlangan kun ertangi bo'lib ketardi.
 */
export interface Schedule {
    /** "YYYY-MM-DD" — mahalliy sana. */
    day: string
    hour: number
    minute: number
}

/** Oldinda shuncha kun ko'rsatiladi — qo'ng'iroq odatda yaqin kunlarga. */
export const SCHEDULE_DAYS = 60

const WEEKDAYS: Record<string, string[]> = {
    uz: ['Yak', 'Du', 'Se', 'Chor', 'Pay', 'Ju', 'Shan'],
    ru: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
}

const pad = (value: number) => String(value).padStart(2, '0')

export function toDayKey(date: Date): string {
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

function addDays(date: Date, days: number): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days)
}

export function buildDayKeys(now: Date, count = SCHEDULE_DAYS): string[] {
    return Array.from({ length: count }, (_, index) => toDayKey(addDays(now, index)))
}

/** "Bugun", "Ertaga" yoki "Pay, 9 okt". */
export function dayLabel(
    key: string,
    now: Date,
    locale: string,
    words: { today: string; tomorrow: string }
): string {
    if (key === toDayKey(now)) return words.today
    if (key === toDayKey(addDays(now, 1))) return words.tomorrow
    const [year, month, day] = key.split('-').map(Number)
    const weekday = (WEEKDAYS[locale] ?? WEEKDAYS.uz)[new Date(year, month - 1, day).getDay()]
    return `${weekday}, ${formatDayMonth(key, locale)}`
}

/** Standart — bir soatdan keyin, soat boshida. */
export function defaultSchedule(now: Date): Schedule {
    const next = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + 1, 0)
    return { day: toDayKey(next), hour: next.getHours(), minute: 0 }
}

/** Backend kutgan ko'rinish: "YYYY-MM-DDTHH:mm" (mahalliy vaqt). */
export function toCallAt(schedule: Schedule): string {
    return `${schedule.day}T${pad(schedule.hour)}:${pad(schedule.minute)}`
}

export function isFuture(schedule: Schedule, now: Date): boolean {
    const [year, month, day] = schedule.day.split('-').map(Number)
    return new Date(year, month - 1, day, schedule.hour, schedule.minute).getTime() > now.getTime()
}

export function timeLabel(schedule: Schedule): string {
    return `${pad(schedule.hour)}:${pad(schedule.minute)}`
}

/**
 * Kartadagi qo'ng'iroq vaqti, Telegramdagidek 24 soatlik: "Bugun, 15:00",
 * "Ju, 9 okt, 10:30". Ilgari brauzer tiliga qarab "Aug 15, 03:00 PM" chiqardi.
 * Backend "YYYY-MM-DDTHH:mm[:ss]" (mahalliy) qaytaradi — `Date` ga bermaymiz.
 */
export function formatCallAt(
    value: string | null | undefined,
    now: Date,
    locale: string,
    words: { today: string; tomorrow: string }
): string {
    const match = /^(\d{4}-\d{2}-\d{2})T(\d{2}):(\d{2})/.exec(value ?? '')
    if (!match) return value ?? ''
    return `${dayLabel(match[1], now, locale, words)}, ${match[2]}:${match[3]}`
}
