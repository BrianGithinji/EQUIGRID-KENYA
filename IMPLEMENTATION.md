# EquiGrid Kenya - Implementation Guide

## Overview
This guide covers the implementation of real data integration, ML models, EPRA/KPLC connectivity, and enhanced GIS mapping.

## Architecture

```
┌─────────────────┐
│   Frontend      │
│   (React)       │
└────────┬────────┘
         │
    ┌────┴────┐
    │   API   │
    │ Gateway │
    └────┬────┘
         │
    ┌────┴────────────────────┐
    │                         │
┌───┴────┐            ┌──────┴─────┐
│ ML API │            │  Data API  │
└───┬────┘            └──────┬─────┘
    │                        │
┌───┴────┐          ┌────────┴──────┐
│TF Model│          │   PostgreSQL  │
└────────┘          └────────┬──────┘
                             │
                    ┌────────┴──────┐
                    │  EPRA/KPLC    │
                    │  Integration  │
                    └───────────────┘
```

## Phase 1: Data Integration

### 1.1 Database Setup

```sql
-- Create PostgreSQL database
CREATE DATABASE equigrid;

-- Households table
CREATE TABLE households (
    id VARCHAR(50) PRIMARY KEY,
    account_number VARCHAR(50) UNIQUE,
    county VARCHAR(100),
    constituency VARCHAR(100),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    household_income DECIMAL(10, 2),
    electricity_cost DECIMAL(10, 2),
    consumption DECIMAL(10, 2),
    household_size INTEGER,
    epi DECIMAL(5, 2),
    epi_category VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Regional statistics table
CREATE TABLE region_stats (
    id SERIAL PRIMARY KEY,
    county VARCHAR(100) UNIQUE,
    total_households INTEGER,
    avg_epi DECIMAL(5, 2),
    affordable_count INTEGER,
    moderate_count INTEGER,
    poverty_count INTEGER,
    severe_poverty_count INTEGER,
    avg_income DECIMAL(10, 2),
    avg_consumption DECIMAL(10, 2),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- GIS boundaries (PostGIS)
CREATE EXTENSION postgis;

CREATE TABLE county_boundaries (
    id SERIAL PRIMARY KEY,
    county VARCHAR(100) UNIQUE,
    geom GEOMETRY(MultiPolygon, 4326),
    population INTEGER,
    area_sqkm DECIMAL(10, 2)
);
```

### 1.2 KPLC Integration

**Authentication:**
```typescript
// Add to src/services/api.ts
export async function authenticateKPLC() {
  const response = await fetch(`${KPLC_API_URL}/oauth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: process.env.KPLC_CLIENT_ID,
      client_secret: process.env.KPLC_CLIENT_SECRET,
      grant_type: 'client_credentials',
    }),
  });
  const { access_token } = await response.json();
  localStorage.setItem('kplc_token', access_token);
  return access_token;
}
```

**Data Sync:**
```bash
# Run daily sync
node server/scripts/sync-kplc-data.js
```

### 1.3 EPRA Integration

**Tariff Data Sync:**
```typescript
// Fetch current tariff structures
const tariffs = await epraAPI.getTariffStructures();
// Store in database for historical tracking
```

## Phase 2: ML Model Implementation

### 2.1 Train Model

```bash
# Install Python dependencies
cd ml
pip install -r requirements.txt

# Train model
python train_model.py

# Model will be exported to public/models/tariff-predictor/
```

### 2.2 Use ML in Frontend

```typescript
import { mlModel } from '@/services/ml';

// Load model on app start
await mlModel.loadModel();

