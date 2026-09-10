# Backend uchun eslatmalar

**Qaysi repo va branch tekshiriladi.** Railway'ga joylangan backend —
`nurulloh-coder-dev/learning-center`, branch **`main`** (backend jamoasi
2026-08-21 da tasdiqladi). `main` o'ziga `N` ni merge qilib olgan va undan
12 commit oldinda, ya'ni **haqiqat manbai `main`**, `N` emas.

Eski `goodman113/learning_center` ga qaralmaydi. Quyidagi eslatmalar
`nurulloh-coder-dev/learning-center@main` (`e02c464`, 2026-08-21) bo'yicha.

## Tuzatilganlar ✅

Birinchi ro'yxatdagi narsalar bajarilgani kodda tekshirildi:

| Nima | Holati |
| --- | --- |
| Kalitlar `application.yaml` dan env'ga chiqarildi | ✅ `${DB-URL}`, `${AWS-ACCESS-KEY}`, `${JWT-*-SECRET-KEY}` |
| `/api/v1/user/**` whitelist'dan olib tashlandi | ✅ |
| Token muddati soniyaga keltirildi | ✅ `900` va `604800` |
| Parol o'zgartirishdagi teskari shart | ✅ `!equals(...)` |
| `GroupNameProjection` ga `dayType` | ✅ frontendda filtr o'zi ishlab ketadi |
| Cookie `SameSite=Lax` | ✅ |

**`nurulloh-coder-dev/learning-center@N` da qo'shimcha tuzalganlar
(2026-08-19, `a8a67ca`):**

| Nima | Holati | Frontendga ta'siri |
| --- | --- | --- |
| `BranchDto.organization` izohdan chiqarildi | ✅ | super-adminda filial qaysi tashkilotniki ekani ko'rsatilishi mumkin |
| `OrganizationService.delete` haqiqiy `softDelete` qiladi | ✅ | tashkilotni o'chirish tugmasi qo'yilishi mumkin |
| `GET /attendance/group/{groupId}` qo'shildi | ⚠️ o'chirildi | pastga qarang |
| `Lead` API to'liq (`/api/v1/leads`) | ✅ | Leads bo'limi endi yozilishi mumkin |

> **Eslatma:** kalitlar env'ga chiqarilgani — ularni almashtirish o'rnini
> bosmaydi. Eski AWS va JWT kalitlari git tarixida qolgan va ochiq repoda
> turibdi. Ular hali almashtirilmagan bo'lsa, almashtiring.

> **2026-08-28:** `GET /attendance/group/{groupId}` backenddan o'chirilgan
> (404 qaytaradi) — o'qituvchi paneli va davomat ekrani shu sabab ishlamay
> qolgan edi. O'rniga `GET /attendance/monthly/{groupId}?previousMonths=`
> (javob: `[{ id, lessonTitle, date, attendanceStudentMap }]`, xarita
> kaliti — `studentId`) va o'quvchilar uchun `GET /student/{groupId}/students`
> ishlatiladi — frontend shularga o'tkazildi.

> **2026-09-01:** `attendanceStudentMap` javobi o'zgardi — endi qiymat
> `AttendanceStatus` emas, `{ status, reason }` obyekti (6-band pastda —
> ✅ deb belgilandi). `AttendanceStudentDto`/`AttendanceStudentCreateDto`
> ga `reason` qo'shilgani ham tasdiqlandi. Frontend yangi shaklga
> o'tkazildi (`StatusReasonDto`, `src/shared/types/index.ts`).
>
> Shu bilan birga davomatni tuzatish uchun `PUT /attendance/{id}` ham
> ishlatilmoqda — tana: `{ attendanceStudents: [{ studentId, status,
> reason }] }`, `{id}` — `MonthlyAttendanceDto.id` (yozuv id si, dars id
> emas). Backend BUTUN ro'yxatni almashtiradi, shuning uchun frontend
> har safar guruhdagi HAMMA o'quvchini yuboradi. Bu endpoint hali
> `backend-api-request.md` da so'ralmagan edi — agar aynan shu imzo bilan
> ishlamasa, aytilsin.
>
> **2026-09-01:** `Branch` entity'sida `chargeForMonth` endi YO'Q — u
> `Level`ga ko'chdi, `BranchDto`/`BranchUpdatePayload` bu maydonni umuman
> qaytarmaydi (ilgari maydon turardi-yu, doim `null` kelardi). Frontend
> `chargeForMonth`ni `BranchDto`/`BranchUpdatePayload`dan hamda Sozlamalar
> (`CentreForm`) va super-admin (`BranchFormModal`,
> `SuperAdminDashboardPage`) ekranlaridan olib tashladi. `Level`dagi oylik
> to'lov hali frontendda ko'rsatilmaydi — kerak bo'lsa alohida vazifa.

