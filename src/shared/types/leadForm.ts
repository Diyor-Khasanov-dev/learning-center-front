import type { GroupLevelNameDto } from './group'
import type { LeadSource } from './lead'

/**
 * Lid formasi — markazning ochiq havolasi (`/f/<kalit>`).
 *
 * Manba: backend `main` (378b591) — `LeadFormDto`, `LeadFormUpdateDto`,
 * `PublicLeadFormDto` record'lari.
 */

/** `GET /public/lead-forms/{key}` — tokensiz, mijozning telefonida ochiladi. */
export interface PublicLeadFormDto {
    /** Backendda aynan `orgName`. */
    orgName: string
    /** Hali yo'q — backendga so'ralgan (`Organization.logoUrl`). */
    logoUrl?: string | null
    title?: string | null
    description?: string | null
    /**
     * Kurs majburiymi. Backend record'ida `isLevelRequired` — Jackson boolean
     * `is…` ni ba'zan `levelRequired` qilib chiqaradi, shuning uchun ikkalasi.
     * Kelmasa — ixtiyoriy: aks holda kurssiz markaz formasi yuborilmasdi.
     */
    isLevelRequired?: boolean
    levelRequired?: boolean
    /** Yashirilgan va o'chirilganlarsiz — faqat ko'rsatiladiganlar. */
    levels: GroupLevelNameDto[]
}

/** `POST /public/lead-forms/{key}` tanasi (backend `LeadCreateDto`). `organizationId` YO'Q — u faqat kalitdan. */
export interface PublicLeadSubmitDto {
    fullName: string
    phone: string
    preferredCourseId?: string
    source: LeadSource
    /** Botlar uchun yashirin maydon (honeypot): odam uni ko'rmaydi va bo'sh qoldiradi. */
    website: string
}

/** `GET /lead-form` — administratorning o'z markazi formasi sozlamasi. */
export interface LeadFormDto {
    id?: string
    key: string
    enabled: boolean
    title?: string | null
    description?: string | null
    courseRequired: boolean
    hiddenLevelIds: string[]
}

/** `PUT /lead-form` tanasi. */
export type LeadFormUpdateDto = Omit<LeadFormDto, 'key' | 'id'>
