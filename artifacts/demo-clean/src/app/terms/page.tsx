import React from 'react';
import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'الشروط والأحكام',
  description: 'الشروط والأحكام لشركة ديمو كلين لمكافحة الحشرات والقوارض في الكويت. القواعد والضوابط المنظمة لتقديم خدماتنا وضمان الكفالة المعتمد.',
  alternates: {
    canonical: 'https://democleankw.com/terms',
  },
  openGraph: {
    title: 'الشروط والأحكام | ديمو كلين الكويت',
    description: 'تعرف على الشروط والأحكام وسياسات الضمان والخدمة في ديمو كلين الكويت.',
    url: 'https://democleankw.com/terms',
    type: 'website',
    images: ['/og-image.jpg'],
  },
};

export default function TermsPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'الشروط والأحكام' },
        ]}
      />
      
      <section className="section" style={{ background: '#f8fafc', padding: '60px 0' }} dir="rtl">
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', background: '#fff', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
            <h1 style={{ fontSize: '32px', color: '#1e293b', marginBottom: '24px', textAlign: 'center' }}>الشروط والأحكام</h1>
            <p style={{ color: '#64748b', marginBottom: '32px', textAlign: 'center' }}>آخر تحديث: {new Date().toLocaleDateString('ar-EG')}</p>
            
            <div style={{ lineHeight: '1.8', color: '#334155', fontSize: '16px' }}>
              <h2 style={{ fontSize: '22px', color: '#0f172a', marginTop: '32px', marginBottom: '16px' }}>1. قبول الشروط</h2>
              <p style={{ marginBottom: '16px' }}>
                باستخدامك لموقع وخدمات "ديمو كلين"، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي جزء من هذه الشروط، يرجى عدم استخدام خدماتنا.
              </p>

              <h2 style={{ fontSize: '22px', color: '#0f172a', marginTop: '32px', marginBottom: '16px' }}>2. الخدمات والضمان</h2>
              <p style={{ marginBottom: '16px' }}>
                نقدم خدمات مكافحة الحشرات والقوارض باستخدام مواد مرخصة من وزارة الصحة في الكويت. نقدم ضماناً (كفالة) على بعض الخدمات كما هو موضح في فاتورة الخدمة أو العقد المبرم، ويخضع الضمان للالتزام بالتعليمات الوقائية المقدمة من الفني المختص.
              </p>

              <h2 style={{ fontSize: '22px', color: '#0f172a', marginTop: '32px', marginBottom: '16px' }}>3. المواعيد والإلغاء</h2>
              <p style={{ marginBottom: '16px' }}>
                نحرص على الالتزام بالمواعيد المحددة مع العملاء. في حال رغبتك بتأجيل أو إلغاء الموعد، نرجو إبلاغنا قبل 24 ساعة على الأقل من الموعد المقرر. يحق لنا تعديل الموعد في حالات الطوارئ مع إشعار العميل مسبقاً.
              </p>

              <h2 style={{ fontSize: '22px', color: '#0f172a', marginTop: '32px', marginBottom: '16px' }}>4. مسؤولية العميل</h2>
              <p style={{ marginBottom: '16px' }}>
                يلتزم العميل بتوفير بيئة آمنة لفريق العمل، وتسهيل الوصول إلى الأماكن المراد معالجتها. كما يلتزم باتباع كافة التعليمات الصحية والوقائية التي يوجهها الفني قبل وأثناء وبعد عملية الرش.
              </p>

              <h2 style={{ fontSize: '22px', color: '#0f172a', marginTop: '32px', marginBottom: '16px' }}>5. التعديلات على الشروط</h2>
              <p style={{ marginBottom: '16px' }}>
                نحتفظ بالحق في تعديل هذه الشروط والأحكام في أي وقت. سيتم نشر التغييرات على هذه الصفحة، ويعتبر استمرارك في استخدام خدماتنا بعد نشر التعديلات موافقة منك عليها.
              </p>

              <h2 style={{ fontSize: '22px', color: '#0f172a', marginTop: '32px', marginBottom: '16px' }}>6. القانون المطبق</h2>
              <p style={{ marginBottom: '16px' }}>
                تخضع هذه الشروط والأحكام وتفسر وفقاً للقوانين المعمول بها في دولة الكويت.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
