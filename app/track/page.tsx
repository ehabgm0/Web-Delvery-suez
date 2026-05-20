'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Search, Package, ArrowLeft, ShieldCheck, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function OrderSearchPage() {
  const [orderId, setOrderId] = React.useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId.trim()) {
      router.push(`/track/${orderId.trim()}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-[3.5rem] shadow-2xl overflow-hidden grid md:grid-cols-2">
            
            {/* Left side: Form */}
            <div className="p-12 text-right">
              <div className="w-16 h-16 bg-brand/10 text-brand rounded-2xl flex items-center justify-center mb-8">
                <Package size={32} />
              </div>
              <h1 className="text-4xl font-display font-black text-slate-900 mb-4 italic">تتبع طلبك</h1>
              <p className="text-slate-500 mb-10 leading-relaxed font-medium">أدخل رقم الطلب الذي استلمته في رسالة التأكيد لمتابعة حالة التوصيل وموقع الطيار في الوقت الفعلي.</p>

              <form onSubmit={handleSearch} className="space-y-4">
                <div className="relative">
                  <input 
                    type="text" 
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    placeholder="رقم الطلب (مثال: x7R9k2...)"
                    className="w-full px-8 py-5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-brand focus:ring-4 focus:ring-brand/10 outline-none transition-all font-mono font-bold text-lg text-right"
                  />
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
                </div>
                <button 
                  type="submit"
                  className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-3 animate-in fade-in slide-in-from-bottom-2"
                >
                  <Search size={24} />
                  ابحث الآن
                </button>
              </form>

              <div className="mt-12 pt-8 border-t border-slate-100 flex items-center gap-4 flex-row-reverse text-slate-400">
                <ShieldCheck size={20} className="text-green-500" />
                <span className="text-xs font-bold">تتبع آمن ومشفر بنسبة 100%</span>
              </div>
            </div>

            {/* Right side: Visual */}
            <div className="bg-slate-900 relative hidden md:block overflow-hidden">
               <div className="absolute inset-0 bg-brand/20 blur-[100px] -top-20 -right-20 rounded-full" />
               <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center text-white">
                  <div className="w-full aspect-square relative mb-8">
                     <div className="absolute inset-0 border-4 border-dashed border-white/10 rounded-full animate-spin-slow" />
                     <div className="absolute inset-0 flex items-center justify-center">
                        <MapPin size={80} className="text-brand animate-bounce" />
                     </div>
                  </div>
                  <h3 className="text-2xl font-black italic mb-4">خريطة حية</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">شاهد الطيار وهو يتحرك في شوارع السويس لحظة بلحظة حتى يصل إلى باب منزلك.</p>
               </div>
               
               {/* Decorative dots */}
               <div className="absolute bottom-10 left-10 grid grid-cols-5 gap-2 opacity-20">
                 {[...Array(15)].map((_, i) => (
                    <div key={i} className="w-1 h-1 bg-white rounded-full" />
                 ))}
               </div>
            </div>

          </div>

          {/* Quick Demo Button */}
          <div className="mt-12 text-center">
             <Link href="/track/demo" className="text-brand font-black hover:underline underline-offset-4">
                ألا تملك رقم طلب؟ جرب التتبع التجريبي (Demo)
             </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
