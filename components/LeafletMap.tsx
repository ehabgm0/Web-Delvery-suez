'use client';

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface Location {
  lat: number;
  lng: number;
}

interface LeafletMapProps {
  pickup: Location;
  dropoff: Location;
  captainLocation?: Location;
}

// Separate component for map controls (auto-zoom)
const MapControls = ({ pickup, dropoff, captainLocation }: { pickup: Location, dropoff: Location, captainLocation?: Location }) => {
  const map = useMap();

  React.useEffect(() => {
    if (!map) return;

    const bounds = L.latLngBounds([[pickup.lat, pickup.lng]]);
    bounds.extend([dropoff.lat, dropoff.lng]);
    if (captainLocation) {
      bounds.extend([captainLocation.lat, captainLocation.lng]);
    }
    
    map.fitBounds(bounds, { padding: [50, 50] });
  }, [map, pickup, dropoff, captainLocation]);

  return null;
};

export default function LeafletMap({ pickup, dropoff, captainLocation }: LeafletMapProps) {
  React.useEffect(() => {
    // Initialize Leaflet icons (custom fix for Leaflet with Next.js)
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });
  }, []);

  // Custom icon for captain
  const captainIcon = L.divIcon({
    className: 'custom-captain-icon',
    html: `
      <div class="relative">
        <div class="absolute inset-0 bg-brand/30 rounded-full animate-ping" style="width: 40px; height: 40px; margin: -10px"></div>
        <div class="relative p-2 bg-brand text-white rounded-full border-2 border-white shadow-xl flex items-center justify-center" style="width: 20px; height: 20px">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <path d="M10 17h4V5H2v12h3m10 0h2v-3.34a4 4 0 0 0-1.17-2.83L13 7h-2" />
                <circle cx="7.5" cy="17.5" r="2.5" />
                <circle cx="17.5" cy="17.5" r="2.5" />
            </svg>
        </div>
      </div>
    `,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });

  const pickupIcon = L.divIcon({
    className: 'pickup-icon',
    html: `<div class="w-4 h-4 bg-green-500 border-2 border-white rounded-full shadow-lg"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });

  const dropoffIcon = L.divIcon({
    className: 'dropoff-icon',
    html: `<div class="w-4 h-4 bg-red-500 border-2 border-white rounded-full shadow-lg"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });

  return (
    <MapContainer 
      center={[pickup.lat, pickup.lng]} 
      zoom={13} 
      style={{ height: '100%', width: '100%', zIndex: 0 }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      <Marker position={[pickup.lat, pickup.lng]} icon={pickupIcon}>
        <Popup>مكان الاستلام</Popup>
      </Marker>

      <Marker position={[dropoff.lat, dropoff.lng]} icon={dropoffIcon}>
        <Popup>مكان التسليم</Popup>
      </Marker>

      {captainLocation && (
        <Marker position={[captainLocation.lat, captainLocation.lng]} icon={captainIcon}>
          <Popup>موقع الطيار</Popup>
        </Marker>
      )}

      <MapControls pickup={pickup} dropoff={dropoff} captainLocation={captainLocation} />
    </MapContainer>
  );
}
