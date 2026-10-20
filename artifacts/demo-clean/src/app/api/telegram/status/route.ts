import { NextResponse } from 'next/server';
import { TELEGRAM_BOT_TOKEN } from '@/lib/telegram';

export async function GET() {
  const chatId = process.env.TELEGRAM_CHAT_ID || null;
  return NextResponse.json({
    success: true,
    bot: '@democlean_assistant_bot',
    connected: Boolean(chatId),
    chatId: chatId ? String(chatId) : null,
  });
}
