import { NextResponse } from 'next/server';
import { TELEGRAM_BOT_TOKEN, DEFAULT_TELEGRAM_CHAT_ID } from '@/lib/telegram';

export async function GET() {
  const chatId = process.env.TELEGRAM_CHAT_ID || DEFAULT_TELEGRAM_CHAT_ID;
  return NextResponse.json({
    success: true,
    bot: '@democlean_assistant_bot',
    connected: Boolean(chatId),
    chatId: chatId ? String(chatId) : null,
  });
}
