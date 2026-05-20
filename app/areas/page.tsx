import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { MapPin, ChevronLeft, Truck, Clock, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { AREAS } from '@/lib/constants';
import SafeImage from '@/components/SafeImage';

export const metadata = {
  title: 'كل مناطق وأحياء السويس | دليفري السويس أونلاين',
  description: 'نغطي كافة أحياء السويس: السلام، الأربعين، فيصل، عتاقة، الجناين، وغيرها. اطلب دليفري في منطقتك الآن.',
};

export default function AreasPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-7xl font-display font-black text-slate-900 mb-8 italic tracking-tighter">أين نصل؟</h1>
            <p className="text-slate-500 text-xl max-w-3xl mx-auto leading-relaxed">
              نحن نخدم مدينة السويس بالكامل. أينما كنت في السويس، طيارونا جاهزون لتلبية طلباتك في دقائق معدودة.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {AREAS.map((area, i) => (
              <Link href={`/area/${area.slug}`} key={i} className="group">
                <div className="relative overflow-hidden rounded-[2.5rem] aspect-[4/5] bg-slate-100 shadow-xl shadow-slate-200/50">
                  <SafeImage 
                    src={`/images/areas/${area.slug}.jpg`} 
                    fallbackSrc={`https://picsum.photos/seed/${area.slug}/500/650`}
                    alt={area.name}
                    fill
                    referrerPolicy="no-referrer"
                    className="object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/10 to-transparent" />
                  <div className="absolute bottom-8 right-8 text-white text-right">
                    <p className="text-xs font-bold text-brand uppercase tracking-widest mb-2 opacity-80">{area.nameEn}</p>
                    <h3 className="text-3xl font-display font-black mb-3 italic tracking-tight">{area.name}</h3>
                    <div className="flex items-center gap-2 text-brand font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>عرض التغطية</span>
                      <ChevronLeft size={16} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-32 p-12 md:p-20 bg-slate-50 rounded-[4rem] border border-slate-100 flex flex-col lg:flex-row items-center gap-16 relative overflow-hidden">
            <div className="flex-1 text-right relative z-10">
              <h2 className="text-4xl font-display font-black mb-8 italic">هل منطقتك غير موجودة؟</h2>
              <p className="text-slate-500 text-lg mb-10 leading-relaxed font-medium">
                نحن نتوسع باستمرار في السويس. إذا كنت تعيش في منطقة جديدة أو غير مدرجة، تواصل معنا وسنحاول توفير الخدمة لك في أقرب فرصة.
              </p>
              <Link href="/support" className="inline-flex px-10 py-4 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:bg-brand transition-all">
                طلب تغطية جديدة
              </Link>
            </div>
            <div className="flex-1 w-full max-w-md relative z-10">
              <div className="bg-white p-8 rounded-[3rem] shadow-2xl relative">
                <div className="flex items-center gap-4 mb-8 flex-row-reverse text-right">
                  <div className="w-12 h-12 bg-brand/10 text-brand rounded-2xl flex items-center justify-center">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl">خريطة السويس</h4>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">تغطية ذكية 100%</p>
                  </div>
                </div>
                <div className="aspect-video bg-slate-100 rounded-3xl overflow-hidden relative grayscale opacity-50">
                  <SafeImage 
                    src="/images/map-placeholder.jpg" 
                    fallbackSrc="https://picsum.photos/seed/map/600/400"
                    alt="Map"
                    fill
                    referrerPolicy="no-referrer"
                    className="object-cover" 
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-2xl">
                      <div className="w-4 h-4 bg-brand rounded-full animate-ping" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Background design */}
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-brand/5 rounded-full blur-3xl" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
