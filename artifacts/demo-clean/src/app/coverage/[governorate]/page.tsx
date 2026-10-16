import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  MapPin,
  Clock,
  ShieldCheck,
  PhoneCall,
  MessageCircle,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import ContactForm from '@/components/ContactForm';
import JsonLd from '@/components/JsonLd';
import { governoratesData, getGovernorateBySlug, getAllGovernorateSlugs } from '@/data/locations';
import { servicesData } from '@/data/services';
import { COMPANY_INFO } from '@/data/company';

interface Props {
  params: Promise<{ governorate: string }>;
}

export async function generateStaticParams() {
  return getAllGovernorateSlugs().map((governorate) => ({ governorate }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { governorate: govSlug } = await params;
  const gov = getGovernorateBySlug(govSlug);

  if (!gov) {
    return { title: 'المحافظة غير موجودة' };
  }

  return {
    title: gov.metaTitle,
    description: gov.metaDescription,
    keywords: [
      `مكافحة حشرات ${gov.name}`,
      `رش حشرات ${gov.name}`,
      `شركة مكافحة حشرات في ${gov.name}`,
      ...gov.areas.map((a) => `مكافحة حشرات ${a.name}`),
    ],
    openGraph: {
      title: gov.metaTitle,
      description: gov.metaDescription,
      url: `https://democleankw.com/coverage/${gov.slug}`,
      images: ['/og-image.jpg'],
    },
    alternates: {
      canonical: `https://democleankw.com/coverage/${gov.slug}`,
    },
  };
}

export default async function GovernorateDetailPage({ params }: Props) {
  const { governorate: govSlug } = await params;
  const gov = getGovernorateBySlug(govSlug);

  if (!gov) {
    notFound();
  }

  const govSchema = {
    '@context': 'https://schema.org',
    '@type': 'PestControl',
    name: `ديمو كلين - ${gov.name}`,
    description: gov.description,
    telephone: COMPANY_INFO.phoneIntl,
    image: 'https://democleankw.com/og-image.jpg',
    priceRange: 'KWD 20 - KWD 150',
    address: {
      '@type': 'PostalAddress',
      addressLocality: gov.name,
      addressCountry: 'KW',
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: gov.name,
    },
    url: `https://democleankw.com/coverage/${gov.slug}`,
  };

  return (
    <>
      <JsonLd data={govSchema} />
      <Breadcrumbs
        items={[
          { label: 'نطاق التغطية', href: '/coverage' },
          { label: gov.name },
        ]}
      />

      {/* Hero */}
      <section className="page-header" dir="rtl">
        <div className="container">
          <div className="page-header-content">
            <span className="eyebrow" style={{ color: '#b2d488' }}>
              محافظة {gov.name} · استجابة سريعة
            </span>
            <h1>{gov.title}</h1>
            <p>{gov.subtitle}</p>

            <div className="page-header-meta">
              <span><Clock size={16} /> سرعة الوصول: {gov.responseTime}</span>
              <span><MapPin size={16} /> تغطية تشمل {gov.areas.length} مناطق</span>
              <span><ShieldCheck size={16} /> سيارات فنية مجهزة 24 ساعة</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '24px', flexWrap: 'wrap' }}>
              <a
                href={COMPANY_INFO.phoneTel}
                className="button-primary"
                style={{ background: '#a9cd7d', color: '#18354b', borderColor: '#a9cd7d' }}
              >
                <PhoneCall size={16} />
                <span>اتصل بطوارئ {gov.name}: {COMPANY_INFO.phone}</span>
              </a>
              <a
                href={`${COMPANY_INFO.whatsappUrl}?text=${encodeURIComponent(
                  `مرحباً ديمو كلين، أود طلب فني مكافحة حشرات في محافظة ${gov.name}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="button-outline"
                style={{ color: '#fff', borderColor: 'rgba(255,255,255,.3)' }}
              >
                <MessageCircle size={16} />
                <span>طلب موعد عبر واتساب</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section" style={{ background: '#f6f5ef' }} dir="rtl">
        <div className="container content-sidebar-layout">
          <div>
            {/* Overview */}
            <div style={{ background: '#fff', padding: '32px', borderRadius: '10px', border: '1px solid #e2e4db', marginBottom: '28px' }}>
              <span className="eyebrow">عن تغطية المحافظة</span>
              <h2 style={{ fontSize: '24px', fontWeight: 700, margin: '12px 0 16px', color: '#173449' }}>
                خدمات مكافحة الآفات في {gov.name}
              </h2>
              <p style={{ color: '#546363', lineHeight: 2.1, fontSize: '15px', margin: 0 }}>
                {gov.description}
              </p>

              {/* Contextual Services Links */}
              <div style={{ marginTop: '24px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 12px', color: '#173449' }}>أبرز الخدمات التي نقدمها في {gov.name}:</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {servicesData.slice(0, 5).map((s) => (
                    <Link key={s.slug} href={`/services/${s.slug}`} style={{ background: '#f5f7f2', padding: '8px 16px', borderRadius: '20px', fontSize: '13px', color: '#385527', textDecoration: 'none', border: '1px solid #dce4d3', fontWeight: 600 }}>
                      {s.title}
                    </Link>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: '20px', padding: '14px 18px', background: '#eef4e6', borderInlineStart: '3px solid #639247', borderRadius: '4px' }}>
                <span style={{ fontSize: '13px', color: '#385527', fontWeight: 600 }}>
                  {gov.coverageNotice}
                </span>
              </div>
            </div>

            {/* Common Pests in Governorate */}
            <div style={{ background: '#fff', padding: '32px', borderRadius: '10px', border: '1px solid #e2e4db', marginBottom: '28px' }}>
              <span className="eyebrow">تحديات بيئية وجغرافية</span>
              <h2 style={{ fontSize: '22px', fontWeight: 700, margin: '12px 0 16px', color: '#173449' }}>
                أكثر الآفات شيوعاً في محافظة {gov.name}
              </h2>
              <div style={{ display: 'grid', gap: '12px' }}>
                {gov.commonPests.map((pest, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#556360' }}>
                    <AlertTriangle size={16} style={{ color: '#d97706', flex: 'none' }} />
                    <span>{pest}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Areas List */}
            <div style={{ background: '#fff', padding: '32px', borderRadius: '10px', border: '1px solid #e2e4db' }}>
              <span className="eyebrow">دليل المناطق والأحياء</span>
              <h2 style={{ fontSize: '22px', fontWeight: 700, margin: '12px 0 20px', color: '#173449' }}>
                مناطق محافظة {gov.name} المشمولة بالخدمة
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
                {gov.areas.map((area) => (
                  <div
                    key={area.slug}
                    style={{
                      background: '#fbfaf6',
                      border: '1px solid #e5e8dc',
                      padding: '18px',
                      borderRadius: '8px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: '#18354b' }}>
                        منطقة {area.name}
                      </h3>
                      <span style={{ fontSize: '11px', color: '#537d3a', fontWeight: 600 }}>
                        {area.responseTime}
                      </span>
                    </div>
                    <p style={{ margin: 0, fontSize: '12px', color: '#6d7b77', lineHeight: 1.8 }}>
                      {area.description}
                    </p>
                    <div style={{ marginTop: 'auto', paddingTop: '10px' }}>
                      <Link
                        href={`/coverage/${gov.slug}/${area.slug}`}
                        className="service-arrow"
                        style={{ fontSize: '12px' }}
                      >
                        <span>خدمات {area.name} بالتفصيل</span>
                        <ArrowLeft size={13} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside style={{ position: 'sticky', top: '100px' }}>
            <ContactForm defaultGovernorateSlug={gov.slug} />

            {/* Services Available in this governorate */}
            <div
              style={{
                marginTop: '24px',
                background: '#fff',
                padding: '24px',
                borderRadius: '10px',
                border: '1px solid #e2e4db',
              }}
            >
              <h4 style={{ fontSize: '15px', fontWeight: 700, margin: '0 0 14px', color: '#18354b' }}>
                الخدمات المتوفرة في {gov.name}:
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {servicesData.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 12px',
                      background: '#f9f9f5',
                      borderRadius: '6px',
                      textDecoration: 'none',
                      color: '#1a374b',
                      fontSize: '13px',
                      fontWeight: 600,
                    }}
                  >
                    <span>{s.title}</span>
                    <span style={{ fontSize: '11px', color: '#54883a' }}>{s.priceStartingFrom}</span>
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
