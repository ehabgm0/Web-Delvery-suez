'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const LeafletMap = dynamic(() => import('./LeafletMap'), { 
  ssr: false,
  loading: () => <div className="h-full w-full bg-slate-100 flex items-center justify-center font-bold text-slate-400">جاري تحميل الخريطة...</div>
});

interface Location {
  lat: number;
  lng: number;
}

interface TrackingMapProps {
  pickup: Location;
  dropoff: Location;
  captainLocation?: Location;
  status: string;
}

export default function TrackingMap({ pickup, dropoff, captainLocation, status }: TrackingMapProps) {
  return (
    <div className="h-full w-full rounded-3xl overflow-hidden shadow-inner bg-slate-100 border border-slate-200">
      <LeafletMap pickup={pickup} dropoff={dropoff} captainLocation={captainLocation} />
    </div>
  );
}
