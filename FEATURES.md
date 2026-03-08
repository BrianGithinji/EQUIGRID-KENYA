# EquiGrid Kenya - Features Documentation

## 🎯 Core Features

### 1. **Policy Dashboard**
**Location**: `/` (Home page)

**Features**:
- Real-time energy poverty statistics
- Total households analyzed with breakdown
- Average Energy Poverty Index (EPI) calculation
- Households in energy poverty vs affordable energy
- Average monthly income and consumption metrics
- Interactive pie chart showing EPI distribution across 4 categories:
  - Affordable (0-5%)
  - Moderate burden (5-10%)
  - Energy poverty (10-20%)
  - Severe energy poverty (>20%)
- Bar chart ranking counties by average EPI
- System overview and problem statement
- Background on Kenya's electricity tariff challenges

**Key Metrics Displayed**:
- Total households: ~1,500 across 15 counties
- EPI categories distribution
- County-level poverty rankings
- Income and consumption averages

---

### 2. **Energy Poverty Mapping**
**Location**: `/energy-poverty-map`

**Features**:
- **Interactive Heatmap**: Visual representation of energy poverty across Kenya
- **County-level Analysis**: Click any county to view detailed statistics
- **Search Functionality**: Find specific counties quickly
- **Color-coded Visualization**:
  - Green: Affordable (EPI ≤ 5%)
  - Amber: Moderate burden (EPI 5-10%)
  - Orange: Energy poverty (EPI 10-20%)
  - Red: Severe poverty (EPI > 20%)
- **Detailed County View**:
  - Average EPI with category label
  - Household distribution breakdown
  - Total households count
  - Average income and consumption
  - Geographic coordinates
- **Ranked County List**: All counties sorted by EPI severity
- **Legend and Info Panel**: EPI calculation formula and category definitions

**Coverage**: 15 Kenyan counties including Nairobi, Mombasa, Kisumu, Nakuru, Kiambu, Machakos, Kakamega, Meru, Uasin Gishu, Nyeri, Kilifi, Bungoma, Kericho, Murang'a, Kajiado

---

### 3. **AI Tariff Policy Simulator**
**Location**: `/tariff-simulator`

**Features**:
- **Interactive Parameter Controls**:
  - Lifeline Threshold: 0-100 kWh (slider)
  - Lifeline Rate: KES 5-25/kWh (slider)
  - Domestic Rate: KES 10-40/kWh (slider)
  - Fixed Monthly Charge: KES 0-500 (slider)
  - Regional Subsidy: 0-50% (slider)

- **Real-time Simulation**:
  - Run button to execute policy simulation
  - Reset button to restore current tariff structure
  - Instant calculation across all households

- **Prediction Outputs**:
  - **Households Benefiting**: Number and percentage seeing cost reduction
  - **Average EPI Change**: Before vs after comparison
  - **Revenue Impact**: Monthly and annual financial impact on utilities
  - **Severe Poverty Change**: Number of households moving in/out of severe poverty

- **Visual Analytics**:
  - Bar chart comparing current vs simulated EPI distribution
  - Side-by-side category comparison
  - Color-coded metrics (green for improvements, red for concerns)

- **Policy Impact Summary**:
  - Social benefits breakdown
  - Financial impact analysis
  - Subsidy cost calculations

- **Quick Scenario Presets**:
  - "Expand Lifeline": 50 kWh @ KES 10/kWh
  - "Reduce Fixed Charges": Lower to KES 50/month
  - "Regional Subsidy": 20% subsidy for poor regions

- **ML Integration** (when enabled):
  - TensorFlow.js model for enhanced predictions
  - Confidence scores for predictions
  - Toggle ML on/off

---

### 4. **Data Architecture**
**Location**: `/data-architecture`

**Features**:
- System architecture visualization
- Data flow diagrams
- Integration points documentation
- Technical stack overview

---

### 5. **System Architecture**
**Location**: `/system-architecture`

