import { NextResponse } from 'next/server';
import {
  getPricePackages,
  savePricePackage,
  updatePricePackage,
  deletePricePackage,
  reorderPricePackages,
} from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const activeOnly = searchParams.get('activeOnly') === 'true';
    const prices = getPricePackages(!activeOnly);
    return NextResponse.json({ success: true, prices });
  } catch (error) {
    console.error('Error fetching prices:', error);
    return NextResponse.json({ success: false, message: 'فشل جلب باقات الأسعار' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, price } = body;

    if (!title || typeof title !== 'string' || title.trim().length < 2) {
      return NextResponse.json(
        { success: false, message: 'يرجى إدخال اسم الباقة بشكل صحيح' },
        { status: 400 }
      );
    }

    if (!price || typeof price !== 'string' || price.trim().length === 0) {
      return NextResponse.json(
        { success: false, message: 'يرجى تحديد السعر' },
        { status: 400 }
      );
    }

    let featuresArray: string[] = [];
    if (Array.isArray(body.features)) {
      featuresArray = body.features.map((f: any) => String(f).trim()).filter(Boolean);
    } else if (typeof body.features === 'string') {
      featuresArray = body.features.split('\n').map((f: string) => f.trim().replace(/^[-*•]\s*/, '')).filter(Boolean);
    }

    const newPackage = savePricePackage({
      title: title.trim(),
      subtitle: (body.subtitle || '').trim(),
      price: price.trim(),
      unit: (body.unit || 'دينار كويتي (يبدأ من)').trim(),
      currency: 'KWD',
      badge: (body.badge || '').trim(),
      popular: Boolean(body.popular),
      status: body.status === 'hidden' ? 'hidden' : 'active',
      slug: (body.slug || 'pest-control').trim(),
      warrantyMonths: Number(body.warrantyMonths) || 6,
      features: featuresArray,
    });

    return NextResponse.json(
      { success: true, package: newPackage, message: 'تم حفظ باقة السعر بنجاح' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating price package:', error);
    return NextResponse.json({ success: false, message: 'حدث خطأ أثناء حفظ الباقة' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();

    // Check if reordering
    if (Array.isArray(body.reorder)) {
      const success = reorderPricePackages(body.reorder);
      return NextResponse.json({ success, message: success ? 'تم تحديث الترتيب' : 'فشل تحديث الترتيب' });
    }

    const { id, ...updates } = body;
    if (!id) {
      return NextResponse.json({ success: false, message: 'معرف الباقة مطلوب' }, { status: 400 });
    }

    if (updates.features && typeof updates.features === 'string') {
      updates.features = updates.features.split('\n').map((f: string) => f.trim().replace(/^[-*•]\s*/, '')).filter(Boolean);
    }

    const updated = updatePricePackage(id, updates);
    if (!updated) {
      return NextResponse.json({ success: false, message: 'الباقة غير موجودة' }, { status: 404 });
    }

    return NextResponse.json({ success: true, package: updated, message: 'تم تحديث الباقة بنجاح' });
  } catch (error) {
    console.error('Error updating price package:', error);
    return NextResponse.json({ success: false, message: 'فشل تحديث باقة السعر' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, message: 'معرف الباقة مطلوب للحذف' }, { status: 400 });
    }

    const success = deletePricePackage(id);
    if (!success) {
      return NextResponse.json({ success: false, message: 'الباقة غير موجودة أو تعذر حذفها' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'تم حذف باقة السعر بنجاح' });
  } catch (error) {
    console.error('Error deleting price package:', error);
    return NextResponse.json({ success: false, message: 'فشل حذف باقة السعر' }, { status: 500 });
  }
}
