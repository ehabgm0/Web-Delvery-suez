'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Smartphone, 
  Mail, 
  Gift, 
  CheckCircle2, 
  ArrowLeft, 
  Loader2, 
  ShieldCheck, 
  Wallet, 
  MapPin 
} from 'lucide-react';
import { doc, setDoc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

export default function CustomerSignupPage() {
  const router = useRouter();
  const [form, setForm] = React.useState({
    displayName: '',
    phone: '',
    email: '',
    promoCode: '',
  });

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validations
    if (!form.displayName.trim()) {
      setError('يرجى إدخال اسمك بالكامل لسهولة التواصل.');
      return;
    }
    if (!form.phone.trim() || form.phone.trim().length < 11) {
      setError('يرجى إدخال رقم هاتف صحيح من 11 رقم لبدء تتبع وإرسال الطلبات.');
      return;
    }

    setLoading(true);

    try {
      const cleanedPhone = form.phone.trim();
      const cleanedEmail = form.email.trim();

      // 1. Check if phone already exists by Direct Doc ID lookup
      const userRef = doc(db, 'users', cleanedPhone);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        setError('⚠️ رقم الهاتف هذا مسجل لدينا بالفعل! يرجى استخدام رقم آخر أو تسجيل الدخول.');
        setLoading(false);
        return;
      }

      // 2. Double check if phone already exists as field inside other documents (just in case)
      const phoneQuery = query(collection(db, 'users'), where('phone', '==', cleanedPhone));
      const phoneSnap = await getDocs(phoneQuery);
      if (!phoneSnap.empty) {
        setError('⚠️ رقم الهاتف هذا مسجل لدينا بالفعل! يرجى استخدام رقم آخر أو تسجيل الدخول.');
        setLoading(false);
        return;
      }

      // 3. Check if email already exists
      if (cleanedEmail && cleanedEmail !== 'no-email@delivery-suez.online') {
        const emailQuery = query(collection(db, 'users'), where('email', '==', cleanedEmail));
        const emailSnap = await getDocs(emailQuery);
        if (!emailSnap.empty) {
          setError('⚠️ البريد الإلكتروني الذي أدخلته مسجل بالفعل لحساب آخر! يرجى استخدام بريد إلكتروني مختلف.');
          setLoading(false);
          return;
        }
      }

      // Customer Registration Gift (50 EGP)
      const initialGiftBalance = form.promoCode.toUpperCase() === 'SUEZ50' || form.promoCode.trim() !== '' ? 50 : 25;

      const customerData = {
        uid: cleanedPhone, // Using phone as UID for direct robust key management
        displayName: form.displayName.trim(),
        phone: cleanedPhone,
        email: form.email.trim() || 'no-email@delivery-suez.online',
         role: 'customer',
        walletBalance: initialGiftBalance,
        status: 'active',
        isVip: false,
        myReferralCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Set directly in Firestore users collection
      await setDoc(userRef, customerData);

      // Store in localStorage for swift local session
      localStorage.setItem('suez_customer_session', JSON.stringify({
        phone: cleanedPhone,
        displayName: form.displayName.trim(),
        walletBalance: initialGiftBalance
      }));

      setSuccess(true);
      setTimeout(() => {
        router.push('/#order-form'); // Redirect to order panel
      }, 3000);

    } catch (err: any) {
      console.error('Customer signup failed:', err);
      setError('حدث خطأ أثناء الاتصال بقاعدة البيانات. يرجى المحاولة لاحقاً.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-[3.5rem] shadow-2xl overflow-hidden grid lg:grid-cols-12 border border-slate-100">
            
            {/* Visuals & Information (5 columns) */}
            <div className="lg:col-span-5 bg-slate-900 text-white p-12 md:p-16 relative overflow-hidden flex flex-col justify-between text-right order-2 lg:order-1">
              <div className="relative z-10">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-brand/10 text-brand rounded-full text-xs font-black italic mb-8">
                  <Gift size={14} /> HELLO SUEZ!
                </span>
                
                <h2 className="text-4xl font-display font-black mb-6 leading-tight italic">
                  سجل كعميل واحصل على <span className="text-brand">رصيد ترحيبي! 🎁</span>
                </h2>
                <p className="text-slate-400 font-medium leading-relaxed text-sm mb-10">
                  انضم لأسرع منصة دليفري في السويس واستمتع بمميزات حصرية، تتبع حي فوري لطلبك، ومحفظة ذكية لسهولة الدفع والتوصيل.
                </p>

                <div className="space-y-6">
                  <div className="flex items-center gap-4 flex-row-reverse">
                    <div className="w-12 h-12 bg-white/10 text-brand rounded-xl flex items-center justify-center shrink-0">
                      <Wallet size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-100">هدية ترحيبية فورية</h4>
                      <p className="text-xs text-slate-400">احصل على 50 جنيه في محفظتك الإلكترونية عند التسجيل بالرمز الترويجي SUEZ50.</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 flex-row-reverse">
                    <div className="w-12 h-12 bg-white/10 text-brand rounded-xl flex items-center justify-center shrink-0">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-100">تتبع حي للمناديب</h4>
                      <p className="text-xs text-slate-400">شاهد الكابتن وهو يتحرك على الخريطة مباشرة حتى يصل لباب منزلك بالسويس.</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 flex-row-reverse">
                    <div className="w-12 h-12 bg-white/10 text-brand rounded-xl flex items-center justify-center shrink-0">
                      <CheckCircle2 size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-100">دعم فني خاص ونظام VIP</h4>
                      <p className="text-xs text-slate-400">فريقنا متواجد 24 ساعة للرد على استفساراتك وحل أي مشكلة في دقائق معدودة.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-white/10 flex items-center gap-3 flex-row-reverse text-slate-400 relative z-10">
                <ShieldCheck size={20} className="text-emerald-400" />
                <span className="text-xs font-bold">حماية مشفرة وبث آمن للبيانات 100%</span>
              </div>

              {/* Decorative blobs */}
              <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                <div className="absolute w-[400px] h-[400px] bg-brand rounded-full -bottom-40 -left-40 blur-3xl animate-pulse" />
              </div>
            </div>

            {/* Registration Form (7 columns) */}
            <div className="lg:col-span-7 p-10 md:p-16 flex flex-col justify-center order-1 lg:order-2 text-right">
              {success ? (
                <div className="text-center py-12 animate-in fade-in zoom-in-95">
                  <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                    <CheckCircle2 size={48} />
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 mb-4 italic">أهلاً بك في دليفري السويس! ⭐</h3>
                  <p className="text-slate-500 font-bold mb-8">تم تفعيل حسابك كعميل وشحن الرصيد الترحيبي بنجاح.</p>
                  <p className="text-slate-400 text-xs font-mono animate-pulse">جاري تحويلك الآن لبدء طلبك الأول خلال ثوانٍ...</p>
                </div>
              ) : (
                <>
                  <div className="mb-10">
                    <h1 className="text-3xl font-display font-black text-slate-900 mb-2 italic">إنشاء حساب عميل جديد</h1>
                    <p className="text-slate-400 leading-relaxed font-medium text-sm">أدخل بياناتك للانضمام الفوري إلينا وتجربة خدماتنا اللوجستية المتكاملة.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                      <div className="bg-red-50 border-r-4 border-red-500 p-4 rounded-xl text-red-600 font-bold text-sm leading-relaxed mb-4 text-right animate-shake">
                        {error}
                      </div>
                    )}

                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-500 tracking-wide block">الاسم الكامل 👤</label>
                      <div className="relative">
                        <input 
                          type="text"
                          required
                          value={form.displayName}
                          onChange={(e) => setForm({ ...form, displayName: e.target.value })}
                          placeholder="مثال: أحمد محمد السويسي"
                          className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-brand focus:ring-4 focus:ring-brand/5 outline-none transition-all font-bold text-slate-800 text-right pr-12"
                        />
                        <User className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-500 tracking-wide block">رقم الهاتف بالسويس 📞</label>
                      <div className="relative">
                        <input 
                          type="tel"
                          required
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          placeholder="مثال: 01012345678"
                          className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-brand focus:ring-4 focus:ring-brand/20 outline-none transition-all font-mono font-bold text-slate-800 text-right pr-12"
                        />
                        <Smartphone className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      </div>
                      <p className="text-[10px] text-slate-400 font-semibold">سنستخدم هذا الرقم ليتواصل معك الطيار لتسليم الشحنة.</p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-500 tracking-wide block">البريد الإلكتروني (اختياري) ✉️</label>
                      <div className="relative">
                        <input 
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="البريد الإلكتروني (مثال: me@example.com)"
                          className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-brand focus:ring-4 focus:ring-brand/5 outline-none transition-all font-bold text-slate-800 text-right pr-12"
                        />
                        <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-500 tracking-wide block">الرمز الترويجي / كود الهدية 🎁</label>
                      <div className="relative">
                        <input 
                          type="text"
                          value={form.promoCode}
                          onChange={(e) => setForm({ ...form, promoCode: e.target.value })}
                          placeholder="اكتب رمز الخصم أو SUEZ50"
                          className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-brand focus:ring-4 focus:ring-brand/5 outline-none transition-all font-bold text-indigo-600 font-mono text-right pr-12"
                        />
                        <Gift className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      </div>
                      <p className="text-[10px] text-slate-400 font-semibold">استخدم الرمز الترويجي SUEZ50 للحصول على 50 جنيه رصيد ترحيبي فوري.</p>
                    </div>

                    <button 
                      type="submit"
                      disabled={loading}
                      className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-3 mt-8 shadow-lg shadow-slate-900/10 cursor-pointer disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="animate-spin" size={20} />
                          جاري تفعيل حسابك...
                        </>
                      ) : (
                        <>
                          تسجيل وتفعيل حساب العميل 🎁
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
