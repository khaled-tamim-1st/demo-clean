import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Sparkles,
  Home,
  Building2,
  Sofa,
  Flame,
  Droplets,
  ShieldCheck,
  Check,
  ArrowLeft,
  PhoneCall,
  MessageCircle,
  Clock,
  MapPin,
  CheckCircle2,
  Star,
} from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import ContactForm from '@/components/ContactForm';
import { cleaningServicesData } from '@/data/cleaning';
import { COMPANY_INFO } from '@/data/company';

export const metadata: Metadata = {
  title: 'خدمات التنظيف الشامل في الكويت | شركة ديمو كلين للتنظيف وإبادة الحشرات',
  description: 'خدمات تنظيف منازل وفلل، تنظيف بعد التشطيب والبناء، غسيل كنب وسجاد بالبخار، وتنظيف مطاعم وواجهات بالكويت بأحدث المعدات الإيطالية ومواد آمنة 100%. اتصل 67088755.',
  keywords: [
    'شركة تنظيف الكويت',
    'تنظيف منازل وفلل بالكويت',
    'غسيل شقق الكويت',
    'تنظيف بعد التشطيب الكويت',
    'غسيل كنب وسجاد بالبخار',
    'تنظيف مطاعم وواجهات الكويت',
    'ديمو كلين للتنظيف ومكافحة الحشرات',
  ],
  alternates: {
    canonical: 'https://democleankw.com/cleaning-services',
  },
  openGraph: {
    title: 'خدمات التنظيف الشامل في الكويت | ديمو كلين للتنظيف وإبادة الحشرات',
    description: 'تنظيف عميق للفلل والمنازل، غسيل كنب وسجاد، تنظيف بعد التشطيب وتنظيف المطاعم في جميع مناطق الكويت 24 ساعة.',
    url: 'https://democleankw.com/cleaning-services',
    images: ['/og-image.jpg'],
  },
};

const cleaningIcons: Record<string, React.ReactNode> = {
  Home: <Home size={28} />,
  Building2: <Building2 size={28} />,
  Sofa: <Sofa size={28} />,
  Flame: <Flame size={28} />,
  Sparkles: <Sparkles size={28} />,
  Droplets: <Droplets size={28} />,
};

