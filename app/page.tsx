'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  Truck, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  ChevronLeft, 
  Star, 
  Smartphone,
  Zap,
  CheckCircle2,
  PhoneCall,
  Globe,
  MessageSquare,
  Gift,
  Play,
  Heart,
  Share2,
  ExternalLink
} from 'lucide-react';
import { AREAS, SERVICES } from '@/lib/constants';
import SafeImage from '@/components/SafeImage';

// Highly-polished simulated feed synced from real social channels
const SOCIAL_POSTS = [
  {
    id: 'fb-1',
    platform: 'facebook',
    type: 'Reel',
    title: 'كواليس أسرع توصيل أوردر في منطقة الصباح بالسويس مع كابتن فايز 🚀💨 دايماً سابقين خطوة!',
    imageSrc: 'https://picsum.photos/seed/fb1/600/600',
    videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-delivery-man-with-a-face-mask-riding-motorcycle-41130-large.mp4',
    views: '15.4K',
    baseLikes: 1243,
    link: 'https://www.facebook.com/DeliverySuezOnline'
  },
  {
    id: 'ig-1',
    platform: 'instagram',
    type: 'Reel',
    title: 'عروض الصيف نار وحرق أسعار! 🔥 خصم 50% على الدليفري لجميع أصحاب مشاريع الأونلاين ومطاعم السويس.',
    imageSrc: 'https://picsum.photos/seed/ig1/600/600',
    videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-young-man-riding-a-scooter-in-the-streets-44161-large.mp4',
    views: '8.9K',
    baseLikes: 785,
    link: 'https://www.instagram.com/deliverysuezonline'
  },
  {
    id: 'tk-1',
    platform: 'tiktok',
    type: 'Reel',
    title: 'تحدي الدليفري عيون موسى والأربعين في 20 دقيقة بس! 😱 كباتن السويس قد التحدي في أي مكان وتحت أي ظرف.',
    imageSrc: 'https://picsum.photos/seed/tk1/600/600',
    videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-food-delivery-courier-riding-scooter-in-city-streets-44833-large.mp4',
    views: '42.1K',
    baseLikes: 3120,
    link: 'https://www.tiktok.com/@deliverysuezonline'
  },
  {
    id: 'fb-2',
    platform: 'facebook',
    type: 'Post',
    title: 'بيان رسمي 📣: يسعدنا الإعلان عن بدء التغطية اللوجستية الكاملة في مدينة الملك عبدالله وجاري إتاحة طيارين 24 ساعة.',
    imageSrc: 'https://picsum.photos/seed/fb2/600/600',
    videoSrc: null,
    views: '3.5K',
    baseLikes: 412,
    link: 'https://www.facebook.com/DeliverySuezOnline'
  },
  {
    id: 'ig-2',
    platform: 'instagram',
    type: 'Reel',
    title: 'ازاي توظف طيار خاص بالساعة أو باليومية ليقضي مشاوير بيتك وصيدلياتك؟ شرح مبسط للخدمة الأسهل بالسويس 📱✨',
    imageSrc: 'https://picsum.photos/seed/ig2/600/600',
    videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-courier-carrying-delivery-backpack-while-riding-motorcycle-44829-large.mp4',
    views: '11.2K',
    baseLikes: 914,
    link: 'https://www.instagram.com/deliverysuezonline'
  },
  {
    id: 'tk-2',
    platform: 'tiktok',
    type: 'Post',
    title: 'شارك كود الإحالة الخاص بك مع أصدقائك في السويس واحصل على 50 جنيهاً رصيد مجاني فوري مع أول أوردر ليهم! 🎁💰',
    imageSrc: 'https://picsum.photos/seed/tk2/600/600',
    videoSrc: null,
    views: '29.7K',
    baseLikes: 2540,
    link: 'https://www.tiktok.com/@deliverysuezonline'
  }
];