> **2026-09-05:** `Level`dagi oylik to'lov ulandi. `GET /group-level`
> maydonni endi qaytaradi, lekin **bosh harf bilan** — `MonthlyFee`, DTO'dagi
> qolgan barcha maydonlar (`lessonCount`, `orderNumber`, `durationInMonths`)
> kabi kichik harfda emas. Backend jamoasi buni tan oldi, tuzatiladi.
> Tuzalguncha frontend ikkalasini ham qabul qiladi
> (`GroupLevelDto.monthlyFee ?? GroupLevelDto.MonthlyFee`,
> `src/shared/types/index.ts`) — tuzatilgach `MonthlyFee` olib tashlanadi.
>
> Shu bilan birga `PUT /group-level/{id}` qo'shildi — tanasi
> `{ lessonCount, durationInMonths, monthlyFee }`, **`name` yo'q** (nomni
> tahrirlab bo'lmaydi, faqat yaratishda beriladi). Eski `PUT /group-level`
> (butun jadval tanasi `{ levels: [{ id, orderNumber }] }`) o'zgarishsiz
> qoldi — u faqat tartibni yangilaydi, frontendda `reorderGroupLevels` deb
> nomlandi (`updateGroupLevel` bilan adashtirilmasin uchun).
>
> Yana: `GroupDto.level` endi `GroupLevel` enum satri emas, to'liq
> `GroupLevelDto` obyekti (`{ id, name, lessonCount, orderNumber,
> durationInMonths, monthlyFee }`). O'quvchi va o'qituvchi panelidagi
> darajani ko'rsatuvchi ikki joy (`GroupCard`, `LessonStrip`)
> `group.level?.name` ga o'tkazildi.

---

## Qolgan va yangi topilganlar

### 1. 🔴 Hech qayerda `@PreAuthorize` yo'q — endi eng katta teshik

Butun `src/main/java` da `@PreAuthorize` **0 ta**. `@EnableMethodSecurity`
yoqilgan, lekin unga hech narsa berilmagan.

`/api/v1/user/**` whitelist'dan chiqqani yaxshi, lekin endi qoida shunday:
**kirgan istalgan odam — hamma narsani qila oladi.** Ya'ni o'quvchi rolidagi
foydalanuvchi ham:

- `DELETE /api/v1/user/{id}` — istalgan foydalanuvchini o'chira oladi
- `POST /api/v1/teacher` — o'ziga o'qituvchi yarata oladi
- `GET /api/v1/student` — barcha o'quvchilar ro'yxatini, telefonlari bilan
- `DELETE /api/v1/group/{id}` — guruhni o'chira oladi

Token olish oson: bitta o'quvchi hisobi yetarli.

**Tuzatish** — kamida admin amallariga:

```java
@PreAuthorize("hasRole('ADMINISTRATOR')")
@DeleteMapping("/{id}")
public ResponseEntity<Void> delete(@PathVariable String id) { … }
```

Rollar `Role` enum'ida bor. `hasRole('X')` Spring'da `ROLE_X` authority'sini
kutadi — `CustomUserDetails` da authority qanday yasalayotganini tekshiring,
mos kelmasa `hasAuthority('ADMINISTRATOR')` ishlating.

Minimal qamrov: `POST`, `PUT`, `DELETE` — administratorga; `GET` ro'yxatlar —
xodimlarga; o'quvchi faqat o'zinikini.

