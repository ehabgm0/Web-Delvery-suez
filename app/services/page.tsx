import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Truck, ChevronLeft, ShieldCheck, Clock, Star, Zap, PhoneCall } from 'lucide-react';
import Link from 'next/link';
import { SERVICES } from '@/lib/constants';

export const metadata = {
  title: 'خدمات التوصيل والدليفري في السويس | Delivery Suez Online',
  description: 'اكتشف خدماتنا المتكاملة: توصيل مطاعم، صيدليات، سوبر ماركت، شحن داخلي، ومشاوير خاصة في السويس.',
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-right">
          <div className="max-w-3xl mb-20 mr-0">
            <h1 className="text-5xl md:text-7xl font-display font-black text-slate-900 mb-8 italic tracking-tight leading-none">
              خدمات <br />
              <span className="text-brand">احترافية</span> للسويس.
            </h1>
            <p className="text-slate-500 text-xl leading-relaxed font-medium">
              نحن لسنا مجرد تطبيق توصيل، نحن رفيقك اليومي الذي يسهل عليك مهامك في السويس. اختر الخدمة التي تحتاجها ودع الباقي علينا.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
            {SERVICES.map((service, i) => (
              <Link href={`/service/${service.slug}`} key={i} className="group">
                <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm hover:shadow-2xl hover:-translate-y-3 transition-all h-full relative overflow-hidden flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-brand/5 text-brand rounded-2xl flex items-center justify-center mb-10 group-hover:bg-brand group-hover:text-white transition-all group-hover:rotate-6">
                    <Truck size={40} />
                  </div>
                  <h3 className="text-2xl font-display font-black mb-4 italic tracking-tight">{service.name}</h3>
                  <p className="text-slate-500 leading-relaxed mb-8">
                    خدمة {service.name} موثوقة وسريعة تغطي كافة أحياء السويس على مدار الساعة بأفضل الأسعار.
                  </p>
                  <div className="mt-auto px-8 py-3 bg-slate-50 text-brand font-bold text-sm rounded-full group-hover:bg-brand group-hover:text-white transition-all flex items-center gap-2">
                    عرض التفاصيل
                    <ChevronLeft size={16} />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="bg-slate-950 rounded-[4rem] p-12 md:p-20 text-white relative overflow-hidden">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-display font-black mb-8 leading-tight tracking-tight italic">لماذا تثق في <br /><span className="text-brand">ديليفري السويس؟</span></h2>
                <div className="space-y-8">
                  {[
                    { t: 'سرعة ودقة', d: 'نظام ذكي يحدد أفضل وأسرع مسار للطيار.', i: Zap },
                    { t: 'أمان كامل', d: 'طلباتك في أمان تام مع طيارين موثوقين ومقيمين.', i: ShieldCheck },
                    { t: 'دعم 24/7', d: 'فريق الدعم الفني جاهز لمساعدتك في أي لحظة.', i: PhoneCall }
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-6 flex-row-reverse text-right">
                      <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-brand shrink-0">
                        <item.i size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-xl mb-2">{item.t}</h4>
                        <p className="text-slate-400 text-sm leading-relaxed">{item.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-white/5 backdrop-blur-md rounded-[3rem] p-12 border border-white/10 text-center">
                  <Star className="text-brand mx-auto mb-6" size={48} fill="currentColor" />
                  <p className="text-2xl font-display font-bold italic mb-8 leading-tight">&quot;أسرع تطبيق توصيل جربته في السويس، الطيار وصلني في السلام ١ في أقل من ربع ساعة!&quot;</p>
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-brand-light" />
                    <div className="text-right">
                      <p className="font-bold">محمد مصطفى</p>
                      <p className="text-xs text-brand font-bold uppercase tracking-widest">عميل من السويس</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Visual background stuff */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand/20 rounded-full blur-[120px]" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
