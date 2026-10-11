import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadataBase = new URL(
  process.env.NEXT_PUBLIC_APP_URL || "https://alia.app"
);

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#07080e" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: "A.L.I.A - Academic Lead & Intelligence Assistant | Ta'lim ERP va CRM",
    template: "%s | A.L.I.A",
  },
  description:
    "A.L.I.A (Academic Lead & Intelligence Assistant) — O'quv markazlari, til akademiyalari va IT maktablar uchun #1 ERP va CRM boshqaruv tizimi. Sotuvlar CRM, QR davomat, oylik to'lovlar, avto-SMS va ko'p filialli analitika. CRM для учебных центров, языковых школ и IT академий.",
  keywords: [
    // Uzbek keywords
    "alia",
    "alia app",
    "academic lead intelligence assistant",
    "o'quv markaz dasturi",
    "ta'lim markazini boshqarish",
    "o'quv markaz CRM",
    "o'quv markaz ERP",
    "modme muqobili",
    "o'quv markazi avtomatlashtirish",
    "talabalar davomati",
    "QR davomat",
    "o'qituvchilar maoshi hisobi",
    "o'quv markaz to'lovlari",
    "kurslar uchun CRM",
    "til markazi dasturi",
    "IT akademiya dasturi",
    "avto SMS ota-onalarga",
    "filiallar boshqaruvi",
    "ta'lim tizimi",
    // Russian keywords
    "CRM для учебного центра",
    "ERP для школ",
    "автоматизация учебных центров",
    "программа для языковой школы",
    "учет студентов",
    "учет посещаемости QR",
    "система управления курсами",
    "CRM для IT академии",
    "расписание уроков",
    "расчет зарплаты преподавателей",
    "CRM для детских центров",
    "CRM Uzbekistan",
    "CRM Tashkent",
    // English keywords
    "A.L.I.A",
    "Academic Lead & Intelligence Assistant",
    "learning center management software",
    "education ERP",
    "education CRM",
    "language school software",
    "tutoring center management",
    "student attendance software",
    "school billing system",
    "multi branch education platform",
    "alia app",
  ],
  authors: [{ name: "A.L.I.A Team", url: "https://alia.app" }],
  creator: "A.L.I.A",
  publisher: "A.L.I.A Inc.",
  category: "Education & Business Management Software",
  applicationName: "A.L.I.A",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: "/",
    languages: {
      "uz-UZ": "/?lang=uz",
      "ru-RU": "/?lang=ru",
      "en-US": "/?lang=en",
    },
  },
  openGraph: {
    title: "A.L.I.A - Academic Lead & Intelligence Assistant | Ta'lim ERP va CRM",
    description:
      "O'quv markazlari, til akademiyalari va IT maktablar uchun 1-raqamli ERP va CRM platformasi. Sotuvlar, QR davomat, avto-SMS, to'lovlar va filiallar tahlili.",
    url: "https://alia.app",
    siteName: "A.L.I.A",
    locale: "uz_UZ",
    alternateLocale: ["ru_RU", "en_US"],
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=630&auto=format&fit=crop&q=80",
        width: 1200,
        height: 630,
        alt: "A.L.I.A - Academic Lead & Intelligence Assistant — Ta'lim markazlarini boshqarish platformasi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "A.L.I.A - Academic Lead & Intelligence Assistant",
    description:
      "O'quv markazlari uchun eng ilg'or ERP va CRM platformasi. Sotuvlar, davomat, to'lovlar va filiallar boshqaruvi.",
    images: [
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=630&auto=format&fit=crop&q=80",
    ],
    creator: "@alia_app",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="uz"
      className="h-full antialiased dark"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 dark:bg-[#07080e] dark:text-slate-100 transition-colors duration-200">
        <LanguageProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
