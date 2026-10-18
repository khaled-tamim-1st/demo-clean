import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  ShieldCheck,
  Check,
  PhoneCall,
  MessageCircle,
  Clock,
  MapPin,
  Sparkles,
  ArrowLeft,
  CalendarCheck,
  ShieldAlert,
  Bug,
  Rat,
} from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import FaqAccordion from '@/components/FaqAccordion';
import ContactForm from '@/components/ContactForm';
import JsonLd from '@/components/JsonLd';
import { servicesData, getServiceBySlug, getAllServiceSlugs } from '@/data/services';
import { articlesData } from '@/data/articles';
import { COMPANY_INFO } from '@/data/company';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return { title: 'الخدمة غير موجودة' };
  }

  return {
    title: `شركة ${service.title} بالكويت`,
    description: service.metaDescription,
    keywords: service.metaKeywords,
    openGraph: {
      title: `شركة ${service.title} بالكويت | ديمو كلين`,
      description: service.metaDescription,
      url: `https://democleankw.com/services/${service.slug}`,
      images: ['/og-image.jpg'],
    },
    alternates: {
      canonical: `https://democleankw.com/services/${service.slug}`,
    },
  };
}

const serviceIcons: Record<string, React.ReactNode> = {
  cockroaches: <Bug size={32} />,
  bedbugs: <ShieldAlert size={32} />,
  termites: <ShieldAlert size={32} />,
  rodents: <Rat size={32} />,
  'preventive-spraying': <CalendarCheck size={32} />,
  disinfection: <Sparkles size={32} />,
  'gecko-control': <ShieldAlert size={32} />,
};

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `https://democleankw.com/services/${service.slug}#service`,
    serviceType: service.title,
    provider: {
      '@type': 'LocalBusiness',
      name: COMPANY_INFO.name,
      telephone: COMPANY_INFO.phoneIntl,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'مدينة الكويت',
        addressCountry: 'KW',
      },
    },
    areaServed: {
      '@type': 'Country',
      name: 'Kuwait',
    },
    description: service.fullDescription,
    offers: {
      '@type': 'Offer',
      price: service.priceStartingFrom.replace(/[^0-9]/g, '') || '25',
      priceCurrency: 'KWD',
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <>
      <JsonLd data={serviceSchema} />
      <Breadcrumbs
        items={[
          { label: 'خدماتنا', href: '/services' },
          { label: service.title },
        ]}
      />

      {/* Hero */}
      <section className="page-header" dir="rtl">
        <div className="container">
          <div className="page-header-content">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(169, 205, 125, 0.2)', color: '#b2d488', display: 'grid', placeItems: 'center' }}>
                {serviceIcons[service.slug] || <ShieldCheck size={28} />}
              </div>
              <span className="eyebrow" style={{ color: '#b2d488' }}>
                {service.badge} · كفالة معتمدة
              </span>
            </div>
            <h1>{service.title}</h1>
            <p>{service.subtitle}</p>

            <div className="page-header-meta">
              <span>
                <Clock size={16} /> استجابة طوارئ خلال 30 دقيقة
              </span>
              <span>
                <ShieldCheck size={16} /> ضمان خطي: {service.guaranteeMonths} شهر
              </span>
              <span>
                <Sparkles size={16} /> السعر يبدأ من {service.priceStartingFrom}
              </span>
            </div>
            
            {/* Last Updated for E-E-A-T */}
            <div style={{ marginTop: '16px', fontSize: '13px', color: '#687774', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CalendarCheck size={14} />
              <span>آخر تحديث للمحتوى والمواصفات: 1 أكتوبر 2026</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '26px', flexWrap: 'wrap' }}>
              <a
                href={COMPANY_INFO.phoneTel}
                className="button-primary"
                style={{ background: '#a9cd7d', color: '#18354b', borderColor: '#a9cd7d' }}
              >
                <PhoneCall size={16} />
                <span>حجز الخدمة هاتفياً ({COMPANY_INFO.phone})</span>
              </a>
              <a
                href={`${COMPANY_INFO.whatsappUrl}?text=${encodeURIComponent(
                  `مرحباً ديمو كلين، أود الاستفسار عن خدمة ${service.title} وتحديد موعد زيارة.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="button-outline"
                style={{ color: '#fff', borderColor: 'rgba(255,255,255,.3)' }}
              >
                <MessageCircle size={16} />
                <span>استفسار فوري عبر واتساب</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="section" style={{ background: '#f6f5ef' }} dir="rtl">
        <div className="container content-sidebar-layout">
          <div>
            {/* Description */}
            <div style={{ background: '#fff', padding: '32px', borderRadius: '10px', border: '1px solid #e2e4db', marginBottom: '28px' }}>
              <span className="eyebrow">عن الخدمة ومواصفاتها</span>
              <h2 style={{ fontSize: '24px', fontWeight: 700, margin: '12px 0 16px', color: '#173449' }}>
                نظرة شاملة على بروتوكول {service.title}
              </h2>
              <p style={{ color: '#546363', lineHeight: 2.1, fontSize: '15px', margin: 0 }}>
                {service.fullDescription}
              </p>

              {/* Pests Covered */}
              <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid #edf0e6' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#19364c', marginBottom: '12px' }}>
                  الآفات والأنواع المستهدفة بالمعالجة:
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {service.pestsCovered.map((pest, i) => (
                    <span
                      key={i}
                      style={{
                        background: '#edf3e6',
                        color: '#426c2b',
                        padding: '6px 14px',
                        borderRadius: '999px',
                        fontSize: '12px',
                        fontWeight: 600,
                        border: '1px solid #c9dec0',
                      }}
                    >
                      ✓ {pest}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Features */}
            <div style={{ background: '#fff', padding: '32px', borderRadius: '10px', border: '1px solid #e2e4db', marginBottom: '28px' }}>
              <span className="eyebrow">لماذا ديمو كلين؟</span>
              <h2 style={{ fontSize: '24px', fontWeight: 700, margin: '12px 0 18px', color: '#173449' }}>
                مزايا وتفرد معالجة {service.title}
              </h2>
              <div style={{ display: 'grid', gap: '14px' }}>
                {service.features.map((feat, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#e5efd8', color: '#55833c', display: 'grid', placeItems: 'center', flex: 'none', marginTop: '2px' }}>
                      <Check size={13} />
                    </div>
                    <span style={{ fontSize: '14px', color: '#536361', lineHeight: 1.8 }}>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4-Step Process */}
            <div style={{ background: '#fff', padding: '32px', borderRadius: '10px', border: '1px solid #e2e4db', marginBottom: '28px' }}>
              <span className="eyebrow">مراحل التنفيذ</span>
              <h2 style={{ fontSize: '24px', fontWeight: 700, margin: '12px 0 20px', color: '#173449' }}>
                كيف ننفذ الخدمة خطوة بخطوة؟
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {service.process.map((p, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '44px 1fr',
                      gap: '16px',
                      padding: '16px',
                      background: '#fafaf6',
                      borderRadius: '8px',
                      border: '1px solid #e9ede1',
                    }}
                  >
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        background: '#19364c',
                        color: '#a9cd7d',
                        borderRadius: '50%',
                        display: 'grid',
                        placeItems: 'center',
                        fontWeight: 700,
                        fontSize: '14px',
                      }}
                    >
                      {p.step}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 6px', color: '#18354b' }}>
                        {p.title}
                      </h3>
                      <p style={{ margin: 0, fontSize: '13px', color: '#687774', lineHeight: 1.85 }}>
                        {p.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Guarantee Box */}
            <div
              style={{
                background: 'linear-gradient(135deg, #18354b 0%, #20455f 100%)',
                color: '#f5f3ec',
                padding: '28px',
                borderRadius: '10px',
                marginBottom: '28px',
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
              }}
            >
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'rgba(169,205,125,.2)',
                  color: '#a9cd7d',
                  display: 'grid',
                  placeItems: 'center',
                  flex: 'none',
                }}
              >
                <ShieldCheck size={32} />
              </div>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 6px', color: '#a9cd7d' }}>
                  شهادة الضمان المعتمدة
                </h3>
                <p style={{ margin: 0, fontSize: '13px', lineHeight: 1.8, color: 'rgba(245,243,236,.85)' }}>
                  {service.guaranteeText}
                </p>
              </div>
            </div>

            {/* Service FAQs */}
            <div style={{ background: '#fff', padding: '32px', borderRadius: '10px', border: '1px solid #e2e4db' }}>
              <span className="eyebrow">إجابات الخبراء</span>
              <h2 style={{ fontSize: '22px', fontWeight: 700, margin: '12px 0 20px', color: '#173449' }}>
                أسئلة شائعة حول {service.title}
              </h2>
              <FaqAccordion items={service.faqs} includeSchema={true} />
            </div>

            {/* Related Blog Articles */}
            {articlesData.filter((a) => a.relatedServices.includes(service.slug)).length > 0 && (
              <div style={{ background: '#fff', padding: '32px', borderRadius: '10px', border: '1px solid #e2e4db', marginTop: '28px' }}>
                <span className="eyebrow">المدونة والإرشادات</span>
                <h2 style={{ fontSize: '22px', fontWeight: 700, margin: '12px 0 20px', color: '#173449' }}>
                  مقالات ذات صلة بخدمة {service.title}
                </h2>
                <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))' }}>
                  {articlesData.filter((a) => a.relatedServices.includes(service.slug)).map((article) => (
                    <Link key={article.slug} href={`/blog/${article.slug}`} style={{ display: 'block', padding: '16px', background: '#f9fafa', borderRadius: '8px', textDecoration: 'none', border: '1px solid #e5e8dc' }}>
                      <h3 style={{ fontSize: '15px', color: '#18354b', margin: '0 0 8px', fontWeight: 700, lineHeight: 1.5 }}>{article.title}</h3>
                      <p style={{ margin: 0, fontSize: '12px', color: '#687774', lineHeight: 1.6 }}>{article.excerpt.substring(0, 80)}...</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside style={{ position: 'sticky', top: '100px' }}>
            {/* Quick booking form */}
            <ContactForm defaultServiceSlug={service.slug} />

            {/* Service coverage locations */}
            <div
              style={{
                marginTop: '24px',
                background: '#fff',
                padding: '24px',
                borderRadius: '10px',
                border: '1px solid #e2e4db',
              }}
            >
              <h4 style={{ fontSize: '15px', fontWeight: 700, margin: '0 0 12px', color: '#18354b' }}>
                المنشآت والمواقع التي نخدمها:
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 18px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {service.targetLocations.map((loc, i) => (
                  <li key={i} style={{ fontSize: '13px', color: '#5c6966', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <MapPin size={14} style={{ color: '#578740' }} />
                    <span>{loc}</span>
                  </li>
                ))}
              </ul>
              <Link href="/coverage" className="inline-link" style={{ fontSize: '12px' }}>
                <span>تغطية جميع محافظات الكويت الست</span>
                <ArrowLeft size={13} />
              </Link>
              
              <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #edf0e6' }}>
                <h5 style={{ fontSize: '13px', fontWeight: 700, margin: '0 0 8px', color: '#18354b' }}>تغطية الخدمة حسب المحافظة:</h5>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  <Link href="/coverage/capital" style={{ fontSize: '11px', background: '#f0f3eb', color: '#44662d', padding: '4px 8px', borderRadius: '4px', textDecoration: 'none' }}>العاصمة</Link>
                  <Link href="/coverage/hawalli" style={{ fontSize: '11px', background: '#f0f3eb', color: '#44662d', padding: '4px 8px', borderRadius: '4px', textDecoration: 'none' }}>حولي</Link>
                  <Link href="/coverage/farwaniya" style={{ fontSize: '11px', background: '#f0f3eb', color: '#44662d', padding: '4px 8px', borderRadius: '4px', textDecoration: 'none' }}>الفروانية</Link>
                  <Link href="/coverage/mubarak-al-kabeer" style={{ fontSize: '11px', background: '#f0f3eb', color: '#44662d', padding: '4px 8px', borderRadius: '4px', textDecoration: 'none' }}>مبارك الكبير</Link>
                  <Link href="/coverage/ahmadi" style={{ fontSize: '11px', background: '#f0f3eb', color: '#44662d', padding: '4px 8px', borderRadius: '4px', textDecoration: 'none' }}>الأحمدي</Link>
                  <Link href="/coverage/jahra" style={{ fontSize: '11px', background: '#f0f3eb', color: '#44662d', padding: '4px 8px', borderRadius: '4px', textDecoration: 'none' }}>الجهراء</Link>
                </div>
              </div>
            </div>

            {/* Other Services */}
            <div
              style={{
                marginTop: '20px',
                background: '#fff',
                padding: '24px',
                borderRadius: '10px',
                border: '1px solid #e2e4db',
              }}
            >
              <h4 style={{ fontSize: '15px', fontWeight: 700, margin: '0 0 14px', color: '#18354b' }}>
                خدمات مكافحة أخرى:
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {servicesData
                  .filter((s) => s.slug !== service.slug)
                  .map((otherSvc) => (
                    <Link
                      key={otherSvc.slug}
                      href={`/services/${otherSvc.slug}`}
                      style={{
                        padding: '10px 12px',
                        background: '#faf9f5',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        textDecoration: 'none',
                        color: '#1a374b',
                        fontSize: '13px',
                        fontWeight: 600,
                        border: '1px solid #e6e8de',
                      }}
                    >
                      <span>{otherSvc.title}</span>
                      <ArrowLeft size={14} style={{ color: '#578740' }} />
                    </Link>
                  ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
