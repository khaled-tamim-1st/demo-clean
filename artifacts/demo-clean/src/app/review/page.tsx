'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Star,
  CheckCircle2,
  ShieldCheck,
  Send,
  ArrowRight,
  PhoneCall,
  MessageCircle,
} from 'lucide-react';
import { COMPANY_INFO } from '@/data/company';

const GOVERNORATES = [
  'العاصمة',
  'حولي',
  'الفروانية',
  'مبارك الكبير',
  'الأحمدي',
  'الجهراء',
];

const SERVICES = [
  'مكافحة الصراصير (جل أدفايون وبوسيدون)',
  'مكافحة بق الفراش (بالحرارة والرش المعتمد)',
  'مكافحة النمل الأبيض والأرضة المدمر للأثاث',
  'مكافحة الفئران، البيرعصي، والعقارب والسوس',
  'الرش الوقائي الدوري للحشرات الزاحفة والطائرة',
  'التعقيم والتطهير البيئي المتكامل',
  'خدمة مكافحة أخرى',
];

export default function ReviewSubmitPage() {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [authorName, setAuthorName] = useState('');
  const [governorateName, setGovernorateName] = useState('حولي');
  const [areaName, setAreaName] = useState('');
  const [serviceName, setServiceName] = useState(SERVICES[0]);
  const [comment, setComment] = useState('');

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          authorName,
          governorateName,
          areaName: areaName.trim() || governorateName,
          serviceName,
          rating,
          comment,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setErrorMessage(data.message || 'حدث خطأ أثناء إرسال التقييم.');
      }
    } catch (err) {
      console.error('Error submitting review:', err);
      setErrorMessage('تعذر الاتصال بالخادم، يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '85vh', background: '#f5f4ee', padding: '40px 16px' }} dir="rtl">
      <div style={{ maxWidth: '640px', margin: '0 auto' }}>
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              textDecoration: 'none',
              marginBottom: '16px',
            }}
          >
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                background: '#204733',
                color: '#b4d78b',
                display: 'grid',
                placeItems: 'center',
                fontWeight: 900,
                fontSize: '20px',
              }}
            >
              د
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '18px', fontWeight: 900, color: '#17354a', display: 'block', lineHeight: 1.1 }}>
                ديمو كلين الكويت
              </span>
              <small style={{ fontSize: '11px', color: '#687770' }}>مكافحة الحشرات والقوارض المعتمدة</small>
            </div>
          </Link>

          <h1 style={{ fontSize: '24px', fontWeight: 900, color: '#17354a', margin: '0 0 8px' }}>
            تقييم مستوى الخدمة ورأيك يهمنا
          </h1>
          <p style={{ fontSize: '14px', color: '#63736b', margin: 0, lineHeight: 1.7 }}>
            يسعدنا جداً مشاركتك لتجربتك مع فريق ديمو كلين لنستمر في تقديم أعلى معايير الجودة والكفالة في الكويت.
          </p>
        </div>

        {/* Card Form */}
        <div
          style={{
            background: '#fff',
            borderRadius: '16px',
            border: '1px solid #dce2d6',
            padding: '32px 28px',
            boxShadow: '0 8px 30px rgba(23, 53, 74, 0.05)',
          }}
        >
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '24px 8px' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: '#e8f5e9',
                  color: '#2e7d32',
                  display: 'grid',
                  placeItems: 'center',
                  margin: '0 auto 18px',
                }}
              >
                <CheckCircle2 size={36} />
              </div>

              <h2 style={{ fontSize: '22px', fontWeight: 900, color: '#17354a', marginBottom: '10px' }}>
                شكراً جزيلاً لك على تقييمك!
              </h2>
              <p style={{ fontSize: '14px', color: '#55655d', lineHeight: 1.8, marginBottom: '24px' }}>
                تم استلام رأيك بنجاح، وسيتم اعتماده ونشره في الموقع خلال وقت قصير. شهادتك محل اعتزاز وتقدير لكافة طاقم وفنيي ديمو كلين. نسعد دائماً بخدمتك ونتمنى لك دوام الراحة والسلامة.
              </p>

              <div
                style={{
                  background: '#f8faf6',
                  borderRadius: '10px',
                  padding: '14px',
                  border: '1px solid #e1e7dc',
                  fontSize: '13px',
                  color: '#42534a',
                  marginBottom: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                <ShieldCheck size={18} color="#2e7d32" />
                <span>كفالة الـ 6 شهور سارية المفعول طوال مدة الضمان</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <Link
                  href="/reviews"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '11px 22px',
                    background: '#204733',
                    color: '#fff',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontWeight: 700,
                    fontSize: '13px',
                  }}
                >
                  <span>مشاهدة آراء العملاء بالموقع</span>
                  <ArrowRight size={15} />
                </Link>
                <Link
                  href="/"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '11px 22px',
                    background: '#eef3ea',
                    color: '#204733',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontWeight: 700,
                    fontSize: '13px',
                    border: '1px solid #cad6c2',
                  }}
                >
                  العودة للرئيسية
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {errorMessage && (
                <div
                  style={{
                    background: '#fef2f2',
                    border: '1px solid #fecaca',
                    color: '#b91c1c',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    fontSize: '13px',
                  }}
                >
                  {errorMessage}
                </div>
              )}

              {/* Star Rating Picker */}
              <div style={{ textAlign: 'center', padding: '8px 0 16px', borderBottom: '1px solid #edf0e7' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 700, color: '#17354a', marginBottom: '10px' }}>
                  ما هو تقييمك العام لخدمتنا؟
                </label>
                <div style={{ display: 'inline-flex', gap: '8px', direction: 'ltr' }}>
                  {[1, 2, 3, 4, 5].map((star) => {
                    const isFilled = (hoverRating || rating) >= star;
                    return (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '4px',
                          color: isFilled ? '#f59e0b' : '#d1d5db',
                          transition: 'transform 0.15s',
                        }}
                      >
                        <Star size={34} fill={isFilled ? '#f59e0b' : 'none'} strokeWidth={1.5} />
                      </button>
                    );
                  })}
                </div>
                <div style={{ fontSize: '13px', color: '#4d5d54', fontWeight: 600, marginTop: '6px' }}>
                  {rating === 5 && 'ممتاز جداً 🌟'}
                  {rating === 4 && 'جيد جداً 👍'}
                  {rating === 3 && 'جيد'}
                  {rating === 2 && 'مقبول'}
                  {rating === 1 && 'يحتاج لتحسين'}
                </div>
              </div>

              {/* Author Name */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#253e34', marginBottom: '6px' }}>
                  الاسم الكريم: <span style={{ color: '#dc2626' }}>*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="مثال: فهد الشمري / أم فهد"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '8px',
                    border: '1px solid #cad6c2',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                  }}
                />
              </div>

              {/* Governorate and Area */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#253e34', marginBottom: '6px' }}>
                    المحافظة:
                  </label>
                  <select
                    value={governorateName}
                    onChange={(e) => setGovernorateName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '8px',
                      border: '1px solid #cad6c2',
                      fontSize: '14px',
                      fontFamily: 'inherit',
                      background: '#fff',
                    }}
                  >
                    {GOVERNORATES.map((gov) => (
                      <option key={gov} value={gov}>
                        {gov}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#253e34', marginBottom: '6px' }}>
                    المنطقة / الحي:
                  </label>
                  <input
                    type="text"
                    placeholder="مثال: السالمية / الروضة / صباح الأحمد"
                    value={areaName}
                    onChange={(e) => setAreaName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '8px',
                      border: '1px solid #cad6c2',
                      fontSize: '14px',
                      fontFamily: 'inherit',
                    }}
                  />
                </div>
              </div>

              {/* Service Type */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#253e34', marginBottom: '6px' }}>
                  الخدمة التي تم تنفيذها: <span style={{ color: '#dc2626' }}>*</span>
                </label>
                <select
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '8px',
                    border: '1px solid #cad6c2',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                    background: '#fff',
                  }}
                >
                  {SERVICES.map((svc) => (
                    <option key={svc} value={svc}>
                      {svc}
                    </option>
                  ))}
                </select>
              </div>

              {/* Review Comment */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#253e34', marginBottom: '6px' }}>
                  رأيك وتجربتك بالخدمة والمعاملة: <span style={{ color: '#dc2626' }}>*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="اكتب انطباعك عن تعامل الفني، نتيجة المكافحة، الالتزام بالموعد، ونظافة العمل..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '8px',
                    border: '1px solid #cad6c2',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                    resize: 'vertical',
                    lineHeight: 1.7,
                  }}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '14px',
                  background: '#204733',
                  color: '#fff',
                  borderRadius: '10px',
                  border: 'none',
                  fontSize: '15px',
                  fontWeight: 800,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.7 : 1,
                  marginTop: '6px',
                }}
              >
                <Send size={16} />
                <span>{loading ? 'جارٍ إرسال التقييم...' : 'إرسال التقييم الآن'}</span>
              </button>

              <p style={{ textAlign: 'center', fontSize: '12px', color: '#7a8881', margin: 0 }}>
                تقييمك يساعدنا على التطوير المستمر وحفظ حقوق الكفالة لجميع عملائنا.
              </p>
            </form>
          )}
        </div>

        {/* Support Direct Contact Footer */}
        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <p style={{ fontSize: '13px', color: '#687770', margin: '0 0 10px' }}>
            لديك أي ملاحظة أو استفسار بخصوص الكفالة؟ تواصل معنا مباشرة:
          </p>
          <div style={{ display: 'inline-flex', gap: '14px', alignItems: 'center' }}>
            <a
              href={COMPANY_INFO.phoneTel}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                color: '#204733',
                fontSize: '13px',
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              <PhoneCall size={14} />
              <span style={{ direction: 'ltr' }}>{COMPANY_INFO.phone}</span>
            </a>
            <span style={{ color: '#c4cec3' }}>|</span>
            <a
              href={COMPANY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                color: '#25D366',
                fontSize: '13px',
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              <MessageCircle size={15} />
              <span>واتساب 24 ساعة</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
