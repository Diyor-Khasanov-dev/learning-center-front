# Ochiq lid formasi

Instagram/Telegram'dan kelgan mijoz `https://<domen>/f/<kalit>` ni ochib,
ism, telefon va kursni yozadi — lid avtomatik o'sha markazga "Yangi" bo'lib
tushadi. Reja Nurulloh bilan kelishilgan. Backend `main` 378b591 da
yozildi; demo mock — `src/demo/mockApi/leadForm.ts`.

## Qayerda

- Ochiq sahifa: `features/leads/pages/PublicLeadFormPage.tsx`. `AppRoutes`
  uni sessiya tekshiruvidan OLDIN chizadi — mijoz tizimga kirmaydi.
- Administrator: Lidlar → "Forma havolasi" (`LeadFormSettingsModal`):
  havola yaratish, havola qayerga qo'yilishi (`?src=`), nusxalash, QR-kod,
  sarlavha/izoh, kurs majburiyligi, ko'rinadigan kurslar, kalitni yangilash.
- Demo: `demo.html#f/demo-cornerstone`.

## Ko'rinish

Ataylab sodda (Nurulloh: "effektlar ko'payib ketgan"): nur, soya va
gradientsiz. Tepada chapda ALIA logotipi, o'ngda til — `UZ · RU · EN`.
Kurslar ochiq ro'yxat (radio), Google Forms'dagidek — telefonda ochiladigan
ro'yxatdan qulayroq. Tugma oddiy to'liq rangli. Backend tayyor bo'lgach
ko'rinish o'zgarmaydi, faqat ma'lumot (markaz nomi, kurslar) haqiqiysi bo'ladi.

## Qarorlar

- **Darajalar har ochilganda serverdan olinadi**, formaga oldindan yozib
  qo'yilmaydi: so'rov baribir ketadi (mijozning telefonida hech narsa yo'q),
  eskirgan nusxada esa o'chirilgan kurs qolib, lid xato berardi.
- **Maydonlar qat'iy** (ism, telefon, kurs) — backend lid uchun aynan
  shularni qabul qiladi. Administrator faqat matn va kurslarni sozlaydi.
  Yashirilganlar ro'yxati saqlanadi — yangi kurs formada o'zi chiqadi.
- **Kalit tasodifiy** va bazada saqlanadi (shifrlangan `organizationId`
  emas) — oshkor bo'lsa yangilanadi va eski havola ishlamay qoladi.
- `organizationId` faqat kalitdan olinadi, so'rov tanasidan emas.
- `website` — botlar uchun yashirin maydon (honeypot).
- Lidlar ro'yxati 30 soniyada o'zi yangilanadi.

## Endpointlar (backend 378b591)

| Metod | Yo'l | Kim |
| --- | --- | --- |
| GET | `/api/v1/public/lead-forms/{key}` | hamma (token yo'q) |
| POST | `/api/v1/public/lead-forms/{key}` | hamma (token yo'q) — rejadagi `/leads` qo'shimchasisiz |
| GET / POST / PUT | `/api/v1/lead-form` | administrator (`LEAD_MANAGEMENT`) yoki super-admin |
| POST | `/api/v1/lead-form/regenerate` | administrator yoki super-admin |

Shakllar: `src/shared/types/leadForm.ts`. Ochiq javobda markaz nomi `orgName`.

### Backendda hali ochiq

- `POST /public/lead-forms/{key}` da `@RequestBody` yo'q — JSON tana
  o'qilmaydi, lid saqlanmaydi (400). **Asosiy to'siq.**
- `PublicLeadFormDto` da `courseRequired` va `logoUrl` yo'q. Frontend
  `courseRequired` kelmasa kursni ixtiyoriy deb oladi; backend ham uni
  tekshirmaydi.
- `getUnhiddenLevels` — `not in (:hidLev)` bo'sh to'plam bilan (yangi forma)
  sinab ko'rilishi kerak.
- Takroriy telefon — formadan kelganda xato emas, jimgina "qabul qilindi"
  bo'lishi kerak; hozir 409 va xabar kaliti (`lead.already.exists`)
  `messages*.properties` da yo'q.
- Rate limit va honeypot (`website`) hali yo'q.
