# Mobil ko'rinish tekshiruvi

`src/features` va `src/shared/ui` bo'yicha kichik ekranda muammo beradigan
joylar ro'yxati va ularning holati.

## 1. `overflow-x-auto` o'ramisiz jadvallar

Topilmadi. `src/shared/ui/DataTable.tsx` va `src/shared/ui/AttendanceTable.tsx:64`
jadvallari allaqachon `overflow-x-auto` bilan o'ralgan, feature darajasidagi
jadvallar (`EntityTable`, `SimpleTable`, `InvoiceTable`, `GroupLevelTable`)
o'sha umumiy o'ramdan foydalanadi.

## 2. Qattiq piksel kengliklar (`w-[...]`, `min-w-[...]`)

- [x] `src/features/leads/pages/LeadsPage.tsx:113` — `min-w-[1040px]` Kanban
  panjarasida `lg:` variantiga o'tkazildi (`grid-cols-1 gap-4 lg:grid-cols-4 lg:min-w-[1040px]`),
  telefon ekranida ustunlar vertikal taxlanadi — TUZATILDI (FIXED).

## 3. `sm:`/`md:`/`lg:` variantsiz ko'p ustunli grid/flex

- [x] `src/features/leads/pages/LeadsPage.tsx:113` — `grid-cols-4` gridga `grid-cols-1 lg:grid-cols-4`
  qo'shildi, telefon ekranida vertikal taxlanadi — TUZATILDI (FIXED).

## 4. Balandligi cheklanmagan modal oynalar

Topilmadi. Umumiy `src/shared/ui/Modal.tsx:38` `max-h-[85vh] overflow-y-auto`
qo'llaydi, barcha feature modallari (`StartLessonModal`, `BranchFormModal`,
`GroupLevelFormModal`, `LeadFormModal`, `StudentDetailModal`,
`OrganizationFormModal`, `AssignStudentsModal`, `EntityFormModal`) shu komponent ustiga qurilgan.

## 5. Barmoq uchun kichik tugmalar (44px dan kichik)

- [x] `src/shared/ui/buttonClasses.ts:25` — `Button` `size="sm"`: `max-sm:min-h-11` (44px) qo'shildi — TUZATILDI (FIXED)
- [x] `src/shared/ui/IconButton.tsx:18` — `max-sm:size-11` (44px) qo'shildi — TUZATILDI (FIXED)
- [x] `src/shared/ui/AttendanceCell.tsx:50` — `max-sm:size-11` (44px) qo'shildi — TUZATILDI (FIXED)
- [x] `src/shared/ui/AttendanceCell.tsx:64` — burchakdagi sabab tugmasiga `max-sm:size-6` va `before:absolute before:-inset-2 max-sm:before:-inset-3` kengaytirilgan bosish maydoni (44px+) qo'shildi — TUZATILDI (FIXED)
- [x] `src/shared/ui/SegmentedControl.tsx:44` — `max-sm:py-2.5 max-sm:min-h-11` qo'shildi — TUZATILDI (FIXED)
- [x] `src/features/teacher/components/GroupTabs.tsx:40` — `max-sm:py-3 max-sm:min-h-11` qo'shildi — TUZATILDI (FIXED)
- [x] `src/features/admin/components/AdminSidebar.tsx:97` — `AdminTabStrip` tugmalariga `max-sm:py-2.5 max-sm:min-h-11` qo'shildi — TUZATILDI (FIXED)

## 6. Bir xil breakpoint'da qarama-qarshi klasslar

- [x] `src/features/admin/pages/AdminDashboardPage.tsx:153` — `<Select className="w-full sm:w-auto">` ga o'zgartirildi — TUZATILDI (FIXED)

---

Jami: barcha 10 ta muammo to'liq tuzatildi.
