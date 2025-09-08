import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

function ClickCapture({ onChange }:{ onChange: (c:{lat:number;lng:number})=>void }) {
  useMapEvents({
    click(e) {
      onChange({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
}

export function MapPicker({ value, onChange }:{
  value: {lat:number;lng:number} | null;
  onChange: (v:{lat:number;lng:number})=>void;
}) {
  const center = value ?? { lat: -15.6010, lng: -56.0974 }; // Cuiabá/MT approx
  return (
    <div className="h-64">
      <MapContainer center={[center.lat, center.lng]} zoom={12} style={{height:'100%', width:'100%'}}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
        <ClickCapture onChange={onChange}/>
        {value && <Marker position={[value.lat, value.lng]} />}
      </MapContainer>
    </div>
  );
}