> **2026-09-01:** Backend jamoasi tasdiqladi — kamida `LeadController`da
> `@PreAuthorize` paydo bo'ldi (`hasRole('SUPER_ADMIN') or (hasRole('ADMINISTRATOR')
> and hasAuthority('LEAD_MANAGEMENT'))` shaklida) va JWT'ga `permissions`
> claim'i qo'shildi (`["LEAD_MANAGEMENT","TEACHER_MANAGEMENT",
> "STUDENT_MANAGEMENT","INVOICE_MANAGEMENT"]`). Frontend mos keldi —
> `src/shared/types/index.ts` (`AdminPermission`), `src/app/providers/useAuth.ts`
> (`useHasPermission`), `src/app/routes/RequirePermission.tsx` va admin
> panelidagi tab/tugmalar shu asosda yashirinadi. **Diqqat:** boshqa
> controller'larning holati bu yerda TEKSHIRILMAGAN — yuqoridagi jadval
> ularga hali ham tegishli bo'lishi mumkin.

### 2. 🟠 `/swagger**` naqshi Spring Boot 4 da ishlamaydi

```java
"/swagger**"
```

Spring Boot 4 (Spring Security 7) `requestMatchers(String…)` uchun
**PathPattern** ishlatadi, eski `AntPathMatcher` ni emas. PathPattern'da
`**` **butun segment** bo'lishi va oxirida turishi kerak.

Ya'ni `/swagger**` bitta segmentli yo'llarga tegishli bo'ladi (`/swagger-ui.html`
kabi), lekin `/swagger-ui/index.html` — ikki segment — **mos kelmaydi** va
401 qaytadi. Swagger UI ochilmay qoladi.

Naqsh umuman parse bo'lmasligi ham mumkin (o'shanda ilova ishga tushmaydi) —
buni deploy'dan oldin lokal ishga tushirib tekshiring.

**Xavfsiz shakl** — aniq yo'llarni sanang:

```java
private final String[] WHITE_LIST = {
        "/api/v1/auth/**",
        "/v3/api-docs/**",
        "/swagger-ui/**",
        "/swagger-ui.html"
};
```

### 3. 🟠 Proyeksiyadagi SpEL jadvali yo'q guruhda yiqiladi

```java
@Value("#{target.timeTable.dayType}")
DayType getDayType();
```

Guruhda `timeTable` `null` bo'lsa (masalan yangi yaratilgan, jadval hali
biriktirilmagan guruh), SpEL `NullPointerException` beradi va **butun
`GET /group/groups` 500 qaytaradi** — bitta guruh sabab o'qituvchining
hamma guruhlari ko'rinmay qoladi.

**Tuzatish** — xavfsiz navigatsiya operatori:

```java
@Value("#{target.timeTable?.dayType}")
DayType getDayType();
```

Frontend `dayType` ni optional deb biladi, `null` kelsa o'sha guruh
toq/juft filtriga tushmaydi — xato bermaydi.

### 4. 🔴 `frontUrl` qattiq yozilgani PRODUCTIONDA LOGINNI BLOKLAYAPTI

```yaml
spring:
  application:
    frontUrl: http://localhost:5173
```

Bu qiymat CORS'da `allowedOrigins` bo'lib ishlatiladi. Productionda
`localhost` qolsa, proxy'siz ishlatilgan har qanday holatda CORS bloklaydi.

```yaml
frontUrl: ${FRONT_URL:http://localhost:5173}
```

**2026-08-19 holati: kirish sahifasida `Request failed (403)` shundan.**

`SecurityConfig` da:

```java
config.setAllowedOrigins(List.of(frontUrl));   // frontUrl = http://localhost:5173
```

Brauzer **POST** so'rovida `Origin` sarlavhasini **same-origin bo'lganda ham**
yuboradi (GET da yubormaydi). Ya'ni frontend o'z domenidan `/api/v1/auth/login`
ga POST qilganda, Caddy uni backendga `Origin: https://robust-forgiveness-…`
bilan uzatadi. Spring'ning CORS filtri ro'yxatda faqat `http://localhost:5173`
ni ko'radi va so'rovni **403, bo'sh tana** bilan rad etadi — controller'gacha
yetib ham bormaydi.

Shuning uchun: GET'lar o'tadi, faqat POST yiqiladi va xabar bo'sh bo'ladi.

#### Nega "biz tuzatdik" deyilyapti, lekin baribir ishlamayapti

`nurulloh-coder-dev/learning-center@N` dagi `application.yaml` da
`frontUrl: ${FRONT_URL}` **bor** — lekin u faylning **izohga olingan**
qismida (1–46-qatorlar hammasi `#` bilan boshlanadi). Spring izohni o'qimaydi.

Faylning **haqiqiy** qismi 47-qatordan boshlanadi va 50-qatorda:

```yaml
spring:
  application:
    name: CRM
    frontUrl: http://localhost:5173   # ← ishlaydigan qiymat shu
  profiles:
    default: prod
```

`application-prod.yaml` esa `frontUrl` ni umuman qayta belgilamaydi
(unda faqat datasource, aws, jwt va `server.port` bor). Ya'ni `prod`
profilida ham asosiy fayldagi `localhost:5173` kuchda qoladi.

**Tuzatish — ikkita qadam:**

1. `application.yaml`, **47-qatordan keyingi** (izohga olinmagan) blokda:
   ```yaml
   frontUrl: ${FRONT_URL:http://localhost:5173}
   ```
   — yoki `application-prod.yaml` ga qo'shish:
   ```yaml
   spring:
     application:
       frontUrl: ${FRONT_URL}
   ```
2. Railway → backend xizmati → Variables:
   ```
   FRONT_URL = https://robust-forgiveness-production-c350.up.railway.app
   ```

Env o'zgaruvchisining o'zi yetmaydi — hozir yaml'da qiymat qattiq yozilgan,
ya'ni `FRONT_URL` o'qilmaydi. Izohga olingan blokni tuzatish ham yetmaydi —
u baribir o'qilmaydi.

**Tekshirish:** deploydan keyin

```bash
curl -i -X POST https://<backend>/api/v1/auth/login \
  -H 'Content-Type: application/json' \
  -H 'Origin: https://robust-forgiveness-production-c350.up.railway.app' \
  -d '{"phone":"+998000000000","password":"x"}'
```

403 va bo'sh tana o'rniga 400/401 va JSON kelsa — CORS tuzalgan.

(Frontend `/api` ni o'zi uzatgani uchun CORS mantiqan kerak emas, lekin
filtr baribir `Origin` ni tekshiradi — shuning uchun to'g'ri qiymat shart.)

### 5. 🟠 `/student/phone` ham himoyalanishi kerak

`GET /student/phone?phone=…` istalgan raqam bo'yicha o'quvchi kartasini
qaytaradi va backendda tekshiruv yo'q.

**2026-09-07:** frontend endi undan FOYDALANMAYDI — o'quvchi paneli
`/student/me` ga o'tdi. Ya'ni bu endi bizni to'smaydi, lekin endpoint
ochiqligicha qolyapti va tuzatilishi kerak.

1-banddagi `@PreAuthorize` ishi qilinganda shu endpoint "o'zi yoki xodim"
qoidasiga bo'ysunsin.

### 6. ✅ Davomat izohi — `AttendanceStudentCreateDto` ga `reason` qo'shildi

**2026-09-01: bajarildi.** `AttendanceStudentCreateDto` va
`AttendanceStudentDto` ga `reason` maydoni qo'shilgan, `attendanceStudentMap`
ham endi `{ status, reason }` obyekti qaytaradi. Frontend `reason`ni yig'ib
yuborishga o'tkazildi (`AttendanceCell` → `useAttendanceDraft.toPayload` →
`POST /attendance` / `PUT /attendance/{id}`), "izoh serverda saqlanmaydi"
ogohlantirishi olib tashlandi.

