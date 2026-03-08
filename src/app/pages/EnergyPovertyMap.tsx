import { useState } from "react";
import Navigation from "../components/Navigation";
import { regionStats } from "../data/sampleData";
import { Search, Info } from "lucide-react";

export default function EnergyPovertyMap() {
  const [selectedCounty, setSelectedCounty] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter regions
  const filteredRegions = regionStats.filter(region =>
    region.county.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort regions by average EPI
  const sortedRegions = [...filteredRegions].sort((a, b) => b.avgEPI - a.avgEPI);

  // Get color based on EPI
  const getEPIColor = (epi: number) => {
    if (epi <= 5) return "#10b981"; // green
    if (epi <= 10) return "#f59e0b"; // amber
    if (epi <= 20) return "#f97316"; // orange
    return "#ef4444"; // red
  };

  const getEPILabel = (epi: number) => {
    if (epi <= 5) return "Affordable";
    if (epi <= 10) return "Moderate Burden";
    if (epi <= 20) return "Energy Poverty";
    return "Severe Poverty";
  };

  const selected = selectedCounty ? regionStats.find(r => r.county === selectedCounty) : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Energy Poverty Mapping</h1>
          <p className="text-gray-600">
            Geospatial analysis of energy affordability across Kenya
          </p>
        </div>

        {/* Info Panel */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-900">
            <p className="mb-2"><strong>Energy Poverty Index (EPI)</strong> = Electricity Cost / Household Income × 100</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: "#10b981" }}></div>
                <span>0-5%: Affordable</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: "#f59e0b" }}></div>
                <span>5-10%: Moderate</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: "#f97316" }}></div>
                <span>10-20%: Poverty</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: "#ef4444" }}></div>
                <span>&gt;20%: Severe</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for a county..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Visualization */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Interactive Heatmap</h2>
              
              {/* Simplified map visualization */}
              <div className="relative bg-gray-100 rounded-lg" style={{ height: "500px" }}>
                {/* SVG Kenya map representation */}
                <svg viewBox="0 0 800 600" className="w-full h-full">
                  {sortedRegions.map((region, index) => {
                    // Simple circular markers for counties
                    const x = 200 + (region.longitude - 34) * 80;
                    const y = 300 - (region.latitude + 1) * 80;
                    const size = Math.sqrt(region.totalHouseholds) / 2;
                    const color = getEPIColor(region.avgEPI);
                    
                    return (
                      <g
                        key={region.county}
                        onClick={() => setSelectedCounty(region.county)}
                        className="cursor-pointer transition-transform hover:scale-110"
                      >
                        <circle
                          cx={x}
                          cy={y}
                          r={size}
                          fill={color}
                          opacity={selectedCounty === region.county ? 1 : 0.7}
                          stroke={selectedCounty === region.county ? "#000" : "#fff"}
                          strokeWidth={selectedCounty === region.county ? 3 : 1}
                        />
                        <text
                          x={x}
                          y={y - size - 8}
                          textAnchor="middle"
                          className="text-xs font-medium fill-gray-900 pointer-events-none"
                        >
                          {region.county}
                        </text>
                        <text
                          x={x}
                          y={y - size - 20}
                          textAnchor="middle"
                          className="text-[10px] fill-gray-600 pointer-events-none"
                        >
                          EPI: {region.avgEPI}%
                        </text>
                      </g>
                    );
                  })}
                </svg>
                
                <div className="absolute bottom-4 left-4 bg-white px-3 py-2 rounded-lg shadow-md text-xs">
                  <div className="font-semibold mb-1">Legend</div>
                  <div className="text-gray-600">Circle size = Population</div>
                  <div className="text-gray-600">Color = Energy Poverty Level</div>
                </div>
              </div>
            </div>
          </div>

          {/* County Details */}
          <div className="space-y-6">
            {selected ? (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">{selected.county} County</h2>
                
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Average EPI</div>
                    <div className="text-2xl font-semibold" style={{ color: getEPIColor(selected.avgEPI) }}>
                      {selected.avgEPI}%
                    </div>
                    <div className="text-sm text-gray-500">{getEPILabel(selected.avgEPI)}</div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-600 mb-2">Household Distribution</div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Affordable</span>
                        <span className="font-medium">{selected.affordableCount} ({((selected.affordableCount / selected.totalHouseholds) * 100).toFixed(1)}%)</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Moderate Burden</span>
                        <span className="font-medium">{selected.moderateCount} ({((selected.moderateCount / selected.totalHouseholds) * 100).toFixed(1)}%)</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Energy Poverty</span>
                        <span className="font-medium">{selected.povertyCount} ({((selected.povertyCount / selected.totalHouseholds) * 100).toFixed(1)}%)</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Severe Poverty</span>
                        <span className="font-medium text-red-600">{selected.severePovertyCount} ({((selected.severePovertyCount / selected.totalHouseholds) * 100).toFixed(1)}%)</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Households</span>
                        <span className="font-medium">{selected.totalHouseholds.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Avg Income</span>
                        <span className="font-medium">KES {selected.avgIncome.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Avg Consumption</span>
                        <span className="font-medium">{selected.avgConsumption} kWh</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="text-center text-gray-500 py-8">
                  Click on a county to view details
                </div>
              </div>
            )}

            {/* Top Counties by Energy Poverty */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Counties Ranked by EPI</h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {sortedRegions.map((region, index) => (
                  <button
                    key={region.county}
                    onClick={() => setSelectedCounty(region.county)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedCounty === region.county
                        ? "bg-green-50 border border-green-200"
                        : "bg-gray-50 hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-lg font-semibold text-gray-400 w-6">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{region.county}</div>
                          <div className="text-sm text-gray-500">
                            {region.totalHouseholds.toLocaleString()} households
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div
                          className="text-lg font-semibold"
                          style={{ color: getEPIColor(region.avgEPI) }}
                        >
                          {region.avgEPI}%
                        </div>
                        <div className="text-xs text-gray-500">{getEPILabel(region.avgEPI)}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
