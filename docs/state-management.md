# Holat boshqaruvi

## Qisqacha

| Holat turi                          | Qayerda saqlanadi                   |
| ----------------------------------- | ----------------------------------- |
| Server ma'lumoti (ro'yxat, guruh, davomat) | **TanStack Query**           |
| Sessiya (token, rol)                | `AuthProvider` (React Context)      |
| Tema                                | `ThemeProvider` (React Context)     |
| Forma va UI holati (modal ochiq/yopiq) | shu komponentning `useState` i   |

## Nega Redux emas

Bu ilovada "global client state" deyarli yo'q — ekrandagi hamma narsa
serverdan keladi. Redux (yoki RTK) bilan har bir entity uchun cache,
`isLoading`, `error`, sahifalash va mutatsiyadan keyin yangilashni **qo'lda**
yozish kerak bo'lardi. TanStack Query buni tayyor beradi.

Redux kerak bo'ladigan holat: bir nechta uzoq ekranlar bir xil murakkab
client holatini baham ko'rsa (masalan ko'p bosqichli mastero yoki offline
navbat). Shunday holat paydo bo'lsa — o'shanda qo'shiladi, oldindan emas.

## Qoidalar

**1. Server ma'lumoti `useState` ga ko'chirilmaydi.**

```ts
// noto'g'ri — ikki nusxa paydo bo'ladi va ular ajralib ketadi
const [rows, setRows] = useState([])
useEffect(() => { fetchRows().then(setRows) }, [])

// to'g'ri
const { data } = useQuery({ queryKey: …, queryFn: … })
```

**2. Mutatsiyadan keyin `invalidateQueries`,** qo'lda `setState` emas —
ekranda server nima saqlaganini ko'rish kerak:

```ts
onSuccess: () => queryClient.invalidateQueries({ queryKey: ['entity', entity.key] })
```

**3. Kalitlar `shared/api/queryKeys.ts` da.** Kalit satrini joyida yozish
eng ko'p uchraydigan xato: invalidatsiya ishlamay qoladi va sabab ko'rinmaydi.

**4. Query'lar prefiks bo'yicha guruhlanadi:** `['entity', 'students', …]`.
Shuning uchun `['entity', 'students']` ni bekor qilish o'sha bo'limning
barcha sahifa/qidiruv variantlarini yangilaydi.

## Umumiy sozlamalar

[`app/providers/queryClient.ts`](../src/app/providers/queryClient.ts)
(`AppProviders` uni komponent ichida chaqiradi):

- `staleTime: 30s` — har fokusda qayta so'rov yubormaslik uchun;
- `retry` — 4xx da qayta urinmaydi (javob o'zgarmaydi), 5xx da 2 marta;
- `QueryClient` komponent ichida yaratiladi, modul darajasida emas — aks
  holda testlar bir-birining cache'ini meros qilib oladi;
- **har qanday mutatsiya xatosi** `MutationCache.onError` orqali o'ng yuqori
  burchakda qizil xabar (`shared/ui/Toaster`) bo'lib chiqadi va 5 soniyada
  yo'qoladi. Xabar `Modal` ustida turadi — xato oyna orqasida qolib ketmaydi.
  Xatoni o'zi ko'rsatadigan mutatsiya (masalan login formasi)
  `meta: { toast: false }` bilan chiqib ketadi.

## Hosila holat (derived state)

Hisoblab olish mumkin bo'lgan narsa state'da saqlanmaydi. Misol —
[`useAttendanceDraft`](../src/features/attendance/hooks/useAttendanceDraft.ts):
davomat qoralamasi faol dars + ro'yxatdan hisoblanadi, state'da faqat
o'qituvchi qo'lda o'zgartirgan statuslar turadi.

Foydasi: dars almashganda qoralamani "tozalash" kerak emas, u o'zi
yangilanadi, va `useEffect` ichida `setState` bo'lmaydi.

## Forma qoralamalari (`useDraft`)

Modal formada yozilgan narsa sahifa yangilansa ham yo'qolmasligi uchun
qiymat `useState` o'rniga
[`useDraft(kalit, boshlang'ich)`](../src/shared/hooks/useDraft.ts) da turadi.
Bu server ma'lumoti emas — foydalanuvchi hali yubormagan matn, shuning uchun
TanStack Query emas, `localStorage` (`alia:draft:<kalit>`).

- Har o'zgarish darhol yoziladi; qiymat boshlang'ich holatga qaytsa — o'chadi.
- `Modal` ga `draft={draft}` beriladi. Shunda Escape yoki fon bosilganda oyna
  darhol yopilmaydi, "Qoralamani saqlash / O'chirish" deb so'raydi.
  "Bekor qilish" tugmasi esa so'ramasdan `draft.discard()` qiladi.
- Yuborishda `draft.discard()` (validatsiyadan o'tgandan keyin).
- Kalit forma va yozuv bo'yicha alohida: `lead-new`, `lead-edit:<id>`,
  `lead-action:<id>:<status>`, `entity:<bo'lim>:<id|new>`, `payment:<tur>`,
  `group-level:<id|new>`.
- Qoralamada ism va telefon bor: chiqishda (`signOut`) hammasi o'chiriladi,
  bir haftadan eskisi o'qilganda tashlanadi.