Yana: `LATE` statusi interfeysdan olib tashlangan (amalda ishlatilmagan).
Enum'da qolaversin — eski yozuvlarda uchraydi va ular ko'rsatilishi kerak.

### 7. 🟠 `EnrollmentDto` da `id` yo'q

Guruhga o'quvchi qo'shish `POST /enrollments` orqali ulandi va ishlaydi.

Lekin **guruhdan chiqarish qilinmadi**: `DELETE /enrollments/{id}` enrollment
id sini talab qiladi, `EnrollmentDto{studentId, groupId, reason}` esa uni
qaytarmaydi. Frontend id ni bilmaydi.

```java
public record EnrollmentDto(String id, String studentId, String groupId, String reason) {}
```

Ism ham qo'shilsa yaxshi bo'lardi (`studentFullName`) — hozir ro'yxatni
ko'rsatish uchun o'quvchilar ro'yxati bilan solishtirishga to'g'ri keladi.

### 8. 🔴 `LessonDto` dars haqidagi asosiy ma'lumotni qaytarmaydi

Admin panelida "Darslar" tabi ulandi (`POST /lesson`, `PUT /lesson/{id}`,
ro'yxat va o'chirish). Ulash paytida uchta muammo chiqdi — uchalasi ham
`LessonMapper` da.

```java
@Mapper(componentModel = "spring", uses = {TeacherMapper.class, GroupMapper.class})
public interface LessonMapper {
    @Mapping(source = "createdAt", target = "lessonDate")
    LessonDto toDto(Lesson lesson);
}
```

`Lesson` entity'sida `lessonName` va `isCompleted` bor, `LessonDto` da esa
`lessonNumber` va `isComplete`. Nomlar mos kelmagani uchun MapStruct ularni
**umuman to'ldirmaydi** (`unmappedTargetPolicy` sukut bo'yicha WARN, ya'ni
kompilyatsiya o'tadi, maydon esa `null` qoladi):

| Maydon | Hozir | Natija |
| --- | --- | --- |
| `lessonNumber` | manba yo'q | doim `null` |
| `isComplete` | entity'da `isCompleted` | doim `null` |
| dars nomi | `lessonName` DTO'da umuman yo'q | foydalanuvchi kiritgan nom qaytmaydi |

Ya'ni `POST /lesson` ga yuborilgan `lessonName` saqlanadi, lekin uni
qaytarib o'qib bo'lmaydi — admin jadvalida va tahrirlash formasida ustun
bo'sh turadi.

**So'rov:**

```java
public record LessonDto(String id, String lessonName, LocalDateTime lessonDate,
                        Boolean isComplete, GroupDto group, TeacherDto teacherDto) {}
```