**Features**:
- Infrastructure overview
- Component relationships
- Deployment architecture
- Scalability considerations

---

## 🔧 Technical Features

### **Data Management**
- Sample dataset: ~1,500 households across 15 counties
- Real-time EPI calculation: `(Electricity Cost / Household Income) × 100`
- Automatic category classification
- Regional statistics aggregation
- Data persistence in localStorage

### **Current Tariff Structure** (Kenya KPLC)
- Lifeline (0-30 kWh): KES 12.5/kWh
- Domestic (31-100 kWh): KES 20.5/kWh
- Domestic (101-1000 kWh): KES 25.5/kWh
- Domestic (>1000 kWh): KES 28.5/kWh
- Fixed charge: KES 150/month

### **Responsive Design**
- Mobile-friendly interface
- Tablet optimization
- Desktop full-feature experience
- Tailwind CSS styling

### **Navigation**
- Persistent navigation bar
- Active route highlighting
- Quick access to all sections

---

## 🚀 Advanced Features (Implementation Ready)

### **1. Real Data Integration**
**Status**: Infrastructure ready, needs API credentials

**Capabilities**:
- EPRA API integration for tariff data
- KPLC API integration for household consumption
- Automated data synchronization
- PostgreSQL database with PostGIS
- Redis caching layer
- ETL pipeline for data transformation

**Files**:
- `src/services/api.ts`: API clients
- `src/services/dataSync.ts`: Sync service
- `database/schema.sql`: Database schema

---

### **2. Machine Learning Predictions**
**Status**: Framework ready, needs model training

**Capabilities**:
- TensorFlow.js client-side predictions
- Python training pipeline
- Batch prediction support
- Confidence scoring
- Fallback to deterministic calculations
- Model versioning

**Features**:
- 7-input neural network (tariff params + household data)
- 3-output predictions (EPI, cost, confidence)
- 128-64-32 layer architecture
- Dropout regularization
- Real-time inference

**Files**:
- `src/services/ml.ts`: ML service
- `ml/train_model.py`: Training script
- `server/index.ts`: ML API endpoints

---

### **3. Enhanced GIS Mapping**
**Status**: Component ready, needs GeoJSON data

**Capabilities**:
- Leaflet.js interactive maps
- Real county boundary rendering
- PostGIS spatial queries
- Choropleth visualization
- Click/hover interactions
- Popup information windows
- Layer controls
- Zoom and pan

**Features**:
- GeoJSON boundary support
- Color-coded by EPI levels
- County selection highlighting
- Population density overlay
- Custom markers and tooltips

**Files**:
- `src/services/gis.ts`: GIS service
- `src/app/components/EnhancedMap.tsx`: Map component
- `public/data/kenya-counties.geojson`: Boundary data

---

### **4. Backend API Server**
**Status**: Ready for deployment

**Endpoints**:
- `GET /api/health`: Health check
- `POST /api/ml/predict`: ML predictions
- `POST /api/households`: Fetch household data
- `GET /api/gis/boundaries`: GeoJSON boundaries
- `POST /api/sync`: Trigger data sync
- `GET /api/epra/tariffs`: EPRA tariff data
- `POST /api/kplc/households`: KPLC household data

**Features**:
- Express.js server
- CORS enabled
- JWT authentication ready
- Error handling
- Request logging
- Rate limiting ready

**Files**:
- `server/index.ts`: Main server
- `server/package.json`: Dependencies

---

## 📊 Data Features

### **Household Data Fields**
- ID, Account Number
- County, Constituency
- Latitude, Longitude
- Household Income (KES/month)
- Electricity Cost (KES/month)
- Consumption (kWh/month)
- Household Size
- EPI (calculated)
- EPI Category (classified)

### **Regional Statistics**
- Total households per county
- Average EPI per county
- Category distribution counts
- Average income and consumption
- Geographic coordinates

### **Simulation Results**
- Before/after comparisons
- Household-level impacts
- Aggregate statistics
- Revenue projections
- Subsidy requirements

