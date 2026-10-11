import { NextResponse } from 'next/server';
import { addReview } from '@/lib/db';

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
