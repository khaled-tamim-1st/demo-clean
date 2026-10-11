import { NextResponse } from 'next/server';
import { getReviews, addReview, deleteReview, updateReviewStatus } from '@/lib/db';

export async function GET() {
  try {
    const reviews = getReviews();
    return NextResponse.json({ success: true, reviews });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json({ success: false, message: 'فشل جلب التقييمات' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { authorName, governorateName, areaName, serviceName, rating, comment, source, date, status } = body;

    if (!authorName || !comment || !serviceName) {
      return NextResponse.json({ success: false, message: 'يرجى إكمال البيانات الأساسية للتقييم' }, { status: 400 });
    }

    const reviewSource = source === 'google' ? 'google' : 'website';
    const reviewStatus = status || (reviewSource === 'google' ? 'approved' : 'pending');

    const newRev = addReview({
      authorName: authorName.trim(),
      governorateName: governorateName || 'الكويت',
      areaName: areaName || 'عام',
      serviceName: serviceName || 'مكافحة حشرات',
      rating: Number(rating) || 5,
      comment: comment.trim(),
      verified: true,
      source: reviewSource,
      date: date || new Date().toISOString().split('T')[0],
      status: reviewStatus,
    });

    return NextResponse.json({ success: true, review: newRev, message: 'تمت إضافة التقييم بنجاح' }, { status: 201 });
  } catch (error) {
    console.error('Error adding review:', error);
    return NextResponse.json({ success: false, message: 'فشل إضافة التقييم' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ success: false, message: 'معرف التقييم والحالة مطلوبان' }, { status: 400 });
    }

    const updated = updateReviewStatus(id, status);

    if (!updated) {
      return NextResponse.json({ success: false, message: 'التقييم غير موجود' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'تم تحديث حالة التقييم بنجاح' });
  } catch (error) {
    console.error('Error updating review status:', error);
    return NextResponse.json({ success: false, message: 'فشل تحديث حالة التقييم' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, message: 'معرف التقييم مطلوب' }, { status: 400 });
    }
    const deleted = deleteReview(id);
    if (!deleted) {
      return NextResponse.json({ success: false, message: 'التقييم غير موجود' }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: 'تم حذف التقييم بنجاح' });
  } catch (error) {
    console.error('Error deleting review:', error);
    return NextResponse.json({ success: false, message: 'فشل الحذف' }, { status: 500 });
  }
}
