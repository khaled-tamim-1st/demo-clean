import type { Metadata } from 'next';
import Link from 'next/link';
import {
  CheckCircle2,
  PhoneCall,
  MessageCircle,
  ShieldCheck,
  ArrowLeft,
  Clock,
  Sparkles,
  Building,
  HelpCircle,
  Calculator,
} from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import { COMPANY_INFO } from '@/data/company';
import { getLoadedPrices } from '@/data/prices';

export const metadata: Metadata = {
  title: 'اسعار مكافحة الحشرات في الكويت 2026',
  description: 'قائمة اسعار مكافحة الحشرات في الكويت من ديمو كلين تبدأ من 20 د.ك، رش صراصير وبق الفراش مع كفالة 6 شهور خطية ومبيدات معتمدة. اتصل 67088755.',
  keywords: [
    'اسعار مكافحة الحشرات في الكويت',
    'كم سعر رش الصراصير',
    'تكلفة مكافحة بق الفراش',
    'أسعار شركات مكافحة الحشرات الكويت',
    'سعر رش البيت من الحشرات',
    'اسعار رش النمل الابيض الكويت',
  ],
  alternates: {
    canonical: 'https://democleankw.com/pest-control-prices',
  },
  openGraph: {
    title: 'اسعار مكافحة الحشرات في الكويت 2026 | ديمو كلين',
    description: 'قائمة اسعار مكافحة الحشرات في الكويت من ديمو كلين تبدأ من 20 د.ك، رش صراصير وبق الفراش مع كفالة 6 شهور خطية ومبيدات معتمدة.',
    url: 'https://democleankw.com/pest-control-prices',
    type: 'website',
    images: ['/og-image.jpg'],
  },
};

const pricingFaqs = [
  {
    q: 'ما هي العوامل التي تحدد التكلفة النهائية لمكافحة الحشرات؟',
    a: 'يتم تحديد السعر بناءً على 3 عوامل رئيسية: 1. مساحة العقار (شقة صغيرة، دور كامل، أو فيلا). 2. شدة الإصابة ونوع الآفة (مكافحة البق تتطلب بروتوكولاً يختلف عن الصراصير). 3. نوع المعالجة (جلسة واحدة مع وقاية، أو جلسات متعددة للإصابات المتفاقمة). السعر يكون واضحاً لك تماماً قبل بدء العمل.',
  },
  {
    q: 'هل هناك أي رسوم خفية أو تكاليف إضافية للمعاينة؟',
    a: 'نلتزم بشفافية تامة؛ لا توجد رسوم مخفية. السعر المتفق عليه يشمل المبيدات (الجل والمواد السائلة)، أجور العمالة، وأي زيارات طارئة خلال فترة الكفالة. معاينة الفلل والمطاعم تتم مجاناً.',
  },
  {
    q: 'هل يترتب عليّ دفع رسوم إضافية إذا ظهرت الحشرات خلال فترة الكفالة؟',
    a: 'إطلاقاً. كفالة الـ 6 شهور التي نقدمها في ديمو كلين تعني أننا مسؤولون تماماً عن إعادة الرش أو معالجة أي ظهور متجدد للحشرات المعالجة، مجاناً وبدون أي تكلفة إضافية عليك.',
  },
  {
    q: 'كم سعر رش الصراصير في شقة سكنية مقارنة بفيلا كاملة؟',
    a: 'يبدأ سعر رش الصراصير في المطابخ الصغيرة من 20 د.ك. إذا كانت الشقة كاملة (غرف ومطبخ وحمامات) قد يتراوح بين 25-30 د.ك، بينما الفلل الكاملة تبدأ من 45 د.ك حسب عدد الأدوار. تواصل معنا للحصول على تسعير فوري ومطابق لمساحتك.',
  },
];

