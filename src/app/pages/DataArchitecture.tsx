import Navigation from "../components/Navigation";
import { Database, Upload, Filter, Save, BarChart3, Layers, ArrowRight } from "lucide-react";

export default function DataArchitecture() {
  const dataSources = [
    {
      name: "Electricity Consumption Data",
      description: "Historical consumption records from Kenya Power",
      fields: ["Customer ID", "Monthly kWh", "Tariff Band", "Location", "Meter Type"],
      icon: BarChart3,
      color: "blue"
    },
    {
      name: "Household Income Statistics",
      description: "Income data from Kenya National Bureau of Statistics",
      fields: ["Household ID", "Monthly Income", "Income Source", "Household Size", "Region"],
      icon: DollarSign,
      color: "green"
    },
    {
      name: "Population & Demographics",
      description: "Census data and demographic information",
      fields: ["Region", "Population", "Urban/Rural", "Age Distribution", "Education Level"],
      icon: Users,
      color: "purple"
    },
    {
      name: "Tariff Structures",
      description: "Current and historical electricity tariff schedules",
      fields: ["Effective Date", "Tariff Band", "Rate per kWh", "Fixed Charges", "Taxes"],
      icon: FileText,
      color: "orange"
    }
  ];

  const dataProcessingSteps = [
    {
      step: "1. Data Ingestion",
      description: "Automated pipelines extract data from multiple sources",
      technologies: ["Apache Kafka", "AWS S3", "API Connectors"],
      details: [
        "Real-time streaming from smart meters",
        "Batch processing for census data",
        "API integration with KPLC systems"
      ]
    },
    {
      step: "2. Data Cleaning",
      description: "Standardization and quality assurance processes",
      technologies: ["Pandas", "NumPy", "Data Validation"],
      details: [
        "Remove duplicates and outliers",
        "Handle missing values",
        "Standardize formats and units",
        "Validate data integrity"
      ]
    },
    {
      step: "3. Data Transformation",
      description: "Feature engineering and enrichment",
      technologies: ["Python", "SQL", "ETL Pipelines"],
      details: [
        "Calculate Energy Poverty Index",
        "Aggregate by region and demographics",
        "Create time-series features",
        "Geocode locations"
      ]
    },
    {
      step: "4. Data Storage",
      description: "Optimized storage for analytics and ML",
      technologies: ["PostgreSQL", "TimescaleDB", "Parquet"],
      details: [
        "Relational database for structured data",
        "Time-series optimization",
        "Columnar storage for analytics",
        "Data versioning and lineage"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Data Architecture</h1>
          <p className="text-gray-600">
            Complete data pipeline from ingestion to analytics-ready datasets
          </p>
        </div>

        {/* Data Sources */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Sources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dataSources.map((source, index) => {
              const Icon = source.icon;
              const colorMap = {
                blue: "bg-blue-100 text-blue-600",
                green: "bg-green-100 text-green-600",
                purple: "bg-purple-100 text-purple-600",
                orange: "bg-orange-100 text-orange-600"
              };
              
              return (
                <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${colorMap[source.color as keyof typeof colorMap]}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2">{source.name}</h3>
                      <p className="text-sm text-gray-600 mb-3">{source.description}</p>
                      <div className="text-sm">
                        <div className="font-medium text-gray-700 mb-1">Key Fields:</div>
                        <div className="flex flex-wrap gap-2">
                          {source.fields.map((field, i) => (
                            <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                              {field}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Data Processing Pipeline */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Processing Pipeline</h2>
          <div className="space-y-4">
            {dataProcessingSteps.map((step, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-green-600 text-white rounded-lg flex items-center justify-center font-bold text-xl">
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.step}</h3>
                    <p className="text-gray-600 mb-3">{step.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm font-medium text-gray-700 mb-2">Technologies:</div>
                        <div className="flex flex-wrap gap-2">
                          {step.technologies.map((tech, i) => (
                            <span key={i} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-700 mb-2">Process Details:</div>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {step.details.map((detail, i) => (
                            <li key={i}>• {detail}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                {index < dataProcessingSteps.length - 1 && (
                  <div className="flex justify-center mt-4">
                    <ArrowRight className="w-6 h-6 text-gray-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Database Schema */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Database Schema</h2>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="border border-gray-300 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Database className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-gray-900">households</h3>
                </div>
                <div className="text-sm space-y-1 font-mono text-gray-600">
                  <div>id: UUID (PK)</div>
                  <div>region: VARCHAR</div>
                  <div>county: VARCHAR</div>
                  <div>latitude: DECIMAL</div>
                  <div>longitude: DECIMAL</div>
                  <div>household_income: INTEGER</div>
                  <div>household_size: INTEGER</div>
                  <div>created_at: TIMESTAMP</div>
                </div>
              </div>

              <div className="border border-gray-300 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Database className="w-5 h-5 text-green-600" />
                  <h3 className="font-semibold text-gray-900">consumption_records</h3>
                </div>
                <div className="text-sm space-y-1 font-mono text-gray-600">
                  <div>id: UUID (PK)</div>
                  <div>household_id: UUID (FK)</div>
                  <div>month: DATE</div>
                  <div>consumption_kwh: DECIMAL</div>
                  <div>electricity_cost: DECIMAL</div>
                  <div>tariff_band: VARCHAR</div>
                  <div>created_at: TIMESTAMP</div>
                </div>
              </div>

              <div className="border border-gray-300 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Database className="w-5 h-5 text-purple-600" />
                  <h3 className="font-semibold text-gray-900">energy_poverty_index</h3>
                </div>
                <div className="text-sm space-y-1 font-mono text-gray-600">
                  <div>id: UUID (PK)</div>
                  <div>household_id: UUID (FK)</div>
                  <div>month: DATE</div>
                  <div>epi_value: DECIMAL</div>
                  <div>epi_category: VARCHAR</div>
                  <div>calculated_at: TIMESTAMP</div>
                </div>
              </div>

              <div className="border border-gray-300 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Database className="w-5 h-5 text-orange-600" />
                  <h3 className="font-semibold text-gray-900">tariff_structures</h3>
                </div>
                <div className="text-sm space-y-1 font-mono text-gray-600">
                  <div>id: UUID (PK)</div>
                  <div>name: VARCHAR</div>
                  <div>effective_date: DATE</div>
                  <div>threshold_kwh: INTEGER</div>
                  <div>rate_per_kwh: DECIMAL</div>
                  <div>fixed_charge: DECIMAL</div>
                  <div>is_active: BOOLEAN</div>
                </div>
              </div>

              <div className="border border-gray-300 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Database className="w-5 h-5 text-red-600" />
                  <h3 className="font-semibold text-gray-900">region_statistics</h3>
                </div>
                <div className="text-sm space-y-1 font-mono text-gray-600">
                  <div>id: UUID (PK)</div>
                  <div>region: VARCHAR</div>
                  <div>month: DATE</div>
                  <div>total_households: INTEGER</div>
                  <div>avg_epi: DECIMAL</div>
                  <div>avg_income: DECIMAL</div>
                  <div>avg_consumption: DECIMAL</div>
                </div>
              </div>

              <div className="border border-gray-300 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Database className="w-5 h-5 text-pink-600" />
                  <h3 className="font-semibold text-gray-900">simulations</h3>
                </div>
                <div className="text-sm space-y-1 font-mono text-gray-600">
                  <div>id: UUID (PK)</div>
                  <div>name: VARCHAR</div>
                  <div>parameters: JSONB</div>
                  <div>results: JSONB</div>
                  <div>created_by: VARCHAR</div>
                  <div>created_at: TIMESTAMP</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Data Quality & Governance */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Quality & Governance</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Filter className="w-6 h-6 text-green-600" />
                <h3 className="font-semibold text-gray-900">Data Validation</h3>
              </div>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Schema validation on ingestion</li>
                <li>• Range checks for numerical fields</li>
                <li>• Referential integrity constraints</li>
                <li>• Automated anomaly detection</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Save className="w-6 h-6 text-blue-600" />
                <h3 className="font-semibold text-gray-900">Data Lineage</h3>
              </div>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Track data source to insight</li>
                <li>• Version control for datasets</li>
                <li>• Audit trails for modifications</li>
                <li>• Reproducible transformations</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Layers className="w-6 h-6 text-purple-600" />
                <h3 className="font-semibold text-gray-900">Privacy & Security</h3>
              </div>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Anonymized household identifiers</li>
                <li>• Role-based access control</li>
                <li>• Encrypted data at rest and transit</li>
                <li>• GDPR compliance measures</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Import missing icons
import { DollarSign, Users, FileText } from "lucide-react";
