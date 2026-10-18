import type { Metadata } from 'next';
import Link from 'next/link';
import { PhoneCall, MessageCircle, Clock, MapPin, ShieldCheck, Mail, FileText, CheckCircle2 } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import ContactForm from '@/components/ContactForm';
import JsonLd from '@/components/JsonLd';
import { COMPANY_INFO } from '@/data/company';

export const metadata: Metadata = {
  title: 'اتصل بنا | حجز موعد مكافحة وتنظيف',
  description: 'اتصل الآن بـ ديمو كلين على رقم مكافحة حشرات الكويت. طوارئ 24/7 لكافة المحافظات، استجابة خلال 30 دقيقة، ومعاينة مجانية للمنازل والشركات.',
  keywords: [
    'رقم مكافحة حشرات الكويت',
    'اتصال مكافحة حشرات',
    'حجز رش حشرات الكويت',
    'طوارئ مكافحة القوارض',
    'عنوان ديمو كلين',
  ],
  alternates: {
    canonical: 'https://democleankw.com/contact',
  },
  openGraph: {
    title: 'اتصل بنا | ديمو كلين لمكافحة الحشرات والتنظيف بالكويت',
    description: 'تواصل مع فريق ديمو كلين في الكويت لحجز خدمات مكافحة الآفات والتنظيف الشامل على مدار 24 ساعة.',
    url: 'https://democleankw.com/contact',
    type: 'website',
    images: ['/og-image.jpg'],
  },
};

export default function ContactPage() {
  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'صفحة الاتصال بديمو كلين لمكافحة الحشرات',
    description: 'قنوات التواصل المباشر وحجز مواعيد مكافحة الآفات والقوارض في الكويت.',
    mainEntity: {
      '@type': 'PestControl',
      name: COMPANY_INFO.name,
      telephone: COMPANY_INFO.phoneIntl,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'مدينة الكويت، شارع الشهداء، برج التجارية',
        addressLocality: 'مدينة الكويت',
        addressRegion: 'العاصمة',
        addressCountry: 'KW',
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59',
      },
    },
  };

  return (
    <>
      <JsonLd data={contactSchema} />
      <Breadcrumbs items={[{ label: 'اتصل بنا' }]} />

      <section className="page-header" dir="rtl">
        <div className="container">
          <div className="page-header-content">
            <span className="eyebrow" style={{ color: '#b2d488' }}>
              خدمة سريعة على مدار الساعة
            </span>
            <h1>تواصل مع ديمو كلين لحجز المعاينة الفورية</h1>
            <p>
              فريق الطوارئ الخاص بنا جاهز لتلقي اتصالاتكم واستفساراتكم على مدار 24 ساعة يومياً. نضمن سرعة الاستجابة ووصول فريقنا الفني المتخصص لأي منطقة في محافظات الكويت الست خلال 30 دقيقة، مع تقييم مجاني فوري عبر الهاتف أو الواتساب.
            </p>
            <div className="page-header-meta">
              <span><Clock size={16} /> خدمة عملاء 24/7 دون انقطاع</span>
              <span><MapPin size={16} /> نغطي جميع محافظات الكويت الست في 30 دقيقة</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: '#f6f5ef' }} dir="rtl">
        <div className="container two-col-layout">
          <div>
            <span className="eyebrow">قنوات الاتصال المباشر</span>
            <h2 className="section-heading" style={{ fontSize: '28px' }}>
              يسعدنا تلقي طلبك<br />أو استفسارك بأي وقت
            </h2>
            <p className="section-copy">
              سواء كنت بحاجة لتدخل عاجل لـ <Link href="/services/bedbugs" style={{ color: '#52813b', textDecoration: 'underline', fontWeight: 600 }}>مكافحة بق الفراش</Link> أو استشارة لحقن <Link href="/services/termites" style={{ color: '#52813b', textDecoration: 'underline', fontWeight: 600 }}>النمل الأبيض</Link> أو عقد صيانة دوري لـ <Link href="/services/cockroaches" style={{ color: '#52813b', textDecoration: 'underline', fontWeight: 600 }}>إبادة الصراصير</Link>، فريقنا الهندسي والفني في خدمتك دائماً عبر جميع <Link href="/coverage" style={{ color: '#52813b', textDecoration: 'underline', fontWeight: 600 }}>محافظات ومناطق الكويت</Link>.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '32px' }}>
              {/* Phone card */}
              <a
                href={COMPANY_INFO.phoneTel}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '18px 22px',
                  background: '#fff',
                  border: '1px solid #e1e3da',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'border-color .2s, transform .2s',
                }}
              >
                <div style={{ width: '46px', height: '46px', borderRadius: '50%', background: '#eaf2e3', color: '#52813b', display: 'grid', placeItems: 'center', flex: 'none' }}>
                  <PhoneCall size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: '#7a8781', fontWeight: 600 }}>الخط الساخن المباشر (24 ساعة)</div>
                  <strong style={{ fontSize: '18px', color: '#173449', direction: 'ltr', display: 'inline-block' }}>{COMPANY_INFO.phone}</strong>
                </div>
              </a>

              {/* WhatsApp card */}
              <a
                href={COMPANY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '18px 22px',
                  background: '#fff',
                  border: '1px solid #e1e3da',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'border-color .2s, transform .2s',
                }}
              >
                <div style={{ width: '46px', height: '46px', borderRadius: '50%', background: '#e6f7ec', color: '#25d366', display: 'grid', placeItems: 'center', flex: 'none' }}>
                  <MessageCircle size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: '#7a8781', fontWeight: 600 }}>المحادثة الفورية عبر واتساب</div>
                  <strong style={{ fontSize: '15px', color: '#173449' }}>تواصل واتساب مباشر: {COMPANY_INFO.phone}</strong>
                </div>
              </a>

              {/* Commercial & Licensing info card */}
              <div
                style={{
                  padding: '20px 22px',
                  background: '#f8faf7',
                  border: '1px solid #d4dfcc',
                  borderRadius: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  fontSize: '13px',
                  color: '#2d3b36',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#204733', fontWeight: 700 }}>
                  <CheckCircle2 size={16} style={{ color: '#52813b' }} />
                  <span>شركة ديمو كلين (Demo Clean) كويتية معتمدة ومرخصة</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FileText size={16} style={{ color: '#52813b' }} />
                  <span>رقم الترخيص: <strong style={{ color: '#173449' }}>{COMPANY_INFO.licenseNumber}</strong></span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShieldCheck size={16} style={{ color: '#52813b' }} />
                  <span>السجل التجاري: <strong style={{ color: '#173449' }}>{COMPANY_INFO.commercialRegister}</strong></span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MapPin size={16} style={{ color: '#52813b' }} />
                  <span>نطاق العمل: جميع محافظات ومناطق دولة الكويت (خدمة 24 ساعة)</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