export default function PricingPage() {
  const pricePackages = getLoadedPrices(false);
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'قائمة اسعار مكافحة الحشرات في الكويت - ديمو كلين',
    description: 'تكلفة مكافحة الحشرات والقوارض في الكويت تبدأ من 20 د.ك لجل الصراصير و35 د.ك للبق مع كفالة 6 شهور.',
    provider: {
      '@type': 'LocalBusiness',
      '@id': 'https://democleankw.com/#organization',
      name: COMPANY_INFO.name,
      image: 'https://democleankw.com/demo-clean-identity.webp',
      telephone: COMPANY_INFO.phoneIntl,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'مدينة الكويت، شارع الشهداء، برج التجارية',
        addressLocality: 'مدينة الكويت',
        addressRegion: 'العاصمة',
        addressCountry: 'KW',
      },
    },
    offers: pricePackages.map(pkg => ({
      '@type': 'Offer',
      name: pkg.title,
      description: pkg.subtitle,
      price: pkg.price,
      priceCurrency: 'KWD',
      availability: 'https://schema.org/InStock',
    })),
  };

  return (
    <>
      <JsonLd data={schemaData} />
      <Breadcrumbs items={[{ label: 'قائمة الأسعار والكفالة' }]} />

      <section className="page-header" dir="rtl">
        <div className="container">
          <div className="page-header-content">
            <span className="eyebrow" style={{ color: '#bee58f' }}>
              شفافية مطلقة • ترخيص وزارة الصحة (14620/2025)
            </span>
            <h1>اسعار مكافحة الحشرات في الكويت 2026</h1>
            <p>
              نؤمن بحق العميل في معرفة التكلفة بوضوح. نقدم خدمات مكافحة احترافية بمبيدات ألمانية وأمريكية آمنة، بأسعار عادلة تشمل كفالة رسمية لمدة 6 شهور. لا مفاجآت، لا رسوم خفية.
            </p>
            <div className="page-header-meta">
              <span>✓ أسعار تبدأ من 20 د.ك</span>
              <span>✓ كفالة 6 شهور خطية لجميع الأعمال</span>
              <span>✓ مبيدات معتمدة آمنة للرضع والحيوانات</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: '#f6f5ef' }} dir="rtl">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 40px' }}>
            <span className="eyebrow">الباقات السكنية</span>
            <h2 style={{ fontSize: '26px', fontWeight: 900, color: '#1b3f5a', margin: '8px 0 12px' }}>
              تكلفة رش الحشرات المعتمدة
            </h2>
            <p style={{ color: '#687770', fontSize: '14.5px', lineHeight: 1.8 }}>
              تتضمن الأسعار المواد المرخصة، المعدات المتطورة، وكفالة المتابعة المجانية طوال فترة الضمان.
            </p>
          </div>

          {/* Pricing Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '22px' }}>
            {pricePackages.map((pkg, idx) => (
              <div
                key={idx}
                style={{
                  background: '#fff',
                  border: pkg.popular ? '2px solid #296142' : '1px solid #dce2d6',
                  borderRadius: '14px',
                  padding: '28px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  boxShadow: pkg.popular ? '0 10px 30px rgba(32, 71, 51, 0.12)' : '0 4px 14px rgba(0,0,0,0.03)',
                }}
              >
                {pkg.popular && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '-12px',
                      left: '20px',
                      background: '#296142',
                      color: '#bee58f',
                      fontSize: '11px',
                      fontWeight: 800,
                      padding: '4px 12px',
                      borderRadius: '12px',
                    }}
                  >
                    {pkg.badge}
                  </span>
                )}

                <div style={{ marginBottom: '16px' }}>
                  <span style={{ fontSize: '12px', color: '#559a35', fontWeight: 700 }}>{pkg.badge}</span>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#1b3f5a', margin: '6px 0 4px' }}>
                    {pkg.title}
                  </h3>
                  <p style={{ fontSize: '12.5px', color: '#6f7e77', margin: 0 }}>{pkg.subtitle}</p>
                </div>

                <div style={{ background: '#f8faf6', padding: '16px', borderRadius: '10px', marginBottom: '20px', border: '1px solid #e5ece0' }}>
                  <span style={{ fontSize: '12px', color: '#687770', display: 'block' }}>السعر التقريبي:</span>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                    <span style={{ fontSize: '38px', fontWeight: 900, color: '#1b3f5a', lineHeight: 1 }}>{pkg.price}</span>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: '#45564e' }}>{pkg.unit}</span>
                  </div>
                </div>

                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
                  {pkg.features.map((feat, fIdx) => (
                    <li key={fIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', color: '#4a5b52', lineHeight: 1.6 }}>
                      <CheckCircle2 size={16} color="#296142" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <a
                    href={`https://wa.me/965${COMPANY_INFO.phone}?text=${encodeURIComponent(`مرحباً ديمو كلين، أود حجز خدمة: ${pkg.title} (بسعر يبدأ من ${pkg.price} د.ك).`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      padding: '11px',
                      background: '#25D366',
                      color: '#fff',
                      borderRadius: '8px',
                      fontSize: '13px',
                      fontWeight: 700,
                      textDecoration: 'none',
                    }}
                  >
                    <MessageCircle size={15} />
                    <span>حجز واتساب</span>
                  </a>

                  <a
                    href={COMPANY_INFO.phoneTel}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '11px 14px',
                      background: '#296142',
                      color: '#fff',
                      borderRadius: '8px',
                      textDecoration: 'none',
                    }}
                    title="اتصال مباشر"
                  >
                    <PhoneCall size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Factors Guide */}
          <div style={{ marginTop: '50px', background: '#fff', padding: '32px', borderRadius: '16px', border: '1px solid #dce2d6' }}>
             <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#1b3f5a', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
               <Calculator size={24} color="#296142" />
               كيف يتم حساب تكلفة مكافحة الحشرات النهائية؟
             </h3>
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                <div>
                  <strong style={{ color: '#296142', fontSize: '15px' }}>1. مساحة العقار</strong>
                  <p style={{ color: '#55655d', fontSize: '13.5px', marginTop: '6px' }}>تكلفة معالجة شقة من غرفتين تختلف عن معالجة فيلا من 3 طوابق أو قسيمة قيد الإنشاء. نغطي جميع مساحات الكويت.</p>
                </div>
                <div>
                  <strong style={{ color: '#296142', fontSize: '15px' }}>2. نوع وشدة الإصابة</strong>
                  <p style={{ color: '#55655d', fontSize: '13.5px', marginTop: '6px' }}>الإصابات المتقدمة (مثل تفشي بق الفراش بكثافة) تتطلب بروتوكولات معقدة كالبخار الحراري وجلسات متباعدة.</p>
                </div>
                <div>
                  <strong style={{ color: '#296142', fontSize: '15px' }}>3. طبيعة المبيدات المطلوبة</strong>
                  <p style={{ color: '#55655d', fontSize: '13.5px', marginTop: '6px' }}>استخدام جل أدفايون للصراصير أو حقن النمل الأبيض يحدد التكلفة بناءً على كميات المواد الألمانية/الأمريكية المستخدمة.</p>
                </div>
             </div>
          </div>

          {/* Transparent Trust Banner */}
          <div
            style={{
              background: '#296142',
              borderRadius: '16px',
              padding: '36px',
              color: '#fff',
              marginTop: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '24px',
            }}
          >
            <div style={{ maxWidth: '600px' }}>
              <span style={{ color: '#bee58f', fontSize: '13px', fontWeight: 800 }}>ضمان حق العميل - س.ت: 532627</span>
              <h3 style={{ fontSize: '22px', fontWeight: 900, margin: '8px 0 10px' }}>
                كفالة 6 شهور خطية لجميع الأعمال المنفذة
              </h3>
              <p style={{ color: '#dce8dc', fontSize: '14px', lineHeight: 1.8, margin: 0 }}>
                نلتزم بإعطائك شهادة كفالة رسمية من تاريخ المكافحة تشمل المتابعة وإعادة الرش المجاني الفوري في حال ظهور أي حشرة خلال فترة الكفالة. لا رسوم خفية أبداً.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a
                href={COMPANY_INFO.phoneTel}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  background: '#bee58f',
                  color: '#122e20',
                  borderRadius: '10px',
                  fontWeight: 800,
                  fontSize: '14px',
                  textDecoration: 'none',
                }}
              >
                <PhoneCall size={16} />
                <span>اتصل الآن: {COMPANY_INFO.phone}</span>
              </a>
            </div>
          </div>

          {/* Pricing FAQs */}
          <div style={{ marginTop: '60px' }}>
            <h3 style={{ fontSize: '22px', fontWeight: 900, color: '#1b3f5a', textAlign: 'center', marginBottom: '24px' }}>
              الأسئلة الشائعة حول أسعار رش الحشرات
            </h3>
            <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {pricingFaqs.map((faq, i) => (
                <div
                  key={i}
                  style={{
                    background: '#fff',
                    border: '1px solid #dce2d6',
                    borderRadius: '10px',
                    padding: '20px 24px',
                  }}
                >
                  <strong style={{ fontSize: '15px', color: '#1b3f5a', display: 'block', marginBottom: '8px' }}>
                    {faq.q}
                  </strong>
                  <p style={{ fontSize: '13.5px', color: '#55655d', lineHeight: 1.8, margin: 0 }}>
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
