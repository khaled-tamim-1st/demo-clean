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
  Check,
  Building,
  AlertCircle,
} from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import ContactForm from '@/components/ContactForm';
import JsonLd from '@/components/JsonLd';
import {
  getGovernorateBySlug,
  getAreaBySlug,
  getAllAreasWithGov,
} from '@/data/locations';
import { servicesData } from '@/data/services';
import { COMPANY_INFO } from '@/data/company';

interface Props {
  params: Promise<{ governorate: string; area: string }>;
}

export async function generateStaticParams() {
  const allAreas = getAllAreasWithGov();
  return allAreas.map(({ govSlug, areaSlug }) => ({
    governorate: govSlug,
    area: areaSlug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { governorate: govSlug, area: areaSlug } = await params;
  const area = getAreaBySlug(govSlug, areaSlug);

  if (!area) {
    return { title: 'المنطقة غير موجودة' };
  }

  return {
    title: area.metaTitle,
    description: area.metaDescription,
    keywords: [
      `مكافحة حشرات ${area.name}`,
      `رش حشرات ${area.name}`,
      `شركة مكافحة حشرات ${area.name}`,
      `رش صراصير ${area.name}`,
      `مكافحة بق الفراش في ${area.name}`,
      `مكافحة حشرات ${area.governorateName}`,
    ],
    openGraph: {
      title: area.metaTitle,
      description: area.metaDescription,
      url: `https://democlean-kuwait.com/coverage/${area.governorateSlug}/${area.slug}`,
      images: ['/demo-clean-identity.jpg'],
    },
    alternates: {
      canonical: `https://democlean-kuwait.com/coverage/${area.governorateSlug}/${area.slug}`,
    },
  };
}

export default async function AreaDetailPage({ params }: Props) {
  const { governorate: govSlug, area: areaSlug } = await params;
  const gov = getGovernorateBySlug(govSlug);
  const area = getAreaBySlug(govSlug, areaSlug);

  if (!gov || !area) {
    notFound();
  }

  const localAreaSchema = {
    '@context': 'https://schema.org',
    '@type': 'PestControl',
    name: `ديمو كلين - ${area.name}`,
    description: area.description,
    telephone: COMPANY_INFO.phoneIntl,
    image: 'https://democlean-kuwait.com/demo-clean-identity.jpg',
    priceRange: 'KWD 20 - KWD 150',
    address: {
      '@type': 'PostalAddress',
      addressLocality: area.name,
      addressRegion: gov.name,
      addressCountry: 'KW',
    },
    areaServed: {
      '@type': 'City',
      name: area.name,
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: gov.name,
      },
    },
    url: `https://democlean-kuwait.com/coverage/${gov.slug}/${area.slug}`,
  };

  const otherAreasInGov = gov.areas.filter((a) => a.slug !== area.slug);

  return (
    <>
      <JsonLd data={localAreaSchema} />
      <Breadcrumbs
        items={[
          { label: 'نطاق التغطية', href: '/coverage' },
          { label: gov.name, href: `/coverage/${gov.slug}` },
          { label: area.name },
        ]}
      />

      {/* Hero */}
      <section className="page-header" dir="rtl">
        <div className="container">
          <div className="page-header-content">
            <span className="eyebrow" style={{ color: '#b2d488' }}>
              محافظة {gov.name} · منطقة {area.name}
            </span>
            <h1>{area.title}</h1>
            <p>{area.description}</p>

            <div className="page-header-meta">
              <span><Clock size={16} /> سرعة الوصول لمنطقة {area.name}: {area.responseTime}</span>
              <span><ShieldCheck size={16} /> كفالة معتمدة تصل إلى 6 أشهر - 10 سنوات</span>
              <span><MapPin size={16} /> سيارات فنية قريبة من {area.landmarks[0] || 'المنطقة'}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '24px', flexWrap: 'wrap' }}>
              <a
                href={COMPANY_INFO.phoneTel}
                className="button-primary"
                style={{ background: '#a9cd7d', color: '#18354b', borderColor: '#a9cd7d' }}
              >
                <PhoneCall size={16} />
                <span>اتصل بفني منطقة {area.name}: {COMPANY_INFO.phone}</span>
              </a>
              <a
                href={`${COMPANY_INFO.whatsappUrl}?text=${encodeURIComponent(
                  `مرحباً ديمو كلين، أود طلب خدمة مكافحة حشرات في منطقة ${area.name} بمحافظة ${gov.name}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="button-outline"
                style={{ color: '#fff', borderColor: 'rgba(255,255,255,.3)' }}
              >
                <MessageCircle size={16} />
                <span>طلب حجز موعد عبر واتساب</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="section" style={{ background: '#f6f5ef' }} dir="rtl">
        <div className="container content-sidebar-layout">
          <div>
            {/* Area Details & Protocols */}
            <div style={{ background: '#fff', padding: '32px', borderRadius: '10px', border: '1px solid #e2e4db', marginBottom: '28px' }}>
              <span className="eyebrow">رعاية بيئية مخصصة</span>
              <h2 style={{ fontSize: '24px', fontWeight: 700, margin: '12px 0 16px', color: '#173449' }}>
                بروتوكول مكافحة الحشرات المعتمد في {area.name}
              </h2>
              <p style={{ color: '#546363', lineHeight: 2.1, fontSize: '15px', margin: 0 }}>
                تتميز منطقة {area.name} بخصوصيتها المعمارية والسكنية ضمن محافظة {gov.name}. نوفر لسكان ومؤسسات {area.name} حلول مكافحة مبنية على طبيعة المنشآت؛ سواء كانت فللاً سكنية تتطلب حماية للحدائق والسرداب وشبكات الصرف، أو شققاً وبنايات استثمارية تحتاج لمعالجة متخصصة للبق والصراصير بدون مغادرة المكان وبأعلى درجات الكفاءة.
              </p>

              {/* Contextual Services Links */}
              <div style={{ marginTop: '24px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 12px', color: '#173449' }}>أهم خدماتنا المتاحة لمنطقة {area.name}:</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {servicesData.slice(0, 5).map((s) => (
                    <Link key={s.slug} href={`/services/${s.slug}`} style={{ background: '#f5f7f2', padding: '8px 16px', borderRadius: '20px', fontSize: '13px', color: '#385527', textDecoration: 'none', border: '1px solid #dce4d3', fontWeight: 600 }}>
                      {s.title}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Landmarks Served */}
              {area.landmarks.length > 0 && (
                <div style={{ marginTop: '22px', paddingTop: '18px', borderTop: '1px solid #edf0e6' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#18354b', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Building size={16} style={{ color: '#578740' }} />
                    <span>معالم وأماكن مشمولة بخدمة الطوارئ في {area.name}:</span>
                  </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {area.landmarks.map((landmark, i) => (
                      <span
                        key={i}
                        style={{
                          background: '#f4f7ef',
                          color: '#466f2f',
                          padding: '5px 12px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: 600,
                          border: '1px solid #d2e0cb',
                        }}
                      >
                        {landmark}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Key Features in Area */}
            <div style={{ background: '#fff', padding: '32px', borderRadius: '10px', border: '1px solid #e2e4db', marginBottom: '28px' }}>
              <span className="eyebrow">مميزات خدمتنا في {area.name}</span>
              <h2 style={{ fontSize: '22px', fontWeight: 700, margin: '12px 0 18px', color: '#173449' }}>
                لماذا يفضل أهالي {area.name} ديمو كلين؟
              </h2>
              <div style={{ display: 'grid', gap: '14px' }}>
                {area.keyFeatures.map((feat, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#e5efd8', color: '#55833c', display: 'grid', placeItems: 'center', flex: 'none', marginTop: '2px' }}>
                      <Check size={13} />
                    </div>
                    <span style={{ fontSize: '14px', color: '#536361', lineHeight: 1.8 }}>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Common Pests in Area */}
            <div style={{ background: '#fff', padding: '32px', borderRadius: '10px', border: '1px solid #e2e4db', marginBottom: '28px' }}>
              <span className="eyebrow">الآفات الأكثر انتشاراً</span>
              <h2 style={{ fontSize: '22px', fontWeight: 700, margin: '12px 0 16px', color: '#173449' }}>
                أنواع الحشرات الشائعة في {area.name}
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {area.commonPests.map((pest, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 14px',
                      background: '#fff9ed',
                      borderRadius: '6px',
                      border: '1px solid #f6d89b',
                      fontSize: '13px',
                      color: '#92400e',
                      fontWeight: 600,
                    }}
                  >
                    <AlertCircle size={15} />
                    <span>{pest}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Other Areas in Governorate */}
            {otherAreasInGov.length > 0 && (
              <div style={{ background: '#fff', padding: '32px', borderRadius: '10px', border: '1px solid #e2e4db' }}>
                <span className="eyebrow">مناطق قريبة</span>
                <h2 style={{ fontSize: '22px', fontWeight: 700, margin: '12px 0 16px', color: '#173449' }}>
                  مناطق أخرى نغطيها في محافظة {gov.name}
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                  {otherAreasInGov.map((otherArea) => (
                    <Link
                      key={otherArea.slug}
                      href={`/coverage/${gov.slug}/${otherArea.slug}`}
                      style={{
                        padding: '12px 14px',
                        background: '#fbfaf6',
                        borderRadius: '6px',
                        border: '1px solid #e5e8dc',
                        textDecoration: 'none',
                        color: '#1a374b',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '13px',
                        fontWeight: 600,
                      }}
                    >
                      <span>منطقة {otherArea.name}</span>
                      <ArrowLeft size={13} style={{ color: '#578740' }} />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside style={{ position: 'sticky', top: '100px' }}>
            <ContactForm defaultGovernorateSlug={gov.slug} />

            {/* Quick Call Box */}
            <div
              style={{
                marginTop: '24px',
                background: 'linear-gradient(135deg, #18354b 0%, #20455f 100%)',
                color: '#fff',
                padding: '24px',
                borderRadius: '10px',
                textAlign: 'center',
              }}
            >
              <h4 style={{ fontSize: '17px', fontWeight: 700, margin: '0 0 8px', color: '#a9cd7d' }}>
                هل تحتاج فني مكافحة في {area.name} الآن؟
              </h4>
              <p style={{ margin: '0 0 16px', fontSize: '12px', color: 'rgba(255,255,255,.8)', lineHeight: 1.8 }}>
                الفريق المناوب في {gov.name} مستعد للتحرك فوراً والوصول خلال {area.responseTime}.
              </p>
              <a
                href={COMPANY_INFO.phoneTel}
                className="button-primary"
                style={{ width: '100%', background: '#a9cd7d', color: '#18354b', borderColor: '#a9cd7d' }}
              >
                <PhoneCall size={15} />
                <span>اتصل الآن: {COMPANY_INFO.phone}</span>
              </a>
            </div>

            {/* Recommended Services for this Area */}
            <div
              style={{
                marginTop: '20px',
                background: '#fff',
                padding: '24px',
                borderRadius: '10px',
                border: '1px solid #e2e4db',
              }}
            >
              <h4 style={{ fontSize: '15px', fontWeight: 700, margin: '0 0 12px', color: '#18354b' }}>
                الخدمات الأكثر طلباً في {area.name}:
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {servicesData.slice(0, 4).map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    style={{
                      padding: '8px 12px',
                      background: '#f9f9f5',
                      borderRadius: '6px',
                      textDecoration: 'none',
                      color: '#1a374b',
                      fontSize: '13px',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span>{s.title}</span>
                    <span style={{ fontSize: '11px', color: '#578740' }}>{s.priceStartingFrom}</span>
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
