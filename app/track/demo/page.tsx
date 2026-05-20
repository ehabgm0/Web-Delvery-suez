'use client';

import React from 'react';
import { addDoc, collection, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Loader2, Play, Info } from 'lucide-react';

const SUEZ_CENTER = { lat: 29.9668, lng: 32.5498 };
const SAMPLE_DESTINATION = { lat: 29.9800, lng: 32.5300 };

export default function DemoTrackingPage() {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const startDemo = async () => {
    setLoading(true);
    try {
      // 1. Create a dummy order
      const orderData = {
        customerId: "demo-user",
        customerName: "عميل تجريبي",
        customerPhone: "01000000000",
        customerIsVip: true,
        status: "accepted",
        pickup: {
          lat: SUEZ_CENTER.lat,
          lng: SUEZ_CENTER.lng,
          address: "نقطة الاستلام (مثال: حي الأربعين)"
        },
        dropoff: {
          lat: SAMPLE_DESTINATION.lat,
          lng: SAMPLE_DESTINATION.lng,
          address: "نقطة التسليم (مثال: فيصل)"
        },
        captainId: "demo-captain",
        captainLocation: {
          lat: SUEZ_CENTER.lat - 0.002,
          lng: SUEZ_CENTER.lng - 0.002
        },
        details: "طلب تجريبي لتوضيح خاصية التتبع",
        initialPrice: 20,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      const docRef = await addDoc(collection(db, "orders"), orderData);
      
      // 2. Start simulation in background
      // Note: In a real app, this would be the captain's app updating the DB
      let currentLat = orderData.captainLocation.lat;
      let currentLng = orderData.captainLocation.lng;
      let stepCount = 0;

      const interval = setInterval(async () => {
        stepCount++;
        
        // Simple linear movement towards destination
        currentLat += (SAMPLE_DESTINATION.lat - currentLat) * 0.1;
        currentLng += (SAMPLE_DESTINATION.lng - currentLng) * 0.1;

        let newStatus = "accepted";
        if (stepCount > 10) newStatus = "picked_up";
        if (stepCount > 25) newStatus = "delivered";

        await updateDoc(doc(db, "orders", docRef.id), {
          captainLocation: { lat: currentLat, lng: currentLng },
          status: newStatus,
          updatedAt: serverTimestamp()
        });

        if (newStatus === "delivered" || stepCount > 30) {
          clearInterval(interval);
        }
      }, 3000);

      // 3. Redirect to the tracking page
      router.push(`/track/${docRef.id}`);
    } catch (error) {
      console.error("Error starting demo:", error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <main className="flex-1 pt-32 pb-20 px-6 flex items-center justify-center">
        <div className="max-w-2xl w-full bg-white rounded-[3.5rem] shadow-2xl p-12 text-center border border-slate-100">
           <div className="w-24 h-24 bg-brand/10 text-brand rounded-full flex items-center justify-center mx-auto mb-10">
              <Play size={48} className="fill-brand ml-2" />
           </div>
           <h1 className="text-4xl font-display font-black text-slate-900 mb-6 italic">تجربة التتبع الحي</h1>
           <p className="text-slate-500 mb-12 leading-relaxed text-lg">
             سيقوم النظام بإنشاء طلب وهمي وبدء محاكاة لتحرك الطيار في شوارع السويس.
             ستتمكن من رؤية كيف تظهر الخريطة والحالة للعملاء في الوقت الفعلي.
           </p>

           <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 flex flex-row-reverse items-start gap-4 mb-12 text-right">
              <Info className="text-blue-500 shrink-0 mt-1" size={24} />
              <p className="text-sm text-blue-700 leading-relaxed font-medium">
                بمجرد الضغط على البدء، سيتم توجيهك لصفحة التتبع. انتظر بضع ثوانٍ وستلاحظ تحرك أيقونة الطيار على الخريطة وتغير شريط الحالة تلقائياً.
              </p>
           </div>

           <button 
             onClick={startDemo}
             disabled={loading}
             className="w-full py-6 bg-slate-900 text-white rounded-[2rem] font-black text-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-4 shadow-2xl shadow-slate-900/20 disabled:opacity-50"
           >
             {loading ? <Loader2 className="animate-spin" size={32} /> : null}
             {loading ? 'جاري تجهيز المحاكاة...' : 'ابدأ التجربة الآن'}
           </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
