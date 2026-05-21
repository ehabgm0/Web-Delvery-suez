import { NextRequest, NextResponse } from 'next/server';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader || authHeader !== 'Bearer SUEZ-DELIVERY-PARTNER-2026') {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Unauthorized', 
          message: 'يجب توفير مفتاح الـ API الصحيح في ترويسة الطلب Authorization: Bearer SUEZ-DELIVERY-PARTNER-2026' 
        },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { phone, displayName, email, initialBalance } = body;

    if (!phone || !displayName) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Bad Request', 
          message: 'يرجى تقديم رقم الهاتف والاسم بالكامل (phone, displayName).' 
        },
        { status: 400 }
      );
    }

    const userRef = doc(db, 'users', phone);
    const userSnap = await getDoc(userRef);

    let finalBalance = Number(initialBalance) || 0;
    let isNew = true;

    if (userSnap.exists()) {
      const existingData = userSnap.data();
      finalBalance = (existingData.balance || 0) + finalBalance;
      isNew = false;
      
      await updateDoc(userRef, {
        displayName,
        email: email || existingData.email || '',
        balance: finalBalance,
        updatedAt: new Date().toISOString()
      });
    } else {
      await setDoc(userRef, {
        phone,
        displayName,
        email: email || '',
        balance: finalBalance,
        role: 'customer',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }

    return NextResponse.json({
      success: true,
      phone,
      displayName,
      balance: finalBalance,
      role: 'customer',
      message: isNew 
        ? 'تم تسجيل العميل وتفعيل محفظته برصيد أولي بنجاح.' 
        : 'العميل مسجل مسبقاً، تم تحديث البيانات وشحن الرصيد المضاف بنجاح.'
    });

  } catch (error: any) {
    console.error('API Customer Onboarding failed: ', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal Server Error', 
        message: error.message || 'فشل معالجة حساب العميل.' 
      },
      { status: 500 }
    );
  }
}
