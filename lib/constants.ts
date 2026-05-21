export interface Area {
  slug: string;
  name: string;
  arabicName: string;
  desc: string;
}

export interface Service {
  id: string;
  slug: string;
  name: string;
  title: string;
  arabicTitle: string;
  desc: string;
  arabicDesc: string;
  icon: string;
}

export const AREAS: Area[] = [
  { slug: 'salam-1', name: 'Salam 1', arabicName: 'السلام 1', desc: 'محيط الجامعة وشارع السبع عماير وشارع الشهد' },
  { slug: 'salam-2', name: 'Salam 2', arabicName: 'السلام الثاني', desc: 'مساكن السلام وميدان الجامعة ومحيط السلخانة القديمة' },
  { slug: 'arbayeen', name: 'Al-Arbayeen', arabicName: 'حي الأربعين', desc: 'نبض السويس التجاري، ميدان الأربعين وسوق الأنصاري وبن حارث' },
  { slug: 'faisal', name: 'Faisal', arabicName: 'حي فيصل', desc: 'شارع الخمسين، مساكن الحرفيين، ومحيط جامع حمزة' },
  { slug: 'attaka', name: 'Attaka', arabicName: 'حي عتاقة', desc: 'المنطقة الصناعية، والأدبية، والأبراج السكنية الجديدة' },
  { slug: 'port-tawfik', name: 'Port Tawfik', arabicName: 'بورتوفيق', desc: 'ممشى القناة العريق، الفيلات الكلاسيكية ومحيط الميناء والقرية السياحية' },
  { slug: 'ganayen', name: 'Al-Ganayen', arabicName: 'حي الجناين', desc: 'القطاع الريفي والمناطق الزراعية، جنيفة والشلوفة وكبريت' },
  { slug: 'new-suez', name: 'New Suez City', arabicName: 'مدينة السويس الجديدة', desc: 'الامتداد العمراني الحديث والمستقبل الواعد خلف عتاقة' },
  { slug: 'sabah', name: 'Al-Sabah', arabicName: 'حي الصباح', desc: 'شارع الصباح الرئيسي وسنترال الصباح ومستشفى الصباح التخصصي' },
  { slug: 'gharib', name: 'Al-Gharib', arabicName: 'حي الغريب', desc: 'كورنيش السويس القديم ومحلات الأسماك والفسفور التاريخية' }
];

export const SERVICES: Service[] = [
  { 
    id: 'food', 
    slug: 'restaurants',
    name: 'توصيل المطاعم والوجبات',
    title: 'Food Delivery', 
    arabicTitle: 'توصيل الطعام والوجبات', 
    desc: 'Get your hot meals delivered in insulated bags under 20 mins.', 
    arabicDesc: 'توصيل وجبات ساخنة وطازجة من جميع مطاعم السويس في حقائب حرارية معزولة.',
    icon: 'Apple' 
  },
  { 
    id: 'medicine', 
    slug: 'pharmacies',
    name: 'توصيل الصيدليات والأدوية',
    title: 'Pharmacy & Medicine', 
    arabicTitle: 'ديليفري صيدليات عاجل', 
    desc: 'Secure medicine and prescription delivery 24/7.', 
    arabicDesc: 'طلب وتجهيز الأدوية والروشتات الطبية من كبرى صيدليات السويس وتوصيلها بأمان.',
    icon: 'HeartPulse' 
  },
  { 
    id: 'grocery', 
    slug: 'supermarket',
    name: 'السوبرماركت والبقالة',
    title: 'Supermarket & Groceries', 
    arabicTitle: 'مقاضي وسوبر ماركت', 
    desc: 'Weekly fresh vegetables and home goods matching list.', 
    arabicDesc: 'جلب طلبات السوبر ماركت، الخضار والفاكهة الطازجة واللحوم وتوصيلها فوراً لبيتك.',
    icon: 'ShoppingCart' 
  },
  { 
    id: 'courier', 
    slug: 'errands',
    name: 'قضاء المشاوير والخدمات الخاصة',
    title: 'Personal Captain (Free lance)', 
    arabicTitle: 'طيار حر ومقاضي خاصة', 
    desc: 'Hire a dedicated rider by the hour or trip for any personal errands.', 
    arabicDesc: 'حجز كابتن مخصص لقضاء مشاويرك الخاصة، نقل ملفات وعقود، أو فواتير بالساعة.',
    icon: 'Truck' 
  }
];

export interface NewsItem {
  id: string;
  title: string;
  category: string;
  date: string;
}

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: '1',
    title: 'توسيع التغطية الشاملة لتشمل حي فيصل وحي الأربعين بمحافظة السويس',
    category: 'إعلان مهم',
    date: '٢٠٢٦/٠٥/١٥'
  },
  {
    id: '2',
    title: 'إطلاق خدمة الديليفري الليلي العاجل للصيدليات والأدوية في السويس ٢٤ ساعة',
    category: 'ميزات جديدة',
    date: '٢٠٢٦/٠٥/١٨'
  },
  {
    id: '3',
    title: 'تخفيض عمولة كباتن السويس لتشجيع تشغيل الشباب وتوفير مشاوير بأسعار عادلة',
    category: 'عروض الكباتن',
    date: '٢٠٢٦/٠٥/٢٠'
  }
];

export interface Keyword {
  slug: string;
  name: string;
}

export const KEYWORDS: Keyword[] = [
  { slug: 'suez-delivery', name: 'خدمة دليفري في حارات وأحياء السويس' },
  { slug: 'salam-restaurants', name: 'توصيل مطاعم ووجبات حي السلام السويس' },
  { slug: 'faisal-pharmacies', name: 'أسرع دليفري صيدليات وأدوية في حي فيصل' },
  { slug: 'arbayeen-courier', name: 'شحن وأوردرات محلات الأربعين والأنصاري والسويس' },
  { slug: 'port-tawfik-delivery', name: 'خدمات التوصيل السريع في بورتوفيق وممشى كورنيش السويس' }
];

