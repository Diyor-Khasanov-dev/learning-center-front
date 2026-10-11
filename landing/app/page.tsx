import { DemoModalProvider } from '@/context/DemoModalContext'
import { Navbar } from '@/components/landing/Navbar'
import { HeroSection } from '@/components/landing/HeroSection'
import { StatsSection } from '@/components/landing/StatsSection'
import { ComparisonSection } from '@/components/landing/ComparisonSection'
import { FeatureModulesSection } from '@/components/landing/FeatureModulesSection'
import { PlatformTourSection } from '@/components/landing/PlatformTourSection'
import { RoiCalculatorSection } from '@/components/landing/RoiCalculatorSection'
import { TeamSection } from '@/components/landing/TeamSection'
import { TestimonialsSection } from '@/components/landing/TestimonialsSection'
import { PricingSection } from '@/components/landing/PricingSection'
import { FaqSection } from '@/components/landing/FaqSection'
import { CtaSection } from '@/components/landing/CtaSection'
import { Footer } from '@/components/landing/Footer'
import { DemoModal } from '@/components/landing/DemoModal'

export default function Home() {
  const jsonLdSoftwareApp = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'A.L.I.A - Academic Lead & Intelligence Assistant',
    operatingSystem: 'All (Web, iOS, Android)',
    applicationCategory: 'EducationalApplication',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '350',
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: '39',
      highPrice: '199',
      offerCount: '3',
    },
    description:
      "O'quv markazlari, til akademiyalari va IT maktablar uchun #1 ERP va CRM boshqaruv tizimi. CRM для учебных центров, языковых школ и IT академий.",
    url: 'https://alia.app',
  }

  const jsonLdOrganization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'A.L.I.A',
    url: 'https://alia.app',
    logo: 'https://alia.app/favicon.ico',
    description: 'Yangi avlod ta\'lim markazini boshqarish platformasi. All-in-one ERP & CRM for learning centers.',
    sameAs: [
      'https://t.me/alia_app',
      'https://instagram.com/alia_app',
    ],
  }

  const jsonLdFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: "Ma'lumotlarni Excel yoki boshqa tizimdan ko'chirish qancha vaqt oladi?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Ma'lumotlarni ko'chirish 30 daqiqadan kamroq vaqt oladi! Tayyor Excel shablonlari orqali barcha o'quvchilar va guruhlarni bepul ko'chirish mumkin.",
        },
      },
      {
        '@type': 'Question',
        name: "Ota-onalar to'lovlarni tizim orqali onlayn amalga oshirishlari mumkinmi?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Ha, A.L.I.A Payme, Click va bank kartalari bilan integratsiyalashgan. Ota-onalar SMS orqali to'lov havolasini oladilar.",
        },
      },
      {
        '@type': 'Question',
        name: 'QR kodli davomat tizimi qanday ishlaydi?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Har bir o'quvchi unikal QR kod oladi. Resepshn yoki o'qituvchi skanerlaganda ota-onaga avtomatik SMS boradi.",
        },
      },
    ],
  }

  return (
    <DemoModalProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSoftwareApp) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />
      <div className='min-h-screen bg-white dark:bg-black text-neutral-900 dark:text-neutral-100 font-sans selection:bg-blue-600 selection:text-white relative overflow-x-hidden transition-colors duration-200'>
        <Navbar />
        <main>
          <HeroSection />
          <StatsSection />
          <ComparisonSection />
          <FeatureModulesSection />
          <PlatformTourSection />
          <TeamSection />
          <RoiCalculatorSection />
          <TestimonialsSection />
          <PricingSection />
          <FaqSection />
          <CtaSection />
        </main>
        <Footer />
        <DemoModal />
      </div>
    </DemoModalProvider>
  )
}