// Run predictions
const result = await mlModel.predict({
  lifelineThreshold: 50,
  lifelineRate: 10,
  domesticRate: 20,
  fixedCharge: 150,
  regionalSubsidy: 10,
  householdIncome: 35000,
  consumption: 120,
});
```

### 2.3 Backend ML API

```bash
# Start server
cd server
npm install
npm run dev
```

## Phase 3: Enhanced GIS Mapping

### 3.1 Install Dependencies

```bash
npm install leaflet @types/leaflet react-leaflet
npm install mapbox-gl @types/mapbox-gl
```

### 3.2 Get Real GeoJSON Data

**Sources:**
- Kenya Open Data Portal: https://kenya.opendataforafrica.org/
- GADM: https://gadm.org/download_country.html (Kenya boundaries)
- Humanitarian Data Exchange: https://data.humdata.org/

**Download:**
```bash
# Download Kenya county boundaries
wget https://data.humdata.org/dataset/kenya-counties-shapefile
# Convert to GeoJSON
ogr2ogr -f GeoJSON kenya-counties.geojson kenya-counties.shp
# Move to public/data/
mv kenya-counties.geojson public/data/
```

### 3.3 Use Enhanced Map

```typescript
import EnhancedMap from '@/components/EnhancedMap';

<EnhancedMap 
  regionStats={regionStats}
  selectedCounty={selectedCounty}
  onCountySelect={setSelectedCounty}
/>
```

## Phase 4: System Integration

### 4.1 Environment Setup

```bash
# Copy environment template
cp .env.example .env

# Fill in credentials
VITE_EPRA_API_URL=https://api.epra.go.ke/v1
VITE_KPLC_API_URL=https://api.kplc.co.ke/v1
EPRA_API_KEY=your_key
KPLC_API_KEY=your_key
```

### 4.2 Feature Flags

Enable features progressively:

```typescript
// In your components
const USE_REAL_DATA = import.meta.env.VITE_USE_REAL_DATA === 'true';
const USE_ML_MODEL = import.meta.env.VITE_USE_ML_MODEL === 'true';

const data = USE_REAL_DATA 
  ? await internalAPI.getHouseholds()
  : sampleData;
```

### 4.3 Data Pipeline

```
KPLC API → ETL Process → PostgreSQL → API → Frontend
   ↓
EPRA API → Validation → Cache (Redis) → API → Frontend
```

## Deployment

### Production Checklist

- [ ] Set up PostgreSQL database
- [ ] Configure PostGIS for GIS data
- [ ] Train and deploy ML model
- [ ] Set up Redis for caching
- [ ] Configure EPRA/KPLC API credentials
- [ ] Set up automated data sync (cron jobs)
- [ ] Enable SSL/TLS
- [ ] Set up monitoring (Sentry, DataDog)
- [ ] Configure CDN for static assets
- [ ] Set up backup strategy

### Deployment Commands

```bash
# Build frontend
npm run build

# Deploy to server
rsync -avz dist/ user@server:/var/www/equigrid/

# Start backend
pm2 start server/dist/index.js --name equigrid-api

# Set up nginx reverse proxy
# Configure SSL with Let's Encrypt
```

## API Endpoints

### Internal API
- `POST /api/households` - Get household data
- `POST /api/ml/predict` - Run ML predictions
- `GET /api/gis/boundaries` - Get GeoJSON boundaries
- `POST /api/sync` - Trigger data sync

### EPRA Proxy
- `GET /api/epra/tariffs` - Current tariff structures
- `POST /api/epra/proposals` - Submit tariff proposal

### KPLC Proxy
- `POST /api/kplc/households` - Household consumption data
- `GET /api/kplc/billing` - Billing data

## Monitoring

```typescript
// Add to services
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
});
```

## Next Steps

1. **Immediate**: Set up development database and test data sync
2. **Week 1**: Train ML model with historical data
3. **Week 2**: Integrate real GeoJSON boundaries
4. **Week 3**: Connect to EPRA/KPLC staging APIs
5. **Week 4**: User testing and refinement
6. **Week 5**: Production deployment

## Support

For EPRA/KPLC API access:
- EPRA: developer@epra.go.ke
- KPLC: api-support@kplc.co.ke
