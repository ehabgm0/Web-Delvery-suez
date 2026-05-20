import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import SafeImage from '@/components/SafeImage';
import { BLOG_POSTS } from '@/lib/constants';
import { Calendar, ChevronLeft, User, Clock } from 'lucide-react';

export const metadata = {
  title: 'مدونة ديليفري السويس | مقالات وعروض',
  description: 'تابع أحدث المقالات والنصائح حول خدمات التوصيل في السويس، وأخبار العروض الحصرية لمستخدمينا.',
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-right mb-16">
            <h1 className="text-5xl md:text-7xl font-display font-black text-slate-900 mb-8 italic tracking-tighter">مدونة <span className="text-brand">السويس</span></h1>
            <p className="text-slate-500 text-xl max-w-2xl leading-relaxed font-medium">
              نقوم بمشاركة النصائح، القصص، وأحدث أخبار خدمات التوصيل في مدينتنا الحبيبة.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {BLOG_POSTS.map((post, i) => (
              <Link href={`/blog/${post.slug}`} key={i} className="group flex flex-col bg-white rounded-[3rem] overflow-hidden shadow-sm border border-slate-100 hover:shadow-2xl transition-all h-full">
                <div className="relative aspect-video overflow-hidden">
                  <SafeImage 
                    src={`/images/blog/${post.slug}.jpg`} 
                    fallbackSrc={`https://picsum.photos/seed/${post.slug}/800/450`}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-6 right-6 px-4 py-2 bg-brand text-white text-xs font-bold rounded-full">
                    مقال
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col text-right">
                  <div className="flex items-center gap-4 text-xs font-bold text-slate-400 mb-4 flex-row-reverse">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User size={14} />
                      <span>فريق السويس</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-display font-bold text-slate-900 mb-4 group-hover:text-brand transition-colors line-clamp-2 leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-8 line-clamp-3">
                    تعرف على كل التفاصيل والمعلومات الهامة حول {post.title} وكيف يمكن لخدماتنا في السويس مساعدتك في حياتك اليومية بشكل أفضل وأسرع.
                  </p>
                  <div className="mt-auto flex items-center gap-2 text-brand font-bold text-sm">
                    <ChevronLeft size={16} />
                    <span>اقرأ المزيد</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-20 p-12 bg-slate-900 rounded-[4rem] text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="text-right relative z-10">
              <h2 className="text-3xl font-display font-black mb-4 italic">اشترك في قائمتنا البريدية</h2>
              <p className="text-slate-400 font-medium">احصل على أحدث العروض والمقالات مباشرة في بريدك.</p>
            </div>
            <div className="flex w-full max-w-md relative z-10">
              <input 
                type="email" 
                placeholder="بريدك الإلكتروني"
                className="flex-1 px-8 py-5 bg-white/10 rounded-2xl border border-white/20 outline-none focus:bg-white/20 transition-all font-bold placeholder:text-slate-500"
                dir="ltr"
              />
              <button className="absolute left-2 top-2 bottom-2 px-8 bg-brand text-white rounded-xl font-bold hover:scale-105 transition-transform">
                اشترك
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
