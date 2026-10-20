import { NextResponse } from 'next/server';
import { addReview, getPublishedReviews } from '@/lib/db';

export async function GET() {
  const reviews = getPublishedReviews();
  return NextResponse.json({ success: true, reviews });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { authorName, governorateName, areaName, serviceName, rating, comment } = body;

    if (!authorName || !comment || !serviceName) {
      return NextResponse.json(
        { success: false, message: 'يرجى كتابة الاسم ونوع الخدمة ورأيك بالتجربة' },
        { status: 400 }
      );
    }

    const newRev = addReview({
      authorName: authorName.trim(),
      governorateName: governorateName || 'الكويت',
      areaName: areaName || 'عام',
      serviceName: serviceName || 'مكافحة حشرات',
      rating: Math.min(5, Math.max(1, Number(rating) || 5)),
      comment: comment.trim(),
      verified: true,
      source: 'website',
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
    });

    // Send instant Telegram Notification for new review with Approve/Reject buttons
    try {
      const { sendTelegramAlert, formatReviewMessage } = await import('@/lib/telegram');
      const reviewMarkup = {
        inline_keyboard: [
          [
            { text: '✅ قبول واعتماد التقييم', callback_data: `approve_rev_${newRev.id}` },
            { text: '❌ رفض التقييم', callback_data: `reject_rev_${newRev.id}` },
          ],
        ],
      };
      await sendTelegramAlert(
        formatReviewMessage({
          authorName: authorName.trim(),
          rating: Number(rating) || 5,
          serviceName: serviceName || 'مكافحة حشرات',
          governorateName,
          areaName,
          comment: comment.trim(),
          source: 'موقع ديمو كلين',
        }),
        undefined,
        reviewMarkup
      );
    } catch (telegramErr) {
      console.warn('Telegram alert error in reviews route:', telegramErr);
    }

    return NextResponse.json({
      success: true,
      review: newRev,
      message: 'شكراً لك! تم استلام تقييمك وإضافته بنجاح.',
    });
  } catch (error) {
    console.error('Error submitting public review:', error);
    return NextResponse.json(
      { success: false, message: 'حدث خطأ أثناء حفظ التقييم' },
      { status: 500 }
    );
  }
}
