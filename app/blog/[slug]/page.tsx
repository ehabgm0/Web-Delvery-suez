import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BLOG_POSTS } from '@/lib/constants';
import { notFound } from 'next/navigation';
import { Calendar, User, Clock, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = BLOG_POSTS.find(p => p.slug === resolvedParams.slug);
  if (!post) return {};
  
  return {
    title: `${post.title} | مدونة ديليفري السويس`,
    description: `اقرأ أكثر عن ${post.title} وكيفية الاستفادة من خدمات التوصيل في مدينة السويس بأفضل طريقة ممكنة.`,
  };
}

const POST_CONTENT: Record<string, string> = {
  'become-driver': `
# كيف تصبح طيار في السويس؟
العمل كطيار توصيل في مدينة السويس أصبح من أكثر الفرص ربحية ومرونة. إليك الخطوات البسيطة للبدء معنا:

1. **امتلاك وسيلة مواصلات:** موتوسيكل، عجلة، أو حتى سكوتر.
2. **التسجيل في التطبيق:** ادخل على صفحة الانضمام وسجل بياناتك.
3. **المقابلة الشخصية:** سنحدد معك موعداً سريعاً في مقرنا بالسلام 1.
4. **ابدأ العمل:** بمجرد تفعيل الحساب، يمكنك البدء في استقبال الطلبات فوراً.

### لماذا تنضم إلينا؟
* عمولة مجزية جداً.
* حرية كاملة في اختيار وقت العمل.
* دعم فني وتنسيق مستمر لنصل لأفضل النتائج.
  `,
  'how-to-order': `
# كيف تطلب دليفري أونلاين في السويس؟
عملية الطلب معنا في غاية السهولة:

1. افتح رابط تطبيق الويب أو الموبايل.
2. حدد موقعك بدقة (مثلاً السلام 1 - بجوار...).
3. اختر الخدمة أو اكتب تفاصيل طلبك.
4. سيظهر لك أقرب طيار فورياً.
5. استلم طلبك واستمتع بالسرعة!

نحن نضمن لك تجربة مستخدم سلسة وبسيطة بعيداً عن التعقيد.
  `,
  'best-restaurants': `
# أفضل مطاعم السويس للتوصيل
مدينة السويس غنية بالمطاعم الرائعة، ومن خلال تطبيقنا يمكنك الطلب من:
* مطاعم الأسماك الشهيرة.
* مطاعم الوجبات السريعة في الأربعين وفيصل.
* الكافيهات والحلويات.

نحن نوفر لك قائمة محدثة دائماً بأفضل الأماكن التي تقدم خدمة التوصيل.
  `,
  'prices': `
# أسعار التوصيل في السويس
نلتزم في ديليفري السويس أونلاين بتقديم أفضل الأسعار التنافسية. يتم حساب التكلفة بناءً على:
1. المسافة بين نقطة الاستلام ونقطة التسليم.
2. توقيت الطلب (عروض ليلية أو صباحية).
3. نوع الخدمة المطلوبة.

يمكنك دائماً معرفة التكلفة التقريبية قبل تأكيد الطلب من خلال التطبيق.
  `,
  'news': `
# أخبار وعروض ديليفري السويس
تابعنا دائماً للحصول على خصومات حصرية:
* خصم 50% على أول طلب للعملاء الجدد.
* عروض نهاية الأسبوع في حي السلام والصباح.
* مسابقات وجوائز للطيارين المتميزين شهرياً.

لا تنسوا متابعة صفحاتنا على السوشيال ميديا لمعرفة آخر الأخبار.
  `
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find(p => p.slug === slug);

  if (!post) {
    notFound();
  }

  const content = POST_CONTENT[slug] || "جاري كتابة المحتوى..";

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-32 pb-24 text-right">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-brand font-bold text-sm mb-12 hover:gap-3 transition-all">
            <ChevronRight size={16} />
            العودة للرئيسية
          </Link>
          
          <article className="prose prose-xl prose-slate max-w-none">
            <div className="flex flex-wrap gap-6 text-sm text-slate-400 font-bold mb-10 justify-end">
              <div className="flex items-center gap-2 flex-row-reverse"><Calendar size={16} /> {post.date}</div>
              <div className="flex items-center gap-2 flex-row-reverse"><User size={16} /> فريق الدعم</div>
              <div className="flex items-center gap-2 flex-row-reverse"><Clock size={16} /> 5 دقائق قراءة</div>
            </div>
            
            <div className="markdown-body text-slate-700 leading-relaxed font-medium">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          </article>
          
          <div className="mt-20 pt-12 border-t border-slate-100 italic">
            <h3 className="text-2xl font-display font-black text-slate-900 mb-8 tracking-tight">مقالات أخرى قد تهمك:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {BLOG_POSTS.filter(p => p.slug !== slug).slice(0, 4).map((p, i) => (
                <Link href={`/blog/${p.slug}`} key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-brand transition-all group">
                  <h4 className="font-bold text-slate-900 group-hover:text-brand transition-colors text-lg italic">{p.title}</h4>
                  <p className="text-slate-400 text-sm mt-4">{p.date}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
