'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { doc, onSnapshot } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '@/lib/firebase';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TrackingMap from '@/components/TrackingMap';
import { Truck, MapPin, Package, CheckCircle2, Phone, MessageCircle, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';

interface Order {
  id: string;
  status: 'searching' | 'accepted' | 'picked_up' | 'delivered' | 'cancelled';
  customerId: string;
  customerName: string;
  pickup: { lat: number; lng: number; address: string };
  dropoff: { lat: number; lng: number; address: string };
  captainId?: string;
  captainLocation?: { lat: number; lng: number };
  details: string;
  initialPrice: number;
}

export default function TrackingPage() {
  const { orderId } = useParams();
  const router = useRouter();
  const [order, setOrder] = React.useState<Order | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!orderId) return;

    const orderRef = doc(db, 'orders', orderId as string);
    const unsubscribe = onSnapshot(orderRef, (snapshot) => {
      if (snapshot.exists()) {
        setOrder({ id: snapshot.id, ...snapshot.data() } as Order);
        setError(null);
      } else {
        setError('الطلب غير موجود أو تم حذفه.');
      }
      setLoading(false);
    }, (err) => {
      handleFirestoreError(err, OperationType.GET, `orders/${orderId}`);
      setError('حدث خطأ أثناء تحميل بيانات الطلب.');
      setLoading(false);
    });

    return () => unsubscribe();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="animate-spin text-brand" size={48} />
          <p className="text-slate-600 font-bold">جاري تحميل بيانات التتبع...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="bg-white p-12 rounded-[3.5rem] shadow-xl text-center max-w-md w-full border border-slate-100">
            <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-8">
              <Package size={40} />
            </div>
            <h1 className="text-2xl font-black text-slate-900 mb-4 italic">عذراً، لم نجد طلبك</h1>
            <p className="text-slate-500 mb-10 leading-relaxed font-medium">{error || 'من فضلك تأكد من رقم الطلب الصحيح.'}</p>
            <Link href="/" className="inline-flex items-center gap-2 px-8 py-4 bg-brand text-white rounded-2xl font-black hover:scale-105 transition-all">
              الرجوع للرئيسية
              <ArrowRight size={20} />
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const steps = [
    { id: 'searching', label: 'جاري البحث', icon: Loader2 },
    { id: 'accepted', label: 'تم القبول', icon: CheckCircle2 },
    { id: 'picked_up', label: 'تم الاستلام', icon: Package },
    { id: 'delivered', label: 'تم التوصيل', icon: Truck },
  ];

  const currentStepIndex = steps.findIndex(s => s.id === order.status);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 h-full min-h-[600px]">
          
          {/* Left Side: Map Container */}
          <div className="lg:col-span-8 h-[500px] lg:h-full min-h-[500px]">
             <TrackingMap 
                pickup={order.pickup}
                dropoff={order.dropoff}
                captainLocation={order.captainLocation}
                status={order.status}
             />
          </div>

          {/* Right Side: Order Details */}
          <div className="lg:col-span-4 flex flex-col gap-6 text-right">
            
            {/* Status Card */}
            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-100">
               <div className="flex justify-between items-center mb-10 flex-row-reverse">
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">رقم الطلب</p>
                    <p className="font-mono font-bold text-slate-900">#{order.id.slice(0, 8).toUpperCase()}</p>
                  </div>
                  <div className={`px-4 py-2 rounded-xl text-xs font-black italic italic ${order.status === 'delivered' ? 'bg-green-100 text-green-600' : 'bg-brand/10 text-brand'}`}>
                    {steps[currentStepIndex]?.label || 'جارٍ التجهيز'}
                  </div>
               </div>

               {/* Timeline */}
               <div className="relative mb-10">
                  <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2" />
                  <div 
                    className="absolute top-1/2 left-0 h-1 bg-brand -translate-y-1/2 transition-all duration-1000" 
                    style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
                  />
                  <div className="relative flex justify-between items-center">
                    {steps.map((step, i) => {
                      const Icon = step.icon;
                      const isActive = i <= currentStepIndex;
                      return (
                        <div key={step.id} className="flex flex-col items-center gap-3">
                           <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-lg transition-all ${isActive ? 'bg-brand text-white scale-110' : 'bg-slate-200 text-slate-400'}`}>
                              <Icon size={16} className={step.id === 'searching' && isActive ? 'animate-spin' : ''} />
                           </div>
                           <span className={`text-[10px] font-black ${isActive ? 'text-slate-900' : 'text-slate-400'}`}>{step.label}</span>
                        </div>
                      );
                    })}
                  </div>
               </div>

               <div className="space-y-6">
                  <div className="flex items-start gap-4 flex-row-reverse">
                    <div className="p-3 bg-green-50 text-green-600 rounded-2xl">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">مكان الاستلام</p>
                      <p className="font-bold text-slate-900">{order.pickup.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 flex-row-reverse">
                    <div className="p-3 bg-red-50 text-red-500 rounded-2xl">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">مكان التسليم</p>
                      <p className="font-bold text-slate-900">{order.dropoff.address}</p>
                    </div>
                  </div>
               </div>
            </div>

            {/* Captain Info Card */}
            {order.captainId && (
               <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden">
                  <div className="relative z-10">
                    <h3 className="text-xl font-display font-black mb-6 italic italic">بيانات الطيار</h3>
                    <div className="flex items-center gap-4 flex-row-reverse mb-8">
                       <div className="w-16 h-16 bg-brand rounded-full flex items-center justify-center text-3xl font-black italic">
                          {order.captainId.slice(0, 1).toUpperCase()}
                       </div>
                       <div>
                          <p className="font-bold text-xl mb-1">كابتن النقل</p>
                          <div className="flex items-center gap-1 text-slate-400 text-xs flex-row-reverse">
                             <span className="text-brand">â˜… 4.9</span>
                             <span>(120 رحلة)</span>
                          </div>
                       </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                       <button className="flex-1 py-4 bg-white/10 hover:bg-white/20 rounded-2xl flex items-center justify-center gap-3 transition-all">
                          <MessageCircle size={20} />
                          <span className="font-bold">مراسلة</span>
                       </button>
                       <button className="flex-1 py-4 bg-brand hover:bg-brand-dark rounded-2xl flex items-center justify-center gap-3 transition-all text-slate-900 group">
                          <Phone size={20} />
                          <span className="font-bold group-hover:scale-105 transition-transform">اتصال</span>
                       </button>
                    </div>
                  </div>
                  <Truck className="absolute -bottom-10 -left-10 text-white/5 rotate-12" size={200} />
               </div>
            )}

            {!order.captainId && order.status === 'searching' && (
               <div className="bg-brand/10 border border-brand/20 rounded-[2.5rem] p-8 text-center">
                  <Loader2 className="animate-spin text-brand mx-auto mb-4" size={40} />
                  <p className="font-bold text-slate-900">نحن نبحث عن طيار قريب منك...</p>
                  <p className="text-xs text-slate-500 mt-2">عادة ما يتم القبول في خلال أقل من دقيقتين.</p>
               </div>
            )}

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
