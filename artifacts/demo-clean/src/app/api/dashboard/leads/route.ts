import { NextResponse } from 'next/server';
import { getLeads, updateLeadStatus, deleteLead } from '@/lib/db';

export async function GET() {
  try {
    const leads = getLeads();
    return NextResponse.json({ success: true, leads });
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json({ success: false, message: 'فشل جلب الطلبات' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, status } = await request.json();
    if (!id || !status) {
      return NextResponse.json({ success: false, message: 'البيانات غير مكتملة' }, { status: 400 });
    }
    const updated = updateLeadStatus(id, status);
    if (!updated) {
      return NextResponse.json({ success: false, message: 'الطلب غير موجود' }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: 'تم تحديث حالة الطلب بنجاح' });
  } catch (error) {
    console.error('Error updating lead:', error);
    return NextResponse.json({ success: false, message: 'فشل التحديث' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, message: 'معرف الطلب مطلوب' }, { status: 400 });
    }
    const deleted = deleteLead(id);
    if (!deleted) {
      return NextResponse.json({ success: false, message: 'الطلب غير موجود' }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: 'تم حذف الطلب بنجاح' });
  } catch (error) {
    console.error('Error deleting lead:', error);
    return NextResponse.json({ success: false, message: 'فشل الحذف' }, { status: 500 });
  }
}
