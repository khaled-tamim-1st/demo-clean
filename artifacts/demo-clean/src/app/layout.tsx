import type { Metadata } from 'next';
import { IBM_Plex_Sans_Arabic } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingCta from '@/components/FloatingCta';
import JsonLd from '@/components/JsonLd';
import AiAnalyticsTracker from '@/components/AiAnalyticsTracker';

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-ibm-plex',
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://democlean-kuwait.com'),
  title: {
    default: 'ديمو كلين | شركة تنظيف وإبادة حشرات وقوارض في الكويت - خدمة 24 ساعة',
    template: '%s | ديمو كلين الكويت',
  },
  description: 'شركة ديمو كلين للتنظيف وإبادة الحشرات والقوارض في جميع محافظات الكويت. خدمات تنظيف منازل وفلل، غسيل كنب وسجاد بالبخار، تنظيف بعد التشطيب، ومكافحة الصراصير وبق الفراش والنمل بمعدات إيطالية ومبيدات معتمدة من وزارة الصحة.',
  keywords: [
    'شركة تنظيف الكويت',
    'ديمو كلين للتنظيف ومكافحة الحشرات',
    'تنظيف منازل الكويت',
    'غسيل كنب وسجاد الكويت',
    'تنظيف بعد التشطيب الكويت',
    'مكافحة حشرات الكويت',
    'رش حشرات الكويت',
    'مكافحة بق الفراش الكويت',
    'رش صراصير الكويت',
    'مكافحة النمل الابيض',
    'مكافحة القوارض بالكويت',
  ],
  authors: [{ name: 'ديمو كلين الكويت' }],
  creator: 'ديمو كلين',
  publisher: 'ديمو كلين',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    locale: 'ar_KW',
    url: 'https://democlean-kuwait.com',
    siteName: 'ديمو كلين لمكافحة الحشرات والقوارض بالكويت',
    title: 'ديمو كلين | شركة مكافحة حشرات وقوارض في الكويت بالضمان',
    description: 'أفضل خدمات مكافحة الآفات والقوارض في الكويت، تغطية شاملة للمحافظات الست بأساليب بيئية آمنة وضمان معتمد.',
    images: [
      {
        url: 'https://democlean-kuwait.com/og-image.jpg',
        width: 1200,
        height: 630,
        type: 'image/jpeg',
        alt: 'ديمو كلين - مكافحة الحشرات والقوارض في الكويت',
      },
      {
        url: 'https://democlean-kuwait.com/og-image.webp',
        width: 1200,
        height: 630,
        type: 'image/webp',
        alt: 'ديمو كلين - مكافحة الحشرات والقوارض في الكويت',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ديمو كلين | شركة مكافحة حشرات وقوارض في الكويت',
    description: 'خدمة احترافية على مدار 24 ساعة في جميع مناطق الكويت مع الضمان والمتابعة المجانية.',
    images: ['https://democlean-kuwait.com/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'PestControl',
  '@id': 'https://democlean-kuwait.com/#organization',
  name: 'ديمو كلين',
  alternateName: 'Demo Clean',
  url: 'https://democlean-kuwait.com',
  logo: 'https://democlean-kuwait.com/logo.webp',
  image: 'https://democlean-kuwait.com/demo-clean-identity.webp',
  telephone: '+96567088755',
  priceRange: 'KWD 20 - KWD 150',
  currenciesAccepted: 'KWD',
  paymentAccepted: 'Cash, K-Net, Credit Card',
  license: '14620/2025',
  description: 'شركة ديمو كلين (Demo Clean) - ترخيص رقم 14620/2025 وسجل تجاري 532627. متخصصة في خدمات التنظيف الشامل، تنظيف الفلل والمنازل، غسيل الكنب والسجاد بالبخار، ومكافحة الحشرات، الصراصير، بق الفراش، النمل الأبيض، القوارض، والتعقيم في الكويت 24 ساعة.',
  knowsAbout: [
    'تنظيف المنازل والفلل الشامل وجلي الرخام',
    'غسيل الكنب والسجاد والمفروشات بالبخار والتجفيف السريع',
    'تنظيف المباني بعد التشطيب والبناء وإزالة بقع الصبغ والإسمنت',
    'تنظيف المنشآت التجارية وهود ومداخن المطابخ والواجهات',
    'مكافحة الحشرات والقوارض والآفات',
    'علاج بق الفراش بالحرارة 180°C والتبخير',
    'إبادة الصراصير بجل أدفايون الأمريكي وبوسيدون',
    'حقن النمل الأبيض والأرضة بالتثقيب الدقيق',
    'التعقيم والتطهير البيئي بالضباب البارد ULV',
    'مكافحة الفئران بطعوم الجفاف وسد المنافذ'
  ],
  sameAs: [
    'https://twitter.com/democleankw',
    'https://instagram.com/democleankw',
    'https://www.facebook.com/democleankw'
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'مدينة الكويت',
    addressRegion: 'العاصمة',
    addressCountry: 'KW',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 29.3759,
    longitude: 47.9774,
  },
  areaServed: [
    { '@type': 'AdministrativeArea', name: 'محافظة العاصمة' },
    { '@type': 'AdministrativeArea', name: 'محافظة حولي' },
    { '@type': 'AdministrativeArea', name: 'محافظة الفروانية' },
    { '@type': 'AdministrativeArea', name: 'محافظة مبارك الكبير' },
    { '@type': 'AdministrativeArea', name: 'محافظة الأحمدي' },
    { '@type': 'AdministrativeArea', name: 'محافظة الجهراء' },
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
    },
  ],
};

const webSiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://democlean-kuwait.com/#website',
  url: 'https://democlean-kuwait.com',
  name: 'ديمو كلين',
  publisher: {
    '@id': 'https://democlean-kuwait.com/#organization',
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://democlean-kuwait.com/search?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" id="top" className={ibmPlexSansArabic.variable}>
      <head>
        <link rel="icon" type="image/png" href="/favicon.png?v=3" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg?v=3" />
        <link rel="shortcut icon" href="/favicon.ico?v=3" />
        <link rel="apple-touch-icon" href="/favicon.png?v=3" />
      </head>
      <body className={ibmPlexSansArabic.className}>
        <AiAnalyticsTracker />
        <JsonLd data={localBusinessSchema} />
        <JsonLd data={webSiteSchema} />
        <div className="site-shell">
          <Header />
          <main className="site-content">{children}</main>
          <Footer />
          <FloatingCta />
        </div>
      </body>
    </html>
  );
}