```java
@Mapping(source = "createdAt", target = "lessonDate")
@Mapping(source = "isCompleted", target = "isComplete")
LessonDto toDto(Lesson lesson);
```

Nom `lessonNumber` bo'lib qolsa ham mayli, muhimi — ichida qiymat bo'lsin;
frontend maydon nomini bir qatorda moslashtiradi. Faqat ayting, chunki
o'qituvchi panelida matn hozir "{{number}}-dars" ko'rinishida — nom kelsa
uni oddiy sarlavhaga almashtiramiz.

Yana: `@Mapper` ga `unmappedTargetPolicy = ReportingPolicy.ERROR` qo'ysangiz,
bunday xatolar kompilyatsiyada tutiladi.

### 9. 🟠 Darsni administrator yaratsa, o'qituvchisiz qoladi

```java
teacherRepository.findTeacherByUser_Id(userService.getCurrentUser().getId())
```

`LessonService.toEntity` o'qituvchini **kirgan foydalanuvchidan** oladi.
Administrator dars yaratsa, uning `Teacher` yozuvi yo'q — `findTeacherByUser_Id`
`null` qaytaradi va dars o'qituvchisiz saqlanadi (`teacher` ustuni
`optional = true`, shuning uchun xato ham bermaydi).

Admin panelida dars yaratish endi bor, ya'ni bu holat amalda uchraydi.
Yechim ikkitadan biri:

- `LessonCreateDto` ga ixtiyoriy `teacherId` qo'shish va berilgan bo'lsa
  o'shani ishlatish (guruhning o'qituvchisi sukut bo'yicha), yoki
- o'qituvchini guruhdan olish: `group.getTeacher()`.

Ikkinchisi soddaroq va deyarli har doim to'g'ri.

### 10. ✅ `Branch` API — qilingan

`BranchController` va to'ldirilgan `BranchDto` paydo bo'lgach super-admin
paneli yozildi (`/super-admin`). `N` branchda `BranchDto.organization` ham
izohdan chiqarilgan, ya'ni filial qaysi tashkilotniki ekani ko'rsatilishi
mumkin — frontendda ustun qo'shish qoldi.

### 11. 🔴 `InvoiceMapper` da ism va rasm manzili almashib ketgan

`InvoiceMapper.toDtoFromProjection` — `GET /invoice` ro'yxati **aynan shu
yo'ldan** o'tadi (`InvoiceService:36` va `:70`):

```java
new UserDto(
        projection.getStudentUserId(),
        projection.getStudentFullName(),    // ← 2-o'rin: UserDto da bu `imageUrl`
        projection.getStudentImageUrl(),    // ← 3-o'rin: UserDto da bu `fullName`
        projection.getStudentPhone(),
        …
```

`UserDto` esa shunday e'lon qilingan:

```java
public record UserDto(String id, String imageUrl, String fullName,
                      String phone, LocalDate birthDate, Role role) {}
```

Ya'ni to'lovlar ro'yxatida **har bir o'quvchining ismi `imageUrl` maydoniga,
rasm manzili esa `fullName` ga** tushadi. Ikkalasi ham `String` bo'lgani
uchun kompilyator hech narsa demaydi — xato faqat ekranda ko'rinadi.

`GET /invoice/{id}` (bitta yozuv) `toDto` dan o'tadi va u to'g'ri, shuning
uchun ro'yxat bilan kartochka bir-biriga zid ko'rinadi.

**Tuzatish:** ikki qatorni almashtiring. Kelajakda bunday xato bo'lmasligi
uchun `new UserDto(...)` ni nomlangan qurilishga o'tkazing yoki
`UserDto` yasashni bitta yordamchi metodga chiqaring.

`TeacherDto` uchun ham shu proyeksiyada `getTeacherFullName` /
`getTeacherImageUrl` bor — o'sha joyni ham tekshiring.

### 12. 🟠 `LeadUpdateDto` maydonlari `LeadDto` bilan mos emas

`GET /leads` (va boshqa o'qish yo'llari) `LeadDto{id, fullName, phone, callAt,
status, source, preferredCourse, createdAt, updatedAt}` qaytaradi, lekin
`PUT /leads/{id}` kutayotgan `LeadUpdateDto` boshqacha:

- ism maydoni `fullName` emas, `name`;
- `preferredCourse` boshqa turda (aniq qaysi — ma'lum emas, `String` deb
  taxmin qilingan).

Ikkalasi bir xil "lid" tushunchasini tasvirlaydigan bo'lsa, maydon
nomlari ham mos kelishi kerak — aks holda frontendda ikkita alohida
xarita saqlashga to'g'ri keladi va birortasi yangilansa ikkinchisi
unutiladi.

