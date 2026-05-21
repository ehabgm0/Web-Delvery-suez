import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Truck, ShoppingBag, Pill, Zap, ChevronLeft, Phone, BadgeCheck, Clock, ShieldCheck, MapPin } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import SafeImage from '@/components/SafeImage';
import { SERVICES, AREAS } from '@/lib/constants';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const service = SERVICES.find(s => s.slug === resolvedParams.slug);
  if (!service) return {};
  
  return {
    title: `${service.name} في السويس | أسرع خدمة توصيل منازل`,
    description: `خدمة ${service.name} الاحترافية من تطبيق دليفري السويس أونلاين. نغطي كافة أنحاء السويس (السلام، الأربعين، فيصل، عتاقة) بأسرع وقت وأقل تكلفة.`,
  };
}

const ICONS = {
  restaurants: Truck,
  pharmacies: Pill,
  supermarket: ShoppingBag,
  errands: Zap,
  default: Truck
};

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = SERVICES.find(s => s.slug === slug);

  if (!service) {
    notFound();
  }

  const Icon = ICONS[slug as keyof typeof ICONS] || ICONS.default;

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="bg-brand rounded-[3rem] p-10 md:p-20 text-white relative overflow-hidden mb-16 text-right">
            <div className="relative z-10 max-w-3xl">
              <nav className="flex gap-2 text-white/70 text-sm font-bold mb-8 uppercase tracking-widest justify-end">
                <Link href="/">الرئيسية</Link>
                <span>/</span>
                <Link href="/services">الخدمات</Link>
                <span>/</span>
                <span className="text-white">{service.name}</span>
              </nav>
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-md rounded-3xl mb-8">
                <Icon size={40} />
              </div>
              <h1 className="text-4xl md:text-7xl font-display font-black mb-8 leading-tight italic">
                خدمة <br />
                {service.name} بالسويس
              </h1>
              <p className="text-white/80 text-xl mb-12 leading-relaxed max-w-2xl">
                نحن نوفر لك أفضل تجربة لخدمة {service.name} في مدينة السويس. فريقنا من الطيارين مدرب خصيصاً للتعامل مع هذا النوع من الطلبات بدقة وسرعة متناهية.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-end">
                <Link href="/webview" className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-bold text-xl hover:scale-105 transition-all">اطلب الخدمة الآن</Link>
                <Link href="https://wa.me/201022679250" className="px-10 py-5 bg-white text-brand rounded-2xl font-bold text-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                  <Phone size={20} />
                  استفسار سريع
                </Link>
              </div>
            </div>
            
            {/* Background elements */}
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-[80px]" />
            <Icon size={400} className="absolute right-0 top-1/2 -translate-y-1/2 -mr-32 text-white/10 rotate-12" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-20 text-right">
              <section>
                <h2 className="text-4xl font-display font-black mb-10 text-slate-900 border-r-8 border-brand pr-6 tracking-tight">تفاصيل خدمة {service.name}</h2>
                <div className="prose prose-lg prose-slate max-w-none text-slate-600 leading-relaxed">
                  <p>
                    تعد خدمة <strong>{service.name}</strong> من الركائز الأساسية في تطبيقنا، حيث قمنا بتطوير نظام ذكي يربط بين مكان الطلب والطيار الأقرب لضمان وصول الخدمة إليك في أقل وقت ممكن داخل السويس.
                  </p>
                  <p>
                    نحن نغطي في هذه الخدمة كافة احتياجاتك، سواء كنت تطلب من مطعم مشهور، صيدلية بجوارك، أو حتى سوبر ماركت بعيد. طيارونا مجهزون بصناديق حرارية للحفاظ على جودة الأكل، وحقائب آمنة للمستندات والطلبات الحساسة.
                  </p>
                  <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 my-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex items-start gap-4 flex-row-reverse">
                      <div className="w-10 h-10 bg-white shadow-sm rounded-xl flex items-center justify-center text-brand shrink-0">
                        <BadgeCheck size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 mb-1">طيارين محترفين</h4>
                        <p className="text-sm">فريق مختار بعناية من أبناء السويس يعرفون كل المداخل والمخارج.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 flex-row-reverse">
                      <div className="w-10 h-10 bg-white shadow-sm rounded-xl flex items-center justify-center text-brand shrink-0">
                        <Clock size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 mb-1">وقت قياسي</h4>
                        <p className="text-sm">نحن ننافس الزمن لنصل إليك في وقت يتراوح بين 15 و35 دقيقة.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-4xl font-display font-black mb-10 text-slate-900 tracking-tight">كيف تعمل الخدمة؟</h2>
                <div className="relative">
                  <div className="absolute top-0 right-8 bottom-0 w-1 bg-slate-100 hidden md:block" />
                  <div className="space-y-12 relative z-10">
                    {[
                      { step: '01', title: 'افتح التطبيق', desc: 'ادخل على تطبيق الويب أو الموبايل وحدد طلبك.' },
                      { step: '02', title: 'اختر الخدمة', desc: 'حدد خدمة ' + service.name + ' من القائمة الرئيسية.' },
                      { step: '03', title: 'تأكيد الطلب', desc: 'سيقوم أقرب طيار في منطقتك بالاستلام فوراً.' },
                      { step: '04', title: 'الاستلام عند الباب', desc: 'استلم طلبك وادفع بالطريقة التي تفضلها.' }
                    ].map((step, i) => (
                      <div key={i} className="flex flex-col md:flex-row-reverse gap-6 items-start md:items-center">
                        <div className="w-16 h-16 bg-brand text-white rounded-full flex items-center justify-center font-display font-black text-2xl shrink-0 shadow-lg shadow-brand/20">
                          {step.step}
                        </div>
                        <div className="flex-1 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                          <h4 className="text-xl font-bold mb-2">{step.title}</h4>
                          <p className="text-slate-500 text-sm">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>

            <div className="space-y-10">
              <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden text-right">
                <h3 className="text-2xl font-display font-black mb-6 italic">مناطق تتوفر بها الخدمة</h3>
                <div className="space-y-4">
                  {AREAS.slice(0, 8).map((area, i) => (
                    <Link href={`/area/${area.slug}`} key={i} className="flex items-center gap-3 group flex-row-reverse">
                      <div className="w-2 h-2 rounded-full bg-brand group-hover:scale-150 transition-transform" />
                      <span className="text-slate-300 group-hover:text-white transition-colors">{area.name}</span>
                    </Link>
                  ))}
                </div>
                <Link href="/areas" className="mt-8 inline-flex items-center gap-2 text-brand font-bold text-sm">
                  <span>كافة المناطق</span>
                  <ChevronLeft size={16} />
                </Link>
              </div>

              <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 text-right">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm mx-auto lg:mr-0">
                  <ShieldCheck size={32} className="text-brand" />
                </div>
                <h3 className="text-xl font-bold mb-4">ضمان الجودة</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  نحن نضمن لك أفضل سعر وأسرع وقت. إذا واجهت أي مشكلة يمكنك استرداد قيمة التوصيل فوراً عبر فريق الدعم.
                </p>
              </div>
              
              <div className="relative group overflow-hidden rounded-[3rem]">
                <SafeImage 
                  src="/images/suez-city.jpg" 
                  fallbackSrc="/images/suez_hero_delivery.png"
                  alt="Suez City"
                  fill
                  referrerPolicy="no-referrer"
                  className="object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />
                <div className="absolute bottom-8 right-8 text-white text-right">
                  <p className="text-xs font-bold text-brand uppercase tracking-widest mb-2">السويس - السلام 1</p>
                  <h4 className="text-2xl font-display font-bold leading-tight">طيارونا في خدمتك <br /> دائماً وأبداً.</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
