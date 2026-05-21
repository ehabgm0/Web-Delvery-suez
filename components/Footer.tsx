'use client';

import React from 'react';
import Link from 'next/link';
import { AREAS } from '@/lib/constants';
import { Phone, Mail, MapPin, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white pt-20 pb-8 text-right font-sans" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Foot top layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Col 1: Brand Info */}
          <div>
            <div className="flex items-center gap-3 mb-6 justify-end">
              <span className="font-display font-black text-2xl tracking-tight">ديليفري السويس</span>
              <div className="w-8 h-8 bg-brand text-white rounded-full flex items-center justify-center font-bold text-xs">DS</div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 font-medium">
              المنصة رقم واحد للحلول اللوجستية وتوصيل الطلبات الفورية في محافظة السويس. نخدم الأفراد والمطاعم والصيدليات بخبرة وأمان وتغطية متكاملة طوال الـ 24 ساعة.
            </p>
            <div className="space-y-3 font-semibold text-xs text-slate-300">
              <p className="flex items-center gap-2 justify-end">
                <span>01022679250</span>
                <Phone size={14} className="text-brand" />
              </p>
              <p className="flex items-center gap-2 justify-end">
                <span>info@delivery-suez.online</span>
                <Mail size={14} className="text-brand" />
              </p>
              <p className="flex items-center gap-2 justify-end">
                <span>محافظة السويس، جمهورية مصر العربية</span>
                <MapPin size={14} className="text-brand" />
              </p>
            </div>
          </div>

          {/* Col 2: Services / Pages */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-6 border-r-2 border-brand pr-2">صفحات تهمك</h4>
            <ul className="space-y-3 font-bold text-sm text-slate-300">
              <li><Link href="/" className="hover:text-brand transition-colors">الصفحة الرئيسية</Link></li>
              <li><Link href="/blog" className="hover:text-brand transition-colors">مدونة المنصة</Link></li>
              <li><Link href="/webview" className="hover:text-brand transition-colors">لوحة محاكاة وتتبع الكباتن</Link></li>
              <li><Link href="/affiliate" className="hover:text-brand transition-colors">برنامج الشركاء (شارك واكسب) 🎁</Link></li>
              <li><Link href="/developer" className="hover:text-brand transition-colors text-brand">بوابة المطورين والربط البرمجي (API) 💻</Link></li>
              <li><Link href="https://wa.me/201022679250" target="_blank" className="hover:text-brand transition-colors">الدعم الفني المباشر</Link></li>
            </ul>
          </div>

          {/* Col 3: Areas 1 */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-6 border-r-2 border-brand pr-2">أحياء السويس (1)</h4>
            <ul className="space-y-3 font-medium text-xs text-slate-300">
              {AREAS.slice(0, 5).map((area) => (
                <li key={area.slug}>
                  <Link href={`/area/${area.slug}`} className="hover:text-brand transition-colors flex items-center justify-end gap-1">
                    <span>دليفري في {area.arabicName}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Areas 2 */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-6 border-r-2 border-brand pr-2">أحياء السويس (2)</h4>
            <ul className="space-y-3 font-medium text-xs text-slate-300">
              {AREAS.slice(5).map((area) => (
                <li key={area.slug}>
                  <Link href={`/area/${area.slug}`} className="hover:text-brand transition-colors flex items-center justify-end gap-1">
                    <span>توصيل في {area.arabicName}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Foot divider */}
        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row-reverse justify-between items-center text-xs text-slate-400">
          <p className="mb-4 md:mb-0 font-bold flex items-center gap-1">
            <span>صُنع بحب في السويس لدعم طيارينا وعملائنا</span>
            <Heart size={12} className="text-red-500 fill-red-500" />
          </p>
          <p className="font-mono">
            © {new Date().getFullYear()} Delivery-Suez.online. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
