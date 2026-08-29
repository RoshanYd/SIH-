import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';

// Approximate coordinates for state/districts for mock display
const coordinates = {
  'Patna': [25.5941, 85.1376],
  'Gaya': [24.7914, 85.0002],
  'Agra': [27.1767, 78.0081],
  'Pune': [18.5204, 73.8567],
  'Nagpur': [21.1458, 79.0882],
  'Jaipur': [26.9124, 75.7873],
  'Bhopal': [23.2599, 77.4126],
  'Chennai': [13.0827, 80.2707],
  'Bengaluru': [12.9716, 77.5946],
  'Ahmedabad': [23.0225, 72.5714],
};

const colors = {
  critical: '#dc2626',
  high: '#ea580c',
  medium: '#d97706',
  low: '#16a34a'
};

export default function RiskMap({ districts }) {
  // Filter districts with coordinates for demo purposes
  const mapData = districts.filter(d => coordinates[d.district]).map(d => ({
    ...d,
    position: coordinates[d.district],
    color: d.critical > 0 ? colors.critical : d.high > 0 ? colors.high : d.avgDelay > 100 ? colors.medium : colors.low,
    radius: Math.max(8, Math.min(24, 8 + (d.projectCount * 2)))
  }));

  return (
    <div className="h-[400px] w-full rounded-lg overflow-hidden border border-slate-200 shadow-sm z-0 relative">
      <MapContainer 
        center={[22.5937, 78.9629]} 
        zoom={4.5} 
        style={{ height: '100%', width: '100%', zIndex: 0 }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        {mapData.map((d) => (
          <CircleMarker
            key={d.id}
            center={d.position}
            radius={d.radius}
            pathOptions={{ 
              fillColor: d.color,
              fillOpacity: 0.7, 
              color: 'white', 
              weight: 2 
            }}
          >
            <Tooltip className="custom-tooltip">
              <div className="p-1">
                <div className="font-semibold text-slate-800 mb-1">{d.district}, {d.state}</div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                  <div className="text-slate-500">Total Projects</div>
                  <div className="font-medium text-right">{d.projectCount}</div>
                  <div className="text-slate-500">High/Critical</div>
                  <div className="font-medium text-right text-rose-600">{d.highCritical}</div>
                  <div className="text-slate-500">Avg Delay</div>
                  <div className="font-medium text-right">{d.avgDelay} days</div>
                </div>
              </div>
            </Tooltip>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}
