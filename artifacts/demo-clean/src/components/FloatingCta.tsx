'use client';

import { Phone, MessageCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';

import { COMPANY_INFO } from '@/data/company';

export default function FloatingCta() {
  const pathname = usePathname();

  let message = 'مرحباً ديمو كلين، أود الاستفسار عن خدمات مكافحة الحشرات والقوارض في الكويت.';
  if (pathname.includes('/services/cockroaches')) {
    message = 'مرحباً ديمو كلين، أود حجز خدمة مكافحة الصراصير بالجل الألماني مع الضمان.';
  } else if (pathname.includes('/services/bedbugs')) {
    message = 'مرحباً ديمو كلين، أود الاستفسار عن علاج بق الفراش بالحرارة والمبيدات التخصصية.';
  } else if (pathname.includes('/services/termites')) {
    message = 'مرحباً ديمو كلين، أود الاستفسار عن فحص وحقن النمل الأبيض والأرضة بالضمان.';
  } else if (pathname.includes('/services/rodents')) {
    message = 'مرحباً ديمو كلين، أود طلب خدمة مكافحة الفئران والقوارض وسد المنافذ.';
  } else if (pathname.includes('/services/preventive-spraying')) {
    message = 'مرحباً ديمو كلين، أود الاستفسار عن عقود الرش الوقائي الدوري.';
  } else if (pathname.includes('/services/disinfection')) {
    message = 'مرحباً ديمو كلين، أود طلب خدمة التعقيم والتطهير البيئي بتقنية ULV.';
  } else if (pathname.includes('/coverage/')) {
    message = 'مرحباً ديمو كلين، أود الاستفسار عن توفر فريق المكافحة في منطقتنا وأقرب موعد للزيارة.';
  }

  const encodedMsg = encodeURIComponent(message);
  const whatsappUrl = `${COMPANY_INFO.whatsappUrl}?text=${encodedMsg}`;

  return (
    <aside className="floating-cta-container" aria-label="أزرار التواصل السريع">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-btn whatsapp"
        aria-label="تواصل فوري عبر واتساب"
      >
        <MessageCircle size={26} />
        <span className="btn-tooltip">محادثة واتساب مباشرة</span>
      </a>

      <a
        href={COMPANY_INFO.phoneTel}
        className="floating-btn phone"
        aria-label="اتصال هاتفي مباشر 24 ساعة"
      >
        <Phone size={24} />
        <span className="btn-tooltip">اتصال مباشر: {COMPANY_INFO.phone}</span>
      </a>
    </aside>
  );
}
