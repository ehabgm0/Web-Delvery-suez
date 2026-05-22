'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  Truck, 
  Smartphone, 
  User, 
  Mail, 
  CheckCircle2, 
  Loader2, 
  ShieldCheck, 
  Coins, 
  Briefcase, 
  Map, 
  FileCheck 
} from 'lucide-react';
import { doc, setDoc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

export default function CaptainOnboardingPage() {
  const router = useRouter();
  const [form, setForm] = React.useState({
    displayName: '',
    phone: '',
    vehicleType: 'motorcycle',
    email: '',
    nationalId: '',
    status: 'approved',
  });

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validations
    if (!form.displayName.trim()) {
      setError('يرجى إدخال اسمك بالكامل (الرباعي) للبدء.');
      return;
    }
    if (!form.phone.trim() || form.phone.trim().length < 11) {
      setError('يرجى إدخال رقم هاتف صحيح ومفعل في السويس للاتصال بالعملاء.');
      return;
    }

    setLoading(true);

    try {
      const cleanedPhone = form.phone.trim();
      const cleanedEmail = form.email.trim();
      const cleanedNationalId = form.nationalId.trim();

      // 1. Check if phone is already registered as document ID
      const userRef = doc(db, 'users', cleanedPhone);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data();
        if (data.role === 'captain') {
          setError('⚠️ رقم الهاتف هذا مسجل بالفعل كطيار لدينا بالمنصة! يمكنك تسجيل الدخول بدلاً من ذلك.');
        } else {
          setError('⚠️ هذا الرقم مسجل في المنصة كحساب عميل. يرجى استخدام رقم هاتف مختلف مخصص للكباتن.');
        }
        setLoading(false);
        return;
      }

      // 2. Double check if phone is registered in any other document fields
      const phoneQuery = query(collection(db, 'users'), where('phone', '==', cleanedPhone));
      const phoneSnap = await getDocs(phoneQuery);
      if (!phoneSnap.empty) {
        setError('⚠️ رقم الهاتف المدخل مسجل بالفعل في حساب آخر! يرجى كتابة رقم هاتف غير مسجل.');
        setLoading(false);
        return;
      }

      // 3. Check if email is already in use
      if (cleanedEmail && cleanedEmail !== 'no-email@delivery-suez.online') {
        const emailQuery = query(collection(db, 'users'), where('email', '==', cleanedEmail));
        const emailSnap = await getDocs(emailQuery);
        if (!emailSnap.empty) {
          setError('⚠️ البريد الإلكتروني الذي أدخلته مسجل بالفعل لحساب كابتن أو عميل آخر! يرجى إدخال بريد مختلف.');
          setLoading(false);
          return;
        }
      }

      // 4. Check if National ID is already registered (if entered and not equal to the default test)
      if (cleanedNationalId && cleanedNationalId !== '777-TEST') {
        const idQuery = query(collection(db, 'users'), where('nationalId', '==', cleanedNationalId));
        const idSnap = await getDocs(idQuery);
        if (!idSnap.empty) {
          setError('⚠️ الرقم القومي هذا مسجل بالفعل ومربوط سابقاً بحساب كابتن آخر في المنظومة!');
          setLoading(false);
          return;
        }
      }

      const captainData = {
        id: cleanedPhone,
        uid: cleanedPhone, // Using phone as uid for direct key connection
        phone: cleanedPhone,
        displayName: form.displayName.trim(),
        email: form.email.trim() || 'no-email@delivery-suez.online',
        role: 'captain',
        vehicleType: form.vehicleType,
        status: form.status, // Custom user chosen onboarding status
        isOnline: true,
        lat: 29.9663, // Suez center point coordinates
        lng: 32.5498,
        heading: 0,
        speed: 0,
        nationalId: form.nationalId.trim() || '777-TEST',
        walletBalance: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Set directly in Firestore users collection
      await setDoc(userRef, captainData);

      // Store local session
      localStorage.setItem('suez_captain_session', JSON.stringify({
        id: cleanedPhone,
        displayName: form.displayName.trim(),
        phone: cleanedPhone,
        vehicleType: form.vehicleType,
        isOnline: true
      }));

      setSuccess(true);
      setTimeout(() => {
        router.push('/webview'); // Redirect to live captain simulation panel
      }, 3000);

    } catch (err: any) {
      console.error('Captain onboarding failed:', err);
      setError('فشلت عملية حفظ البيانات في خوادم الفايربيس. يرجى مراجعة الاتصال ومعاودة المحاولة.');
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
            
            {/* Captain registration information (5 columns) */}
            <div className="lg:col-span-5 bg-indigo-950 text-white p-12 md:p-16 relative overflow-hidden flex flex-col justify-between text-right order-2 lg:order-1">
              <div className="relative z-10">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-900 text-brand rounded-full text-xs font-black italic mb-8">
                  <Coins size={14} /> SUEZ CAPTAINS
                </span>

                <h2 className="text-4xl font-display font-black mb-6 leading-tight italic">
                  انضم لأسطول طياري <br />
                  <span className="text-brand">ديليفري السويس 🏍️</span>
                </h2>
                
                <p className="text-indigo-200 font-medium leading-relaxed text-sm mb-10">
                  انضم لأكثر من 500 مندوب وطيار في السويس بمتوسط دخل يومي من 150 إلى 400 جنيه مصري وحرية عمل كاملة.
                </p>

                <div className="space-y-6">
                  <div className="flex items-center gap-4 flex-row-reverse">
                    <div className="w-12 h-12 bg-white/10 text-brand rounded-xl flex items-center justify-center shrink-0">
                      <Briefcase size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-indigo-100">حرية تامة وساعات عمل مرنة</h4>
                      <p className="text-xs text-indigo-300">كن مدير نفسك! اختر الأوقات التي ترغب بالعمل فيها وافتح التطبيق لاستقبال الطلبات فوراً.</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 flex-row-reverse">
                    <div className="w-12 h-12 bg-white/10 text-brand rounded-xl flex items-center justify-center shrink-0">
                      <Coins size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-indigo-100">ربح فوري وبدون عمولات مرتقبة</h4>
                      <p className="text-xs text-indigo-300">تحتفظ بـ 100% من سعر التوصيل لنفسك بالإضافة إلى مكافآت وحوافز أسبوعية عند إتمام عدد معين من الرحلات.</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 flex-row-reverse">
                    <div className="w-12 h-12 bg-white/10 text-brand rounded-xl flex items-center justify-center shrink-0">
                      <Map size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-indigo-100">تغطية ذكية لكل السويس</h4>
                      <p className="text-xs text-indigo-300">نوفر لك أحدث خرائط ملاحة وتنبيهات بأماكن الكثافة الشرائية مثل الأربعين، بورتوفيق، الملاحة، وحي السويس.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-white/5 flex items-center gap-3 flex-row-reverse text-indigo-300 relative z-10">
                <ShieldCheck size={20} className="text-emerald-400" />
                <span className="text-xs font-bold">بوابة تسجيل رسمية وربط فوري بقاعدة البيانات والـ API</span>
              </div>

              {/* Decorative graphics */}
              <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                <Truck size={600} className="absolute -bottom-20 -left-60 rotate-[20deg]" />
              </div>
            </div>

            {/* Captain registration form (7 columns) */}
            <div className="lg:col-span-7 p-10 md:p-16 flex flex-col justify-center order-1 lg:order-2 text-right">
              {success ? (
                <div className="text-center py-12 animate-in fade-in zoom-in-95">
                  <div className="w-24 h-24 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                    <FileCheck size={48} />
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 mb-4 italic">مرحباً بك يا كابتن! 🏍️</h3>
                  <p className="text-slate-500 font-bold mb-8">تم تفعيل حسابك تلقائياً بنجاح، وأنت لآن متصل وع جاهزية لاستلام المهام بالسويس.</p>
                  <p className="text-slate-400 text-xs font-mono animate-pulse">جاري تحويلك الآن للوحة القيادة الكابتن والمحاكاة...</p>
                </div>
              ) : (
                <>
                  <div className="mb-10">
                    <h1 className="text-3xl font-display font-black text-slate-900 mb-2 italic">بوابة انضمام الطيارين</h1>
                    <p className="text-slate-400 leading-relaxed font-medium text-sm">سجل اليوم لتبدأ في تقديم خدمات التوصيل وتحقيق أرباح فورية مجزية في شوارع السويس.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                      <div className="bg-red-50 border-r-4 border-red-500 p-4 rounded-xl text-red-600 font-bold text-sm leading-relaxed mb-4 text-right">
                        {error}
                      </div>
                    )}

                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-500 tracking-wide block">الاسم الرباعي الكامل 👤</label>
                      <div className="relative">
                        <input 
                          type="text"
                          required
                          value={form.displayName}
                          onChange={(e) => setForm({ ...form, displayName: e.target.value })}
                          placeholder="الاسم كامل (مطابق للرقم القومي)"
                          className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/5 outline-none transition-all font-bold text-slate-800 text-right pr-12"
                        />
                        <User className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-500 tracking-wide block">رقم هاتف السويس للتواصل 📞</label>
                      <div className="relative">
                        <input 
                          type="tel"
                          required
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          placeholder="رقم الهاتف (الواتساب والمكالمات)"
                          className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/5 outline-none transition-all font-mono font-bold text-slate-800 text-right pr-12"
                        />
                        <Smartphone className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-500 tracking-wide block">نوع وسيلة التوصيل المتوفرة 🏍️</label>
                      <div className="relative">
                        <select 
                          value={form.vehicleType}
                          onChange={(e) => setForm({ ...form, vehicleType: e.target.value })}
                          className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/5 outline-none transition-all font-bold text-slate-800 text-right appearance-none"
                        >
                          <option value="motorcycle">🏍️ دراجة نارية / موتوسيكل</option>
                          <option value="vespa">🛵 فيسبا / سكوتر</option>
                          <option value="car">🚗 سيارة ملاكي / ربع نقل</option>
                          <option value="bicycle">🚲 دراجة هوائية (عجلة)</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-500 tracking-wide block">حالة الطيار الأولية ⚡</label>
                      <div className="relative">
                        <select 
                          value={form.status}
                          onChange={(e) => setForm({ ...form, status: e.target.value })}
                          className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/5 outline-none transition-all font-bold text-slate-800 text-right appearance-none"
                        >
                          <option value="approved">🟢 مقبول للعمل فوراً (Approved)</option>
                          <option value="pending">🟡 في انتظار المراجعة (Pending)</option>
                          <option value="active">🔵نشط ومتاح للتوصيل (Active)</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-500 tracking-wide block">البريد الإلكتروني ✉️</label>
                      <div className="relative">
                        <input 
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="البريد الإلكتروني (اختياري)"
                          className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/5 outline-none transition-all font-bold text-slate-800 text-right pr-12"
                        />
                        <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-500 tracking-wide block">الرقم القومي (اختياري للأمان والتحقق) 💳</label>
                      <div className="relative">
                        <input 
                          type="text"
                          value={form.nationalId}
                          onChange={(e) => setForm({ ...form, nationalId: e.target.value })}
                          placeholder="الرقم القومي المكتوب على بطاقتك الشخصية"
                          className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/5 outline-none transition-all font-mono font-bold text-slate-800 text-right pr-12"
                        />
                        <FileCheck className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      </div>
                    </div>

                    <button 
                      type="submit"
                      disabled={loading}
                      className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg hover:bg-slate-900 transition-all flex items-center justify-center gap-3 mt-8 shadow-lg shadow-indigo-600/10 cursor-pointer disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="animate-spin" size={20} />
                          جاري تفعيل ملف الكابتن...
                        </>
                      ) : (
                        <>
                          تسجيل وتفعيل الطيار لبدء كسب الأرباح 🏍️
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
