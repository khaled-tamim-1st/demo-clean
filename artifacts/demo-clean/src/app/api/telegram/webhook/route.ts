import { NextResponse } from 'next/server';
import { TELEGRAM_BOT_TOKEN, escapeHtml } from '@/lib/telegram';
import { updateReviewStatus } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const update = await request.json();
    if (update?.callback_query) {
      const cq = update.callback_query;
      const cqId = cq.id;
      const data = cq.data || '';
      const message = cq.message;
      const chatId = message?.chat?.id;
      const messageId = message?.message_id;

      if (data.startsWith('approve_rev_') || data.startsWith('reject_rev_')) {
        const isApprove = data.startsWith('approve_rev_');
        const revId = data.replace('approve_rev_', '').replace('reject_rev_', '');

        updateReviewStatus(revId, isApprove ? 'approved' : 'rejected');

        // Acknowledge callback query
        await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/answerCallbackQuery`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            callback_query_id: cqId,
            text: isApprove ? '✅ تم اعتماد التقييم ونشره في الموقع بنجاح!' : '❌ تم رفض التقييم.',
            show_alert: true,
          }),
        });

        // Edit message in Telegram
        const originalText = message?.text || '';
        const badge = isApprove
          ? '✅ <b>[تم الاعتماد والنشر على الموقع]</b>'
          : '❌ <b>[تم الرفض ولم يُنشر]</b>';
        const newText = `${badge}\n\n${escapeHtml(originalText)}`;

        await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/editMessageText`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            message_id: messageId,
            text: newText,
            parse_mode: 'HTML',
            reply_markup: { inline_keyboard: [] },
          }),
        });

        return NextResponse.json({ success: true });
      }
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Webhook error:', err);
    return NextResponse.json({ ok: true });
  }
}
