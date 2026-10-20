import { NextResponse } from 'next/server';
import { TELEGRAM_BOT_TOKEN, escapeHtml } from '@/lib/telegram';

export async function GET() {
  try {
    const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUpdates?offset=-5`);
    const data = await res.json();
    if (!data.ok) {
      return NextResponse.json(
        { success: false, message: 'فشل جلب تحديثات تيليجرام: ' + (data.description || '') },
        { status: 500 }
      );
    }

    const results = data.result || [];
    if (results.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'لم يتم العثور على أي رسائل جديدة. يرجى فتح البوت @democlean_assistant_bot والضغط على Start أولاً.',
        },
        { status: 404 }
      );
    }

    const latest = results[results.length - 1];
    const chat = latest.message?.chat || latest.my_chat_member?.chat || latest.channel_post?.chat;
    if (!chat || !chat.id) {
      return NextResponse.json(
        { success: false, message: 'تعذر استخراج معرف المحادثة من الرسالة الأخيرة' },
        { status: 400 }
      );
    }

    const chatId = String(chat.id);
    const chatTitle = chat.title || [chat.first_name, chat.last_name].filter(Boolean).join(' ') || chat.username || 'مستخدم تليجرام';

    process.env.TELEGRAM_CHAT_ID = chatId;

    const testMsg = [
      `✅ <b>تم ربط إشعارات ديمو كلين بنجاح!</b>`,
      ``,
      `👤 <b>المستلم:</b> ${escapeHtml(chatTitle)} (<code>${chatId}</code>)`,
      `🛎 <b>الخدمات المفعلة:</b>`,
      `• إشعارات طلبات المعاينة والحجوزات الفورية 🚨`,
      `• إشعارات تقييمات وآراء العملاء الجديدة ⭐`,
      `• الطلبات المسجلة من لوحة التحكم 📋`,
      ``,
      `⚡ <i>النظام متصل وجاهز للعمل على مدار الساعة!</i>`,
    ].join('\n');

    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: testMsg,
        parse_mode: 'HTML',
      }),
    });

    return NextResponse.json({
      success: true,
      chatId,
      chatTitle,
      message: `تم ربط البوت بنجاح مع (${chatTitle}) وتم إرسال رسالة ترحيبية وتأكيدية!`,
    });
  } catch (err) {
    console.error('Telegram sync error:', err);
    return NextResponse.json(
      { success: false, message: 'حدث خطأ أثناء مزامنة تيليجرام' },
      { status: 500 }
    );
  }
}
