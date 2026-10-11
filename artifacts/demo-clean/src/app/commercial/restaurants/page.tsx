import type { Metadata } from 'next';
import Link from 'next/link';
import {
  UtensilsCrossed,
  FileCheck2,
  ShieldCheck,
  CheckCircle2,
  Clock,
  PhoneCall,
  MessageCircle,
  AlertTriangle,
  Building2,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import ContactForm from '@/components/ContactForm';
import { COMPANY_INFO } from '@/data/company';

export const metadata: Metadata = {
  title: 'مكافحة حشرات المطاعم والكافيهات الكويت | عقود وشهادة للبلدية',
  description: 'عقود سنوية لمكافحة حشرات المطاعم والكافيهات في الكويت. نوفر شهادة رش حشرات للبلدية وهيئة الغذاء، إجراءات متوافقة مع HACCP، جل ألماني بدون إغلاق المطبخ.',
  keywords: [
    'مكافحة حشرات المطاعم الكويت',
    'شهادة رش حشرات للبلدية',
    'مكافحة حشرات الكافيهات الكويت',
    'عقود سنوية مكافحة آفات كافيهات ومطابخ',
    'مكافحة صراصير المطابخ الكويت',
    'عقد مكافحة حشرات للمطاعم',
  ],
  alternates: {
    canonical: 'https://democlean-kuwait.com/commercial/restaurants',
  },
};

const restaurantFeatures = [
  {
    title: 'اعتماد البلدية وهيئة الغذاء والتغذية',
    desc: 'سجلات زيارة وشهادات رش رسمية تلبي 100% من متطلبات الهيئة العامة للغذاء والتغذية وبلدية الكويت لضمان اجتياز التفتيش الصحي.',
  },
  {
    title: 'عملية آمنة (0% تعطيل للمطبخ)',
    desc: 'نستخدم جل أدفايون وبوسيدون بدون رائحة في مناطق تحضير الطعام (HACCP Aligned)، مما يعني استمرار عمل الشيف والطاقم دون إغلاق.',
  },
  {
    title: 'محطات طعوم آمنة للنفايات والقوارض',
    desc: 'تركيب وتأمين محطات طعوم مغلقة في مسارات القوارض حول مناطق تجميع القمامة ومستودعات التخزين الجاف لمنع أي تسلل للمطبخ.',
  },
  {
    title: 'طوارئ واستجابة خلال 30 دقيقة (SLA)',
    desc: 'لأن المطاعم بيئة حرجة، نقدم لعملائنا في العقود السنوية خدمة طوارئ مجانية للاستجابة لأي ظهور مفاجئ للآفات خلال 30 دقيقة فقط على مدار 24 ساعة.',
  },
];

const contractPillars = [
  {
    step: '01',
    title: 'معاينة هندسية وتقييم مسارات الخطر (HACCP)',
    desc: 'فحص غرف التحضير، خطوط الصرف، محيط غسالات الأطباق، ومستودعات التخزين لتحديد الثغرات.',
  },
  {
    step: '02',
    title: 'تطبيق خطة المكافحة المتكاملة (IPM)',
    desc: 'حقن الجل، رش محيطي لمناهيل الصرف بمواد صحة عامة معتمدة، ونصب محطات طعوم مؤمنة.',
  },
  {
    step: '03',
    title: 'إصدار تقرير الزيارة وتسجيل الكفالة',
    desc: 'تسليم المشرف شهادة الرش الرسمية وتوثيق المواد المستخدمة وتحديد موعد الزيارة القادمة تلقائياً.',
  },
];

export default function RestaurantsPestControlPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'مكافحة حشرات المطاعم والكافيهات في الكويت (عقود سنوية)',
    provider: {
      '@type': 'LocalBusiness',
      name: 'ديمو كلين لمكافحة الحشرات والقوارض',
      telephone: COMPANY_INFO.phoneIntl,
      image: 'https://democlean-kuwait.com/logo.png',
      priceRange: '$$',
    },
    areaServed: 'KW',
    description: 'عقود مكافحة حشرات المطاعم والكافيهات وإصدار شهادة رش حشرات لبلدية الكويت وهيئة الغذاء والتغذية. حلول معتمدة لضمان سلامة الغذاء.',
  };

  return (
    <>
      <JsonLd data={schemaData} />
      <Breadcrumbs
        items={[
          { label: 'الخدمات التجارية B2B', href: '/services' },
          { label: 'مكافحة حشرات المطاعم والكافيهات' },
        ]}
      />

      <section className="page-header" dir="rtl">
        <div className="container">
          <div className="page-header-content">
            <span className="eyebrow" style={{ color: '#b2d488' }}>
              عقود B2B معتمدة • ترخيص صحة رقم 14620/2025
            </span>
            <h1>مكافحة حشرات المطاعم في الكويت (شهادات البلدية)</h1>
            <p>
              حماية سمعة مطعمك والتزامك بالمعايير الصحية هي أولويتنا. نوفر عقود سنوية لمكافحة الآفات متوافقة مع الهيئة العامة للغذاء والتغذية، تشمل شهادة رش حشرات للبلدية، بروتوكولات HACCP، واستجابة طارئة خلال 30 دقيقة.
            </p>
            <div className="page-header-meta">
              <span>✓ شهادة رش معتمدة للبلدية</span>
              <span>✓ جل بدون رائحة (لا يتطلب إغلاق)</span>
              <span>✓ مواعيد مرنة (فترات مسائية وما قبل الافتتاح)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content & Features */}
      <section className="section" style={{ background: '#f6f5ef' }} dir="rtl">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', marginBottom: '50px' }}>
            <div>
              <span className="eyebrow">إجراءات مكافحة حشرات المطاعم المتكاملة (IPM)</span>
              <h2 style={{ fontSize: '26px', fontWeight: 900, color: '#17354a', margin: '8px 0 16px' }}>
                لا مخاطرة مع صحة زبائنك ومخالفات هيئة الغذاء
              </h2>
              <p style={{ color: '#55655d', fontSize: '14.5px', lineHeight: 1.8, marginBottom: '16px' }}>
                وجود صرصور ألماني واحد أو أثر لقارض في صالة الطعام قد يكلفك سمعتك ومخالفات إغلاق فورية من بلدية الكويت. في ديمو كلين (س.ت: 532627)، ندرك طبيعة بيئة المطابخ الحرجة والحرارة العالية ورطوبة غسيل الأواني.
              </p>
              <p style={{ color: '#55655d', fontSize: '14.5px', lineHeight: 1.8 }}>
                نتجنب الرش العشوائي ذي الروائح الكريهة في مناطق التحضير. نطبق بروتوكولات آمنة عبر الحقن النقطي بمركبات الجل المتطورة ومحطات الطعوم الأمنية لمنطقة النفايات، لضمان القضاء على الصراصير والقوارض دون ملامسة الأغذية على الإطلاق، وبجداول عمل مرنة جداً (نعمل في فترات ما بعد الإغلاق أو ما قبل الافتتاح الصباحي).
              </p>
            </div>

            <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #dce2d6', padding: '28px', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#17354a', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileCheck2 size={20} color="#204733" />
                <span>ماذا يشمل العقد السنوي لمطعمك؟</span>
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', color: '#45564e' }}>
                  <CheckCircle2 size={16} color="#204733" />
                  <span>إصدار شهادة رش حشرات للبلدية وتقارير فنية دورية (Logbook)</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', color: '#45564e' }}>
                  <CheckCircle2 size={16} color="#204733" />
                  <span>تأمين محطات طعوم للقوارض حول مسارات القمامة والمخازن</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', color: '#45564e' }}>
                  <CheckCircle2 size={16} color="#204733" />
                  <span>معالجة آمنة للصراصير الألمانية في الأفران وماكينات الإسبريسو</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', color: '#45564e' }}>
                  <CheckCircle2 size={16} color="#204733" />
                  <span>استجابة لحالات الطوارئ (SLA) خلال 30 دقيقة على مدار الساعة</span>
                </li>
              </ul>

              <div style={{ marginTop: '22px', paddingTop: '18px', borderTop: '1px dashed #dce2d6', display: 'flex', gap: '10px' }}>
                <a
                  href={`https://wa.me/965${COMPANY_INFO.phone}?text=${encodeURIComponent('مرحباً ديمو كلين، أود طلب معاينة لمطعم/كافيه للحصول على عقد مكافحة حشرات وشهادة للبلدية.')}`}
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
                  <span>طلب معاينة للمطعم</span>
                </a>
                <a
                  href={COMPANY_INFO.phoneTel}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '11px 14px',
                    background: '#204733',
                    color: '#fff',
                    borderRadius: '8px',
                    textDecoration: 'none',
                  }}
                >
                  <PhoneCall size={16} />
                </a>
              </div>
            </div>
          </div>

          {/* 4 Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '50px' }}>
            {restaurantFeatures.map((feat, i) => (
              <div
                key={i}
                style={{
                  background: '#fff',
                  border: '1px solid #dce2d6',
                  borderRadius: '12px',
                  padding: '24px',
                }}
              >
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '8px',
                    background: '#eef5ea',
                    color: '#204733',
                    display: 'grid',
                    placeItems: 'center',
                    fontWeight: 800,
                    marginBottom: '14px',
                  }}
                >
                  0{i + 1}
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#17354a', margin: '0 0 8px' }}>
                  {feat.title}
                </h4>
                <p style={{ fontSize: '13px', color: '#687770', lineHeight: 1.7, margin: 0 }}>
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Quick Request Section */}
          <div
            style={{
              background: '#fff',
              border: '1px solid #dce2d6',
              borderRadius: '16px',
              padding: '36px 28px',
            }}
          >
            <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 28px' }}>
              <span className="eyebrow">حجز معاينة B2B مجانية</span>
              <h3 style={{ fontSize: '22px', fontWeight: 900, color: '#17354a', margin: '6px 0 10px' }}>
                اطلب زيارة تقييمية لمطعمك أو الكافيه اليوم
              </h3>
              <p style={{ fontSize: '13.5px', color: '#687770', lineHeight: 1.7, margin: 0 }}>
                يقوم مهندس مكافحة معتمد بمعاينة المطبخ ومواقع الصرف مجاناً وتقديم خطة IPM متوافقة مع متطلبات البلدية لتأمين نشاطك التجاري.
              </p>
            </div>

            <div style={{ maxWidth: '580px', margin: '0 auto' }}>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
