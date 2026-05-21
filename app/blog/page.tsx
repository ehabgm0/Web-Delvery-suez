'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ChevronLeft, Calendar, Clock, BookOpen, Search, Filter } from 'lucide-react';

const ARTICLES = [
  {
    slug: 'suez-logistics-revolution',
    title: 'كيف غيّر ديليفري السويس أونلاين مفهوم الشحن اللوجستي المحلي؟',
    desc: 'تحليل دقيق لأثر التكنولوجيا الذكية ونظام تعيين الكباتن فري لانس بالـ GPS لتوفير 40% من وقت توصيل الأغذية والأدوية بالسويس ومكافحة الازدحام في حي الأربعين وفيصل.',
    category: 'تكنولوجيا لوجستيات',
    date: '21 مايو 2026',
    readTime: '4 دقائق قراءة',
    author: 'المهندس أسامة السويسي',
    tags: ['السويس', 'دليفري السويس', 'كباتن السويس, شحن']
  },
  {
    slug: 'delivery-prices-egypt',
    title: 'دليلك الشامل لرسوم الدليفري العادلة ومحاسبة الطيارين بالجنيه المصري (EGP) بالسويس',
    desc: 'اكتشف كيف تقدم منصة Delivery-Suez أسعار نقل مدروسة وتنافسية تضمن أقصى ربحية للكباتن وراحة ممتازة لأصحاب الأعمال والبيوت كاش دون عمولات مرتفعة.',
    category: 'إرشاد مالي',
    date: '20 مايو 2026',
    readTime: '5 دقائق قراءة',
    author: 'فريق كتاب السويس',
    tags: ['EGP', 'أسعار الدليفري', 'السويس', 'كاش']
  },
  {
    slug: 'earn-money-suez',
    title: 'فرص العمل الحر كطيار دليفري في السويس: كيف تحقق 500 جنيه EGP يومياً بالدراجة النارية؟',
    desc: 'دليل تفصيلي لجميع طياري السويس، كباتن الفري لانس، وأصحاب الموتوسيكلات والاسكوترات للربح الكاش ومضاعفة الدخل بالتناغم مع التوصيل الفردي والحكومي.',
    category: 'العمل الحر والتطوير',
    date: '18 مايو 2026',
    readTime: '7 دقائق قراءة',
    author: 'الكابتن إبراهيم الغريب',
    tags: ['وظائف السويس', 'طيار دليفري', 'موتوسيكل']
  }
];

export default function BlogListing() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('all');

  const filteredArticles = ARTICLES.filter(art => {
    const matchesSearch = art.title.includes(searchTerm) || art.desc.includes(searchTerm);
    const matchesCategory = selectedCategory === 'all' || art.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...Array.from(new Set(ARTICLES.map(a => a.category)))];

  const categoryNames: Record<string, string> = {
    'all': 'الكل 📁',
    'تكنولوجيا لوجستيات': 'تكنولوجيا لوجستيات 🤖',
    'إرشاد مالي': 'إرشاد مالي 💵',
    'العمل الحر والتطوير': 'العمل الحر 🛵'
  };

  return (
    <div className="min-h-screen bg-slate-50 text-right">
      <Navbar />

      <main className="pt-32 pb-24 font-sans" dir="rtl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header section */}
          <div className="bg-slate-950 rounded-[3rem] p-12 md:p-16 text-white text-right relative overflow-hidden mb-12 shadow-xl">
            <div className="relative z-10 max-w-2xl">
              <nav className="flex gap-2 text-white/50 text-xs font-bold mb-6 flex-row-reverse justify-end">
                <Link href="/">الرئيسية</Link>
                <span>/</span>
                <span className="text-brand">المدونة والتحليلات اللوجستية</span>
              </nav>
              <h1 className="text-4xl md:text-5xl font-display font-black mb-6 italic leading-tight">
                مدونة <span className="text-brand">ديليفري السويس أونلاين</span>
              </h1>
              <p className="text-white/60 mb-8 font-medium text-lg leading-relaxed">
                اقرأ أحدث المقالات التقنية، الأدلة الشاملة لطياري السويس، تحليلات الأسواق اللوجستية، وأحدث التريندات واليوميات في السويس لزيادة الوعي والثقافة اللوجستية.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-start">
                <Link href="/webview" className="px-6 py-3.5 bg-brand text-white rounded-xl font-bold hover:scale-105 transition-all text-sm text-center">
                  فتح تطبيق ديليفري للتجربة والمحاكاة
                </Link>
              </div>
            </div>
            
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-brand/20 rounded-full blur-[100px]" />
          </div>

          {/* Search and Filters row */}
          <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex-row-reverse">
            
            {/* Search Input */}
            <div className="relative w-full md:w-96 flex items-center bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 flex-row-reverse">
              <Search size={18} className="text-slate-400 shrink-0 ml-2" />
              <input 
                type="text" 
                placeholder="ابحث عن مقال أو إرشادات لوجستية..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent text-sm w-full outline-none text-slate-800 placeholder-slate-400 font-bold font-sans text-right"
              />
            </div>

            {/* Category Switcher Tabs */}
            <div className="flex flex-wrap gap-2 flex-row-reverse justify-start">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedCategory === cat 
                    ? 'bg-brand text-white shadow-sm shadow-brand/10' 
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {categoryNames[cat] || cat}
                </button>
              ))}
            </div>

          </div>

          {/* Articles Grid list */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article) => (
                <div key={article.slug} className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-100 flex flex-col justify-between h-[450px] hover:shadow-xl hover:border-brand/20 transition-all">
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4 flex-row-reverse">
                      <span className="text-[10px] font-black uppercase text-brand bg-brand/10 px-3 py-1 rounded-full">{article.category}</span>
                      <span className="text-xs font-bold font-sans text-slate-400 flex items-center gap-1">
                        <Calendar size={12} />
                        {article.date}
                      </span>
                    </div>

                    <h3 className="font-display font-black text-xl text-slate-900 mb-4 hover:text-brand transition-colors text-right">
                      <Link href={`/blog/${article.slug}`}>{article.title}</Link>
                    </h3>

                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-4 font-semibold text-right">
                      {article.desc}
                    </p>
                  </div>

                  <div className="p-8 bg-slate-50 border-t border-slate-100 flex items-center justify-between flex-row-reverse mt-auto">
                    <span className="text-xs font-bold text-slate-400">كتبه: {article.author}</span>
                    <Link href={`/blog/${article.slug}`} className="text-xs font-black text-brand flex items-center gap-1 hover:underline">
                      اقرأ المقال بالكامل
                      <ChevronLeft size={14} />
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-16 text-center bg-white rounded-[2.5rem] border border-slate-100">
                <p className="text-slate-400 font-bold text-lg mb-4">عذراً، لم نجد أي مقالة تطابق بحثك حالياً.</p>
                <button 
                  onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }} 
                  className="px-6 py-2.5 bg-brand text-white font-bold text-xs rounded-xl"
                >
                  إعادة تعيين البحث
                </button>
              </div>
            )}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
