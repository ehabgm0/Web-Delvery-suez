'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LogIn, 
  UserPlus, 
  Truck, 
  User, 
  Mail, 
  Lock, 
  Github, 
  Chrome, 
  ChevronLeft,
  Smartphone,
  CheckCircle2
} from 'lucide-react';
import { auth, db, handleFirestoreError, OperationType } from '@/lib/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

function AuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRole = searchParams.get('role') || 'customer';
  
  const [isLogin, setIsLogin] = React.useState(true);
  const [role, setRole] = React.useState(initialRole === 'driver' ? 'captain' : initialRole);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const generateReferral = () => Math.random().toString(36).substring(2, 8).toUpperCase();

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');
    const provider = new GoogleAuthProvider();
    
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      // Check if user exists in Firestore
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);
      
      if (!userSnap.exists()) {
        const referralCode = generateReferral();
        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          role: role,
          phone: "",
          walletBalance: 0,
          myReferralCode: referralCode,
          status: role === 'captain' ? 'pending' : 'active',
          isOnline: role === 'captain' ? false : undefined,
          isVip: role === 'customer' ? false : undefined,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        };

        await setDoc(userRef, userData);
      }
      
      router.push('/');
    } catch (err: any) {
      setError(err.message);
      handleFirestoreError(err, OperationType.WRITE, 'users');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[3.5rem] shadow-2xl overflow-hidden border border-slate-100">
      
      {/* Left panel: Info */}
      <div className="bg-slate-900 text-white p-12 md:p-20 relative overflow-hidden flex flex-col justify-between text-right order-2 lg:order-1">
        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl font-display font-black mb-8 italic italic">
            انضم لعائلة <br />
            <span className="text-brand">ديليفري السويس</span>
          </h2>
          <p className="text-slate-400 text-lg mb-12 leading-relaxed font-medium">
            سواء كنت عميلاً يبحث عن أسرع توصيل، أو طياراً يبحث عن دخل ممتاز، نحن نرحب بك في منصتنا الرائدة بمدينة السويس.
          </p>
          
          <ul className="space-y-6">
            {[
              'تغطية شاملة لجميع أحياء السويس.',
              'نظام أمان وحماية فائق للبيانات والطلبات.',
              'دعم فني مباشر على مدار الساعة.',
              'عروض وخصومات حصرية للأعضاء.'
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-4 flex-row-reverse text-right">
                <CheckCircle2 className="text-brand shrink-0" size={24} />
                <span className="font-bold text-slate-200">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mt-16 pt-12 border-t border-white/10 relative z-10">
          <div className="flex items-center gap-4 flex-row-reverse">
            <div className="p-3 bg-white/10 rounded-2xl text-brand">
              <Smartphone size={24} />
            </div>
            <div>
              <p className="font-bold text-white tracking-tight">استخدم التطبيق دائماً</p>
              <p className="text-slate-500 text-sm italic">تجربة أفضل، أسرع، وأسهل.</p>
            </div>
          </div>
        </div>

        {/* Decorative background */}
        <div className="absolute top-0 right-0 w-full h-full opacity-5 hover:opacity-10 transition-opacity">
          <Truck size={600} className="absolute -bottom-20 -left-40 rotate-[30deg]" />
        </div>
      </div>

      {/* Right panel: Form */}
      <div className="p-10 md:p-20 flex flex-col justify-center order-1 lg:order-2 text-right">
        <div className="mb-12">
          <div className="flex p-1 bg-slate-100 rounded-2xl mb-10 overflow-hidden">
            <button 
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 text-sm font-black rounded-xl transition-all ${isLogin ? 'bg-white shadow-xl text-brand' : 'text-slate-500'}`}
            >
              تسجيل دخول
            </button>
            <button 
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 text-sm font-black rounded-xl transition-all ${!isLogin ? 'bg-white shadow-xl text-brand' : 'text-slate-500'}`}
            >
              حساب جديد
            </button>
          </div>

          {!isLogin && (
            <div className="mb-10 text-right">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">أريد التسجيل كـ:</p>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => setRole('customer')}
                  className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${role === 'customer' ? 'border-brand bg-brand/5' : 'border-slate-100 hover:border-slate-200'}`}
                >
                  <User size={24} className={role === 'customer' ? 'text-brand' : 'text-slate-400'} />
                  <span className={`font-bold text-sm ${role === 'customer' ? 'text-brand' : 'text-slate-600'}`}>عميل</span>
                </button>
                <button 
                  onClick={() => setRole('captain')}
                  className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${role === 'captain' ? 'border-brand bg-brand/5' : 'border-slate-100 hover:border-slate-200'}`}
                >
                  <Truck size={24} className={role === 'captain' ? 'text-brand' : 'text-slate-400'} />
                  <span className={`font-bold text-sm ${role === 'captain' ? 'text-brand' : 'text-slate-600'}`}>طيار</span>
                </button>
              </div>
            </div>
          )}

          <h3 className="text-3xl font-display font-black text-slate-900 mb-2 italic">
            {isLogin ? 'أهلاً بك مجدداً!' : 'ابدأ رحلتك معنا'}
          </h3>
          <p className="text-slate-500 mb-10 font-medium">سجل دخولك الآن للوصول لكافة خدماتنا بالسويس.</p>

          <div className="space-y-4">
            <button 
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full py-4 bg-white border-2 border-slate-100 text-slate-900 rounded-2xl font-bold flex items-center justify-center gap-4 hover:border-brand/20 hover:bg-slate-50 transition-all group active:scale-95 disabled:opacity-50"
            >
              <Chrome size={24} className="text-slate-800" />
              {loading ? 'جاري التحميل...' : 'المتابعة عبر حساب Google'}
            </button>
          </div>

          <div className="relative my-10 text-center">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
            <span className="relative px-6 bg-white text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">أو عبر رقم الهاتف</span>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-2 pr-2">رقم الهاتف</label>
              <input 
                type="tel" 
                placeholder="01xxxxxxxxx"
                dir="ltr"
                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-brand focus:ring-4 focus:ring-brand/5 transition-all text-slate-900 font-bold"
              />
            </div>
            <button 
              disabled
              className="w-full py-5 bg-slate-950 text-white rounded-2xl font-black text-xl hover:bg-slate-800 transition-all opacity-50 cursor-not-allowed"
            >
              {isLogin ? 'دخول' : 'إنشاء حساب'}
            </button>
          </div>

          {error && <p className="mt-6 text-center text-red-500 text-sm font-bold tracking-tight">{error}</p>}
        </div>
        
        <p className="text-center text-sm text-slate-400 font-medium leading-relaxed">
          باستخدامك لمنصة ديليفري السويس أونلاين، أنت توافق على <br /> 
          <Link href="/terms" className="text-slate-900 font-bold underline">شروط الخدمة</Link> و <Link href="/privacy" className="text-slate-900 font-bold underline">سياسة الخصوصية</Link>.
        </p>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center pt-32 pb-20 px-4">
        <React.Suspense fallback={<div className="text-center py-20">جاري التحميل...</div>}>
          <AuthContent />
        </React.Suspense>
      </main>

      <Footer />
    </div>
  );
}
