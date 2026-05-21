import { NextRequest, NextResponse } from 'next/server';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function GET(
  req: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await props.params;
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Bad Request', message: 'يرجى تقديم رقم الطلب بشكل صحيح.' },
        { status: 400 }
      );
    }

    // 1. Fetch order from Firestore
    const orderRef = doc(db, 'orders', id);
    const snapshot = await getDoc(orderRef);

    if (!snapshot.exists()) {
      return NextResponse.json(
        { success: false, error: 'Not Found', message: `الطلب رقم ${id} غير مسجل لدينا أو تم حذفه.` },
        { status: 404 }
      );
    }

    const orderData = snapshot.data();
    let currentStatus = orderData.status || 'searching';
    let captainLocation = orderData.captainLocation || { lat: 29.966, lng: 32.549 };
    let captainName = orderData.captainName || 'في انتظار قبول كابتن...';
    let captainPhone = orderData.captainPhone || '01022679250';

    // 2. Perform automated progressive simulation based on time elapsed
    if (orderData.createdAt && currentStatus !== 'delivered' && currentStatus !== 'cancelled') {
      const createdDate = new Date(orderData.createdAt);
      const now = new Date();
      const elapsedSeconds = Math.floor((now.getTime() - createdDate.getTime()) / 1000);

      const pickup = orderData.pickup || { lat: 29.966, lng: 32.549 };
      const dropoff = orderData.dropoff || { lat: 29.972, lng: 32.532 };

      let statusChanged = false;

      if (elapsedSeconds >= 90) {
        // State: Delivered
        if (currentStatus !== 'delivered') {
          currentStatus = 'delivered';
          captainLocation = { lat: dropoff.lat, lng: dropoff.lng };
          captainName = 'كابتن محمد طارق (تم التوصيل ✔️)';
          statusChanged = true;
        }
      } else if (elapsedSeconds >= 45) {
        // State: Picked Up / On the way
        if (currentStatus !== 'picked_up') {
          currentStatus = 'picked_up';
          captainName = 'كابتن محمد طارق (على الطريق)';
          captainPhone = '0120000000';
          statusChanged = true;
        }
        // Interpolate location between pickup and dropoff
        // 45s is 0%, 90s is 100% of delivery run
        const ratio = (elapsedSeconds - 45) / 45; // 0 to 1
        const currentLat = pickup.lat + (dropoff.lat - pickup.lat) * ratio;
        const currentLng = pickup.lng + (dropoff.lng - pickup.lng) * ratio;
        captainLocation = { lat: currentLat, lng: currentLng };
        statusChanged = true;
      } else if (elapsedSeconds >= 15) {
        // State: Accepted / Heading to pickup
        if (currentStatus !== 'accepted') {
          currentStatus = 'accepted';
          captainName = 'كابتن محمد طارق (متجه لموقع الاستلام)';
          captainPhone = '0120000000';
          statusChanged = true;
        }
        // Interpolate location towards pickup location
        // 15s is 0%, 45s is 100% heading to pickup
        const ratio = (elapsedSeconds - 15) / 30; // 0 to 1
        const startLat = pickup.lat - 0.005;
        const startLng = pickup.lng - 0.005;
        const currentLat = startLat + (pickup.lat - startLat) * ratio;
        const currentLng = startLng + (pickup.lng - startLng) * ratio;
        captainLocation = { lat: currentLat, lng: currentLng };
        statusChanged = true;
      }

      // Update Firestore with the simulated progressive state so the client tracking map updates accordingly!
      if (statusChanged) {
        await updateDoc(orderRef, {
          status: currentStatus,
          captainLocation,
          captainName,
          captainPhone
        });
      }
    }

    // Calculating orientation heading and speed dynamically for premium tracking responses
    let heading = 125;
    let speed = 0; // m/s
    if (currentStatus === 'accepted') {
      speed = 7.5; // heading to pickup
    } else if (currentStatus === 'picked_up') {
      speed = 9.2; // heading to client
    }

    return NextResponse.json({
      success: true,
      orderId: id,
      status: currentStatus,
      captainLocation: {
        lat: captainLocation.lat,
        lng: captainLocation.lng,
        heading,
        speed
      },
      captainName,
      captainPhone,
      updatedAt: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('API Order status fetch failed: ', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error', message: error.message || 'فشل جلب تفاصيل الطلب.' },
      { status: 500 }
    );
  }
}
