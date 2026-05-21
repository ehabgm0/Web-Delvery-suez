import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Truck, MapPin, ShieldCheck, ChevronLeft, MessageSquare, Clock, Map } from 'lucide-react';
import Link from 'next/link';
import { AREAS } from '@/lib/constants';
import SafeImage from '@/components/SafeImage';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return AREAS.map((area) => ({
    slug: area.slug,
  }));
}

// 10 key Suez neighborhoods structured with hand-crafted local SEO value
const NEIGHBORHOODS_SEO: Record<string, {
  landmarks: string[];
  description: string;
  faqs: { q: string; a: string }[];
  seoKeywords: string;
}> = {
  'salam-1': {
    landmarks: ['شارع الشهد', 'مسجد المصطفى', 'مجمع كليات جامعة السويس الجديدة', 'شارع السبع عماير', 'ميدان السلام أول'],
    description: 'تعتبر منطقة السلام 1 المركز التعليمي والسكني الأرقى في مدينة السويس، نظراً لاحتوائها على مجمع كليات جامعة السويس الرئيسي والتوسعات العمرانية الجديدة. نضمن هنا تواجد أكثر من 50 طياراً في محيط خمس دقائق للتغطية السريعة لطلبات الطلاب والموظفين والعائلات على مدار الـ 24 ساعة، مع جلب الأدوية من أشهر الصيدليات وتوصيل أوردرات الكشرى والبرجر من أشهر المحلات بالسلام الأول.',
    faqs: [
      { q: 'هل يمكن التوصيل من سوبر ماركت ومكتبات السلام 1 لجامعة السويس؟', a: 'بالتأكيد، نوفر طيارين مخصصين لنقل المستندات، الكتب والمواد التعليمية، أو الوجبات الخفيفة والقهوة وتوصيلها للطلاب والمحاضرين داخل كليات جامعة السويس والمباني الإدارية فوراً.' },
      { q: 'كم يستغرق الدليفري في محيط شارع الشهد والسبع عماير؟', a: 'يستغرق التوصيل داخل السلام الأول من 10 إلى 20 دقيقة كحد أقصى نظراً لتواجد كباتننا بصفة مستمرة في النقاط الحيوية.' },
      { q: 'هل التوصيل الليلي متاح لطلاب المدينة الجامعية؟', a: 'نعم، نوفر دليفري السلام 1 الليلي على مدار 24 ساعة لدعم الطلاب في فترات الامتحانات وتنقيل الأغذية والمقتنيات الشخصية بأمان.' }
    ],
    seoKeywords: 'دليفري السلام 1 السويس, توصيل جامعة السويس, طيار السلام الأول, مطاعم السلام 1 دليفري, رقم دليفري السلام السويس'
  },
  'salam-2': {
    landmarks: ['مساكن السلام الثاني', 'شارع السلخانة القديم', 'ميدان الجامعة الخلفي', 'مدرسة السلام الثانوية'],
    description: 'يتميز حي السلام الثاني بكثافة سكانية هائلة وتفرعات شوارع واسعة تجمع كبار العائلات ومحلات الخدمات اللوجستية التجارية. ولقد خصصت منصتنا خطوطاً مباشرة لخدمة وتوصيل السوبر ماركت والطلبات الثقيلة في السلام 2 بدقة بالغة ورسوم توصيل عادلة ومدروسة تناسب الدخل المحلي وبأعلى مستويات الأمان.',
    faqs: [
      { q: 'هل تغطون المناطق الفرعية والداخلية في السلام الثاني؟', a: 'نعم، نغطي كل شارع وحارة في السلام الثاني بما فيها المساكن الشعبية والعمائر الاستثمارية والشوارع الترابية بواسطة طيارين يمتلكون دراجات قوية قادرة على التعامل مع كافة الطرق.' },
      { q: 'ما هي رسوم دليفري السلام 2 للمشاوير العاجلة؟', a: 'رسومنا تبدأ من أسعار تنافسية للغاية وتحسب بناءً على الكيلومترات الفعلية بالجنيه المصري (EGP) لتوفير أكبر عائد للعملاء والطيارين.' },
      { q: 'هل يمكنني حجز طياري لتوصيل طلبات الصيدليات في السلام 2 ليلاً؟', a: 'بالتأكيد، كباتننا جاهزون لشراء وتوصيل كافة مستلزمات الصيدليات طوال الليل لخدمتكم في الحالات العاجلة.' }
    ],
    seoKeywords: 'دليفري السلام الثاني السويس, كابتن دليفري السلام 2, توصيل طلبات السلام 2, صيدليات السلام 2 دليفري'
  },
  'arbayeen': {
    landmarks: ['ميدان الأربعين التاريخي', 'شارع الجيش الرئيسي', 'سوق الأنصاري عصب التجارة في السويس', 'السينما القديمة', 'موقف الأربعين لسيارات الأقاليم'],
    description: 'الأربعين هو قلب مدينة السويس النابض بالحركة والتجارة والتاريخ. يتميز بالازدحام الشديد والنشاط التجاري اللامحدود على مدار الساعة. في دليفري السويس أونلاين، قمنا بتنظيم نظام ذكي لإرسال وتعيين الكباتن ليتجاوز عقبة الزحام المروري في ميدان الأربعين وسوق الأنصاري لتوصيل الطعام، الأقمشة، البضائع والطلبات في زمن قياسي يفوق التوقعات.',
    faqs: [
      { q: 'كيف يتجنب طيار دليفري السويس ازدحام ميدان الأربعين؟', a: 'يعتمد كباتن الأربعين على الدراجات النارية والأساليب الذكية ومعرفتهم العميقة بالشوارع الخلفية والحواري الضيقة للتملص من الاختناقات المرورية وضمان الوصول في الموعد.' },
      { q: 'هل تشحنون بضائع من محلات سوق الأنصاري التاريخي لجميع أحياء السويس؟', a: 'نعم، نغطي كل سوق الأقمشة وسوق الأنصاري لتأمين الشحن اللوجستي للتجار وتوجيه دليفري سريع وبضاع لخدمة السوايسة.' },
      { q: 'هل يتوفر توصيل ساخن من مطاعم الأربعين الكبرى؟', a: 'بالتأكيد، نوصل الوجبات من كبرى مطابخ ومطاعم الأربعين في حقائب معزولة حرارياً لحفظ المأكولات طازجة.' }
    ],
    seoKeywords: 'دليفري حي الأربعين السويس, توصيل سوق الأنصاري, طيارين الأربعين السويس, شحن السويس الأربعين, أسرع دليفري السويس'
  },
  'faisal': {
    landmarks: ['مساكن فيصل', 'شارع الخمسين', 'سوق الحرفيين بالسويس', 'مسجد حمزة بن عبد المطلب', 'ميدان الغريب الجديد'],
    description: 'يعد حي فيصل واحداً من أسرع الأحياء السكنية نمواً وتوسعاً في السويس. تتنوع فيها المساكن من الاقتصادية إلى الفاخرة والاستثمارية. لقد أنشأنا مركز عمليات فرعي خاص بحي فيصل لتوصيل الطلبات المنزلية، مستلزمات البناء من الورش، وجلب الوجبات الطازجة من المطاعم التي تملأ أركان حي فيصل.',
    faqs: [
      { q: 'هل تخدمون التوسعات والمساكن الجديدة في حي فيصل؟', a: 'نعم، نغطي مساكن فيصل وحرفيين السويس وجميع التوسعات والمشروعات السكنية الجديدة دون استثناء.' },
      { q: 'كيف أطلب طيار دليفري فري لانس في فيصل لقضاء متطلبات البيت؟', a: 'ببساطة، ادخل لتطبيق الويب، اختر خدمة "طيار خاص"، وسيتواصل معك أقرب كابتن في حي فيصل فوراً لقضاء متطلباتك.' },
      { q: 'هل نوفر توصيل صيدليات متكامل لحي فيصل؟', a: 'نعم، نوصل الأدوية والمستلزمات الطبية من كافة الصيدليات الكبرى في فيصل وميدان حمزة طوال اليوم.' }
    ],
    seoKeywords: 'دليفري حي فيصل السويس, توصيل فيصل السويس, طيار فيصل فري لانس, صيدليات حي فيصل'
  },
  'attaka': {
    landmarks: ['مجمع عتاقة الصناعي', 'ميناء عتاقة للصيد', 'التجمعات الصناعية الكبرى', 'الأبراج السكنية بعتاقة', 'شاطئ الأدبية'],
    description: 'حي عتاقة والمنطقة الصناعية يمثلان العمود الفقري الاقتصادي واللوجستي لقناة السويس والسويس والشركات العالمية. نوفر خدمات دليفري مخصصة للشركات والمصانع والمكاتب الإدارية لنقل العقود والمكافآت، توصيل الوجبات الفردية والجماعية للموظفين والمهندسين في فترات الراحة، بالإضافة لشحن الأدوات وقطع الغيار الخفيفة.',
    faqs: [
      { q: 'هل تقومون بالتوصيل للمصانع والشركات البعيدة في حي عتاقة؟', a: 'نعم، نمتلك أسطول سيارات خفيفة ودراجات نارية مجهزة بالكامل لقطع المسافات الطويلة وتوصيل الطلبات للشركات الواقعة في عمق عتاقة والمنطقة الحرة.' },
      { q: 'ما هو متوسط وقت توصيل وجبات الموظفين في شركات عتاقة؟', a: 'نقوم بالجدولة والتنسيق المسبق مع المطاعم لضمان تسليم وجبات الغداء طازجة تزامناً مع فترات راحة طاقم العمال والمهندسين.' },
      { q: 'هل خدمة شحن مستندات عتاقة آمنة وموثوقة؟', a: 'غاية في الأمان، حيث يتم استلام وتوقيع الأوراق بكود تسليم إلكتروني فريد لضمان حماية معلومات الشركات والصناعات.' }
    ],
    seoKeywords: 'دليفري حي عتاقة, توصيل شركات عتاقة السويس, شحن مصانع السويس, توصيل الأدبية'
  },
  'port-tawfik': {
    landmarks: ['مجرى قناة السويس الملاحي', 'فيلات بورتوفيق التراثية', 'بورتوفيق القديمة', 'نادي التجاريين', 'حديقة ممشى بورتوفيق'],
    description: 'بورتوفيق هي الوجهة الساحرة والأكثر عراقة في السويس، حيث تتميز بالطراز المعماري التراثي الفرنسي والإطلالة الساحرة مباشرة على المجرى الملاحي العالمي لقناة السويس. نوفر خدمات دليفري راقية تناسب الطابع الهادئ والسياحي لبورتوفيق، بما يضمن توصيل مستلزمات اليخوت، السفن، الفيلات، والأندية بأعلى دقة واحترافية مرورية.',
    faqs: [
      { q: 'هل نوصل مستلزمات عاجلة لليخوت الراسية ومكاتب القناة في بورتوفيق؟', a: 'نعم، نخدم مكاتب التخليص البحري وملاك اليخوت والنوادي في بورتوفيق لتوفير المأكولات والمياه والأوراق الرسمية فوراً.' },
      { q: 'هل نوفر شحن راقي ومغلف للهدايا والحلويات في بورتوفيق؟', a: 'بالتأكيد، نوظف كباتن بملابس أنيقة وحقائب فاخرة لتسليم وتفاجئ عائلاتكم بالهدايا والورود بضواحي بورتوفيق الكلاسيكية.' },
      { q: 'ما هي مواعيد عمل دليفري بورتوفيق السويس؟', a: 'الخدمة متاحة على مدار الساعة، حتى في مناطق الكورنيش والشواطئ ومناطق الأندية لخدمتكم رفقة أحبابكم.' }
    ],
    seoKeywords: 'دليفري بورتوفيق السويس, توصيل بورتوفيق, طيار بورتوفيق خاص, شحن بورتوفيق السويس'
  },
  'ganayen': {
    landmarks: ['القطاع الريفي للجناين', 'منطقة كبريت', 'قرية جنيفة بالسويس', 'منطقة الشلوفة الكبرى', 'المزارع والقرى الزراعية'],
    description: 'حي الجناين يضم القطاع الريفي والزراعي الخلاب لمحافظة السويس، ويمتد لمساحات شاسعة على طول طريق الإسماعيلية وسهل القناة. نحن فخورون بتيسير الحركة التجارية لأهالي الجناين والقرى الريفية، وتوصيل طلبات الصيدليات والخامات الزراعية، وتوصيل الخضروات والفواكه الطازجة من المزارع مباشرة إلى أسواق ومطابخ السويس بأسعار توصيل مدروسة لتقليل تكلفة النقل.',
    faqs: [
      { q: 'هل تغطون المناطق البعيدة مثل جنيفة وكبريت في حي الجناين؟', a: 'نعم، نوفر كباتن لربط قرى الجناين البعيدة (كبريت، جنيفة، الشلوفة) بمركز السويس لضمان تلبية كل احتياجاتهم الطبية والغذائية دون تفرقة.' },
      { q: 'هل نوفر دليفري للمزارعين لنقل الحبوب والخضراوات؟', a: 'نعم، نوفر وسائط نقل سريعة وحقائب كبيرة للطيارين لنقل الخضروات العضوية والفاكهة الطازجة وحمايتها من حرارة الصيف.' },
      { q: 'كم يستغرق التوصيل بين الجناين والأربعين؟', a: 'نظراً للمسافة الطويلة، يستغرق التوصيل من 30 إلى 40 دقيقة، مع الحفاظ الكامل على سلامة المنتجات ومراقبتها.' }
    ],
    seoKeywords: 'دليفري حي الجناين السويس, توصيل جنيفة السويس, كابتن كبريت السويس, دليفري القطاع الريفي بالسويس'
  },
  'new-suez': {
    landmarks: ['مدينة السويس الجديدة', 'طريق السويس القاهرة الجديد', 'المشروعات السكنية والمجتمعات الحديثة'],
    description: 'السويس الجديدة هي الامتداد العمراني الذكي والمستقبلي فائق الحداثة في المحافظة. نظراً للتوسع العمراني وبناء المجتمعات المغلقة والمفتوحة الجديدة، وفرنا أسرع خدمات دليفري لربط السكان الجدد بأسواق المدينة القديمة ومطاعمها ومستشفياتها لتوفير سبل الراحة والأمان وسرعة الإمداد بالخدمات والطلبات على مدار الساعة.',
    faqs: [
      { q: 'هل التوصيل فعال ومستمر في مدينة السويس الجديدة بالرغم من حداثتها؟', a: 'نعم، نعتبر أولى منصات التوصيل التي افتتحت خدماتها رسمياً في السويس الجديدة لضمان راحة السكان المتواجدين حديثاً.' },
      { q: 'هل يمكنني طلب طيار لشحن أغراض أو بضائع من السويس القديمة لبيتي هناك؟', a: 'بكل تأكيد، ميزة شحن الأوردرات متاحة وسيقوم الطيار بالاستلام من وسط مدينة السويس والتوصيل الآمن إلى السويس الجديدة.' },
      { q: 'ما هي طرق الدفع المتاحة لعملاء السويس الجديدة؟', a: 'يمكنك الدفع كاش أو بمحفظتك لتغذية حسابات الطيارين بسهولة ويُسر.' }
    ],
    seoKeywords: 'دليفري السويس الجديدة, توصيل السويس الجديدة, طيار السويس الجديدة, شحن السويس الجديدة'
  },
  'sabah': {
    landmarks: ['شارع الصباح الرئيسي', 'مساكن حي الصباح', 'مستشفى الصباح التخصصي', 'سنترال الصباح الكبير'],
    description: 'منطقة الصباح هي واحدة من أكثر القطاعات حيوية وتنظيماً في السويس، لما تضمه من خدمات حكومية وسكانية وطبية متميزة تشمل مستشفى الصباح والسنترال. كباتننا متمركزون بانتظام في محيط الصباح لتوصيل الأطعمة السريعة والأدوية للأطباء والمرضى، وتوصيل المقتنيات والشحنات، مما يوفر وقتاً هائلاً للعملاء.',
    faqs: [
      { q: 'هل نوصل طلبات وأكل لمستشفى الصباح التخصصي؟', a: 'نعم، نخدم الكادر الطبي وأسر المرضى لتوصيل الوجبات الفندقية والمشروبات والأغراض الخاصة بدقة وهدوء تام.' },
      { q: 'كم تبلغ سرعة التوصيل في شارع الصباح الرئيسي؟', a: 'الصباح هي نقطة حمراء مغطاة بكثافة، حيث يستغرق التوصيل الداخلي بالصباح حوالي 10 دقائق فقط.' },
      { q: 'هل نوفر شحن أوردرات لأصحاب المشروعات في مساكن الصباح؟', a: 'نعم، نخدم مئات صانعي الحلويات والملابس في الصباح لتوزيع بضائعهم بشكل احترافي للزبائن.' }
    ],
    seoKeywords: 'دليفري الصباح السويس, توصيل منطقة الصباح السويس, طيار مساكن الصباح, صيدلية الصباح دليفري'
  },
  'gharib': {
    landmarks: ['شارع حي الغريب التاريخي', 'كورنيش السويس القديم', 'قصر الثقافة بالسويس', 'النادي الاجتماعي بسواري السويس', 'محلات أسماك الغريب العريقة'],
    description: 'حي الغريب هو عراقة ونبض ذكريات محافظة السويس. بجماله التاريخي وقربه من كورنيش السويس القديم ومحلات الأسماك والسي فود والفسفور العتيقة. نضمن لك عبر هذه الصفحة أفضل خدمات دليفري وتوصيل الأكل البحري الساخن والشوربات من مطاعم حي الغريب لصلة عائلاتكم بلذة البحر السويسي العذب طازجاً وسريعاً.',
    faqs: [
      { q: 'هل نوفر أسرع توصيل لعلب السي فود من أسماك الغريب العتيقة؟', a: 'نعم، تخصصنا هو نقل السي فود والشوربات الحرارية بأكياس مانعة للتسريب لتظل ساخنة ولذيذة حتى وصولها لبيتك.' },
      { q: 'هل نوصل للكورنيش القديم ومنتزهات حي الغريب؟', a: 'بالتأكيد، يمكنك الطلب وتحديد مكان مظلتك على الكورنيش وسيبحث عنك الكابتن ويسلمك رغباتك فوراً بكل ترحيب.' },
      { q: 'ما هو مدى أمان طياريكم في المناطق العائلية بالغريب؟', a: 'جميع الكباتن يخضعون للتحقق التام والتقييم العالي، مما يجعلهم الخيار الأمين لبيوت عائلات حي الغريب الكرام.' }
    ],
    seoKeywords: 'دليفري حي الغريب السويس, توصيل كورنيش السويس, طيار أسماك الغريب, مطاعم حي الغريب دليفري'
  }
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const area = AREAS.find(a => a.slug === resolvedParams.slug);
  if (!area) return {};
  
  const seoInfo = NEIGHBORHOODS_SEO[resolvedParams.slug];
  const customKeywords = seoInfo ? seoInfo.seoKeywords : `دليفري ${area.name}, توصيل ${area.name}, طيارين ${area.name}, أسرع دليفري السويس, طلبات ${area.name}`;
  const customDesc = seoInfo ? seoInfo.description.substring(0, 160) : `اطلب دليفري في منطقة ${area.name} بالسويس الآن. أسرع توصيل للمطاعم، الصيدليات، والسوبر ماركت في ${area.name} بمدينة السويس. طيارين جاهزين للتوصيل الفوري.`;

  return {
    title: `توصيل دليفري في ${area.arabicName} السويس | أسرع خدمة 24 ساعة`,
    description: customDesc,
    keywords: customKeywords,
  };
}

