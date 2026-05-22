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
    const { phone, displayName, vehicleType, isOnline, status } = body;

    if (!phone || !displayName) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Bad Request', 
          message: 'يرجى تقديم رقم الهاتف والاسم بالكامل للكابتن (phone, displayName).' 
        },
        { status: 400 }
      );
    }

    const captainRef = doc(db, 'users', phone);
    const captainSnap = await getDoc(captainRef);

    const isOnlineVal = isOnline !== undefined ? Boolean(isOnline) : true;
    const statusVal = status || 'approved';
    const vehicle = vehicleType || 'motorcycle';

    let isNew = true;

    if (captainSnap.exists()) {
      isNew = false;
      await updateDoc(captainRef, {
        displayName,
        vehicleType: vehicle,
        isOnline: isOnlineVal,
        status: statusVal,
        role: 'captain',
        updatedAt: new Date().toISOString()
      });
    } else {
      await setDoc(captainRef, {
        id: phone,
        uid: phone, // keep consistent with User entity
        phone,
        displayName,
        vehicleType: vehicle,
        isOnline: isOnlineVal,
        status: statusVal,
        role: 'captain',
        lat: 29.966, // Initial default coordinate in Suez city center
        lng: 32.549,
        heading: 0,
        speed: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }

    return NextResponse.json({
      success: true,
      phone,
      displayName,
      vehicleType: vehicle,
      isOnline: isOnlineVal,
      status: statusVal,
      message: isNew 
        ? 'تم تسجيل الكابتن الجديد بنجاح وإدراجه في قائمة الانتظار الذكية لطلبات السويس.' 
        : 'تم العثور على الكابتن مسجلاً مسبقاً، وتحديث بياناته وحالته بنجاح.'
    });

  } catch (error: any) {
    console.error('API Captain Onboarding failed: ', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal Server Error', 
        message: error.message || 'فشل تسجيل/تحديث بيانات الطيار.' 
      },
      { status: 500 }
    );
  }
}
