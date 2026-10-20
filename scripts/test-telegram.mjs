import https from 'https';

const token = process.env.TELEGRAM_BOT_TOKEN || '8831150430:AAEBlt_dCYxXgcFRsTUgYHQ-fBXar9oEATU';

async function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function main() {
  console.log('--- فحص بوت تليجرام ديمو كلين ---');
  try {
    const me = await fetchJson(`https://api.telegram.org/bot${token}/getMe`);
    console.log('بيانات البوت:', me);

    const updates = await fetchJson(`https://api.telegram.org/bot${token}/getUpdates`);
    console.log('الرسائل الأخيرة (Updates):', JSON.stringify(updates, null, 2));

    if (updates.result && updates.result.length > 0) {
      const latest = updates.result[updates.result.length - 1];
      const chat = latest.message?.chat || latest.my_chat_member?.chat || latest.channel_post?.chat;
      console.log('تم العثور على محادثة! Chat ID:', chat?.id, 'الاسم:', chat?.first_name || chat?.title);
    } else {
      console.log('تنبيه: لم يقم أحد بالضغط على Start أو إرسال رسالة للبوت حتى الآن.');
    }
  } catch (err) {
    console.error('خطأ أثناء الفحص:', err);
  }
}

main();
