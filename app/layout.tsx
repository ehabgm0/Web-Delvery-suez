import React from 'react';
import type { Metadata } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'ديليفري السويس أونلاين | أسرع خدمة توصيل طرود ومأكولات طوال 24 ساعة',
  description: 'منصة الدليفري اللوجستية الأحدث والأسرع في مدينة السويس لتوصيل أوردرات المطاعم، صيدليات السويس، السوبر ماركت وشاشات التتبع اللوجستي المباشر بالكباتن.',
  keywords: 'دليفري السويس, توصيل السويس, صيدلية السويس دليفري, طيارين السويس, شحن السويس, طلبات السويس',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased selection:bg-brand selection:text-white">
        {children}
      </body>
    </html>
  );
}