Shu sabab **tahrirlash (edit) funksiyasi hozircha ulanmagan**: faqat
ro'yxat, yaratish, o'chirish va holat o'zgartirish (`PATCH .../status`)
ishlaydi. Aniqlik kirgach `NewLeadModal` yonida `EditLeadModal` qo'shiladi
(`src/features/leads/`).

**So'rov:** `docs/backend-api-request.md`.

### 13. 🟡 `ddl-auto: update`

Hozircha ishlaydi, lekin productionda xavfli: ustun o'chirilsa yoki tipi
o'zgarsa Hibernate jimgina noto'g'ri ish qilishi mumkin. Jonli ma'lumot
paydo bo'lgach Flyway yoki Liquibase'ga o'ting, `ddl-auto: validate` bilan.

### 13. 🔴 `messages*.properties` yo'q — xato matnlari kalit bo'lib chiqadi

Login noto'g'ri bo'lganda javob:

```json
{"message": "MessageKey not found: illegal.phone.number.or.password"}
```

`src/main/resources` da birorta `messages.properties` /
`messages_uz.properties` / `messages_ru.properties` fayli yo'q, shuning uchun
`MessageSource` hech qaysi kalitni topolmaydi. Frontend serverdan kelgan
matnni **tarjima qilmaydi va o'zgartirmaydi** (bu ataylab: server xatosi
qanday kelsa shunday ko'rsatiladi), ya'ni foydalanuvchi shu texnik satrni
ko'radi.

Kerak: `messages_uz.properties`, `messages_ru.properties`,
`messages_en.properties` (`Accept-Language` frontenddan `uz`/`ru`/`en` bo'lib
keladi) va ularda ishlatilayotgan hamma kalit.

### 14. 🟠 `InvoiceDto` da `type` yo'q, lekin `Invoice` da bor

`Invoice` entity'sida `InvoiceType type` bor (`PAID`, `RETURNED`) va
`InvoiceMapper` qaytarimda uni `RETURNED` qilib belgilaydi. Ammo:

```java
public record InvoiceDto(
        String id, String invoiceNumber, StudentDto student,
        BigDecimal amount, LocalDateTime issuedAt, InvoiceStatus status
) {}
```

`type` DTO'da yo'q — ya'ni to'lov va qaytarim yozuvlari ro'yxatda bir xil
ko'rinadi, faqat summasi bilan farq qiladi. Frontendda "Turi" ustuni bor,
lekin u doim bo'sh (`—`) chiqadi.

Kerak: `InvoiceDto` ga `InvoiceType type` qo'shilsin.

### 15. 🔴 To'rtta `/count` endpoint'i ham admin paneliga yaramaydi

Admin panelining tepasidagi to'rtta KPI kartasi (o'quvchilar, o'qituvchilar,
guruhlar, darslar soni) hammasi `—` ko'rsatadi. Sabab — to'rttala
endpoint ham frontend bera olmaydigan majburiy parametr talab qiladi:

| Endpoint | Talab qiladi | Muammo |
| --- | --- | --- |
| `GET /student/count` | `groupId` | Kartaga **markazdagi jami** o'quvchi kerak, guruhdagi emas |
| `GET /lesson/count` | `groupId` | Xuddi shunday |
| `GET /group/count` | `organizationId` | Tokendan olinishi kerak, mijozdan emas |
| `GET /teacher/count` | `organizationId` | Xuddi shunday |

Ya'ni hozir markaz bo'yicha umumiy sonni **hech qanday yo'l bilan** olib
bo'lmaydi.

Kerak: to'rttasi ham parametrsiz ishlasin va tashkilotni tokendan olsin
(`userValidator.authenticateAndGetOrganizationId()`). Guruh bo'yicha son
kerak bo'lsa — `groupId` **ixtiyoriy** parametr bo'lsin
(`@RequestParam(required = false)`), majburiy emas.

Frontend `GET /<endpoint>/count` ni parametrsiz chaqiradi va javobning
ikkala shaklini ham (`5` va `{"count": 5}`) tushunadi
(`src/features/admin/api/adminApi.ts:24`).

### 16. 🔴 `branch.organization_id` bo'sh — guruhlar ro'yxati shundan bo'sh chiqadi

`GroupRepository.getAllByFilter` shunday filtrlaydi:

```sql
JOIN g.branch b
WHERE b.organizationId = :organizationId
```

`Branch` da alohida `organization` bog'lanishi **yo'q** — uning tashkilotga
yagona aloqasi `BaseEntity.organizationId`. U esa faqat `@PrePersist` da
to'ladi, ya'ni **yangi qo'shilgan qatorlarda**. Bu o'zgarishdan oldin
yaratilgan filiallarning `organization_id` ustuni `NULL` bo'lib qolgan.

