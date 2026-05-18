import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-3xl font-display font-bold mb-6 italic">Delivery <span className="text-brand">Suez</span></h2>
            <p className="text-slate-400 max-w-md leading-relaxed mb-8">
              المنصة رقم #1 للتوصيل في مدينة السويس. نحن نجمع بين التكنولوجيا المتطورة وسرعة التنفيذ لخدمة أهالي السويس الكرام.
            </p>
            <div className="flex gap-4">
              <Link href="https://www.facebook.com/DeliverySuezOnline" className="p-3 bg-white/5 rounded-full hover:bg-brand transition-colors">
                <Facebook size={20} />
              </Link>
              <Link href="https://www.instagram.com/deliverysuezonline" className="p-3 bg-white/5 rounded-full hover:bg-brand transition-colors">
                <Instagram size={20} />
              </Link>
              <Link href="https://www.tiktok.com/@delivery.Suez" className="p-3 bg-white/5 rounded-full hover:bg-brand transition-colors">
                <Twitter size={20} />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6 tracking-wide uppercase text-brand/80">المناطق والأحياء</h3>
            <ul className="space-y-4 text-slate-400">
              <li><Link href="/area/salam-1" className="hover:text-white transition-colors">السلام 1</Link></li>
              <li><Link href="/area/arbayeen" className="hover:text-white transition-colors">الأربعين</Link></li>
              <li><Link href="/area/faisal" className="hover:text-white transition-colors">فيصل</Link></li>
              <li><Link href="/area/port-tawfik" className="hover:text-white transition-colors">بورتوفيق</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6 tracking-wide uppercase text-brand/80">تواصل معنا</h3>
            <ul className="space-y-4 text-slate-400">
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-brand" />
                <span dir="ltr">01022679250</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={18} className="text-brand" />
                <span>السويس، السلام 1</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-brand" />
                <span>info@delivery-suez.online</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Delivery Suez Online. جميع الحقوق محفوظة.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">سياسة الخصوصية</Link>
            <Link href="/terms" className="hover:text-white transition-colors">الشروط والأحكام</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
