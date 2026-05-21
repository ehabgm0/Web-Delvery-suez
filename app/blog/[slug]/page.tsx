import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, Clock, User, ChevronLeft, ArrowUpLeft, ShieldCheck, Zap, Laptop, ArrowRight } from 'lucide-react';
import SafeImage from '@/components/SafeImage';
import ShareButtons from '@/components/ShareButtons';

interface ArticleData {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  authorRole: string;
  image: string;
  contentHtml: string;
  seoDesc: string;
  keywords: string;
}

const ARTICLES_DATABASE: Record<string, ArticleData> = {
  'suez-logistics-revolution': {
    slug: 'suez-logistics-revolution',
    title: 'كيف غيّر ديليفري السويس أونلاين مفهوم الشحن اللوجستي المحلي؟',
    category: 'تكنولوجيا لوجستيات',
    date: '21 مايو 2026',
    readTime: '4 دقائق',
    author: 'المهندس أسامة السويسي',
    authorRole: 'مستشار تطوير الخدمات اللوجستية بمصر والقناة',
    image: 'https://picsum.photos/seed/revolution/1200/600',
    seoDesc: 'اكتشف كيف غيرت منصة ديليفري السويس أونلاين مجرى الشحن والطلبات العاجلة في السويس باستخدام تقنيات الجي بي إس GPS المتقدمة وتوصيل المطاعم والصيدليات.',
    keywords: 'دليفري السويس, شحن السويس, طيارين السويس, تطبيق السويس ديليفري, لوجستيات السويس',
    contentHtml: `
      <h3>مقدمة حول الفوضى اللوجستية التقليدية</h3>
      <p>طالما كانت مدينة السويس عصبًا تجاريًا وصناعيًا نابضًا على القناة، ولكن تحدي التوصيل داخل أحياء مثل <strong>حي الأربعين ومنافذ سوق الأنصاري المزدحمة</strong> لطالما مثل عائقًا كبيرًا أمام نمو التجارة المحلية ومطاعم السويس. كانت مكالمات هواتف الدليفري التقليدية تتسم بالبطء والضياع، وفقدان مسار الكابتن، وتسليم الأكل باردًا.</p>
      
      <p>هنا انطلقت منصة <a href="/" class="text-brand font-bold underline">ديليفري السويس أونلاين</a> لتصبح الريادة التقنية الأولى التي تقضي على هذه الفوضى، وتضع معايير كفاءة لم يسبق لها مثيل.</p>

      <h3>حلول الـ GPS المبتكرة لتعيين كباتن السويس فري لانس</h3>
      <p>التطور الجذري يعود إلى استخدامنا لتقنيات الـ GPS في تعقب وإدارة أكثر من 400 طيار حر بالسويس. بدلاً من إرسال طيار يعبر من السلام للمجرى من أجل أوردر بسيط، يربط النظام العميل بالطيار المتواجد في نطاق 5 دقائق فقط:</p>
      <ul>
        <li><strong>أحياء السلام الأول والسلام الثاني:</strong> تأمين طيارين للطلاب بجامعة السويس لتوصيل المستندات والمقاضي بسرعة لا متناهية. تفضل بزيارة صفحتنا المخصصة لـ <a href="/area/salam-1" class="text-brand font-bold underline">توصيل السلام 1</a>.</li>
        <li><strong>حي فيصل والصباح:</strong> تغطية مستمرة لتوصيل صيدليات متكامل وحقائب أكل ساخنة.</li>
        <li><strong>كورنيش السويس وحي الغريب:</strong> تتبع حي متاح على تطبيقنا للتوصيل مباشرة للمظلات العائلية.</li>
      </ul>

      <h3>تقليل هدر الوقت بنسبة 40% للأفراد والمطاعم</h3>
      <p>بفضل الله ومجهودات إدارة التنسيق التكنولوجية، نجحنا في تقليص متوسط زمن رحلة الدليفري في السويس ليصبح <strong>18 دقيقة فقط</strong>! وهذا يعني إيرادات أكثر للمطاعم، وجبات ساخنة طازجة للزبائن، وضمان هامش ربح ممتاز للكباتن الحرين كاش ومباشر دون وسيط.</p>

      <h3>احصل على طيار فري لانس في ثوانٍ</h3>
      <p>لا تدع مشاوير بيتك الصعبة أو شحنات متجرك المنزلي تهدر وقتك وعملك. جرب الآن المحاكاة اللوجستية وتتبع حركة الطيارين المباشرة من خلال <a href="/webview" class="text-brand font-bold underline">تطبيق ديليفري السويس المباشر (Webview)</a> واحصل على تجربة التوصيل كما يجب أن تكون.</p>
    `
  },
  'delivery-prices-egypt': {
    slug: 'delivery-prices-egypt',
    title: 'دليلك الشامل لرسوم الدليفري العادلة ومحاسبة الطيارين بالجنيه المصري (EGP) بالسويس',
    category: 'إرشاد مالي',
    date: '20 مايو 2026',
    readTime: '5 دقائق',
    author: 'فريق كتاب السويس',
    authorRole: 'قسم التحليلات المالية بمنصة ديليفري السويس أونلاين',
    image: 'https://picsum.photos/seed/pricing/1200/600',
    seoDesc: 'تقرير مالي متميز يثقف أهالي السويس وأصحاب المطاعم بآليات حساب رسوم التوصيل الشفافة بالجنيه المصري EGP وضمان عائد 100% للطيار الحر.',
    keywords: 'EGP السويس, رسوم الدليفري السويس, أسعار التوصيل بالسويس, محاسبة الكباتن السويس, ديليفري كاش',
    contentHtml: `
      <h3>معادلة التسعير العادل في ظل تحديات الوقود بالسويس</h3>
      <p>نظراً للتقلبات الاقتصادية، كان لابد من إيجاد معادلة تسعير لوجستية عادلة بالجنيه المصري (EGP) تضمن تعويض الكابتن عن تكلفة صيانة الدراجة البخارية واستهلاك البنزين، وفي نفس الوقت تقديم سعر غير مبالغ فيه للعملاء الكرام في حي الأربعين والسلام ومساكن فيصل.</p>

      <p>اعتمد تطبيقنا <a href="/" class="text-brand font-bold underline">توصيل ديليفري السويس</a> على معادلة كيلومترية دقيقة تحسب المسافة الفعلية المقطوعة بالـ GPS لإعطاء تقدير مالي فوري قبل انطلاق الرحلة.</p>

      <h3>لماذا أسعارنا الأكثر شفافية في السويس؟</h3>
      <p>على عكس الشركات المركزية والمقاولين اللوجستيين التقليديين الذين يستقطعون أكثر من 30% من جهد الطيار، توفر منصتنا:</p>
      <ul>
        <li><strong>عائد 100% كاش للكابتن:</strong> يحصل الطيار على كامل سعر المشوار كاش من العميل مباشرة لضمان حياة كريمة له ولأسرته الكريمة.</li>
        <li><strong>رصيد مجاني للعملاء الجدد:</strong> عبر <a href="/affiliate" class="text-brand font-bold underline">برنامج المشاركة والربح المجاني</a>، يحصل العميل وصديقه على 50 جنيهاً رصيد بمحفظتهم كاش عند تفعيل الحساب فورياً.</li>
        <li><strong>عدالة في شحن طلبات الأسر المنتجة:</strong> أسعار مخفضة وثابتة مسبقاً لتشجيع رائدات الأعمال وصانعي الحلويات في الصباح ومساكن فيصل.</li>
      </ul>

      <h3>نموذج تسعير عادل بالأرقام</h3>
      <p>تبدأ الرحلات الشائعة بأسعار تنافسية ومدروسة تناسب الدخل المحلي وتضمن وصول أقصى خدمة جودة. لم نعد نعمل بالاعتماد العشوائي للمقادير، بل بحقائق جغرافية يمكنك معاينتها كلياً وصراحة.</p>

      <h3>احجز طيارك الآن ووفر نفقاتك</h3>
      <p>يمكنك الآن قياس تكلفة رحلتك بمطابقة دقيقة وحجز طيارك الحر فوراً بالتجربة الحية والمباشرة عبر زيارة <a href="/webview" class="text-brand font-bold underline">بوابة ديليفري السويس الإلكترونية</a> لراحتك الكاملة.</p>
    `
  },
  'earn-money-suez': {
    slug: 'earn-money-suez',
    title: 'فرص العمل الحر كطيار دليفري في السويس: كيف تحقق 500 جنيه EGP يومياً بالدراجة النارية؟',
    category: 'العمل الحر والتطوير',
    date: '18 مايو 2026',
    readTime: '7 دقائق',
    author: 'الكابتن إبراهيم الغريب',
    authorRole: 'كبير كباتن السويس ومدرب النظم الميدانية',
    image: 'https://picsum.photos/seed/earnings/1200/600',
    seoDesc: 'دليل عملي شامل يشرح بالتفاصيل أساليب الالتحاق بأسطول كباتن السويس فري لانس وتحقيق دخل فوري وممتاز بالجنيه المصري EGP والعمل بأوقات حرة.',
    keywords: 'وظائف دليفري السويس, عمل حر السويس, التسجيل كطيار بالسويس, ربح من الاسكوتر بالسويس, كباتن السويس',
    contentHtml: `
      <h3>مستقبل العمل الحر اللوجستي في السويس</h3>
      <p>في ظل رغبة الشباب بمحافظة السويس في زيادة دخلهم أو العمل بدوام مرن وحر، وفرت منصة <strong>ديليفري السويس أونلاين</strong> أفضل فرصة عمل ممكنة. لم نعد نطلب شروطاً تعجيزية ولا عقود احتكار؛ كل ما تحتاجه هو حيازة دراجة بخارية (موتوسيكل) أو سكوتر، رخصة قيادة سارية، وضمير يقظ للتوصيل الحلال.</p>

      <h3>خطوات تحقيق 500 جنيه مالي يومياً (EGP)</h3>
      <p>لتحقيق أقصى فاعلية ودخل مالي كاش يومياً بالسويس، ننصح كباتننا وفريقنا باتباع النظم التالية:</p>
      <ul>
        <li><strong>توزيع الجهد في أوقات الذروة:</strong> التواجد في محيط مطاعم السلام 1 والصباح وفيصل من الساعة 2 ظهراً وحتى 6 مساءً (فترة غذاء الموظفين والوجبات العائلية).</li>
        <li><strong>التغطية الليلية العاجلة:</strong> دليفري الأدوية من الصيدليات الكبرى يتضاعف فيه الأجر والتقدير، خاصة لطلب المشاوير العاجلة طوال فترات الليل. تفضل بزيارة صفحتنا لـ <a href="/area/arbayeen" class="text-brand font-bold underline">كباتن وتوصيل حي الأربعين</a> للتفوق هناك.</li>
        <li><strong>استغلال كود الإحالة والكاش:</strong> قم بزيادة حسابك وتطوير نقاطك عبر <a href="/affiliate" class="text-brand font-bold underline">شراكة الإحالة والربح</a> للتكسب الإضافي بجانب الرحلات.</li>
      </ul>

      <h3>خصوصيات وأمان الكباتن هيبة ورزق كاش</h3>
      <p>شعارنا في دليفري السويس هو الاحترام المتبادل. يحصل العميل على حقه كاملًا والطيار يحصل على تعبه واحترامه ماليًا ومعنويًا. نحن نثق بكم ونرتقي بالابتكار والتكنولوجيا لتمكين الكادر البشري المحلي بالسويس.</p>

      <h3>انضم إلينا الآن في ثوانٍ معدودة!</h3>
      <p>لا تنتظر الوظائف المكتبية الروتينية؛ ابدأ كسب رزقك الكاش وتوفير طلبات السوايسة فوراً عن طريق التسجيل أو محاكاة التطبيق بزيارة <a href="/webview" class="text-brand font-bold underline">لوحة تحكم كباتن السويس المباشرة</a> وتواصل مع طاقم الإشراف لدينا.</p>
    `
  }
};

