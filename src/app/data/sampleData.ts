// Sample dataset for EquiGrid Kenya prototype

export interface HouseholdData {
  id: string;
  region: string;
  county: string;
  constituency: string;
  latitude: number;
  longitude: number;
  householdIncome: number; // KES per month
  electricityCost: number; // KES per month
  consumption: number; // kWh per month
  householdSize: number;
  epi: number; // Energy Poverty Index
  epiCategory: "Affordable" | "Moderate burden" | "Energy poverty" | "Severe energy poverty";
}

export interface TariffStructure {
  name: string;
  threshold: number; // kWh
  rate: number; // KES per kWh
  fixedCharge: number; // KES per month
}

export interface RegionStats {
  region: string;
  county: string;
  totalHouseholds: number;
  avgEPI: number;
  affordableCount: number;
  moderateCount: number;
  povertyCount: number;
  severePovertyCount: number;
  avgIncome: number;
  avgConsumption: number;
  latitude: number;
  longitude: number;
}

// Calculate EPI
export function calculateEPI(electricityCost: number, householdIncome: number): number {
  if (householdIncome === 0) return 100;
  return (electricityCost / householdIncome) * 100;
}

// Classify EPI
export function classifyEPI(epi: number): HouseholdData['epiCategory'] {
  if (epi <= 5) return "Affordable";
  if (epi <= 10) return "Moderate burden";
  if (epi <= 20) return "Energy poverty";
  return "Severe energy poverty";
}

// Current Kenya tariff structure (simplified)
export const currentTariffs: TariffStructure[] = [
  { name: "Lifeline (0-30 kWh)", threshold: 30, rate: 12.5, fixedCharge: 150 },
  { name: "Domestic (31-100 kWh)", threshold: 100, rate: 20.5, fixedCharge: 150 },
  { name: "Domestic (101-1000 kWh)", threshold: 1000, rate: 25.5, fixedCharge: 150 },
  { name: "Domestic (>1000 kWh)", threshold: Infinity, rate: 28.5, fixedCharge: 150 },
];

// All 47 Kenya counties with coordinates
export const kenyaRegions = [
  { county: "Nairobi", latitude: -1.2864, longitude: 36.8172 },
  { county: "Mombasa", latitude: -4.0435, longitude: 39.6682 },
  { county: "Kwale", latitude: -4.1747, longitude: 39.4467 },
  { county: "Kilifi", latitude: -3.6310, longitude: 39.8490 },
  { county: "Tana River", latitude: -1.5200, longitude: 39.8800 },
  { county: "Lamu", latitude: -2.2717, longitude: 40.9020 },
  { county: "Taita Taveta", latitude: -3.3167, longitude: 38.4833 },
  { county: "Garissa", latitude: -0.4536, longitude: 39.6401 },
  { county: "Wajir", latitude: 1.7471, longitude: 40.0573 },
  { county: "Mandera", latitude: 3.9366, longitude: 41.8550 },
  { county: "Marsabit", latitude: 2.3284, longitude: 37.9899 },
  { county: "Isiolo", latitude: 0.3556, longitude: 37.5833 },
  { county: "Meru", latitude: 0.0469, longitude: 37.6553 },
  { county: "Tharaka Nithi", latitude: -0.2989, longitude: 37.7167 },
  { county: "Embu", latitude: -0.5310, longitude: 37.4570 },
  { county: "Kitui", latitude: -1.3667, longitude: 38.0167 },
  { county: "Machakos", latitude: -1.5177, longitude: 37.2634 },
  { county: "Makueni", latitude: -2.2667, longitude: 37.8333 },
  { county: "Nyandarua", latitude: -0.1833, longitude: 36.5167 },
  { county: "Nyeri", latitude: -0.4196, longitude: 36.9472 },
  { county: "Kirinyaga", latitude: -0.6589, longitude: 37.3833 },
  { county: "Murang'a", latitude: -0.7210, longitude: 37.1526 },
  { county: "Kiambu", latitude: -1.1714, longitude: 36.8356 },
  { county: "Turkana", latitude: 3.1167, longitude: 35.5997 },
  { county: "West Pokot", latitude: 1.6167, longitude: 35.1167 },
  { county: "Samburu", latitude: 1.2153, longitude: 36.9458 },
  { county: "Trans Nzoia", latitude: 1.0500, longitude: 34.9500 },
  { county: "Uasin Gishu", latitude: 0.5200, longitude: 35.2698 },
  { county: "Elgeyo Marakwet", latitude: 0.8667, longitude: 35.4667 },
  { county: "Nandi", latitude: 0.1833, longitude: 35.1167 },
  { county: "Baringo", latitude: 0.4667, longitude: 36.0833 },
  { county: "Laikipia", latitude: 0.3667, longitude: 36.7833 },
  { county: "Nakuru", latitude: -0.3031, longitude: 36.0800 },
  { county: "Narok", latitude: -1.0833, longitude: 35.8667 },
  { county: "Kajiado", latitude: -1.8524, longitude: 36.7820 },
  { county: "Kericho", latitude: -0.3676, longitude: 35.2839 },
  { county: "Bomet", latitude: -0.7833, longitude: 35.3167 },
  { county: "Kakamega", latitude: 0.2827, longitude: 34.7519 },
  { county: "Vihiga", latitude: 0.0667, longitude: 34.7167 },
  { county: "Bungoma", latitude: 0.5635, longitude: 34.5600 },
  { county: "Busia", latitude: 0.4344, longitude: 34.1115 },
  { county: "Siaya", latitude: -0.0617, longitude: 34.2883 },
  { county: "Kisumu", latitude: -0.0917, longitude: 34.7680 },
  { county: "Homa Bay", latitude: -0.5167, longitude: 34.4500 },
  { county: "Migori", latitude: -1.0634, longitude: 34.4731 },
  { county: "Kisii", latitude: -0.6817, longitude: 34.7680 },
  { county: "Nyamira", latitude: -0.5667, longitude: 34.9333 },
];

