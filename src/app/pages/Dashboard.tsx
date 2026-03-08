import Navigation from "../components/Navigation";
import StatCard from "../components/StatCard";
import { Home, Users, TrendingUp, DollarSign, AlertTriangle, CheckCircle } from "lucide-react";
import { householdData, regionStats } from "../data/sampleData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function Dashboard() {
  // Calculate statistics
  const totalHouseholds = householdData.length;
  const avgEPI = householdData.reduce((sum, hh) => sum + hh.epi, 0) / totalHouseholds;
  const affordableCount = householdData.filter(hh => hh.epiCategory === "Affordable").length;
  const moderateCount = householdData.filter(hh => hh.epiCategory === "Moderate burden").length;
  const povertyCount = householdData.filter(hh => hh.epiCategory === "Energy poverty").length;
  const severePovertyCount = householdData.filter(hh => hh.epiCategory === "Severe energy poverty").length;
  const avgIncome = householdData.reduce((sum, hh) => sum + hh.householdIncome, 0) / totalHouseholds;
  const avgConsumption = householdData.reduce((sum, hh) => sum + hh.consumption, 0) / totalHouseholds;

  // Prepare chart data
  const epiDistribution = [
    { name: "Affordable (0-5%)", value: affordableCount, percentage: ((affordableCount / totalHouseholds) * 100).toFixed(1) },
    { name: "Moderate (5-10%)", value: moderateCount, percentage: ((moderateCount / totalHouseholds) * 100).toFixed(1) },
    { name: "Poverty (10-20%)", value: povertyCount, percentage: ((povertyCount / totalHouseholds) * 100).toFixed(1) },
    { name: "Severe (>20%)", value: severePovertyCount, percentage: ((severePovertyCount / totalHouseholds) * 100).toFixed(1) },
  ];

  const COLORS = ["#10b981", "#f59e0b", "#f97316", "#ef4444"];

  // Top regions by energy poverty
  const topPovertyRegions = [...regionStats]
    .sort((a, b) => b.avgEPI - a.avgEPI)
    .slice(0, 10)
    .map(r => ({
      county: r.county,
      avgEPI: r.avgEPI,
      severePovertyRate: ((r.severePovertyCount / r.totalHouseholds) * 100).toFixed(1)
    }));

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Policy Dashboard</h1>
          <p className="text-gray-600">
            Overview of energy poverty metrics and tariff policy analytics for Kenya
          </p>
        </div>

        {/* Key Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Households Analyzed"
            value={totalHouseholds.toLocaleString()}
            icon={Home}
            color="blue"
          />
          <StatCard
            title="Average EPI"
            value={`${avgEPI.toFixed(2)}%`}
            subtitle="Electricity cost / Household income"
            icon={TrendingUp}
            color="purple"
          />
          <StatCard
            title="In Energy Poverty"
            value={`${(((povertyCount + severePovertyCount) / totalHouseholds) * 100).toFixed(1)}%`}
            subtitle={`${(povertyCount + severePovertyCount).toLocaleString()} households`}
            icon={AlertTriangle}
            color="red"
          />
          <StatCard
            title="Affordable Energy"
            value={`${((affordableCount / totalHouseholds) * 100).toFixed(1)}%`}
            subtitle={`${affordableCount.toLocaleString()} households`}
            icon={CheckCircle}
            color="green"
          />
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <StatCard
            title="Average Monthly Income"
            value={`KES ${Math.round(avgIncome).toLocaleString()}`}
            icon={DollarSign}
            color="green"
          />
          <StatCard
            title="Average Monthly Consumption"
            value={`${Math.round(avgConsumption)} kWh`}
            icon={TrendingUp}
            color="blue"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* EPI Distribution */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Energy Poverty Index Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={epiDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name}: ${percentage}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {epiDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              {epiDistribution.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: COLORS[index] }}></div>
                  <span className="text-gray-700">{item.name}: {item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Regions by Energy Poverty */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Counties by Average EPI</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topPovertyRegions} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="county" type="category" width={80} />
                <Tooltip />
                <Bar dataKey="avgEPI" fill="#f97316" name="Avg EPI %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* System Overview */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">About EquiGrid Kenya</h2>
          <div className="prose max-w-none text-gray-600">
            <p className="mb-4">
              <strong>EquiGrid Kenya</strong> is an AI-powered energy equity and tariff policy simulation platform designed to help 
              electricity regulators design fair electricity tariffs. The platform combines energy poverty mapping and AI-based 
              tariff simulations to help policymakers test electricity pricing policies before implementation.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="border-l-4 border-green-600 pl-4">
                <h3 className="font-semibold text-gray-900 mb-2">Energy Poverty Index (EPI)</h3>
                <p className="text-sm">
                  Calculates the ratio of electricity costs to household income, helping identify households 
                  facing energy affordability challenges.
                </p>
              </div>
              
              <div className="border-l-4 border-blue-600 pl-4">
                <h3 className="font-semibold text-gray-900 mb-2">Geospatial Mapping</h3>
                <p className="text-sm">
                  Interactive heatmaps visualize energy poverty across Kenya's counties, enabling 
                  targeted policy interventions.
                </p>
              </div>
              
              <div className="border-l-4 border-purple-600 pl-4">
                <h3 className="font-semibold text-gray-900 mb-2">AI Tariff Simulation</h3>
                <p className="text-sm">
                  Machine learning models predict the impact of tariff changes on households, utilities, 
                  and subsidy requirements.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Problem Statement */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-orange-900 mb-3 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Background Problem
          </h2>
          <div className="text-orange-800 space-y-2">
            <p>In Kenya, electricity tariffs are mainly based on <strong>consumption levels rather than household income</strong>, 
            which creates inequitable pricing.</p>
            <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
              <li>Low-income households may consume more electricity for basic needs and fall into higher tariff bands</li>
              <li>Wealthier households may use solar and consume less grid electricity, paying lower tariffs</li>
              <li>Policymakers lack tools to predict the <strong>social impact of tariff changes</strong></li>
              <li>Energy poverty is not clearly mapped geographically</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