export async function generateStaticParams() {
  return Object.keys(ARTICLES_DATABASE).map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = ARTICLES_DATABASE[resolvedParams.slug];
  if (!article) return {};

  return {
    title: `${article.title} | ديليفري السويس اللوجستية`,
    description: article.seoDesc,
    keywords: article.keywords,
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = ARTICLES_DATABASE[slug];

  if (!article) {
    notFound();
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article.title,
    "description": article.seoDesc,
    "image": article.image,
    "datePublished": "2026-05-21T00:00:00Z",
    "author": {
      "@type": "Person",
      "name": article.author,
      "jobTitle": article.authorRole
    },
    "publisher": {
      "@type": "Organization",
      "name": "Delivery-Suez.online",
      "logo": {
        "@type": "ImageObject",
        "url": "https://delivery-suez.online/images/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://delivery-suez.online/blog/${article.slug}`
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Navbar />

      <main className="pt-32 pb-24 text-right">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Back button and Info header */}
          <div className="mb-8" dir="rtl">
            <Link href="/blog" className="inline-flex items-center gap-1.5 text-xs font-black text-brand hover:underline mb-6">
              <ArrowRight size={14} />
              العودة لقائمة جميع المقالات والأخبار
            </Link>

            <div className="flex flex-wrap gap-2 mb-4 justify-end">
              <span className="px-3 py-1 bg-brand/10 text-brand rounded-full text-xs font-black">{article.category}</span>
              <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-xs font-bold font-sans">{article.readTime}</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-display font-black text-slate-900 leading-tight mb-6">
              {article.title}
            </h1>

            {/* Author Profile section */}
            <div className="flex items-center gap-4 border-y border-slate-100 py-5 justify-end flex-row">
              <div className="text-right">
                <p className="font-bold text-slate-900 text-sm">{article.author}</p>
                <p className="text-slate-400 text-xs font-semibold">{article.authorRole}</p>
                <p className="text-slate-400 text-[10px] font-bold font-sans mt-0.5">{article.date}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-brand/10 text-brand flex items-center justify-center font-bold text-sm border border-brand/20">
                {article.author.substring(0, 2)}
              </div>
            </div>
          </div>

          {/* Featured Article image */}
          <div className="relative aspect-[21/9] w-full rounded-[2.5rem] overflow-hidden mb-12 shadow-md">
            <SafeImage 
              src={article.image} 
              fallbackSrc="https://picsum.photos/seed/article/1200/600"
              alt={article.title} 
              fill
              className="object-cover"
            />
          </div>

          {/* Article actual Content Body */}
          <article 
            className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-right font-medium text-base mb-16 space-y-6"
            dangerouslySetInnerHTML={{ __html: article.contentHtml }}
            dir="rtl"
          />

          {/* Internal linking backlink Call-to-action Block */}
          <div className="bg-slate-950 text-white rounded-[2.5rem] p-8 md:p-12 text-right relative overflow-hidden mb-12 shadow-xl border border-white/5">
            <div className="relative z-10 max-w-xl">
              <h3 className="text-2xl font-display font-black text-brand mb-4">اختصار الوقت والأمان هو شعارنا اليوم!</h3>
              <p className="text-white/70 font-semibold text-sm leading-relaxed mb-8">
                تصفح الكباتن المتاحين الآن في السويس، قارن الأسعار والرسوم، اتبع رحلتك بالـ GPS وتواصل المالك والطيار كلياً على لوحة تحكم التطبيق.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 flex-row-reverse justify-end">
                <Link href="/webview" className="px-8 py-4 bg-brand text-white rounded-2xl font-black text-sm hover:scale-105 transition-all shadow-lg shadow-brand/20">
                  تجربة تطبيق ديليفري السويس
                </Link>
                <Link href="/affiliate" className="px-8 py-4 bg-white/10 text-white rounded-2xl font-bold flex items-center justify-center gap-1.5 border border-white/10 hover:bg-white/20 transition-all text-sm">
                  انضم لبرنامج الشركاء الكاش
                </Link>
              </div>
            </div>
            
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
          </div>

          {/* Horizontal sharing options */}
          <ShareButtons slug={article.slug} />

        </div>
      </main>

      <Footer />
    </div>
  );
}
