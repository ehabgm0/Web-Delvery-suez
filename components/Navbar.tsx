'use client';

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone, MapPin, Download, User, Globe, MessageSquare, LifeBuoy } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-brand/20">
                S
              </div>
              <span className="text-xl font-display font-bold tracking-tight text-slate-900 hidden sm:block">
                Delivery <span className="text-brand">Suez</span>
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/areas" className="text-sm font-medium hover:text-brand transition-colors">المناطق</Link>
            <Link href="/services" className="text-sm font-medium hover:text-brand transition-colors">الخدمات</Link>
            <Link href="/support" className="text-sm font-medium hover:text-brand transition-colors">الدعم الفني</Link>
            <Link href="/webview" className="text-sm font-medium text-brand border border-brand/20 px-4 py-2 rounded-full hover:bg-brand hover:text-white transition-all">تطبيق الويب</Link>
            <Link href="/auth" className="flex items-center gap-2 px-6 py-2.5 bg-brand text-white rounded-full font-semibold hover:shadow-lg hover:shadow-brand/30 transition-all">
              <User size={18} />
              دخول
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-slate-600">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden glass-panel border-t p-4 flex flex-col gap-4"
          >
            <Link href="/areas" className="py-2 text-lg font-medium">المناطق</Link>
            <Link href="/services" className="py-2 text-lg font-medium">الخدمات</Link>
            <Link href="/support" className="py-2 text-lg font-medium">الدعم الفني</Link>
            <Link href="/webview" className="py-2 text-lg font-medium text-brand">تطبيق الويب</Link>
            <Link href="/auth" className="py-3 px-6 bg-brand text-white rounded-xl font-bold flex items-center justify-center gap-2">
              <User size={20} />
              تسجيل الدخول
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
