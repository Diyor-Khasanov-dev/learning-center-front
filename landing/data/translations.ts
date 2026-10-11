import { DropdownOption } from '@/components/ui/Dropdown'
import { Language } from '@/context/LanguageContext'
import {
  RoleFilter,
  StatItem,
  OldVsNewItem,
  FeatureModule,
  TourTab,
  Testimonial,
  PricingPlan,
  FaqItem,
  TeamMember,
} from '@/types/landing'
import {
  GraduationCap,
  CreditCard,
  QrCode,
  Building2,
  BookOpen,
  PhoneCall,
  BarChart3,
  Filter,
  Users,
} from 'lucide-react'

export interface NavTranslations {
  whyUs: string
  modules: string
  tour: string
  team: string
  roi: string
  pricing: string
  faq: string
  login: string
  bookDemo: string
}

export interface TeamTranslations {
  badge: string
  heading: string
  subheading: string
  members: TeamMember[]
}

export interface HeroTranslations {
  badge: string
  titlePart1: string
  titleHighlight: string
  titlePart2: string
  description: string
  bookDemoBtn: string
  watchTourBtn: string
  trustTrial: string
  trustSetup: string
  trustMigration: string
  dashboardTitle: string
  liveSystem: string
  activeStudents: string
  thisMonth: string
  monthlyTuition: string
  collected: string
  newLeads: string
  readyToEnroll: string
  attendanceToday: string
  qrActive: string
  revenueChartTitle: string
  revenueChartSub: string
  chartCurrent: string
  liveStreamTitle: string
  tuitionPaid: string
  qrCheckin: string
  newLeadIg: string
  smsBadgeTitle: string
  smsBadgeSub: string
}

export interface StatsTranslations {
  partnerHeading: string
  stats: StatItem[]
}

export interface ComparisonTranslations {
  badge: string
  heading: string
  subheading: string
  oldWayTitle: string
  oldWayTag: string
  newWayTitle: string
  newWayTag: string
  items: OldVsNewItem[]
}

export interface FeatureModulesTranslations {
  badge: string
  heading: string
  subheading: string
  filterLabel: string
  requestDemo: string
  roleFilterOptions: DropdownOption<RoleFilter>[]
  modules: FeatureModule[]
}

export interface TourTranslations {
  badge: string
  heading: string
  subheading: string
  seeDemoBtn: string
  liveInterface: string
  synced: string
  tabs: TourTab[]
}

export interface RoiTranslations {
  badge: string
  heading: string
  subheading: string
  slider1Label: string
  slider2Label: string
  slider1Unit: string
  slider2Unit: string
  roiTitle: string
  perMonthSaved: string
  timeSavedLabel: string
  timeSavedSub: string
  leadsRecoveredLabel: string
  leadsRecoveredSub: string
  auditBtn: string
  benchmarkNote: string
}

export interface TestimonialsTranslations {
  badge: string
  heading: string
  subheading: string
  testimonials: Testimonial[]
}

export interface PricingTranslations {
  badge: string
  heading: string
  subheading: string
  monthlyBilling: string
  annualBilling: string
  savePercent: string
  perMonthBranch: string
  includedFeaturesTitle: string
  plans: PricingPlan[]
}

export interface FaqTranslations {
  badge: string
  heading: string
  subheading: string
  faqs: FaqItem[]
}

export interface CtaTranslations {
  heading: string
  subheading: string
  bookDemoBtn: string
  freeTrialBtn: string
  guaranteeText: string
}

export interface FooterTranslations {
  brandDesc: string
  security: string
  modulesTitle: string
  solutionsTitle: string
  solutions: string[]
  contactTitle: string
  contactSub: string
  contactBtn: string
  privacy: string
  terms: string
  securityLink: string
  allRightsReserved: string
}

export interface DemoModalTranslations {
  personalizedWalkthrough: string
  title: string
  subtitle: string
  confirmedTitle: string
  confirmedMessage: string
  stepContact: string
  stepScale: string
  fullNameLabel: string
  fullNamePlaceholder: string
  phoneLabel: string
  phonePlaceholder: string
  centerNameLabel: string
  centerNamePlaceholder: string
  nextCapacityBtn: string
  studentsDropdownLabel: string
  studentsSearchPlaceholder: string
  preferredTimeLabel: string
  timeOptions: string[]
  backBtn: string
  confirmBtn: string
  studentsOptions: DropdownOption<string>[]
}

export interface LanguageTranslationBundle {
  nav: NavTranslations
  hero: HeroTranslations
  stats: StatsTranslations
  comparison: ComparisonTranslations
  features: FeatureModulesTranslations
  tour: TourTranslations
  team: TeamTranslations
  roi: RoiTranslations
  testimonials: TestimonialsTranslations
  pricing: PricingTranslations
  faq: FaqTranslations
  cta: CtaTranslations
  footer: FooterTranslations
  demoModal: DemoModalTranslations
}

