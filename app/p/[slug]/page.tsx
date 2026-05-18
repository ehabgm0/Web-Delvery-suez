import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { KEYWORDS } from '@/lib/constants';
import { notFound } from 'next/navigation';
import { Truck, Star, ShieldCheck, Zap, ChevronLeft, PhoneCall } from 'lucide-react';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const kw = KEYWORDS.find(k => k.slug === resolvedParams.slug);
  if (!kw) return {};
  
  return {
    title: `${kw.name} - ديليفري السويس أونلاين`,
    description: `هل تبحث عن ${kw.name}؟ تطبيق دليفري السويس هو الخيار الأفضل والأسرع. توصيل فوري في جميع أحياء السويس: السلام، الأربعين، فيصل، وبورتوفيق.`,
  };
}

export default async function KeywordPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const kw = KEYWORDS.find(k => k.slug === slug);

  if (!kw) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-32 pb-24 text-right">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h1 className="text-4xl md:text-6xl font-display font-black text-slate-900 mb-8 italic text-brand leading-tight">
              {kw.name}
            </h1>
            <div className="prose prose-xl prose-slate max-w-none text-slate-600 leading-relaxed font-medium">
              <p className="text-2xl text-slate-900 font-bold mb-6">هل تبحث عن أسرع وأفضل خدمة دليفري في مدينة السويس؟</p>
              <p className="mb-6">
                إذا كنت في السويس ولديك اهتمام بـ <strong>{kw.name}</strong>، فأنت في المكان الصحيح. منصة ديليفري السويس أونلاين صُممت خصيصاً لتلبية هذا الاحتياج بأعلى معايير الجودة والسرعة.
              </p>
              <p className="mb-6">
                نحن نوفر خدمات توصيل شاملة تغطي منطقة السلام 1، السلام 2، الأربعين، فيصل، عتاقة، وكافة أرجاء المحافظة. خدمتنا موجهة للعملاء الذين يبحثون عن الموثوقية والأمان في نقل طلباتهم.
              </p>
              
              <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 my-12">
                <h3 className="text-2xl font-display font-black mb-6 italic">مميزات خدمتنا في السويس:</h3>
                <ul className="space-y-4 pr-6">
                  <li className="flex items-center gap-3 flex-row-reverse text-right">
                    <Zap className="text-brand shrink-0" size={20} />
                    <span>توصيل فوري خلال 20 دقيقة كمتوسط.</span>
                  </li>
                  <li className="flex items-center gap-3 flex-row-reverse text-right">
                    <ShieldCheck className="text-brand shrink-0" size={20} />
                    <span>طيارين محترفين ومدربين جيداً.</span>
                  </li>
                  <li className="flex items-center gap-3 flex-row-reverse text-right">
                    <Truck className="text-brand shrink-0" size={20} />
                    <span>تغطية كاملة لجميع الأحياء والمناطق.</span>
                  </li>
                </ul>
              </div>

              <p className="mb-10 leading-relaxed">
                لا تضيع وقتك في البحث الطويل. &quot;ديليفري السويس أونلاين&quot; هو الاسم الأول والموثوق في مجال التوصيل. نحن نعمل على مدار الساعة 24/7 لخدمتكم وضمان راحتكم.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-end pt-10">
                <Link href="/webview" className="px-12 py-5 bg-brand text-white rounded-2xl font-bold text-xl shadow-xl shadow-brand/20 hover:scale-105 transition-all text-center">
                  اطلب الآن من التطبيق
                </Link>
                <Link href="/auth" className="px-12 py-5 bg-slate-900 text-white rounded-2xl font-bold text-xl hover:bg-slate-800 transition-all text-center">
                  سجل معنا كعميل
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