---

## 🎨 UI/UX Features

### **Components**
- StatCard: Metric display cards with icons
- Navigation: Responsive nav bar
- Charts: Recharts library (Bar, Pie, Line)
- Forms: Controlled inputs with validation
- Buttons: Primary, secondary, icon buttons
- Cards: Content containers
- Tooltips: Contextual help
- Alerts: Info panels

### **Color Scheme**
- Primary: Green (#10b981) - Affordable
- Warning: Amber (#f59e0b) - Moderate
- Alert: Orange (#f97316) - Poverty
- Danger: Red (#ef4444) - Severe
- Neutral: Gray scale

### **Icons**
- Lucide React icon library
- Consistent sizing
- Semantic usage
- Accessibility compliant

---

## 🔐 Security Features (Ready)

- Environment variable configuration
- API key management
- Token-based authentication
- CORS configuration
- Input validation
- SQL injection prevention
- XSS protection

---

## 📈 Analytics & Reporting

### **Available Metrics**
- Total households analyzed
- EPI distribution percentages
- County rankings
- Income vs cost ratios
- Consumption patterns
- Policy impact projections
- Revenue forecasts
- Subsidy calculations

### **Export Capabilities** (Ready to implement)
- CSV export
- PDF reports
- JSON data dumps
- Chart image exports

---

## 🌐 Integration Points

### **External Systems**
- EPRA (Energy & Petroleum Regulatory Authority)
- KPLC (Kenya Power & Lighting Company)
- Kenya Open Data Portal
- GIS data providers

### **Data Sources**
- Household billing data
- Tariff structures
- Geographic boundaries
- Population statistics
- Income estimates

---

## 📱 Accessibility

- Keyboard navigation
- Screen reader support
- ARIA labels
- Color contrast compliance
- Responsive text sizing
- Focus indicators

---

## 🔄 Real-time Features

- Live simulation updates
- Dynamic chart rendering
- Instant metric calculations
- Interactive map updates
- Search filtering
- State management

---

## 💾 Data Persistence

- LocalStorage for preferences
- Session management
- Cache management
- Sync status tracking
- Last update timestamps

---

## 🎯 Use Cases

### **For Regulators (EPRA)**
- Test tariff proposals before implementation
- Assess social impact of pricing changes
- Identify vulnerable populations
- Balance affordability with sustainability
- Generate policy reports

### **For Utilities (KPLC)**
- Revenue impact analysis
- Customer affordability insights
- Subsidy requirement calculations
- Regional pricing strategies
- Load distribution planning

### **For Policymakers**
- Evidence-based decision making
- Geographic targeting of interventions
- Budget allocation for subsidies
- Performance monitoring
- Stakeholder communication

### **For Researchers**
- Energy poverty analysis
- Tariff structure studies
- Socioeconomic impact assessment
- Policy effectiveness evaluation
- Data visualization

---

## 📦 Deployment Features

- Vite build optimization
- Code splitting
- Lazy loading
- Asset optimization
- Environment-based configuration
- Production/staging modes
- Health monitoring
- Error tracking (Sentry ready)

---

## 🔮 Future Enhancements (Roadmap)

1. **User Authentication**: Role-based access control
2. **Historical Analysis**: Time-series data and trends
3. **Predictive Analytics**: Forecast future energy poverty
4. **Mobile App**: Native iOS/Android apps
5. **API Documentation**: Swagger/OpenAPI specs
6. **Automated Reports**: Scheduled PDF generation
7. **Multi-language**: Swahili translation
8. **Advanced ML**: Deep learning models
9. **Real-time Sync**: WebSocket connections
10. **Collaboration**: Multi-user simulations

---

## 📞 Support & Documentation

- **QUICKSTART.md**: Quick setup guide
- **IMPLEMENTATION.md**: Detailed technical guide
- **README.md**: Project overview
- Inline code documentation
- API endpoint documentation
- Database schema documentation