export const TRANSLATIONS: Record<Language, LanguageTranslationBundle> = {
  uz: {
    nav: {
      whyUs: 'Nega biz',
      modules: 'Modullar',
      tour: 'Platforma',
      team: 'Jamoa',
      roi: 'ROI',
      pricing: 'Narxlar',
      faq: 'KOP',
      login: 'Kirish',
      bookDemo: 'Bepul demo',
    },
    team: {
      badge: 'Kompaniya asoschilari',
      heading: 'A.L.I.A ortida turgan jamoa',
      subheading:
        "Ta'lim sohasini avtomatlashtirish va innovatsiyalarni joriy etishga bel bog'lagan mutaxassislarimiz bilan tanishing.",
      members: [
        {
          id: '1',
          name: 'Nurulloh Islomov',
          role: 'Co-Founder & Backend Engineer',
          image: '/Nurulloh.png',
          github: 'https://github.com/nurulloh-coder-dev',
          linkedin: 'https://www.linkedin.com/in/nurilloh-islomov-9b4a43386',
        },
        {
          id: '2',
          name: 'Diyor Khasanov',
          role: 'Co-Founder & Frontend Engineer',
          image: '/Diyor.png',
          github: 'https://github.com/Diyor-Khasanov-dev',
          linkedin: 'https://linkedin.com/in/diyor-khasanov',
        },
        {
          id: '3',
          name: 'Abdulmajid Sharipov',
          role: 'Co-Founder & Frontend Engineer',
          image: '/Abdulmajid.png',
          github: 'https://github.com/Abdulmajidkhan007',
          linkedin: 'https://linkedin.com/in/abdulmajid-sharipov-profile',
        },
        {
          id: '4',
          name: 'Muhammadali Yoqubjonov',
          role: 'Co-Founder & Backend Engineer',
          image:
            '/Muhammadali.png',
          github: 'https://github.com/goodman113',
          linkedin: 'https://www.linkedin.com/in/muhammadali-yokubjonov-2241972b6/',
        },
        {
          id: '5',
          name: 'Oybek Abdullayev',
          role: 'Co-Founder & Frontend Engineer',
          image:
            '/Oybek.png',
          github: 'https://github.com/powerful10',
          linkedin: 'https://linkedin.com/in/oybek-abdullayev-720a41401',
        },
      ],
    },
    hero: {
      badge: "Yangi avlod ta'lim markazini boshqarish platformasi",
      titlePart1: "Ta'lim markazingizni",
      titleHighlight: '100% aniqlik',
      titlePart2: 'va yo‘qotishlarsiz boshqaring.',
      description:
        "Zamonaviy ta'lim markazlari, til akademiyalari va IT maktablar uchun maxsus yaratilgan yaxlit ERP va CRM tizimi. Sotuvlar, davomat, to'lovlar va filiallar boshqaruvini avtomatlashtiring.",
      bookDemoBtn: 'Bepul 1-ga-1 demo olings',
      watchTourBtn: "Interaktiv turni ko'rish",
      trustTrial: '14 kunlik bepul sinov',
      trustSetup: '15 daqiqada tezkor sozlash',
      trustMigration: "Bepul ma'lumotlarni ko'chirish",
      dashboardTitle: 'alia.app/admin/dashboard',
      liveSystem: 'Jonli tizim',
      activeStudents: 'Faol o‘quvchilar',
      thisMonth: '↑ +12.4% bu oy',
      monthlyTuition: 'Oylik tushum',
      collected: "98% yig'ilgan",
      newLeads: 'Yangi lidlar CRM',
      readyToEnroll: "32 tasi a'zo bo'lishga tayyor",
      attendanceToday: 'Bugungi davomat',
      qrActive: 'QR check-in faol',
      revenueChartTitle: 'Daromad va qarzdorlik tahlili',
      revenueChartSub: 'Iyun 2024',
      chartCurrent: 'Hozirgi',
      liveStreamTitle: 'Filiallardan jonli xabarlar',
      tuitionPaid: "To'lov qilindi ($120)",
      qrCheckin: 'QR Check-In #492',
      newLeadIg: 'Instagramdan yangi lid',
      smsBadgeTitle: 'Ota-onalarga avto-SMS',
      smsBadgeSub: '“Farzandingiz darsga soat 14:00 da kirdi”',
    },
    stats: {
      partnerHeading: "350+ dan ortiq yetakchi ta'lim markazlari va akademiyalar ishonchi",
      stats: [
        { value: '350+', label: "Ta'lim markazlari", sub: '12 ta mamlakatda' },
        { value: '180,000+', label: 'Faol talabalar', sub: 'Ro‘yxatdan o‘tgan va kuzatiladi' },
        { value: '$12M+', label: "To'lovlar ishlandi", sub: 'Avtomatlashtirilgan hisob-kitob' },
        { value: '99.9%', label: 'Uptime SLA', sub: 'Korporativ darajadagi ishonchlilik' },
      ],
    },
    comparison: {
      badge: 'Excel va Telegram tartibsizligiga chek qo‘ying',
      heading: 'Eski usullarda boshqarish sizga qanchaga tushayotganini bilasizmi?',
      subheading:
        "Qog'ozlar va tarqoq ilovalar orqali boshqarish to'lanmagan qarzdorliklarga, yo'qolgan lidlarga va adminlarning toliqishiga olib keladi.",
      oldWayTitle: 'Eski usul (Excel, Qog‘ozlar va Chatlar)',
      oldWayTag: 'Yuqori xavf va yo‘qotish',
      newWayTitle: 'A.L.I.A yechimi',
      newWayTag: '100% Avtomatlashtirilgan',
      items: [
        {
          category: 'Lidlar va Talabalar boshqaruvi',
          oldWay: 'Telegram guruhlarida va tartibsiz Excel jadvallarida yo‘qolgan lidlar.',
          newWay:
            'Avtomatik lid qabul qilish, status teglari va SMS xabarnomalar bilan yagona CRM.',
        },
        {
          category: 'Davomat va Darslarni kuzatish',
          oldWay:
            'Qog‘oz jurnallar yoki kechiktirilgan qo‘lda kiritishlar oqibatida yo‘qotilgan davomat.',
          newWay: 'Kechikmasdan QR kod skanerlash va ota-onalarga avtomatik SMS bildirishnomalari.',
        },
        {
          category: 'Moliyaviy hisobot va Oylik to‘lovlar',
          oldWay:
            'Naqd pul hisobidagi xatolar, yig‘ilmagan qarzlar va cheklar chop etishdagi xaos.',
          newWay:
            'Avtomatlashtirilgan hisob-kitob, onlayn to‘lov tizimlari va darhol qarzdorlar hisoboti.',
        },
        {
          category: 'O‘qituvchilar maoshi va KPI',
          oldWay: 'Oylik soatbay maoshlar va murakkab qo‘lda qilinadigan KPI hisob-kitoblari.',
          newWay: 'O‘quvchilar soni, soat va dars davomatiga asoslangan avtomatik ish haqi hisobi.',
        },
        {
          category: 'Ota-ona va O‘quvchilar muloqoti',
          oldWay: 'Tarqoq qo‘ng‘iroqlar, o‘tkazib yuborilgan e’lonlar va kuzatilmagan baholar.',
          newWay: 'Baholar, jadval va to‘lovlar uchun maxsus mobil ilova hamda ota-onalar portali.',
        },
      ],
    },
    features: {
      badge: 'To‘liq funksional imkoniyatlar',
      heading: "Ta'lim markazingizni kengaytirish uchun barcha kerakli vositalar",
      subheading:
        'Administratorlar, sotuvchilar, o‘qituvchilar, talabalar va ota-onalar uchun qulay imkoniyatlar.',
      filterLabel: 'Modullarni rol bo‘yicha filtrlash',
      requestDemo: 'Ushbu modul uchun jonli demo so‘rash',
      roleFilterOptions: [
        {
          value: 'all',
          label: 'Barcha modullar',
          description: 'Platformaning barcha imkoniyatlari',
          icon: Filter,
        },
        {
          value: 'admin',
          label: 'Admin va Egalari',
          description: 'Analitika, maosh va moliya',
          icon: Building2,
          badge: 'To‘liq nazorat',
        },
        {
          value: 'sales',
          label: 'CRM va Sotuv',
          description: 'Lidlar, voronka va avto SMS',
          icon: PhoneCall,
          badge: '+35% Sotuv',
        },
        {
          value: 'teacher',
          label: 'O‘qituvchilar',
          description: 'QR davomat va dars jurnallari',
          icon: QrCode,
        },
      ],
      modules: [
        {
          id: 'crm',
          role: 'sales',
          title: 'Lid CRM va Voronka',
          tagline: 'Murojaatlarni tezroq to‘lovchi o‘quvchilarga aylantiring',
          description:
            'Instagram, Facebook, Veb-sayt va kelgan so‘rovlarni bitta joyda kuzating. Avto-menejer biriktirish va SMS eslatmalar yuborish.',
          badge: 'Sotuv o‘sishi +35%',
          icon: PhoneCall,
          color: 'from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-400',
          highlights: [
            'Ko‘p kanalli lid qabul qilish',
            'Kanban doskasi',
            'Avtomatik SMS va WhatsApp eslatmalar',
            'Menejerlar statistikasi',
          ],
        },
        {
          id: 'student-mgmt',
          role: 'admin',
          title: 'Talabalar va Kurslar Administratsiyasi',
          tagline: 'O‘quvchilarning to‘liq siklini boshqarish',
          description:
            'Guruhlar, dars jadvallari, o‘quvchi profillari, guruhdan-guruhga o‘tkazish va sertifikatlarni oson boshqaring.',
          badge: '90% kamroq admin vaqti',
          icon: GraduationCap,
          color: 'from-violet-500/20 to-purple-500/20 border-violet-500/30 text-violet-400',
          highlights: [
            'Guruhlar va sig‘im limitlari',
            'O‘quvchi tarixi va statusi',
            'Sertifikatlar generatori',
            'Filiallar o‘rtasida o‘tkazish',
          ],
        },
        {
          id: 'attendance',
          role: 'teacher',
          title: 'Aqlli Davomat va QR Check-in',
          tagline: 'Ota-onalarga zumda SMS yuboruvchi QR tizim',
          description:
            'O‘qituvchilar yoki resepshn o‘quvchining QR passini skanerlaydi. O‘quvchi kelganda yoki qoldirganda ota-onasiga darhol SMS boradi.',
          badge: '0% davomat soxtaligi',
          icon: QrCode,
          color: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-400',
          highlights: [
            'O‘quvchi QR pass generatori',
            'Darhol avtomatik SMS',
            'Kechikish va sababli qoldirishlar',
            'O‘qituvchi dars jurnali',
          ],
        },
        {
          id: 'finance',
          role: 'admin',
          title: 'Hisob-kitob, Qarz Nazorati va Maosh',
          tagline: 'Moliyaviy shaffoflik va avtomatik cheklar',
          description:
            'Oylik to‘lovlarni avtomatlashtiring, chegirmalarni boshqaring, qarzdorlarga SMS yuboring va o‘qituvchilar maoshini avto hisoblang.',
          badge: 'Qarzdorliksiz moliya',
          icon: CreditCard,
          color: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-400',
          highlights: [
            'Onlayn to‘lov tizimlari',
            'SMS orqali qarz eslatmalari',
            'Moslashuvchan chegirmalar',
            'O‘qituvchilar KPI va maosh hisobi',
          ],
        },
        {
          id: 'lms',
          role: 'student',
          title: 'LMS, Uy vazifasi va Test Platformasi',
          tagline: 'O‘quvchilarni darsdan tashqarida ham jalb qiling',
          description:
            'O‘qituvchilar darsliklar, video va testlar yuklaydi. O‘quvchilar vazifalarni onlayn topshiradi va reytingda bellashadi.',
          badge: '2x yuqori qiziqish',
          icon: BookOpen,
          color: 'from-pink-500/20 to-rose-500/20 border-pink-500/30 text-pink-400',
          highlights: [
            'Video darslar ombori',
            'Uy vazifalarini baholash',
            'O‘quvchi reytingi va tangalar',
            'Avtomatik test baholash',
          ],
        },
        {
          id: 'analytics',
          role: 'admin',
          title: 'Kengaytirilgan Analitika va BI',
          tagline: 'Rahbarlar uchun real vaqtdagi boshqaruv paneli',
          description:
            'Barcha filiallar ko‘rsatkichlarini bitta joyda kuzating. Tushum prognozlari, talabalar ketish foizi va eng yaxshi o‘qituvchilar.',
          badge: '360° Boshqaruv ko‘rinishi',
          icon: BarChart3,
          color: 'from-indigo-500/20 to-sky-500/20 border-indigo-500/30 text-indigo-400',
          highlights: [
            'Ko‘p fillialli jamlangan ko‘rinish',
            'O‘quvchilar saqlanish analitikasi',
            'Moliya va cashflow prognozi',
            'PDF va Excel hisobotlar',
          ],
        },
      ],
    },
    tour: {
      badge: 'Interaktiv ish jarayoni',
      heading: 'Platformaning ichki imkoniyatlari bilan tanishing',
      subheading:
        'A.L.I.A markazingiz boshqaruvini qanchalik soddalashtirishini his qilish uchun bo‘limlarni bosing.',
      seeDemoBtn: 'Jonli demoga yozilish',
      liveInterface: 'Jonli interfeys',
      synced: '100% Sinxronlangan',
      tabs: [
        {
          id: 'crm',
          label: 'Lid CRM',
          title: 'Murojaatlarni O‘quvchilarga Aylantiring',
          desc: "Ta'lim markazlari uchun maxsus mo'ljallangan visual Kanban doskasi. Potentsial o'quvchilarni hech qachon yo'qotmang.",
          metrics: [
            { label: 'Konversiya darajasi', val: '28.4%', trend: '+4.2%' },
            { label: 'Bugungi yangi lidlar', val: '42 ta', trend: 'Faol' },
            { label: 'O‘rtacha aloqa vaqti', val: '12 daq', trend: '-8 daq' },
          ],
        },
        {
          id: 'attendance',
          label: 'QR Davomat',
          title: 'Sekundlarda Kontaktsiz Check-In',
          desc: 'Talabalar kirishda planshet orqali QR belgisini skanerlaydi. Ota-onalar farzandi xavfsiz kelgani haqida darhol xabar oladi.',
          metrics: [
            { label: 'Tekshirish tezligi', val: '1.2 sek', trend: 'Juda tez' },
            { label: 'Yuborilgan SMS', val: '1,420 bugun', trend: '100% yetkazildi' },
            { label: 'Sababsiz qoldirish', val: '1.8%', trend: '-65% kamaydi' },
          ],
        },
        {
          id: 'payments',
          label: 'To‘lovlar va Qarzlar',
          title: 'Avtomatlashtirilgan Oylik Yig‘im',
          desc: "To'lov ketidan quvishni to'xtating. To'lov havolasi bo'lgan avtomatik SMS eslatmalar ota-onalarga 2 marta bosishda to'lash imkonini beradi.",
          metrics: [
            { label: 'O‘z vaqtida to‘lov', val: '94.2%', trend: '+22%' },
            { label: 'Muddati o‘tgan qarz', val: '$1,200', trend: '-78%' },
            { label: 'Avto-cheklar', val: '100%', trend: 'Tasdiqlangan' },
          ],
        },
        {
          id: 'app',
          label: 'Ota-onalar mobil ilovasi',
          title: 'Ishochni Oshiruvchi Shaffoflik',
          desc: "Ota-onalar istalgan vaqtda davomat, o'qituvchi izohlari, uy vazifalari, baholar va hisob balansini ko'rishlari mumkin.",
          metrics: [
            { label: 'Ilova faolligi', val: '89%', trend: 'Yuqori jalb' },
            { label: 'App Store reytingi', val: '4.9 ★', trend: 'A’lo' },
            { label: 'Murojaatlar kamayishi', val: '-40%', trend: 'Kamroq qo‘ng‘iroq' },
          ],
        },
      ],
    },
    roi: {
      badge: 'Teqjamkorlik Kalkulyatori',
      heading: 'A.L.I.A qancha vaqt va mablag‘ingizni tejashini hisoblang',
      subheading:
        'Markazingiz ko‘rsatkichlarini tanlang va har haftalik tejaladigan admin vaqtini hamda qaytarilgan mablag‘larni ko‘ring.',
      slider1Label: 'Faol o‘quvchilar soni',
      slider2Label: 'Filiallar soni',
      slider1Unit: 'ta o‘quvchi',
      slider2Unit: 'ta filial',
      roiTitle: 'Taxminiy Oylik Tejamkorlik',
      perMonthSaved: '/ oyiga tejaladi',
      timeSavedLabel: 'Tejalgan admin vaqti',
      timeSavedSub: 'Haftasiga qo‘lda qilinadigan ish',
      leadsRecoveredLabel: 'Qaytarilgan lidlar',
      leadsRecoveredSub: 'CRM orqali qayta aloqa',
      auditBtn: 'Tejamkorlikni boshlash — Audit so‘rash',
      benchmarkNote: '350+ ta’lim markazlarining real natijalariga asoslangan.',
    },
    testimonials: {
      badge: 'Isbotlangan natijalar',
      heading: "Ta'lim markazi rahbarlari va asoschilari e'tirofi",
      subheading:
        'Yetakchilar A.L.I.A yordamida jarayonlarni va daromadni qanday oshirganini bilib oling.',
      testimonials: [
        {
          quote:
            'A.L.I.A tizimi markazimizni butunlay o‘zgartirdi. Ilgari menejerlar esdan chiqargani uchun 30% lidlarni yo‘qotardik. Hozir barchasi nazoratda, daromadimiz 6 oyda 45% ga oshdi.',
          author: 'Jasur Shokirov',
          role: 'Asoschi va CEO',
          company: 'Apex Education Center (4 filial)',
          stats: '+45% Daromad o‘sishi',
          image:
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        },
        {
          quote:
            'Avtomatik QR davomat va ota-onalarga darhol yuboriladigan SMS resepshnimizdagi har kungi 2 soat vaqtni tejadi. Ota-onalar shaffoflikni juda qadrlashadi.',
          author: 'Elena Smirnova',
          role: 'Akademik Direktor',
          company: 'Bright Minds Language Academy',
          stats: 'Kuniga 2 soat tejaladi',
          image:
            'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        },
        {
          quote:
            '6 ta filialni Excelda boshqarish haqiqiy kabus edi. A.L.I.A bilan smartfonimdan real vaqt rejimida barcha filiallar moliya va o‘quvchi sonini ko‘rib turaman.',
          author: 'Alisher Qodirov',
          role: 'Bosh Direktor',
          company: 'ProTech IT Academy',
          stats: '6 ta filial birlashtirildi',
          image:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        },
      ],
    },
    pricing: {
      badge: 'Ochiq va shaffof narxlar',
      heading: 'Har qanday hajmga mos keladigan rejalari',
      subheading:
        'Yashirin to‘lovlar yo‘q. O‘sgan sari tarifingizni istalgan vaqtda o‘zgartirishingiz mumkin.',
      monthlyBilling: 'Oylik to‘lov',
      annualBilling: 'Yillik to‘lov',
      savePercent: '20% tejang',
      perMonthBranch: '/ oyiga har bir filial uchun',
      includedFeaturesTitle: 'Tarifga kiradi:',
      plans: [
        {
          name: 'Starter',
          desc: 'Kichik ta’lim markazlari va xususiy studiyalar uchun ideal.',
          monthlyPrice: 49,
          annualPrice: 39,
          studentsLimit: '200 tagacha o‘quvchi',
          branchesLimit: '1 ta filial',
          features: [
            'Asosiy o‘quvchilar va guruhlar boshqaruvi',
            'Lid CRM Kanban voronkasi',
            'QR kodli davomat skanerlash',
            'To‘lovlar va qarzdorlar nazorati',
            'Avtomatik SMS bildirishnomalar (Asosiy)',
            'O‘qituvchilar dars jadvali',
            'Standart moliyaviy hisobotlar',
          ],
          highlight: false,
          cta: '14 kunlik bepul sinovni boshlash',
        },
        {
          name: 'Growth Standard',
          desc: 'Avtomatlashtirish va mobil ilovani xohlaydigan rivojlanayotgan markazlar uchun.',
          monthlyPrice: 99,
          annualPrice: 79,
          studentsLimit: '700 tagacha o‘quvchi',
          branchesLimit: '3 tagacha filial',
          features: [
            'Starter tarifidagi barcha imkoniyatlar',
            'Ota-ona va o‘quvchilar mobil veb-portali',
            'LMS, onlayn uy vazifalari va testlar',
            'O‘qituvchilar maoshi va KPI kalkulyatori',
            'Ko‘p kanalli CRM integratsiyasi (IG, Web)',
            'Kengaytirilgan ko‘p filialli analitika',
            'Shaxsiy onboarding menejeri',
            'Ustuvor 24/7 telefon va Telegram qo‘llab-quvvatlash',
          ],
          highlight: true,
          cta: 'Hozir boshlash',
        },
        {
          name: 'Enterprise / Franchise',
          desc: 'Katta akademiya tarmoqlari va franchayzilar uchun maxsus yechim.',
          monthlyPrice: 199,
          annualPrice: 159,
          studentsLimit: 'Cheklanmagan o‘quvchi',
          branchesLimit: 'Cheklanmagan filial',
          features: [
            'Growth tarifidagi barcha imkoniyatlar',
            'App Store va Google Play uchun brend ilova',
            'Individual to‘lov tizimlari integratsiyasi',
            'API va Webhook ruxsati',
            'Franchayzi egasi boshqaruv markazi',
            'Alohida server va 99.9% SLA',
            'So‘rov bo‘yicha individual funksiyalar',
          ],
          highlight: false,
          cta: 'Sotuv bo‘limi bilan bog‘lanish',
        },
      ],
    },
    faq: {
      badge: 'Savollaringiz bormi?',
      heading: 'Ko‘p beriladigan savollar',
      subheading: 'A.L.I.A tizimini markazingizga joriy etish haqida barcha javoblar.',
      faqs: [
        {
          q: "Ma'lumotlarni Excel yoki boshqa tizimdan ko'chirish qancha vaqt oladi?",
          a: "Ma'lumotlarni ko'chirish juda tez! Bizning jamoamiz tayyor Excel/CSV shablonlarini taqdim etadi. Barcha o'quvchilar, guruhlar va moliya ma'lumotlarini 30 daqiqadan kamroq vaqt ichida yuklashingiz mumkin. Shuningdek, biz bepul yordam beramiz.",
        },
        {
          q: "Ota-onalar to'lovlarni tizim orqali onlayn amalga oshirishlari mumkinmi?",
          a: "Ha! A.L.I.A ommabop to'lov tizimlari (Payme, Click va bank kartalari) bilan integratsiyalashgan. Ota-onalar SMS yoki shaxsiy kabinet orqali to'lov havolasini oladilar.",
        },
        {
          q: 'A.L.I.A bir nechta filial va franchayzalarni qo‘llab-quvvatlaydimi?',
          a: 'Albatta. A.L.I.A maxsus ko‘p filialli ta’lim markazlari uchun mo‘ljallangan. Filial menejerlari faqat o‘z filialini ko‘radi, rahbarlar esa umumiy tahlilni ko‘radi.',
        },
        {
          q: 'QR kodli davomat tizimi qanday ishlaydi?',
          a: "Har bir o'quvchi o'z telefonida yoki chop etilgan kartada unikal QR kod oladi. Resepshn yoki o'qituvchi istalgan planshet yoki kamera orqali kodni skanerlaydi va ota-onaga avtomatik SMS boradi.",
        },
        {
          q: "Bizning ma'lumotlarimiz xavfsizligi kafolatlanganmi?",
          a: 'Xavfsizlik bizning eng ustuvor vazifamizdir. Biz SSL shifrlash, har kunlik zaxira nusxalash va SOC2 standartlariga mos keladigan bulutli serverlardan foydalanamiz.',
        },
        {
          q: 'A.L.I.A-ni xarid qilishdan oldin sinab ko‘rish mumkinmi?',
          a: 'Ha, biz kartasiz 14 kunlik to‘liq bepul sinov muddatini taqdim etamiz. Shuningdek, mutaxassisimiz bilan 1-ga-1 demo uchrashuv belgilashingiz mumkin.',
        },
      ],
    },
    cta: {
      heading: 'O‘quv markazingiz boshqaruvini o‘zgartirishga tayyormisiz?',
      subheading:
        'Bugunning o‘zida 350+ ta’lim markazlariga qo‘shiling. Jonli demoni ko‘ring va tartibsizliklarga barham bering.',
      bookDemoBtn: 'Jonli demo belgilash',
      freeTrialBtn: '14 kunlik bepul sinov',
      guaranteeText: 'Karta talab qilinmaydi • 15 daqiqada sozlash • Istalgan vaqtda bekor qilish',
    },
    footer: {
      brandDesc:
        "Zamonaviy ta'lim markazlari, reppetitorlik va til akademiyalari uchun yagona ERP va CRM operatsion tizimi.",
      security: 'SOC2 sertifikatlangan va bank darajasidagi shifrlash',
      modulesTitle: 'Modullar',
      solutionsTitle: 'Yechimlar',
      solutions: [
        'Til markazlari',
        'IT va Dasturlash akademiyalari',
        'IELTS va Imtihonga tayyorlov',
        'Ko‘p filialli franchayzalar',
        'Bolalar va STEM maktablari',
      ],
      contactTitle: 'Bog‘lanish',
      contactSub: 'Reja tanlashda yordam kerakmi?',
      contactBtn: 'Mahsulot jamoasi bilan aloqa',
      privacy: 'Maxfiylik siyosati',
      terms: 'Foydalanish shartlari',
      securityLink: 'Xavfsizlik',
      allRightsReserved: 'Barcha huquqlar himoyalangan.',
    },
    demoModal: {
      personalizedWalkthrough: 'Shaxsiy 1-ga-1 tushuntirish',
      title: 'Markazingiz uchun jonli demo buyurtma qiling',
      subtitle:
        'A.L.I.A markazingiz ish jarayoniga va filiallar tuzilmasiga qanday mos kelishini ko‘ring.',
      confirmedTitle: 'Demo so‘rovingiz tasdiqlandi!',
      confirmedMessage:
        'Rahmat! Mutaxassisimiz 15 daqiqa ichida siz bilan bog‘lanib, uchrashuv vaqtini belgilaydi.',
      stepContact: 'Aloqa ma’lumotlari',
      stepScale: 'Markaz hajmi',
      fullNameLabel: 'Ism va familiyangiz',
      fullNamePlaceholder: 'Masalan: Akmal Umarov',
      phoneLabel: 'Telefon / WhatsApp raqamingiz',
      phonePlaceholder: '+998 90 123 45 67',
      centerNameLabel: 'O‘quv markazingiz nomi',
      centerNamePlaceholder: 'Masalan: Cambridge Education Hub',
      nextCapacityBtn: 'Keyingisi: O‘quvchilar sig‘imini tanlash',
      studentsDropdownLabel: 'Faol o‘quvchilar soni',
      studentsSearchPlaceholder: 'Sig‘im bo‘yicha qidirish...',
      preferredTimeLabel: 'Demo qo‘ng‘irog‘i uchun qulay vaqt',
      timeOptions: [
        'Ertalab (9:00 - 12:00)',
        'Tushdan keyin (12:00 - 17:00)',
        'Kechqurun (17:00 - 20:00)',
        'Bugun istalgan vaqtda',
      ],
      backBtn: 'Orqaga',
      confirmBtn: 'Tasdiqlash va Demoga yozilish',
      studentsOptions: [
        {
          value: 'Under 100',
          label: '100 tagacha o‘quvchi',
          description: 'Kichik filial / studiya',
          icon: Users,
        },
        {
          value: '100-300',
          label: '100 - 300 ta o‘quvchi',
          description: 'Rivojlanayotgan akademiya / 1-2 filial',
          icon: Users,
          badge: 'Ommabop',
        },
        {
          value: '300-800',
          label: '300 - 800 ta o‘quvchi',
          description: 'Yirik ko‘p filialli markaz',
          icon: Users,
        },
        {
          value: '800+',
          label: '800+ ta o‘quvchi (Franchayzi)',
          description: 'Katta tarmoq va franchayzing',
          icon: Building2,
          badge: 'Enterprise',
        },
      ],
    },
  },
  ru: {
    nav: {
      whyUs: 'Почему мы',
      modules: 'Модули',
      tour: 'Обзор',
      team: 'Команда',
      roi: 'ROI',
      pricing: 'Цены',
      faq: 'FAQ',
      login: 'Войти',
      bookDemo: 'Бесплатное демо',
    },
    team: {
      badge: 'Основатели компании',
      heading: 'Команда, стоящая за A.L.I.A',
      subheading:
        'Познакомьтесь с экспертами, которые создают инновации и автоматизируют процессы для образовательных центров.',
      members: [
        {
          id: '1',
          name: 'Nurulloh Islomov',
          role: 'Co-Founder & CEO',
          image: '/Nurulloh.png',
          bio: 'Предприниматель и стратег с 7-летним опытом в сфере EdTech.',
        },
        {
          id: '2',
          name: 'Diyor Khasanov',
          role: 'Co-Founder & CTO',
          image: '/Diyor.png',
          bio: 'Архитектор высоконагруженных облачных систем и безопасности данных.',
        },
        {
          id: '3',
          name: 'Abdulmajid Sharipov',
          role: 'Head of Product & UX',
          image: '/Abdulmajid.png',
          bio: 'Эксперт по продуктовому дизайну и интуитивным пользовательским интерфейсам.',
        },
        {
          id: '4',
          name: 'Muhammadali Yoqubjonov',
          role: 'Lead Full-Stack Engineer',
          image:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
          bio: 'Ведущий разработчик React, Next.js и микросервисной архитектуры.',
        },
        {
          id: '5',
          name: 'Team Member (Coming Soon)',
          role: 'Head of Customer Success',
          image:
            'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
          bio: 'Руководитель направления онбординга и заботы о клиентах.',
        },
      ],
    },
    hero: {
      badge: 'Платформа управления обучением нового поколения',
      titlePart1: 'Управляйте своим',
      titleHighlight: 'учебным центром',
      titlePart2: 'на 100% прозрачно и без потерь.',
      description:
        'Все-в-одном ERP & CRM система, созданная специально для современных учебных центров, языковых академий и IT-школ. Автоматизируйте продажи, посещаемость, биллинг и работу филиалов.',
      bookDemoBtn: 'Записаться на 1-на-1 демо',
      watchTourBtn: 'Интерактивный обзор',
      trustTrial: '14 дней бесплатного периода',
      trustSetup: 'Быстрый запуск за 15 минут',
      trustMigration: 'Бесплатный перенос данных',
      dashboardTitle: 'alia.app/admin/dashboard',
      liveSystem: 'Живая система',
      activeStudents: 'Активные студенты',
      thisMonth: '↑ +12.4% за месяц',
      monthlyTuition: 'Выручка за месяц',
      collected: '98% собрано',
      newLeads: 'Новые лиды CRM',
      readyToEnroll: '32 готовы к зачислению',
      attendanceToday: 'Посещаемость сегодня',
      qrActive: 'QR check-in активен',
      revenueChartTitle: 'Анализ доходов и задолженностей',
      revenueChartSub: 'Июнь 2024',
      chartCurrent: 'Текущий',
      liveStreamTitle: 'Лента событий филиалов',
      tuitionPaid: 'Оплата обучения ($120)',
      qrCheckin: 'QR Check-In #492',
      newLeadIg: 'Новый лид из Instagram',
      smsBadgeTitle: 'Авто-SMS родителям',
      smsBadgeSub: '«Ваш ребенок пришел на урок в 14:00»',
    },
    stats: {
      partnerHeading: 'Нам доверяют более 350 ведущих учебных центров и академий',
      stats: [
        { value: '350+', label: 'Учебных центров', sub: 'В 12 странах' },
        { value: '180,000+', label: 'Активных студентов', sub: 'Учитываются и отслеживаются' },
        { value: '$12M+', label: 'Обработано платежей', sub: 'Автоматический биллинг' },
        { value: '99.9%', label: 'Uptime SLA', sub: 'Корпоративная надежность' },
      ],
    },
    comparison: {
      badge: 'Остановите хаос в Excel и Telegram',
      heading: 'Почему традиционные методы управления стоят дороже, чем вы думаете',
      subheading:
        'Ведение учета на бумаге или в разрозненных чатах приводит к долгам, утерянным лидам и выгоранию администраторов.',
      oldWayTitle: 'Старый подход (Excel, бумаги и чаты)',
      oldWayTag: 'Высокий риск и потери',
      newWayTitle: 'Решение A.L.I.A',
      newWayTag: '100% Автоматизировано',
      items: [
        {
          category: 'Управление лидами и студентами',
          oldWay: 'Потерянные лиды в Telegram-группах и запутаных таблицах Excel.',
          newWay: 'Единая CRM-воронка с автозахватом лидов, тегами и SMS-напоминаниями.',
        },
        {
          category: 'Посещаемость и учет занятий',
          oldWay: 'Бумажные журналы или задержки ручного ввода, приводящие к пропускам.',
          newWay: 'Быстрое сканирование QR-кодов и автоматические SMS родителям.',
        },
        {
          category: 'Финансы и ежемесячные оплаты',
          oldWay: 'Ошибки кассы, несобранные долги и хаос с печатью чеков.',
          newWay: 'Автоматический биллинг, онлайн-эквайринг и мгновенные отчеты по должникам.',
        },
        {
          category: 'Зарплата преподавателей и KPI',
          oldWay: 'Сложные ежемесячные расчеты почасовой оплаты вручную.',
          newWay: 'Автоматический расчет зарплаты на основе посещаемости и количества учеников.',
        },
        {
          category: 'Связь с родителями и учениками',
          oldWay: 'Хаотичные звонки, пропущенные объявления и неконтролируемые оценки.',
          newWay: 'Мобильное приложение и портал для родителей: оценки, расписание и чеки.',
        },
      ],
    },
    features: {
      badge: 'Полный функционал',
      heading: 'Все необходимые инструменты для масштабирования вашего центра',
      subheading:
        'Персонализированные рабочие места для директоров, продаж, учителей, учеников и родителей.',
      filterLabel: 'Фильтр модулей по ролям',
      requestDemo: 'Запросить демо этого модуля',
      roleFilterOptions: [
        {
          value: 'all',
          label: 'Все модули',
          description: 'Обзор всех возможностей платформы',
          icon: Filter,
        },
        {
          value: 'admin',
          label: 'Админ и Владельцы',
          description: 'Аналитика филиалов, зарплаты и биллинг',
          icon: Building2,
          badge: 'Полный контроль',
        },
        {
          value: 'sales',
          label: 'CRM и Продажи',
          description: 'Лиды, воронка и авто-SMS',
          icon: PhoneCall,
          badge: '+35% Продаж',
        },
        {
          value: 'teacher',
          label: 'Преподаватели',
          description: 'QR-посещаемость и журналы',
          icon: QrCode,
        },
      ],
      modules: [
        {
          id: 'crm',
          role: 'sales',
          title: 'CRM и Воронка Лидов',
          tagline: 'Быстрее превращайте заявки в оплативших учеников',
          description:
            'Отслеживайте входящие заявки из Instagram, Facebook, сайта и визитов. Автоматическое распределение и SMS-напоминания.',
          badge: 'Рост продаж +35%',
          icon: PhoneCall,
          color: 'from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-400',
          highlights: [
            'Мультиканальный захват лидов',
            'Kanban-доска сделок',
            'Авто SMS и WhatsApp касания',
            'Статистика менеджеров',
          ],
        },
        {
          id: 'student-mgmt',
          role: 'admin',
          title: 'Администрирование Учеников',
          tagline: 'Полный жизненный цикл студента',
          description:
            'Управляйте группами, расписанием, профилями учеников, переводами между филиалами и выдачей сертификатов.',
          badge: 'На 90% меньше рутины',
          icon: GraduationCap,
          color: 'from-violet-500/20 to-purple-500/20 border-violet-500/30 text-violet-400',
          highlights: [
            'Расписание и лимиты групп',
            'История и статусы ученика',
            'Генератор сертификатов',
            'Переводы между филиалами',
          ],
        },
        {
          id: 'attendance',
          role: 'teacher',
          title: 'Умная Посещаемость и QR Check-in',
          tagline: 'Мгновенный чек-ин с авто-уведомлением родителей',
          description:
            'Преподаватели или администраторы сканируют QR-пропуск ученика. Родители мгновенно получают SMS о приходе.',
          badge: '0% обмана с посещаемостью',
          icon: QrCode,
          color: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-400',
          highlights: [
            'Генератор QR-пропусков',
            'Автоматические SMS родителям',
            'Учет опозданий и болезней',
            'Электронный журнал урока',
          ],
        },
        {
          id: 'finance',
          role: 'admin',
          title: 'Биллинг, Контроль Долгов и Зарплата',
          tagline: 'Прозрачные финансы и автоматические чеки',
          description:
            'Автоматизируйте ежемесячные списания, скидки, напоминания должникам и расчет зарплат учителей по KPI.',
          badge: 'Финансы без долгов',
          icon: CreditCard,
          color: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-400',
          highlights: [
            'Онлайн-оплата обучения',
            'SMS-напоминания должникам',
            'Гибкие скидки и стипендии',
            'Авторасчет зарплаты по KPI',
          ],
        },
        {
          id: 'lms',
          role: 'student',
          title: 'LMS, Домашние Задания и Тесты',
          tagline: 'Вовлекайте студентов и за пределами классов',
          description:
            'Учителя загружают домашние задания, видео и тесты. Ученики сдают работы онлайн и участвуют в рейтинге.',
          badge: '2x выше вовлеченность',
          icon: BookOpen,
          color: 'from-pink-500/20 to-rose-500/20 border-pink-500/30 text-pink-400',
          highlights: [
            'Хранилище видеоуроков',
            'Онлайн проверка домашних заданий',
            'Геймификация и рейтинг студентов',
            'Автопроверка тестов',
          ],
        },
        {
          id: 'analytics',
          role: 'admin',
          title: 'Аналитика Сети и BI',
          tagline: 'Дашборд руководителя в реальном времени',
          description:
            'Мониторинг ключевых метрик всех филиалов. Прогнозы доходов, отток студентов, окупаемость маркетинга и лучшие учителя.',
          badge: '360° Обзор бизнеса',
          icon: BarChart3,
          color: 'from-indigo-500/20 to-sky-500/20 border-indigo-500/30 text-indigo-400',
          highlights: [
            'Сводный отчет по филиалам',
            'Анализ удержания клиентов',
            'Прогнозирование cashflow',
            'Экспорт в PDF и Excel',
          ],
        },
      ],
    },
    tour: {
      badge: 'Интерактивный процесс',
      heading: 'Взгляните на систему изнутри',
      subheading:
        'Переключайтесь между ключевыми модулями, чтобы увидеть, как A.L.I.A упрощает работу.',
      seeDemoBtn: 'Смотреть полное демо',
      liveInterface: 'Интерфейс платформы',
      synced: '100% Синхронизация',
      tabs: [
        {
          id: 'crm',
          label: 'CRM Лидов',
          title: 'Превращайте Заявки в Студентов',
          desc: 'Наглядная Kanban-доска, разработанная специально для учебных центров. Не теряйте ни одного потенциального клиента.',
          metrics: [
            { label: 'Конверсия', val: '28.4%', trend: '+4.2%' },
            { label: 'Новых лидов сегодня', val: '42 лида', trend: 'Активно' },
            { label: 'Средний отклик', val: '12 мин', trend: '-8 мин' },
          ],
        },
        {
          id: 'attendance',
          label: 'QR Посещаемость',
          title: 'Бесконтактный Check-In за Секунды',
          desc: 'Ученики сканируют QR-код на планшете при входе. Родители сразу получают уведомление, что ребенок на месте.',
          metrics: [
            { label: 'Скорость входа', val: '1.2 сек', trend: 'Ультра быстро' },
            { label: 'Отправлено SMS', val: '1,420 сегодня', trend: '100% доставлено' },
            { label: 'Пропуски без причины', val: '1.8%', trend: '-65% падение' },
          ],
        },
        {
          id: 'payments',
          label: 'Оплаты и Долги',
          title: 'Автоматический Сбор Оплаты',
          desc: 'Забудьте про постоянные напоминания. Автоматические SMS со ссылкой на оплату позволяют родителям оплатить в 2 клика.',
          metrics: [
            { label: 'Оплата вовремя', val: '94.2%', trend: '+22%' },
            { label: 'Просроченные долги', val: '$1,200', trend: '-78%' },
            { label: 'Авто-чеки', val: '100%', trend: 'Проверено' },
          ],
        },
        {
          id: 'app',
          label: 'Приложение Родителя',
          title: 'Прозрачность, Формирующая Доверие',
          desc: 'Родители видят историю посещений, комментарии учителей, оценки, домашние задания и баланс в любое время.',
          metrics: [
            { label: 'Использование приложения', val: '89%', trend: 'Высокий интерес' },
            { label: 'Оценка в App Store', val: '4.9 ★', trend: 'Топ рейтинг' },
            { label: 'Обращения в поддержку', val: '-40%', trend: 'Меньше звонков' },
          ],
        },
      ],
    },
    roi: {
      badge: 'Калькулятор Экономии',
      heading: 'Рассчитайте, сколько времени и денег сэкономит A.L.I.A',
      subheading:
        'Укажите параметры вашего центра, чтобы увидеть экономию часов администрирования и возвращенные средства.',
      slider1Label: 'Всего активных учеников',
      slider2Label: 'Количество филиалов',
      slider1Unit: 'учеников',
      slider2Unit: 'филиалов',
      roiTitle: 'Расчетная Экономия в Месяц',
      perMonthSaved: '/ месяц экономии',
      timeSavedLabel: 'Сэкономлено времени',
      timeSavedSub: 'В неделю на рутине',
      leadsRecoveredLabel: 'Возвращено лидов',
      leadsRecoveredSub: 'Благодаря работе в CRM',
      auditBtn: 'Начать экономию — Запросить аудит',
      benchmarkNote: 'Основано на реальных показателях 350+ учебных центров.',
    },
    testimonials: {
      badge: 'Проверенные результаты',
      heading: 'Отзывы директоров и основателей учебных центров',
      subheading:
        'Узнайте, как руководители трансформировали работу, удержание клиентов и выручку с помощью A.L.I.A.',
      testimonials: [
        {
          quote:
            'Система A.L.I.A полностью изменила наш центр. Раньше мы теряли 30% лидов, так как менеджеры забывали перезвонить. Теперь все под контролем, и выручка выросла на 45% за 6 месяцев.',
          author: 'Джасур Шокиров',
          role: 'Основатель & CEO',
          company: 'Apex Education Center (4 филиала)',
          stats: '+45% Рост выручки',
          image:
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        },
        {
          quote:
            'Автоматическая QR-посещаемость и мгновенные SMS родителям сэкономили нам 2 часа каждый день на ресепшене. Родители в восторге от прозрачности.',
          author: 'Елена Смирнова',
          role: 'Академический директор',
          company: 'Bright Minds Language Academy',
          stats: '2 часа экономии ежедневно',
          image:
            'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        },
        {
          quote:
            'Управление 6 филиалами в Excel было кошмаром. С A.L.I.A я вижу реальное количество учеников, денежный поток и работу сотрудников со своего смартфона.',
          author: 'Алишер Кадыров',
          role: 'Генеральный директор',
          company: 'ProTech IT Academy',
          stats: '6 филиалов объединены',
          image:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        },
      ],
    },
    pricing: {
      badge: 'Прозрачные тарифы',
      heading: 'Простые тарифы для центров любого масштаба',
      subheading: 'Без скрытых платежей. Переходите на другой тариф по мере роста вашей сети.',
      monthlyBilling: 'Ежемесячно',
      annualBilling: 'Ежегодно',
      savePercent: 'Скидка 20%',
      perMonthBranch: '/ месяц за филиал',
      includedFeaturesTitle: 'В тариф входит:',
      plans: [
        {
          name: 'Starter',
          desc: 'Идеально для небольших учебных центров и частных студий.',
          monthlyPrice: 49,
          annualPrice: 39,
          studentsLimit: 'До 200 учеников',
          branchesLimit: '1 филиал включен',
          features: [
            'Управление учениками и группами',
            'Kanban-воронка лидов CRM',
            'Сканирование QR-посещаемости',
            'Учет оплат и контроль долгов',
            'Автоматические SMS (Базовые)',
            'Календарь расписания учителей',
            'Стандартные финансовые отчеты',
          ],
          highlight: false,
          cta: 'Начать 14 дней бесплатно',
        },
        {
          name: 'Growth Standard',
          desc: 'Для растущих центров, которым нужна максимальная автоматизация и приложение.',
          monthlyPrice: 99,
          annualPrice: 79,
          studentsLimit: 'До 700 учеников',
          branchesLimit: 'До 3 филиалов',
          features: [
            'Всё из тарифа Starter',
            'Веб-портал для родителей и учеников',
            'LMS, онлайн домашние задания и тесты',
            'Авторасчет зарплаты учителей и KPI',
            'Мультиканальная CRM-интеграция (IG, Web)',
            'Продвинутая аналитика по филиалам',
            'Персональный менеджер по внедрению',
            'Приоритетная поддержка 24/7',
          ],
          highlight: true,
          cta: 'Начать сейчас',
        },
        {
          name: 'Enterprise / Franchise',
          desc: 'Масштабное решение для крупных сетей академий и франшиз.',
          monthlyPrice: 199,
          annualPrice: 159,
          studentsLimit: 'Безлимитно учеников',
          branchesLimit: 'Безлимитно филиалов',
          features: [
            'Всё из тарифа Growth',
            'Брендированное мобильное приложение в App Store',
            'Индивидуальные интеграции платежных систем',
            'Доступ к API и Webhook',
            'Центр управления франчайзи',
            'Выделенный сервер и SLA 99.9%',
            'Разработка функций по запросу',
          ],
          highlight: false,
          cta: 'Связаться с отделом продаж',
        },
      ],
    },
    faq: {
      badge: 'Остались вопросы?',
      heading: 'Часто задаваемые вопросы',
      subheading: 'Все, что вам нужно знать о внедрении A.L.I.A в ваш учебный центр.',
      faqs: [
        {
          q: 'Сколько времени занимает перенос данных из Excel или другой системы?',
          a: 'Миграция данных происходит очень быстро! Наша команда предоставляет готовые шаблоны Excel/CSV. Вы можете импортировать всех учеников, группы и финансы менее чем за 30 минут.',
        },
        {
          q: 'Могут ли родители оплачивать обучение онлайн через систему?',
          a: 'Да! A.L.I.A интегрирован с популярными платежными системами (Payme, Click, Stripe, банковские карты). Родители получают прямую ссылку на оплату в SMS или в приложении.',
        },
        {
          q: 'Поддерживает ли A.L.I.A работу нескольких филиалов и франшиз?',
          a: 'Абсолютно. A.L.I.A создавался специально для сетевых учебных центров. Менеджеры видит только свой филиал, а собственник имеет единый дашборд.',
        },
        {
          q: 'Как работает система посещаемости по QR-коду?',
          a: 'Каждый ученик получает уникальный цифровой QR-пропуск на телефон или карточку. Администратор сканирует код через планшет, и система отправляет SMS родителю.',
        },
        {
          q: 'Насколько защищены наши данные учеников и финансов?',
          a: 'Безопасность — наш главный приоритет. Мы используем SSL-шифрование, ежедневные бэкапы и облачную инфраструктуру, соответствующую стандарту SOC2.',
        },
        {
          q: 'Могу ли я протестировать A.L.I.A перед покупкой?',
          a: 'Да, мы предоставляем 14 дней полного бесплатного тестового периода без ввода банковской карты.',
        },
      ],
    },
    cta: {
      heading: 'Готовы трансформировать управление вашим учебным центром?',
      subheading:
        'Присоединяйтесь к 350+ современным центрам уже сегодня. Закажите демонстрацию и устраните хаос в учете.',
      bookDemoBtn: 'Заказать демонстрацию',
      freeTrialBtn: '14 дней бесплатного периода',
      guaranteeText: 'Без банковской карты • Запуск за 15 минут • Отмена в любое время',
    },
    footer: {
      brandDesc:
        'Единая ERP & CRM операционная система для управления учебными центрами, языковыми школами и IT-академиями.',
      security: 'Сертификация SOC2 и банковский уровень шифрования',
      modulesTitle: 'Модули',
      solutionsTitle: 'Решения для',
      solutions: [
        'Языковых центров',
        'IT и кодинг академий',
        'IELTS и подготовки к тестам',
        'Сетей и франшиз',
        'Детских и STEM школ',
      ],
      contactTitle: 'Контакты',
      contactSub: 'Нужна помощь с выбором тарифа?',
      contactBtn: 'Связаться с командой',
      privacy: 'Политика конфиденциальности',
      terms: 'Условия использования',
      securityLink: 'Безопасность',
      allRightsReserved: 'Все права защищены.',
    },
    demoModal: {
      personalizedWalkthrough: 'Персональная 1-на-1 презентация',
      title: 'Закажите демонстрацию для вашего центра',
      subtitle: 'Узнайте, как A.L.I.A адаптируется под ваши процессы и структуру филиалов.',
      confirmedTitle: 'Заявка на демо подтверждена!',
      confirmedMessage:
        'Спасибо! Наш специалист свяжется с вами в течение 15 минут для согласования времени демонстрации.',
      stepContact: 'Контакты',
      stepScale: 'Масштаб центра',
      fullNameLabel: 'Ваше имя и фамилия',
      fullNamePlaceholder: 'Например: Акмаль Умаров',
      phoneLabel: 'Телефон / WhatsApp',
      phonePlaceholder: '+998 90 123 45 67',
      centerNameLabel: 'Название учебного центра',
      centerNamePlaceholder: 'Например: Cambridge Education Hub',
      nextCapacityBtn: 'Далее: Выбрать количество учеников',
      studentsDropdownLabel: 'Количество активных учеников',
      studentsSearchPlaceholder: 'Поиск по количеству...',
      preferredTimeLabel: 'Удобное время для демо-звонка',
      timeOptions: [
        'Утром (9:00 - 12:00)',
        'Днем (12:00 - 17:00)',
        'Вечером (17:00 - 20:00)',
        'В любое время сегодня',
      ],
      backBtn: 'Назад',
      confirmBtn: 'Подтвердить и забронировать демо',
      studentsOptions: [
        {
          value: 'Under 100',
          label: 'До 100 учеников',
          description: 'Небольшой филиал / студия',
          icon: Users,
        },
        {
          value: '100-300',
          label: '100 - 300 учеников',
          description: 'Растущая академия / 1-2 филиала',
          icon: Users,
          badge: 'Популярно',
        },
        {
          value: '300-800',
          label: '300 - 800 учеников',
          description: 'Крупный многофилиальный центр',
          icon: Users,
        },
        {
          value: '800+',
          label: '800+ учеников (Франшиза)',
          description: 'Крупная сеть и франчайзинг',
          icon: Building2,
          badge: 'Enterprise',
        },
      ],
    },
  },
  en: {
    nav: {
      whyUs: 'Why Us',
      modules: 'Modules',
      tour: 'Tour',
      team: 'Team',
      roi: 'ROI',
      pricing: 'Pricing',
      faq: 'FAQ',
      login: 'Log In',
      bookDemo: 'Free Demo',
    },
    team: {
      badge: 'Startup Founders & Leadership',
      heading: 'Meet the Team Behind A.L.I.A',
      subheading:
        'Passionate innovators, engineers, and education leaders building the future of learning center operations.',
      members: [
        {
          id: '1',
          name: 'Nurulloh Islomov',
          role: 'Co-Founder & CEO',
          image: '/Nurulloh.png',
          bio: 'EdTech strategist and entrepreneur with 7+ years scaling software solutions.',
        },
        {
          id: '2',
          name: 'Diyor Khasanov',
          role: 'Co-Founder & CTO',
          image: '/Diyor.png',
          bio: 'Cloud systems architect specializing in high-throughput enterprise security.',
        },
        {
          id: '3',
          name: 'Abdulmajid Sharipov',
          role: 'Head of Product & UX',
          image: '/Abdulmajid.png',
          bio: 'Product designer obsessed with crafting effortless workflows for educators.',
        },
        {
          id: '4',
          name: 'Muhammadali Yoqubjonov',
          role: 'Lead Full-Stack Engineer',
          image:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
          bio: 'Full-stack engineering wizard specialized in React, Next.js & real-time APIs.',
        },
        {
          id: '5',
          name: 'Team Member (Coming Soon)',
          role: 'Head of Customer Success',
          image:
            'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
          bio: 'Dedicated leader ensuring seamless customer onboarding and 24/7 success.',
        },
      ],
    },
    hero: {
      badge: 'Next-Gen Education Management Platform',
      titlePart1: 'Run your',
      titleHighlight: 'learning center',
      titlePart2: 'with 100% clarity & zero loss.',
      description:
        'All-in-one ERP & CRM system built specifically for modern education centers, language academies, and IT schools. Automate sales, attendance, billing, parent SMS, and multi-branch operations.',
      bookDemoBtn: 'Book Free 1-on-1 Demo',
      watchTourBtn: 'Watch Interactive Tour',
      trustTrial: '14-Day Free Trial',
      trustSetup: 'Instant Setup in 15 Mins',
      trustMigration: 'Free Data Migration',
      dashboardTitle: 'alia.app/admin/dashboard',
      liveSystem: 'Live System',
      activeStudents: 'Active Students',
      thisMonth: '↑ +12.4% this mo',
      monthlyTuition: 'Monthly Tuition',
      collected: '98% collected',
      newLeads: 'New Leads CRM',
      readyToEnroll: '32 ready to enroll',
      attendanceToday: 'Attendance Today',
      qrActive: 'QR check-in active',
      revenueChartTitle: 'Revenue & Debtors Overview',
      revenueChartSub: 'June 2024',
      chartCurrent: 'Current',
      liveStreamTitle: 'Live Branch Stream',
      tuitionPaid: 'Tuition Paid ($120)',
      qrCheckin: 'QR Check-In #492',
      newLeadIg: 'New Lead from IG',
      smsBadgeTitle: 'Automated Parent SMS',
      smsBadgeSub: '“Your child entered class at 14:00”',
    },
    stats: {
      partnerHeading: 'Trusted by 350+ Leading Educational Centers & Academies',
      stats: [
        { value: '350+', label: 'Learning Centers', sub: 'Across 12 countries' },
        { value: '180,000+', label: 'Active Students', sub: 'Enrolled & tracked' },
        { value: '$12M+', label: 'Payments Processed', sub: 'Automated billing' },
        { value: '99.9%', label: 'Uptime SLA', sub: 'Enterprise reliability' },
      ],
    },
    comparison: {
      badge: 'Stop Chaos in Excel & Telegram',
      heading: 'Why traditional management tools are costlier than you think',
      subheading:
        'Managing a learning center on paper or disjointed apps causes uncollected debts, lost leads, parent complaints, and administrative burnout.',
      oldWayTitle: 'The Old Way (Excel, Papers & Chat)',
      oldWayTag: 'High Risk & Loss',
      newWayTitle: 'The A.L.I.A Solution',
      newWayTag: '100% Automated',
      items: [
        {
          category: 'Lead & Student Management',
          oldWay: 'Lost leads in Telegram groups and messy Excel sheets with no sales history.',
          newWay:
            'Unified CRM pipeline with automatic lead capture, status tags, and SMS follow-ups.',
        },
        {
          category: 'Attendance & Class Tracking',
          oldWay: 'Paper rosters or delayed manual entries leading to unrecorded absences.',
          newWay: 'Instant QR code scanning & face recognition with automated parent SMS alerts.',
        },
        {
          category: 'Financials & Monthly Tuition',
          oldWay: 'Cash recording mistakes, uncollected debts, and chaotic receipt printing.',
          newWay:
            'Automated billing, online payment gateway integrations, and instant debtor reports.',
        },
        {
          category: 'Teacher Payroll & KPIs',
          oldWay: 'Complex end-of-month manual KPI calculations for variable hourly salaries.',
          newWay:
            'Automated salary calculation based on student retention, hours, and class attendance.',
        },
        {
          category: 'Parent & Student Communication',
          oldWay: 'Scattered phone calls, missed announcements, and untracked student grades.',
          newWay:
            'Dedicated Mobile App & Student/Parent portal for grades, schedules, and payments.',
        },
      ],
    },
    features: {
      badge: 'Complete Functionality',
      heading: 'Everything you need to scale your learning center',
      subheading:
        'Tailored views and tools for Administrators, Sales Managers, Teachers, Students, and Parents.',
      filterLabel: 'Filter Modules by Role',
      requestDemo: 'Request live demo of this module',
      roleFilterOptions: [
        {
          value: 'all',
          label: 'All Modules',
          description: 'Overview of all platform capabilities',
          icon: Filter,
        },
        {
          value: 'admin',
          label: 'Admin & Owners',
          description: 'Multi-branch BI, payroll & billing',
          icon: Building2,
          badge: 'Full Control',
        },
        {
          value: 'sales',
          label: 'CRM & Sales',
          description: 'Leads, pipelines & automated SMS',
          icon: PhoneCall,
          badge: '+35% Leads',
        },
        {
          value: 'teacher',
          label: 'Teachers',
          description: 'QR attendance, class logs & KPIs',
          icon: QrCode,
        },
      ],
      modules: [
        {
          id: 'crm',
          role: 'sales',
          title: 'Lead CRM & Pipeline',
          tagline: 'Convert inquiries into paying students faster',
          description:
            'Track incoming leads from Instagram, Facebook, Website, and Walk-ins. Manage status pipelines, auto-assign managers, and send automated SMS reminders.',
          badge: 'Sales Boost +35%',
          icon: PhoneCall,
          color: 'from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-400',
          highlights: [
            'Multi-channel lead capture',
            'Kanban deal board',
            'Automated SMS & WhatsApp follow-ups',
            'Manager performance stats',
          ],
        },
        {
          id: 'student-mgmt',
          role: 'admin',
          title: 'Student & Course Administration',
          tagline: 'Complete student lifecycle management',
          description:
            'Manage groups, timetables, student profiles, group transfers, course materials, certificates, and academic histories effortlessly.',
          badge: '90% Less Admin Time',
          icon: GraduationCap,
          color: 'from-violet-500/20 to-purple-500/20 border-violet-500/30 text-violet-400',
          highlights: [
            'Group scheduling & capacity limits',
            'Student history & status tracking',
            'Certificate generation',
            'Branch-to-branch transfers',
          ],
        },
        {
          id: 'attendance',
          role: 'teacher',
          title: 'Smart Attendance & QR Check-in',
          tagline: 'Instant check-in with auto Parent notifications',
          description:
            'Teachers or front-desk admins scan student QR passes or use biometric check-in. Parents receive instant notification when students arrive or miss class.',
          badge: 'Zero Attendance Fraud',
          icon: QrCode,
          color: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-400',
          highlights: [
            'Student QR pass generator',
            'Instant automated Parent SMS',
            'Late arrival & sickness tracking',
            'Teacher class logs',
          ],
        },
        {
          id: 'finance',
          role: 'admin',
          title: 'Billing, Debt Control & Payroll',
          tagline: 'Full financial transparency and automated receipts',
          description:
            'Automate monthly tuition billing, handle partial discounts, manage debtor notifications, and calculate teacher salaries based on hourly rates or student count.',
          badge: 'Zero Uncollected Debts',
          icon: CreditCard,
          color: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-400',
          highlights: [
            'Online payment integrations',
            'Automated debt reminders via SMS',
            'Custom discounts & scholarships',
            'Teacher KPI & salary auto-calculation',
          ],
        },
        {
          id: 'lms',
          role: 'student',
          title: 'LMS, Homework & Quiz Platform',
          tagline: 'Engage students beyond the classroom',
          description:
            'Teachers upload homework assignments, video lectures, and quizzes. Students submit work online, view leaderboards, and receive teacher feedback.',
          badge: '2x Student Engagement',
          icon: BookOpen,
          color: 'from-pink-500/20 to-rose-500/20 border-pink-500/30 text-pink-400',
          highlights: [
            'Video lesson storage',
            'Online homework submission & grading',
            'Gamified student rank & coin rewards',
            'Automated quiz scoring',
          ],
        },
        {
          id: 'analytics',
          role: 'admin',
          title: 'Multi-Branch Analytics & BI',
          tagline: 'Real-time executive dashboard for owners',
          description:
            'Monitor key metrics across all branches in real-time. View revenue forecasts, student drop-out rates, marketing ROI, and top-performing teachers.',
          badge: '360° Executive View',
          icon: BarChart3,
          color: 'from-indigo-500/20 to-sky-500/20 border-indigo-500/30 text-indigo-400',
          highlights: [
            'Multi-branch consolidated view',
            'Student retention analytics',
            'Financial cashflow forecasting',
            'Exportable PDF & Excel reports',
          ],
        },
      ],
    },
    tour: {
      badge: 'Interactive Workflow',
      heading: 'Take a closer look inside the platform',
      subheading:
        'Click through the core workflows to experience how A.L.I.A simplifies daily management for learning centers.',
      seeDemoBtn: 'See Full Demo in Action',
      liveInterface: 'Live Interface',
      synced: '100% Synced',
      tabs: [
        {
          id: 'crm',
          label: 'Lead CRM',
          title: 'Turn Enquiries into Enrolled Students',
          desc: 'Visual Kanban pipeline designed specifically for educational centers. Never lose track of prospective students.',
          metrics: [
            { label: 'Conversion Rate', val: '28.4%', trend: '+4.2%' },
            { label: 'New Leads Today', val: '42 leads', trend: 'Active' },
            { label: 'Avg Follow-up', val: '12 mins', trend: '-8 mins' },
          ],
        },
        {
          id: 'attendance',
          label: 'QR Attendance',
          title: 'Contactless Check-In in Seconds',
          desc: 'Students scan their QR badge on a tablet at entrance. Parents instantly receive a notification that their child arrived safely.',
          metrics: [
            { label: 'Check-in Speed', val: '1.2 sec', trend: 'Ultra fast' },
            { label: 'Parent SMS Sent', val: '1,420 today', trend: '100% delivered' },
            { label: 'Unexcused Absences', val: '1.8%', trend: '-65% drop' },
          ],
        },
        {
          id: 'payments',
          label: 'Billing & Debtors',
          title: 'Automated Tuition Collection',
          desc: 'Stop chasing payments. Automatic SMS reminders with payment links let parents pay tuition in two clicks from their phones.',
          metrics: [
            { label: 'On-time Payment', val: '94.2%', trend: '+22%' },
            { label: 'Overdue Debts', val: '$1,200', trend: '-78%' },
            { label: 'Auto Receipts', val: '100%', trend: 'Verified' },
          ],
        },
        {
          id: 'app',
          label: 'Parent Mobile App',
          title: 'Transparency That Builds Trust',
          desc: 'Parents view child attendance history, teacher comments, homework progress, test scores, and account balance anytime.',
          metrics: [
            { label: 'Parent App Usage', val: '89%', trend: 'High engagement' },
            { label: 'Rating on App Store', val: '4.9 ★', trend: 'Top rated' },
            { label: 'Support Inquiries', val: '-40%', trend: 'Fewer calls' },
          ],
        },
      ],
    },
    roi: {
      badge: 'Interactive Savings Estimator',
      heading: 'Calculate how much time & money A.L.I.A will save you',
      subheading:
        'Adjust your center’s numbers to see estimated weekly hours saved on manual admin work, uncollected tuition recovered, and recovered leads.',
      slider1Label: 'Total Active Students',
      slider2Label: 'Number of Branches',
      slider1Unit: 'Students',
      slider2Unit: 'Branches',
      roiTitle: 'Estimated Monthly ROI',
      perMonthSaved: '/ month saved',
      timeSavedLabel: 'Admin Time Saved',
      timeSavedSub: 'Per week in manual work',
      leadsRecoveredLabel: 'Recovered Leads',
      leadsRecoveredSub: 'Via CRM follow-ups',
      auditBtn: 'Start Saving Now — Request Custom Audit',
      benchmarkNote: 'Based on real customer benchmarks across 350+ learning centers.',
    },
    testimonials: {
      badge: 'Proven Results',
      heading: 'Loved by learning center directors & founders',
      subheading:
        'Hear how leaders transformed their educational operations, student retention, and revenue with A.L.I.A.',
      testimonials: [
        {
          quote:
            'A.L.I.A transformed our learning center completely. Before, we lost 30% of incoming leads because managers forgot to call back. Now everything is tracked, and our monthly revenue grew by 45% in 6 months.',
          author: 'Jane Smith',
          role: 'Founder & CEO',
          company: 'Apex Education Center (4 Branches)',
          stats: '+45% Revenue Growth',
          image:
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        },
        {
          quote:
            'The automated QR attendance and instant SMS to parents saved us 2 hours every day at the front desk. Parents love the transparency, and our tuition collection is on time every month.',
          author: 'Elena Smirnova',
          role: 'Academic Director',
          company: 'Bright Minds Language Academy',
          stats: '2 Hours Saved Daily',
          image:
            'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        },
        {
          quote:
            'Managing 6 branches used to be a nightmare with Excel. With A.L.I.A, I can see real-time student count, cash flow, teacher attendance, and sales performance from my smartphone anywhere in the world.',
          author: 'John Doe',
          role: 'General Director',
          company: 'ProTech IT Academy',
          stats: '6 Branches Unified',
          image:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        },
      ],
    },
    pricing: {
      badge: 'Transparent Pricing',
      heading: 'Simple plans for centers of all sizes',
      subheading: 'No hidden setup fees. Upgrade or adjust your branch plan anytime as you grow.',
      monthlyBilling: 'Monthly Billing',
      annualBilling: 'Annual Billing',
      savePercent: 'Save 20%',
      perMonthBranch: '/ month per branch',
      includedFeaturesTitle: 'Included Features:',
      plans: [
        {
          name: 'Starter',
          desc: 'Perfect for single-branch boutique learning centers & private tutoring studios.',
          monthlyPrice: 49,
          annualPrice: 39,
          studentsLimit: 'Up to 200 Students',
          branchesLimit: '1 Branch Included',
          features: [
            'Core Student & Group Management',
            'Lead CRM Kanban Pipeline',
            'QR Code Attendance Scanning',
            'Tuition & Debtor Management',
            'Automated SMS Notifications (Basic)',
            'Teacher Schedule Calendar',
            'Standard Financial Reports',
          ],
          highlight: false,
          cta: 'Start 14-Day Free Trial',
        },
        {
          name: 'Growth Standard',
          desc: 'Designed for growing educational centers wanting maximum automation & mobile app.',
          monthlyPrice: 99,
          annualPrice: 79,
          studentsLimit: 'Up to 700 Students',
          branchesLimit: 'Up to 3 Branches',
          features: [
            'Everything in Starter Plan',
            'Parent & Student Mobile Web Portal',
            'LMS, Online Homework & Quizzes',
            'Automated Teacher Salary & KPI Calculator',
            'Multi-channel CRM Integration (IG, Web)',
            'Advanced Multi-branch Analytics',
            'Dedicated Customer Onboarding Manager',
            'Priority 24/7 Phone & Telegram Support',
          ],
          highlight: true,
          cta: 'Get Started Now',
        },
        {
          name: 'Enterprise / Franchise',
          desc: 'Custom enterprise scale for large academy networks & multi-city franchises.',
          monthlyPrice: 199,
          annualPrice: 159,
          studentsLimit: 'Unlimited Students',
          branchesLimit: 'Unlimited Branches',
          features: [
            'Everything in Growth Plan',
            'Custom White-Label Mobile App on App Store',
            'Custom Payment Gateway Integrations',
            'Custom API & Webhook Access',
            'Franchise Owner Command Center',
            'Dedicated Infrastructure & SLA 99.9%',
            'Custom Feature Engineering on Request',
          ],
          highlight: false,
          cta: 'Contact Sales',
        },
      ],
    },
    faq: {
      badge: 'Got Questions?',
      heading: 'Frequently Asked Questions',
      subheading: 'Everything you need to know about setting up A.L.I.A in your learning center.',
      faqs: [
        {
          q: 'How long does it take to migrate our data from Excel or another system?',
          a: 'Data migration is extremely fast! Our team provides pre-formatted Excel/CSV templates. You can import all your students, groups, teachers, and financial records in under 30 minutes. We also offer free hands-on onboarding support.',
        },
        {
          q: 'Can parents pay tuition online through the system?',
          a: 'Yes! A.L.I.A integrates with popular online payment gateways (Payme, Click, Stripe, PayPal, local bank cards). Parents receive a direct payment link in SMS or inside their Parent Portal.',
        },
        {
          q: 'Does A.L.I.A support multiple branches and franchises?',
          a: 'Absolutely. A.L.I.A was engineered specifically for multi-branch learning centers. Branch managers see only their branch data, while central directors and owners have a unified global dashboard.',
        },
        {
          q: 'How does the QR Code attendance system work?',
          a: 'Each student receives a unique digital QR pass on their phone or printed student ID card. Front desk staff or teachers scan the code using any tablet, smartphone, or webcam. The system instantly marks attendance and sends an SMS to parents.',
        },
        {
          q: 'Is our student and financial data secure?',
          a: 'Security is our top priority. We use SSL encryption in transit, daily database backups, strict role-based access control (RBAC), and SOC2 compliant cloud server infrastructure.',
        },
        {
          q: 'Can I try A.L.I.A before purchasing?',
          a: 'Yes, we offer a 14-day full feature free trial with no credit card required. You can also book a live 1-on-1 demo with our product expert.',
        },
      ],
    },
    cta: {
      heading: 'Ready to transform your learning center operations?',
      subheading:
        'Join 350+ modern education centers today. Get a customized demo and see how A.L.I.A can eliminate chaos and boost your revenue.',
      bookDemoBtn: 'Book Your Live Demo Now',
      freeTrialBtn: 'Start 14-Day Free Trial',
      guaranteeText: 'No credit card required • Instant setup • Cancel anytime',
    },
    footer: {
      brandDesc:
        'The all-in-one ERP & CRM management operating system built for modern learning centers, tutoring hubs, and language academies.',
      security: 'SOC2 Compliant & Bank-Grade Data Encryption',
      modulesTitle: 'Modules',
      solutionsTitle: 'Solutions For',
      solutions: [
        'Language Centers',
        'IT & Coding Academies',
        'IELTS & Test Prep Studios',
        'Multi-Branch Franchises',
        'Kids & STEM Schools',
      ],
      contactTitle: 'Get in Touch',
      contactSub: 'Need help selecting a plan?',
      contactBtn: 'Contact Product Team',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      securityLink: 'Security',
      allRightsReserved: 'All rights reserved.',
    },
    demoModal: {
      personalizedWalkthrough: 'Personalized 1-on-1 Walkthrough',
      title: 'Book a Live Demo for Your Center',
      subtitle: 'See how A.L.I.A fits your learning center’s exact workflow & branch structure.',
      confirmedTitle: 'Demo Request Confirmed!',
      confirmedMessage:
        'Thank you! Our education systems specialist will reach out to you via WhatsApp / Phone within 15 minutes to schedule your walkthrough.',
      stepContact: 'Contact Info',
      stepScale: 'Center Scale',
      fullNameLabel: 'Your Full Name',
      fullNamePlaceholder: 'e.g., Akmal Umarov',
      phoneLabel: 'Phone / WhatsApp Number',
      phonePlaceholder: '+998 90 123 45 67',
      centerNameLabel: 'Learning Center Name',
      centerNamePlaceholder: 'e.g., Cambridge Education Hub',
      nextCapacityBtn: 'Next: Select Student Capacity',
      studentsDropdownLabel: 'Number of Active Students',
      studentsSearchPlaceholder: 'Filter student capacity...',
      preferredTimeLabel: 'Preferred Time for Demo Call',
      timeOptions: [
        'Morning (9:00 - 12:00)',
        'Afternoon (12:00 - 17:00)',
        'Evening (17:00 - 20:00)',
        'Anytime Today',
      ],
      backBtn: 'Back',
      confirmBtn: 'Confirm & Book Demo',
      studentsOptions: [
        {
          value: 'Under 100',
          label: 'Under 100 Students',
          description: 'Boutique single branch / studio',
          icon: Users,
        },
        {
          value: '100-300',
          label: '100 - 300 Students',
          description: 'Growing academy / 1-2 branches',
          icon: Users,
          badge: 'Popular',
        },
        {
          value: '300-800',
          label: '300 - 800 Students',
          description: 'Established multi-branch center',
          icon: Users,
        },
        {
          value: '800+',
          label: '800+ Students (Franchise)',
          description: 'Enterprise network & franchise',
          icon: Building2,
          badge: 'Enterprise',
        },
      ],
    },
  },
}
