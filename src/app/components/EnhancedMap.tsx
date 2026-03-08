import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { gisService } from '../../services/gis';
import { RegionStats } from '../data/sampleData';

interface MapProps {
  regionStats: RegionStats[];
  selectedCounty: string | null;
  onCountySelect: (county: string) => void;
}

export default function EnhancedMap({ regionStats, selectedCounty, onCountySelect }: MapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Initialize map
    const map = L.map(mapContainerRef.current).setView([-0.0236, 37.9062], 6);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 18,
    }).addTo(map);

    mapRef.current = map;

    // Load GeoJSON boundaries
    loadBoundaries(map);

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (mapRef.current && regionStats.length > 0) {
      updateMapData(mapRef.current);
    }
  }, [regionStats, selectedCounty]);

  const loadBoundaries = async (map: L.Map) => {
    try {
      const boundaries = await gisService.loadKenyaBoundaries();
      
      L.geoJSON(boundaries as any, {
        style: (feature) => {
          const county = feature?.properties?.county;
          const stats = regionStats.find(r => r.county === county);
          const epi = stats?.avgEPI || 0;
          
          return {
            fillColor: gisService.getColorForEPI(epi),
            weight: selectedCounty === county ? 3 : 1,
            opacity: 1,
            color: selectedCounty === county ? '#000' : '#fff',
            fillOpacity: 0.7,
          };
        },
        onEachFeature: (feature, layer) => {
          const county = feature.properties.county;
          const stats = regionStats.find(r => r.county === county);
          
          layer.on({
            click: () => onCountySelect(county),
            mouseover: (e) => {
              const layer = e.target;
              layer.setStyle({ weight: 3, color: '#000' });
            },
            mouseout: (e) => {
              const layer = e.target;
              if (selectedCounty !== county) {
                layer.setStyle({ weight: 1, color: '#fff' });
              }
            },
          });

          if (stats) {
            layer.bindPopup(`
              <div class="p-2">
                <h3 class="font-bold">${county}</h3>
                <p>Avg EPI: ${stats.avgEPI}%</p>
                <p>Households: ${stats.totalHouseholds.toLocaleString()}</p>
              </div>
            `);
          }
        },
      }).addTo(map);

      setIsLoading(false);
    } catch (error) {
      console.error('Failed to load boundaries:', error);
      setIsLoading(false);
    }
  };

  const updateMapData = (map: L.Map) => {
    map.eachLayer((layer) => {
      if (layer instanceof L.GeoJSON) {
        layer.eachLayer((subLayer: any) => {
          const county = subLayer.feature?.properties?.county;
          const stats = regionStats.find(r => r.county === county);
          const epi = stats?.avgEPI || 0;
          
          subLayer.setStyle({
            fillColor: gisService.getColorForEPI(epi),
            weight: selectedCounty === county ? 3 : 1,
            color: selectedCounty === county ? '#000' : '#fff',
          });
        });
      }
    });
  };

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainerRef} className="w-full h-full rounded-lg" style={{ minHeight: '500px' }} />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 rounded-lg">
          <div className="text-gray-600">Loading map...</div>
        </div>
      )}
    </div>
  );
}
