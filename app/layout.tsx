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
  title: 'Delivery Suez Online | دليفري السويس أونلاين',
  description: 'المنصة الرسمية والشاملة لخدمات التوصيل والدليفري في مدينة السويس. تغطية كاملة لجميع المناطق، دعم فني، وتطبيق متكامل للعملاء والطيارين.',
  keywords: 'دليفري السويس, توصيل السويس, طيار السويس, مندوب توصيل السويس, أسرع دليفري في السويس, توصيل طلبات السلام 1, توصيل مطاعم السويس',
  openGraph: {
    title: 'Delivery Suez Online | بوابة السويس للتوصيل',
    description: 'أسرع وأسهل نظام توصيل في مدينة السويس وكل أحيائها.',
    url: 'https://delivery-suez.online',
    siteName: 'Delivery Suez',
    locale: 'ar_EG',
    type: 'website',
  },
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
