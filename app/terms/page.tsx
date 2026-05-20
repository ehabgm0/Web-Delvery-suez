import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Gavel, FileText, AlertCircle, CheckCircle2, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'الشروط والأحكام | ديليفري السويس أونلاين',
  description: 'القواعد واللوائح المنظمة لاستخدام منصة ديليفري السويس أونلاين للعملاء والطياران.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="pt-32 pb-24 text-right">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-500 font-bold text-sm mb-12 hover:text-brand transition-colors">
            <ChevronRight size={16} />
            العودة للرئيسية
          </Link>

          <div className="bg-white p-12 md:p-20 rounded-[4rem] shadow-sm border border-slate-200">
            <div className="w-20 h-20 bg-brand/10 text-brand rounded-3xl flex items-center justify-center mb-10">
              <Gavel size={40} />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-display font-black text-slate-900 mb-10 italic">الشروط والأحكام</h1>
            
            <div className="prose prose-lg prose-slate max-w-none text-slate-600 space-y-12 leading-relaxed">
              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3 flex-row-reverse">
                  <AlertCircle className="text-brand" size={24} />
                  قبول الشروط
                </h2>
                <p>
                  باستخدامك لموقع أو تطبيق ديليفري السويس أونلاين، فأنت توافق صراحة على الالتزام بكافة الشروط والأحكام الموضحة هنا. إذا كنت لا توافق على أي جزء من هذه الشروط، يرجى عدم استخدام المنصة.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3 flex-row-reverse">
                  <CheckCircle2 className="text-brand" size={24} />
                  مسؤولية المستخدم
                </h2>
                <ul className="list-disc pr-6 space-y-2">
                  <li>يجب أن تكون المعلومات المقدمة عند التسجيل (الاسم، رقم الهاتف) صحيحة ودقيقة.</li>
                  <li>المستخدم مسؤول تماماً عن الحفاظ على سرية بيانات حسابه.</li>
                  <li>يمنع استخدام المنصة في أي نشاط غير قانوني أو يخل بالآداب العامة.</li>
                  <li>يجب الالتزام بدفع رسوم التوصيل المحددة عند طلب الخدمة.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3 flex-row-reverse">
                  <FileText className="text-brand" size={24} />
                  شروط التوصيل
                </h2>
                <p>
                  نحن نسعى دائماً للوصول في الموعد المحدد، ومع ذلك قد تتأثر أوقات التوصيل بظروف خارجة عن إرادتنا مثل الازدحام المروري الشديد في بعض مناطق السويس أو الظروف الجوية القاسية.
                </p>
                <ul className="list-disc pr-6 space-y-2">
                  <li>رسوم التوصيل يتم تحديدها بناءً على المنطقة والمسافة.</li>
                  <li>يحق للمنصة إلغاء الطلبات التي تخالف سياسة الاستخدام.</li>
                  <li>في حال وجود مشكلة في الطلب، يجب التواصل مع الدعم الفني خلال ٣٠ دقيقة من الاستلام.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3 flex-row-reverse">
                  <AlertCircle className="text-brand" size={24} />
                  إخلاء المسؤولية
                </h2>
                <p>
                  ديليفري السويس أونلاين هو وسيط يربط بين العملاء ومقدمي الخدمات (طيارين، مطاعم). نحن لا نتحمل مسؤولية جودة المنتجات المقدمة من المطاعم (مثل جودة الأكل)، ولكننا نضمن وصولها إليك بنفس الحالة التي خرجت بها.
                </p>
              </section>

              <footer className="pt-10 border-t border-slate-100">
                <p className="text-sm">لأي استفسارات بخصوص الشروط والأحكام، يرجى التواصل معنا عبر مركز الدعم الفني.</p>
                <p className="text-xs text-slate-400 mt-6 font-bold uppercase tracking-widest">تاريخ الإصدار: مايو 2024</p>
              </footer>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
