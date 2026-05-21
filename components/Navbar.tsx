'use client';

import React from 'react';
import Link from 'next/link';
import { Menu, X, ArrowUpLeft, Zap, FileText } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md border-b border-slate-100 z-50 transition-all font-sans" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo Brand */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md animate-pulse">
              DS
            </div>
            <div className="text-right">
              <span className="block font-display font-black text-slate-900 tracking-tight text-xl">ديليفري السويس</span>
              <span className="block text-[10px] font-bold text-brand uppercase tracking-wider">Delivery-Suez.online</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="font-bold text-sm text-slate-600 hover:text-brand transition-colors">الرئيسية</Link>
            <Link href="/blog" className="font-bold text-sm text-slate-600 hover:text-brand transition-colors flex items-center gap-1">
              <FileText size={14} className="text-brand" />
              أحدث المقالات والأخبار
            </Link>
            <Link href="/#areas" className="font-bold text-sm text-slate-600 hover:text-brand transition-colors">مناطق التغطية</Link>
            <Link href="/affiliate" className="font-bold text-sm text-slate-600 hover:text-brand transition-colors">برنامج الشركاء 🎁</Link>
            <Link href="/developer" className="font-bold text-sm text-slate-600 hover:text-brand transition-colors">بوابة المطورين (API) 💻</Link>
            <Link href="/#faq" className="font-bold text-sm text-slate-600 hover:text-brand transition-colors">الأسئلة الشائعة</Link>
          </div>

          {/* Action Call to Action button */}
          <div className="hidden md:flex items-center gap-4">
            <Link 
              href="/webview" 
              className="px-6 py-2.5 bg-brand text-white text-xs font-black rounded-xl hover:scale-105 transition-all shadow-md shadow-brand/10 flex items-center gap-1.5"
            >
              <Zap size={14} className="fill-white" />
              فتح التطبيق المباشر
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-slate-600 focus:outline-none p-2 rounded-xl bg-slate-50 hover:bg-slate-100"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu panel */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 px-6 py-6 space-y-4">
          <Link 
            href="/" 
            onClick={() => setIsOpen(false)}
            className="block font-bold text-slate-800 hover:text-brand transition-colors py-2"
          >
            الرئيسية
          </Link>
          <Link 
            href="/blog" 
            onClick={() => setIsOpen(false)}
            className="block font-bold text-slate-800 hover:text-brand transition-colors py-2 flex items-center gap-1.5"
          >
            <FileText size={16} className="text-brand" />
            أحدث المقالات وأخبار السويس
          </Link>
          <Link 
            href="/#areas" 
            onClick={() => setIsOpen(false)}
            className="block font-bold text-slate-800 hover:text-brand transition-colors py-2"
          >
            مناطق التغطية
          </Link>
          <Link 
            href="/affiliate" 
            onClick={() => setIsOpen(false)}
            className="block font-bold text-slate-800 hover:text-brand transition-colors py-2"
          >
            برنامج الشركاء الكاش 🎁
          </Link>
          <Link 
            href="/developer" 
            onClick={() => setIsOpen(false)}
            className="block font-bold text-slate-800 hover:text-brand transition-colors py-2 text-brand"
          >
            بوابة المطورين والـ API 💻
          </Link>
          <Link 
            href="/#faq" 
            onClick={() => setIsOpen(false)}
            className="block font-bold text-slate-800 hover:text-brand transition-colors py-2"
          >
            الأسئلة الشائعة
          </Link>
          <div className="pt-4 border-t border-slate-100">
            <Link 
              href="/webview" 
              onClick={() => setIsOpen(false)}
              className="w-full py-3 bg-brand text-white text-center font-bold text-sm rounded-xl flex items-center justify-center gap-2"
            >
              <Zap size={16} className="fill-white" />
              تطبيق التوصيل المباشر
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
