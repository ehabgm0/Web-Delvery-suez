'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  Zap, 
  MapPin, 
  Truck, 
  User, 
  PlusCircle, 
  Coins, 
  TrendingUp, 
  Navigation, 
  ChevronLeft, 
  Play, 
  LogOut, 
  AlertCircle,
  Bell,
  CheckCircle,
  Clock,
  HeartPulse,
  Apple,
  ShoppingCart,
  RefreshCw,
  ExternalLink,
  Key,
  Phone,
  ShieldCheck,
  Cpu,
  Smartphone,
  Globe,
  Plus,
  Trash2,
  Lock,
  ArrowUpLeft
} from 'lucide-react';
import { AREAS, SERVICES } from '@/lib/constants';

interface Order {
  id: string;
  customerName: string;
  sourceArea: string;
  destinationArea: string;
  serviceType: string;
  price: number;
  status: 'pending' | 'accepted' | 'delivered';
  captainId?: string;
  captainName?: string;
  createdAt: string;
  phone: string;
}

interface UserSession {
  name: string;
  phone: string;
  role: 'customer' | 'captain' | 'vendor';
  area: string;
}

export default function Webview() {
  // Top level mode: 'live_app' (displaying actual site) or 'simulator' (interactive system) or 'api_playground'
  const [activePortal, setActivePortal] = React.useState<'live_app' | 'simulator' | 'api_playground'>('live_app');
  
  // Playground states
  const [playPickupLat, setPlayPickupLat] = React.useState(29.966);
  const [playPickupLng, setPlayPickupLng] = React.useState(32.549);
  const [playPickupAddress, setPlayPickupAddress] = React.useState('السويس, مطعم الفتح');
  
  const [playDropoffLat, setPlayDropoffLat] = React.useState(29.972);
  const [playDropoffLng, setPlayDropoffLng] = React.useState(32.532);
  const [playDropoffAddress, setPlayDropoffAddress] = React.useState('السلام 2, عمارة 5');
  
  const [playDetails, setPlayDetails] = React.useState('علبة كشري حجم كبير + 2 بيبسي');
  const [playCustomerName, setPlayCustomerName] = React.useState('أحمد محمود');
  const [playCustomerPhone, setPlayCustomerPhone] = React.useState('0100000000');
  const [playExpectedPrice, setPlayExpectedPrice] = React.useState(15);
  
  const [playgroundLoading, setPlaygroundLoading] = React.useState(false);
  const [playgroundResponse, setPlaygroundResponse] = React.useState<any>(null);
  const [createdPlaygroundOrderId, setCreatedPlaygroundOrderId] = React.useState('');
  
  const [statusLoading, setStatusLoading] = React.useState(false);
  const [statusResponse, setStatusResponse] = React.useState<any>(null);
  
  const [codeType, setCodeType] = React.useState<'curl' | 'nodejs' | 'python' | 'php'>('nodejs');

  const handleTestPostOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setPlaygroundLoading(true);
    setPlaygroundResponse(null);
    setCreatedPlaygroundOrderId('');
    setStatusResponse(null);

    const params = {
      pickup: { lat: playPickupLat, lng: playPickupLng, address: playPickupAddress },
      dropoff: { lat: playDropoffLat, lng: playDropoffLng, address: playDropoffAddress },
      details: playDetails,
      customerName: playCustomerName,
      customerPhone: playCustomerPhone,
      expectedPrice: Number(playExpectedPrice)
    };

    try {
      const res = await fetch("/api/v1/orders", {
        method: "POST",
        headers: {
          "Authorization": "Bearer SUEZ-DELIVERY-PARTNER-2026",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(params)
      });
      const data = await res.json();
      setPlaygroundResponse({
        status: `${res.status} ${res.statusText}`,
        headers: {
          "content-type": res.headers.get("content-type")
        },
        body: data
      });
      if (data.success && data.orderId) {
        setCreatedPlaygroundOrderId(data.orderId);
        showNotification(`🛸 برافو! تم حجز الطلب المالي الحقيقي برقم ${data.orderId} وتعبئته بالـ GPS!`);
      }
    } catch (err: any) {
      setPlaygroundResponse({
        error: "فشل الاتصال البرمجي بخادم دليفري السويس: " + err.message
      });
    } finally {
      setPlaygroundLoading(false);
    }
  };

  const handleTestGetStatus = async () => {
    if (!createdPlaygroundOrderId) {
      alert("يرجى إنشاء طلب أولاً لإجراء تتبع وحالة حقيقية!");
      return;
    }
    setStatusLoading(true);
    setStatusResponse(null);

    try {
      const res = await fetch(`/api/v1/orders/${createdPlaygroundOrderId}/status`, {
        method: "GET"
      });
      const data = await res.json();
      setStatusResponse({
        status: `${res.status} ${res.statusText}`,
        headers: {
          "content-type": res.headers.get("content-type")
        },
        body: data
      });
      showNotification(`🛰️ تحديث إحداثيات GPS المباشرة للطيار: ${data.status || 'نشط'}`);
    } catch (err: any) {
      setStatusResponse({
        error: "فشل الاتصال بقاعدة بيانات التتبع: " + err.message
      });
    } finally {
      setStatusLoading(false);
    }
  };
  
  // Auth states
  const [user, setUser] = React.useState<UserSession | null>(null);
  const [authTab, setAuthTab] = React.useState<'login' | 'register'>('login');
  
  // Login input fields
  const [loginPhone, setLoginPhone] = React.useState('');
  const [loginPassword, setLoginPassword] = React.useState('');
  
  // Registration input fields
  const [regName, setRegName] = React.useState('');
  const [regPhone, setRegPhone] = React.useState('');
  const [regRole, setRegRole] = React.useState<'customer' | 'captain' | 'vendor'>('customer');
  const [regArea, setRegArea] = React.useState('arbayeen');
  const [regPassword, setRegPassword] = React.useState('');

  // Embedded iframe state
  const [iframeUrl, setIframeUrl] = React.useState('https://delivery-suez.online');
  const [iframeKey, setIframeKey] = React.useState(0);

  // Orders lists & data
  const [orders, setOrders] = React.useState<Order[]>([]);
  
  // Customer placement form
  const [newCustomerItem, setNewCustomerItem] = React.useState('');
  const [newSourceArea, setNewSourceArea] = React.useState('arbayeen');
  const [newDestArea, setNewDestArea] = React.useState('salam-1');
  const [newServiceType, setNewServiceType] = React.useState('food');
  const [newPrice, setNewPrice] = React.useState(30);
  const [autoPilotMatch, setAutoPilotMatch] = React.useState(true);

  // Vendor formulation
  const [vendorMealTitle, setVendorMealTitle] = React.useState('');
  const [vendorSource, setVendorSource] = React.useState('salam-2');
  const [vendorMealPrice, setVendorMealPrice] = React.useState(35);

  // Captain metrics
  const [captainEarnings, setCaptainEarnings] = React.useState<number>(0);
  const [captainOrdersCount, setCaptainOrdersCount] = React.useState<number>(0);

  // Notification Toast state
  const [notification, setNotification] = React.useState<string | null>(null);

  // Load and handle initial data on client-side
  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    // Load active session if exists
    const storedUser = localStorage.getItem('suez_delivery_session');
    if (storedUser) {
      try {
        const u = JSON.parse(storedUser);
        setUser(u);
      } catch (e) {
        localStorage.removeItem('suez_delivery_session');
      }
    }

    // Load captain earnings
    const earnings = localStorage.getItem('suez_captain_earnings');
    if (earnings) {
      setCaptainEarnings(Number(earnings));
    }
    const trips = localStorage.getItem('suez_captain_trips');
    if (trips) {
      setCaptainOrdersCount(Number(trips));
    }

    // Load orders or seed default ones
    const storedOrders = localStorage.getItem('suez_delivery_orders');
    if (storedOrders) {
      try {
        setOrders(JSON.parse(storedOrders));
      } catch (e) {
        seedDefaultOrders();
      }
    } else {
      seedDefaultOrders();
    }
  }, []);

  const seedDefaultOrders = () => {
    const defaultList: Order[] = [
      {
        id: 'ord-101',
        customerName: 'حساب تجريبي: كشري الفارس',
        sourceArea: 'arbayeen',
        destinationArea: 'salam-1',
        serviceType: 'food',
        price: 35,
        status: 'pending',
        createdAt: 'منذ دقيقة',
        phone: '01011112222'
      },
      {
        id: 'ord-102',
        customerName: 'حساب تجريبي: روشتة صيدلية الصباح',
        sourceArea: 'sabah',
        destinationArea: 'faisal',
        serviceType: 'medicine',
        price: 45,
        status: 'pending',
        createdAt: 'منذ 3 دقائق',
        phone: '01022223333'
      }
    ];
    setOrders(defaultList);
    localStorage.setItem('suez_delivery_orders', JSON.stringify(defaultList));
  };

  const syncOrders = (updatedList: Order[]) => {
    setOrders(updatedList);
    localStorage.setItem('suez_delivery_orders', JSON.stringify(updatedList));
  };

  const showNotification = (msg: string) => {
    setNotification(msg);
    // Beep sound
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      osc.frequency.setValueAtTime(480, audioCtx.currentTime); // Hz
      gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.12);
    } catch (e) {
      // Audio failsafe
    }
    setTimeout(() => {
      setNotification(null);
    }, 6000);
  };

  // Direct Quick Login helper
  const handleDirectDemoLogin = (selectedRole: 'customer' | 'captain' | 'vendor') => {
    const demoUser: UserSession = {
      name: selectedRole === 'customer' ? 'أبو هاني السويسي (عميل تجريبي)' :
            selectedRole === 'captain' ? 'الكابتن محمود فايز (طيار حر)' :
            'مشويات ومطبخ الشلال بالسويس',
      phone: selectedRole === 'customer' ? '01099887766' :
             selectedRole === 'captain' ? '01055443322' :
             '01088776655',
      role: selectedRole,
      area: selectedRole === 'customer' ? 'sabah' :
            selectedRole === 'captain' ? 'arbayeen' :
            'salam-2'
    };
    
    setUser(demoUser);
    localStorage.setItem('suez_delivery_session', JSON.stringify(demoUser));
    showNotification(`🟢 تم تسجيل الدخول المباشر والسريع بنجاح بصفتك: ${demoUser.name}`);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName || !regPhone || !regPassword) {
      alert('الرجاء تعبئة كافة الحقول المطلوبة للتسجيل!');
      return;
    }
    if (regPhone.length < 11) {
      alert('رقم الهاتف المصاحب للواتساب يجب أن يكون مكوناً من 11 رقماً!');
      return;
    }

    const newUser: UserSession = {
      name: regName,
      phone: regPhone,
      role: regRole,
      area: regArea
    };

    setUser(newUser);
    localStorage.setItem('suez_delivery_session', JSON.stringify(newUser));
    showNotification(`🎉 ألف مبروك! تم إنشاء حسابك اللوجستي الجديد كـ ${
      regRole === 'customer' ? 'عميل' : regRole === 'captain' ? 'طيار كابتن' : 'شريك متجر/مطعم'
    } بنجاح.`);

    // Reset fields
    setRegName('');
    setRegPhone('');
    setRegPassword('');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginPhone) {
      alert('الرجاء إدخال رقم الهاتف المسجل!');
      return;
    }
    if (loginPhone.length < 11) {
      alert('رقم الهاتف يجب أن يحتوي على 11 رقم!');
      return;
    }

    // Since we are simulating, let's treat any 11-digit phone login as successful 
    const mockUser: UserSession = {
      name: loginPhone === '01022679250' ? 'المنسق الفني لخدمة السويس' : 'المستخدم السويسي المعتمد',
      phone: loginPhone,
      role: 'customer', // default, user can switch
      area: 'arbayeen'
    };

    setUser(mockUser);
    localStorage.setItem('suez_delivery_session', JSON.stringify(mockUser));
    showNotification(`👋 أهلاً بك مجدداً! تم تسجيل دخولك المباشر بنجاح بالحساب المعتمد.`);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('suez_delivery_session');
    showNotification('🔴 تم تسجيل الخروج من لوحة الإدارة بنجاح.');
  };

  // Launch simulated background pilot match 
  const runAutoPilotMatching = (orderId: string) => {
    // Stage 1: Accepted by pilot after 6s
    setTimeout(() => {
      setOrders(currentOrders => {
        const index = currentOrders.findIndex(o => o.id === orderId);
        if (index !== -1 && currentOrders[index].status === 'pending') {
          const updated = [...currentOrders];
          updated[index] = {
            ...updated[index],
            status: 'accepted',
            captainId: 'Cap-707',
            captainName: 'الكابتن عبد الرحمن البحيري (جي بي إس 🛰️)'
          };
          localStorage.setItem('suez_delivery_orders', JSON.stringify(updated));
          showNotification('⚡ استجابة عاجلة: كابتن دليفري السويس وافق على طلبك ومتوجه بالـ GPS الآن لاستلام الأوردر!');
          
          // Stage 2: Delivered after another 10s
          setTimeout(() => {
            setOrders(finalOrders => {
              const findIdx = finalOrders.findIndex(o => o.id === orderId);
              if (findIdx !== -1 && finalOrders[findIdx].status === 'accepted') {
                const finalUpdated = [...finalOrders];
                finalUpdated[findIdx] = {
                  ...finalUpdated[findIdx],
                  status: 'delivered'
                };
                localStorage.setItem('suez_delivery_orders', JSON.stringify(finalUpdated));
                showNotification(`🏁 تم تسليم طلبك كاش بنجاح بواسطة الكابتن! شكراً لاستخدامك ديليفري السويس أونلاين.`);
                return finalUpdated;
              }
              return finalOrders;
            });
          }, 12000);

          return updated;
        }
        return currentOrders;
      });
    }, 6000);
  };

  // Create customized customer request
  const handleCreateCustomerOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomerItem) {
      alert('يرجى تحديد عنوان/تفاصيل الطلب للتوصيل!');
      return;
    }

    const orderId = `ord-${Math.floor(100 + Math.random() * 900)}`;
    const newOrder: Order = {
      id: orderId,
      customerName: user ? user.name : 'عميل سويس مجهول',
      sourceArea: newSourceArea,
      destinationArea: newDestArea,
      serviceType: newServiceType,
      price: newPrice,
      status: 'pending',
      createdAt: 'الآن',
      phone: user ? user.phone : '01012345678'
    };

    const updated = [newOrder, ...orders];
    syncOrders(updated);
    setNewCustomerItem('');
    showNotification('🚀 تم تسجيل وطلب الكابتن فري لانس بنجاح! تم توزيع الإرسالية بالـ GPS على كباتن حي السويس.');

    if (autoPilotMatch) {
      runAutoPilotMatching(orderId);
    }
  };

  // Vendor dispatches meals
  const handleCreateVendorOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vendorMealTitle) {
      alert('يرجى كتابة اسم الوجبة أو المنتج التجاري لتجهيزه للمندوب!');
      return;
    }

    const orderId = `ord-${Math.floor(100 + Math.random() * 900)}`;
    const newOrder: Order = {
      id: orderId,
      customerName: `مطبخ: ${user ? user.name : 'تاجر السويس'} (${vendorMealTitle})`,
      sourceArea: vendorSource,
      destinationArea: 'attaka',
      serviceType: 'food',
      price: vendorMealPrice,
      status: 'pending',
      createdAt: 'الآن',
      phone: user ? user.phone : '01033334444'
    };

    const updated = [newOrder, ...orders];
    syncOrders(updated);
    setVendorMealTitle('');
    showNotification('🍔 تم تجهيز أوردر المطعم ونشره بانتظام. الكباتن في محيط حيك يستلمون الإشعار.');

    if (autoPilotMatch) {
      runAutoPilotMatching(orderId);
    }
  };

  // Pilot accepts an order
  const handleAcceptOrder = (id: string) => {
    const updated = orders.map(o => {
      if (o.id === id) {
        return {
          ...o,
          status: 'accepted' as const,
          captainId: 'Cap-99',
          captainName: user ? user.name : 'كابتن فري لانس'
        };
      }
      return o;
    });
    syncOrders(updated);
    showNotification('🛵 ممتاز! تم قبول رحلة التوصيل بنجاح. تتبع العميل عبر خرائط الـ GPS وقدم أفضل خدمة.');
  };

  // Pilot delivers order
  const handleDeliverOrder = (id: string, price: number) => {
    const updated = orders.map(o => {
      if (o.id === id) {
        return {
          ...o,
          status: 'delivered' as const
        };
      }
      return o;
    });
    syncOrders(updated);

    const newEarnings = captainEarnings + price;
    const newTrips = captainOrdersCount + 1;
    
    setCaptainEarnings(newEarnings);
    setCaptainOrdersCount(newTrips);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('suez_captain_earnings', String(newEarnings));
      localStorage.setItem('suez_captain_trips', String(newTrips));
    }

    showNotification(`💰 تم إكمال المهمة! تم قبض الأتعاب بقيمة ${price} EGP كاش بميزانيتك ومحفظتك الذكية.`);
  };

  // Clear orders history
  const handleClearHistory = () => {
    if (confirm('هل أنت متأكد من تنظيف قائمة الأوردرات والتاريخ بالكامل؟')) {
      const empty: Order[] = [];
      syncOrders(empty);
      showNotification('🧹 تم تنظيف وإعادة تعيين حركة لوحة التوصيل.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-right">
      <Navbar />

      <main className="pt-32 pb-24 font-sans" dir="rtl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Notification Toast bar */}
          {notification && (
            <div className="fixed bottom-6 left-6 right-6 md:left-auto md:w-[450px] bg-slate-900 border-r-4 border-emerald-500 text-white p-5 rounded-3xl shadow-2xl z-50 flex items-start gap-4 justify-end flex-row-reverse animate-bounce" dir="rtl">
              <div className="shrink-0 text-emerald-500 bg-emerald-500/10 p-2.5 rounded-2xl">
                <Bell size={24} className="animate-pulse" />
              </div>
              <div className="text-right">
                <h4 className="font-extrabold text-sm mb-1 text-emerald-400">نظام ديليفري السويس الذكي 🟢</h4>
                <p className="text-white/90 text-xs font-bold leading-relaxed">{notification}</p>
              </div>
            </div>
          )}

          {/* Integrated Header Toggle Selectors */}
          <div className="bg-white p-4 rounded-[2.5rem] border border-slate-100 shadow-sm mb-12 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-center">
              <button
                onClick={() => setActivePortal('live_app')}
                className={`py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  activePortal === 'live_app'
                    ? 'bg-slate-950 text-white scale-105 shadow-xl shadow-slate-950/10'
                    : 'bg-white hover:bg-slate-50 text-slate-600'
                }`}
              >
                <Smartphone size={18} />
                <span>الموقع الفعلي (delivery-suez.online) 📞</span>
              </button>
              <button
                onClick={() => setActivePortal('simulator')}
                className={`py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  activePortal === 'simulator'
                    ? 'bg-brand text-white scale-105 shadow-xl shadow-brand/10'
                    : 'bg-white hover:bg-slate-50 text-slate-600'
                }`}
              >
                <Cpu size={18} />
                <span>محاكي التطبيق (الطلب واللوجستيات) ⚙️</span>
              </button>
              <button
                onClick={() => setActivePortal('api_playground')}
                className={`py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  activePortal === 'api_playground'
                    ? 'bg-emerald-600 text-white scale-105 shadow-xl shadow-emerald-600/10'
                    : 'bg-white hover:bg-slate-50 text-slate-600'
                }`}
              >
                <Key size={18} className="text-emerald-400" />
                <span>مختبر تجارب الـ API الفوري (Live API) 🛰️</span>
              </button>
            </div>
          </div>

          {/* PORTAL ONE: DISPLAY LIVE WEBSITE WITH CUSTOM EMULATOR & UTILITIES */}
          {activePortal === 'live_app' && (
            <div className="space-y-12">
              
              {/* Introduction bar */}
              <div className="bg-slate-950 text-white p-8 md:p-12 rounded-[3.5rem] shadow-xl relative overflow-hidden">
                <div className="relative z-10 max-w-3xl">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-brand/15 text-brand rounded-full font-bold text-xs mb-4">
                    <Globe size={14} />
                    <span>تكامل النظام الفعلي النشط بالسويس</span>
                  </div>
                  <h1 className="text-2xl md:text-5xl font-display font-black leading-tight italic mb-4">
                    مرحباً بك في التطبيق الفعلي لتشغيل <span className="text-brand">ديليفري السويس</span>
                  </h1>
                  <p className="text-white/70 text-sm md:text-base font-bold leading-relaxed">
                    هنا يتم دمج ومزامنة المنصة الميدانية الحقيقية <strong className="text-brand">Delivery-Suez.online</strong>. يمكنك تصفح الموقع بالكامل وتتبع الأوردرات والتواصل مباشرة مع المندوبين.
                  </p>
                  
                  {/* Action Link bar */}
                  <div className="mt-8 flex flex-wrap gap-4 items-center justify-start flex-row">
                    <Link
                      href="https://delivery-suez.online"
                      target="_blank"
                      className="px-6 py-3.5 bg-brand text-white font-extrabold text-xs md:text-sm rounded-xl hover:scale-105 transition-all flex items-center gap-1.5 shadow-lg shadow-brand/20"
                    >
                      <ArrowUpLeft size={16} />
                      فتح الموقع المباشر في نافذة جديدة
                    </Link>
                    <Link
                      href="https://wa.me/201022679250"
                      target="_blank"
                      className="px-6 py-3.5 bg-white/10 text-white border border-white/20 hover:bg-white/20 font-extrabold text-xs md:text-sm rounded-xl transition-all flex items-center gap-1.5"
                    >
                      <Phone size={16} className="text-emerald-400 fill-emerald-400" />
                      تواصل واتساب مباشر (تسجيل سريع كابتن)
                    </Link>
                  </div>
                </div>
                <div className="absolute top-1/2 left-0 w-80 h-80 bg-brand/10 rounded-full blur-[100px] -z-10" />
              </div>

              {/* High-fidelity Device Emulation Showcase */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left: Beautiful Smartphone browser emulator frame */}
                <div className="lg:col-span-8 flex flex-col items-center">
                  <div className="w-full bg-slate-900 rounded-[2.5rem] p-4 pt-10 pb-6 border-4 border-slate-950 shadow-2xl relative">
                    {/* Phone visual accents */}
                    <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-32 h-5 bg-black rounded-full z-20 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 bg-slate-800 rounded-full mr-2" />
                      <div className="w-12 h-1 bg-slate-800 rounded-full" />
                    </div>

                    {/* Browser UI header bar */}
                    <div className="bg-slate-850 rounded-2xl p-3 mb-4 flex items-center justify-between gap-3 text-slate-300 font-sans text-xs">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => {
                            setIframeKey(k => k + 1);
                            showNotification('🔄 جاري تحديث التطبيق الفعلي...');
                          }}
                          className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-all cursor-pointer"
                          title="إعادة تحميل الصفحة"
                        >
                          <RefreshCw size={14} />
                        </button>
                        <Link 
                          href="https://delivery-suez.online" 
                          target="_blank"
                          className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-all"
                          title="فتح في علامة تبويب جديدة"
                        >
                          <ExternalLink size={14} />
                        </Link>
                      </div>

                      <div className="bg-slate-900 border border-slate-755 px-4 py-1.5 rounded-xl flex items-center gap-1.5 text-[11px] font-mono text-slate-400 font-bold max-w-xs md:max-w-md overflow-hidden shrink-0">
                        <span className="text-emerald-500 text-[8px] animate-pulse">●</span>
                        <span>https://delivery-suez.online</span>
                      </div>

                      <div className="text-[10px] text-slate-400 font-bold hidden sm:block">طاقة التغطية: 100% 🟢</div>
                    </div>

                    {/* Highly responsive Embed Iframe for testing */}
                    <div className="w-full h-[620px] bg-white rounded-3xl overflow-hidden border border-slate-800 shadow-inner relative">
                      <iframe
                        key={iframeKey}
                        src={iframeUrl}
                        className="w-full h-full object-cover border-0 z-10"
                        scrolling="yes"
                        frameBorder="0"
                        allowFullScreen={true}
                        allow="geolocation; autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                      />
                    </div>

                    {/* Interactive Home indicator button */}
                    <div className="mt-4 flex justify-center">
                      <div className="w-12 h-1.5 bg-slate-800 rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Right sidebar info on what details are synchronized on the app */}
                <div className="lg:col-span-4 space-y-8 text-right">
                  
                  <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                    <h3 className="font-display font-black text-slate-950 text-xl mb-4 border-r-4 border-brand pr-3">مميزات التوصيل الفعلي</h3>
                    <p className="text-slate-500 font-bold text-xs mb-6">مزايا حصرية لخدمة ديليفري السويس الميدانية:</p>
                    
                    <div className="space-y-4">
                      {[
                        { title: 'كباتن فري لانس 24 ساعة', desc: 'طيارين بالدراجات النارية والأسكوترات مجهزين بأغلفة حرارية عازلة للأغذية.' },
                        { title: 'ديليفري الصيدليات العاجل', desc: 'توصيل الروشتات والأدوية كاش طوال الليل في حي فيصل، الأربعين، وبورتوفيق.' },
                        { title: 'الربط المباشر مع الواتساب', desc: 'نظام تشغيل ذكي يرسل تفاصيل الرحلات للطيار والزبون للتنسيق بلا انقطاع.' },
                        { title: 'تحصيل نقدي EGP متكامل', desc: 'مبالغ توصيل عادلة ومحسوبة بالـ GPS دون رسوم إضافية مخفية.' }
                      ].map((item, i) => (
                        <div key={i} className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                          <h4 className="font-extrabold text-slate-900 text-sm mb-1">{item.title}</h4>
                          <p className="text-slate-500 text-[11px] leading-relaxed font-bold">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-900 text-white p-6 md:p-8 rounded-[2.5rem] shadow-sm">
                    <h3 className="font-display font-black text-brand text-lg mb-4">آلية توظيف وتدريب الطيارين</h3>
                    <p className="text-white/60 text-xs leading-relaxed font-bold mb-6">
                      نقبل توظيف جميع الكباتن المالكين لـ (أسكوتر، عجلة، موتوسيكل) بأبسط الشروط لنضمن دعم تشغيل الشباب وتوفير أسرع دليفري بالسويس.
                    </p>
                    <Link
                      href="https://wa.me/201022679250"
                      target="_blank"
                      className="w-full text-center py-3.5 bg-white text-slate-900 font-extrabold text-xs rounded-xl hover:scale-103 transition-all inline-block shadow-sm"
                    >
                      قدم كطيار / اشحن مشروعك أونلاين 🚀
                    </Link>
                  </div>

                </div>

              </div>

            </div>
          )}

          {/* PORTAL TWO: INTERACTIVE SIMULATOR CORE ARCHITECTURE */}
          {activePortal === 'simulator' && (
            <div className="space-y-12">
              
              {/* Login / Auth Portal Screen if not authenticated */}
              {!user ? (
                <div className="max-w-md mx-auto space-y-8">
                  
                  {/* Account authentication Form card */}
                  <div className="bg-white rounded-[3rem] border border-slate-200 overflow-hidden shadow-2xl relative p-8">
                    
                    {/* Header */}
                    <div className="text-center mb-8">
                      <div className="w-12 h-12 bg-brand text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md mx-auto mb-3">
                        DS
                      </div>
                      <h2 className="text-2xl font-display font-black text-slate-900">أمن وبوابة دليفري السويس</h2>
                      <p className="text-slate-400 text-xs font-bold mt-1">تحديد الهوية والطلب الفوري المعتمد</p>
                    </div>

                    {/* Auth switcher Tabs */}
                    <div className="flex border-b border-slate-100 mb-6">
                      <button 
                        onClick={() => setAuthTab('login')}
                        className={`w-1/2 pb-3 text-sm font-extrabold text-center transition-all cursor-pointer ${
                          authTab === 'login' ? 'border-b-4 border-brand text-brand' : 'text-slate-400 hover:text-slate-600'
                        }`}
                      >
                        تسجيل الدخول
                      </button>
                      <button 
                        onClick={() => setAuthTab('register')}
                        className={`w-1/2 pb-3 text-sm font-extrabold text-center transition-all cursor-pointer ${
                          authTab === 'register' ? 'border-b-4 border-brand text-brand' : 'text-slate-400 hover:text-slate-600'
                        }`}
                      >
                        إنشاء حساب جديد
                      </button>
                    </div>

                    {authTab === 'login' ? (
                      <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                          <label className="block text-xs font-extrabold text-slate-500 mb-1.5">رقم الهاتف المحمول بالسويس (11 رقم)</label>
                          <div className="relative">
                            <span className="absolute right-4 top-3 text-slate-400">
                              <Phone size={16} />
                            </span>
                            <input 
                              type="text"
                              required
                              maxLength={11}
                              placeholder="010XXXXXXXX"
                              value={loginPhone}
                              onChange={(e) => setLoginPhone(e.target.value)}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl pr-11 pl-4 py-3 text-sm font-extrabold text-slate-800 focus:outline-brand text-right font-sans"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-extrabold text-slate-500 mb-1.5">كلمة مرور الحساب</label>
                          <div className="relative">
                            <span className="absolute right-4 top-3 text-slate-400">
                              <Lock size={16} />
                            </span>
                            <input 
                              type="password"
                              required
                              placeholder="••••••••"
                              value={loginPassword}
                              onChange={(e) => setLoginPassword(e.target.value)}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl pr-11 pl-4 py-3 text-sm font-bold text-slate-800 focus:outline-brand text-right"
                            />
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="w-full py-3.5 bg-brand text-white font-black text-sm rounded-xl hover:scale-103 transition-all cursor-pointer shadow-md shadow-brand/15"
                        >
                          تأكيد ودخول المنصة الميدانية
                        </button>
                      </form>
                    ) : (
                      <form onSubmit={handleRegister} className="space-y-4">
                        <div>
                          <label className="block text-xs font-extrabold text-slate-500 mb-1">الاسم بالكامل (ثلاثي عريض للتتبع)</label>
                          <input 
                            type="text"
                            required
                            placeholder="اكتب اسمك الحقيقي..."
                            value={regName}
                            onChange={(e) => setRegName(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 focus:outline-brand text-right"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-extrabold text-slate-500 mb-1">رقم هاتف الواتساب النشط (للتواصل مع الكباتن)</label>
                          <input 
                            type="text"
                            required
                            maxLength={11}
                            placeholder="مثال: 01022679250"
                            value={regPhone}
                            onChange={(e) => setRegPhone(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-extrabold text-slate-800 focus:outline-brand text-right font-sans"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-extrabold text-slate-500 mb-1">نوع الهوية (حدد دورك الفعلي)</label>
                          <select
                            value={regRole}
                            onChange={(e) => setRegRole(e.target.value as any)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 focus:outline-brand cursor-pointer"
                          >
                            <option value="customer">عميل (أحتاج لطلب كابتن توصيل دليفري) 👤</option>
                            <option value="captain">طيار كابتن (لدي مركبة وأريد كسب الكاش) 🛵</option>
                            <option value="vendor">صاحب مطعم أو متجر (أريد شحن أوردرات) 🍔</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-extrabold text-slate-500 mb-1">منطقتك الأساسية في محافظة السويس</label>
                          <select
                            value={regArea}
                            onChange={(e) => setRegArea(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 focus:outline-brand cursor-pointer"
                          >
                            {AREAS.map(a => (
                              <option key={a.slug} value={a.slug}>{a.arabicName}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-extrabold text-slate-500 mb-1">كلمة المرور الجديدة</label>
                          <input 
                            type="password"
                            required
                            placeholder="اكتب كلمة مرور قوية..."
                            value={regPassword}
                            onChange={(e) => setRegPassword(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 focus:outline-brand text-right"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full py-3 bg-brand text-white font-extrabold text-xs rounded-xl hover:scale-103 transition-all cursor-pointer shadow-md shadow-brand/10"
                        >
                          تأكيد وتسجيل الحساب الفوري
                        </button>
                      </form>
                    )}

                  </div>

                  {/* Direct Demo Accounts Quick Login Buttons Block */}
                  <div className="bg-slate-900 text-white p-6 rounded-[2.5rem] shadow-xl text-center">
                    <h4 className="text-xs text-brand font-black tracking-widest block mb-2">الدخول المباشر السريع كضيف 🚀</h4>
                    <p className="text-white/60 text-[10px] font-semibold mb-4 leading-relaxed">يمكنك بنقرة واحدة فائقة تخطي التسجيل وتجربة التطبيق كمحاكاة مباشرة بجميع الأدوار الميدانية الفعالة في السويس.</p>
                    
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => handleDirectDemoLogin('customer')}
                        className="py-2.5 bg-white/10 hover:bg-brand text-white rounded-xl text-[10px] font-extrabold transition-all cursor-pointer"
                      >
                        دخول كعميل
                      </button>
                      <button
                        onClick={() => handleDirectDemoLogin('captain')}
                        className="py-2.5 bg-white/10 hover:bg-brand text-white rounded-xl text-[10px] font-extrabold transition-all cursor-pointer"
                      >
                        دخول كطيار
                      </button>
                      <button
                        onClick={() => handleDirectDemoLogin('vendor')}
                        className="py-2.5 bg-white/10 hover:bg-brand text-white rounded-xl text-[10px] font-extrabold transition-all cursor-pointer"
                      >
                        دخول كمطعم
                      </button>
                    </div>
                  </div>

                </div>
              ) : (
                
                /* IN-DASHBOARD VIEWS AFTER AUTHENTICATION */
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                  
                  {/* Sidebar stats & guidelines */}
                  <div className="space-y-8">
                    
                    {/* Logged in User Profile Details box */}
                    <div className="bg-slate-950 text-white p-8 rounded-[3rem] shadow-xl relative overflow-hidden">
                      <div className="relative z-10 text-right">
                        <div className="flex justify-between items-center mb-6 flex-row-reverse">
                          <span className="w-10 h-10 rounded-2xl bg-white/10 text-white flex items-center justify-center font-bold">
                            <User size={18} />
                          </span>
                          <span className="text-[10px] bg-brand/15 text-brand px-2.5 py-1 rounded-full font-black uppercase font-mono">
                            {user.role === 'customer' ? 'عميل نشط' : user.role === 'captain' ? 'طيار كابتن' : 'شريك تجاري'}
                          </span>
                        </div>
                        
                        <p className="text-white/50 text-[10px] font-bold select-none mb-1">مرحباً بك في السويس 🟢</p>
                        <h3 className="text-xl font-display font-black text-white leading-tight mb-2">{user.name}</h3>
                        <p className="text-slate-400 text-xs font-bold leading-relaxed font-sans mb-6">رقم الواتساب: {user.phone}</p>
                        
                        <div className="border-t border-white/10 pt-4 flex justify-between items-center flex-row-reverse text-xs">
                          <span className="text-slate-400">المنطقة المفضلة:</span>
                          <strong className="text-brand font-display">
                            {AREAS.find(a => a.slug === user.area)?.arabicName || user.area}
                          </strong>
                        </div>

                        {/* Logout action */}
                        <div className="mt-8 pt-4 border-t border-white/10">
                          <button 
                            onClick={handleLogout}
                            className="w-full py-3.5 bg-red-650/15 hover:bg-red-600/90 hover:text-white border border-red-500/30 text-red-400 font-extrabold text-xs rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-2"
                          >
                            <LogOut size={14} />
                            <span>تسجيل الخروج والتبديل</span>
                          </button>
                        </div>
                      </div>
                      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-brand/5 rounded-full blur-[90px]" />
                    </div>

                    {/* GPS Map Radar Simulation Info */}
                    <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200">
                      <div className="flex items-center gap-2 mb-4 flex-row-reverse">
                        <Navigation size={18} className="text-brand animate-pulse" />
                        <h4 className="font-display font-black text-slate-900 text-sm">تتبع ورادار السويس 📡</h4>
                      </div>
                      <div className="space-y-3 text-xs leading-relaxed font-semibold text-slate-500">
                        <div className="flex justify-between flex-row-reverse text-right bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                          <span>زمن مطابقة كابتن المتاحة:</span>
                          <span className="font-mono text-brand font-black">أقل من 3 دقائق</span>
                        </div>
                        <div className="flex justify-between flex-row-reverse text-right bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                          <span>كباتن فري لانس متصلون:</span>
                          <span className="font-mono text-slate-800 font-black">400+ طيار</span>
                        </div>
                        <div className="flex justify-between flex-row-reverse text-right bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                          <span>دقة تتبع الخرائط GPS:</span>
                          <span className="font-mono text-emerald-600 font-black">99.4% عالي</span>
                        </div>
                      </div>
                    </div>

                    {/* Call Direct WhatsApp option */}
                    <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-[2.5rem] text-center">
                      <span className="text-emerald-700 text-[10px] font-black tracking-wider uppercase block mb-1">تفتقد الوجبة أو الكابتن؟</span>
                      <p className="text-slate-800 font-bold text-xs mb-4 leading-relaxed">خدمات التوجيه كاش متصلة بالمشرفين الميدانيين لتسهيل المشوار.</p>
                      <Link
                        href="https://wa.me/201022679250"
                        target="_blank"
                        className="py-3 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-md shadow-emerald-600/10 transition-all inline-block"
                      >
                        محادثة المشرف واتساب (01022679250)
                      </Link>
                    </div>

                  </div>

                  {/* Main panels layout matching user role */}
                  <div className="lg:col-span-2 space-y-8">
                    
                    {/* CUSTOMER PANEL */}
                    {user.role === 'customer' && (
                      <div className="bg-white p-8 rounded-[3rem] border border-slate-200">
                        <div className="flex items-center gap-2 mb-6 border-r-4 border-brand pr-3 justify-between flex-row-reverse">
                          <h3 className="font-display font-black text-slate-900 text-xl font-display">طلب طيار دليفري فوري 🚀</h3>
                          <span className="text-[10px] bg-slate-100 text-slate-800 px-2 py-1 rounded font-bold font-sans">EGP كاش</span>
                        </div>

                        <form onSubmit={handleCreateCustomerOrder} className="space-y-6">
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-xs font-extrabold text-slate-600 mb-2">ماذا تود توصيله؟ (مثال: وجبة كشري الفارس أو روشتة علاج من صيدلية الصباح)</label>
                              <input 
                                type="text"
                                required
                                placeholder="اكتب تفاصيل طلبك بدقة..."
                                value={newCustomerItem}
                                onChange={(e) => setNewCustomerItem(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-800 focus:outline-brand text-right"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-extrabold text-slate-600 mb-2">نوع التصنيف اللوجستي للرحلة</label>
                              <select 
                                value={newServiceType}
                                onChange={(e) => setNewServiceType(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-800 focus:outline-brand cursor-pointer text-right"
                              >
                                <option value="food">طعام ومطاعم السويس 🍔</option>
                                <option value="medicine">صيدلية وأدوية عاجلة 🏥</option>
                                <option value="grocery">مقاضي المنزل وسوبر ماركت 🛒</option>
                                <option value="courier">أغراض خاصة أخرى 🛵</option>
                              </select>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-xs font-extrabold text-slate-600 mb-1.5">نقطة ومقر الاستلام (أين يستلم الطيار؟)</label>
                              <select 
                                value={newSourceArea}
                                onChange={(e) => setNewSourceArea(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-800 focus:outline-brand cursor-pointer text-right"
                              >
                                {AREAS.map(a => (
                                  <option key={a.slug} value={a.slug}>{a.arabicName}</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className="block text-xs font-extrabold text-slate-600 mb-1.5">نقطة وموقع التسليم (أين بيتك بالسويس؟)</label>
                              <select 
                                value={newDestArea}
                                onChange={(e) => setNewDestArea(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-800 focus:outline-brand cursor-pointer text-right"
                              >
                                {AREAS.map(a => (
                                  <option key={a.slug} value={a.slug}>{a.arabicName}</option>
                                ))}
                              </select>
                            </div>
                          </div>

                          {/* Suggested Fare Price EGP slider with responsive fee guide */}
                          <div>
                            <div className="flex justify-between items-center mb-2 flex-row-reverse">
                              <label className="text-xs font-extrabold text-slate-600">أجر التوصيل الكاش المقترح للطيار (EGP بالجنيه)</label>
                              <span className="font-display font-black text-lg text-brand font-sans">{newPrice} EGP</span>
                            </div>
                            <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 flex-row-reverse">
                              <input 
                                type="range" 
                                min="20" 
                                max="100" 
                                step="5"
                                value={newPrice}
                                onChange={(e) => setNewPrice(Number(e.target.value))}
                                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand"
                              />
                            </div>
                          </div>

                          {/* Auto pilot match switch */}
                          <div className="bg-slate-50 p-4 rounded-2xl flex items-center justify-between flex-row-reverse">
                            <div className="text-right">
                              <h4 className="text-xs font-bold text-slate-800">تشغيل تكنولوجيا المندوب الآلي (Auto-pilot Simulation)</h4>
                              <p className="text-[10px] text-slate-400 mt-1">تسمح بمحاكاة متكاملة للمطابقة وتغيير حالة الطلب والوصول لعنوانك دون انتظار كابتن حقيقي.</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer select-none">
                              <input 
                                type="checkbox" 
                                checked={autoPilotMatch} 
                                onChange={(e) => setAutoPilotMatch(e.target.checked)}
                                className="sr-only peer" 
                              />
                              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand"></div>
                            </label>
                          </div>

                          <button 
                            type="submit"
                            className="w-full py-4 bg-brand text-white font-black text-sm rounded-2xl hover:scale-103 transition-all shadow-lg shadow-brand/15 cursor-pointer text-center"
                          >
                            تحديد المندوب وإرسال الأوردر بالسويس 🚀
                          </button>

                        </form>
                      </div>
                    )}

                    {/* CAPTAIN PANEL */}
                    {user.role === 'captain' && (
                      <div className="bg-slate-900 text-white p-8 rounded-[3rem] shadow-xl space-y-6">
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 flex-row-reverse text-right">
                          <div>
                            <span className="text-brand text-xs font-black block mb-1">الربح كاش والسعي الحر</span>
                            <h2 className="text-2xl font-display font-black leading-tight italic">لوحة عمل الكابتن طيار بالسويس</h2>
                          </div>
                          
                          <div className="bg-white/5 p-4 rounded-2xl flex gap-6 text-right flex-row-reverse">
                            <div>
                              <p className="text-slate-400 text-[10px] font-bold">مجموع أرباحك كاش</p>
                              <p className="text-xl font-display font-black text-brand font-sans">{captainEarnings} EGP</p>
                            </div>
                            <div className="w-px h-8 bg-white/20" />
                            <div>
                              <p className="text-slate-400 text-[10px] font-bold">فترات السير والرحلات</p>
                              <p className="text-xl font-display font-black text-slate-200 font-sans">{captainOrdersCount}</p>
                            </div>
                          </div>
                        </div>

                        <div className="border-t border-white/10 pt-4 text-slate-300 text-xs font-bold leading-relaxed space-y-1">
                          <p>💡 استعن برادار الطلبات المعروض في الأسفل. عند قبولك لأي طلب، سيتم حظر المندوبين الآخرين وتوجيهك بالـ GPS.</p>
                          <p>⚠️ تأكد من مراجعة مكونات الأطعمة الطازجة وحقائب العزل الحراري للحصول على تقييم 5 نجوم من أهالي السويس.</p>
                        </div>
                      </div>
                    )}

                    {/* VENDOR/RESTAURANT PANEL */}
                    {user.role === 'vendor' && (
                      <div className="bg-white p-8 rounded-[3rem] border border-slate-200">
                        <div className="flex items-center gap-2 mb-6 border-r-4 border-brand pr-3 justify-between flex-row-reverse">
                          <h3 className="font-display font-black text-slate-900 text-xl">تجهيز وشحن أوردرات المطعم / المتجر 🍔</h3>
                          <span className="text-[10px] bg-slate-100 text-slate-800 px-2 py-1 rounded font-bold">الشركاء والربحية</span>
                        </div>

                        <form onSubmit={handleCreateVendorOrder} className="space-y-6">
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-xs font-extrabold text-slate-600 mb-2">اسم الأكلة أو المنتج المطلوب توصيله (مثال: أوردر حواوشي سوبر أو وجبة ميكس)</label>
                              <input 
                                type="text"
                                required
                                placeholder="مثال: كومبو دبل تشيز برجر..."
                                value={vendorMealTitle}
                                onChange={(e) => setVendorMealTitle(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-800 focus:outline-brand text-right"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-extrabold text-slate-600 mb-2">مقر مطبخك أو مطعمك للتوجيه والإنقاذ اللوجستي</label>
                              <select 
                                value={vendorSource}
                                onChange={(e) => setVendorSource(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-800 focus:outline-brand cursor-pointer text-right"
                              >
                                {AREAS.map(a => (
                                  <option key={a.slug} value={a.slug}>{a.arabicName}</option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-extrabold text-slate-600 mb-2">أجر التوصيل الكاش المقترح للطيار (EGP بالجنيه)</label>
                            <input 
                              type="number"
                              min="20"
                              max="90"
                              value={vendorMealPrice}
                              onChange={(e) => setVendorMealPrice(Number(e.target.value))}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 focus:outline-brand [appearance:textfield] text-right"
                            />
                          </div>

                          {/* Auto pilot match switch */}
                          <div className="bg-slate-50 p-4 rounded-2xl flex items-center justify-between flex-row-reverse">
                            <div className="text-right">
                              <h4 className="text-xs font-bold text-slate-800">تفعيل محاكاة الطيار الآلي الفوري</h4>
                              <p className="text-[10px] text-slate-400 mt-1">يتولى النظام قبول وتوصيل الطلب آلياً لأغراض مراجعة الحركة والأعمال.</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer select-none">
                              <input 
                                type="checkbox" 
                                checked={autoPilotMatch} 
                                onChange={(e) => setAutoPilotMatch(e.target.checked)}
                                className="sr-only peer" 
                              />
                              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand"></div>
                            </label>
                          </div>

                          <button 
                            type="submit"
                            className="w-full py-4.5 bg-brand text-white font-black text-sm rounded-2xl hover:scale-103 transition-all shadow-lg shadow-brand/10 cursor-pointer text-center"
                          >
                            استدعاء أقرب طيار لاستلام الوجبة فوراً 🛵
                          </button>

                        </form>
                      </div>
                    )}

                    {/* UNIVERSAL ACTIVE ORDERS FEED */}
                    <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm">
                      <div className="p-8 border-b border-slate-100 flex justify-between items-center flex-row-reverse bg-slate-50/50">
                        <div>
                          <h3 className="font-display font-black text-lg text-slate-900 leading-tight">حركة التوصيل وأوردرات السويس الحالية 📡</h3>
                          <p className="text-slate-400 text-[10px] font-bold mt-1">تجديد فوري يعتمد على قاعدة البيانات اللوجستية</p>
                        </div>
                        <button 
                          onClick={handleClearHistory}
                          className="px-3.5 py-1.5 border border-slate-200 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 size={13} />
                          <span>تصفير الحركة</span>
                        </button>
                      </div>

                      <div className="divide-y divide-slate-100">
                        {orders.length > 0 ? (
                          orders.map((o) => {
                            const srcNode = AREAS.find(a => a.slug === o.sourceArea);
                            const destNode = AREAS.find(a => a.slug === o.destinationArea);

                            return (
                              <div key={o.id} className="p-8 flex flex-col md:flex-row-reverse justify-between items-start md:items-center gap-6 text-right font-sans font-bold text-sm">
                                
                                {/* Order description details text */}
                                <div className="space-y-2 w-full md:w-2/3">
                                  <div className="flex items-center gap-2.5 flex-row-reverse justify-end">
                                    <span className="font-black text-slate-900 text-base">{o.customerName}</span>
                                    <span className="text-[9px] font-mono font-black border border-slate-200 bg-slate-50 text-slate-400 px-1.5 py-0.5 rounded uppercase">ID: {o.id}</span>
                                  </div>
                                  
                                  <div className="space-y-1">
                                    <p className="text-slate-500 text-xs text-right leading-relaxed font-semibold flex items-center justify-end gap-1 flex-row-reverse">
                                      <MapPin size={12} className="text-brand" />
                                      <span>الاستلام من: <strong className="text-slate-800">{srcNode?.arabicName || o.sourceArea}</strong></span>
                                    </p>
                                    <p className="text-slate-500 text-xs text-right leading-relaxed font-semibold flex items-center justify-end gap-1 flex-row-reverse">
                                      <Navigation size={12} className="text-emerald-500" />
                                      <span>التسليم لبيوت: <strong className="text-slate-800">{destNode?.arabicName || o.destinationArea}</strong></span>
                                    </p>
                                    {o.captainName && (
                                      <p className="text-emerald-600 text-xs text-right leading-relaxed font-bold flex items-center justify-end gap-1 flex-row-reverse">
                                        <Truck size={12} />
                                        <span>الطيار القائد: {o.captainName}</span>
                                      </p>
                                    )}
                                  </div>

                                  <div className="flex gap-2.5 mt-3 flex-row-reverse justify-end items-center">
                                    <span className={`px-2.5 py-1 text-[11px] font-black rounded-lg ${
                                      o.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                                      o.status === 'accepted' ? 'bg-blue-100 text-blue-700 animate-pulse' :
                                      'bg-emerald-100 text-emerald-700'
                                    }`}>
                                      {o.status === 'pending' ? 'بانتظار طيار 🕒' :
                                       o.status === 'accepted' ? 'الكابتن استلم وجاري التوصيل بالـ GPS 🛵' :
                                       'تم التسليم للعميل كاش بنجاح ✅'}
                                    </span>
                                    <span className="text-[10px] text-slate-400 font-bold select-none font-sans">تاريخ النشر: {o.createdAt}</span>
                                  </div>

                                  {/* Render Route Progress Slider for Customer UX feedback if order is for current user */}
                                  <div className="mt-4 pt-1.5 max-w-md ml-auto">
                                    <div className="relative pt-1">
                                      <div className="flex mb-1 items-center justify-between flex-row-reverse text-[9px] font-bold text-slate-400">
                                        <span>تجهيز الأوردر</span>
                                        <span>في الطريق بالـ GPS</span>
                                        <span>تم التوصيل</span>
                                      </div>
                                      <div className="overflow-hidden h-2 text-xs flex rounded bg-slate-100">
                                        <div 
                                          style={{ width: o.status === 'pending' ? '20%' : o.status === 'accepted' ? '65%' : '100%' }} 
                                          className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-1000 ${
                                            o.status === 'pending' ? 'bg-amber-400' :
                                            o.status === 'accepted' ? 'bg-blue-500' :
                                            'bg-emerald-500'
                                          }`} 
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Order price & action interact buttons */}
                                <div className="flex md:flex-col justify-between items-center md:items-end w-full md:w-auto border-t md:border-t-0 border-slate-150 pt-4 md:pt-0 gap-4">
                                  <div className="text-right">
                                    <p className="text-[11px] text-slate-400 font-bold select-none leading-none mb-1">أجر الطيار كاش</p>
                                    <p className="text-2xl font-display font-black text-brand font-sans leading-none">{o.price} <span className="text-xs">EGP</span></p>
                                  </div>

                                  {/* Interactive Action Buttons based on role */}
                                  {user.role === 'captain' && o.status === 'pending' && (
                                    <button
                                      onClick={() => handleAcceptOrder(o.id)}
                                      className="px-5 py-2.5 bg-brand hover:scale-103 text-white text-xs font-black rounded-xl transition-all cursor-pointer shadow-sm shadow-brand/10"
                                    >
                                      قبول الطلب والتوجه بالـ GPS
                                    </button>
                                  )}

                                  {user.role === 'captain' && o.status === 'accepted' && o.captainId === 'Cap-99' && (
                                    <button
                                      onClick={() => handleDeliverOrder(o.id, o.price)}
                                      className="px-5 py-2.5 bg-emerald-600 hover:scale-103 text-white text-xs font-black rounded-xl transition-all cursor-pointer shadow-sm shadow-emerald-500/15"
                                    >
                                      لقد سلمت الأوردر كاش
                                    </button>
                                  )}
                                </div>

                              </div>
                            );
                          })
                        ) : (
                          <div className="py-24 text-center">
                            <AlertCircle size={48} className="text-slate-200 mx-auto mb-4" />
                            <p className="text-slate-400 font-bold text-sm">لا حراك ولا يوجد أوردرات مسجلة الآن بالسويس.</p>
                            <p className="text-slate-300 text-xs mt-2">يرجى تسجيل دورك كعميل أو مطعم ونشر أول طلب دليفري تجريبي!</p>
                          </div>
                        )}
                      </div>
                    </div>

                  </div>

                </div>
              )}

            </div>
          )}

          {/* PORTAL THREE: LIVE API PLAYGROUND & DOCUMENTATION */}
          {activePortal === 'api_playground' && (
            <div className="space-y-12 text-right">

              {/* API Welcome & Credentials overview */}
              <div className="bg-slate-950 text-white p-8 md:p-12 rounded-[3.5rem] shadow-xl relative overflow-hidden">
                <div className="relative z-10 max-w-4xl">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-500/15 text-emerald-400 rounded-full font-bold text-xs mb-4">
                    <Key size={14} />
                    <span>جاهز للربط الفوري (Production API)</span>
                  </div>
                  <h1 className="text-2xl md:text-5xl font-display font-black leading-tight italic mb-4">
                    بوابة المطورين والربط البرمجي <span className="text-emerald-400">API Integration</span>
                  </h1>
                  <p className="text-white/70 text-sm md:text-base font-bold leading-relaxed mb-6">
                    توفر منصة دليفري السويس واجهات برمجية ذكية وسهلة (Restful App APIs) تسمح للمتاجر، المطاعم، التطبيقات الخارجية أو الصيدليات السويسية بحجز كباتن فوريين وتتبع حركتهم بالـ GPS بدون تدخل بشري.
                  </p>

                  <div className="flex flex-col md:flex-row gap-4 items-center bg-white/5 border border-white/10 p-5 rounded-3xl mt-6">
                    <div className="flex-1 text-right">
                      <h4 className="font-extrabold text-sm text-slate-300 mb-1">مفتاح API الخاص بمتجرك / منصتك:</h4>
                      <p className="text-white/50 text-xs font-medium">يرجى الحفاظ على سرية مفتاح الـ API وعدم مشاركته في الأكواد المكشوفة للمستخدمين.</p>
                    </div>
                    <div className="px-6 py-3 bg-slate-900 border border-emerald-500/30 text-emerald-400 rounded-2xl font-mono text-base font-black tracking-widest leading-none">
                      SUEZ-DELIVERY-PARTNER-2026
                    </div>
                  </div>
                </div>
                <div className="absolute top-1/2 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] -z-10" />
              </div>

              {/* Core Endpoints specification grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* 1. Create order spec */}
                <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm space-y-4">
                  <span className="px-3.5 py-1.5 bg-emerald-500/10 text-emerald-700 rounded-full font-black text-xs font-mono uppercase inline-block">POST</span>
                  <h3 className="text-xl font-display font-black text-slate-900 italic">1. إنشاء طلب توصيل جديد (Create Delivery Order)</h3>
                  <p className="text-slate-500 text-xs leading-relaxed font-semibold">
                    قم بإرسال طلب من نوع POST إلى خادم دليفري السويس لحجز كابتن فوري للطلب وتمريره لشبكتنا الذكية.
                  </p>
                  <div className="bg-slate-50 p-4 rounded-2xl font-mono text-[11px] font-bold text-slate-700 border border-slate-100 select-all text-left overflow-x-auto">
                    POST /api/v1/orders
                  </div>
                  
                  <div className="pt-2 text-xs">
                    <h4 className="font-black text-slate-700 mb-2">المدخلات المطلوبة (JSON Payload):</h4>
                    <ul className="space-y-1.5 text-slate-500 list-disc list-inside">
                      <li><code className="text-pink-600 font-bold">pickup</code>: كائن إحداثيات الاستلام وعنوانه التأسيسي بالسويس.</li>
                      <li><code className="text-pink-600 font-bold">dropoff</code>: كائن إحداثيات التسليم لبيت العميل بالسويس.</li>
                      <li><code className="text-pink-600 font-bold">details</code>: تفاصيل الطلبية (علبة كشري، روشتة دواء، بقالة...).</li>
                      <li><code className="text-pink-600 font-bold">customerName</code>: اسم المستلم الحقيقي بالكامل.</li>
                      <li><code className="text-pink-600 font-bold">customerPhone</code>: رقم موبايل العميل للتنسيق معه.</li>
                    </ul>
                  </div>
                </div>

                {/* 2. Track order spec */}
                <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm space-y-4">
                  <span className="px-3.5 py-1.5 bg-blue-500/10 text-blue-700 rounded-full font-black text-xs font-mono uppercase inline-block">GET</span>
                  <h3 className="text-xl font-display font-black text-slate-900 italic">2. تتبع ومتابعة حالة الطلب والطيار (Track Status & Captain Location)</h3>
                  <p className="text-slate-500 text-xs leading-relaxed font-semibold">
                    قم بإرسال طلب GET للحصول على معلومات حالة الطلب الفورية، وإحداثيات الطيار (خطوط الطول والعرض)، السرعة والاتجاه بدقة متناهية.
                  </p>
                  <div className="bg-slate-50 p-4 rounded-2xl font-mono text-[11px] font-bold text-slate-700 border border-slate-100 select-all text-left overflow-x-auto">
                    GET /api/v1/orders/:id/status
                  </div>

                  <div className="pt-2 text-xs">
                    <h4 className="font-black text-slate-700 mb-2">مميزات رد التتبع الجغرافي:</h4>
                    <ul className="space-y-1.5 text-slate-500 list-inside list-disc">
                      <li>تحديث إحداثيات الكابتن <code className="text-blue-600 font-bold">captainLocation</code> بشكل حركي فوري.</li>
                      <li>زاوية اتجاه الرحلة <code className="text-blue-600 font-bold">heading</code> لتوجيه رأس الكابتن على الخريطة.</li>
                      <li>سرعة الرحلة بالـ (متر في الثانية) <code className="text-blue-600 font-bold">speed</code> لحظة بلحظة.</li>
                      <li>رابط <code className="text-blue-600 font-bold">trackingUrl</code> مباشر بدون تسجيل دخول للعملاء لمتابعة كباتن السويس.</li>
                    </ul>
                  </div>
                </div>

              </div>

              {/* MULTI TAB LIVE API PLAYGROUND */}
              <div className="bg-white rounded-[3.5rem] border border-slate-200 overflow-hidden shadow-2xl">
                
                {/* Title and stats bar */}
                <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-6 sm:p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="text-right">
                    <span className="text-[10px] font-black uppercase tracking-widest bg-white/20 px-3.5 py-1 rounded-full text-white inline-block mb-2">Interactive Desk</span>
                    <h2 className="text-2xl md:text-3xl font-display font-black leading-none italic">3. مختبر تجارب الـ API الفوري (Live API Playground)</h2>
                    <p className="text-white/80 text-xs font-bold mt-1">استخدم هذا النموذج التفاعلي لإرسال طلب حقيقي وتجربة رد المنصة الفوري وآلية التتبع المباشر للطيارين.</p>
                  </div>
                  <div className="px-4 py-2 bg-slate-950 text-emerald-400 font-bold text-xs rounded-xl font-mono animate-pulse">
                    🟢 Ready to execute
                  </div>
                </div>

                <div className="p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
                  
                  {/* Left panel: Form input fields */}
                  <form onSubmit={handleTestPostOrder} className="lg:col-span-5 space-y-4">
                    <h3 className="font-black text-slate-900 border-r-4 border-emerald-500 pr-2.5 text-sm mb-4 select-none">تعبئة خصائص الأوردر التجريبي:</h3>
                    
                    {/* Presets dropdown */}
                    <div>
                      <label className="block text-[11px] font-black text-slate-500 mb-1">اختر موقعاً افتراضياً بالسويس لتسجيل الإحداثيات بسرعة:</label>
                      <select 
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val === 'fatah') {
                            setPlayPickupLat(29.969); setPlayPickupLng(32.540); setPlayPickupAddress('السويس, مطعم الفتح');
                            setPlayDropoffLat(29.975); setPlayDropoffLng(32.541); setPlayDropoffAddress('السلام 1, عمارة 14');
                            setPlayExpectedPrice(25);
                          } else if (val === 'pharmacy') {
                            setPlayPickupLat(29.968); setPlayPickupLng(32.545); setPlayPickupAddress('السويس, صيدلية الصباح');
                            setPlayDropoffLat(29.966); setPlayDropoffLng(32.549); setPlayDropoffAddress('حي فيصل, مساكن المميز');
                            setPlayExpectedPrice(30);
                          } else if (val === 'port') {
                            setPlayPickupLat(29.945); setPlayPickupLng(32.562); setPlayPickupAddress('بورتوفيق, كافيهات الممشى');
                            setPlayDropoffLat(29.972); setPlayDropoffLng(32.532); setPlayDropoffAddress('حي الأربعين, الغريب');
                            setPlayExpectedPrice(35);
                          } else if (val === 'university') {
                            setPlayPickupLat(29.980); setPlayPickupLng(32.548); setPlayPickupAddress('جامعة السويس, كلية هندسة');
                            setPlayDropoffLat(29.972); setPlayDropoffLng(32.532); setPlayDropoffAddress('الأربعين, شارع الجيش الرئيسي');
                            setPlayExpectedPrice(40);
                          }
                        }}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-700 cursor-pointer"
                      >
                        <option value="fatah">🍽️ مطعم الفتح (وسط السويس) ← السلام 1</option>
                        <option value="pharmacy">💊 صيدلية الصباح ← حي فيصل (مساكن المميز)</option>
                        <option value="port">⚓ بورتوفيق وكورنيش السويس ← حي الأربعين (الغريب)</option>
                        <option value="university">🎓 جامعة السويس ← شارع الجيش بالأربعين</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-[11px] font-black text-slate-500 mb-1 font-sans">خط طول الاستلام (Pickup Lng)</label>
                        <input 
                          type="number" step="0.00001" required value={playPickupLng}
                          onChange={(e) => setPlayPickupLng(Number(e.target.value))}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-mono font-bold text-slate-800 text-left"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-black text-slate-500 mb-1 font-sans">خط عرض الاستلام (Pickup Lat)</label>
                        <input 
                          type="number" step="0.00001" required value={playPickupLat}
                          onChange={(e) => setPlayPickupLat(Number(e.target.value))}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-mono font-bold text-slate-800 text-left"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-black text-slate-500 mb-1">عنوان الاستلام بالتفصيل:</label>
                      <input 
                        type="text" required value={playPickupAddress}
                        onChange={(e) => setPlayPickupAddress(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-800"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-[11px] font-black text-slate-500 mb-1 font-sans">خط طول التسليم (Dropoff Lng)</label>
                        <input 
                          type="number" step="0.00001" required value={playDropoffLng}
                          onChange={(e) => setPlayDropoffLng(Number(e.target.value))}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-mono font-bold text-slate-800 text-left"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-black text-slate-500 mb-1 font-sans">خط عرض التسليم (Dropoff Lat)</label>
                        <input 
                          type="number" step="0.00001" required value={playDropoffLat}
                          onChange={(e) => setPlayDropoffLat(Number(e.target.value))}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-mono font-bold text-slate-800 text-left"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-black text-slate-500 mb-1">عنوان العميل للتسليم بالتفصيل:</label>
                      <input 
                        type="text" required value={playDropoffAddress}
                        onChange={(e) => setPlayDropoffAddress(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-black text-slate-500 mb-1">تفاصيل ومحتوى الشحنة / الطلبية:</label>
                      <input 
                        type="text" required value={playDetails}
                        onChange={(e) => setPlayDetails(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-800"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-[11px] font-black text-slate-500 mb-1">رقم هاتف العميل للتنسيق:</label>
                        <input 
                          type="text" required value={playCustomerPhone}
                          onChange={(e) => setPlayCustomerPhone(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-250 rounded-xl px-3.5 py-2 text-xs font-mono font-bold text-slate-800 text-left"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-black text-slate-500 mb-1">اسم العميل بالكامل:</label>
                        <input 
                          type="text" required value={playCustomerName}
                          onChange={(e) => setPlayCustomerName(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-250 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-800"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-black text-slate-500 mb-1">أجر الكابتن المقترح بـ EGP كاش:</label>
                      <input 
                        type="number" required value={playExpectedPrice}
                        onChange={(e) => setPlayExpectedPrice(Number(e.target.value))}
                        className="w-full bg-slate-50 border border-slate-250 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-800"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={playgroundLoading}
                      className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-emerald-600/10"
                    >
                      {playgroundLoading ? (
                        <>
                          <RefreshCw className="animate-spin" size={16} />
                          <span>جاري بث وإرسال الأوردر لشبكة الطيارين...</span>
                        </>
                      ) : (
                        <>
                          <Play size={16} />
                          <span>إرسال طلب تجريبي فوري (POST Create Order) 🚀</span>
                        </>
                      )}
                    </button>
                  </form>

                  {/* Right panel: Live response desk & action monitors */}
                  <div className="lg:col-span-7 space-y-6 flex flex-col justify-start">
                    
                    {/* Live Request Visual Code parameters */}
                    <div className="bg-slate-900 rounded-3xl p-5 border border-slate-800">
                      <div className="flex justify-between items-center mb-3 flex-row-reverse">
                        <span className="text-[10px] text-emerald-400 font-mono">POST /api/v1/orders</span>
                        <span className="text-white/40 text-[9px] font-black uppercase">HTTP REQUEST INSPECTOR</span>
                      </div>
                      <div className="text-slate-300 font-mono text-[10px] space-y-1.5 leading-relaxed text-left border-t border-white/5 pt-3 overflow-x-auto">
                        <p><span className="text-pink-400">Authorization:</span> Bearer SUEZ-DELIVERY-PARTNER-2026</p>
                        <p><span className="text-pink-400">Content-Type:</span> application/json</p>
                        <p className="text-slate-400 shrink-0 mt-3 select-all whitespace-pre font-sans text-xs">
                          {`{\n  "pickup": { "lat": ${playPickupLat}, "lng": ${playPickupLng}, "address": "${playPickupAddress}" },\n  "dropoff": { "lat": ${playDropoffLat}, "lng": ${playDropoffLng}, "address": "${playDropoffAddress}" },\n  "details": "${playDetails}",\n  "customerName": "${playCustomerName}",\n  "customerPhone": "${playCustomerPhone}",\n  "expectedPrice": ${playExpectedPrice}\n}`}
                        </p>
                      </div>
                    </div>

                    {/* API response result window */}
                    <div className="bg-slate-950 rounded-3xl p-6 border border-slate-850 flex-1 flex flex-col text-left">
                      <div className="flex justify-between items-center mb-4 flex-row-reverse">
                        <span className={`text-[10px] font-mono font-bold ${playgroundResponse ? 'text-emerald-400' : 'text-slate-500'}`}>
                          {playgroundResponse ? `RESPONSE: ${playgroundResponse.status}` : 'Awaiting POST Request'}
                        </span>
                        <span className="text-white/40 text-[9px] font-black uppercase">LIVE JSON RESPONSE WINDOW</span>
                      </div>
                      
                      <div className="flex-1 bg-slate-900 p-4 rounded-xl border border-slate-800 font-mono text-[11px] text-slate-300 overflow-x-auto select-all leading-relaxed whitespace-pre min-h-[140px]">
                        {playgroundResponse ? (
                          JSON.stringify(playgroundResponse.body, null, 2)
                        ) : (
                          "// اضغط على زر 'إرسال طلب تجريبي فوري' في اليسار لمشاهدة رد الخادم المباشر هنا وحجز الطلب برقم حقيقي..."
                        )}
                      </div>

                      {/* Created Order Actions tracking panel */}
                      {createdPlaygroundOrderId && (
                        <div className="mt-5 p-5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl space-y-4 text-right">
                          <div>
                            <h4 className="font-extrabold text-sm text-emerald-300 mb-1">🚀 تم تسجيل وحجز الطلب بنجاح!</h4>
                            <p className="text-white/70 text-[11px] font-bold">يمكنك تجربة التتبع اللوجستي المالي المباشر الآن بالكامل عبر هذه الخيارات الفعالة:</p>
                          </div>

                          <div className="flex flex-wrap gap-2 justify-end">
                            <button
                              type="button"
                              onClick={handleTestGetStatus}
                              disabled={statusLoading}
                              className="px-4 py-2.5 bg-slate-950 hover:bg-slate-900 border border-emerald-500/40 text-emerald-400 font-extrabold text-[11px] rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
                            >
                              {statusLoading ? <RefreshCw className="animate-spin" size={12} /> : <Cpu size={12} />}
                              طلب حالة التتبع الفوري (GET Status)
                            </button>
                            <Link
                              href={`/track/${createdPlaygroundOrderId}`}
                              target="_blank"
                              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-[11px] rounded-xl flex items-center gap-1.5 transition-all shadow-md shadow-emerald-500/10"
                            >
                              <ExternalLink size={12} />
                              عرض خريطة التتبع التفاعلية الميدانية 🛰️
                            </Link>
                          </div>

                          {statusResponse && (
                            <div className="mt-3 bg-slate-950 p-4 rounded-xl border border-slate-850 font-mono text-[10px] text-left text-emerald-400 overflow-x-auto shrink-0 select-all whitespace-pre leading-relaxed">
                              {`GET /api/v1/orders/${createdPlaygroundOrderId}/status\nRESPONSE: ${statusResponse.status}\n\n` + JSON.stringify(statusResponse.body, null, 2)}
                            </div>
                          )}
                        </div>
                      )}

                    </div>

                  </div>

                </div>

              </div>

              {/* SECTION 4: CODE SNIPPETS SECTION FOR ALL POPULAR LANGUAGES */}
              <div className="bg-white p-8 rounded-[3rem] border border-slate-200 space-y-6">
                <div className="text-right">
                  <h3 className="text-xl font-display font-black text-slate-950 italic font-medium">النماذج البرمجية الجاهزة للتكامل والربط البرمجي</h3>
                  <p className="text-slate-400 text-xs font-bold leading-relaxed mt-1">انسخ الصق هذه النماذج في مشروعك البرمجي الخاص بالمتاجر الإلكترونية للربط الفوري والتوصيل التلقائي.</p>
                </div>

                <div className="flex gap-2.5 border-b border-slate-100 pb-3 justify-end flex-row-reverse">
                  {[
                    { id: 'nodejs', name: 'Node.js (Fetch/Axios)' },
                    { id: 'curl', name: 'cURL / Shell' },
                    { id: 'python', name: 'Python (Requests)' },
                    { id: 'php', name: 'PHP (cURL)' }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setCodeType(tab.id as any)}
                      className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                        codeType === tab.id ? 'bg-slate-950 text-white shadow-md' : 'text-slate-400 hover:bg-slate-50'
                      }`}
                    >
                      {tab.name}
                    </button>
                  ))}
                </div>

                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-850 text-left overflow-x-auto select-all relative group font-mono text-[11px] leading-relaxed text-slate-300">
                  <button 
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        codeType === 'nodejs' ? `const params = {
  pickup: { lat: 29.966, lng: 32.549, address: "السويس, مطعم الفتح" },
  dropoff: { lat: 29.972, lng: 32.532, address: "السلام 2, عمارة 5" },
  details: "علبة كشري حجم كبير + 2 بيبسي",
  customerName: "أحمد محمود",
  customerPhone: "0100000000",
  expectedPrice: 15
};

fetch("https://delivery-suez.online/api/v1/orders", {
  method: "POST",
  headers: {
    "Authorization": "Bearer SUEZ-DELIVERY-PARTNER-2026",
    "Content-Type": "application/json"
  },
  body: JSON.stringify(params)
})
.then(res => res.json())
.then(response => console.log('Order Created:', response))
.catch(err => console.error('API Error:', err));` :
                        codeType === 'curl' ? `curl -X POST https://delivery-suez.online/api/v1/orders \\
  -H "Authorization: Bearer SUEZ-DELIVERY-PARTNER-2026" \\
  -H "Content-Type: application/json" \\
  -d '{
    "pickup": { "lat": 29.966, "lng": 32.549, "address": "السويس, مطعم الفتح" },
    "dropoff": { "lat": 29.972, "lng": 32.532, "address": "السلام 2, عمارة 5" },
    "details": "علبة كشري حجم كبير + 2 بيبسي",
    "customerName": "أحمد محمود",
    "customerPhone": "0100000000",
    "expectedPrice": 15
  }'` :
                        codeType === 'python' ? `import requests

url = "https://delivery-suez.online/api/v1/orders"
headers = {
    "Authorization": "Bearer SUEZ-DELIVERY-PARTNER-2026",
    "Content-Type": "application/json"
}
payload = {
    "pickup": { "lat": 29.966, "lng": 32.549, "address": "السويس, مطعم الفتح" },
    "dropoff": { "lat": 29.972, "lng": 32.532, "address": "السلام 2, عمارة 5" },
    "details": "علبة كشري حجم كبير + 2 بيبسي",
    "customerName": "أحمد محمود",
    "customerPhone": "0100000000",
    "expectedPrice": 15
}

response = requests.post(url, json=payload, headers=headers)
print(response.json())` :
                        `<?php
$url = "https://delivery-suez.online/api/v1/orders";
$headers = [
    "Authorization: Bearer SUEZ-DELIVERY-PARTNER-2026",
    "Content-Type": "application/json"
];
$payload = [
    "pickup" => [ "lat" => 29.966, "lng" => 32.549, "address" => "السويس, مطعم الفتح" ],
    "dropoff" => [ "lat" => 29.972, "lng" => 32.532, "address" => "السلام 2, عمارة 5" ],
    "details" => "علبة كشري حجم كبير + 2 بيبسي",
    "customerName" => "أحمد محمود",
    "customerPhone" => "0100000000",
    "expectedPrice" => 15
];

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
curl_close($ch);

print_r(json_decode($response, true));
?>`
                      );
                      showNotification("📋 تم نسخ الكود البرمجي المختار إلى الحافظة بنجاح!");
                    }}
                    className="absolute top-4 left-4 px-3.5 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-[10px] font-black tracking-widest leading-none z-10 transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                  >
                    COPY CODE
                  </button>

                  {codeType === 'nodejs' && (
                    <pre>{`const params = {
  pickup: { lat: 29.966, lng: 32.549, address: "السويس, مطعم الفتح" },
  dropoff: { lat: 29.972, lng: 32.532, address: "السلام 2, عمارة 5" },
  details: "علبة كشري حجم كبير + 2 بيبسي",
  customerName: "أحمد محمود",
  customerPhone: "0100000000",
  expectedPrice: 15
};

fetch("https://delivery-suez.online/api/v1/orders", {
  method: "POST",
  headers: {
    "Authorization": "Bearer SUEZ-DELIVERY-PARTNER-2026",
    "Content-Type": "application/json"
  },
  body: JSON.stringify(params)
})
.then(res => res.json())
.then(response => console.log('Order Created:', response))
.catch(err => console.error('API Error:', err));`}</pre>
                  )}

                  {codeType === 'curl' && (
                    <pre>{`curl -X POST https://delivery-suez.online/api/v1/orders \\
  -H "Authorization: Bearer SUEZ-DELIVERY-PARTNER-2026" \\
  -H "Content-Type: application/json" \\
  -d '{
    "pickup": { "lat": 29.966, "lng": 32.549, "address": "السويس, مطعم الفتح" },
    "dropoff": { "lat": 29.972, "lng": 32.532, "address": "السلام 2, عمارة 5" },
    "details": "علبة كشري حجم كبير + 2 بيبسي",
    "customerName": "أحمد محمود",
    "customerPhone": "0100000000",
    "expectedPrice": 15
  }'`}</pre>
                  )}

                  {codeType === 'python' && (
                    <pre>{`import requests

url = "https://delivery-suez.online/api/v1/orders"
headers = {
    "Authorization": "Bearer SUEZ-DELIVERY-PARTNER-2026",
    "Content-Type": "application/json"
}
payload = {
    "pickup": { "lat": 29.966, "lng": 32.549, "address": "السويس, مطعم الفتح" },
    "dropoff": { "lat": 29.972, "lng": 32.532, "address": "السلام 2, عمارة 5" },
    "details": "علبة كشري حجم كبير + 2 بيبسي",
    "customerName": "أحمد محمود",
    "customerPhone": "0100000000",
    "expectedPrice": 15
}

response = requests.post(url, json=payload, headers=headers)
print(response.json())`}</pre>
                  )}

                  {codeType === 'php' && (
                    <pre>{`<?php
$url = "https://delivery-suez.online/api/v1/orders";
$headers = [
    "Authorization: Bearer SUEZ-DELIVERY-PARTNER-2026",
    "Content-Type": "application/json"
];
$payload = [
    "pickup" => [ "lat" => 29.966, "lng" => 32.549, "address" => "السويس, مطعم الفتح" ],
    "dropoff" => [ "lat" => 29.972, "lng" => 32.532, "address" => "السلام 2, عمارة 5" ],
    "details" => "علبة كشري حجم كبير + 2 بيبسي",
    "customerName" => "أحمد محمود",
    "customerPhone" => "0100000000",
    "expectedPrice" => 15
];

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
curl_close($ch);

print_r(json_decode($response, true));
?>`}</pre>
                  )}

                </div>
              </div>

            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
