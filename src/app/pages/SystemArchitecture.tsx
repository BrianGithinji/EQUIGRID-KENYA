import Navigation from "../components/Navigation";
import { Server, Database, Cpu, LineChart, MonitorPlay, Cloud, Shield, Zap } from "lucide-react";

export default function SystemArchitecture() {
  const architectureLayers = [
    {
      layer: "1. Data Layer",
      description: "Storage and management of all system data",
      technologies: ["PostgreSQL", "TimescaleDB", "Redis Cache", "AWS S3"],
      components: [
        "Relational database for structured data",
        "Time-series database for consumption history",
        "Cache layer for real-time queries",
        "Object storage for large datasets"
      ],
      icon: Database,
      color: "blue"
    },
    {
      layer: "2. Processing Layer",
      description: "Data transformation and computation",
      technologies: ["Apache Spark", "Pandas", "NumPy", "Celery"],
      components: [
        "Distributed data processing",
        "ETL pipeline orchestration",
        "Batch and stream processing",
        "Task queue for async operations"
      ],
      icon: Cpu,
      color: "green"
    },
    {
      layer: "3. AI/Simulation Layer",
      description: "Machine learning models and policy simulation",
      technologies: ["Scikit-learn", "TensorFlow", "Python", "MLflow"],
      components: [
        "Regression models for demand forecasting",
        "Classification for poverty categorization",
        "Scenario simulation engine",
        "Model versioning and tracking"
      ],
      icon: Zap,
      color: "purple"
    },
    {
      layer: "4. API Layer",
      description: "RESTful APIs and business logic",
      technologies: ["FastAPI", "GraphQL", "JWT Auth", "OpenAPI"],
      components: [
        "REST endpoints for CRUD operations",
        "GraphQL for complex queries",
        "Authentication & authorization",
        "API documentation and testing"
      ],
      icon: Server,
      color: "orange"
    },
    {
      layer: "5. Visualization Layer",
      description: "Interactive dashboards and reporting",
      technologies: ["React", "Plotly", "Leaflet", "D3.js"],
      components: [
        "Responsive web application",
        "Interactive charts and graphs",
        "Geospatial mapping",
        "Real-time data updates"
      ],
      icon: MonitorPlay,
      color: "pink"
    }
  ];

  const mlModels = [
    {
      name: "Energy Poverty Classifier",
      type: "Classification",
      algorithm: "Random Forest",
      purpose: "Categorize households into EPI bands based on consumption patterns",
      features: ["Income", "Consumption", "Household Size", "Region", "Dwelling Type"],
      accuracy: "94.2%"
    },
    {
      name: "Demand Elasticity Model",
      type: "Regression",
      algorithm: "Linear Regression with Regularization",
      purpose: "Predict consumption changes in response to tariff adjustments",
      features: ["Historical Consumption", "Price Changes", "Income", "Season"],
      accuracy: "R² = 0.87"
    },
    {
      name: "Revenue Impact Forecaster",
      type: "Time Series",
      algorithm: "ARIMA + XGBoost",
      purpose: "Forecast utility revenue under different tariff scenarios",
      features: ["Tariff Structure", "Historical Revenue", "Economic Indicators"],
      accuracy: "MAPE = 6.3%"
    },
    {
      name: "Subsidy Optimization",
      type: "Optimization",
      algorithm: "Linear Programming",
      purpose: "Optimize subsidy allocation to maximize social welfare",
      features: ["Budget Constraint", "Regional Needs", "Impact Scores"],
      accuracy: "Pareto Optimal"
    }
  ];

  const systemFeatures = [
    {
      feature: "Scalability",
      description: "Horizontal scaling to handle millions of households",
      icon: Cloud,
      details: [
        "Microservices architecture",
        "Load balancing across nodes",
        "Auto-scaling based on demand",
        "Distributed computing for large datasets"
      ]
    },
    {
      feature: "Security",
      description: "Enterprise-grade security and compliance",
      icon: Shield,
      details: [
        "End-to-end encryption",
        "Role-based access control",
        "Audit logging",
        "Regular security audits"
      ]
    },
    {
      feature: "Performance",
      description: "Optimized for real-time analytics",
      icon: Zap,
      details: [
        "Sub-second query responses",
        "Materialized views for common queries",
        "Caching strategy",
        "Query optimization"
      ]
    },
    {
      feature: "Monitoring",
      description: "Comprehensive system observability",
      icon: LineChart,
      details: [
        "Real-time metrics dashboard",
        "Error tracking and alerting",
        "Performance profiling",
        "Usage analytics"
      ]
    }
  ];

  const colorMap = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    purple: "bg-purple-100 text-purple-600",
    orange: "bg-orange-100 text-orange-600",
    pink: "bg-pink-100 text-pink-600"
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">System Architecture</h1>
          <p className="text-gray-600">
            Complete technical architecture for the EquiGrid Kenya platform
          </p>
        </div>

        {/* Architecture Overview */}
        <div className="mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Architecture Overview</h2>
            <p className="text-gray-600 mb-4">
              EquiGrid Kenya is built on a modern, scalable architecture using microservices, 
              distributed computing, and machine learning. The system is designed to process 
              large-scale energy data and provide real-time policy simulation capabilities.
            </p>
            
            {/* Architecture Diagram */}
            <div className="bg-gray-50 rounded-lg p-6 border-2 border-dashed border-gray-300">
              <div className="space-y-4">
                {architectureLayers.map((layer, index) => {
                  const Icon = layer.icon;
                  return (
                    <div key={index}>
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`p-2 rounded ${colorMap[layer.color as keyof typeof colorMap]}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{layer.layer}</div>
                          <div className="text-sm text-gray-600">{layer.description}</div>
                        </div>
                      </div>
                      {index < architectureLayers.length - 1 && (
                        <div className="ml-6 border-l-2 border-gray-300 h-6"></div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Layer Details */}
          <div className="space-y-6">
            {architectureLayers.map((layer, index) => {
              const Icon = layer.icon;
              return (
                <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`p-3 rounded-lg ${colorMap[layer.color as keyof typeof colorMap]}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{layer.layer}</h3>
                      <p className="text-gray-600">{layer.description}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm font-medium text-gray-700 mb-2">Technologies:</div>
                      <div className="flex flex-wrap gap-2">
                        {layer.technologies.map((tech, i) => (
                          <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-700 mb-2">Key Components:</div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {layer.components.map((component, i) => (
                          <li key={i}>• {component}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ML Models */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Machine Learning Models</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mlModels.map((model, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">{model.name}</h3>
                    <div className="flex gap-2 mt-1">
                      <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs">
                        {model.type}
                      </span>
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">
                        {model.algorithm}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Accuracy</div>
                    <div className="text-lg font-semibold text-green-600">{model.accuracy}</div>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">{model.purpose}</p>
                
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-2">Input Features:</div>
                  <div className="flex flex-wrap gap-1">
                    {model.features.map((feature, i) => (
                      <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-blue-900 mb-2">Model Training & Deployment</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-800">
              <div>
                <div className="font-medium mb-1">Training Pipeline</div>
                <ul className="space-y-1">
                  <li>• Automated data preprocessing</li>
                  <li>• Cross-validation and tuning</li>
                  <li>• Model versioning with MLflow</li>
                </ul>
              </div>
              <div>
                <div className="font-medium mb-1">Model Monitoring</div>
                <ul className="space-y-1">
                  <li>• Performance metrics tracking</li>
                  <li>• Drift detection</li>
                  <li>• A/B testing framework</li>
                </ul>
              </div>
              <div>
                <div className="font-medium mb-1">Deployment</div>
                <ul className="space-y-1">
                  <li>• Containerized with Docker</li>
                  <li>• REST API endpoints</li>
                  <li>• Auto-scaling inference</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* System Features */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">System Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {systemFeatures.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{item.feature}</h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1 ml-14">
                    {item.details.map((detail, i) => (
                      <li key={i}>• {detail}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* Technology Stack */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Complete Technology Stack</h2>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Backend</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Python 3.11+</li>
                  <li>• FastAPI</li>
                  <li>• Celery</li>
                  <li>• SQLAlchemy</li>
                  <li>• Pydantic</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Data & ML</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Pandas & NumPy</li>
                  <li>• Scikit-learn</li>
                  <li>• TensorFlow</li>
                  <li>• Apache Spark</li>
                  <li>• MLflow</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Storage</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• PostgreSQL</li>
                  <li>• TimescaleDB</li>
                  <li>• Redis</li>
                  <li>• AWS S3</li>
                  <li>• Parquet</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Frontend</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• React</li>
                  <li>• TypeScript</li>
                  <li>• Plotly & D3.js</li>
                  <li>• Leaflet Maps</li>
                  <li>• Tailwind CSS</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Policy Impact */}
        <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-green-900 mb-3">Expected Policy Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-green-800">
            <div>
              <h3 className="font-semibold mb-2">For Policymakers</h3>
              <ul className="space-y-1">
                <li>• Design evidence-based, equitable tariffs</li>
                <li>• Predict social impact before implementation</li>
                <li>• Balance affordability with utility sustainability</li>
                <li>• Target subsidies to households most in need</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">For Society</h3>
              <ul className="space-y-1">
                <li>• Reduce energy poverty by 30-40%</li>
                <li>• Improve energy affordability for vulnerable households</li>
                <li>• Maintain financial viability of utilities</li>
                <li>• Enable more efficient subsidy allocation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
