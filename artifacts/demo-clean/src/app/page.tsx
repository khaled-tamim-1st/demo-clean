import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import {
  ArrowLeft,
  CircleCheck,
  House,
  Leaf,
  ShieldCheck,
  Sprout,
  Bug,
  Rat,
  Sparkles,
  CalendarCheck,
  ShieldAlert,
  Star,
  Quote,
  CheckCircle2,
  Clock,
  Home,
  Building2,
  Sofa,
  Flame,
} from 'lucide-react';
import FaqAccordion from '@/components/FaqAccordion';
import ContactForm from '@/components/ContactForm';
import { servicesData } from '@/data/services';
import { cleaningServicesData } from '@/data/cleaning';
import { governoratesData } from '@/data/locations';
import { reviewsData, reviewsStats, getApprovedReviews } from '@/data/reviews';
import { COMPANY_INFO } from '@/data/company';

export const metadata: Metadata = {
  title: 'افضل شركة مكافحة حشرات وقوارض بالكويت مرخصة | ديمو كلين',
  description: 'أفضل شركة مكافحة حشرات وقوارض في الكويت. إبادة الصراصير، البق، والفئران بمبيدات ألمانية مرخصة من وزارة الصحة. كفالة 6 شهور وخدمة 24/7.',
  openGraph: {
    title: 'افضل شركة مكافحة حشرات وقوارض بالكويت مرخصة | ديمو كلين',
    description: 'أفضل شركة مكافحة حشرات وقوارض في الكويت. إبادة الصراصير، البق، والفئران بمبيدات ألمانية مرخصة من وزارة الصحة. كفالة 6 شهور وخدمة 24/7.',
    images: [{ url: '/demo-clean-identity.webp', width: 1200, height: 630, alt: 'ديمو كلين لمكافحة الحشرات بالكويت' }]
  },
  alternates: {
    canonical: 'https://democlean-kuwait.com',
  }
};

const homeFaqs = [
  {
    question: 'ما أنواع الحشرات والآفات التي تشملها خدمات ديمو كلين في الكويت؟',
    answer: 'نغطي كافة أنواع الآفات المنزلية والتجارية: الصراصير الألمانية والأمريكية، بق الفراش، النمل الأبيض (الأرضة)، الفئران والجرذان، النمل الأسود، الحشرات الطائرة (الذباب والبعوض)، بالإضافة لخدمات التعقيم والتطهير البيئي الشاملة.',
  },
  {
    question: 'هل يجب مغادرة المنزل أثناء عمليات الرش أو إفراغ دواليب المطبخ؟',
    answer: 'لا داعي لمغادرة المنزل أو إفراغ الأواني في غالبية الخدمات؛ حيث نعتمد على الجل الألماني المتقدم والمبيدات الميكروكبسولية عديمة الرائحة المعتمدة من وزارة الصحة، وهي آمنة تماماً على الأطفال وكبار السن والحيوانات الأليفة.',
  },
  {
    question: 'هل تغطي خدمات ديمو كلين جميع محافظات ومناطق الكويت؟',
    answer: 'نعم، نمتلك أسطولاً من السيارات المجهزة وفرقاً فنية متمركزة في محافظات الكويت الست: العاصمة، حولي، الفروانية، مبارك الكبير، الأحمدي، والجهراء، ونصل إلى أي منطقة خلال 30 إلى 45 دقيقة كحد أقصى.',
  },
  {
    question: 'ما هي مدة الكفالة التي تقدمونها على خدمات المكافحة؟',
    answer: 'جميع الشغل مكفول؛ نقدم كفالة 6 شهور من تاريخ المكافحة لجميع الأعمال والخدمات مع التزام تام بالزيارات والمتابعة المجانية الفورية طوال فترة الكفالة، بالإضافة لضمانات ممتدة لرش الدفان الإنشائي قبل البناء.',
  },
  {
    question: 'كيف يمكنني حجز موعد عاجل للمعاينة والرش؟',
    answer: 'يمكنك الاتصال مباشرة برقم الطوارئ الموحد، أو مراسلتنا عبر الواتساب، أو تعبئة نموذج طلب المعاينة بالموقع، وسيقوم فريقنا بالتنسيق معك وتحديد موعد الزيارة فوراً في نفس اليوم.',
  },
];

