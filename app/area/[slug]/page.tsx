import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Truck, MapPin, Star, ShieldCheck, ChevronLeft, Phone, Facebook, Instagram, MessageSquare, Clock } from 'lucide-react';
import Link from 'next/link';
import { AREAS } from '@/lib/constants';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const area = AREAS.find(a => a.slug === resolvedParams.slug);
  if (!area) return {};
  
  return {
    title: `توصيل دليفري في ${area.name} السويس | أسرع خدمة 24 ساعة`,
    description: `اطلب دليفري في منطقة ${area.name} بالسويس الآن. أسرع توصيل للمطاعم، الصيدليات، والسوبر ماركت في ${area.name} بمدينة السويس. طيارين جاهزين للتوصيل الفوري.`,
    keywords: `دليفري ${area.name}, توصيل ${area.name}, طيارين ${area.name}, أسرع دليفري السويس, طلبات ${area.name}`,
  };
}

export default async function AreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const area = AREAS.find(a => a.slug === slug);

  if (!area) {
    notFound();
  }

  const faqData = [
    { q: `هل التوصيل متاح في ${area.name} طوال الـ 24 ساعة؟`, a: `نعم، خدمتنا تعمل 24 ساعة طوال أيام الأسبوع لخدمة جميع سكان منطقة ${area.name}.` },
    { q: `كم يستغرق وقت التوصيل في ${area.name}؟`, a: `في المتوسط يستغرق التوصيل من 15 إلى 30 دقيقة حسب مكان الاستلام والمطعم.` },
    { q: `كيف يمكنني التواصل مع طيار في ${area.name}؟`, a: `يمكنك الطلب مباشرة من التطبيق وسيتم ربطك بأقرب طيار متاح في منطقتك فوراً.` }
  ];

  const areaSchemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "serviceType": "Delivery Service",
        "provider": {
          "@type": "LocalBusiness",
          "name": `دليفري السويس أونلاين - ${area.name}`,
          "image": `https://picsum.photos/seed/${area.slug}/800/800`,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "السويس",
            "addressRegion": "السويس",
            "addressCountry": "EG"
          },
          "telephone": "+201022679250"
        },
        "areaServed": {
          "@type": "Place",
          "name": area.name,
          "containedInPlace": {
            "@type": "City",
            "name": "السويس"
          }
        },
        "description": `خدمة توصيل سريعة وموثوقة للمطاعم والصيدليات والسوبر ماركت في ${area.name} بالسويس.`
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqData.map(f => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": f.a
          }
        }))
      }
    ]
  };

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(areaSchemaData) }}
      />
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-950 rounded-[3rem] p-8 md:p-16 text-white relative overflow-hidden mb-12">
            <div className="relative z-10 max-w-2xl">
              <nav className="flex gap-2 text-white/50 text-sm font-bold mb-8 uppercase tracking-widest">
                <Link href="/">الرئيسية</Link>
                <span>/</span>
                <Link href="/areas">المناطق</Link>
                <span>/</span>
                <span className="text-brand">{area.name}</span>
              </nav>
              <h1 className="text-4xl md:text-6xl font-display font-black mb-6 italic leading-tight">
                توصيل دليفري في <br />
                <span className="text-brand">{area.name} (Suez)</span>
              </h1>
              <p className="text-white/60 text-lg mb-10 leading-relaxed">
                خدمة دليفري السويس أونلاين تغطي منطقة {area.name} بالكامل. نحن نوظف طيارين متواجدين دائماً في محيط {area.name} لضمان أسرع وقت توصيل للطلبات.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/webview" className="px-8 py-4 bg-brand text-white rounded-2xl font-bold text-center">اطلب في {area.name}</Link>
                <Link href="https://wa.me/201022679250" className="px-8 py-4 bg-white/10 text-white rounded-2xl font-bold text-center flex items-center justify-center gap-2 backdrop-blur-md">
                  <Phone size={20} />
                  دعم {area.name}
                </Link>
              </div>
            </div>
            {/* Abstract Background Design */}
            <div className="absolute -top-20 -left-20 w-80 h-80 bg-brand/20 rounded-full blur-[100px]" />
            <img 
              src={`https://picsum.photos/seed/${area.slug}/800/800`} 
              alt={area.name} 
              className="absolute right-0 top-0 h-full w-1/3 object-cover opacity-20 hidden md:block"
              style={{ maskImage: 'linear-gradient(to left, black, transparent)' }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-16">
              <section>
                <h2 className="text-3xl font-display font-black mb-8 text-slate-900 border-r-4 border-brand pr-4">لماذا تختار خدمة التوصيل في {area.name}؟</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { title: 'أسرع وقت وصول', desc: 'طيارونا متواجدون في كل شارع داخل منطقة ' + area.name, icon: Clock },
                    { title: 'أمان تام للطلبات', desc: 'نضمن وصول أوردرك سليم وحسب المواصفات بالكامل.', icon: ShieldCheck },
                    { title: 'تغطية 24 ساعة', icon: MapPin, desc: 'الخدمة متاحة طوال اليوم حتى في ساعات الليل المتأخرة.' },
                    { title: 'دعم فني مباشر', icon: MessageSquare, desc: 'تواصل مباشر مع الدعم في حال وجود أي استفسار.' }
                  ].map((feat, i) => (
                    <div key={i} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex gap-4">
                      <div className="shrink-0 w-12 h-12 bg-white text-brand rounded-2xl flex items-center justify-center shadow-sm">
                        <feat.icon size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2">{feat.title}</h3>
                        <p className="text-slate-500 text-sm leading-relaxed">{feat.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="bg-slate-50 rounded-[3rem] p-10 border border-slate-100">
                <h2 className="text-3xl font-display font-black mb-8">معلومات عن المنطقة (SEO)</h2>
                <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
                  <p className="mb-4">
                    تعتبر منطقة <strong>{area.name}</strong> في مدينة السويس واحدة من أهم المناطق التي نخدمها في تطبيق &quot;دليفري السويس أونلاين&quot;. نظراً لكثافتها السكانية وتنوع المحلات التجارية والمطاعم بها، قمنا بتخصيص فريق عمل مكثف لتغطية كافة الشوارع الرئيسية والفرعية في {area.name}.
                  </p>
                  <p className="mb-4">
                    سواء كنت تسكن في قلب {area.name} أو في الأطراف، فإن فريق التوصيل لدينا (الطيارين) مستعدون لاستلام طلبك من أي مطعم في السويس وتوصيله إليك في وقت قياسي.
                  </p>
                  <ul className="list-disc pr-6 space-y-2 mb-4">
                    <li>توصيل طلبات الصيدليات في {area.name} على مدار الساعة.</li>
                    <li>توصيل سوبر ماركت ومستلزمات منزلية.</li>
                    <li>خدمة الطوارئ والمشاوير الخاصة في {area.name}.</li>
                  </ul>
                  <p>
                    نحن نسعى دائماً لأن نكون الخيار الأول لسكان {area.name} عندما يتعلق الأمر بالسرعة، الأمان، والكفاءة في التوصيل.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-display font-black mb-8">أسئلة شائعة عن توصيل {area.name}</h2>
                <div className="space-y-4">
                  {faqData.map((faq, i) => (
                    <div key={i} className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                      <h4 className="font-bold text-slate-900 mb-2">{faq.q}</h4>
                      <p className="text-slate-500 text-sm">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="bg-slate-50 rounded-[3rem] p-10 border border-slate-100 mt-16">
                <h2 className="text-3xl font-display font-black mb-8 border-r-4 border-brand pr-4">موقع {area.name} على الخريطة</h2>
                <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-200 relative mb-6">
                  {/* We use a placeholder image for map visual context, styled cleanly */}
                  <img 
                    src={`https://picsum.photos/seed/map${area.slug}/800/400`} 
                    alt={`خريطة توضح منطقة ${area.name} في السويس`}
                    className="w-full h-full object-cover grayscale opacity-80"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white p-3 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce">
                      <div className="w-10 h-10 bg-brand text-white rounded-xl flex items-center justify-center">
                        <MapPin size={20} />
                      </div>
                      <span className="font-bold pr-2 text-slate-900">{area.name}</span>
                    </div>
                  </div>
                </div>
                <p className="text-slate-500 text-sm text-center font-medium leading-relaxed">
                  نحن نغطي منطقة {area.name} بالكامل من خلال شبكة واسعة من طياري التوصيل المتواجدين على مدار الساعة، لضمان وصول طلباتكم في أقل وقت ممكن.
                </p>
              </section>
            </div>

            <div className="space-y-8">
              <div className="bg-brand text-white p-8 rounded-[2.5rem] shadow-xl shadow-brand/20 relative overflow-hidden">
                <h3 className="text-2xl font-display font-black mb-6">احجز طلبك الآن!</h3>
                <p className="text-white/80 mb-8 font-medium">ابدأ تجربة أسرع توصيل في {area.name} اليوم.</p>
                <Link href="/webview" className="w-full py-4 bg-white text-brand rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-105 transition-all">
                  التطبيق المباشر
                  <ChevronLeft size={20} />
                </Link>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
              </div>

              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                <h3 className="text-xl font-bold mb-6">مناطق أخرى قريبة</h3>
                <div className="flex flex-wrap gap-2">
                  {AREAS.filter(a => a.slug !== slug).map((a, i) => (
                    <Link key={i} href={`/area/${a.slug}`} className="px-4 py-2 bg-slate-50 hover:bg-brand hover:text-white rounded-full text-xs font-bold transition-all border border-slate-100">
                      {a.name}
                    </Link>
                  ))}
                </div>
              </div>
              
              <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] text-center">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Truck size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4">هل أنت طيار في {area.name}؟</h3>
                <p className="text-slate-400 text-sm mb-8 leading-relaxed">انضم لأكبر فريق توصيل في السويس وابدأ في تحقيق أرباح ممتازة يومياً.</p>
                <Link href="/auth?role=driver" className="inline-block px-8 py-3 bg-brand text-white rounded-xl font-bold text-sm">سجل كطيار</Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
