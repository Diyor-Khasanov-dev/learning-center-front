# Arxitektura

## Qatlamlar

```
app  →  features  →  shared
```

O'q faqat **pastga** qaraydi:

- `app` — ilova karkasi: provider'lar, marshrutlar. Bo'limlarni biladi.
- `features` — biznes bo'limlari. `shared` dan foydalanadi, boshqa bo'limdan
  **import qilmaydi**.
- `shared` — bo'limga bog'liq bo'lmagan hamma narsa. `features` yoki `app` dan
  **hech qachon** import qilmaydi.

Nega shunday: bo'lim o'chirilsa yoki qayta yozilsa, qolgan kodga tegilmaydi.
Ikki bo'limga baravar kerak bo'lgan narsa paydo bo'lsa — u `shared` ga
ko'chiriladi, to'g'ridan-to'g'ri bir-biridan import qilinmaydi.

## Bo'lim ichidagi tartib

```
features/<nom>/
  api/         fetch chaqiruvlari; React'ni bilmaydi
  hooks/       useQuery/useMutation va holat mantiqi
  components/  shu bo'limga xos komponentlar
  config/      deklarativ konfiguratsiya (admin jadval/formalari)
  pages/       ekran — faqat yig'adi, mantiq yozmaydi
  types.ts     shu bo'limga xos tiplar
```

Qoida: **sahifa (`pages/`) mantiq saqlamaydi.** So'rov — `hooks/` da, HTTP —
`api/` da, ko'rinish — `components/` da. Sahifa shularni birlashtiradi.

Shu tufayli `AdminDashboardPage` 974 qatordan ~230 qatorga tushdi va
`useAttendanceDraft` ni DOM'siz test qilish mumkin bo'ldi.

## Fayl hajmi

Bitta faylda ~250 qatordan oshsa — bo'lish kerak. Bo'lish yo'nalishi:
avval mantiqni hook'ka, keyin takrorlanuvchi ko'rinishni komponentga.

## Yangi bo'lim qo'shish

1. `src/features/<nom>/` yarating, yuqoridagi papkalar bilan.
2. Endpoint'larni `api/` ga yozing — `shared/api` dagi `apiFetch` orqali,
   yangi `fetch` yozmang.
3. So'rov kalitini `shared/api/queryKeys.ts` ga qo'shing.
4. `hooks/` da `useQuery`/`useMutation` yozing.
5. Ekranni `pages/` ga qo'ying va `app/routes/` ga ulang.

## Yangi UI komponenti

`shared/ui/` ga faqat **ikki yoki undan ko'p bo'lim** ishlatadigan narsa
qo'shiladi. Bitta bo'limga xos komponent o'sha bo'lim ichida qoladi.

Muhim: `shared/ui/*.tsx` fayli faqat komponent eksport qilsin. Konstanta
yoki funksiya kerak bo'lsa — alohida `.ts` faylga (`inputClasses.ts` kabi),
aks holda Vite'ning Fast Refresh'i ishlamay qoladi.

## Nega har bo'limda alohida `api/`

Ilgari har sahifada o'zining `authFetch` nusxasi bor edi — uchta nusxa,
uchtasida ham bir xil xatolik ehtimoli. Endi HTTP qatlami bitta
(`shared/api/httpClient.ts`), bo'limlar esa faqat **qaysi endpoint** ekanini
biladi.

## Chap menyu (umumiy karkas)

Hamma sahifa `AppShell` ichida: chapda butun balandlikdagi menyu, o'ngda tepa
panel va kontent; telefonda menyu gamburger tugmasi bilan yon tomondan chiqadi.

- **Sahifaning o'z bo'limlari** — `AppShell` `nav` prop (admin:
  `useAdminNav`, super-admin: `useSuperAdminNav`). Ular menyuning tepasida.
- **Umumiy havolalar** (Bosh sahifa, Darajalar, Lidlar, To'lovlar, Davomat,
  Sozlamalar) — `app/routes/AppNavigation.tsx`, rol va ruxsatga qarab,
  `AppNavContext` orqali. `shared` `app` dan import qilmaydi — shuning uchun
  context. Faqat `AppRoutes` ruxsat bergan marshrutlar qo'shiladi.
- Sahifa `nav` bersa, umumiy "Bosh sahifa" bandi chiqmaydi (sahifaning o'zi
  bosh sahifa).

