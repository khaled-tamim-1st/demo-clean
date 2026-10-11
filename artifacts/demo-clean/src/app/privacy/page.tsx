import React from 'react';
import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'سياسة الخصوصية | ديمو كلين لمكافحة الحشرات',
  description: 'سياسة الخصوصية لشركة ديمو كلين لمكافحة الحشرات والقوارض في الكويت. تعرف على كيفية جمعنا واستخدامنا وحمايتنا لبياناتك الشخصية.',
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'سياسة الخصوصية' },
        ]}
      />
      
      <section className="section" style={{ background: '#f8fafc', padding: '60px 0' }} dir="rtl">
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', background: '#fff', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
            <h1 style={{ fontSize: '32px', color: '#1e293b', marginBottom: '24px', textAlign: 'center' }}>سياسة الخصوصية</h1>
            <p style={{ color: '#64748b', marginBottom: '32px', textAlign: 'center' }}>آخر تحديث: {new Date().toLocaleDateString('ar-EG')}</p>
            
            <div style={{ lineHeight: '1.8', color: '#334155', fontSize: '16px' }}>
              <h2 style={{ fontSize: '22px', color: '#0f172a', marginTop: '32px', marginBottom: '16px' }}>1. مقدمة</h2>
              <p style={{ marginBottom: '16px' }}>
                نحن في ديمو كلين ("نحن"، "لنا"، أو "الشركة") نقدر خصوصيتك ونلتزم بحماية بياناتك الشخصية. توضح سياسة الخصوصية هذه كيفية جمع واستخدام وحماية المعلومات التي تقدمها لنا عند استخدام موقعنا الإلكتروني أو خدماتنا.
              </p>

              <h2 style={{ fontSize: '22px', color: '#0f172a', marginTop: '32px', marginBottom: '16px' }}>2. المعلومات التي نجمعها</h2>
              <p style={{ marginBottom: '16px' }}>قد نجمع الأنواع التالية من المعلومات:</p>
              <ul style={{ paddingRight: '20px', marginBottom: '16px' }}>
                <li style={{ marginBottom: '8px' }}>المعلومات الشخصية: مثل الاسم، رقم الهاتف، العنوان، والبريد الإلكتروني عند طلب خدماتنا أو تعبئة نموذج الاتصال.</li>
                <li style={{ marginBottom: '8px' }}>معلومات الموقع: لتحديد مكان تقديم الخدمة في محافظات الكويت.</li>
                <li style={{ marginBottom: '8px' }}>معلومات تقنية: مثل عنوان IP، نوع المتصفح، ومعلومات الجهاز المستخدم للوصول إلى موقعنا.</li>
              </ul>

              <h2 style={{ fontSize: '22px', color: '#0f172a', marginTop: '32px', marginBottom: '16px' }}>3. كيف نستخدم معلوماتك</h2>
              <p style={{ marginBottom: '16px' }}>نستخدم المعلومات التي نجمعها للأغراض التالية:</p>
              <ul style={{ paddingRight: '20px', marginBottom: '16px' }}>
                <li style={{ marginBottom: '8px' }}>تقديم خدمات مكافحة الحشرات وإدارة المواعيد.</li>
                <li style={{ marginBottom: '8px' }}>التواصل معك بخصوص طلباتك واستفساراتك.</li>
                <li style={{ marginBottom: '8px' }}>تحسين جودة خدماتنا وتجربة المستخدم على موقعنا.</li>
                <li style={{ marginBottom: '8px' }}>إرسال إشعارات هامة تتعلق بالخدمات أو العروض (يمكنك إلغاء الاشتراك في أي وقت).</li>
              </ul>

              <h2 style={{ fontSize: '22px', color: '#0f172a', marginTop: '32px', marginBottom: '16px' }}>4. حماية البيانات ومشاركتها</h2>
              <p style={{ marginBottom: '16px' }}>
                نحن نتخذ إجراءات أمنية صارمة لحماية بياناتك من الوصول غير المصرح به. لا نقوم ببيع أو تأجير معلوماتك الشخصية لأطراف ثالثة. قد نشارك بياناتك فقط مع الجهات القانونية المختصة في دولة الكويت إذا تطلب القانون ذلك، أو مع شركاء الخدمة الموثوقين الذين يساعدوننا في تشغيل موقعنا وتقديم خدماتنا (مع التزامهم بالسرية التامة).
              </p>

              <h2 style={{ fontSize: '22px', color: '#0f172a', marginTop: '32px', marginBottom: '16px' }}>5. حقوقك</h2>
              <p style={{ marginBottom: '16px' }}>
                لك الحق في الوصول إلى معلوماتك الشخصية التي نحتفظ بها، وطلب تصحيحها أو حذفها. يمكنك ممارسة هذه الحقوق عن طريق الاتصال بنا.
              </p>

              <h2 style={{ fontSize: '22px', color: '#0f172a', marginTop: '32px', marginBottom: '16px' }}>6. اتصل بنا</h2>
              <p style={{ marginBottom: '16px' }}>
                إذا كانت لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى التواصل معنا عبر:
              </p>
              <ul style={{ paddingRight: '20px', marginBottom: '16px' }}>
                <li style={{ marginBottom: '8px' }}>الهاتف: 67088755</li>
                <li style={{ marginBottom: '8px' }}>البريد الإلكتروني: info@democlean-kuwait.com</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
