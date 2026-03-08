export interface GeoJSONFeature {
  type: 'Feature';
  properties: {
    name: string;
    county: string;
    avgEPI?: number;
    population?: number;
  };
  geometry: {
    type: 'Polygon' | 'MultiPolygon';
    coordinates: number[][][] | number[][][][];
  };
}

export interface GeoJSONCollection {
  type: 'FeatureCollection';
  features: GeoJSONFeature[];
}

export class GISService {
  private boundariesCache: Map<string, GeoJSONCollection> = new Map();

  async loadKenyaBoundaries(): Promise<GeoJSONCollection> {
    if (this.boundariesCache.has('kenya')) {
      return this.boundariesCache.get('kenya')!;
    }

    try {
      const response = await fetch('/data/kenya-counties.geojson');
      const data = await response.json();
      this.boundariesCache.set('kenya', data);
      return data;
    } catch (error) {
      console.error('Failed to load Kenya boundaries:', error);
      return this.getFallbackBoundaries();
    }
  }

  async loadCountyBoundary(county: string): Promise<GeoJSONFeature | null> {
    const boundaries = await this.loadKenyaBoundaries();
    return boundaries.features.find(f => f.properties.county === county) || null;
  }

  private getFallbackBoundaries(): GeoJSONCollection {
    return {
      type: 'FeatureCollection',
      features: [],
    };
  }

  enrichWithEPIData(boundaries: GeoJSONCollection, epiData: Map<string, number>): GeoJSONCollection {
    return {
      ...boundaries,
      features: boundaries.features.map(feature => ({
        ...feature,
        properties: {
          ...feature.properties,
          avgEPI: epiData.get(feature.properties.county) || 0,
        },
      })),
    };
  }

  getColorForEPI(epi: number): string {
    if (epi <= 5) return '#10b981';
    if (epi <= 10) return '#f59e0b';
    if (epi <= 20) return '#f97316';
    return '#ef4444';
  }
}

export const gisService = new GISService();
