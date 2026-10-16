import fs from 'fs';
import path from 'path';

export interface PricePackageItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  price: string;
  unit: string;
  currency?: string;
  badge?: string;
  popular: boolean;
  order: number;
  status: 'active' | 'hidden';
  features: string[];
  warrantyMonths?: number;
  updatedAt?: string;
}

export const defaultPricePackages: PricePackageItem[] = [
  {
    id: 'pkg-cockroaches',
    slug: 'cockroaches',
    title: 'مكافحة الصراصير بالمطبخ',
    subtitle: 'جل أدفايون الأمريكي وجل بوسيدون الكوري',
    price: '20',
    unit: 'دينار كويتي (يبدأ من)',
    currency: 'KWD',
    badge: 'الأكثر طلباً',
    popular: true,
    order: 1,
    status: 'active',
    warrantyMonths: 6,
    features: [
      'استخدام جل أدفايون وبوسيدون بدون إفراغ الخزائن',
      'معالجة فتحات الصرف وغرف التفتيش',
      'آمن 100% على الأطفال والحيوانات الأليفة',
      'بدون رائحة وبدون مغادرة المنزل',
      'كفالة خطية 6 شهور (إعادة رش مجاني)',
    ],
    updatedAt: '2026-10-16',
  },
  {
    id: 'pkg-bedbugs',
    slug: 'bedbugs',
    title: 'مكافحة بق الفراش الشاملة',
    subtitle: 'بروتوكول مزدوج: بخار حراري ومبيدات دقيقة',
    price: '35',
    unit: 'دينار كويتي (للغرفة)',
    currency: 'KWD',
    badge: 'إبادة تامة للبيوض',
    popular: false,
    order: 2,
    status: 'active',
    warrantyMonths: 6,
    features: [
      'معالجة مزدوجة بالبخار 180 درجة مئوية',
      'إبادة فورية للبق واليرقات والبيوض الدقيقة',
      'لا داعي لرمي المراتب أو تبديل الأثاث',
      'مبيدات صحة عامة (تمبرد إس سي) معتمدة',
      'كفالة 6 شهور ومتابعة مجانية بعد 14 يوم',
    ],
    updatedAt: '2026-10-16',
  },
  {
    id: 'pkg-rodents',
    slug: 'rodents',
    title: 'مكافحة القوارض والبيرعصي',
    subtitle: 'محطات طعوم آمنة وسد منافذ التسلل',
    price: '25',
    unit: 'دينار كويتي (يبدأ من)',
    currency: 'KWD',
    badge: 'بدون روائح كريهة',
    popular: false,
    order: 3,
    status: 'active',
    warrantyMonths: 6,
    features: [
      'طعوم تسبب جفاف القوارض وخروجها للهواء',
      'محطات طعوم مغلقة آمنة (Tamper-Resistant)',
      'مكافحة البيرعصي (الوزغ)، العقارب، والแมง',
      'إغلاق الفجوات الهندسية والمناور',
      'كفالة 6 شهور على الفاعلية',
    ],
    updatedAt: '2026-10-16',
  },
  {
    id: 'pkg-termites',
    slug: 'termites',
    title: 'مكافحة النمل الأبيض (الأرضة)',
    subtitle: 'حقن هندسي للأبواب ورش الدفان',
    price: '50',
    unit: 'دينار كويتي (يبدأ من)',
    currency: 'KWD',
    badge: 'حماية الأثاث والأبواب',
    popular: false,
    order: 4,
    status: 'active',
    warrantyMonths: 120,
    features: [
      'حقن دقيق بدون تكسير للسيراميك والباركيه',
      'مبيدات بايفليكس مرخصة تنهي المستعمرة',
      'حماية الأبواب والمكتبات وقواطع المنازل',
      'معالجة قسائم البناء قبل صب الخرسانة',
      'كفالة تصل لـ 10 سنوات (حسب المعالجة)',
    ],
    updatedAt: '2026-10-16',
  },
];

export function getLoadedPrices(includeHidden = false): PricePackageItem[] {
  try {
    const cands = [
      path.join(process.cwd(), 'data', 'prices.json'),
      path.join(process.cwd(), 'artifacts', 'demo-clean', 'data', 'prices.json'),
    ];
    for (const filePath of cands) {
      if (typeof window === 'undefined' && fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf-8');
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const sorted = [...parsed].sort((a, b) => (a.order || 0) - (b.order || 0));
          return includeHidden ? sorted : sorted.filter((p) => p.status !== 'hidden');
        }
      }
    }
  } catch {
    // Ignore and fallback
  }

  const sortedDefault = [...defaultPricePackages].sort((a, b) => (a.order || 0) - (b.order || 0));
  return includeHidden ? sortedDefault : sortedDefault.filter((p) => p.status !== 'hidden');
}
