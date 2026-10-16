import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
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
  CheckCircle2,
  PhoneCall,
  MessageCircle,
  Clock,
  MapPin,
  ArrowLeft,
  Wrench,
  CalendarCheck,
} from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import FaqAccordion from '@/components/FaqAccordion';
import ContactForm from '@/components/ContactForm';
import JsonLd from '@/components/JsonLd';
import {
  cleaningServicesData,
  getCleaningServiceBySlug,
  getAllCleaningServiceSlugs,
} from '@/data/cleaning';
import { COMPANY_INFO } from '@/data/company';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllCleaningServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getCleaningServiceBySlug(slug);

  if (!service) {
    return { title: 'الخدمة غير موجودة' };
  }

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    keywords: service.metaKeywords,
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `https://democlean-kuwait.com/cleaning-services/${service.slug}`,
      images: ['/og-image.jpg'],
    },
    alternates: {
      canonical: `https://democlean-kuwait.com/cleaning-services/${service.slug}`,
    },
  };
}

const cleaningIcons: Record<string, React.ReactNode> = {
  Home: <Home size={28} />,
  Building2: <Building2 size={28} />,
  Sofa: <Sofa size={28} />,
  Flame: <Flame size={28} />,
  Sparkles: <Sparkles size={28} />,
  Droplets: <Droplets size={28} />,
};

export default async function CleaningServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getCleaningServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
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
      name: 'الكويت',
    },
    offers: {
      '@type': 'Offer',
      price: service.priceStartingFrom.replace(/[^0-9]/g, ''),
      priceCurrency: 'KWD',
      availability: 'https://schema.org/InStock',
    },
    description: service.fullDescription,
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />

      <Breadcrumbs
        items={[
          { label: 'خدمات التنظيف', href: '/cleaning-services' },
          { label: service.title },
        ]}
      />

      {/* Hero Header - Identical to Services page */}
      <section className="page-header" dir="rtl">
        <div className="container">
          <div className="page-header-content">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'rgba(169, 205, 125, 0.2)',
                  color: '#b2d488',
                  display: 'grid',
                  placeItems: 'center',
                }}
              >
                {cleaningIcons[service.iconName] || <Sparkles size={28} />}
              </div>
              <span className="eyebrow" style={{ color: '#b2d488' }}>
                {service.badge} · ضمان معتمد
              </span>
            </div>

            <h1>{service.title}</h1>
            <p>{service.subtitle}</p>

            <div className="page-header-meta">
              <span>
                <Clock size={16} /> خدمة متاحة 24 ساعة
              </span>
              <span>
                <ShieldCheck size={16} /> ضمان رضا 100%
              </span>
              <span>
                <Sparkles size={16} /> السعر يبدأ من {service.priceStartingFrom}
              </span>
            </div>

            <div style={{ marginTop: '16px', fontSize: '13px', color: '#8fa595', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CalendarCheck size={14} />
              <span>أجهزة إيطالية وألمانية حديثة ومواد صديقة للبيئة</span>
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

      {/* Main Content Layout - Exact matching container and sidebar styling */}
      <section className="section" style={{ background: '#f6f5ef' }} dir="rtl">
        <div className="container content-sidebar-layout">
          <div>
            {/* Description Card */}
            <div
              style={{
                background: '#fff',
                padding: '32px',
                borderRadius: '10px',
                border: '1px solid #e2e4db',
                marginBottom: '28px',
              }}
            >
              <span className="eyebrow">عن الخدمة ومواصفاتها</span>
              <h2 style={{ fontSize: '24px', fontWeight: 700, margin: '12px 0 16px', color: '#173449' }}>
                نظرة شاملة على خدمة {service.title}
              </h2>
              <p style={{ color: '#546363', lineHeight: 2.1, fontSize: '15px', margin: 0 }}>
                {service.fullDescription}
              </p>
            </div>

            {/* Features Card */}
            <div
              style={{
                background: '#fff',
                padding: '32px',
                borderRadius: '10px',
                border: '1px solid #e2e4db',
                marginBottom: '28px',
              }}
            >
              <span className="eyebrow">مزايا التنظيف المتقدم</span>
              <h2 style={{ fontSize: '24px', fontWeight: 700, margin: '12px 0 18px', color: '#173449' }}>
                ماذا تشمل هذه الخدمة؟
              </h2>
              <div style={{ display: 'grid', gap: '14px' }}>
                {service.features.map((feat, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div
                      style={{
                        width: '22px',
                        height: '22px',
                        borderRadius: '50%',
                        background: '#e5efd8',
                        color: '#55833c',
                        display: 'grid',
                        placeItems: 'center',
                        flex: 'none',
                        marginTop: '2px',
                      }}
                    >
                      <Check size={13} />
                    </div>
                    <span style={{ fontSize: '14px', color: '#536361', lineHeight: 1.8 }}>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Equipment and Chemicals */}
            <div
              style={{
                background: '#fff',
                padding: '32px',
                borderRadius: '10px',
                border: '1px solid #e2e4db',
                marginBottom: '28px',
              }}
            >
              <span className="eyebrow">المعدات والتجهيزات</span>
              <h2 style={{ fontSize: '24px', fontWeight: 700, margin: '12px 0 18px', color: '#173449' }}>
                الماكينات ومواد التنظيف المستخدمة
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
                {service.equipmentUsed.map((equip, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '14px 18px',
                      background: '#fafaf6',
                      borderRadius: '8px',
                      border: '1px solid #e9ede1',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                    }}
                  >
                    <Wrench size={16} style={{ color: '#54883a', flexShrink: 0 }} />
                    <span style={{ fontSize: '13px', color: '#33493f', fontWeight: 600 }}>{equip}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Process Steps */}
            <div
              style={{
                background: '#fff',
                padding: '32px',
                borderRadius: '10px',
                border: '1px solid #e2e4db',
                marginBottom: '28px',
              }}
            >
              <span className="eyebrow">مراحل التنفيذ</span>
              <h2 style={{ fontSize: '24px', fontWeight: 700, margin: '12px 0 20px', color: '#173449' }}>
                كيف ينفذ فريق ديمو كلين العمل خطوة بخطوة؟
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {service.process.map((step) => (
                  <div
                    key={step.step}
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
                      {step.step}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 6px', color: '#18354b' }}>
                        {step.title}
                      </h3>
                      <p style={{ margin: 0, fontSize: '13px', color: '#687774', lineHeight: 1.85 }}>
                        {step.description}
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
                  ضمان الجودة والرضا التام
                </h3>
                <p style={{ margin: 0, fontSize: '13px', lineHeight: 1.8, color: 'rgba(245,243,236,.85)' }}>
                  {service.guaranteeText}
                </p>
              </div>
            </div>

            {/* FAQs */}
            {service.faqs && service.faqs.length > 0 && (
              <div style={{ background: '#fff', padding: '32px', borderRadius: '10px', border: '1px solid #e2e4db' }}>
                <span className="eyebrow">إجابات الخبراء</span>
                <h2 style={{ fontSize: '22px', fontWeight: 700, margin: '12px 0 20px', color: '#173449' }}>
                  أسئلة شائعة حول {service.title}
                </h2>
                <FaqAccordion items={service.faqs} includeSchema={true} />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside style={{ position: 'sticky', top: '100px' }}>
            {/* Quick booking form */}
            <ContactForm defaultServiceSlug={`تنظيف: ${service.title}`} />

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
                <span>عرض كافة مناطق التغطية في الكويت</span>
                <ArrowLeft size={14} />
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