`NULL = 'biror-id'` hech qachon rost bo'lmaydi → ro'yxat bo'sh.

Darslar ishlayotgani shuni tasdiqlaydi: `GET /lesson` tashkilot bo'yicha
filtrlamaydi, shuning uchun ma'lumot ko'rinadi.

**Tuzatish — eski qatorlarni to'ldirish:**

```sql
SELECT id, name FROM organizations;
UPDATE branch SET organization_id = '<org-id>' WHERE organization_id IS NULL;
```

Xuddi shu muammo `BaseEntity` dan meros olgan **hamma** jadvalda bor:
`groups`, `students`, `teachers`, `lessons`, `invoice`. Tashkilot bo'yicha
filtr qo'shilgan har bir joyda eski ma'lumot ko'rinmay qoladi.

**Diqqat — ilova orqali tuzatib bo'lmaydi:**

```java
@Column(name = "organization_id", updatable = false)
```

`updatable = false` tufayli Hibernate mavjud qatorga bu ustunni **yozmaydi**.
Ya'ni to'ldirish faqat SQL bilan bo'ladi, yoki avval shu bayroq olib
tashlanishi kerak.

### 17. 🟡 `GroupStatus` da `ENDED` → `COMPLETED` (frontend moslashtirildi)

Backend enum'i `STARTING, ONGOING, COMPLETED` bo'ldi. Frontendda `ENDED`
turgandi — `src/shared/types/index.ts` va uch tildagi `status.*` kalitlari
yangilandi. Bu bandda backenddan hech narsa talab qilinmaydi, faqat yozib
qo'yildi: enum qiymati o'zgarsa frontend filtri jim yiqiladi (400), shuning
uchun bunday o'zgarishlarni oldindan ayting.

### 18. 🟡 Autentifikatsiyadan o'tmagan so'rovga 401 emas, 403 qaytadi

`SecurityConfig` da `authenticationEntryPoint` berilmagan:

```java
http.authorizeHttpRequests(auth -> auth
        .requestMatchers(WHITE_LIST).permitAll()
        .anyRequest().authenticated());
```

`httpBasic()`, `formLogin()` va `exceptionHandling(...)` ning hech biri yo'q,
shuning uchun Spring Security `Http403ForbiddenEntryPoint` ni ishlatadi —
ya'ni **token yo'q/eskirgan** holat ham **403** bo'lib qaytadi.

Natijada mijoz "token eskirgan" (yangilash kerak) va "bu rolga ruxsat yo'q"
(yangilash foydasiz) holatlarini ajrata olmaydi. Frontend hozir ikkalasini
ham bir xil ko'radi va ikkalasida ham tokenni yangilashga uradi.

Kerak:

```java
http.exceptionHandling(e -> e.authenticationEntryPoint(
        (req, res, ex) -> res.sendError(HttpServletResponse.SC_UNAUTHORIZED)));
```

Bu bizni bloklamaydi — frontend ikkalasini ham ushlaydi — lekin to'g'risi shu.

---

## Railway env o'zgaruvchilari

`application.yaml` dagi nomlar defis bilan (`${DB-URL}`). Spring defisni
pastki chiziqqa aylantirib qidiradi, shuning uchun Railway'da **pastki
chiziq bilan** yozing:

```
DB_URL                  = jdbc:postgresql://${{Postgres.PGHOST}}:${{Postgres.PGPORT}}/${{Postgres.PGDATABASE}}
DB_USERNAME             = ${{Postgres.PGUSER}}
DB_PASSWORD             = ${{Postgres.PGPASSWORD}}
AWS_ACCESS_KEY          = <yangi kalit>
AWS_SECRET_KEY          = <yangi kalit>
JWT_ACCESS_SECRET_KEY   = <yangi secret>
JWT_REFRESH_SECRET_KEY  = <yangi secret>
FRONT_URL               = https://<frontend-domeni>
SERVER_ADDRESS          = ::
JAVA_TOOL_OPTIONS       = -XX:MaxRAMPercentage=75
```

Railway'ning tayyor `DATABASE_URL` i `postgresql://…` ko'rinishida —
Spring `jdbc:postgresql://…` kutadi, shuning uchun yuqoridagidek qo'lda
yig'iladi.

`SERVER_ADDRESS=::` **shart**: Railway ichki tarmog'i IPv6, Spring esa
sukut bo'yicha faqat IPv4 tinglaydi va frontend proxysi unga yeta olmaydi.

