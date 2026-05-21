import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Share2, Gift, DollarSign, Users, ChevronLeft, Zap, Smartphone } from 'lucide-react';
import SafeImage from '@/components/SafeImage';

export const metadata = {
  title: 'برنامج الإحالة والربح | ديليفري السويس أونلاين',
  description: 'شارك رابطك الخاص واربح رصيد مجاني مدى الحياة مع كل طلب يقوم به أصدقاؤك. أفضل برنامج تسويق بالعمولة في السويس لدليفري المطاعم والطلبات.',
};

export default function AffiliatePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-32 pb-24 text-right">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <div className="order-2 lg:order-1 relative h-[500px] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-slate-100">
              <SafeImage 
                src="https://picsum.photos/seed/suez-affiliate/800/1000" 
                fallbackSrc="https://picsum.photos/seed/money/800/1000"
                alt="Affiliate Program"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <div className="flex items-center gap-3 mb-4 flex-row-reverse justify-end">
                  <DollarSign size={24} className="text-orange-400" />
                  <p className="font-bold text-xl drop-shadow-md">اربح مع كل توصيلة</p>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-600 rounded-full font-bold text-sm mb-8 flex-row-reverse">
                <Zap size={16} />
                <span>برنامج شركاء السويس</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-display font-black text-slate-900 mb-8 italic leading-tight">
                شارك التطبيق <br /> <span className="text-orange-600">وضاعف أرباحك</span>
              </h1>
              <p className="text-xl text-slate-500 mb-10 leading-relaxed font-medium">
                حوّل شبكة علاقاتك في السويس إلى مصدر دخل مستمر. بمجرد مشاركتك لرابطك الخاص مع أصدقائك أو متابعيك، ستحصل على رصيد مجاني في محفظتك يُمكنك استخدامه في طلبات الدليفري القادمة.
              </p>
              
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 mb-10">
                <div className="flex flex-col gap-4">
                  <label className="font-bold text-slate-700">رابط الدعوة الخاص بك (مثال):</label>
                  <div className="flex gap-4 flex-row-reverse">
                    <button className="bg-slate-900 text-white px-6 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-brand transition-colors whitespace-nowrap">
                      <Share2 size={18} />
                      انسخ الرابط
                    </button>
                    <input 
                      type="text" 
                      readOnly 
                      value="https://delivery-suez.online/invite/SuezVIP2024" 
                      className="flex-1 bg-white border border-slate-200 rounded-xl px-4 text-left font-mono text-slate-500 focus:outline-none"
                      dir="ltr"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 justify-end">
                <Link href="/webview" className="px-10 py-5 bg-whatsapp text-white rounded-2xl font-bold text-lg hover:scale-105 transition-transform flex items-center gap-3">
                  <Smartphone size={24} />
                  شارك عبر واتساب فوراً
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-display font-black text-slate-900 mb-16 italic">كيف يعمل مقياس الأرباح الربح؟</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all relative overflow-hidden group">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:bg-brand/10 transition-colors">
                  <Share2 size={32} className="text-slate-400 group-hover:text-brand transition-colors" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">1. شارك رابطك</h3>
                <p className="text-slate-500">انسخ رابطك الخاص وشاركه على جروبات الواتساب، فيسبوك، أو أرسله لأصدقائك في السويس مباشرة.</p>
              </div>
              <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all relative overflow-hidden group">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:bg-brand/10 transition-colors">
                  <Users size={32} className="text-slate-400 group-hover:text-brand transition-colors" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">2. تسجيل صديقك</h3>
                <p className="text-slate-500">يقومون بتحميل التطبيق أو استخدام المنصة وإنشاء حساب جديد باستخدام كود الإحالة الخاص بك.</p>
              </div>
              <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all relative overflow-hidden group">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:bg-brand/10 transition-colors">
                  <Gift size={32} className="text-slate-400 group-hover:text-brand transition-colors" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">3. استلم أرباحك</h3>
                <p className="text-slate-500">مع أول طلب ناجح يقومون به، يتم إضافة رصيد مجاني لمحفظتك تلقائياً ويمكنك استخدامه فوراً.</p>
              </div>
            </div>
          </div>

          <div className="bg-brand rounded-[4rem] p-12 md:p-20 text-white relative overflow-hidden text-center z-10">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-slate-900 opacity-10 rounded-full blur-3xl pointer-events-none" />
            
            <h2 className="text-4xl md:text-5xl font-display font-black mb-8 italic relative z-10">هل أنت مؤثر أو تملك صيدلية/مطعم في السويس؟</h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto mb-12 relative z-10 leading-relaxed font-medium">
              لدينا برامج شراكة للشركات والمطاعم وأصحاب الأنشطة التجارية تمنحكم عوائد شهرية مجزية وتسويق مجاني على منصتنا.
            </p>
            <Link href="/support" className="inline-flex px-12 py-5 bg-slate-900 text-white rounded-2xl font-bold text-xl hover:scale-105 transition-all mx-auto relative z-10 shadow-xl items-center gap-3">
              <ChevronLeft size={24} />
              انضم كشريك تجاري الآن
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
