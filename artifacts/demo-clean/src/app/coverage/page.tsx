import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Clock, ArrowLeft, ShieldCheck, Check } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { governoratesData } from '@/data/locations';

export const metadata: Metadata = {
  title: 'مناطق تغطية مكافحة الحشرات بالكويت',
  description: 'دليل مناطق تغطية ديمو كلين لمكافحة الحشرات في الكويت. نغطي العاصمة، حولي، الفروانية، الأحمدي، مبارك الكبير، والجهراء خلال 30 دقيقة بمبيدات معتمدة.',
  keywords: [
    'مكافحة حشرات الكويت',
    'مكافحة حشرات حولي',
    'شركة رش صراصير السالمية',
    'مكافحة بق الفراش الفروانية',
    'رش مبيدات الاحمدي',
    'مكافحة قوارض الجهراء',
    'رش حشرات العاصمة ومبارك الكبير',
  ],
  alternates: {
    canonical: 'https://democleankw.com/coverage',
  },
  openGraph: {
    title: 'مناطق تغطية مكافحة الحشرات بالكويت | ديمو كلين',
    description: 'تغطية شاملة لكافة محافظات ومناطق الكويت لمكافحة الآفات والحشرات على مدار 24 ساعة.',
    url: 'https://democleankw.com/coverage',
    type: 'website',
    images: ['/og-image.jpg'],
  },
};

export default function CoveragePage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'نطاق التغطية' }]} />

      <section className="page-header" dir="rtl">
        <div className="container">
          <div className="page-header-content">
            <span className="eyebrow" style={{ color: '#bee58f' }}>
              تغطية شاملة 24 ساعة
            </span>
            <h1>مناطق ونطاق تغطية ديمو كلين في الكويت</h1>
            <p>
              نحن في ديمو كلين (سجل تجاري #532627 ومبيدات معتمدة من وزارة الصحة) نمتلك شبكة محطات انطلاق وأسطول سيارات مجهزاً وموزعاً استراتيجياً بالقرب من الطرق السريعة (الدائري الرابع، الخامس، السادس، السابع وطريق الفحيحيل). نضمن سرعة وصول فرقنا الفنية خلال 30 دقيقة لكافة محافظات الكويت الست لتقديم إبادة فورية ووقائية معتمدة بضمان كتابي حقيقي.
            </p>
            <div className="page-header-meta">
              <span><Clock size={16} /> استجابة طوارئ خلال 30 دقيقة</span>
              <span><MapPin size={16} /> 6 محافظات وتغطية شاملة لكل منطقة</span>
              <span><ShieldCheck size={16} /> مبيدات آمنة (ترخيص صحي 14620/2025)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Governorates Coverage */}
      <section className="section" style={{ background: '#f0f7fe' }} dir="rtl">
        <div className="container">

          {/* Grid of all 6 Governorates */}
          <div className="section-topline">
            <div>
              <span className="eyebrow">دليل المحافظات</span>
              <h2 className="section-heading" style={{ fontSize: '28px' }}>
                محافظات الكويت الست بالتفصيل
              </h2>
            </div>
          </div>

          <div className="cards-auto-grid">
            {governoratesData.map((gov) => (
              <div
                key={gov.slug}
                style={{
                  background: '#fff',
                  border: '1px solid #e1e3da',
                  padding: '28px',
                  borderRadius: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: '#eef3e8',
                        color: '#559a35',
                        display: 'grid',
                        placeItems: 'center',
                        fontWeight: 800,
                        fontSize: '13px',
                      }}
                    >
                      {gov.number}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '19px', fontWeight: 700, margin: 0, color: '#1b3f5a' }}>
                        {gov.name}
                      </h3>
                      <span style={{ fontSize: '11px', color: '#798782' }}>{gov.nameEn}</span>
                    </div>
                  </div>
                  <span
                    style={{
                      background: '#edf3e8',
                      color: '#497433',
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '4px 10px',
                      borderRadius: '999px',
                    }}
                  >
                    {gov.responseTime}
                  </span>
                </div>

                <p style={{ margin: 0, fontSize: '13px', color: '#596967', lineHeight: 1.85 }}>
                  {gov.subtitle}
                </p>

                <div style={{ borderTop: '1px solid #edf0e6', paddingTop: '12px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#1e4663', marginBottom: '8px' }}>
                    المناطق والضواحي المشمولة:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {gov.areas.map((area) => (
                      <Link
                        key={area.slug}
                        href={`/coverage/${gov.slug}/${area.slug}`}
                        style={{
                          fontSize: '12px',
                          color: '#466f2f',
                          background: '#f2f6ee',
                          padding: '3px 9px',
                          borderRadius: '4px',
                          textDecoration: 'none',
                        }}
                      >
                        {area.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <div style={{ marginTop: 'auto', paddingTop: '14px', borderTop: '1px solid #edf0e6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '12px', color: '#7a8581' }}>{gov.areas.length} مناطق رئيسية</span>
                  <Link
                    href={`/coverage/${gov.slug}`}
                    className="service-arrow"
                    style={{ fontSize: '13px' }}
                  >
                    <span>صفحة المحافظة</span>
                    <ArrowLeft size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
