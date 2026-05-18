'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ExternalLink, Maximize2, RotateCcw } from 'lucide-react';

export default function WebViewPage() {
  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  const refreshIframe = () => {
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20 flex flex-col">
        {/* Controls Bar */}
        <div className="bg-slate-800 border-b border-slate-700 px-4 py-3 flex justify-between items-center text-white">
          <div className="flex items-center gap-4">
            <h1 className="text-sm font-bold tracking-tight hidden md:block">Delivery Suez - App Viewer</h1>
            <div className="flex items-center gap-2 px-3 py-1 bg-slate-900 rounded-lg border border-slate-700 text-xs font-mono text-slate-400">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              https://www.delivery-suez.online
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={refreshIframe}
              className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-400 hover:text-white"
              title="إعادة تحميل"
            >
              <RotateCcw size={18} />
            </button>
            <a 
              href="https://www.delivery-suez.online/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-1.5 bg-brand text-white rounded-lg text-xs font-bold hover:bg-brand-dark transition-all"
            >
              <ExternalLink size={14} />
              فتح في نافذة جديدة
            </a>
          </div>
        </div>

        {/* Iframe Container */}
        <div className="flex-1 bg-white relative">
          <iframe 
            ref={iframeRef}
            src="https://www.delivery-suez.online/"
            className="absolute inset-0 w-full h-full border-none"
            title="Suez Delivery Web App"
            allow="geolocation; camera; microphone"
          />
        </div>
      </main>

      <div className="bg-slate-900 py-4 px-8 text-center text-slate-500 text-xs border-t border-slate-800">
        هذا العرض مدمج لتسهيل الوصول السريع - جميع الحقوق محفوظة لـ ديليفري السويس أونلاين
      </div>
    </div>
  );
}
