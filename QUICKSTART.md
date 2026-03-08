# EquiGrid Kenya - Quick Start Guide

## What's Been Added

### 1. Services Layer (`src/services/`)
- **api.ts**: EPRA/KPLC API integration
- **ml.ts**: TensorFlow.js ML model service
- **dataSync.ts**: Data synchronization service
- **gis.ts**: GIS/mapping service

### 2. Backend Server (`server/`)
- Express API server with ML prediction endpoints
- Ready for PostgreSQL and Redis integration

### 3. ML Training (`ml/`)
- Python script to train tariff prediction model
- Exports to TensorFlow.js format

### 4. Database Schema (`database/`)
- PostgreSQL schema with PostGIS support
- Tables for households, regions, boundaries, tariffs

### 5. Enhanced Components
- **EnhancedMap.tsx**: Leaflet-based interactive map
- **TariffSimulatorEnhanced.tsx**: ML-powered simulator

## Quick Setup

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Set Up Environment
```bash
cp .env.example .env
# Edit .env with your API keys
```

### Step 3: Run Development Server
```bash
npm run dev
```

### Step 4 (Optional): Train ML Model
```bash
cd ml
pip install -r requirements.txt
python train_model.py
```

### Step 5 (Optional): Start Backend
```bash
cd server
npm install
npm run dev
```

## Feature Flags

Control which features are enabled in `.env`:

```env
VITE_USE_REAL_DATA=false    # Use real KPLC data
VITE_USE_ML_MODEL=false     # Use ML predictions
VITE_USE_REAL_MAP=false     # Use real GeoJSON maps
```

## Next Steps

1. **Get API Access**: Contact EPRA and KPLC for API credentials
2. **Set Up Database**: Run `database/schema.sql` on PostgreSQL
3. **Download GIS Data**: Get Kenya county boundaries (see IMPLEMENTATION.md)
4. **Train ML Model**: Use historical data to train prediction model
5. **Deploy**: Follow deployment guide in IMPLEMENTATION.md

## Testing Without Real Data

The platform works with sample data by default. You can:
- Test all UI features
- Run simulations
- View maps (simplified version)
- Explore dashboard analytics

## File Structure

```
EQUIGRID-KENYA/
├── src/
│   ├── services/          # API & ML services
│   ├── app/
│   │   ├── components/    # UI components
│   │   ├── pages/         # Page components
│   │   └── data/          # Sample data
├── server/                # Backend API
├── ml/                    # ML training scripts
├── database/              # Database schemas
├── public/
│   ├── data/             # GeoJSON files
│   └── models/           # ML models
└── IMPLEMENTATION.md      # Detailed guide
```

## Support

See IMPLEMENTATION.md for detailed documentation on:
- Database setup
- API integration
- ML model training
- GIS data sources
- Deployment process
