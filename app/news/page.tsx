import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import SafeImage from '@/components/SafeImage';
import { NEWS_ITEMS } from '@/lib/constants';
import { Megaphone, ChevronLeft, Calendar, BadgeInfo } from 'lucide-react';

export const metadata = {
  title: 'أخبار ديليفري السويس | تغطية وعروض حصرية',
  description: 'آخر الأخبار المتعلقة بخدماتنا في السويس، افتتاح مناطق جديدة، وعروض خاصة لطيارينا وعملائنا.',
};

export default function NewsPage() {
  const localNewsFallbacks: Record<string, string> = {
    '1': '/images/suez_hero_delivery.png',
    '2': '/images/suez_courier.png',
    '3': '/images/suez_port_captain.png'
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-brand/10 text-brand rounded-full mb-8">
              <Megaphone size={40} />
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-black text-slate-900 mb-8 italic tracking-tighter">أخبار <span className="text-brand">الخدمة</span></h1>
            <p className="text-slate-500 text-xl max-w-2xl mx-auto leading-relaxed">
              ابقَ على اطلاع دائم بكل ما هو جديد في عالم التوصيل بمدينة السويس.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {NEWS_ITEMS.map((item, i) => (
              <Link href={`/news/${item.id}`} key={i} className="group">
                <div className="bg-slate-50 p-8 md:p-12 rounded-[3.5rem] border border-slate-200 flex flex-col md:flex-row-reverse items-center gap-10 hover:bg-white hover:shadow-2xl hover:border-brand/20 transition-all text-right">
                  <div className="w-full md:w-64 aspect-square relative rounded-[2.5rem] overflow-hidden shrink-0">
                    <SafeImage 
                      src={`/images/news/news-${item.id}.jpg`} 
                      fallbackSrc={localNewsFallbacks[item.id] || '/images/suez_hero_delivery.png'}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-4 text-xs font-bold text-brand uppercase tracking-widest mb-4 flex-row-reverse">
                      <span className="px-3 py-1 bg-brand/10 rounded-full">{item.category}</span>
                      <div className="flex items-center gap-1 text-slate-400">
                        <Calendar size={14} />
                        <span>{item.date}</span>
                      </div>
                    </div>
                    <h3 className="text-3xl font-display font-bold text-slate-900 mb-6 group-hover:text-brand transition-colors leading-tight">{item.title}</h3>
                    <p className="text-slate-500 text-lg leading-relaxed mb-8 max-w-3xl">
                      نعلن بكل فخر عن {item.title}. هدفنا دائماً هو تقديم أفضل تجربة توصيل لأهالي السويس الكرام، وهذا الخبر يأتي كجزء من خطتنا لتطوير المنصة بشكل كامل.
                    </p>
                    <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                      <ChevronLeft size={16} />
                      <span>اقرأ التفاصيل</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-24 text-center">
            <div className="inline-flex flex-col items-center gap-6 p-12 bg-slate-50 rounded-[4rem] border border-slate-200 w-full">
              <BadgeInfo size={40} className="text-brand" />
              <h2 className="text-3xl font-display font-bold italic">هل لديك خبر أو اقتراح؟</h2>
              <p className="text-slate-500 max-w-xl mx-auto">نحن نستمع دائماً لعملائنا في السويس. إذا كان لديك أي اقتراح لتطوير الخدمة أو إضافة منطقة جديدة، شاركنا الآن.</p>
              <Link href="/support" className="px-10 py-4 bg-brand text-white rounded-2xl font-bold shadow-lg shadow-brand/20 hover:scale-105 transition-all">تواصل معنا</Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
