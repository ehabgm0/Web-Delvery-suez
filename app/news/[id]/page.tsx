import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import SafeImage from '@/components/SafeImage';
import { NEWS_ITEMS } from '@/lib/constants';
import { notFound } from 'next/navigation';
import { Calendar, ChevronRight, User, Share2, Facebook, Twitter, Link as LinkIcon, Megaphone } from 'lucide-react';

export async function generateStaticParams() {
  return NEWS_ITEMS.map((item) => ({
    id: item.id,
  }));
}

export default async function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = NEWS_ITEMS.find((n) => n.id === id);

  if (!item) {
    notFound();
  }

  const localNewsFallbacks: Record<string, string> = {
    '1': '/images/suez_hero_delivery.png',
    '2': '/images/suez_courier.png',
    '3': '/images/suez_port_captain.png'
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-right">
          <Link href="/news" className="inline-flex items-center gap-2 text-slate-500 font-bold text-sm mb-12 hover:text-brand transition-colors">
            <ChevronRight size={16} />
            العودة لكل الأخبار
          </Link>

          <header className="mb-12">
            <div className="flex items-center gap-4 text-xs font-bold text-brand uppercase tracking-widest mb-6 flex-row-reverse">
              <span className="px-4 py-1.5 bg-brand/10 rounded-full">{item.category}</span>
              <div className="flex items-center gap-1 text-slate-400">
                <Calendar size={14} />
                <span>{item.date}</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-black text-slate-900 leading-tight mb-8">
              {item.title}
            </h1>
            <div className="flex items-center gap-4 flex-row-reverse">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center overflow-hidden relative">
                <SafeImage src="/logo.png" fallbackSrc="https://ui-avatars.com/api/?name=Admin" alt="Admin" fill className="object-cover" />
              </div>
              <div className="text-right">
                <p className="font-bold text-slate-900">إدارة ديليفري السويس</p>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest italic">المسؤول الإخباري</p>
              </div>
            </div>
          </header>

          <div className="relative aspect-video rounded-[3rem] overflow-hidden mb-16 shadow-2xl">
            <SafeImage 
              src={`/images/news/news-${item.id}.jpg`} 
              fallbackSrc={localNewsFallbacks[item.id] || '/images/suez_hero_delivery.png'}
              alt={item.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="prose prose-xl prose-slate max-w-none text-slate-600 leading-relaxed space-y-8 font-medium">
            <p>
              يسعدنا في <strong>ديليفري السويس أونلاين</strong> أن نعلن لجميع عملائنا وطيارينا عن {item.title}. تأتي هذه الخطوة في إطار سعينا المستمر لتقديم أفضل خدمة توصيل في محافظة السويس بأكملها.
            </p>
            <p>
              منذ انطلاقتنا، وهدفنا الأساسي هو جسر المسافات بين أهالي السويس واحتياجاتهم اليومية. ومع {item.title}، نكون قد قطعنا شوطاً كبيراً في تحقيق رؤيتنا نحو تطبيق محلي عالمي الموصفات.
            </p>
            <h2 className="text-3xl font-display font-black text-slate-900 mt-12 mb-6 italic tracking-tight">ماذا يعني هذا الخبر لك؟</h2>
            <p>
              إذا كنت عميلاً، فهذا يضمن لك سرعة أكبر وتوفر أفضل للخدمات في مناطق أوسع. أما إذا كنت طياراً، فهذا يعني فرص عمل أكثر ودخل مستقر بفضل تزايد الطلب على خدماتنا.
            </p>
            <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-200 border-r-8 border-r-brand my-12">
              <p className="text-slate-900 font-bold italic mb-0 italic">
                &quot;نحن نعدكم بمزيد من المفاجآت والخدمات التي ستجعل حياتكم في السويس أسهل يوماً بعد يوم.&quot;
              </p>
            </div>
            <p>
              شكراً لثقتكم الغالية ولأنكم جزء من هذا الإنجاز. لا تنسوا متابعة صفحاتنا على وسائل التواصل الاجتماعي ليصلكم كل جديد وحصري.
            </p>
          </div>

          <footer className="mt-20 pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-4">
              <button className="p-3 bg-slate-900 text-white rounded-2xl hover:bg-brand transition-colors">
                <Facebook size={20} />
              </button>
              <button className="p-3 bg-slate-900 text-white rounded-2xl hover:bg-brand transition-colors">
                <Twitter size={20} />
              </button>
              <button className="p-3 bg-slate-900 text-white rounded-2xl hover:bg-brand transition-colors">
                <LinkIcon size={20} />
              </button>
            </div>
            <div className="flex items-center gap-3 font-bold text-slate-400">
              <span>شارك هذا الخبر</span>
              <Share2 size={20} />
            </div>
          </footer>

          <div className="mt-24 bg-brand rounded-[3rem] p-12 text-white text-center shadow-xl shadow-brand/20">
            <h3 className="text-3xl font-display font-black mb-6 italic">ابدأ الطلب الآن</h3>
            <p className="text-white/80 mb-10 max-w-xl mx-auto">لا تضيع الوقت، استخدم تطبيق ديليفري السويس واطلب من أي مكان بضغطة زر واحدة.</p>
            <Link href="/webview" className="px-12 py-5 bg-slate-950 text-white rounded-2xl font-bold text-xl hover:scale-105 transition-all inline-block">زيارة التطبيق</Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