// Generate sample household data
function generateHouseholdData(): HouseholdData[] {
  const households: HouseholdData[] = [];
  let id = 1;

  kenyaRegions.forEach((region) => {
    // Generate 50-200 households per county
    const householdCount = Math.floor(Math.random() * 150) + 50;
    
    for (let i = 0; i < householdCount; i++) {
      // Vary income distribution by region
      const baseIncome = region.county === "Nairobi" ? 45000 : 
                         region.county === "Mombasa" ? 35000 :
                         region.county === "Kiambu" ? 40000 : 25000;
      
      const householdIncome = baseIncome + (Math.random() - 0.5) * baseIncome * 0.8;
      const consumption = 50 + Math.random() * 200; // 50-250 kWh
      
      // Calculate electricity cost based on current tariff
      let electricityCost = 0;
      let remainingConsumption = consumption;
      
      for (const tariff of currentTariffs) {
        const bandConsumption = Math.min(remainingConsumption, tariff.threshold - (consumption - remainingConsumption));
        electricityCost += bandConsumption * tariff.rate;
        remainingConsumption -= bandConsumption;
        if (remainingConsumption <= 0) break;
      }
      electricityCost += currentTariffs[0].fixedCharge;
      
      const epi = calculateEPI(electricityCost, householdIncome);
      
      households.push({
        id: `HH${String(id).padStart(6, '0')}`,
        region: region.county,
        county: region.county,
        constituency: `${region.county} ${Math.floor(i / 20) + 1}`,
        latitude: region.latitude + (Math.random() - 0.5) * 0.3,
        longitude: region.longitude + (Math.random() - 0.5) * 0.3,
        householdIncome: Math.round(householdIncome),
        electricityCost: Math.round(electricityCost),
        consumption: Math.round(consumption),
        householdSize: Math.floor(Math.random() * 5) + 2,
        epi: parseFloat(epi.toFixed(2)),
        epiCategory: classifyEPI(epi),
      });
      
      id++;
    }
  });

  return households;
}

// Generate region statistics
function generateRegionStats(households: HouseholdData[]): RegionStats[] {
  const regionMap = new Map<string, HouseholdData[]>();
  
  households.forEach((hh) => {
    if (!regionMap.has(hh.county)) {
      regionMap.set(hh.county, []);
    }
    regionMap.get(hh.county)!.push(hh);
  });

  return Array.from(regionMap.entries()).map(([county, hhs]) => {
    const totalHouseholds = hhs.length;
    const avgEPI = hhs.reduce((sum, hh) => sum + hh.epi, 0) / totalHouseholds;
    const affordableCount = hhs.filter(hh => hh.epiCategory === "Affordable").length;
    const moderateCount = hhs.filter(hh => hh.epiCategory === "Moderate burden").length;
    const povertyCount = hhs.filter(hh => hh.epiCategory === "Energy poverty").length;
    const severePovertyCount = hhs.filter(hh => hh.epiCategory === "Severe energy poverty").length;
    const avgIncome = hhs.reduce((sum, hh) => sum + hh.householdIncome, 0) / totalHouseholds;
    const avgConsumption = hhs.reduce((sum, hh) => sum + hh.consumption, 0) / totalHouseholds;
    
    const regionInfo = kenyaRegions.find(r => r.county === county)!;
    
    return {
      region: county,
      county,
      totalHouseholds,
      avgEPI: parseFloat(avgEPI.toFixed(2)),
      affordableCount,
      moderateCount,
      povertyCount,
      severePovertyCount,
      avgIncome: Math.round(avgIncome),
      avgConsumption: Math.round(avgConsumption),
      latitude: regionInfo.latitude,
      longitude: regionInfo.longitude,
    };
  });
}

export const householdData = generateHouseholdData();
export const regionStats = generateRegionStats(householdData);
