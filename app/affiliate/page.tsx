'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  Zap, 
  MapPin, 
  Coins, 
  Share2, 
  CheckCircle, 
  Users, 
  Award, 
  Laptop, 
  Gift, 
  ChevronLeft,
  Copy
} from 'lucide-react';
import Link from 'next/link';

export default function Affiliate() {
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [referralCode, setReferralCode] = React.useState<string | null>(null);
  const [invitedFriendsCount, setInvitedFriendsCount] = React.useState(3);
  const [earnedEgp, setEarnedEgp] = React.useState(150);

  const handleGenerateCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.length < 11) {
      alert('الرجاء إدخال رقم هاتفك المحمول بالسويس (11 رقم) لتفعيل المحفظة!');
      return;
    }
    const code = `SUEZ-CAP-${phoneNumber.substring(7)}${Math.floor(10 + Math.random() * 90)}`;
    setReferralCode(code);
    alert('تم توليد كود الإحالة والمحفظة بنجاح! 🎁💰 شاركه مع أصدقائك للحصول على 50 جنيهاً كاش مع أول رحلة لهم.');
  };

  const handleCopyLink = () => {
    if (!referralCode) return;
    const link = `https://delivery-suez.online/webview?ref=${referralCode}`;
    navigator.clipboard.writeText(link);
    alert('تم نسخ رابط الإحالة اللوجستي بنجاح! شاركه الآن على مجموعات فيسبوك وواتساب السويس.');
  };

  return (
    <div className="min-h-screen bg-white text-right">
      <Navbar />

      <main className="pt-32 pb-24 font-sans" dir="rtl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header promo block */}
          <div className="bg-slate-950 rounded-[3rem] p-8 md:p-16 text-white text-right relative overflow-hidden mb-12 shadow-xl">
            <div className="relative z-10 max-w-2xl">
              <span className="text-xs text-brand font-black uppercase tracking-widest block mb-3">برنامج الشركاء والربح التشاركي</span>
              <h1 className="text-4xl md:text-6xl font-display font-black mb-6 italic leading-tight">
                شارك كودك واكسب <br />
                <span className="text-brand">ريال وكاش بالجنيه المصري EGP!</span>
              </h1>
              <p className="text-white/60 mb-8 font-semibold text-sm leading-relaxed">
                برنامج الإحالة المباشر من ديليفري السويس أونلاين. امنح أصدقائك أو عملائك أو الكباتن 50 جنيهاً رصيد ترحيبي، واحصل أنت على 50 جنيهاً كاش تضاف لمحفظتك مع أول رحلة توصيل ناجحة لهم! انتشار مجنون وفوائد تشاركية عادلة.
              </p>
              <div className="flex gap-4 flex-row-reverse justify-end">
                <a href="#generate" className="px-6 py-3 bg-brand text-white rounded-xl font-bold hover:scale-105 transition-all text-sm">
                  اشترك الآن واستخرج كود الترويج
                </a>
              </div>
            </div>
            
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-brand/20 rounded-full blur-[100px]" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Left Main form section */}
            <div id="generate" className="lg:col-span-2 space-y-12">
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 text-right shadow-sm">
                <h2 className="text-xl font-display font-black text-slate-900 mb-4 border-r-4 border-brand pr-3">توليد كود الإحالة والمحفظة الذكية</h2>
                <p className="text-slate-500 text-xs mb-8 font-semibold">أدخل رقم هاتفك لتسجيل المحفظة وربطها برقم الـ GPS وتوليد كود الترويج العائلي.</p>
                
                {!referralCode ? (
                  <form onSubmit={handleGenerateCode} className="space-y-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-2">رقم هاتف المحمول (فودافون كاش، اتصالات، أورانج، إلخ)</label>
                      <input 
                        type="text" 
                        required
                        maxLength={11}
                        placeholder="مثال: 01022679250"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-800 focus:outline-brand text-right font-sans"
                      />
                    </div>
                    <button 
                      type="submit"
                      className="w-full py-4 bg-brand text-white font-black text-sm rounded-xl hover:scale-105 transition-all shadow-md shadow-brand/10 cursor-pointer"
                    >
                      توليد كود الترويج الفوري 🎁
                    </button>
                  </form>
                ) : (
                  <div className="p-8 bg-slate-50 rounded-3xl border border-slate-200 text-center space-y-6">
                    <p className="text-slate-400 font-bold text-xs uppercase select-none">رابط الترويج الخاص بك جاهز!</p>
                    <div className="inline-flex items-center gap-3 bg-white px-6 py-4.5 rounded-2xl border border-slate-300 shadow-sm flex-row font-mono text-slate-800 font-bold text-lg select-all">
                      <span>{referralCode}</span>
                    </div>

                    <p className="text-slate-600 text-xs font-medium leading-relaxed max-w-sm mx-auto">
                      انسخ الرابط البرمجي وشاركه مع التجار، والمطاعم وعائلاتك في السويس. مع قيامهم بأول طلب توصيل، يضاف لحسابك رصيد EGP كاش!
                    </p>

                    <div className="flex gap-4 justify-center">
                      <button 
                        onClick={handleCopyLink}
                        className="px-6 py-3.5 bg-brand text-white rounded-xl font-bold flex items-center gap-2 hover:scale-105 transition-all text-xs cursor-pointer"
                      >
                        <Copy size={16} />
                        نسخ رابط الدعوة
                      </button>
                      <button 
                        onClick={() => setReferralCode(null)}
                        className="px-6 py-3.5 bg-white text-slate-600 rounded-xl font-bold border border-slate-200 hover:bg-slate-100 transition-all text-xs cursor-pointer"
                      >
                        توليد كود آخر جديد
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Reward program logs simulator */}
              <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm">
                <div className="p-8 border-b border-slate-100 flex justify-between items-center flex-row-reverse bg-slate-50/50">
                  <h3 className="font-display font-black text-slate-950 font-display text-base">سجلات الإحالات والمكافآت التقديرية 🏆</h3>
                  <span className="text-xs text-emerald-600 font-black">نشط الآن 🟢</span>
                </div>
                <div className="divide-y divide-slate-100 font-bold text-sm">
                  {[
                    { name: 'محمد فايز (الأربعين)', date: 'منذ ساعتين', status: 'مكتمل ✅', reward: '+50 EGP' },
                    { name: 'ريهام الجناين (الجناين)', date: 'منذ يوم', status: 'مكتمل ✅', reward: '+50 EGP' },
                    { name: 'محمد متولي (السلام)', date: 'منذ يومين', status: 'مكتمل ✅', reward: '+50 EGP' }
                  ].map((log, i) => (
                    <div key={i} className="p-6 flex justify-between items-center text-right flex-row-reverse">
                      <div>
                        <p className="text-slate-900">{log.name}</p>
                        <p className="text-slate-400 text-xs font-semibold">تاريخ الانضمام والطلب: {log.date}</p>
                      </div>
                      <div className="flex items-center gap-4 flex-row-reverse">
                        <span className="text-slate-400 text-xs font-medium">{log.status}</span>
                        <span className="text-brand font-display font-black text-base font-sans">{log.reward}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right sidebar structure */}
            <div className="space-y-8">
              <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 text-right">
                <h3 className="text-lg font-bold mb-6 text-slate-950">كيف يعمل برنامج كاش الشركاء؟</h3>
                <div className="space-y-6">
                  {[
                    { step: '1', title: 'سجل هاتفك السويسي', desc: 'أدخل رقم هاتف محمول فعال وقم بإنشاء محفظتك اللوجستية الفريدة.' },
                    { step: '2', title: 'انشر الرابط والترويد', desc: 'انشر رابط الدعوة على فيسبوك وتيك توك لأقاربك وأصحاب المتاجر ومطاعم السويس.' },
                    { step: '3', title: 'احصل على الكاش كاش EGP', desc: 'احصد نقدك كاش بخصومات التوصيل أو تحويل المكافآت مباشرة!' }
                  ].map((st, i) => (
                    <div key={i} className="flex gap-4 flex-row-reverse">
                      <span className="w-8 h-8 rounded-full bg-brand/10 text-brand font-black text-xs flex items-center justify-center shrink-0">
                        {st.step}
                      </span>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm mb-1">{st.title}</h4>
                        <p className="text-slate-500 text-xs leading-relaxed font-semibold">{st.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Invitation statistics mock box */}
              <div className="bg-slate-950 text-white p-8 rounded-[2.5rem] shadow-md text-right">
                <h3 className="text-xl font-display font-black text-brand mb-6">مؤشر أرباحك الكبرى</h3>
                <div className="space-y-4">
                  <div className="flex justify-between flex-row-reverse items-center">
                    <span className="text-slate-400 text-xs font-semibold">الأصدقاء المدعوين:</span>
                    <span className="font-display font-black text-lg text-white font-sans">{invitedFriendsCount} أفراد</span>
                  </div>
                  <div className="flex justify-between flex-row-reverse items-center border-t border-white/10 pt-4">
                    <span className="text-slate-400 text-xs font-semibold">جملة الأرباح بمحفظتك EGP:</span>
                    <span className="font-display font-black text-lg text-brand font-sans">{earnedEgp} EGP</span>
                  </div>
                </div>
                <button 
                  onClick={() => alert('محفظتك تحتوي على 150 جنيهاً كاش؛ يمكنك استخدامها في رحلات الدليفري القادمة تلقائياً! 💵')}
                  className="w-full mt-6 py-3 bg-white text-slate-900 rounded-xl font-bold text-xs hover:bg-slate-100 transition-all cursor-pointer"
                >
                  صرف وسحب المكافأة كاش
                </button>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
