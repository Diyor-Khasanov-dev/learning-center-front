/**
 * Dars vaqti 10 daqiqalik qadamda: 10:00, 10:10 … 10:50.
 *
 * Nega: hech bir dars 10:14 da boshlanmaydi; erkin `<input type="time">`
 * telefonda AM/PM bilan chiqib, 11:50 o'rniga 23:50 tanlab qo'yilgan
 * holatlar bo'ldi. Soat va daqiqa alohida ro'yxatdan tanlanadi.
 */
export const MINUTE_STEP = 10

export const HOURS = Array.from({ length: 24 }, (_, hour) => String(hour).padStart(2, '0'))
export const MINUTES = Array.from({ length: 60 / MINUTE_STEP }, (_, index) =>
    String(index * MINUTE_STEP).padStart(2, '0')
)

/**
 * "HH:mm" (yoki "HH:mm:ss") ni eng yaqin 10 daqiqaga yaxlitlaydi.
 * 10:14 → 10:10, 10:55 → 11:00 (60 daqiqa soatga o'tadi), 23:55 → 23:50
 * (kun chegarasidan o'tib ketmasin). Noto'g'ri qiymat → ''.
 */
export function snapTime(value: string): string {
    const match = /^(\d{1,2}):(\d{2})/.exec(value)
    if (!match) return ''
    const hour = Number(match[1])
    const minute = Number(match[2])
    if (hour > 23 || minute > 59) return ''

    let total = Math.round((hour * 60 + minute) / MINUTE_STEP) * MINUTE_STEP
    const lastSlot = 24 * 60 - MINUTE_STEP
    if (total > lastSlot) total = lastSlot

    const snappedHour = String(Math.floor(total / 60)).padStart(2, '0')
    const snappedMinute = String(total % 60).padStart(2, '0')
    return `${snappedHour}:${snappedMinute}`
}

/** Soat yoki daqiqa tanlanganda yangi "HH:mm". Daqiqa hali tanlanmagan bo'lsa — "00". */
export function composeTime(hour: string, minute: string): string {
    if (!hour) return ''
    return `${hour}:${minute || '00'}`
}
