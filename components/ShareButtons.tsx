'use client';

import React from 'react';
import Link from 'next/link';

interface ShareButtonsProps {
  slug: string;
}

export default function ShareButtons({ slug }: ShareButtonsProps) {
  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://delivery-suez.online/blog/${slug}`);
    alert('تم نسخ رابط المقال اللوجستي بنجاح لمشاركته! 📢');
  };

  return (
    <div className="border-t border-slate-100 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 flex-row-reverse">
      <span className="text-slate-400 font-bold text-xs">هل أعجبك المقال؟ شاركه مع تجار أو كباتن السويس</span>
      <div className="flex gap-2">
        <button 
          onClick={handleCopyLink}
          className="px-5 py-2.5 bg-slate-100 hover:bg-brand hover:text-white rounded-xl text-xs font-black text-slate-700 transition-all cursor-pointer flex items-center gap-1.5"
        >
          <span>نسخ الرابط المرجعي</span>
        </button>
        <Link 
          href={`https://www.facebook.com/sharer/sharer.php?u=https://delivery-suez.online/blog/${slug}`}
          target="_blank"
          className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-black hover:bg-blue-700 transition-all"
        >
          انشر في فيسبوك
        </Link>
      </div>
    </div>
  );
}
