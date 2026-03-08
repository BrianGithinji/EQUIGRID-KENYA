import { useState, useMemo, useEffect } from "react";
import Navigation from "../components/Navigation";
import { householdData, calculateEPI, classifyEPI } from "../data/sampleData";
import { Play, RotateCcw, TrendingUp, TrendingDown, DollarSign, Users, Info, Sparkles } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { mlModel } from "../../services/ml";

interface SimulationParams {
  lifelineThreshold: number;
  lifelineRate: number;
  domesticRate: number;
  fixedCharge: number;
  regionalSubsidy: number;
}

export default function TariffSimulator() {
  const [params, setParams] = useState<SimulationParams>({
    lifelineThreshold: 30,
    lifelineRate: 12.5,
    domesticRate: 20.5,
    fixedCharge: 150,
    regionalSubsidy: 0,
  });

  const [isSimulated, setIsSimulated] = useState(false);
  const [useML, setUseML] = useState(false);
  const [mlLoaded, setMlLoaded] = useState(false);

  useEffect(() => {
    const loadMLModel = async () => {
      try {
        await mlModel.loadModel();
        setMlLoaded(true);
      } catch (error) {
        console.error('ML model load failed:', error);
      }
    };
    loadMLModel();
  }, []);

  const resetParams = () => {
    setParams({
      lifelineThreshold: 30,
      lifelineRate: 12.5,
      domesticRate: 20.5,
      fixedCharge: 150,
      regionalSubsidy: 0,
    });
    setIsSimulated(false);
  };

  const calculateNewElectricityCost = (consumption: number) => {
    let cost = 0;
    if (consumption <= params.lifelineThreshold) {
      cost = consumption * params.lifelineRate;
    } else {
      cost = params.lifelineThreshold * params.lifelineRate;
      cost += (consumption - params.lifelineThreshold) * params.domesticRate;
    }
    cost += params.fixedCharge;
    cost = cost * (1 - params.regionalSubsidy / 100);
    return cost;
  };

  const simulationResults = useMemo(() => {
    if (!isSimulated) return null;

    const results = householdData.map(hh => {
      const newCost = calculateNewElectricityCost(hh.consumption);
      const newEPI = calculateEPI(newCost, hh.householdIncome);
      const newCategory = classifyEPI(newEPI);
      
      return {
        ...hh,
        oldCost: hh.electricityCost,
        newCost: Math.round(newCost),
        oldEPI: hh.epi,
        newEPI: parseFloat(newEPI.toFixed(2)),
        oldCategory: hh.epiCategory,
        newCategory: newCategory,
        costChange: Math.round(newCost - hh.electricityCost),
        costChangePercent: parseFloat((((newCost - hh.electricityCost) / hh.electricityCost) * 100).toFixed(1)),
      };
    });

    const totalHouseholds = results.length;
    const avgNewEPI = results.reduce((sum, r) => sum + r.newEPI, 0) / totalHouseholds;
    const oldAvgEPI = results.reduce((sum, r) => sum + r.oldEPI, 0) / totalHouseholds;
    
    const oldAffordable = results.filter(r => r.oldCategory === "Affordable").length;
    const newAffordable = results.filter(r => r.newCategory === "Affordable").length;
    
    const oldSevere = results.filter(r => r.oldCategory === "Severe energy poverty").length;
    const newSevere = results.filter(r => r.newCategory === "Severe energy poverty").length;
    
    const oldTotalRevenue = results.reduce((sum, r) => sum + r.oldCost, 0);
    const newTotalRevenue = results.reduce((sum, r) => sum + r.newCost, 0);
    const revenueChange = newTotalRevenue - oldTotalRevenue;
    
    const benefitingHouseholds = results.filter(r => r.costChange < 0).length;
    
    const oldDistribution = [
      { category: "Affordable", count: results.filter(r => r.oldCategory === "Affordable").length },
      { category: "Moderate", count: results.filter(r => r.oldCategory === "Moderate burden").length },
      { category: "Poverty", count: results.filter(r => r.oldCategory === "Energy poverty").length },
      { category: "Severe", count: results.filter(r => r.oldCategory === "Severe energy poverty").length },
    ];
    
    const newDistribution = [
      { category: "Affordable", count: results.filter(r => r.newCategory === "Affordable").length },
      { category: "Moderate", count: results.filter(r => r.newCategory === "Moderate burden").length },
      { category: "Poverty", count: results.filter(r => r.newCategory === "Energy poverty").length },
      { category: "Severe", count: results.filter(r => r.newCategory === "Severe energy poverty").length },
    ];
    
    const comparisonData = oldDistribution.map((item, index) => ({
      category: item.category,
      current: item.count,
      simulated: newDistribution[index].count,
    }));

    return {
      results,
      avgNewEPI,
      oldAvgEPI,
      newAffordable,
      oldAffordable,
      newSevere,
      oldSevere,
      revenueChange,
      benefitingHouseholds,
      comparisonData,
      totalHouseholds,
    };
  }, [isSimulated, params]);

  const runSimulation = () => {
    setIsSimulated(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Tariff Policy Simulator</h1>
          <p className="text-gray-600">
            Test and predict the impact of tariff policy changes before implementation
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-900">
            <p>
              Adjust tariff parameters below to simulate policy changes. 
              {mlLoaded && " ML model loaded for enhanced predictions."}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Tariff Parameters</h2>
                {mlLoaded && (
                  <button
                    onClick={() => setUseML(!useML)}
                    className={`flex items-center gap-1 text-xs px-2 py-1 rounded ${
                      useML ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    <Sparkles className="w-3 h-3" />
                    {useML ? 'ML ON' : 'ML OFF'}
                  </button>
                )}
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lifeline Threshold (kWh)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={params.lifelineThreshold}
                    onChange={(e) => setParams({ ...params, lifelineThreshold: Number(e.target.value) })}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <span>0</span>
                    <span className="font-medium text-gray-900">{params.lifelineThreshold} kWh</span>
                    <span>100</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lifeline Rate (KES/kWh)
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="25"
                    step="0.5"
                    value={params.lifelineRate}
                    onChange={(e) => setParams({ ...params, lifelineRate: Number(e.target.value) })}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <span>5</span>
                    <span className="font-medium text-gray-900">KES {params.lifelineRate}</span>
                    <span>25</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Domestic Rate (KES/kWh)
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="40"
                    step="0.5"
                    value={params.domesticRate}
                    onChange={(e) => setParams({ ...params, domesticRate: Number(e.target.value) })}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <span>10</span>
                    <span className="font-medium text-gray-900">KES {params.domesticRate}</span>
                    <span>40</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fixed Monthly Charge (KES)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="500"
                    step="10"
                    value={params.fixedCharge}
                    onChange={(e) => setParams({ ...params, fixedCharge: Number(e.target.value) })}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <span>0</span>
                    <span className="font-medium text-gray-900">KES {params.fixedCharge}</span>
                    <span>500</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Regional Subsidy (%)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    step="5"
                    value={params.regionalSubsidy}
                    onChange={(e) => setParams({ ...params, regionalSubsidy: Number(e.target.value) })}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <span>0%</span>
                    <span className="font-medium text-gray-900">{params.regionalSubsidy}%</span>
                    <span>50%</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <button
                  onClick={runSimulation}
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4" />
                  Run Simulation
                </button>
                <button
                  onClick={resetParams}
                  className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset to Current
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Quick Scenarios</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setParams({ lifelineThreshold: 50, lifelineRate: 10, domesticRate: 20.5, fixedCharge: 150, regionalSubsidy: 0 })}
                  className="w-full text-left px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded text-sm transition-colors"
                >
                  <div className="font-medium text-gray-900">Expand Lifeline</div>
                  <div className="text-xs text-gray-500">50 kWh @ KES 10/kWh</div>
                </button>
                <button
                  onClick={() => setParams({ lifelineThreshold: 30, lifelineRate: 12.5, domesticRate: 20.5, fixedCharge: 50, regionalSubsidy: 0 })}
                  className="w-full text-left px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded text-sm transition-colors"
                >
                  <div className="font-medium text-gray-900">Reduce Fixed Charges</div>
                  <div className="text-xs text-gray-500">Lower to KES 50/month</div>
                </button>
                <button
                  onClick={() => setParams({ lifelineThreshold: 30, lifelineRate: 12.5, domesticRate: 20.5, fixedCharge: 150, regionalSubsidy: 20 })}
                  className="w-full text-left px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded text-sm transition-colors"
                >
                  <div className="font-medium text-gray-900">Regional Subsidy</div>
                  <div className="text-xs text-gray-500">20% subsidy for poor regions</div>
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            {simulationResults ? (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-5 h-5 text-blue-600" />
                      <span className="text-sm text-gray-600">Households Benefiting</span>
                    </div>
                    <div className="text-2xl font-semibold text-gray-900">
                      {simulationResults.benefitingHouseholds.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      {((simulationResults.benefitingHouseholds / simulationResults.totalHouseholds) * 100).toFixed(1)}% of total
                    </div>
                  </div>

                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingDown className="w-5 h-5 text-green-600" />
                      <span className="text-sm text-gray-600">Average EPI Change</span>
                    </div>
                    <div className="text-2xl font-semibold text-gray-900">
                      {(simulationResults.avgNewEPI - simulationResults.oldAvgEPI).toFixed(2)}%
                    </div>
                    <div className={`text-sm ${
                      simulationResults.avgNewEPI < simulationResults.oldAvgEPI ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {simulationResults.avgNewEPI < simulationResults.oldAvgEPI ? '↓' : '↑'} 
                      {' '}{simulationResults.oldAvgEPI.toFixed(2)}% → {simulationResults.avgNewEPI.toFixed(2)}%
                    </div>
                  </div>

                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-5 h-5 text-purple-600" />
                      <span className="text-sm text-gray-600">Revenue Impact</span>
                    </div>
                    <div className={`text-2xl font-semibold ${
                      simulationResults.revenueChange < 0 ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {simulationResults.revenueChange < 0 ? '-' : '+'}KES {Math.abs(simulationResults.revenueChange).toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">Monthly impact</div>
                  </div>

                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-5 h-5 text-orange-600" />
                      <span className="text-sm text-gray-600">Severe Poverty Change</span>
                    </div>
                    <div className="text-2xl font-semibold text-gray-900">
                      {simulationResults.newSevere - simulationResults.oldSevere > 0 ? '+' : ''}
                      {simulationResults.newSevere - simulationResults.oldSevere}
                    </div>
                    <div className={`text-sm ${
                      simulationResults.newSevere < simulationResults.oldSevere ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {simulationResults.oldSevere} → {simulationResults.newSevere} households
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">EPI Distribution: Current vs Simulated</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={simulationResults.comparisonData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="current" fill="#9ca3af" name="Current Tariff" />
                      <Bar dataKey="simulated" fill="#10b981" name="Simulated Tariff" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Policy Impact Summary</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border-l-4 border-green-500 pl-4">
                      <div className="font-semibold text-gray-900 mb-1">Social Benefits</div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• {simulationResults.newAffordable - simulationResults.oldAffordable} more households with affordable energy</li>
                        <li>• {simulationResults.oldSevere - simulationResults.newSevere} fewer households in severe poverty</li>
                        <li>• {simulationResults.benefitingHouseholds.toLocaleString()} households see cost reduction</li>
                      </ul>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-4">
                      <div className="font-semibold text-gray-900 mb-1">Financial Impact</div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Monthly revenue change: KES {simulationResults.revenueChange.toLocaleString()}</li>
                        <li>• Annual impact: KES {(simulationResults.revenueChange * 12).toLocaleString()}</li>
                        <li>• Subsidy cost: KES {((simulationResults.revenueChange < 0 ? Math.abs(simulationResults.revenueChange) : 0) * 12).toLocaleString()}/year</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 p-12">
                <div className="text-center text-gray-500">
                  <Play className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Simulation Results</h3>
                  <p className="text-sm">
                    Adjust the tariff parameters and click "Run Simulation" to see predicted policy impacts
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
