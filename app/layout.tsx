import type { Metadata } from 'next';
import { Inter, Outfit, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-display',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://delivery-suez.online'),
  title: {
    default: 'دليفري السويس أونلاين | طيار خاص وتوصيل طلبات 24 ساعة',
    template: '%s | ديليفري السويس أونلاين'
  },
  description: 'منصة ديليفري السويس أونلاين لتوصيل الطلبات والشحن الداخلي وحجز طيار خاص في السويس. خدمة فورية 24 ساعة لتوصيل المطاعم، الصيدليات، والمشاوير لجميع الأحياء (السلام، الأربعين، فيصل، بورتوفيق).',
  keywords: [
    'دليفري السويس',
    'ديليفري السويس',
    'طيار خاص السويس',
    'توصيل طلبات السويس',
    'شحن داخلي السويس',
    'مندوب توصيل السويس',
    'رقم دليفري السويس',
    'دليفري السلام السويس',
    'دليفري الاربعين السويس',
    'دليفري فيصل السويس',
    'طيار دليفري باليومية',
    'توصيل اوردرات السويس',
    'شركة شحن بالسويس',
    'أسرع دليفري في السويس',
    'توصيل صيدليات السويس',
    'مكاتب شحن السويس',
    'طيار فري لانس السويس',
    'توصيل السويس 24 ساعة',
    'Delivery Suez Online',
    'Suez Delivery'
  ].join(', '),
  alternates: {
    canonical: 'https://delivery-suez.online',
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
  openGraph: {
    title: 'دليفري السويس أونلاين | أسرع خدمة توصيل وشحن داخلي في مدينة السويس',
    description: 'احجز طيار خاص أو اطلب توصيل فوري لمقاضيك المنزلية والطبية في السويس طوال 24 ساعة.',
    url: 'https://delivery-suez.online',
    siteName: 'دليفري السويس أونلاين',
    locale: 'ar_EG',
    type: 'website',
    images: [
      {
        url: 'https://picsum.photos/seed/suez-seo/1200/630',
        width: 1200,
        height: 630,
        alt: 'بوابة التوصيل الرسمية بالسويس',
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'دليفري السويس أونلاين | طيار خاص وتوصيل طلبات السويس',
    description: 'المنصة المتكاملة للتوصيل والخدمات اللوجستية والشحن الداخلي في السويس بكافة أحيائها.',
    images: ['https://picsum.photos/seed/suez-seo/1200/630'],
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Delivery Suez Online",
    "alternateName": "دليفري السويس أونلاين",
    "description": "أسرع وأسهل نظام توصيل في مدينة السويس وكل أحيائها. خدمات دليفري للمطاعم والصيدليات والسوبر ماركت والمشاوير الخاصة.",
    "url": "https://delivery-suez.online",
    "telephone": "+201022679250",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "السلام 1",
      "addressLocality": "السويس",
      "addressRegion": "السويس",
      "addressCountry": "EG"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 29.9667,
      "longitude": 32.5333
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "sameAs": [
      "https://www.facebook.com/delivery.suez",
      "https://www.instagram.com/delivery.suez"
    ]
  };

  return (
    <html lang="ar" dir="rtl" className={`${inter.variable} ${outfit.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
      <body suppressHydrationWarning className="bg-white text-slate-900 font-sans">
        {children}
      </body>
    </html>
  );
}
