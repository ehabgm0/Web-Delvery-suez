import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Shield, Lock, Eye, FileText, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'سياسة الخصوصية | ديليفري السويس أونلاين',
  description: 'تعرف على كيفية حماية بياناتك الشخصية في تطبيق ديليفري السويس أونلاين بموجب القوانين واللوائح المعمول بها.',
};

export default function PrivacyPage() {
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
              <Shield size={40} />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-display font-black text-slate-900 mb-10 italic">سياسة الخصوصية</h1>
            
            <div className="prose prose-lg prose-slate max-w-none text-slate-600 space-y-12 leading-relaxed">
              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3 flex-row-reverse">
                  <Eye className="text-brand" size={24} />
                  مقدمة
                </h2>
                <p>
                  نحن في ديليفري السويس أونلاين نقدر خصوصيتك ونلتزم بحماية بياناتك الشخصية. توضح هذه السياسة كيف نقوم بجمع، استخدام، ومشاركة معلوماتك عند استخدامك لتطبيقنا وموقعنا الإلكتروني.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3 flex-row-reverse">
                  <FileText className="text-brand" size={24} />
                  البيانات التي نجمعها
                </h2>
                <ul className="list-disc pr-6 space-y-2">
                  <li>معلومات الهوية: الاسم، رقم الهاتف، والبريد الإلكتروني.</li>
                  <li>بيانات الموقع: نستخدم خدمة الـ GPS لتحديد موقعك لتسهيل عملية التوصيل (بموافقتك).</li>
                  <li>بيانات المعاملات: تفاصيل الطلبات التي قمت بها عبر المنصة.</li>
                  <li>بيانات الجهاز: معلومات عن الهاتف أو المتصفح المستخدم للوصول للخدمة.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3 flex-row-reverse">
                  <Lock className="text-brand" size={24} />
                  كيف نستخدم بياناتك
                </h2>
                <p>
                  نستخدم المعلومات التي نجمعها بشكل أساسي لتقديم خدمات التوصيل وتحسينها. يشمل ذلك:
                </p>
                <ul className="list-disc pr-6 space-y-2">
                  <li>معالجة طلباتك وتوصيلها في أسرع وقت.</li>
                  <li>التواصل معك بخصوص حالة طلبك أو استفساراتك.</li>
                  <li>تحسين تجربة المستخدم وتحليل أداء الخدمة في السويس.</li>
                  <li>منع الاحتيال وضمان أمان المنصة للمستخدمين والطيارين.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3 flex-row-reverse">
                  <Shield className="text-brand" size={24} />
                  أمان البيانات
                </h2>
                <p>
                  نطبق معايير أمنية عالية لحماية بياناتك من الوصول غير المصرح به. يتم تشفير كافة البيانات الحساسة وتخزينها في خوادم آمنة خاضعة لأحدث بروتوكولات الحماية.
                </p>
              </section>

              <section className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                <h2 className="text-xl font-bold text-slate-900 mb-4">تحديثات السياسة</h2>
                <p className="text-sm">
                  قد نقوم بتحديث هذه السياسة من وقت لآخر لتعكس التغييرات في ممارساتنا أو القوانين المعمول بها. ننصحك بمراجعة هذه الصفحة بشكل دوري.
                </p>
                <p className="text-xs text-slate-400 mt-6 font-bold uppercase tracking-widest">آخر تحديث: مايو 2024</p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