export default async function AreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const area = AREAS.find(a => a.slug === slug);

  if (!area) {
    notFound();
  }

  // Get localized neighborhood SEO profile or generate fallback dynamically
  const isCustomized = !!NEIGHBORHOODS_SEO[slug];
  const neighborhoodData = NEIGHBORHOODS_SEO[slug] || {
    landmarks: [`وسط ${area.arabicName}`, `المحاور الرئيسية لـ ${area.arabicName}`, `الأسواق المحلية لـ ${area.arabicName}`],
    description: `تعتبر منطقة ${area.arabicName} بمدينة السويس واحدة من أهم مناطق التغطية اللوجستية التي نخدمها في تطبيق "دليفري السويس أونلاين". وبفضل تنوع الأنشطة التجارية والتجاور المعماري، قمنا بتنظيم فريق كباتن متكامل متواجد بكثافة على مدار 24 ساعة لتأمين وتوصيل أوردرات الصيدليات، السوبر ماركت، المشاوير والأكل في أسرع وقت.`,
    faqs: [
      { q: `هل التوصيل متاح في ${area.arabicName} طوال الـ 24 ساعة؟`, a: `نعم، خدمتنا وفريق الكباتن يعملان طوال الـ 24 ساعة، طيلة أيام الأسبوع لخدمة جميع سكان منطقة ${area.arabicName} بالسويس.` },
      { q: `كم يستغرق وقت الدليفري في ${area.arabicName}؟`, a: `في المتوسط يستغرق التوصيل اللوجستي من 15 إلى 30 دقيقة بحسب موقع الاستلام ومقر المطعم أو الصيدلية المراد الطلب منها.` },
      { q: `كيف يمكنني حجز طيار لإرسال مستندات داخل ${area.arabicName}؟`, a: `يمكنك الطلب مباشرة عبر تطبيق المنصة واختيار ميزة "طيار خاص" وتوضيح مواصفات وموقع الاستلام وسنربطك فوراً بأقرب كابتن متاح.` }
    ],
    seoKeywords: `دليفري ${area.arabicName}, توصيل ${area.arabicName}, طيارين ${area.arabicName}`
  };

  const areaSchemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "serviceType": "Delivery Service",
        "provider": {
          "@type": "LocalBusiness",
          "name": `دليفري السويس أونلاين - ${area.arabicName}`,
          "image": `https://delivery-suez.online/images/areas/${area.slug}.jpg`,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "السويس",
            "addressRegion": "السويس",
            "addressCountry": "EG"
          },
          "telephone": "+201022679250"
        },
        "areaServed": {
          "@type": "Place",
          "name": area.arabicName,
          "containedInPlace": {
            "@type": "City",
            "name": "السويس"
          }
        },
        "description": neighborhoodData.description
      },
      {
        "@type": "FAQPage",
        "mainEntity": neighborhoodData.faqs.map(f => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": f.a
          }
        }))
      }
    ]
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(areaSchemaData) }}
      />
      <Navbar />
      
      <main className="pt-32 pb-20 text-right" dir="rtl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Hero Card */}
          <div className="bg-slate-950 rounded-[3rem] p-8 md:p-16 text-white relative overflow-hidden mb-12 shadow-xl">
            <div className="relative z-10 max-w-2xl">
              <nav className="flex gap-2 text-white/50 text-sm font-bold mb-8 uppercase tracking-widest flex-row-reverse justify-end">
                <Link href="/">الرئيسية</Link>
                <span>/</span>
                <span className="text-brand">{area.arabicName}</span>
              </nav>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand/20 text-brand rounded-full text-xs font-bold mb-4">
                <span>تغطية فورية ومكثفة 🚀</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-display font-black mb-6 italic leading-tight">
                توصيل دليفري في <br />
                <span className="text-brand">{area.arabicName} (Suez)</span>
              </h1>
              <p className="text-white/60 text-lg mb-10 leading-relaxed font-medium">
                {isCustomized ? `دليل التغطية والحي لـ ${area.arabicName} بالسويس.` : `تغطية لوجستية متطورة في حي ${area.arabicName} بمدينة السويس.`} {neighborhoodData.description.substring(0, 150)}...
              </p>
              <div className="flex flex-col sm:flex-row gap-4 flex-row-reverse justify-end">
                <Link href="/webview" className="px-8 py-4 bg-brand text-white rounded-2xl font-bold text-center hover:scale-105 transition-all shadow-lg shadow-brand/20">
                  اطلب الآن في {area.arabicName}
                </Link>
                <Link href="https://wa.me/201022679250" className="px-8 py-4 bg-white/10 text-white rounded-2xl font-bold text-center flex items-center justify-center gap-2 backdrop-blur-md hover:bg-white/20 transition-all border border-white/5">
                  دعم {area.arabicName} واتساب
                </Link>
              </div>
            </div>
            
            <div className="absolute -top-20 -left-20 w-80 h-80 bg-brand/20 rounded-full blur-[100px]" />
            <SafeImage 
              src={`/images/areas/${area.slug}.jpg`} 
              fallbackSrc={['port-tawfik', 'attaka', 'gharib'].includes(area.slug) ? '/images/suez_port_captain.png' : ['ganayen', 'new-suez'].includes(area.slug) ? '/images/suez_courier.png' : '/images/suez_hero_delivery.png'}
              alt={area.arabicName} 
              fill
              referrerPolicy="no-referrer"
              className="object-cover opacity-15 hidden md:block"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Main Content Areas */}
            <div className="lg:col-span-2 space-y-16">
              
              {/* Features benefits block */}
              <section>
                <h2 className="text-3xl font-display font-black mb-8 text-slate-900 border-r-4 border-brand pr-4">لماذا تختار خدمة التوصيل في {area.arabicName}؟</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { title: 'أسرع وقت وصول', desc: `كباتننا يتواجدون دائمًا في كل زاوية وشارع داخل منطقة ${area.arabicName} لتأمين وتوصيل الأوردرات.`, icon: Clock },
                    { title: 'بروتوكولات الأمان التام', desc: 'تفتيش كامل وسجلات عمل موثقة لكباتن السويس لضمان أمان خصوصياتكم.', icon: ShieldCheck },
                    { title: 'تغطية متكاملة 24 ساعة', desc: 'دليفري صيدليات ليلية، وسوبر ماركت في أوقات الصباح والمساء طوال اليوم.', icon: MapPin },
                    { title: 'دعم لوجستي فعال', desc: 'تواصل فوري لحل أي مشكلة مرورية أو عنوان صعب في ثوانٍ مع الدعم.', icon: MessageSquare }
                  ].map((feat, i) => (
                    <div key={i} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex gap-4 flex-row-reverse text-right">
                      <div className="shrink-0 w-12 h-12 bg-white text-brand rounded-2xl flex items-center justify-center shadow-sm">
                        <feat.icon size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2 text-slate-900">{feat.title}</h3>
                        <p className="text-slate-500 text-sm leading-relaxed">{feat.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Landmark Highlights & Navigation section */}
              <section className="bg-slate-50 rounded-[3rem] p-10 border border-slate-100">
                <h2 className="text-3xl font-display font-black mb-6 text-slate-900 border-r-4 border-brand pr-4">أهم الشوارع والمعالم المغطاة في {area.arabicName}</h2>
                <p className="text-slate-600 mb-6 leading-relaxed font-semibold">
                  تحتوي منطقة {area.arabicName} بالسويس على نقاط حيوية نصل إليها في غضون دقائق معدودة:
                </p>
                <div className="flex flex-wrap gap-3 flex-row-reverse">
                  {neighborhoodData.landmarks.map((landmark, i) => (
                    <div key={i} className="px-5 py-3 bg-white rounded-2xl border border-slate-200 text-slate-800 text-sm font-bold flex items-center gap-2 shadow-sm">
                      <span className="w-2.5 h-2.5 rounded-full bg-brand" />
                      <span>{landmark}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Comprehensive SEO Long Text */}
              <section className="prose prose-slate max-w-none text-slate-600 leading-relaxed bg-white p-8 border border-slate-100 rounded-3xl">
                <h2 className="text-3xl font-display font-black mb-6 text-slate-900">تقييم وتحليل التوصيل اللوجستي: {area.arabicName}</h2>
                <div className="space-y-4 font-medium text-slate-600">
                  <p>
                    تعتبر <strong>{area.arabicName}</strong> إحدى الركائز السكنية والخدمية الخلابة في محافظة السويس. وبفضل موقعها الحيوي وكثافة المتاجر فيها، أصبح توفير حلول الدليفري فري لانس والشحن السريع من الضروريات الملحة لجميع السكان وأصحاب النشاطات التجارية.
                  </p>
                  <p>
                    من خلال موقع &quot;ديليفري السويس أونلاين&quot;، جعلنا من السهل تلبية أي احتياج للتسوق أو توصيل الأغراض. لم نعد نقتصر على المطاعم فقط، بل نخدم مكاتب المحاماة، العيادات، والأسر لنقل كافة الاحتياجات برعاية وحفظ تام.
                  </p>
                  <p>
                    {neighborhoodData.description}
                  </p>
                </div>
              </section>

              {/* Neighborhood Map block */}
              <section className="bg-slate-50 rounded-[3rem] p-10 border border-slate-100 mt-16">
                <h2 className="text-3xl font-display font-black mb-8 border-r-4 border-brand pr-4">خريطة ونطاق تغطية {area.arabicName} بالسويس</h2>
                <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-200 relative mb-6 border border-slate-200">
                  <SafeImage 
                    src={`/images/areas/map-${area.slug}.jpg`} 
                    fallbackSrc="/images/suez_hero_delivery.png"
                    alt={`خريطة حدود وتغطية منطقة ${area.arabicName} في السويس`}
                    fill
                    referrerPolicy="no-referrer"
                    className="object-cover opacity-90"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/15">
                    <div className="bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3">
                      <div className="w-10 h-10 bg-brand text-white rounded-xl flex items-center justify-center">
                        <MapPin size={20} />
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-slate-900 text-sm">{area.arabicName}</p>
                        <p className="text-slate-400 text-xs font-bold font-mono">Suez Map Sector</p>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-slate-500 text-xs text-center font-bold leading-relaxed flex items-center justify-center gap-2">
                  <Map size={16} className="text-brand" />
                  يتم توجيه الكباتن فري لانس بالـ GPS وربطكم بأقرب طيار متوفر لتقليل زمن الانتظار.
                </p>
              </section>

              {/* FAQ Section */}
              <section>
                <h2 className="text-3xl font-display font-black mb-8 border-r-4 border-brand pr-4">أهم الأسئلة الشائعة حول دليفري {area.arabicName}</h2>
                <div className="space-y-4">
                  {neighborhoodData.faqs.map((faq, i) => (
                    <div key={i} className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all text-right">
                      <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-1.5 flex-row-reverse justify-end">
                        <span className="w-2 rounded-full bg-brand h-2 shrink-0" />
                        <span>{faq.q}</span>
                      </h4>
                      <p className="text-slate-500 text-sm leading-relaxed pr-4 font-semibold">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar CTA & Neighbor links */}
            <div className="space-y-8">
              <div className="bg-brand text-white p-8 rounded-[2.5rem] shadow-xl shadow-brand/20 relative overflow-hidden text-right">
                <h3 className="text-2xl font-display font-black mb-4">اطلب الكابتن فوراً!</h3>
                <p className="text-white/80 mb-8 font-semibold text-sm leading-relaxed">
                  احجز خدمة الدليفري الأكثر سرعة وموثوقية في حي {area.arabicName} اليوم ووفر وقتك ومجهودك بالكامل.
                </p>
                <Link href="/webview" className="w-full py-4 bg-white text-brand rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-105 transition-all text-sm">
                  التطبيق المباشر لتتبع الكابتن
                  <ChevronLeft size={20} />
                </Link>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
              </div>

              {/* Sibling Areas List */}
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm text-right">
                <h3 className="text-xl font-bold mb-6 text-slate-900">أحياء السويس الأخرى</h3>
                <div className="flex flex-wrap gap-2 flex-row-reverse justify-start">
                  {AREAS.filter(a => a.slug !== slug).map((a, i) => (
                    <Link key={i} href={`/area/${a.slug}`} className="px-4 py-2 bg-slate-50 hover:bg-brand hover:text-white rounded-full text-xs font-bold transition-all border border-slate-100">
                      {a.arabicName}
                    </Link>
                  ))}
                </div>
              </div>
              
              {/* Driver Join Card */}
              <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] text-center">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-brand">
                  <Truck size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4">هل تمتلك موتوسيكل أو سكوتر في {area.arabicName}؟</h3>
                <p className="text-slate-400 text-sm mb-8 leading-relaxed font-semibold">
                  انضم كطيار حر الآن واستلم أوردرات في منطقتك، محولًا وقت فراغك لعائد مادي ممتاز في السويس كاش بالجنيه المصري!
                </p>
                <Link href="/webview" className="inline-block px-8 py-4 bg-brand text-white rounded-2xl font-bold text-sm hover:scale-105 transition-all hover:shadow-lg shadow-brand/20">
                  سجل كطيار متميز عاجلاً
                </Link>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