export default function Home() {
  const [activeTab, setActiveTab] = React.useState<'all' | 'facebook' | 'instagram' | 'tiktok'>('all');
  const [playingReelId, setPlayingReelId] = React.useState<string | null>(null);
  const [likedPosts, setLikedPosts] = React.useState<Record<string, boolean>>({});
  const [likes, setLikes] = React.useState<Record<string, number>>({});

  const handleLike = (id: string) => {
    setLikedPosts(prev => {
      const isLiked = !prev[id];
      return { ...prev, [id]: isLiked };
    });
  };
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden hero-gradient">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-right">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/10 text-brand text-sm font-bold mb-6">
                  <Zap size={16} />
                  <span>أسرع خدمة توصيل في مدينة السويس</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-display font-black leading-tight mb-6">
                  كل ما تحتاجه، <br />
                  <span className="text-brand">يوصلك في لحظة.</span>
                </h1>
                <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-xl">
                  دليفري السويس أونلاين هو شريكك الموثوق لتوصيل كل شيء في أي مكان بالسويس. من المطاعم والصيدليات إلى المشاوير الخاصة، نحن هنا لخدمتك.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
                  <Link href="/webview" className="px-10 py-5 bg-brand text-white rounded-2xl font-bold text-xl shadow-xl shadow-brand/20 hover:scale-105 transition-all text-center">
                    اطلب الآن مجاناً
                  </Link>
                  <Link href="https://wa.me/201022679250" className="px-10 py-5 bg-white border-2 border-slate-200 text-slate-800 rounded-2xl font-bold text-xl hover:bg-slate-50 transition-all text-center flex items-center justify-center gap-2">
                    <PhoneCall size={20} className="text-brand" />
                    تواصل واتساب
                  </Link>
                  <Link href="/affiliate" className="px-10 py-5 bg-whatsapp text-white rounded-2xl font-bold text-xl shadow-xl shadow-whatsapp/20 hover:scale-105 transition-all text-center flex items-center justify-center gap-2 w-full sm:w-auto mt-4 sm:mt-0">
                    <Gift size={20} />
                    شارك واربح نقاط
                  </Link>
                </div>
                
                <div className="mt-12 flex items-center gap-6">
            <div className="flex -space-x-4 rtl:space-x-reverse flex-row-reverse">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-slate-200 overflow-hidden relative">
                  <SafeImage 
                    src={`https://ui-avatars.com/api/?name=User+${i}&background=random`} 
                    fallbackSrc={`https://ui-avatars.com/api/?name=Suez+User+${i}&background=ea580c&color=fff`}
                    alt="User"
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
                  <div>
                    <div className="flex items-center text-orange-400 gap-1">
                      <Star size={16} fill="currentColor" />
                      <Star size={16} fill="currentColor" />
                      <Star size={16} fill="currentColor" />
                      <Star size={16} fill="currentColor" />
                      <Star size={16} fill="currentColor" />
                    </div>
                    <p className="text-sm font-medium text-slate-500 tracking-tight">+10,000 عميل سعيد في السويس</p>
                  </div>
                </div>
              </div>

              <div className="relative hidden lg:block">
                <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl rotate-3 bg-slate-900 border-8 border-slate-900 aspect-[4/5]">
                  <SafeImage 
                    src="https://picsum.photos/seed/suez-hero/800/1000" 
                    fallbackSrc="https://picsum.photos/seed/suez/800/1200"
                    alt="Delivery in Suez" 
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/80 to-transparent text-white text-right">
                    <div className="flex items-center gap-3 mb-2 justify-end">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-sm font-bold uppercase tracking-widest">متاح الآن في حي السلام 1</span>
                    </div>
                    <h3 className="text-2xl font-display font-bold">طيارونا في كل مكان</h3>
                  </div>
                </div>
                <div className="absolute top-1/2 -right-12 -translate-y-1/2 z-20 bg-white p-6 rounded-3xl shadow-2xl border flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand/10 text-brand rounded-2xl flex items-center justify-center">
                    <Clock size={24} />
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">وقت التوصيل</p>
                    <p className="text-xl font-bold font-mono tracking-tighter">15-25 دقيقة</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: 'طلب مكتمل', value: '50K+', icon: CheckCircle2 },
                { label: 'طيار نشط', value: '250+', icon: Truck },
                { label: 'حي ومنطقة', value: '14', icon: MapPin },
                { label: 'تقييم إيجابي', value: '4.9', icon: Star },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-brand/5 text-brand mb-4">
                    <stat.icon size={24} />
                  </div>
                  <h4 className="text-3xl font-display font-black text-slate-900 mb-1">{stat.value}</h4>
                  <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-sm font-bold text-brand uppercase tracking-widest mb-3">خدماتنا</h2>
              <h3 className="text-4xl md:text-5xl font-display font-black mb-6">ماذا نقدم لك؟</h3>
              <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
                نوفر لك مجموعة متكاملة من خدمات التوصيل التي تغطي كافة احتياجاتك اليومية في مدينة السويس.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {SERVICES.map((service, i) => (
                <Link href={`/service/${service.slug}`} key={i} className="group">
                  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all h-full flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-brand/5 text-brand rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand group-hover:text-white transition-colors">
                      <Truck size={32} />
                    </div>
                    <h4 className="text-xl font-bold mb-3">{service.name}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed mb-6">توصيل سريع واحترافي لخدمة {service.name} في جميع أحياء السويس.</p>
                    <div className="mt-auto text-brand font-bold text-sm flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>عرض التفاصيل</span>
                      <ChevronLeft size={16} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Areas Grid */}
        <section id="areas" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16 text-right">
              <div className="max-w-2xl">
                <h2 className="text-sm font-bold text-brand uppercase tracking-widest mb-3">تغطية شاملة</h2>
                <h3 className="text-4xl md:text-5xl font-display font-black">نحن نصل لكل ركن في السويس</h3>
              </div>
              <Link href="/areas" className="text-brand font-bold flex items-center gap-2 hover:gap-3 transition-all text-lg underline underline-offset-8">
                تصفح كل المناطق
                <ChevronLeft size={20} />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {AREAS.slice(0, 10).map((area, i) => (
                <Link href={`/area/${area.slug}`} key={i} className="relative group overflow-hidden rounded-[2rem] aspect-[4/5] shadow-lg">
                  <SafeImage 
                    src={`/images/areas/${area.slug}.jpg`} 
                    fallbackSrc={`https://picsum.photos/seed/${area.slug}/500/600`}
                    alt={area.name} 
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/20 to-transparent" />
                  <div className="absolute bottom-6 right-6 text-white text-right">
                    <p className="text-xs font-bold text-brand uppercase tracking-widest mb-1 opacity-80">{area.nameEn}</p>
                    <h4 className="text-2xl font-display font-bold underline decoration-brand/30 decoration-4 underline-offset-4">{area.name}</h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* App Promo */}
        <section className="py-24 bg-brand relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-16 relative z-10 text-right">
              <div className="flex-1 text-white">
                <h2 className="text-4xl md:text-6xl font-display font-black mb-8 leading-tight">
                  حمّل التطبيق الآن <br />
                  واطلب بلمسة واحدة.
                </h2>
                <p className="text-white/80 text-xl mb-12 max-w-lg leading-relaxed">
                  تطبيق ديليفري السويس سهل الاستخدام، سريع، ويوفر لك عروض حصرية يومية فقط لمستخدمي التطبيق. سجل الآن كطيار أو كعميل.
                </p>
                <div className="flex flex-wrap gap-4 justify-end">
                  <Link href="https://play.google.com/store" className="bg-white text-brand px-10 py-5 rounded-2xl font-bold text-xl flex items-center gap-3 hover:scale-105 transition-all shadow-xl">
                    <Smartphone size={28} />
                    Google Play
                  </Link>
                  <Link href="/webview" className="bg-slate-950 text-white px-10 py-5 rounded-2xl font-bold text-xl flex items-center gap-3 hover:scale-105 transition-all shadow-xl shadow-black/20">
                    <Globe size={28} />
                    زيارة تطبيق الويب
                  </Link>
                </div>
              </div>
              
              <div className="flex-1 relative flex justify-center">
                <div className="relative z-10 w-full max-w-[320px]">
                  <div className="bg-slate-950 rounded-[3.5rem] p-4 border-[10px] border-slate-900 shadow-[0_50px_100px_rgba(0,0,0,0.4)] aspect-[9/19]">
                    <div className="bg-white h-full rounded-[2.5rem] overflow-hidden relative">
                      <div className="absolute top-0 inset-x-0 h-6 bg-slate-950 flex justify-center pt-1.5 z-20">
                        <div className="w-20 h-1.5 rounded-full bg-slate-800" />
                      </div>
                      <SafeImage 
                        src="https://picsum.photos/seed/app-screen/400/800"
                        fallbackSrc="https://picsum.photos/seed/suez-app/400/800"
                        alt="App interface" 
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
                {/* Visual decoration */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/20 rounded-full blur-[120px]" />
              </div>
            </div>
          </div>
        </section>

        {/* Social Feed */}
        <section className="py-24 bg-slate-50 border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand/10 text-brand rounded-full font-bold text-sm mb-4">
              <Zap size={14} />
              <span>البث والنشاط الاجتماعي المباشر</span>
            </div>
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">#DeliverySuez</h2>
            <h3 className="text-4xl md:text-5xl font-display font-black mb-6">تابع أحدث المنشورات والريلز والتريندات</h3>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed mb-12">
              منصتنا متزامنة مع قنوات السوشيال ميديا الرسمية (فيسبوك، إنستغرام، تيك توك) لعرض أحدث لقطات الكباتن، العروض العاجلة، وكواليس التوصيل الفورية في السويس.
            </p>

            {/* Social Media Switcher Tabs */}
            <div className="flex flex-wrap justify-center gap-3 mb-12" dir="rtl">
              {[
                { id: 'all', name: 'كل المنصات 📲' },
                { id: 'facebook', name: 'فيسبوك ريلز 📘' },
                { id: 'instagram', name: 'إنستغرام 📸' },
                { id: 'tiktok', name: 'تيك توك 🎵' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-6 py-3 rounded-2xl font-bold text-sm transition-all flex items-center gap-2 shadow-sm ${
                    activeTab === tab.id 
                    ? 'bg-brand text-white scale-105 shadow-brand/20' 
                    : 'bg-white text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {SOCIAL_POSTS.filter(item => activeTab === 'all' || item.platform === activeTab).map((item) => {
                const isPlaying = playingReelId === item.id;
                const userHasLiked = likedPosts[item.id] || false;
                const currentLikesCount = (likes[item.id] || item.baseLikes) + (userHasLiked ? 1 : 0);

                return (
                  <div key={item.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-md border border-slate-200 text-right group hover:shadow-2xl transition-all relative flex flex-col h-[520px]">
                    <div className="relative h-[320px] overflow-hidden bg-slate-900 flex items-center justify-center">
                      {isPlaying && item.videoSrc ? (
                        <video 
                          src={item.videoSrc} 
                          autoPlay 
                          loop 
                          playsInline
                          controls
                          className="w-full h-full object-cover" 
                        />
                      ) : (
                        <>
                          <SafeImage 
                            src={item.imageSrc} 
                            fallbackSrc="https://picsum.photos/seed/reels/600/600"
                            alt={item.title} 
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                          />
                          {/* Dark Filter & Overlays */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                          
                          {/* Play Overlay if video type */}
                          {item.videoSrc && (
                            <button 
                              onClick={() => setPlayingReelId(item.id)}
                              className="absolute w-16 h-16 bg-white/20 hover:bg-brand/90 hover:scale-110 text-white rounded-full flex items-center justify-center backdrop-blur-md shadow-2xl transition-all z-20 group-hover:bg-brand"
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
                      <span className="absolute bottom-4 left-6 text-white text-xs font-bold bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg">
                        👁️ {item.views} مشاهدة
                      </span>
                    </div>

                    <div className="p-8 flex flex-col flex-1 justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-4 justify-end">
                          <span className="font-bold text-slate-400 text-xs">@deliverysuezonline</span>
                          <span className="font-bold text-slate-800 text-sm">ديليفري السويس</span>
                          <div className="w-10 h-10 rounded-full bg-brand p-0.5 shadow-md">
                            <div className="w-full h-full rounded-full bg-white p-0.5 relative overflow-hidden">
                              <SafeImage 
                                src="https://picsum.photos/seed/suez-logo-seo/100/100" 
                                fallbackSrc="https://picsum.photos/seed/logo/100/100"
                                alt="Suez delivery team profile" 
                                fill
                                className="rounded-full object-cover"
                              />
                            </div>
                          </div>
                        </div>

                        <p className="text-slate-700 font-bold leading-relaxed text-sm line-clamp-3">
                          {item.title}
                        </p>
                      </div>

                      {/* Interactive Buttons for user engagement */}
                      <div className="flex items-center justify-between border-t border-slate-100 pt-5 mt-auto flex-row-reverse">
                        <div className="flex items-center gap-4 flex-row-reverse">
                          {/* Hearts likes button */}
                          <button 
                            onClick={() => handleLike(item.id)}
                            className={`flex items-center gap-1.5 text-xs font-black transition-all ${
                              userHasLiked ? 'text-red-500 scale-110' : 'text-slate-400 hover:text-red-500'
                            }`}
                          >
                            <Heart size={18} fill={userHasLiked ? "currentColor" : "none"} />
                            <span>{currentLikesCount}</span>
                          </button>

                          {/* Share button */}
                          <button 
                            onClick={() => {
                              navigator.clipboard.writeText(item.link);
                              alert('تم نسخ الرابط المباشر للريل تضامناً مع السوشيال ميديا! 🚀');
                            }}
                            className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-brand transition-all"
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
                          المشاهدة على المنصة
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Global CTA buttons for the social accounts */}
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

        {/* Support Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1 relative group">
                <div className="absolute -inset-4 bg-brand/5 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 relative z-10 text-right">
                  <h3 className="text-3xl font-display font-black mb-8 tracking-tight">هل تحتاج للمساعدة؟</h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-5 flex-row-reverse">
                      <div className="w-12 h-12 bg-brand/10 text-brand rounded-2xl flex items-center justify-center shrink-0">
                        <PhoneCall size={24} />
                      </div>
                      <div>
                        <p className="font-bold text-lg mb-1">دعم واتساب مباشر</p>
                        <p className="text-slate-500 text-sm mb-2 leading-relaxed">فريقنا متواجد للرد على استفساراتكم وحل المشكلات فوراً.</p>
                        <Link href="https://wa.me/201022679250" className="text-brand font-bold text-sm tracking-tight" dir="ltr">01022679250</Link>
                      </div>
                    </div>
                    <div className="flex items-start gap-5 flex-row-reverse">
                      <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center shrink-0">
                        <MapPin size={24} />
                      </div>
                      <div>
                        <p className="font-bold text-lg mb-1">المكتب الرئيسي</p>
                        <p className="text-slate-500 text-sm leading-relaxed tracking-tight">السويس، مدينة السلام 1 - بجوار مسجد المصطفى.</p>
                      </div>
                    </div>
                  </div>
                  
                  <Link href="/support" className="mt-10 block w-full py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-brand transition-all">
                    فتح تذكرة دعم فني
                    <MessageSquare size={20} />
                  </Link>
                </div>
              </div>
              
              <div className="order-1 lg:order-2 text-right">
                <h2 className="text-sm font-bold text-brand uppercase tracking-widest mb-3">الدعم الفني</h2>
                <h3 className="text-4xl md:text-5xl font-display font-black mb-8 leading-tight">فريقنا دائماً بجانبك في مدينة السويس</h3>
                <p className="text-slate-500 text-lg mb-10 leading-relaxed">
                  نحن فخورون بتقديم أفضل خدمة عملاء في السويس. إذا واجهت أي مشكلة في طلبك أو أردت الاستفسار عن مناطق التغطية، لا تتردد في مراسلتنا.
                </p>
                <div className="bg-brand/5 p-6 rounded-2xl border border-brand/10 inline-flex items-center gap-4 flex-row-reverse">
                  <div className="w-3 h-3 rounded-full bg-brand animate-ping" />
                  <span className="font-bold text-brand text-sm tracking-tight">متوسط وقت الرد: أقل من دقيقتين</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 bg-slate-950 relative overflow-hidden text-center">
          <div className="relative z-10 max-w-4xl mx-auto px-4">
            <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-8 italic leading-tight">ديليفري السويس.. <br /> الاختيار الأذكى والأسرع دائماً.</h2>
            <p className="text-slate-400 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
              انضم لآلاف المستخدمين في السفر واجعل حياتك أسهل اليوم. حمل التطبيق أو اطلب من المتصفح مباشرة.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/webview" className="px-12 py-5 bg-brand text-white rounded-[2rem] font-bold text-xl shadow-2xl shadow-brand/40 hover:scale-105 transition-all">
                اطلب الآن
              </Link>
              <Link href="/auth?role=driver" className="px-12 py-5 bg-white/5 border border-white/20 text-white rounded-[2rem] font-bold text-xl hover:bg-white/10 transition-all backdrop-blur-sm">
                سجل كطيار
              </Link>
            </div>
          </div>
          
          {/* Decorative Background */}
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand/20 rounded-full blur-[120px]" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand/10 rounded-full blur-[120px]" />
        </section>
      </main>

      <Footer />
    </div>
  );
}


