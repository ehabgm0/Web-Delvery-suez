'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SafeImage from '@/components/SafeImage';
import { 
  Zap, 
  MapPin, 
  Heart, 
  Share2, 
  Play, 
  ExternalLink,
  ChevronLeft,
  Truck,
  Apple,
  HeartPulse,
  ShoppingCart,
  Star,
  Users,
  Award,
  BookOpen,
  Check,
  X,
  ArrowLeftRight,
  Download
} from 'lucide-react';
import { AREAS, SERVICES } from '@/lib/constants';

// Social Post type structure
const SOCIAL_POSTS = [
  {
    id: 'fb-1',
    platform: 'facebook',
    type: 'Reel',
    title: 'كواليس أسرع توصيل أوردر في منطقة الصباح بالسويس مع كابتن فايز 🚀💨 دايماً سابقين خطوة!',
    imageSrc: '/images/suez_hero_delivery.png',
    videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-delivery-man-with-a-face-mask-riding-motorcycle-41130-large.mp4',
    embedSrc: 'https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fwatch%2F%3Fv%3D3136854129929285&show_text=0',
    views: '24.8K',
    baseLikes: 1450,
    link: 'https://www.facebook.com/DeliverySuezOnline'
  },
  {
    id: 'ig-1',
    platform: 'instagram',
    type: 'Reel',
    title: 'عروض الصيف نار وحرق أسعار! 🔥 خصم 50% على الدليفري لجميع أصحاب مشاريع الأونلاين ومطاعم السويس.',
    imageSrc: '/images/suez_courier.png',
    videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-young-man-riding-a-scooter-in-the-streets-44161-large.mp4',
    embedSrc: 'https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fwatch%2F%3Fv%3D4537128526367352&show_text=0',
    views: '18.2K',
    baseLikes: 940,
    link: 'https://www.instagram.com/deliverysuezonline'
  },
  {
    id: 'tk-1',
    platform: 'tiktok',
    type: 'Reel',
    title: 'تحدي الدليفري عيون موسى والأربعين في 20 دقيقة بس! 😱 كباتن السويس قد التحدي في أي مكان وتحت أي ظرف.',
    imageSrc: '/images/suez_port_captain.png',
    videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-food-delivery-courier-riding-scooter-in-city-streets-44833-large.mp4',
    embedSrc: 'https://www.tiktok.com/embed/v2/7161823459142077701',
    views: '65.3K',
    baseLikes: 4210,
    link: 'https://www.tiktok.com/@deliverysuezonline'
  },
  {
    id: 'fb-2',
    platform: 'facebook',
    type: 'Post',
    title: 'بيان رسمي 📣: يسعدنا الإعلان عن بدء التغطية اللوجستية الكاملة في مدينة الملك عبدالله وجاري إتاحة طيارين 24 ساعة.',
    imageSrc: '/images/suez_hero_delivery.png',
    videoSrc: null,
    embedSrc: 'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FDeliverySuezOnline%2Fposts%2Fpfbid02oB7V1v8bAdWcFRyqFkUrW8oY8j59eS9f9g7e&width=400',
    views: '5.1K',
    baseLikes: 588,
    link: 'https://www.facebook.com/DeliverySuezOnline'
  },
  {
    id: 'ig-2',
    platform: 'instagram',
    type: 'Reel',
    title: 'ازاي توظف طيار خاص بالساعة أو باليومية ليقضي مشاوير بيتك وصيدلياتك؟ شرح مبسط للخدمة الأسهل بالسويس 📱✨',
    imageSrc: '/images/suez_port_captain.png',
    videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-courier-carrying-delivery-backpack-while-riding-motorcycle-44829-large.mp4',
    embedSrc: 'https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fwatch%2F%3Fv%3D1293026857973059&show_text=0',
    views: '14.9K',
    baseLikes: 1102,
    link: 'https://www.instagram.com/deliverysuezonline'
  },
  {
    id: 'tk-2',
    platform: 'tiktok',
    type: 'Post',
    title: 'شارك كود الإحالة الخاص بك مع أصدقائك في السويس واحصل على 50 جنيهاً رصيد مجاني فوري مع أول أوردر ليهم! 🎁💰',
    imageSrc: '/images/suez_courier.png',
    videoSrc: null,
    embedSrc: 'https://www.tiktok.com/embed/v2/7279124021200375046',
    views: '38.6K',
    baseLikes: 2970,
    link: 'https://www.tiktok.com/@deliverysuezonline'
  }
];

// Featured Blog Articles schema
const FEATURED_ARTICLES = [
  {
    slug: 'suez-logistics-revolution',
    title: 'كيف غيّر ديليفري السويس أونلاين مفهوم الشحن اللوجستي المحلي؟',
    desc: 'تحليل دقيق لأثر التكنولوجيا ونظام تعيين الكباتن فري لانس بالـ GPS لتوفير 40% من وقت توصيل الأغذية والأدوية بالسويس.',
    date: '21 مايو 2026',
    readTime: '4 دقائق قراءة'
  },
  {
    slug: 'delivery-prices-egypt',
    title: 'دليلك الشامل لرسوم الدليفري العادلة ومحاسبة الطيارين بالجنيه المصري (EGP) بالسويس',
    desc: 'اكتشف كيف تقدم منصة Delivery-Suez أسعار نقل مدروسة وتنافسية تضمن أقصى ربحية للكباتن وراحة ممتازة لأصحاب الأعمال والبيوت كاش.',
    date: '20 مايو 2026',
    readTime: '5 دقائق قراءة'
  }
];

