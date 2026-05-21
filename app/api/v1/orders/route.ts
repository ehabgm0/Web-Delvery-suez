import { NextRequest, NextResponse } from 'next/server';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function POST(req: NextRequest) {
  try {
    // 1. Check Authorization header
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

    // 2. Parse request body
    const body = await req.json();
    const { pickup, dropoff, details, customerName, customerPhone, expectedPrice } = body;

    // Validate inputs
    if (!pickup || !dropoff || !details || !customerName) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Bad Request', 
          message: 'يرجى تزويد كافة الحقول المطلوبة (pickup, dropoff, details, customerName)' 
        },
        { status: 400 }
      );
    }

    // 3. Generate structured unique Suez Order ID
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const orderId = `ORD-${randomSuffix}`;

    // Host url configuration
    const host = req.headers.get('host') || 'delivery-suez.online';
    const protocol = host.includes('localhost') || host.includes('127.0.0.1') ? 'http' : 'https';
    const trackingUrl = `${protocol}://${host}/track/${orderId}`;

    // 4. Create document in Firestore "orders" collection
    const orderRef = doc(db, 'orders', orderId);
    
    // Initial Captain default coords near Suez city center
    const initialCaptainLat = pickup.lat || 29.966;
    const initialCaptainLng = pickup.lng || 32.549;

    await setDoc(orderRef, {
      id: orderId,
      status: 'searching',
      customerName,
      customerPhone: customerPhone || '0100000000',
      customerId: 'api_partner_system',
      details,
      initialPrice: Number(expectedPrice) || 20,
      pickup: {
        lat: Number(pickup.lat) || 29.966,
        lng: Number(pickup.lng) || 32.549,
        address: pickup.address || 'السويس'
      },
      dropoff: {
        lat: Number(dropoff.lat) || 29.972,
        lng: Number(dropoff.lng) || 32.532,
        address: dropoff.address || 'حي السلام، السويس'
      },
      captainName: 'في انتظار قبول كابتن من شبكة دليفري السويس...',
      captainPhone: '01022679250', // Customer support desk
      captainLocation: {
        lat: initialCaptainLat - 0.005, // simulated some km away
        lng: initialCaptainLng - 0.005
      },
      createdAt: new Date().toISOString()
    });

    return NextResponse.json({
      success: true,
      orderId,
      trackingUrl,
      status: 'searching',
      message: 'تم إدراج طلبك في شبكة الطيارين الميدانية بنجاح.'
    });

  } catch (error: any) {
    console.error('API Order creation failed: ', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal Server Error', 
        message: error.message || 'فشل تسجيل الطلب لأسباب فنية داخلية.' 
      },
      { status: 500 }
    );
  }
}