export default function CleaningServicesPage() {
  const serviceListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'خدمات التنظيف الشامل - شركة ديمو كلين الكويت',
    description: 'دليل خدمات التنظيف الاحترافي للمنازل والفلل والمفروشات والمنشآت التجارية في الكويت',
    itemListElement: cleaningServicesData.map((svc, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: svc.title,
        description: svc.shortDescription,
        provider: {
          '@type': 'LocalBusiness',
          name: COMPANY_INFO.name,
          telephone: COMPANY_INFO.phoneIntl,
        },
      },
    })),
  };

  return (
    <>
      <JsonLd data={serviceListSchema} />
      <Breadcrumbs items={[{ label: 'خدمات التنظيف' }]} />

      {/* Header Banner */}
      <section className="page-header" dir="rtl">
        <div className="container">
          <div className="page-header-content">
            <span className="eyebrow" style={{ color: '#b2d488' }}>
              ديمو كلين للتنظيف وإبادة الحشرات
            </span>
            <h1>خدمات التنظيف الاحترافي الشامل في الكويت</h1>
            <p>
              نقدم أعلى معايير النظافة والتعقيم للمنازل، الفلل، المفروشات، والمنشآت التجارية بجميع مناطق الكويت. نعتمد على ماكينات جلي وتلميع إيطالية، أجهزة البخار الحراري عالي الضغط، ومواد تنظيف أوروبية صديقة للبيئة وآمنة تماماً على الأطفال وكبار السن.
            </p>
            <div className="page-header-meta">
              <span><ShieldCheck size={16} /> أجهزة بخار وماكينات إيطالية متطورة</span>
              <span><Check size={16} /> ضمان رضا 100% وإعادة تنظيف مجانية</span>
              <span><Check size={16} /> طاقم فني مدرب متاح 24/7 بجميع المحافظات</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section" style={{ background: '#f5f4ed' }} dir="rtl">
        <div className="container">
          <div className="section-head text-center" style={{ marginBottom: '40px' }}>
            <span className="eyebrow">أقسام التنظيف المتخصصة</span>
            <h2 className="section-heading">اختر خدمة التنظيف التي تناسب احتياجك</h2>
            <p className="section-copy" style={{ margin: '10px auto 0' }}>
              خدمات تنظيف دقيقة ومفصلة تغطي الفلل والشقق، الأثاث والمفروشات، وعقارات ما بعد التشطيب والمنشآت التجارية.
            </p>
          </div>

          <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {cleaningServicesData.map((svc) => (
              <div
                key={svc.slug}
                className="service-card"
                style={{
                  background: '#ffffff',
                  borderRadius: '12px',
                  padding: '28px',
                  border: '1px solid #dce2d6',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 4px 18px rgba(24, 53, 75, 0.04)',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div
                      style={{
                        width: '54px',
                        height: '54px',
                        borderRadius: '12px',
                        background: '#eef4e8',
                        color: '#46782b',
                        display: 'grid',
                        placeItems: 'center',
                      }}
                    >
                      {cleaningIcons[svc.iconName] || <Sparkles size={28} />}
                    </div>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        background: '#19364c',
                        color: '#f5f4ed',
                        padding: '4px 10px',
                        borderRadius: '999px',
                      }}
                    >
                      {svc.badge}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#17334a', marginBottom: '8px' }}>
                    {svc.title}
                  </h3>
                  <p style={{ fontSize: '13px', color: '#687771', lineHeight: '1.7', marginBottom: '16px' }}>
                    {svc.shortDescription}
                  </p>

                  <div style={{ borderTop: '1px dashed #e1e7db', paddingTop: '14px', marginBottom: '18px' }}>
                    <strong style={{ fontSize: '12px', color: '#19364c', display: 'block', marginBottom: '8px' }}>
                      أبرز المزايا والمعدات:
                    </strong>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {svc.features.slice(0, 3).map((feat, i) => (
                        <li key={i} style={{ fontSize: '12px', color: '#445650', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <CheckCircle2 size={13} style={{ color: '#54883a', flexShrink: 0 }} />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div style={{ borderTop: '1px solid #edf0ea', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '11px', color: '#4a5550', display: 'block' }}>الأسعار تبدأ من</span>
                    <strong style={{ fontSize: '17px', color: '#19364c' }}>{svc.priceStartingFrom}</strong>
                  </div>
                  <Link
                    href={`/cleaning-services/${svc.slug}`}
                    className="button-primary"
                    style={{ padding: '8px 16px', fontSize: '13px' }}
                    aria-label={`تفاصيل خدمة ${svc.title}`}
                  >
                    <span>تفاصيل الخدمة</span>
                    <ArrowLeft size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Combined Offer: Cleaning + Pest Control */}
      <section className="section" style={{ background: '#19364c', color: '#f5f4ed' }} dir="rtl">
        <div className="container">
          <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
            <span
              style={{
                display: 'inline-block',
                background: 'rgba(180, 215, 139, 0.2)',
                color: '#b4d78b',
                padding: '6px 14px',
                borderRadius: '999px',
                fontSize: '13px',
                fontWeight: 700,
                marginBottom: '14px',
              }}
            >
              باقة ديمو كلين الذهبية المتكاملة
            </span>
            <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 800, marginBottom: '16px' }}>
              خدمة مزدوجة: تنظيف شامل + مكافحة ورش وقائي للحشرات بخصم خاص
            </h2>
            <p style={{ fontSize: '15px', color: 'rgba(245, 244, 237, 0.85)', lineHeight: '1.9', marginBottom: '28px' }}>
              وفّر وقتك وتكاليفك بحجز موعد واحد يجمع بين التنظيف والتعقيم العميق للفيلا أو الشقة، ورش وقائي محيطي شامل ضد الصراصير والنمل وبق الفراش مع كفالة 6 شهور رسمية معتمدة من وزارة الصحة.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <a href={COMPANY_INFO.phoneTel} className="button-primary" style={{ background: '#54883a', borderColor: '#54883a' }}>
                <PhoneCall size={16} />
                <span>اتصل لحجز الباقة: {COMPANY_INFO.phone}</span>
              </a>
              <a
                href={`${COMPANY_INFO.whatsappUrl}?text=${encodeURIComponent('مرحباً ديمو كلين، أود الاستفسار عن باقة التنظيف الشامل مع مكافحة الحشرات.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="button-outline"
                style={{ color: '#25D366', borderColor: '#25D366' }}
              >
                <MessageCircle size={16} />
                <span>محادثة واتساب سريعة</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us for Cleaning */}
      <section className="section" style={{ background: '#ffffff' }} dir="rtl">
        <div className="container">
          <div className="section-head text-center" style={{ marginBottom: '40px' }}>
            <span className="eyebrow">لماذا ديمو كلين؟</span>
            <h2 className="section-heading">معايير احترافية تجعلنا خيارك الأول في الكويت</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            <div style={{ padding: '24px', background: '#f8faf6', borderRadius: '10px', border: '1px solid #e1e7db' }}>
              <div style={{ color: '#4d8030', marginBottom: '12px' }}><Sparkles size={30} /></div>
              <h4 style={{ fontSize: '17px', fontWeight: 700, color: '#19364c', marginBottom: '8px' }}>أجهزة إيطالية وألمانية</h4>
              <p style={{ fontSize: '13px', color: '#687771', lineHeight: '1.8' }}>
                نستخدم ماكينات جلي الرخام والسيراميك ومعدات البخار عالي الضغط Kärcher و Klindex التي تضمن أعلى درجات النظافة.
              </p>
            </div>

            <div style={{ padding: '24px', background: '#f8faf6', borderRadius: '10px', border: '1px solid #e1e7db' }}>
              <div style={{ color: '#4d8030', marginBottom: '12px' }}><ShieldCheck size={30} /></div>
              <h4 style={{ fontSize: '17px', fontWeight: 700, color: '#19364c', marginBottom: '8px' }}>مواد آمنة ومعتمدة</h4>
              <p style={{ fontSize: '13px', color: '#687771', lineHeight: '1.8' }}>
                منظفات ومعقمات مستوردة صديقة للبيئة خالية من المواد الكاوية الضارة، آمنة 100% على الأطفال وكبار السن والأثاث الفاخر.
              </p>
            </div>

            <div style={{ padding: '24px', background: '#f8faf6', borderRadius: '10px', border: '1px solid #e1e7db' }}>
              <div style={{ color: '#4d8030', marginBottom: '12px' }}><Clock size={30} /></div>
              <h4 style={{ fontSize: '17px', fontWeight: 700, color: '#19364c', marginBottom: '8px' }}>التزام دقيق بالمواعيد</h4>
              <p style={{ fontSize: '13px', color: '#687771', lineHeight: '1.8' }}>
                فرق عمل مدربة ومنظمة تصلك في الموعد المحدد تماماً في أي محافظة من محافظات الكويت مع إنجاز سريع وإتقان تام.
              </p>
            </div>

            <div style={{ padding: '24px', background: '#f8faf6', borderRadius: '10px', border: '1px solid #e1e7db' }}>
              <div style={{ color: '#4d8030', marginBottom: '12px' }}><Star size={30} /></div>
              <h4 style={{ fontSize: '17px', fontWeight: 700, color: '#19364c', marginBottom: '8px' }}>ضمان الجودة والرضا</h4>
              <p style={{ fontSize: '13px', color: '#687771', lineHeight: '1.8' }}>
                لا نغادر الموقع حتى نتأكد من رضا العميل الكامل عن كل زاوية وغرفة، مع استعداد تام لمعالجة أي ملاحظة فوراً.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="section" style={{ background: '#f5f4ed' }} dir="rtl">
        <div className="container" style={{ maxWidth: '780px' }}>
          <div className="section-head text-center" style={{ marginBottom: '30px' }}>
            <span className="eyebrow">حجز موعد مباشر</span>
            <h2 className="section-heading">اطلب خدمة التنظيف الآن</h2>
            <p className="section-copy" style={{ margin: '10px auto 0' }}>
              اختر نوع التنظيف والمحافظة وسيتواصل معك مشرف الخدمة خلال دقائق لتأكيد الموعد والتفاصيل.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