export default function Home() {
  const [activeTab, setActiveTab] = React.useState<'all' | 'facebook' | 'instagram' | 'tiktok'>('all');
  const [activeCampaign, setActiveCampaign] = React.useState<'comparison' | 'port-tewfik' | 'salam' | 'playstore'>('comparison');
  const [playingReelId, setPlayingReelId] = React.useState<string | null>(null);
  const [likedPosts, setLikedPosts] = React.useState<Record<string, boolean>>({});
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  const handleLike = (id: string) => {
    setLikedPosts(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const copyShareLink = (link: string) => {
    navigator.clipboard.writeText(link);
    setToastMessage('تم نسخ الرابط المباشر للريل لمشاركته مع أصدقائك! 🚀');
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <header className="pt-36 pb-24 bg-gradient-to-b from-slate-50 to-white text-right overflow-hidden relative" dir="rtl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Col: Hero Texts */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand/10 text-brand rounded-full font-bold text-xs mb-6">
                <Zap size={14} className="fill-brand" />
                <span>المنصة الأولى والوحيدة للشحن والتوصيل بالسويس</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-display font-black text-slate-900 leading-tight mb-6">
                سدّ حاجتك <span className="text-brand">بسرعة الصاروخ</span> في السويس!
              </h1>
              <p className="text-slate-600 text-lg leading-relaxed mb-8 font-medium">
                تطبيق ديليفري السويس أونلاين يوفر لك أسرع كباتن دليفري فري لانس مجهزين بالكامل لتوصيل وجبات المطاعم، صيدليات السويـس، طلبات السوبر ماركت والشحنات المنزلية بأمان تام طوال الـ 24 ساعة.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 justify-start">
                <Link 
                  href="/webview" 
                  className="px-8 py-4 bg-brand text-white rounded-2xl font-black text-sm hover:scale-105 transition-all shadow-lg shadow-brand/20 flex items-center gap-2"
                >
                  <Zap size={16} className="fill-white" />
                  اطلب كابتن ديليفري الآن
                </Link>
                <Link 
                  href="/blog" 
                  className="px-8 py-4 bg-white text-slate-800 border border-slate-200 rounded-2xl font-black text-sm hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm"
                >
                  <BookOpen size={16} className="text-brand" />
                  اقرأ المقالات والأخبار اللوجستية
                </Link>
              </div>

              {/* Rating indicators */}
              <div className="mt-12 flex items-center gap-6 justify-end flex-row-reverse border-t border-slate-100 pt-8">
                <div className="text-right">
                  <p className="text-2xl font-black text-slate-900 font-display">15,000+</p>
                  <p className="text-slate-500 text-xs font-bold">أوردر مدفوع EGP</p>
                </div>
                <div className="w-px h-10 bg-slate-200" />
                <div className="text-right">
                  <p className="text-2xl font-black text-slate-900 font-display">400+</p>
                  <p className="text-slate-500 text-xs font-bold font-sans">كابتن حر بالسويس</p>
                </div>
                <div className="w-px h-10 bg-slate-200" />
                <div className="text-right flex items-center gap-1.5 flex-row-reverse">
                  <span className="text-amber-500 font-black text-xl">4.9</span>
                  <div className="flex text-amber-500">
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                  </div>
                </div>
              </div>

            </div>

            {/* Right Col: Hero Visual Layout */}
            <div className="relative aspect-[4/3] w-full rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
              <SafeImage 
                src="/images/suez_hero_delivery.png" 
                fallbackSrc="/images/suez_port_captain.png"
                alt="Delivery Suez Captain riding scooter securely near Suez Canal" 
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-8 right-8 left-8 bg-white/95 backdrop-blur-md p-6 rounded-3xl text-right max-w-sm mr-auto">
                <p className="text-brand text-xs font-black mb-1">نشط الآن في السويس 🟢</p>
                <p className="text-slate-900 font-bold text-sm leading-relaxed">
                  احجز طيارك الحر لتوصيل المقاضي والروشتات الطبية أو استلام طرود مشاريعك المنزلية فوراً.
                </p>
                <div className="mt-4 flex gap-2 justify-end">
                  <span className="px-3 py-1 bg-slate-100 rounded-full text-xs font-bold text-slate-600">Salam 1</span>
                  <span className="px-3 py-1 bg-slate-100 rounded-full text-xs font-bold text-slate-600">Arbayeen</span>
                </div>
              </div>
            </div>

          </div>
        </div>
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-brand/10 rounded-full blur-[120px] -z-10" />
      </header>

      {/* Services Grid Section */}
      <section className="py-24 bg-white text-right" dir="rtl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-xs font-black text-brand uppercase tracking-widest mb-3">ماذا نقدم للسوايسة؟</h2>
            <h3 className="text-3xl md:text-5xl font-display font-black text-slate-900 mb-6">خدمات ديليفري شاملة طوال اليوم</h3>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium">
              نقوم بربطك مباشرة بجيش من الطيارين المحترفين في حي الأربعين، فيصل، بورتوفيق، والسلام لتنفيذ أي مشوار.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICES.map((srv) => {
              const IconComp = srv.id === 'food' ? Apple : srv.id === 'medicine' ? HeartPulse : srv.id === 'grocery' ? ShoppingCart : Truck;
              return (
                <div key={srv.id} className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 hover:border-brand/30 hover:shadow-xl transition-all group">
                  <div className="w-14 h-14 bg-white text-brand rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-brand group-hover:text-white transition-colors">
                    <IconComp size={28} />
                  </div>
                  <h4 className="font-display font-black text-xl text-slate-900 mb-3">{srv.arabicTitle}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6 font-semibold">{srv.arabicDesc}</p>
                  <Link href="/webview" className="text-brand font-black text-xs inline-flex items-center gap-1.5 hover:underline">
                    اطلب الخدمة الآن
                    <ChevronLeft size={14} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Suez Campaign & Interactive Ad Gallery (User request: optimize search engine authority and integrate marketing assets with SEO text) */}
      <section className="py-24 bg-gradient-to-b from-white to-slate-50 border-t border-slate-100 text-right" dir="rtl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand/10 text-brand rounded-full font-bold text-xs mb-4">
              <Award size={14} className="fill-brand" />
              <span>الحملات الإعلانية الميدانية والعروض الحصرية بالسويس</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-black text-slate-900 mb-6 font-display">معرض إعلانات وعروض ديليفري السويس</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium">
              تصفح حملاتنا الميدانية المنتشرة في شوارع السويس. صممنا هذه العروض لتوفير 50% من تكاليف شحن أوردرات أصحاب المشاريع وأهالي السويس.
            </p>
          </div>

          {/* Campaign Selector Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {[
              { id: 'comparison', name: 'حملة الفرق بيبان! ⚖️' },
              { id: 'port-tewfik', name: 'خدمة الأربعين لبورتوفيق بـ 30ج 🌊' },
              { id: 'salam', name: 'خدمة الأربعين للسلام بـ 40ج 🚀' },
              { id: 'playstore', name: 'تطبيق Google Play التجريبي 📱' }
            ].map(campaign => (
              <button
                key={campaign.id}
                onClick={() => setActiveCampaign(campaign.id as any)}
                className={`px-6 py-4 rounded-2xl font-black text-sm transition-all flex items-center gap-2 shadow-sm cursor-pointer ${
                  activeCampaign === campaign.id 
                  ? 'bg-brand text-white scale-105 shadow-md shadow-brand/20' 
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-100'
                }`}
              >
                {campaign.name}
              </button>
            ))}
          </div>

          {/* Campaign Display Area with motion and rich content */}
          <div className="bg-white rounded-[3.5rem] p-8 md:p-12 border border-slate-100 shadow-xl overflow-hidden">
            {activeCampaign === 'comparison' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Visual side: Comparison Card */}
                <div className="relative aspect-[4/3] w-full rounded-[2.5rem] bg-slate-50 overflow-hidden border border-slate-100 p-6 flex flex-col justify-between">
                  {/* Top Badge */}
                  <div className="flex justify-between items-center bg-transparent">
                    <span className="px-4 py-1.5 bg-brand text-white text-xs font-black rounded-full shadow-sm animate-pulse">
                      الإعلان الرسمي
                    </span>
                    <span className="text-xs font-bold text-slate-400 font-mono">SUEZ-AD-COMPARE</span>
                  </div>

                  {/* Header */}
                  <div className="text-center my-4">
                    <h4 className="text-2xl font-black text-slate-900 font-display mb-1">الفرق بيبان! ⚡</h4>
                    <p className="text-slate-500 text-xs font-bold">لماذا تختار ديليفري السويس لحل مشاكل التوصيل؟</p>
                  </div>

                  {/* Two columns layout (Regular vs Delivery Suez) */}
                  <div className="grid grid-cols-2 gap-4 my-2">
                    {/* Delivery Suez column */}
                    <div className="bg-brand/5 border border-brand/20 p-4 rounded-3xl text-right flex flex-col justify-between">
                      <div>
                        <span className="text-xs font-black text-brand bg-brand/10 px-2 py-1 rounded-lg inline-block mb-3">ديليفري السويس أونلاين</span>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-1.5 justify-end text-xs font-bold text-slate-700">
                            <span>كاباتن متاحين طوال 24 ساعة</span>
                            <Check size={14} className="text-emerald-500 shrink-0" />
                          </li>
                          <li className="flex items-center gap-1.5 justify-end text-xs font-bold text-slate-700">
                            <span>تتبع ذكي (AI/GPS) ومباشر</span>
                            <Check size={14} className="text-emerald-500 shrink-0" />
                          </li>
                          <li className="flex items-center gap-1.5 justify-end text-xs font-bold text-slate-700">
                            <span>التزام وحفظ للأمانة والطرود</span>
                            <Check size={14} className="text-emerald-500 shrink-0" />
                          </li>
                        </ul>
                      </div>
                      <div className="mt-4 pt-4 border-t border-brand/10 text-center">
                        <p className="text-xs font-black text-brand">سهل • سريع • واضح • عملي</p>
                      </div>
                    </div>

                    {/* Regular delivery column */}
                    <div className="bg-slate-50 border border-slate-200 p-4 rounded-3xl text-right flex flex-col justify-between opacity-80">
                      <div>
                        <span className="text-xs font-black text-slate-500 bg-slate-100 px-2 py-1 rounded-lg inline-block mb-3">الدليفري التقليدي المشترك</span>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-1.5 justify-end text-xs font-bold text-slate-500">
                            <span>تأخير دائم واعتذارات مستمرة</span>
                            <X size={14} className="text-rose-500 shrink-0" />
                          </li>
                          <li className="flex items-center gap-1.5 justify-end text-xs font-bold text-slate-500">
                            <span>أسعار عشوائية واستغلال للمواسم</span>
                            <X size={14} className="text-rose-500 shrink-0" />
                          </li>
                          <li className="flex items-center gap-1.5 justify-end text-xs font-bold text-slate-500">
                            <span>لا يوجد تتبع أو حماية للتاجر</span>
                            <X size={14} className="text-rose-500 shrink-0" />
                          </li>
                        </ul>
                      </div>
                      <div className="mt-4 pt-4 border-t border-slate-200 text-center text-slate-400 text-[10px] font-bold">
                        تعب ومشاكل مستمرة
                      </div>
                    </div>
                  </div>

                  {/* Brand signature */}
                  <div className="text-center pt-2 border-t border-slate-100 text-[10px] font-bold text-slate-400">
                    الحملة الإعلانية الميدانية الرسمية لأهالي السويس 2026
                  </div>
                </div>

                {/* Content side */}
                <div className="text-right">
                  <h3 className="text-2xl md:text-3xl font-display font-black text-slate-900 mb-6 font-display">
                    حملة &quot;الفرق بيبان!&quot; — زهقت من التأخير والاستغلال بالسويس؟
                  </h3>
                  <div className="space-y-4 mb-8">
                    <p className="text-slate-600 text-sm leading-relaxed font-semibold">
                      تعتبر حملة <strong className="text-brand">الفرق بيبان!</strong> أحد أشهر حملاتنا التسويقية التثقيفية المنشورة في شوارع بورتوفيق، فيصل، والصباح لحماية أصحاب المطاعم والتجار المبتدئين من الاستغلال والضياع.
                    </p>
                    <p className="text-slate-600 text-sm leading-relaxed font-semibold">
                      نحن نقدم نظاماً تقنياً يضمن للتاجر والزبون معرفة سعر الأوردر مسبقاً بناءً على نظام خرائط جي إس والربط الفوري. لن تحتاج للانتظار لساعات للتواصل مع كابتن متاح أو القلق من زيادة الأسعار الفجائية خلال الأعياد والمواسم.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-4 justify-start">
                    <Link href="/webview" className="px-6 py-3 bg-brand text-white rounded-xl font-bold text-xs hover:scale-105 transition-all">
                      اطلب طيارك وجرب الفرق الآن
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {activeCampaign === 'port-tewfik' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Visual side */}
                <div className="relative aspect-[4/3] w-full rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-md">
                  <SafeImage 
                    src="/images/suez_port_captain.png" 
                    fallbackSrc="/images/suez_port_captain.png"
                    alt="Suez Port Tewfik Delivery Campaign" 
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute bottom-6 right-6 left-6 text-white text-right">
                    <span className="px-3 py-1 bg-brand text-white text-[10px] font-black rounded-full mb-2 inline-block">
                      عروض بورتوفيق والأربعين
                    </span>
                    <h4 className="text-xl md:text-2xl font-black font-display text-white mb-2">من الأربعين لبورتوفيق.. الدليفري بقى أذكأ وأوفر!</h4>
                    <p className="text-white/80 text-xs font-semibold">توصيل وتوريد كاش بـ 30 جنيه مصري فقط لجميع الطرود.</p>
                  </div>
                </div>

                {/* Content side */}
                <div className="text-right">
                  <h3 className="text-2xl md:text-3xl font-display font-black text-slate-900 mb-6 font-display">
                    عرض الموانئ والشحن الموحد بـ 30 جنيه (الأربعين ⇆ بورتوفيق)
                  </h3>
                  <div className="space-y-4 mb-8">
                    <p className="text-slate-600 text-sm leading-relaxed font-semibold">
                      أطلقنا خدمة <strong className="text-brand">الشحن الموحد بـ 30 جنيه EGP</strong> لتشجيع حركة التبادل اللوجستي للملابس، والأغذية، والاكسسوارات من أسواق الأربعين التاريخية إلى الضواحي الساحلية بحي السويس وبورتوفيق.
                    </p>
                    <p className="text-slate-600 text-sm leading-relaxed font-semibold">
                      هذا العرض متاح طوال أيام الأسبوع بلا شروط أو قيود على حجم الطلب، مما يساعد المطابخ المنزلية والمحلات على توسيع حجم مبيعاتهم وزيادة عدد عملائهم بأقل تكلفة توصيل ممكنة بالسويس.
                    </p>
                  </div>
                  <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl mb-6">
                    <p className="text-xs font-bold text-slate-600 leading-relaxed">
                      💡 <strong>نصيحة ذكية:</strong> يمكنك جدولة عدة رحلات من لوحة التحكم الذكية لربط كابتن واحد يقوم بجمع وتوصيل شحناتك دفعة واحدة لتوفير أكثر من 40% من النفقات اليومية.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-4 justify-start">
                    <Link href="/webview" className="px-6 py-3 bg-brand text-white rounded-xl font-bold text-xs hover:scale-105 transition-all">
                      شحن أوردر لبورتوفيق الآن
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {activeCampaign === 'salam' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Visual side */}
                <div className="relative aspect-[4/3] w-full rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-md">
                  <SafeImage 
                    src="/images/suez_courier.png" 
                    fallbackSrc="/images/suez_courier.png"
                    alt="Suez Al-Salam Speed Campaign" 
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute bottom-6 right-6 left-6 text-white text-right">
                    <span className="px-3 py-1 bg-amber-500 text-slate-950 text-[10px] font-black rounded-full mb-2 inline-block">
                      طيران سريع عابر للأحياء
                    </span>
                    <h4 className="text-xl md:text-2xl font-black font-display text-white mb-2">أسرع دليفري في السويس بأسعار بلا منافسة!</h4>
                    <p className="text-white/80 text-xs font-semibold">توصيل خاص لأطول المسافات من فيصل والأربعين إلى السلام بـ 40 جنية فقط.</p>
                  </div>
                </div>

                {/* Content side */}
                <div className="text-right">
                  <h3 className="text-2xl md:text-3xl font-display font-black text-slate-900 mb-6 font-display">
                    حملة التوصيل السريع لحي السلام (من مركز المدينة بـ 40 جنيه!)
                  </h3>
                  <div className="space-y-4 mb-8">
                    <p className="text-slate-600 text-sm leading-relaxed font-semibold">
                      يشتكي العديد من سكان ومشاريع السويس بحي السلام (السلام 1 والسلام 2) من بعد المسافة وامتناع العديد من كباتن الدليفري عن التوصيل أو فرض تسعيرة مبالغ فيها قد تصل إلى 60 و 70 جنيه مصري.
                    </p>
                    <p className="text-slate-600 text-sm leading-relaxed font-semibold">
                      قمنا في منصة <strong className="text-brand">ديليفري السويس</strong> بحل هذه الأزمة جذرياً عبر تخصيص طيارين طوافين بالدراجات النارية والاسكوتر المجهزة بصندوق حراري، يغطون أحياء السلام ومحيط الموقف والجامعة طوال 24 ساعة بتكلفة عادلة وثابتة تبدأ من 40 جنيه مصري فقط.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border border-slate-100 bg-slate-50 p-4 rounded-2xl text-center">
                      <p className="text-lg font-black text-brand">30 دقيقة</p>
                      <p className="text-slate-500 text-[10px] font-bold">أقصى وقت توصيل للسلام</p>
                    </div>
                    <div className="border border-slate-100 bg-slate-50 p-4 rounded-2xl text-center">
                      <p className="text-lg font-black text-brand">40 جنيه</p>
                      <p className="text-slate-500 text-[10px] font-bold">تسعيرة شحن مقطوعة وواضحة</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4 justify-start mt-6">
                    <Link href="/webview" className="px-6 py-3 bg-brand text-white rounded-xl font-bold text-xs hover:scale-105 transition-all">
                      احجز رحلة توصيل للسلام فوراً
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {activeCampaign === 'playstore' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Visual side: Mock Play Store list */}
                <div className="relative aspect-[4/3] w-full rounded-[2.5rem] bg-slate-950 text-white overflow-hidden p-8 flex flex-col justify-between border border-slate-800">
                  <div className="flex justify-between items-center bg-transparent">
                    <div className="flex items-center gap-2 bg-transparent">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      <span className="text-[10px] text-emerald-400 font-bold">النسخة التجريبية الحية</span>
                    </div>
                    <span className="text-slate-500 text-[10px] font-mono">GOOGLE-PLAY-MOCKUP</span>
                  </div>

                  {/* App Icon metadata block */}
                  <div className="flex gap-4 items-center flex-row-reverse my-2">
                    <div className="w-16 h-16 rounded-2xl bg-brand flex items-center justify-center font-black text-white text-3xl shadow-lg border border-white/20">
                      DS
                    </div>
                    <div className="text-right">
                      <h4 className="text-xl font-black text-white">Delivery Suez - ديلفرى السويس</h4>
                      <p className="text-brand text-xs font-bold font-sans">Ehabgm Online Services</p>
                      <p className="text-slate-400 text-[10px] font-bold mt-1">منتج تجريبي قبل الإطلاق المفتوح</p>
                    </div>
                  </div>

                  {/* Rating stats */}
                  <div className="grid grid-cols-3 gap-2 border-y border-white/10 py-4 text-center my-2">
                    <div>
                      <p className="text-sm font-black text-white font-sans">4.9 ★</p>
                      <p className="text-slate-500 text-[9px] font-bold font-semibold">1.2K تقييم</p>
                    </div>
                    <div className="border-x border-white/10">
                      <p className="text-sm font-black text-white font-sans">10K+</p>
                      <p className="text-slate-500 text-[9px] font-bold font-semibold">عملية تثبيت</p>
                    </div>
                    <div>
                      <p className="text-sm font-black text-emerald-400 font-sans">3+ سنوات</p>
                      <p className="text-slate-500 text-[9px] font-bold font-semibold">للجميع</p>
                    </div>
                  </div>

                  {/* Review Quote */}
                  <div className="bg-white/5 border border-white/10 p-3 rounded-2xl text-right">
                    <div className="flex justify-between items-center mb-1 flex-row-reverse bg-transparent">
                      <span className="text-slate-400 text-[9px] font-bold font-sans">أمجد السويسي</span>
                      <div className="flex text-amber-500 text-[8px] bg-transparent">★★★★★</div>
                    </div>
                    <p className="text-white/80 text-[10px] leading-relaxed font-semibold">
                      &quot;تطبيق ممتاز جداً، أسعار التوصيل واضحة، الكباتن محترمين وسريعين، أحسن من جشع الجروبات والاتصال التلفوني.&quot;
                    </p>
                  </div>

                  {/* Download button mockup */}
                  <button className="w-full py-3 bg-brand text-white font-bold rounded-xl text-xs hover:bg-brand/90 transition-all flex items-center justify-center gap-2">
                    <Download size={14} className="animate-bounce" />
                    <span>تثبيت النسخة التجريبية المجانية من جوجل بلاي</span>
                  </button>
                </div>

                {/* Content side */}
                <div className="text-right">
                  <h3 className="text-2xl md:text-3xl font-display font-black text-slate-900 mb-6 font-display">
                    انضم لـ 10,000+ مستخدم في السويس وحمل التطبيق الآن
                  </h3>
                  <div className="space-y-4 mb-8">
                    <p className="text-slate-600 text-sm leading-relaxed font-semibold">
                      تطبيق <strong className="text-brand">ديليفري السويس</strong> متاح حالياً للتجربة والتعليق قبل الإطلاق العام على متجر Google Play. يمكنك تحميل الملف التجريبي واستخدام كافة مميزات التتبع الذكي، وحجز الكباتن، وجدولة تسليم الطرود كاش مجاناً.
                    </p>
                    <p className="text-slate-600 text-sm leading-relaxed font-semibold">
                      بصفتنا منصة لوجستية تضمن معايير عالية الجودة، فإن تعليقاتك تساهم مباشرة في تحسين خدمات طيران السوشيال ميديا وتوصيل المقاضي والأطعمة. حمل التطبيق وشاهد بنفسك الفرق وحرق الأسعار الحقيقي بالسويس!
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-4 justify-start">
                    <Link href="/webview" className="px-6 py-3 bg-slate-950 text-white rounded-xl font-bold text-xs hover:bg-black transition-all flex items-center gap-1.5 shadow-md">
                      <Download size={14} />
                      انتقل للوحة التحكم والتحميل الفوري
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Social Media Live Reel/Post Feed Switching (Requested engagement feature) */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 text-right" dir="rtl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-transparent">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand/10 text-brand rounded-full font-bold text-sm mb-4">
            <Zap size={14} className="fill-brand" />
            <span>البث والنشاط الاجتماعي المباشر</span>
          </div>
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">#DeliverySuez</h2>
          <h3 className="text-3xl md:text-5xl font-display font-black mb-6">تابع أحدث الريلز، التريندات، واليوميات بالسويس</h3>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed mb-12 font-medium">
            منصتنا متزامنة مع قنوات السوشيال ميديا الرسمية (فيسبوك، إنستغرام، تيك توك) لعرض أحدث مغامرات الكباتن، العروض العاجلة، وكواليس التوصيل الفورية في السويس.
          </p>

          {/* Platform Switcher Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {[
              { id: 'all', name: 'كل المنصات 📲' },
              { id: 'facebook', name: 'فيسبوك ريلز 📘' },
              { id: 'instagram', name: 'إنستغرام 📸' },
              { id: 'tiktok', name: 'تيك توك 🎵' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setPlayingReelId(null);
                }}
                className={`px-6 py-3 rounded-2xl font-bold text-sm transition-all flex items-center gap-2 shadow-sm cursor-pointer ${
                  activeTab === tab.id 
                  ? 'bg-brand text-white scale-105 shadow-brand/20' 
                  : 'bg-white text-slate-600 hover:bg-slate-100'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
          
          {/* Post/Reels Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SOCIAL_POSTS.filter(item => activeTab === 'all' || item.platform === activeTab).map((item) => {
              const isPlaying = playingReelId === item.id;
              const userHasLiked = likedPosts[item.id] || false;
              const currentLikesCount = item.baseLikes + (userHasLiked ? 1 : 0);

              return (
                <div key={item.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-md border border-slate-100 text-right group hover:shadow-2xl transition-all relative flex flex-col h-[520px]">
                  
                  {/* Media Frame wrapper */}
                  <div className="relative h-[320px] overflow-hidden bg-slate-900 flex items-center justify-center">
                    {isPlaying && item.embedSrc ? (
                      <iframe 
                        src={item.embedSrc} 
                        className="w-full h-full object-cover border-0 z-10 rounded-t-[2.5rem]"
                        scrolling="yes"
                        frameBorder="0"
                        allowFullScreen={true}
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                      />
                    ) : (
                      <>
                        <SafeImage 
                          src={item.imageSrc} 
                          fallbackSrc="/images/suez_hero_delivery.png"
                          alt={item.title} 
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                        />
                        {/* Dark Filter & Overlays */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-85" />
                        
                        {/* Play Overlay if video type */}
                        {item.embedSrc && (
                          <button 
                            onClick={() => setPlayingReelId(item.id)}
                            className="absolute w-16 h-16 bg-white/20 hover:bg-brand/95 hover:scale-110 text-white rounded-full flex items-center justify-center backdrop-blur-md shadow-2xl transition-all z-20 cursor-pointer group-hover:bg-brand animate-pulse"
                          >
                            <Play size={32} className="text-white fill-white translate-x-[-1px]" />
                          </button>
                        )}
                      </>
                    )}

                    {/* Platform indicator badge */}
                    <span className={`absolute top-6 right-6 px-4 py-2 text-white text-xs font-bold uppercase tracking-widest rounded-full backdrop-blur-md z-15 ${
                      item.platform === 'facebook' ? 'bg-blue-600/90' :
                      item.platform === 'instagram' ? 'bg-gradient-to-r from-purple-600 to-pink-500/90' :
                      'bg-slate-950/90'
                    }`}>
                      {item.platform === 'facebook' ? 'Facebook ' + item.type :
                       item.platform === 'instagram' ? 'Instagram ' + item.type :
                       'TikTok ' + item.type}
                    </span>

                    {/* Real-time Viewer stats overlay */}
                    <span className="absolute bottom-4 left-6 text-white text-xs font-black bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg font-sans">
                      👁️ {item.views} مشاهدة
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-8 flex flex-col flex-1 justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-4 justify-end">
                        <span className="font-bold text-slate-400 text-xs font-sans">@deliverysuezonline</span>
                        <span className="font-bold text-slate-800 text-sm">ديليفري السويس</span>
                        <div className="w-8 h-8 rounded-full bg-brand/10 p-0.5 relative overflow-hidden">
                          <div className="w-full h-full rounded-full bg-brand text-white font-bold flex items-center justify-center text-[10px]">DS</div>
                        </div>
                      </div>

                      <p className="text-slate-700 font-bold leading-relaxed text-sm line-clamp-3">
                        {item.title}
                      </p>
                    </div>

                    {/* Interactive Buttons for user engagement */}
                    <div className="flex items-center justify-between border-t border-slate-100 pt-5 mt-auto flex-row-reverse">
                      <div className="flex items-center gap-4 flex-row-reverse">
                        
                        {/* Likes button */}
                        <button 
                          onClick={() => handleLike(item.id)}
                          className={`flex items-center gap-1.5 text-xs font-black transition-all cursor-pointer ${
                            userHasLiked ? 'text-red-500 scale-110' : 'text-slate-400 hover:text-red-500'
                          }`}
                        >
                          <Heart size={18} fill={userHasLiked ? "currentColor" : "none"} />
                          <span className="font-sans">{currentLikesCount}</span>
                        </button>

                        {/* Share button */}
                        <button 
                          onClick={() => copyShareLink(item.link)}
                          className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-brand transition-all cursor-pointer"
                        >
                          <Share2 size={16} />
                          <span>مشاركة</span>
                        </button>
                      </div>

                      {/* Open external link directly */}
                      <Link 
                        href={item.link} 
                        target="_blank" 
                        referrerPolicy="no-referrer"
                        className="text-xs text-brand font-bold flex items-center gap-1 hover:underline"
                      >
                        <ExternalLink size={14} />
                        رابط المنشور الأصلي
                      </Link>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Live FB Page Feed Widget Block */}
          <div className="mt-16 bg-white border border-slate-100 rounded-[3rem] p-8 md:p-12 max-w-2xl mx-auto shadow-xl text-center">
            <h3 className="text-xl md:text-2xl font-display font-black text-slate-900 mb-2 font-display">البث المباشر لصفحة فيسبوك الرسمية</h3>
            <p className="text-slate-400 text-xs font-bold mb-8">تابع المنشورات السريعة، عروض التوصيل، وتقييمات العملاء مباشرة</p>
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 flex justify-center p-2 min-h-[500px]">
              <iframe 
                src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FDeliverySuezOnline&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true" 
                width="340" 
                height="500" 
                style={{ border: 'none', overflow: 'hidden' }} 
                scrolling="yes" 
                frameBorder="0" 
                allowFullScreen={true} 
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                className="w-full max-w-[340px] rounded-2xl"
              />
            </div>
          </div>

          {/* Channels CTA Links */}
          <div className="mt-16 flex flex-wrap justify-center gap-4">
            <Link 
              href="https://www.facebook.com/DeliverySuezOnline" 
              target="_blank" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all hover:scale-105 shadow-md shadow-blue-500/10"
            >
              صفحة فيسبوك الرسمية
            </Link>
            <Link 
              href="https://www.instagram.com/deliverysuezonline" 
              target="_blank" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-2xl font-bold hover:opacity-90 transition-all hover:scale-105 shadow-md shadow-pink-500/10"
            >
              حساب إنستغرام
            </Link>
            <Link 
              href="https://www.tiktok.com/@deliverysuezonline" 
              target="_blank" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-slate-950 text-white rounded-2xl font-bold hover:bg-black transition-all hover:scale-105 shadow-md shadow-black/20"
            >
              قناة تيك توك ريلز
            </Link>
          </div>

        </div>
      </section>

      {/* Localized Suez Neighborhoods Landing Hub (Extensive interlinking for high local authority) */}
      <section id="areas" className="py-24 bg-white text-right" dir="rtl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h2 className="text-xs font-black text-brand uppercase tracking-widest mb-3">تغطيتنا الجغرافية بالسويس</h2>
            <h3 className="text-3xl md:text-5xl font-display font-black text-slate-900 mb-6 font-display">اضغط على منطقتك بالسويس واحصل على طيار فوراً</h3>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto font-semibold">
              نوفر للتطبيقات وصناعات الخدمات اللوجستية صفحات تغطية عريقة تخدم 10 مناطق في السويس مدعومة ببيانات الـ GPS.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {AREAS.map((area) => (
              <Link 
                href={`/area/${area.slug}`} 
                key={area.slug}
                className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 hover:border-brand hover:bg-white hover:shadow-xl transition-all group flex flex-col justify-between h-[200px]"
              >
                <div>
                  <div className="flex justify-between items-center mb-4 flex-row-reverse">
                    <span className="w-10 h-10 rounded-2xl bg-white text-brand shadow-sm flex items-center justify-center font-bold font-sans">
                      <MapPin size={18} />
                    </span>
                    <span className="text-xs font-bold text-slate-400 font-sans uppercase">Suez Area Cover</span>
                  </div>
                  <h4 className="font-display font-black text-xl text-slate-900 mb-2 group-hover:text-brand transition-colors">{area.arabicName}</h4>
                  <p className="text-slate-500 text-xs font-medium leading-relaxed">{area.desc}</p>
                </div>
                
                <span className="text-brand text-xs font-bold flex items-center gap-1 justify-end mt-4">
                  تصفح دليل توصيل المنطقة ورسومها
                  <ChevronLeft size={12} className="group-hover:translate-x-[-4px] transition-transform" />
                </span>
              </Link>
            ))}
          </div>

          {/* Global GPS tracking stats box */}
          <div className="mt-12 bg-slate-950 rounded-[3rem] p-8 md:p-12 text-white flex flex-col md:flex-row-reverse justify-between items-center gap-8 shadow-xl">
            <div className="text-right">
              <h4 className="text-xl font-display font-black text-brand mb-2">أين يقع أقرب طيار من بيتك الآن؟</h4>
              <p className="text-white/60 text-sm font-semibold max-w-md">
                يعمل تطبيق ديليفري السويس بنظام تحديد المواقع GPS لربطك مع أقرب طيار متاح في السلام والصباح وفيصل لتسليم أسرع أوردر كاش.
              </p>
            </div>
            <Link href="/webview" className="px-8 py-4 bg-brand text-white rounded-2xl font-black text-sm hover:scale-105 transition-all shadow-lg shadow-brand/15">
              عرض خريطة الكباتن المباشرة
            </Link>
          </div>

        </div>
      </section>

      {/* SEO Articles Showcase & Backlinks builder (User request) */}
      <section className="py-24 bg-slate-50 border-t border-slate-100 text-right" dir="rtl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row-reverse justify-between items-end mb-16 gap-4">
            <div className="text-right max-w-xl">
              <span className="text-xs font-black text-brand uppercase tracking-widest block mb-3">مستندات ومقالات السويس</span>
              <h2 className="text-3xl md:text-5xl font-display font-black text-slate-900 mb-4">أحدث الأخبار والتحليلات اللوجستية لبلدنا السويس</h2>
              <p className="text-slate-500 text-base font-semibold">
                مقالات متخصصة في الخدمات اللوجستية تسلط الضوء على آليات التوصيل، تكلفة الوقود، وبرنامج الكباتن الحر بالسويس.
              </p>
            </div>
            <Link href="/blog" className="px-6 py-3 bg-white text-slate-800 border border-slate-200 rounded-2xl font-bold text-sm hover:bg-slate-50 transition-all flex items-center gap-1">
              مشاهدة جميع المقالات
              <ChevronLeft size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {FEATURED_ARTICLES.map((article) => (
              <div key={article.slug} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 hover:shadow-xl hover:border-brand/20 transition-all flex flex-col justify-between h-[300px]">
                <div>
                  <div className="flex items-center justify-between mb-4 flex-row-reverse">
                    <span className="text-xs font-bold font-sans text-slate-400">{article.date}</span>
                    <span className="px-3 py-1 bg-brand/10 text-brand rounded-full text-[10px] font-black">{article.readTime}</span>
                  </div>
                  <h3 className="font-display font-black text-xl text-slate-900 mb-3 hover:text-brand transition-colors">
                    <Link href={`/blog/${article.slug}`}>{article.title}</Link>
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 font-semibold">{article.desc}</p>
                </div>

                <Link href={`/blog/${article.slug}`} className="text-brand text-xs font-black flex items-center gap-1 justify-end hover:underline mt-4">
                  اقرأ المقال بالكامل
                  <ChevronLeft size={14} />
                </Link>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FAQ Section with schemas */}
      <section id="faq" className="py-24 bg-white text-right" dir="rtl">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-xs font-black text-brand uppercase tracking-widest mb-3">أسئلة شائعة تهمك</h2>
            <h3 className="text-3xl md:text-4xl font-display font-black text-slate-900 mb-4">كل ما تود معرفته عن خدمات الدليفري بالسويس</h3>
            <p className="text-slate-500 font-bold text-sm">نحن دائماً شفافين ونهدف لتثقيف مستخدمينا وكباتننا في السويس بالوعي المالي الكامل.</p>
          </div>

          <div className="space-y-6">
            {[
              {
                q: 'ما هو النطاق الجغرافي الفعلي لتوصيل ديليفري السويس أونلاين؟',
                a: 'نحن نغطي مدينة السويس بالكامل من الغرب إلى الشرق، ويشمل ذلك أحياء السلام 1، السلام الثاني، الأربعين، فيصل، بورتوفيق، حي الصباح، حي الغريب التاريخي، السويس الجديدة، وحتى القرى البعيدة في حي الجناين (مثل جنيفة وكبريت).'
              },
              {
                q: 'كيف يتم احتساب رسوم التوصيل وإعطاء المقابل المادي الكاش للطيار؟',
                a: 'يتم احتساب الرسوم بناءً على المسافة اللوجستية المقطوعة بالكيلومترات من نقطة الاستلام للعميل بالجنيه المصري (EGP). رسومنا شفافة وتنافسية، ونوفر للطيارين الحرين عائد كاش 100% من تعبهم ومجهودهم في الرحلات.'
              },
              {
                q: 'هل يمكنني طلب طيار دليفري حر لشراء عقاقير ومستلزمات صيدلية في وقت ليلي متأخر؟',
                a: 'بالتأكيد، كباتن ديليفري صيدليات السويـس متاحون 24 ساعة، سبعة أيام في الأسبوع. يمكنك طلب الكابتن في أي وقت وجلب الأدوية والروشتات وتوصيلها فوراً لبيتك.'
              }
            ].map((item, i) => (
              <div key={i} className="p-8 bg-slate-50 rounded-3xl border border-slate-100 hover:shadow-md transition-all text-right">
                <h4 className="font-display font-black text-lg text-slate-900 mb-3 flex items-center gap-2 flex-row-reverse justify-end">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand" />
                  <span>{item.q}</span>
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed pr-6 font-semibold">{item.a}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center bg-slate-50 p-8 rounded-3xl border border-slate-100">
            <h4 className="font-bold text-slate-800 text-lg mb-2">هل لديك أي سؤال آخر وتبحث عن دعم فني مباشر؟</h4>
            <p className="text-slate-400 text-xs mb-6 font-bold">كباتن السويس ومدراء التنسيق جاهزون على مدار الساعة للرد عليك.</p>
            <Link href="https://wa.me/201022679250" target="_blank" className="font-black text-sm text-brand flex items-center justify-center gap-1.5 hover:underline">
              تواصل معنا مباشرة عبر واتساب
              <ChevronLeft size={16} />
            </Link>
          </div>
        </div>
      </section>

      {toastMessage && (
        <div className="fixed bottom-8 right-8 bg-slate-950 border border-slate-800 text-white px-6 py-4 rounded-2xl shadow-2xl z-[9999] flex items-center gap-3 animate-bounce text-right font-sans font-bold text-sm" dir="rtl">
          <span>🔔</span>
          <span>{toastMessage}</span>
        </div>
      )}

      <Footer />
    </div>
  );
}
