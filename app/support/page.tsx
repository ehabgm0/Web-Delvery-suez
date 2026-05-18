'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'motion/react';
import { MessageSquare, Phone, MapPin, Send, CheckCircle2, Ticket, LifeBuoy } from 'lucide-react';
import Link from 'next/link';
import { db, handleFirestoreError, OperationType } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function SupportPage() {
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: '',
    phone: '',
    subject: 'problem',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await addDoc(collection(db, 'tickets'), {
        ...formData,
        status: 'open',
        createdAt: serverTimestamp(),
      });
      setSuccess(true);
      setFormData({ name: '', phone: '', subject: 'problem', message: '' });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'tickets');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-brand/10 text-brand rounded-3xl mb-8"
            >
              <LifeBuoy size={40} />
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-display font-black text-slate-900 mb-6 italic tracking-tight">مركز الدعم الفني</h1>
            <p className="text-slate-500 text-xl max-w-2xl mx-auto leading-relaxed">
              نحن هنا لمساعدتك! سواء كنت تعاني من مشكلة في طلب أو تريد الاستفسار عن خدماتنا، فريقنا جاهز للرد عليك في أسرع وقت.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Contact Info */}
            <div className="space-y-8 order-2 lg:order-1 text-right">
              <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm">
                <h3 className="text-2xl font-display font-black mb-10 text-slate-900 border-r-4 border-brand pr-4">معلومات التواصل</h3>
                <div className="space-y-8">
                  <div className="flex items-start gap-6 flex-row-reverse text-right">
                    <div className="w-14 h-14 bg-brand/5 text-brand rounded-2xl flex items-center justify-center shrink-0">
                      <Phone size={28} />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl mb-1">واتساب مباشر</h4>
                      <p className="text-slate-500 mb-2 leading-relaxed">أسرع وسيلة للحصول على رد فوري من خدمة العملاء.</p>
                      <Link href="https://wa.me/201022679250" className="text-brand font-display font-bold text-2xl tracking-tighter" dir="ltr">01022679250</Link>
                    </div>
                  </div>
                  <div className="flex items-start gap-6 flex-row-reverse text-right">
                    <div className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center shrink-0">
                      <MapPin size={28} />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl mb-1">مقر الشركة</h4>
                      <p className="text-slate-500 leading-relaxed font-medium">السويس، مدينة السلام 1 - المنطقة المركزية.</p>
                      <p className="text-slate-400 text-sm mt-1 uppercase tracking-widest font-bold">متاح من 9 صباحاً - 11 مساءً</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-brand text-white p-10 rounded-[3rem] shadow-xl shadow-brand/20 relative overflow-hidden text-right">
                <h3 className="text-2xl font-display font-black mb-6 italic">للطيارين فقط</h3>
                <p className="text-white/80 mb-8 leading-relaxed font-medium">إذا كنت تريد الانضمام لفريقنا أو تواجه مشكلة تقنية في تطبيق الطيارين، برجاء اختيار &quot;طيار&quot; في موضوع التذكرة.</p>
                <div className="flex items-center gap-4 flex-row-reverse">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Ticket size={24} />
                  </div>
                  <span className="font-bold tracking-tight">الدعم الفني للطيارين متاح 24/7</span>
                </div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
              </div>
            </div>

            {/* Support Form */}
            <div className="order-1 lg:order-2">
              <div className="bg-white p-8 md:p-12 rounded-[3.5rem] border border-slate-200 shadow-xl shadow-slate-200/50 relative overflow-hidden text-right">
                {success ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center py-20 text-center"
                  >
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-8">
                      <CheckCircle2 size={40} />
                    </div>
                    <h3 className="text-3xl font-display font-black text-slate-900 mb-4">تم إرسال تذكرتك بنجاح!</h3>
                    <p className="text-slate-500 text-lg mb-10 leading-relaxed">شكراً لتواصلك معنا. سيقوم أحد أفراد فريقنا بالتواصل معك عبر الهاتف قريباً جداً.</p>
                    <button 
                      onClick={() => setSuccess(false)}
                      className="px-10 py-4 bg-brand text-white rounded-2xl font-bold shadow-lg shadow-brand/20 transition-all hover:scale-105"
                    >
                      إرسال تذكرة أخرى
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <h3 className="text-3xl font-display font-black text-slate-900 mb-2 italic">أنشئ تذكرة دعم</h3>
                    <p className="text-slate-500 mb-10 font-medium">املأ البيانات التالية وسنتصل بك فوراً.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-900 pr-2">الاسم بالكامل</label>
                        <input 
                          required
                          type="text" 
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          placeholder="أحمد علي"
                          className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-brand focus:ring-4 focus:ring-brand/5 outline-none transition-all placeholder:text-slate-400 font-bold"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-900 pr-2">رقم الهاتف</label>
                        <input 
                          required
                          type="tel" 
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          placeholder="01xxxxxxxxx"
                          dir="ltr"
                          className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-brand focus:ring-4 focus:ring-brand/5 outline-none transition-all placeholder:text-slate-400 font-bold"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-900 pr-2">موضوع التذكرة</label>
                      <select 
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-brand focus:ring-4 focus:ring-brand/5 outline-none transition-all font-bold appearance-none"
                      >
                        <option value="problem">مشكلة في طلب</option>
                        <option value="driver">التسجيل كطيار</option>
                        <option value="service">استفسار عن خدمة</option>
                        <option value="other">أخرى</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-900 pr-2">الرسالة أو الاستفسار</label>
                      <textarea 
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        rows={5}
                        placeholder="اشرح لنا ما تريد بالتفصيل.."
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-brand focus:ring-4 focus:ring-brand/5 outline-none transition-all placeholder:text-slate-400 font-bold resize-none"
                      />
                    </div>

                    <button 
                      type="submit"
                      disabled={loading}
                      className="w-full py-5 bg-brand text-white rounded-2xl font-black text-xl shadow-xl shadow-brand/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-3"
                    >
                      {loading ? (
                        <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <Send size={24} />
                          إرسال التذكرة الآن
                        </>
                      )}
                    </button>
                    
                    <p className="text-center text-xs text-slate-400 font-medium tracking-tight">
                      بالضغط على إرسال، أنت توافق على شروط الاستخدام وسياسة الخصوصية.
                    </p>
                  </form>
                )}
                
                {/* Visual accents */}
                <div className="absolute top-0 right-0 w-2 h-full bg-brand" />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
