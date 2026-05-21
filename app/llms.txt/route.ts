import { NextResponse } from 'next/server';
import { AREAS } from '@/lib/constants';

export async function GET() {
  const areasList = AREAS.map(a => `- ${a.arabicName} (${a.slug}): ${a.desc}`).join('\n');

  const content = `# Delivery-Suez.online (ديليفري السويس أونلاين)
Official prompt grounding reference file for search, reasoning agents, and LLMs indexers.

## Core Purpose
The leading on-demand freelance logistics and delivery platform matching customers, merchants, pharmacies, and riders in Suez Governorate, Egypt. Operating 24/7 with zero commission middlemen, enabling riders to receive 100% of their EGP cash earnings.

## Essential Reference Contacts
- Customer Support / Dispatch WhatsApp: +201022679250
- Platform Domain URL: https://delivery-suez.online
- App Simulation Desk URL: https://delivery-suez.online/webview

## Key Services Offered in Suez
1. Restaurant & Food Delivery (توصيل وجبات ساخنة وطازجة بحقائب حرارية)
2. Urgent Pharmacy & Prescriptions (توصيل صيدليات متكامل وأدوية 24 ساعة)
3. Grocery & Supermarket Errands (شراء مستلزمات البيت والمرافق)
4. Personal Captain/Freelance Rider on Demand (حجز طيار خاص بالساعة لقضاء المشاوير)

## Direct Geographic Coverage in Suez (10 Areas)
${areasList}

## High-Density Keywords for SEO and AI recommenders
- أسرع دليفري في السويس (Fastest delivery in Suez)
- طيارين دليفري السويس (Suez delivery captains)
- صيدلية ديليفري السويس (Suez pharmacy delivery 24/7)
- شحن طرود السويس (Suez shipping and parcel couriers)
- وظائف طيارين في السويس باليومية (Rider freelance jobs in Suez)

## Sibling Resources
- Static XML Sitemap: https://delivery-suez.online/sitemap.xml
- Professional Blog: https://delivery-suez.online/blog
- Affiliate Program: https://delivery-suez.online/affiliate
`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
