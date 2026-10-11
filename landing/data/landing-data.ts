import {
  GraduationCap,
  CreditCard,
  QrCode,
  Building2,
  BookOpen,
  PhoneCall,
  BarChart3,
  Filter,
  Users
} from 'lucide-react'
import { DropdownOption } from '@/components/ui/Dropdown'
import {
  RoleFilter,
  StatItem,
  OldVsNewItem,
  FeatureModule,
  TourTab,
  Testimonial,
  PricingPlan,
  FaqItem
} from '@/types/landing'

export const STATS_DATA: StatItem[] = [
  { value: '350+', label: 'Learning Centers', sub: 'Across 12 countries' },
  { value: '180,000+', label: 'Active Students', sub: 'Enrolled & tracked' },
  { value: '$12M+', label: 'Payments Processed', sub: 'Automated billing' },
  { value: '99.9%', label: 'Uptime SLA', sub: 'Enterprise reliability' },
]

export const PARTNER_LOGOS: string[] = [
  'Cambridge Academy',
  'InterNation Education',
  'Apex Learning Hub',
  'ProData Tech School',
  'Language Excellence',
  'Grand Master Chess',
  'Nova STEM Academy',
]

export const OLD_VS_NEW: OldVsNewItem[] = [
  {
    category: 'Lead & Student Management',
    oldWay: 'Lost leads in Telegram groups and messy Excel sheets with no sales history.',
    newWay: 'Unified CRM pipeline with automatic lead capture, status tags, and SMS follow-ups.',
  },
  {
    category: 'Attendance & Class Tracking',
    oldWay: 'Paper rosters or delayed manual entries leading to unrecorded absences.',
    newWay: 'Instant QR code scanning & face recognition with automated parent SMS alerts.',
  },
  {
    category: 'Financials & Monthly Tuition',
    oldWay: 'Cash recording mistakes, uncollected debts, and chaotic receipt printing.',
    newWay: 'Automated billing, online payment gateway integrations, and instant debtor reports.',
  },
  {
    category: 'Teacher Payroll & KPIs',
    oldWay: 'Complex end-of-month manual KPI calculations for variable hourly salaries.',
    newWay: 'Automated salary calculation based on student retention, hours, and class attendance.',
  },
  {
    category: 'Parent & Student Communication',
    oldWay: 'Scattered phone calls, missed announcements, and untracked student grades.',
    newWay: 'Dedicated Mobile App & Student/Parent portal for grades, schedules, and payments.',
  },
]

export const FEATURE_MODULES: FeatureModule[] = [
  {
    id: 'crm',
    role: 'sales',
    title: 'Lead CRM & Pipeline',
    tagline: 'Convert inquiries into paying students faster',
    description: 'Track incoming leads from Instagram, Facebook, Website, and Walk-ins. Manage status pipelines, auto-assign managers, and send automated SMS reminders.',
    badge: 'Sales Boost +35%',
    icon: PhoneCall,
    color: 'from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-400',
    highlights: ['Multi-channel lead capture', 'Kanban deal board', 'Automated SMS & WhatsApp follow-ups', 'Manager performance stats'],
  },
  {
    id: 'student-mgmt',
    role: 'admin',
    title: 'Student & Course Administration',
    tagline: 'Complete student lifecycle management',
    description: 'Manage groups, timetables, student profiles, group transfers, course materials, certificates, and academic histories effortlessly.',
    badge: '90% Less Admin Time',
    icon: GraduationCap,
    color: 'from-violet-500/20 to-purple-500/20 border-violet-500/30 text-violet-400',
    highlights: ['Group scheduling & capacity limits', 'Student history & status tracking', 'Certificate generation', 'Branch-to-branch transfers'],
  },
  {
    id: 'attendance',
    role: 'teacher',
    title: 'Smart Attendance & QR Check-in',
    tagline: 'Instant check-in with auto Parent notifications',
    description: 'Teachers or front-desk admins scan student QR passes or use biometric check-in. Parents receive instant notification when students arrive or miss class.',
    badge: 'Zero Attendance Fraud',
    icon: QrCode,
    color: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-400',
    highlights: ['Student QR pass generator', 'Instant automated Parent SMS', 'Late arrival & sickness tracking', 'Teacher class logs'],
  },
  {
    id: 'finance',
    role: 'admin',
    title: 'Billing, Debt Control & Payroll',
    tagline: 'Full financial transparency and automated receipts',
    description: 'Automate monthly tuition billing, handle partial discounts, manage debtor notifications, and calculate teacher salaries based on hourly rates or student count.',
    badge: 'Zero Uncollected Debts',
    icon: CreditCard,
    color: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-400',
    highlights: ['Online payment integrations', 'Automated debt reminders via SMS', 'Custom discounts & scholarships', 'Teacher KPI & salary auto-calculation'],
  },
  {
    id: 'lms',
    role: 'student',
    title: 'LMS, Homework & Quiz Platform',
    tagline: 'Engage students beyond the classroom',
    description: 'Teachers upload homework assignments, video lectures, and quizzes. Students submit work online, view leaderboards, and receive teacher feedback.',
    badge: '2x Student Engagement',
    icon: BookOpen,
    color: 'from-pink-500/20 to-rose-500/20 border-pink-500/30 text-pink-400',
    highlights: ['Video lesson storage', 'Online homework submission & grading', 'Gamified student rank & coin rewards', 'Automated quiz scoring'],
  },
  {
    id: 'analytics',
    role: 'admin',
    title: 'Multi-Branch Analytics & BI',
    tagline: 'Real-time executive dashboard for owners',
    description: 'Monitor key metrics across all branches in real-time. View revenue forecasts, student drop-out rates, marketing ROI, and top-performing teachers.',
    badge: '360° Executive View',
    icon: BarChart3,
    color: 'from-indigo-500/20 to-sky-500/20 border-indigo-500/30 text-indigo-400',
    highlights: ['Multi-branch consolidated view', 'Student retention analytics', 'Financial cashflow forecasting', 'Exportable PDF & Excel reports'],
  },
]

export const TOUR_TABS: TourTab[] = [
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
]

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'A.L.I.A system transformed our learning center completely. Before, we lost 30% of incoming leads because managers forgot to call back. Now everything is tracked, and our monthly revenue grew by 45% in 6 months.',
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
]

export const PRICING_PLANS: PricingPlan[] = [
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
]

export const FAQS: FaqItem[] = [
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
]

export const ROLE_FILTER_OPTIONS: DropdownOption<RoleFilter>[] = [
  { value: 'all', label: 'All Modules', description: 'Overview of all platform capabilities', icon: Filter },
  { value: 'admin', label: 'Admin & Owners', description: 'Multi-branch BI, payroll & billing', icon: Building2, badge: 'Full Control' },
  { value: 'sales', label: 'CRM & Sales', description: 'Leads, pipelines & automated SMS', icon: PhoneCall, badge: '+35% Leads' },
  { value: 'teacher', label: 'Teachers', description: 'QR attendance, class logs & KPIs', icon: QrCode },
]

export const STUDENT_COUNT_OPTIONS: DropdownOption<string>[] = [
  { value: 'Under 100', label: 'Under 100 Students', description: 'Boutique single branch / studio', icon: Users },
  { value: '100-300', label: '100 - 300 Students', description: 'Growing academy / 1-2 branches', icon: Users, badge: 'Popular' },
  { value: '300-800', label: '300 - 800 Students', description: 'Established multi-branch center', icon: Users },
  { value: '800+', label: '800+ Students (Franchise)', description: 'Enterprise network & franchise', icon: Building2, badge: 'Enterprise' },
]