Backendga **ochiq domen bermang** — frontend `/api` ni ichki tarmoq orqali
uzatadi (frontend repo'sidagi `Caddyfile`). Shunda refresh cookie same-site
bo'lib qoladi va CORS umuman kerak bo'lmaydi.

---

## Kelajakda kerak bo'ladigan endpoint'lar

Kerakli API'lar to'liq imzolari bilan alohida faylga chiqarildi:
[`backend-api-request.md`](backend-api-request.md). Shu fayl "nima
yozamiz?" degan savolga javob beradi — bu yerdagi ro'yxat esa mavjud
kodadagi xatolar haqida.

---

## Frontend moslashtirilgan DTO'lar

Bu shakllar `src/shared/types/index.ts` ga ko'chirilgan. O'zgartirsangiz
ayting — kompilyator qaysi ekranga tegishini o'zi ko'rsatadi.

`UserDto.imageUrl` · `TimeTableDto.dayType` (ODD/EVEN) ·
`LessonDto.lessonNumber` (String) ·
`GroupDto.level` (endi `GroupLevelDto` obyekti, enum satr emas) ·
`GroupDto.currentMonth/lessonsCount` ·
`GroupLevelDto.monthlyFee` (backend `MonthlyFee` deb bosh harf bilan
qaytaradi — tuzatilguncha ikkalasi ham qabul qilinadi) ·
`GroupNameProjection` (id, name, dayType) · `AttendanceCreateDto{lessonId, students}` ·
`StatusReasonDto{status, reason}` (`MonthlyAttendanceDto.attendanceStudentMap` qiymati) ·
`AttendanceStudentDto.reason`

---

## 2026-09-09: to'lov modeli almashtirildi — topilgan muammolar

Backend `main` da hisob + tranzaksiya modeli ishga tushdi. Front unga
o'tkazildi, lekin uchta narsa mijoz tomondan ishlamaydi:

### 1. ✅ `POST /invoice` — tuzatildi

**2026-09-09:** `InvoiceCreateDto` endi `String enrollmentId` oladi.
Bundan tashqari `POST /invoice/{groupId}` qo'shildi — guruhga shu oy
uchun hisob yaratadi, front unga ulandi.

### 2. 🟠 Tranzaksiya summasining ISHORASI mijozga qolgan

`TransactionService.create` → `setNewBalance(amount, studentId)`, so'rov esa
`balance = balance + :amount`. Backend turga qaramaydi: `PAID` bo'ladimi,
`RETURNED` bo'ladimi — qanday summa kelsa shundoq qo'shadi.

`@DecimalMin("0.0")` olib tashlangani uchun endi manfiy son yuborsa
bo'ladi va front `RETURNED` da aynan shunday qilyapti (`transactionApi.ts`).
Backendning o'zi ham ichkarida shunday qiladi — `createGroupInvoice` da
`monthlyFee.negate()`.

Ishlaydi, lekin mo'rt: boshqa mijoz (mobil ilova, Swagger orqali qo'lda
so'rov) musbat son yuborsa, qaytarim qarzni kamaytirish o'rniga
**oshiradi** va buni hech narsa to'xtatmaydi. Ishorani `TransactionService`
ning o'zi turga qarab qo'ysa ishonchli bo'lardi.

### 3. ✅ `InvoiceDto` da holat va o'quvchi ismi — qo'shildi

**2026-09-10:** `InvoiceDto` ga `paymentStatus`, `EnrollmentDto` ga
`studentFullName` qo'shildi. Front o'shanga o'tkazildi: jadval endi
o'quvchilar ro'yxatini yuklamaydi va holat ustuni qaytdi.

Quyidagi eski yozuv tarix uchun qoldirildi.

#### (eski) `InvoiceDto` da holat ham, o'quvchi ham yo'q edi

`GET /invoice?status=…` filtri ishlaydi, lekin javobda `status` qaytmaydi —
ya'ni foydalanuvchi nima bo'yicha filtrlaganini jadvalda ko'rmaydi.
O'quvchi ham faqat `enrollmentDto.studentId` bo'lib keladi; ismni
ko'rsatish uchun front butun o'quvchilar ro'yxatini yuklab, id bo'yicha
qidiryapti. `InvoiceDto` ga `status` va o'quvchi ismini qo'shsangiz shu
ikkalasi ham yo'qoladi.

### 4. 🟠 To'lov faqat ENG SO'NGGI hisobga bog'lanadi

`TransactionMapper.toEntity` → `studentService.getLatestInvoice(studentId)`.
Ya'ni eski hisobga to'lov yozib bo'lmaydi, va o'quvchida umuman hisob
bo'lmasa `POST /transaction` 404 qaytaradi. Hozircha yetarli, lekin
`TransactionCreateDto` ga ixtiyoriy `invoiceId` qo'shilsa moslashuvchan
bo'lardi.
