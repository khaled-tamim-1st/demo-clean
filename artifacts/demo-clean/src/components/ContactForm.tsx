'use client';

import { useState, type FormEvent } from 'react';
import { ArrowLeft, CheckCircle2, AlertCircle, Loader2, MessageCircle, PhoneCall } from 'lucide-react';
import { servicesData } from '@/data/services';
import { cleaningServicesData } from '@/data/cleaning';
import { governoratesData } from '@/data/locations';
import { COMPANY_INFO } from '@/data/company';

interface ContactFormProps {
  defaultServiceSlug?: string;
  defaultGovernorateSlug?: string;
  defaultNotes?: string;
  defaultMessage?: string;
}

export default function ContactForm({
  defaultServiceSlug,
  defaultGovernorateSlug,
  defaultNotes,
  defaultMessage,
}: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [leadReceipt, setLeadReceipt] = useState<{ id?: number | string; message?: string } | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    governorate: defaultGovernorateSlug || '',
    service: defaultServiceSlug || '',
    notes: defaultNotes || defaultMessage || '',
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const safeGov = formData.governorate || defaultGovernorateSlug || 'الكويت (عام)';
    const safeService = formData.service || defaultServiceSlug || 'مكافحة حشرات عامة';
    const payload = {
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      governorate: safeGov,
      service: safeService,
      notes: formData.notes.trim(),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'فشل إرسال الطلب، يرجى التحقق من صحة البيانات المدخلة.');
      }

      setLeadReceipt({
        id: result.lead?.id || result.data?.id,
        message: result.message,
      });

      if (typeof window !== 'undefined') {
        try {
          const leadData = result.lead || result.data || {
            id: Math.floor(10000 + Math.random() * 90000),
            name: payload.name,
            phone: payload.phone,
            governorate: safeGov,
            service: safeService,
            notes: payload.notes,
            status: 'new',
            createdAt: new Date().toISOString(),
          };
          const existing = JSON.parse(localStorage.getItem('democlean_local_leads') || '[]');
          existing.unshift(leadData);
          localStorage.setItem('democlean_local_leads', JSON.stringify(existing.slice(0, 50)));
        } catch {
          // Ignore storage error
        }
      }

      setSubmitted(true);
    } catch (err: any) {
      setErrorMessage(
        err.message || `تعذر الاتصال بالخادم، يرجى المحاولة لاحقاً أو الاتصال المباشر على ${COMPANY_INFO.phone}.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const getWhatsAppLeadLink = () => {
    const safeGov = formData.governorate || defaultGovernorateSlug || 'الكويت';
    const safeService = formData.service || defaultServiceSlug || 'مكافحة حشرات عامة';
    const text = 
      `السلام عليكم، أود تأكيد طلب المعاينة في ديمو كلين:\n` +
      `• الاسم: ${formData.name}\n` +
      `• الهاتف: ${formData.phone}\n` +
      `• الخدمة: ${safeService}\n` +
      `• المحافظة: ${safeGov}\n` +
      (formData.notes ? `• تفاصيل الطلب: ${formData.notes}\n` : '') +
      (leadReceipt?.id ? `• رقم تتبع الطلب: #${leadReceipt.id}` : '');
    return `https://wa.me/96567088755?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="contact-form" dir="rtl">
      <div className="form-heading">
        <strong>حجز موعد ومعاينة مجانية</strong>
        <span>رد فوري خلال 15 دقيقة</span>
      </div>

      {submitted ? (
        <div className="form-notice" style={{ background: '#eef8eb', borderColor: '#9ecc87' }} role="status">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#27521c', fontWeight: 700, marginBottom: '6px' }}>
            <CheckCircle2 size={22} style={{ color: '#388e3c' }} />
            <span style={{ fontSize: '15px' }}>تم تسجيل طلب المعاينة بنجاح!</span>
          </div>
          {leadReceipt?.id && (
            <div style={{ fontSize: '12px', color: '#2d5a1e', fontWeight: 700, marginBottom: '8px' }}>
              رقم تتبع الطلب: #{leadReceipt.id}
            </div>
          )}
          <p style={{ margin: '0 0 14px', color: '#3f5637', fontSize: '13.5px', lineHeight: 1.6 }}>
            شكراً لتواصلك يا <strong>{formData.name || 'عميلنا العزيز'}</strong>. لتسريع خروج الفريق الفني لموقعك، اضغط على الزر أدناه لتأكيد موقعك عبر واتساب فوراً:
          </p>

          <a
            href={getWhatsAppLeadLink()}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              background: '#25D366',
              border: 'none',
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '14px',
              width: '100%',
              padding: '13px 18px',
              borderRadius: '10px',
              marginBottom: '10px',
              textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(37,211,102,0.35)',
              transition: 'all 0.2s ease',
            }}
          >
            <MessageCircle size={20} />
            <span>تأكيد الحجز والموقع عبر واتساب (رد فوري)</span>
          </a>

          <a
            href={`tel:${COMPANY_INFO.phone}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              background: '#ffffff',
              border: '1px solid #c2d6b7',
              color: '#284d32',
              fontWeight: 700,
              fontSize: '13px',
              width: '100%',
              padding: '10px 16px',
              borderRadius: '8px',
              marginBottom: '14px',
              textDecoration: 'none',
            }}
          >
            <PhoneCall size={16} />
            <span>اتصال مباشر بفني ديمو كلين ({COMPANY_INFO.phone})</span>
          </a>

          <button
            type="button"
            className="button-primary"
            style={{ padding: '7px 14px', fontSize: '12px', background: 'transparent', color: '#4d6945', border: '1px solid #c6dbc0' }}
            onClick={() => {
              setSubmitted(false);
              setLeadReceipt(null);
              setFormData({ name: '', phone: '', governorate: '', service: '', notes: '' });
            }}
          >
            إرسال طلب آخر
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {errorMessage && (
            <div
              style={{
                background: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: '6px',
                padding: '10px 12px',
                marginBottom: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#b91c1c',
                fontSize: '13px',
              }}
              role="alert"
            >
              <AlertCircle size={16} style={{ flex: 'none' }} />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="form-grid">
            <div className="field">
              <label htmlFor="client-name">الاسم الكريم *</label>
              <input
                id="client-name"
                name="name"
                required
                disabled={isSubmitting}
                placeholder="مثال: بدر العتيبي"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                autoComplete="name"
              />
            </div>

            <div className="field">
              <label htmlFor="client-phone">رقم الهاتف (الكويت) *</label>
              <input
                id="client-phone"
                name="phone"
                type="tel"
                required
                disabled={isSubmitting}
                dir="ltr"
                placeholder={COMPANY_INFO.phone}
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                autoComplete="tel"
              />
            </div>

            <div className="field">
              <label htmlFor="client-governorate">المحافظة *</label>
              <select
                id="client-governorate"
                name="governorate"
                required
                disabled={isSubmitting}
                value={formData.governorate}
                onChange={(e) => setFormData({ ...formData, governorate: e.target.value })}
              >
                <option value="" disabled>اختر المحافظة</option>
                {governoratesData.map((gov) => (
                  <option key={gov.slug} value={gov.slug}>
                    {gov.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="client-service">نوع الخدمة المطلوبة *</label>
              <select
                id="client-service"
                name="service"
                required
                disabled={isSubmitting}
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              >
                <option value="" disabled>اختر نوع الخدمة</option>
                <optgroup label="── خدمات التنظيف الشامل ──">
                  {cleaningServicesData.map((svc) => (
                    <option key={`clean-${svc.slug}`} value={`تنظيف: ${svc.title}`}>
                      {svc.title}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="── مكافحة وإبادة الحشرات ──">
                  {servicesData.map((svc) => (
                    <option key={svc.slug} value={svc.slug}>
                      {svc.title}
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>

            <div className="field full">
              <label htmlFor="client-notes">تفاصيل المشكلة ونوع المكان (شقة، فيلا، مطعم...)</label>
              <textarea
                id="client-notes"
                name="notes"
                disabled={isSubmitting}
                placeholder="اذكر نوع الحشرة أو المشكلة والوقت المفضل للزيارة..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>
          </div>

          <div className="form-footer">
            <span className="form-disclaimer">
              بياناتك مشفرة ومحمية بالكامل وتستخدم فقط لترتيب موعد المعالجة.
            </span>
            <button
              className="button-primary form-submit"
              type="submit"
              disabled={isSubmitting}
              style={{ opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  <span>جارٍ تسجيل الطلب...</span>
                </>
              ) : (
                <>
                  <span>تأكيد طلب المعاينة</span>
                  <ArrowLeft size={15} />
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
