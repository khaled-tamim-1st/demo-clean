export const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8831150430:AAEBlt_dCYxXgcFRsTUgYHQ-fBXar9oEATU';

export function escapeHtml(text?: string | number | null): string {
  if (text === undefined || text === null) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function sendTelegramAlert(htmlText: string, chatIdOverride?: string | number): Promise<boolean> {
  try {
    const token = TELEGRAM_BOT_TOKEN;
    const chatId = chatIdOverride || process.env.TELEGRAM_CHAT_ID;
    if (!chatId) {
      console.warn('Telegram notification skipped: TELEGRAM_CHAT_ID not configured');
      return false;
    }

    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: htmlText,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    });

    const data = await response.json();
    return Boolean(data.ok);
  } catch (err) {
    console.error('Error sending Telegram alert:', err);
    return false;
  }
}

export function formatLeadMessage(lead: {
  id?: number | string;
  name: string;
  phone: string;
  governorate?: string;
  service?: string;
  notes?: string;
  source?: string;
}): string {
  const cleanPhone = String(lead.phone).replace(/[^0-9]/g, '');
  const kuwaitPhone = cleanPhone.startsWith('965') ? cleanPhone : `965${cleanPhone}`;
  const now = new Date().toLocaleString('ar-KW', { timeZone: 'Asia/Kuwait' });

  return [
    `🚨 <b>طلب معاينة وحجز جديد - ديمو كلين</b>`,
    ``,
    `👤 <b>الاسم:</b> ${escapeHtml(lead.name)}`,
    `📞 <b>الهاتف:</b> <code>${escapeHtml(lead.phone)}</code>`,
    `💬 <b>محادثة واتساب:</b> <a href="https://wa.me/${kuwaitPhone}">فتح المحادثة مباشرة</a>`,
    `📍 <b>المحافظة:</b> ${escapeHtml(lead.governorate || 'الكويت')}`,
    `🛠 <b>الخدمة المطلوبة:</b> ${escapeHtml(lead.service || 'مكافحة حشرات عامة')}`,
    lead.notes?.trim() ? `📝 <b>الملاحظات:</b> ${escapeHtml(lead.notes.trim())}` : null,
    lead.source ? `🌐 <b>المصدر:</b> ${escapeHtml(lead.source)}` : null,
    `⏰ <b>الوقت:</b> ${escapeHtml(now)}`,
  ]
    .filter(Boolean)
    .join('\n');
}

export function formatReviewMessage(review: {
  authorName: string;
  rating: number;
  serviceName: string;
  governorateName?: string;
  areaName?: string;
  comment: string;
  source?: string;
}): string {
  const stars = '⭐'.repeat(Math.min(5, Math.max(1, Number(review.rating) || 5)));
  const now = new Date().toLocaleString('ar-KW', { timeZone: 'Asia/Kuwait' });

  return [
    `🌟 <b>تقييم جديد من الموقع - ديمو كلين</b>`,
    ``,
    `👤 <b>صاحب التقييم:</b> ${escapeHtml(review.authorName)}`,
    `⭐️ <b>التقييم:</b> ${stars} (${review.rating}/5)`,
    `🛠 <b>الخدمة:</b> ${escapeHtml(review.serviceName)}`,
    `📍 <b>المنطقة:</b> ${escapeHtml(review.governorateName || 'الكويت')} - ${escapeHtml(review.areaName || 'عام')}`,
    `💬 <b>الرأي:</b> <i>"${escapeHtml(review.comment)}"</i>`,
    `🌐 <b>المصدر:</b> ${escapeHtml(review.source || 'الموقع الإلكتروني')}`,
    `⏰ <b>الوقت:</b> ${escapeHtml(now)}`,
  ].join('\n');
}
