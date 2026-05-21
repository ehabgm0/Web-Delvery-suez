import { NextRequest, NextResponse } from 'next/server';
import { doc, getDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function POST(
  req: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
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

    const { id: captainId } = await props.params;
    if (!captainId) {
      return NextResponse.json(
        { success: false, error: 'Bad Request', message: 'يرجى تقديم معرّف الكابتن بشكل صحيح.' },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { lat, lng, speed, heading } = body;

    if (lat === undefined || lng === undefined) {
      return NextResponse.json(
        { success: false, error: 'Bad Request', message: 'يجب تقديم الإحداثيات الجغرافية (lat, lng).' },
        { status: 400 }
      );
    }

    // 1. Update Captain location in the "captains" collection
    const captainRef = doc(db, 'captains', captainId);
    const captainSnap = await getDoc(captainRef);

    const latVal = Number(lat);
    const lngVal = Number(lng);
    const speedVal = speed !== undefined ? Number(speed) : 0;
    const headingVal = heading !== undefined ? Number(heading) : 0;

    if (captainSnap.exists()) {
      await updateDoc(captainRef, {
        lat: latVal,
        lng: lngVal,
        speed: speedVal,
        heading: headingVal,
        updatedAt: new Date().toISOString()
      });
    }

    // 2. Propagate coordinates to any active orders assigned to this captain
    // Search in "orders" collection where status is not 'delivered'
    const ordersRef = collection(db, 'orders');
    const q = query(
      ordersRef,
      where('status', 'in', ['searching', 'accepted', 'picked_up'])
    );
    
    let activeOrdersUpdatedCount = 0;
    try {
      const querySnapshot = await getDocs(q);
      
      const updatePromises = querySnapshot.docs.map(async (orderDoc) => {
        const orderData = orderDoc.data();
        
        // Check if phone matches or customerName is related
        if (orderData.captainPhone === captainId || orderData.id === captainId) {
          activeOrdersUpdatedCount++;
          await updateDoc(orderDoc.ref, {
            captainLocation: {
              lat: latVal,
              lng: lngVal,
              speed: speedVal,
              heading: headingVal
            },
            updatedAt: new Date().toISOString()
          });
        }
      });

      await Promise.all(updatePromises);
    } catch (err) {
      console.warn('Could not propagate GPS stream to active orders automatically:', err);
    }

    return NextResponse.json({
      success: true,
      captainId,
      location: {
        lat: latVal,
        lng: lngVal,
        speed: speedVal,
        heading: headingVal
      },
      activeOrdersUpdated: activeOrdersUpdatedCount,
      message: 'تم استقبال بيانات الموقع الجغرافي وتحديث حالة الطيار على الخريطة بنجاح.'
    });

  } catch (error: any) {
    console.error('API Captain GPS streaming failed: ', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal Server Error', 
        message: error.message || 'فشل استقبال وبث إشارة الموقع.' 
      },
      { status: 500 }
    );
  }
}
