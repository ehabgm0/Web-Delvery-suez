'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  Terminal, 
  Code, 
  Play, 
  Send, 
  MapPin, 
  UserPlus, 
  Navigation, 
  Activity, 
  Copy, 
  CheckCircle, 
  HelpCircle, 
  Cpu, 
  Check, 
  Zap,
  RotateCw
} from 'lucide-react';
import Link from 'next/link';

export default function DeveloperPage() {
  const [activeTab, setActiveTab] = React.useState<'create-order' | 'track-order' | 'customer' | 'captain' | 'gps'>('create-order');
  const [apiKey, setApiKey] = React.useState('SUEZ-DELIVERY-PARTNER-2026');
  
  // Real-time API state results
  const [apiResponse, setApiResponse] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(false);
  const [copiedText, setCopiedText] = React.useState<string | null>(null);

  // Platform KPIs state
  const [stats, setStats] = React.useState<any>({
    onlineCaptains: 42,
    activeOrdersNow: 3,
    totalOrdersProcessed: 1483,
    completedOrders: 1450,
    successRate: '98.4%',
    averageDeliveryTimeMinutes: 18,
    platformLoad: 'normal'
  });
  const [statsLoading, setStatsLoading] = React.useState(false);

  // Form states
  // 1. Create order
  const [orderForm, setOrderForm] = React.useState({
    pickupAddress: 'السويس, مطعم الفتح وركن الغريب',
    pickupLat: 29.966,
    pickupLng: 32.549,
    dropoffAddress: 'السلام 2, عمارة 5 بجوار المسجد',
    dropoffLat: 29.972,
    dropoffLng: 32.532,
    details: 'علبة كشري حجم كبير + 2 بيبسي',
    customerName: 'أحمد محمود الغريب',
    customerPhone: '01002267920',
    expectedPrice: 15
  });

  // 2. Track order
  const [trackOrderId, setTrackOrderId] = React.useState('');

  // 3. Customer onboarding
  const [customerForm, setCustomerForm] = React.useState({
    phone: '01099887766',
    displayName: 'كريم صبري الشاطر',
    email: 'karim@example.com',
    initialBalance: 150
  });

  // 4. Captain onboarding
  const [captainForm, setCaptainForm] = React.useState({
    phone: '01233445566',
    displayName: 'الكابتن ممدوح السويسي',
    vehicleType: 'motorcycle',
    isOnline: true,
    status: 'approved'
  });

  // 5. GPS Stream
  const [gpsForm, setGpsForm] = React.useState({
    id: '01233445566',
    lat: 29.9662,
    lng: 32.5491,
    speed: 12.4,
    heading: 90
  });

  // Fetch updated stats from API
  const fetchStats = React.useCallback(async () => {
    setStatsLoading(true);
    try {
      const res = await fetch('/api/v1/stats', {
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      });
      const data = await res.json();
      if (data.success) {
        setStats(data.stats);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setStatsLoading(false);
    }
  }, [apiKey]);

  React.useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Submit handlers
  const handleCreateOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setApiResponse(null);
    try {
      const resp = await fetch('/api/v1/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          pickup: {
            lat: Number(orderForm.pickupLat),
            lng: Number(orderForm.pickupLng),
            address: orderForm.pickupAddress
          },
          dropoff: {
            lat: Number(orderForm.dropoffLat),
            lng: Number(orderForm.dropoffLng),
            address: orderForm.dropoffAddress
          },
          details: orderForm.details,
          customerName: orderForm.customerName,
          customerPhone: orderForm.customerPhone,
          expectedPrice: Number(orderForm.expectedPrice)
        })
      });
      const data = await resp.json();
      setApiResponse(data);
      if (data.success && data.orderId) {
        setTrackOrderId(data.orderId); // auto fill to track
      }
    } catch (error: any) {
      setApiResponse({ success: false, error: 'Request Failed', message: error.message });
    } finally {
      setLoading(false);
      fetchStats();
    }
  };

  const handleTrackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackOrderId) {
      alert('الرجاء إدخال رقم الطلبية أولاً للتتبع الفوري!');
      return;
    }
    setLoading(true);
    setApiResponse(null);
    try {
      const resp = await fetch(`/api/v1/orders/${trackOrderId}/status`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      });
      const data = await resp.json();
      setApiResponse(data);
    } catch (error: any) {
      setApiResponse({ success: false, error: 'Request Failed', message: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleCustomerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setApiResponse(null);
    try {
      const resp = await fetch('/api/v1/users/customer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(customerForm)
      });
      const data = await resp.json();
      setApiResponse(data);
    } catch (error: any) {
      setApiResponse({ success: false, error: 'Request Failed', message: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleCaptainSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setApiResponse(null);
    try {
      const resp = await fetch('/api/v1/users/captain', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(captainForm)
      });
      const data = await resp.json();
      setApiResponse(data);
      if (data.success) {
        setGpsForm(prev => ({ ...prev, id: captainForm.phone })); // auto fill GPS tracker phone
      }
    } catch (error: any) {
      setApiResponse({ success: false, error: 'Request Failed', message: error.message });
    } finally {
      setLoading(false);
      fetchStats();
    }
  };

  const handleGpsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setApiResponse(null);
    try {
      const resp = await fetch(`/api/v1/captains/${gpsForm.id}/location`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          lat: Number(gpsForm.lat),
          lng: Number(gpsForm.lng),
          speed: Number(gpsForm.speed),
          heading: Number(gpsForm.heading)
        })
      });
      const data = await resp.json();
      setApiResponse(data);
    } catch (error: any) {
      setApiResponse({ success: false, error: 'Request Failed', message: error.message });
    } finally {
      setLoading(false);
    }
  };

  // Get dynamic cURL code according to active tab
  const getCurlSnippet = () => {
    switch (activeTab) {
      case 'create-order':
        return `curl -X POST "https://delivery-suez.online/api/v1/orders" \\
  -H "Authorization: Bearer ${apiKey}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "pickup": { "lat": ${orderForm.pickupLat}, "lng": ${orderForm.pickupLng}, "address": "${orderForm.pickupAddress}" },
    "dropoff": { "lat": ${orderForm.dropoffLat}, "lng": ${orderForm.dropoffLng}, "address": "${orderForm.dropoffAddress}" },
    "details": "${orderForm.details}",
    "customerName": "${orderForm.customerName}",
    "customerPhone": "${orderForm.customerPhone}",
    "expectedPrice": ${orderForm.expectedPrice}
  }'`;
      case 'track-order':
        return `curl -X GET "https://delivery-suez.online/api/v1/orders/${trackOrderId || 'ORD-123456'}/status" \\
  -H "Authorization: Bearer ${apiKey}"`;
      case 'customer':
        return `curl -X POST "https://delivery-suez.online/api/v1/users/customer" \\
  -H "Authorization: Bearer ${apiKey}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "phone": "${customerForm.phone}",
    "displayName": "${customerForm.displayName}",
    "email": "${customerForm.email}",
    "initialBalance": ${customerForm.initialBalance}
  }'`;
      case 'captain':
        return `curl -X POST "https://delivery-suez.online/api/v1/users/captain" \\
  -H "Authorization: Bearer ${apiKey}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "phone": "${captainForm.phone}",
    "displayName": "${captainForm.displayName}",
    "vehicleType": "${captainForm.vehicleType}",
    "isOnline": ${captainForm.isOnline},
    "status": "${captainForm.status}"
  }'`;
      case 'gps':
        return `curl -X POST "https://delivery-suez.online/api/v1/captains/${gpsForm.id || 'CAPTAIN_PHONE'}/location" \\
  -H "Authorization: Bearer ${apiKey}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "lat": ${gpsForm.lat},
    "lng": ${gpsForm.lng},
    "speed": ${gpsForm.speed},
    "heading": ${gpsForm.heading}
  }'`;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-right font-sans">
      <Navbar />

      <main className="pt-32 pb-24 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main Title Section */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 bg-brand/10 text-brand px-4 py-1.5 rounded-full font-bold text-xs">
              <Cpu size={14} className="animate-spin" />
              منصة المطورين والربط المباشر لخدمات القناة
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-black text-slate-900 tracking-tight leading-none">
              بوابة الربط البرمجي <span className="text-brand">API Integration</span>
            </h1>
            <p className="text-slate-500 font-semibold text-sm leading-relaxed">
              قم بدمج تطبيق ديليفري السويس أونلاين في متجرك، مطعمك، أو نظامك اللوجستي لطلب كابتن توصيل فوري لموقع طلباتك عبر خدمات الـ API المؤمنة كلياً بالسويس.
            </p>
          </div>

          {/* Quick Stats Banner from stats endpoint */}
          <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white mb-12 shadow-xl shadow-slate-950/20 relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="text-right space-y-2">
                <div className="flex items-center gap-2 md:justify-end">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs text-brand font-black tracking-widest uppercase">مؤشرات شبكة التوصيل الفورية (Stats API)</span>
                </div>
                <h3 className="text-2xl font-display font-black">حالة الأسطول الميداني والطلبيات حالياً بالمدينة</h3>
              </div>
              
              <button 
                onClick={fetchStats}
                disabled={statsLoading}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold transition-all border border-white/10 cursor-pointer"
              >
                <RotateCw size={14} className={statsLoading ? "animate-spin" : ""} />
                تحديث الإحصائيات الفيدرالية
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10 relative z-10 border-t border-white/10 pt-8 text-center">
              <div className="space-y-1">
                <p className="text-white/50 text-xs font-bold">الطيارين النشطين (GPS)</p>
                <p className="text-3xl font-display font-black text-brand font-sans">{stats.onlineCaptains}</p>
              </div>
              <div className="space-y-1">
                <p className="text-white/50 text-xs font-bold">الطلبيات النشطة الآن</p>
                <p className="text-3xl font-display font-black text-white font-sans">{stats.activeOrdersNow}</p>
              </div>
              <div className="space-y-1">
                <p className="text-white/50 text-xs font-bold">إجمالي الطلبات المعالجة</p>
                <p className="text-3xl font-display font-black text-brand font-sans">{stats.totalOrdersProcessed}</p>
              </div>
              <div className="space-y-1">
                <p className="text-white/50 text-xs font-bold">متوسط وقت التوصيل</p>
                <p className="text-3xl font-display font-black text-white font-sans">{stats.averageDeliveryTimeMinutes} دقيقة</p>
              </div>
            </div>

            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-brand/10 rounded-full blur-[80px]" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Interactive Forms (Left Side - 7 Cols) */}
            <div className="lg:col-span-7 bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="flex gap-2 mb-8 border-b border-slate-100 pb-4 overflow-x-auto flex-row-reverse" dir="rtl">
                {[
                  { id: 'create-order', label: 'إنشاء طلب', icon: Send },
                  { id: 'track-order', label: 'تتبع كابتن بموقع', icon: Navigation },
                  { id: 'customer', label: 'بوابة العملاء', icon: UserPlus },
                  { id: 'captain', label: 'تسجيل الكابتن', icon: Activity },
                  { id: 'gps', label: 'بث GPS', icon: MapPin }
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id as any);
                        setApiResponse(null);
                      }}
                      className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shrink-0 transition-all cursor-pointer ${
                        activeTab === tab.id 
                          ? 'bg-brand text-white shadow-md shadow-brand/10' 
                          : 'bg-slate-50 text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                      }`}
                    >
                      <Icon size={14} />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* API KEY Credentials banner */}
              <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl mb-8 flex justify-between items-center flex-row-reverse text-right">
                <div>
                  <h4 className="font-bold text-amber-800 text-xs mb-0.5">مفتاح بروتوكول الشراكة (API Authorization Key)</h4>
                  <p className="text-slate-500 text-[11px] font-semibold">مفتاح الربط الافتراضي لشركاء ديليفري السويس لعمليات التوثيق الأمنية.</p>
                </div>
                <div className="flex items-center gap-2">
                  <input 
                    type="password" 
                    value={apiKey} 
                    onChange={(e) => setApiKey(e.target.value)}
                    className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 font-mono text-xs text-slate-800 focus:outline-brand text-center w-48"
                  />
                </div>
              </div>

              {/* Forms selection */}
              <div>
                
                {/* 1. CREATE DELIVERY ORDER */}
                {activeTab === 'create-order' && (
                  <form onSubmit={handleCreateOrderSubmit} className="space-y-6">
                    <div className="border-r-4 border-brand pr-3 mb-6">
                      <h3 className="text-lg font-display font-black text-slate-900">إنشاء طلب توصيل لوجستي فوري</h3>
                      <p className="text-xs text-slate-500 font-semibold">يقوم بنشر ومشاركة طلب التوصيل مباشرة لأسطول طيارين السويس لتبدأ المزايدة والقبول الفوري في أقل من 15 ثانية.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-slate-600">اسم العميل المستلم</label>
                        <input 
                          type="text" 
                          required
                          value={orderForm.customerName}
                          onChange={(e) => setOrderForm({...orderForm, customerName: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold focus:outline-brand"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-slate-600">رقم هاتف المستلم (السويس)</label>
                        <input 
                          type="text" 
                          required
                          value={orderForm.customerPhone}
                          onChange={(e) => setOrderForm({...orderForm, customerPhone: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono font-bold focus:outline-brand text-left"
                        />
                      </div>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-4">
                      <div className="space-y-1.5">
                        <span className="text-[10px] uppercase font-black text-brand tracking-widest block">نقطة الاستلام (Pickup)</span>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                          <input 
                            type="text" 
                            required
                            placeholder="العنوان ومكان المحل"
                            value={orderForm.pickupAddress}
                            onChange={(e) => setOrderForm({...orderForm, pickupAddress: e.target.value})}
                            className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold col-span-1 md:col-span-2"
                          />
                          <div className="flex gap-1">
                            <input 
                              type="number" 
                              step="any"
                              placeholder="موقع Lat"
                              value={orderForm.pickupLat}
                              onChange={(e) => setOrderForm({...orderForm, pickupLat: Number(e.target.value)})}
                              className="w-full bg-white border border-slate-200 rounded-lg px-2 py-2 text-xs font-mono font-bold text-center"
                            />
                            <input 
                              type="number" 
                              step="any"
                              placeholder="موقع Lng"
                              value={orderForm.pickupLng}
                              onChange={(e) => setOrderForm({...orderForm, pickupLng: Number(e.target.value)})}
                              className="w-full bg-white border border-slate-200 rounded-lg px-2 py-2 text-xs font-mono font-bold text-center"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <span className="text-[10px] uppercase font-black text-emerald-600 tracking-widest block">وجهة التسليم النهائية (Dropoff)</span>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                          <input 
                            type="text" 
                            required
                            placeholder="العنوان وعنوان العمارة"
                            value={orderForm.dropoffAddress}
                            onChange={(e) => setOrderForm({...orderForm, dropoffAddress: e.target.value})}
                            className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold col-span-1 md:col-span-2"
                          />
                          <div className="flex gap-1">
                            <input 
                              type="number" 
                              step="any"
                              placeholder="وجهة Lat"
                              value={orderForm.dropoffLat}
                              onChange={(e) => setOrderForm({...orderForm, dropoffLat: Number(e.target.value)})}
                              className="w-full bg-white border border-slate-200 rounded-lg px-2 py-2 text-xs font-mono font-bold text-center"
                            />
                            <input 
                              type="number" 
                              step="any"
                              placeholder="وجهة Lng"
                              value={orderForm.dropoffLng}
                              onChange={(e) => setOrderForm({...orderForm, dropoffLng: Number(e.target.value)})}
                              className="w-full bg-white border border-slate-200 rounded-lg px-2 py-2 text-xs font-mono font-bold text-center"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1.5 md:col-span-2">
                        <label className="block text-xs font-bold text-slate-600">تفاصيل الطلبية والمنتج الموصول</label>
                        <input 
                          type="text" 
                          required
                          value={orderForm.details}
                          onChange={(e) => setOrderForm({...orderForm, details: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold focus:outline-brand"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-slate-600">السعر المتوقع للتوصيل (EGP)</label>
                        <input 
                          type="number" 
                          required
                          value={orderForm.expectedPrice}
                          onChange={(e) => setOrderForm({...orderForm, expectedPrice: Number(e.target.value)})}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono font-bold focus:outline-brand text-center"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 bg-brand text-white text-xs font-black rounded-xl hover:scale-102 transition-all shadow-md shadow-brand/10 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <Send size={14} className="fill-white" />
                      {loading ? 'إرسال طلب التوصيل للخادم الميداني...' : 'إرسال الطلب وحجز طيار فوري 📣'}
                    </button>
                  </form>
                )}

                {/* 2. TRACK ORDER */}
                {activeTab === 'track-order' && (
                  <form onSubmit={handleTrackSubmit} className="space-y-6">
                    <div className="border-r-4 border-brand pr-3 mb-6">
                      <h3 className="text-lg font-display font-black text-slate-900">تتبع الطلبية وموقع الكابتن الجغرافي</h3>
                      <p className="text-xs text-slate-500 font-semibold">استرجع تفاصيل الطلب الفورية، إحداثيات الكابتن (lat, lng)، السرعة والاتجاه بدقة متناهية من ألسيرفر.</p>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-slate-600">رقم معرف الطلب (Order ID)</label>
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          required
                          placeholder="مثال: ORD-145214"
                          value={trackOrderId}
                          onChange={(e) => setTrackOrderId(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-mono font-bold focus:outline-brand text-left"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 bg-slate-900 text-white text-xs font-black rounded-xl hover:scale-102 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <Navigation size={14} />
                      {loading ? 'استدعاء إشارات وتحديثات الموقع...' : 'الاستعلام الفوري لبيانات التتبع الجغرافية 🛰️'}
                    </button>
                  </form>
                )}

                {/* 3. REGISTER & CHARGE CUSTOMER */}
                {activeTab === 'customer' && (
                  <form onSubmit={handleCustomerSubmit} className="space-y-6">
                    <div className="border-r-4 border-brand pr-3 mb-6">
                      <h3 className="text-lg font-display font-black text-slate-900">إنشاء / شحن محفظة عميل شريك</h3>
                      <p className="text-xs text-slate-500 font-semibold">تتيح لمنصتك المزامنة وتسجيل مستخدميك وتحديث رصيد محافظهم بالجنيه المصري EGP فورا وبسهولة.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-slate-600">رقم الهاتف الذكي للعميل</label>
                        <input 
                          type="text" 
                          required
                          maxLength={11}
                          placeholder="مثال: 01099887766"
                          value={customerForm.phone}
                          onChange={(e) => setCustomerForm({...customerForm, phone: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono font-bold focus:outline-brand text-left"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-slate-600 font-sans">الاسم الكامل للعميل</label>
                        <input 
                          type="text" 
                          required
                          value={customerForm.displayName}
                          onChange={(e) => setCustomerForm({...customerForm, displayName: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold focus:outline-brand"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-slate-600">البريد الإلكتروني للعميل</label>
                        <input 
                          type="email" 
                          value={customerForm.email}
                          onChange={(e) => setCustomerForm({...customerForm, email: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono font-bold focus:outline-brand text-left"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-slate-600">الرصيد المضاف (EGP)</label>
                        <input 
                          type="number" 
                          required
                          value={customerForm.initialBalance}
                          onChange={(e) => setCustomerForm({...customerForm, initialBalance: Number(e.target.value)})}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono font-bold focus:outline-brand text-center"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 bg-brand text-white text-xs font-black rounded-xl hover:scale-102 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <UserPlus size={14} />
                      {loading ? 'مزامنة المحفظة والبيانات...' : 'شحن الحساب وتفعيل المحفظة بالرصيد المالي 💳'}
                    </button>
                  </form>
                )}

                {/* 4. ONBOARD CAPTAIN */}
                {activeTab === 'captain' && (
                  <form onSubmit={handleCaptainSubmit} className="space-y-6">
                    <div className="border-r-4 border-brand pr-3 mb-6">
                      <h3 className="text-lg font-display font-black text-slate-900">إدراج وتفعيل الطيارين الميدانيين</h3>
                      <p className="text-xs text-slate-500 font-semibold">يمكّن شركاء النقل اللوجستي من إرفاق كباتنهم وتفعيلهم فورياً في التطبيق ليروا خريطة طلبات السويس ويستلموها.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-slate-600">رقم الهاتف كابتن</label>
                        <input 
                          type="text" 
                          required
                          maxLength={11}
                          value={captainForm.phone}
                          onChange={(e) => setCaptainForm({...captainForm, phone: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono font-bold focus:outline-brand text-left"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-slate-600">اسم الكابتن المستلم بالكامل</label>
                        <input 
                          type="text" 
                          required
                          value={captainForm.displayName}
                          onChange={(e) => setCaptainForm({...captainForm, displayName: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold focus:outline-brand"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-slate-600">نوع وسيلة النقل</label>
                        <select 
                          value={captainForm.vehicleType}
                          onChange={(e) => setCaptainForm({...captainForm, vehicleType: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold focus:outline-brand"
                        >
                          <option value="motorcycle">سكوتر / دراجة نارية 🏍️</option>
                          <option value="scooter">سيارة صغيرة 🚗</option>
                          <option value="bicycle">عجلة / دراجة عادية 🚲</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-slate-600">أونلاين وجاهز؟</label>
                        <select 
                          value={captainForm.isOnline ? 'true' : 'false'}
                          onChange={(e) => setCaptainForm({...captainForm, isOnline: e.target.value === 'true'})}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold focus:outline-brand"
                        >
                          <option value="true">نشط ومتصل حالياً 🟢</option>
                          <option value="false">أوفلاين وغير متصل 🛑</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-slate-600">حالة التفعيل والقبول</label>
                        <select 
                          value={captainForm.status}
                          onChange={(e) => setCaptainForm({...captainForm, status: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-200 rounded-[12px] px-4 py-2.5 text-xs font-bold focus:outline-brand"
                        >
                          <option value="approved">مفعل وبإمكانه استقبال طلبات السويس immédiatement</option>
                          <option value="pending">في انتظار المراجعة ورفع المستندات</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 bg-slate-900 text-white text-xs font-black rounded-xl hover:scale-102 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <Activity size={14} />
                      {loading ? 'تسجيل وتجهيز الطيار الفريد بالمنصة...' : 'تفعيل الكابتن وتثبيته بأسطول دليفري السويس الميداني ✅'}
                    </button>
                  </form>
                )}

                {/* 5. GPS LOCATION STREAM */}
                {activeTab === 'gps' && (
                  <form onSubmit={handleGpsSubmit} className="space-y-6">
                    <div className="border-r-4 border-brand pr-3 mb-6">
                      <h3 className="text-lg font-display font-black text-slate-900">البث الفوري للمواقع (Stream GPS Signal)</h3>
                      <p className="text-xs text-slate-500 font-semibold">إذا كان الكباتن أو شركاؤك يستخدمون أجهزة تتبع خارجية أو برمجيات مخصصة، يمكنك بث موقعهم وتحديث سرعتهم بالسرعة والزاوية فورياً.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-slate-600">معرّف/هاتف الكابتن (Captain ID)</label>
                        <input 
                          type="text" 
                          required
                          maxLength={11}
                          value={gpsForm.id}
                          onChange={(e) => setGpsForm({...gpsForm, id: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono font-bold focus:outline-brand text-left"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-slate-600">خط عرض الكابتن البث (Latitude)</label>
                        <input 
                          type="number" 
                          step="any"
                          required
                          value={gpsForm.lat}
                          onChange={(e) => setGpsForm({...gpsForm, lat: Number(e.target.value)})}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono font-bold focus:outline-brand"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-slate-600">خط طول الكابتن البث (Longitude)</label>
                        <input 
                          type="number" 
                          step="any"
                          required
                          value={gpsForm.lng}
                          onChange={(e) => setGpsForm({...gpsForm, lng: Number(e.target.value)})}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono font-bold focus:outline-brand"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-slate-600">السرعة الحالية (متر في الثانية)</label>
                        <input 
                          type="number" 
                          step="any"
                          required
                          value={gpsForm.speed}
                          onChange={(e) => setGpsForm({...gpsForm, speed: Number(e.target.value)})}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono font-bold focus:outline-brand text-center"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-slate-600">زاوية الاتجاه الجغرافي (Heading)</label>
                        <input 
                          type="number" 
                          required
                          value={gpsForm.heading}
                          onChange={(e) => setGpsForm({...gpsForm, heading: Number(e.target.value)})}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono font-bold focus:outline-brand text-center"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 bg-brand text-white text-xs font-black rounded-xl hover:scale-102 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <MapPin size={14} className="fill-white" />
                      {loading ? 'إرسال بيانات الموقع للقرص الذكي...' : 'بث إشارة الإحداثيات والاتجاه الفعلي على الخريطة 🛰️🏍️'}
                    </button>
                  </form>
                )}

              </div>

              {/* AJAX Live Response Output Panel */}
              {apiResponse && (
                <div className="mt-8 border-t border-slate-100 pt-8 animate-fade-in text-left">
                  <div className="flex justify-between items-center mb-3 flex-row-reverse" dir="rtl">
                    <h4 className="font-display font-black text-xs text-slate-900 flex items-center gap-2">
                      <Terminal size={14} className="text-brand" />
                      نتيجة الاستجابة من خادم ديليفري السويس (API Response)
                    </h4>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${apiResponse.success ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                      {apiResponse.success ? 'HTTP 200 OK' : 'HTTP Error'}
                    </span>
                  </div>

                  <pre className="p-4 bg-slate-950 font-mono text-xs text-emerald-400 rounded-2xl overflow-x-auto select-all max-h-72 shadow-inner leading-relaxed">
                    {JSON.stringify(apiResponse, null, 2)}
                  </pre>

                  {apiResponse.success && apiResponse.trackingUrl && (
                    <div className="mt-4 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex justify-between items-center flex-row-reverse text-right" dir="rtl">
                      <div>
                        <h5 className="font-bold text-emerald-800 text-xs mb-0.5">تم تسجيل وحجز طلبيتك بنجاح!</h5>
                        <p className="text-[11px] text-slate-600 font-medium">بإمكانك مشاركة الكود {apiResponse.orderId} أو تتبع الطلبية تلقائياً في خريطة التتبع المباشرة للعميل دون تسجيل الدخول.</p>
                      </div>
                      <a 
                        href={`/track/${apiResponse.orderId}`} 
                        target="_blank"
                        className="px-4 py-2 bg-emerald-600 text-white font-bold text-[11px] rounded-lg hover:bg-emerald-700 transition-all cursor-pointer"
                      >
                        فتح رابط التتبع التفاعلي 🛰️
                      </a>
                    </div>
                  )}
                </div>
              )}

            </div>

            {/* API Codes & cURL Snippets (Right Side - 5 Cols) */}
            <div className="lg:col-span-5 space-y-8">
              
              {/* Token & Config Block */}
              <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-sm">
                <span className="text-[10px] uppercase font-black text-brand tracking-widest block mb-2">تعليمات الربط وتوثيق المطورين</span>
                <h3 className="text-xl font-display font-black mb-4">بيئة التطوير والاختبار (Sandbox)</h3>
                
                <p className="text-white/60 text-xs leading-relaxed font-semibold mb-6">
                  نوفر لكم بوابة مطورين مطابقة تماماً لنظام الإنتاج الفعلي. لعمليات التوثيق الأمنية، يرجى دائماً إرسال مفتاح الـ API كترويسة بروتوكول HTTP في كافة طلباتكم.
                </p>

                <div className="bg-black/50 p-4 rounded-2xl border border-white/5 space-y-2.5 text-xs font-mono text-left">
                  <div className="flex justify-between items-center text-[10px] text-white/40">
                    <span>Target Endpoint Target</span>
                    <span>HTTPS Method</span>
                  </div>
                  <div className="font-bold text-white flex justify-between items-center text-[11px]">
                    <span className="text-slate-200">/api/v1/orders</span>
                    <span className="text-emerald-400 font-bold uppercase">POST</span>
                  </div>
                  <div className="font-bold text-white flex justify-between items-center text-[11px] border-t border-white/5 pt-2">
                    <span className="text-slate-200">/api/v1/orders/:id/status</span>
                    <span className="text-amber-400 font-bold uppercase">GET</span>
                  </div>
                  <div className="font-bold text-white flex justify-between items-center text-[11px] border-t border-white/5 pt-2">
                    <span className="text-slate-200">/api/v1/users/customer</span>
                    <span className="text-emerald-400 font-bold uppercase">POST</span>
                  </div>
                  <div className="font-bold text-white flex justify-between items-center text-[11px] border-t border-white/5 pt-2">
                    <span className="text-slate-200">/api/v1/users/captain</span>
                    <span className="text-emerald-400 font-bold uppercase">POST</span>
                  </div>
                  <div className="font-bold text-white flex justify-between items-center text-[11px] border-t border-white/5 pt-2">
                    <span className="text-slate-200">/api/v1/captains/:id/location</span>
                    <span className="text-emerald-400 font-bold uppercase">POST</span>
                  </div>
                </div>
              </div>

              {/* cURL Interactive Snippet Generator */}
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm relative">
                <div className="flex justify-between items-center mb-4 flex-row-reverse" dir="rtl">
                  <div>
                    <h3 className="font-display font-black text-slate-950 text-base">نموذج الطلب التفاعلي (cURL Query)</h3>
                    <p className="text-slate-400 text-[10px] font-semibold">بإمكانك نسخ الكود واستخدامه فوراً في مبنى المطورين الخاص بك.</p>
                  </div>
                  <button 
                    onClick={() => handleCopy(getCurlSnippet() || '', 'curl')}
                    className="p-2.5 bg-slate-50 hover:bg-slate-100 text-slate-500 rounded-xl transition-colors cursor-pointer"
                  >
                    {copiedText === 'curl' ? <Check size={16} className="text-emerald-600 font-bold" /> : <Copy size={16} />}
                  </button>
                </div>

                <div className="relative">
                  <pre className="p-4 bg-slate-950 text-[11px] font-mono text-slate-300 rounded-2xl overflow-x-auto overflow-y-auto leading-relaxed max-h-80 select-all scrollbar-thin scrollbar-thumb-slate-800">
                    {getCurlSnippet()}
                  </pre>
                </div>
              </div>

              {/* Node.js Fetch Code integration */}
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                <div className="flex justify-between items-center mb-4 flex-row-reverse" dir="rtl">
                  <div>
                    <h3 className="font-display font-black text-slate-950 text-base">نموذج الربط (Node.js Fetch)</h3>
                    <p className="text-slate-400 text-[10px] font-semibold">تثبيت فوري واستهلاك سريع للخدمة ببرمجة جافا سكريبت.</p>
                  </div>
                  <button 
                    onClick={() => handleCopy(`const apiKey = "${apiKey}";
const response = await fetch("https://delivery-suez.online/api/v1/orders", {
  method: "POST",
  headers: {
    "Authorization": "Bearer " + apiKey,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    pickup: { lat: 29.966, lng: 32.549, address: "السويس, مطعم الفتح" },
    dropoff: { lat: 29.972, lng: 32.532, address: "السلام 2, عمارة 5" },
    details: "اوردر عشا سريع",
    customerName: "أحمد محمود",
    customerPhone: "0100000000",
    expectedPrice: 15
  })
});
const data = await response.json();
console.log(data);`, 'js')}
                    className="p-2.5 bg-slate-50 hover:bg-slate-100 text-slate-500 rounded-xl transition-colors cursor-pointer"
                  >
                    {copiedText === 'js' ? <Check size={16} className="text-emerald-600 font-bold" /> : <Copy size={16} />}
                  </button>
                </div>

                <pre className="p-4 bg-slate-950 text-[11px] font-mono text-slate-400 rounded-2xl overflow-x-auto leading-relaxed max-h-72 select-all overflow-y-auto">
{`const apiKey = "${apiKey}";
const response = await fetch("https://delivery-suez.online/api/v1/orders", {
  method: "POST",
  headers: {
    "Authorization": "Bearer " + apiKey,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    pickup: { lat: 29.966, lng: 32.549, address: "السويس" },
    dropoff: { lat: 29.972, lng: 32.532, address: "السلام 2" },
    details: "اوردر عشا سريع",
    customerName: "أحمد محمود",
    customerPhone: "0100000000",
    expectedPrice: 15
  })
});
const data = await response.json();
console.log(data);`}
                </pre>
              </div>

            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