const serviceIcons: Record<string, React.ReactNode> = {
  cockroaches: <Bug size={24} />,
  bedbugs: <ShieldAlert size={24} />,
  termites: <ShieldAlert size={24} />,
  rodents: <Rat size={24} />,
  'preventive-spraying': <CalendarCheck size={24} />,
  disinfection: <Sparkles size={24} />,
};

export default function HomePage() {
  const reviews = getApprovedReviews();
  return (
    <>
      {/* 1. Hero Section */}
      <section className="hero" id="home">
        <div className="container hero-layout">
          <div className="hero-copy">
            <span className="eyebrow">شركة ديمو كلين للتنظيف وإبادة الحشرات في الكويت</span>
            <h1>
              نظافة شاملة وإبادة فورية،<br />
              <em>بضمان حقيقي يريح بالك.</em>
            </h1>
            <p>
              في ديمو كلين، نجمع بين خدمات التنظيف العميق للفلل والمنازل والمفروشات بأحدث الماكينات الإيطالية، ونظام المكافحة المتكاملة (IPM) بمبيدات ألمانية مرخصة من وزارة الصحة، لنمنح منزلك ومنشأتك بيئة نقية وصحية خالية من الآفات تماماً.
            </p>
            <div className="hero-actions">
              <Link className="button-primary" href="/contact">
                <span>اطلب معاينة فورية</span>
                <ArrowLeft size={16} />
              </Link>
              <Link className="button-outline" href="/cleaning-services">
                <span>خدمات التنظيف</span>
              </Link>
              <Link className="button-outline" href="/services">
                <span>مكافحة الحشرات</span>
              </Link>
            </div>
            <div className="hero-note">
              <ShieldCheck size={18} />
              <span>مبيدات معتمدة من وزارة الصحة وكفالة رسمية موثقة</span>
            </div>
          </div>

          <div className="hero-art" aria-label="ملصق هوية ديمو كلين الكويت">
            <div className="orbit" aria-hidden="true" />
            <Leaf className="floating-leaf leaf-one" size={28} aria-hidden="true" />
            <Sprout className="floating-leaf leaf-two" size={32} aria-hidden="true" />
            <div className="poster-frame">
              <Image
                src="/demo-clean-identity.webp"
                alt="ملصق ديمو كلين لمكافحة الحشرات والقوارض في الكويت"
                width={800}
                height={800}
                sizes="(max-width: 640px) 380px, (max-width: 1024px) 450px, 400px"
                priority
                loading="eager"
                fetchPriority="high"
                quality={80}
              />
            </div>
            <div className="poster-caption">
              <small>PROFESSIONAL CARE</small>
              <strong>DEMO CLEAN</strong>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Proof Strip */}
      <div className="proof-strip">
        <div className="container proof-inner">
          <div className="proof-item">
            <span className="proof-icon">
              <CircleCheck size={19} />
            </span>
            <div>
              <strong>فعالية ألمانية مثبتة</strong>
              <span>معالجة دقيقة تستهدف بؤرة الآفة من الجذور</span>
            </div>
          </div>
          <div className="proof-item">
            <span className="proof-icon">
              <Leaf size={19} />
            </span>
            <div>
              <strong>آمن 100% وبدون رائحة</strong>
              <span>مرخص من وزارة الصحة، آمن للرضع والحيوانات الأليفة ولا يحتاج لمغادرة المنزل</span>
            </div>
          </div>
          <div className="proof-item">
            <span className="proof-icon">
              <House size={19} />
            </span>
            <div>
              <strong>كفالة خطية 6 شهور</strong>
              <span>ضمان معتمد كتابياً ومتابعة مجانية فورية</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Intro Section */}
      <section className="section intro-section">
        <div className="container intro-layout">
          <div>
            <span className="eyebrow">رعاية تبدأ من أدق التفاصيل</span>
            <h2 className="section-heading">
              مساحة أنظف،<br />
              وطمأنينة تدوم لعائلتك.
            </h2>
            <div className="intro-stamp">
              <b>ديمو كلين — شريكك الموثوق في الكويت</b>
              رعاية متخصصة لإدارة ومكافحة الآفات من أول فحص تقييمي وحتى تعليمات السلامة والوقاية الممتدة.
            </div>
          </div>
          <div className="intro-text">
            <p>
              وجود الآفات لا يقتصر أثره على الإزعاج فحسب؛ بل يهدد راحة المنزل، سلامة الغذاء، وصحة أطفالك. لذلك لا نعتمد في ديمو كلين على الرش العشوائي، بل نتبع منهجية علمية تبدأ بتحديد فصيلة الحشرة وأسباب دخولها.
            </p>
            <p>
              نستخدم مركبات متطورة تقضي على الأطوار المختلفة للآفة (من البيوض إلى الحشرات البالغة) دون تلويث الهواء أو ترك أي روائح كريهة، لتستمتع ببيئة نظيفة ومريحة بكل أمان.
            </p>
            <Link className="inline-link" href="/about">
              <span>تعرّف على خبراتنا ومعايير الأمان</span>
              <ArrowLeft size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Core Services Section */}
      <section className="section services-section" id="services">
        <div className="container">
          <div className="section-topline">
            <div>
              <span className="eyebrow">حلول متخصصة</span>
              <h2 className="section-heading">
                المعالجة المناسبة،<br />
                للمشكلة الفعلية.
              </h2>
            </div>
            <p className="section-copy">
              نقدم 6 خدمات تخصصية رئيسية تلبي كافة احتياجات الفلل، الشقق، المطاعم، والمنشآت التجارية في جميع مناطق الكويت.
            </p>
          </div>

          <div className="services-grid-6">
            {servicesData.map((svc, index) => {
              const isFirst = index === 0;
              return (
                <Link
                  key={svc.slug}
                  href={`/services/${svc.slug}`}
                  className={`service-card ${isFirst ? 'featured' : ''}`}
                >
                  <span className="service-card-badge">{svc.badge}</span>
                  <span className="service-index">0{index + 1} / SERVICE</span>
                  <span className="service-icon">
                    {serviceIcons[svc.slug] || <Bug size={24} />}
                  </span>
                  <h3>{svc.title}</h3>
                  <p>{svc.shortDescription}</p>
                  <div className="service-footer">
                    <span className="service-price">يبدأ من {svc.priceStartingFrom}</span>
                    <span className="service-arrow">
                      <span>التفاصيل</span>
                      <ArrowLeft size={14} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4.5. Professional Cleaning Services Showcase */}
      <section className="section" style={{ background: '#f5f4ed' }} id="cleaning-services" dir="rtl">
        <div className="container">
          <div className="section-topline">
            <div>
              <span className="eyebrow">خدمات النظافة المتكاملة</span>
              <h2 className="section-heading">
                قسم التنظيف الاحترافي،<br />
                بأحدث الماكينات الإيطالية.
              </h2>
            </div>
            <p className="section-copy">
              تنظيف شامل وعميق للمنازل والفلل، غسيل الكنب والسجاد بالبخار، تنظيف ما بعد البناء والتشطيب، وتنظيف المنشآت التجارية والمطاعم بأعلى معايير النظافة والتعقيم.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '22px', marginTop: '30px' }}>
            {cleaningServicesData.map((svc, idx) => (
              <div
                key={svc.slug}
                style={{
                  background: '#ffffff',
                  borderRadius: '12px',
                  padding: '26px',
                  border: '1px solid #dce2d6',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 4px 18px rgba(24, 53, 75, 0.04)',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                    <div
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '10px',
                        background: '#eef4e8',
                        color: '#46782b',
                        display: 'grid',
                        placeItems: 'center',
                      }}
                    >
                      {svc.iconName === 'Home' && <Home size={24} />}
                      {svc.iconName === 'Building2' && <Building2 size={24} />}
                      {svc.iconName === 'Sofa' && <Sofa size={24} />}
                      {svc.iconName === 'Flame' && <Flame size={24} />}
                      {svc.iconName === 'Sparkles' && <Sparkles size={24} />}
                    </div>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        background: '#19364c',
                        color: '#f5f4ed',
                        padding: '3px 9px',
                        borderRadius: '999px',
                      }}
                    >
                      {svc.badge}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#17334a', marginBottom: '8px' }}>
                    {svc.title}
                  </h3>
                  <p style={{ fontSize: '13px', color: '#687771', lineHeight: '1.7', marginBottom: '16px' }}>
                    {svc.shortDescription}
                  </p>

                  <div style={{ borderTop: '1px dashed #e1e7db', paddingTop: '12px', marginBottom: '16px' }}>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {svc.features.slice(0, 2).map((f, i) => (
                        <li key={i} style={{ fontSize: '12px', color: '#445650', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <CheckCircle2 size={13} style={{ color: '#54883a', flexShrink: 0 }} />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div style={{ borderTop: '1px solid #edf0ea', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '11px', color: '#4a5550', display: 'block' }}>يبدأ من</span>
                    <strong style={{ fontSize: '16px', color: '#19364c' }}>{svc.priceStartingFrom}</strong>
                  </div>
                  <Link
                    href={`/cleaning-services/${svc.slug}`}
                    className="button-primary"
                    style={{ padding: '7px 14px', fontSize: '12px' }}
                    aria-label={`تفاصيل خدمة ${svc.title}`}
                  >
                    <span>تفاصيل الخدمة</span>
                    <ArrowLeft size={13} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <Link href="/cleaning-services" className="button-outline" style={{ display: 'inline-flex', padding: '12px 28px' }}>
              <span>عرض الدليل الشامل لخدمات التنظيف</span>
              <ArrowLeft size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Approach Section */}
      <section className="section approach-section" id="approach">
        <div className="container approach-layout">
          <div className="approach-visual" aria-hidden="true">
            <div className="approach-visual-mark">
              <Sprout size={50} strokeWidth={1.4} />
            </div>
          </div>
          <div>
            <span className="eyebrow">نهج واضح واحترافي</span>
            <h2 className="section-heading">
              احترافية في العمل،<br />
              وعناية في الأثر.
            </h2>
            <p className="section-copy">
              كل مكان له طبيعته الهندسية واحتياجه الخاص. لهذا نلتزم بمسار عمل من 3 خطوات يوازن بين الفعالية القصوى والسلامة التامة.
            </p>
            <div className="steps">
              <div className="step">
                <span className="step-number">01</span>
                <div>
                  <h3>الفحص الدقيق وتحديد بؤر الإصابة (Inspection)</h3>
                  <p>معاينة هندسية شاملة لمناطق الرطوبة، الشقوق، وفتحات التفتيش لتشخيص نوع الآفة بدقة وتحديد مصدرها الأساسي ومستوى الإصابة.</p>
                </div>
              </div>
              <div className="step">
                <span className="step-number">02</span>
                <div>
                  <h3>المعالجة الموجهة الآمنة (Targeted Treatment)</h3>
                  <p>استخدام المبيدات الميكروكبسولية والجل الألماني المعتمد من وزارة الصحة للقضاء على الحشرات من الجذور دون روائح، آمنة تماماً للأطفال والحيوانات الأليفة وبدون مغادرة المنزل.</p>
                </div>
              </div>
              <div className="step">
                <span className="step-number">03</span>
                <div>
                  <h3>الحماية الوقائية الممتدة (Preventive Protection)</h3>
                  <p>تسليم شهادة الكفالة المكتوبة وتقديم استشارات لإغلاق المداخل لمنع تكرار المشكلة خاصة مع شدة حرارة الصيف في الكويت، لضمان نتائج مستدامة.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Coverage Section (Clean Governorates & Areas Grid) */}
      <section className="section coverage-section" id="coverage">
        <div className="container">
          <div className="section-topline">
            <div>
              <span className="eyebrow">من شمال الكويت إلى جنوبها</span>
              <h2 className="section-heading">
                قريبون منك،<br />
                في كل محافظة ومنطقة.
              </h2>
            </div>
            <p className="section-copy">
              تغطي خدمات ديمو كلين كافة محافظات الكويت الست مع طواقم متخصصة وسيارات مجهزة للوصول خلال 30 دقيقة. اختر محافظتك لاستعراض كافة المناطق المخدومة:
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            {governoratesData.map((gov) => (
              <div
                key={gov.id}
                style={{
                  background: '#fff',
                  border: '1px solid #dce2d6',
                  borderRadius: '12px',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  boxShadow: '0 4px 16px rgba(23, 53, 74, 0.04)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '8px',
                        background: '#204733',
                        color: '#b4d78b',
                        display: 'grid',
                        placeItems: 'center',
                        fontWeight: 800,
                        fontSize: '13px',
                      }}
                    >
                      {gov.number}
                    </div>
                    <div>
                      <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#17354a' }}>
                        محافظة {gov.name}
                      </h3>
                      <span style={{ fontSize: '11px', color: '#4a5550' }}>{gov.nameEn}</span>
                    </div>
                  </div>
                  <span
                    style={{
                      background: '#eef5e7',
                      color: '#2a5534',
                      padding: '4px 10px',
                      borderRadius: '20px',
                      fontSize: '11.5px',
                      fontWeight: 700,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <Clock size={12} style={{ color: '#54883a' }} />
                    {gov.responseTime}
                  </span>
                </div>

                <p style={{ margin: 0, fontSize: '13px', color: '#5a6b64', lineHeight: 1.8 }}>
                  {gov.subtitle}
                </p>

                {/* Clickable Area Chips for SEO & Fast navigation */}
                <div style={{ marginTop: '4px', borderTop: '1px dashed #e4e7de', paddingTop: '12px' }}>
                  <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#4a5b54', marginBottom: '8px' }}>
                    المناطق المخدومة ({gov.areas.length} مناطق):
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {gov.areas.map((area) => (
                      <Link
                        key={area.slug}
                        href={`/coverage/${gov.slug}/${area.slug}`}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          padding: '4px 10px',
                          background: '#f4f7ef',
                          border: '1px solid #dce4d4',
                          borderRadius: '16px',
                          fontSize: '11.5px',
                          fontWeight: 600,
                          color: '#254a38',
                          textDecoration: 'none',
                        }}
                      >
                        {area.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <div style={{ marginTop: 'auto', paddingTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #edf0e7' }}>
                  <Link
                    href={`/coverage/${gov.slug}`}
                    className="inline-link"
                    style={{ margin: 0, fontSize: '12.5px', fontWeight: 700 }}
                  >
                    <span>دليل محافظة {gov.name} بالكامل</span>
                    <ArrowLeft size={13} />
                  </Link>
                  <a
                    href={COMPANY_INFO.phoneTel}
                    style={{
                      color: '#54883a',
                      fontSize: '12px',
                      fontWeight: 700,
                      textDecoration: 'none',
                    }}
                  >
                    طلب فني فوراً
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <Link href="/coverage" className="button-primary">
              <span>عرض الدليل الشامل لجميع مناطق ومحافظات الكويت</span>
              <ArrowLeft size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Reviews Strip */}
      <section className="section" style={{ background: '#faf9f4' }}>
        <div className="container">
          <div className="section-topline">
            <div>
              <span className="eyebrow">آراء عملاء الكويت</span>
              <h2 className="section-heading">
                ثقة مبنية على<br />
                نتائج حقيقية وتجارب موثوقة.
              </h2>
            </div>
            <p className="section-copy">
              تجارب حقيقية موثقة من أصحاب المنازل والشركات في محافظات الكويت بعد تنفيذ عمليات مكافحة الحشرات والقوارض.
            </p>
          </div>

          {reviews.length === 0 ? (
            <div
              style={{
                background: '#fff',
                border: '1px solid #e1e4d8',
                padding: '36px 20px',
                borderRadius: '12px',
                textAlign: 'center',
                maxWidth: '560px',
                margin: '0 auto',
              }}
            >
              <div style={{ fontSize: '32px', marginBottom: '10px' }}>⭐</div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#18354b', margin: '0 0 6px' }}>
                رأي عملائنا هو فخرنا وشهادتنا
              </h3>
              <p style={{ fontSize: '13px', color: '#687770', margin: '0 0 18px', lineHeight: 1.7 }}>
                نفخر بتقديم خدمات مكافحة الحشرات لجميع مناطق الكويت بكفالة 6 شهور معتمدة. هل تعاملت معنا مؤخراً؟
              </p>
              <Link href="/review" className="button-primary">
                <span>أضف تقييمك ورأيك بالخدمة</span>
                <ArrowLeft size={14} />
              </Link>
            </div>
          ) : (
            <>
              <div className="cards-auto-grid">
                {reviews.slice(0, 3).map((review) => (
                  <div
                    key={review.id}
                    style={{
                      background: '#fff',
                      border: '1px solid #e1e4d8',
                      padding: '24px',
                      borderRadius: '10px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div>
                        <strong style={{ fontSize: '15px', color: '#18354b' }}>{review.authorName}</strong>
                        <div style={{ fontSize: '11px', color: '#4a5550', marginTop: '2px' }}>
                          {review.governorateName} — {review.areaName}
                        </div>
                      </div>
                      <div style={{ display: 'flex', color: '#f59e0b' }}>
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star key={i} size={15} fill="currentColor" />
                        ))}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#4d7a33', background: '#eef4e6', padding: '3px 8px', borderRadius: '4px', width: 'fit-content' }}>
                        <CheckCircle2 size={12} />
                        <span>خدمة: {review.serviceName}</span>
                      </div>

                      {review.source === 'google' ? (
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '10.5px', color: '#1a73e8', background: '#e8f0fe', padding: '2px 7px', borderRadius: '4px', fontWeight: 700 }}>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                          </svg>
                          <span>Google Maps</span>
                        </div>
                      ) : (
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '10.5px', color: '#204733', background: '#f0f5ee', padding: '2px 7px', borderRadius: '4px', fontWeight: 600 }}>
                          <span>الموقع</span>
                        </div>
                      )}
                    </div>

                    <p style={{ margin: 0, fontSize: '13px', lineHeight: '1.85', color: '#586663' }}>
                      "{review.comment}"
                    </p>
                  </div>
                ))}
              </div>

              <div style={{ textAlign: 'center', marginTop: '30px' }}>
                <Link href="/reviews" className="button-outline">
                  <span>عرض جميع تقييمات العملاء</span>
                  <ArrowLeft size={14} />
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* 8. FAQ Section */}
      <section className="section faq-section" id="faq">
        <div className="container faq-layout">
          <div>
            <span className="eyebrow">إجابات واضحة وموثوقة</span>
            <h2 className="section-heading">
              أسئلة شائعة قد<br />
              تخطر في بالك.
            </h2>
            <p className="section-copy">
              جمعنا لك أهم الأسئلة حول طرق الرش والمبيدات المستخدمة والأمان الصحي والضمان في الكويت.
            </p>
            <div style={{ marginTop: '24px' }}>
              <Link href="/faq" className="inline-link">
                <span>تصفح كافة الأسئلة الشائعة</span>
                <ArrowLeft size={15} />
              </Link>
            </div>
          </div>

          <div>
            <FaqAccordion items={homeFaqs} />
          </div>
        </div>
      </section>

      {/* 9. Contact Section */}
      <section className="section contact-section" id="contact">
        <div className="container contact-layout">
          <div>
            <span className="eyebrow">تواصل مباشر</span>
            <h2 className="section-heading">
              دعنا نفهم احتياج المكان<br />
              ونؤمن لك الحل الجذري.
            </h2>
            <p className="section-copy">
              أخبرنا بطبيعة المكان ونوع المشكلة وسنقوم بالاتصال بك فوراً لترتيب المعاينة في الوقت المناسب لك.
            </p>

            <div className="contact-brand" style={{ direction: 'rtl' }}>
              <Image
                src="/logo-light.webp"
                alt="شعار ديمو كلين"
                width={85}
                height={85}
                sizes="85px"
                style={{
                  height: '80px',
                  width: 'auto',
                  maxHeight: '80px',
                  objectFit: 'contain',
                  display: 'block',
                  borderRadius: '0 !important',
                  border: 'none !important',
                }}
              />
              <div style={{ marginRight: '10px' }}>
                <strong style={{ display: 'block', fontSize: '15px' }}>DEMO CLEAN</strong>
                <span style={{ fontSize: '12px', opacity: 0.85 }}>ديمو كلين · الكويت</span>
              </div>
            </div>

            <div className="contact-quick-actions">
              <a href={COMPANY_INFO.phoneTel} className="contact-quick-item">
                <ShieldCheck size={18} />
                <div>
                  <strong>اتصال مباشر بمسؤول الفرقة</strong>
                  <div style={{ fontSize: '12px', opacity: 0.8 }}>{COMPANY_INFO.phone} — 24 ساعة يومياً</div>
                </div>
              </a>
              <a
                href={COMPANY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-quick-item"
              >
                <Leaf size={18} />
                <div>
                  <strong>محادثة فورية على واتساب</strong>
                  <div style={{ fontSize: '12px', opacity: 0.8 }}>رد سريع عبر {COMPANY_INFO.phone}</div>
                </div>
              </a>
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
