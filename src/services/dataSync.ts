import { kplcAPI, epraAPI, internalAPI } from './api';
import { HouseholdData, RegionStats } from '../app/data/sampleData';

export class DataSyncService {
  private syncInProgress = false;
  private lastSyncTime: Date | null = null;

  async syncFromKPLC(): Promise<{ success: boolean; recordCount: number }> {
    if (this.syncInProgress) {
      throw new Error('Sync already in progress');
    }

    this.syncInProgress = true;
    try {
      const response = await kplcAPI.getHouseholdData();
      const households = this.transformKPLCData(response.data);
      
      await this.saveToLocalDB(households);
      
      this.lastSyncTime = new Date();
      this.syncInProgress = false;
      
      return { success: true, recordCount: households.length };
    } catch (error) {
      this.syncInProgress = false;
      console.error('KPLC sync failed:', error);
      return { success: false, recordCount: 0 };
    }
  }

  async syncFromEPRA(): Promise<{ success: boolean }> {
    try {
      const response = await epraAPI.getTariffStructures();
      await this.saveTariffData(response.data);
      return { success: true };
    } catch (error) {
      console.error('EPRA sync failed:', error);
      return { success: false };
    }
  }

  private transformKPLCData(rawData: any): HouseholdData[] {
    return rawData.map((record: any) => ({
      id: record.account_number,
      region: record.region,
      county: record.county,
      constituency: record.constituency,
      latitude: record.latitude,
      longitude: record.longitude,
      householdIncome: record.estimated_income || 30000,
      electricityCost: record.monthly_bill,
      consumption: record.monthly_kwh,
      householdSize: record.household_size || 4,
      epi: (record.monthly_bill / (record.estimated_income || 30000)) * 100,
      epiCategory: this.classifyEPI((record.monthly_bill / (record.estimated_income || 30000)) * 100),
    }));
  }

  private classifyEPI(epi: number): HouseholdData['epiCategory'] {
    if (epi <= 5) return 'Affordable';
    if (epi <= 10) return 'Moderate burden';
    if (epi <= 20) return 'Energy poverty';
    return 'Severe energy poverty';
  }

  private async saveToLocalDB(households: HouseholdData[]) {
    localStorage.setItem('households_data', JSON.stringify(households));
    localStorage.setItem('last_sync', new Date().toISOString());
  }

  private async saveTariffData(tariffs: any) {
    localStorage.setItem('tariff_data', JSON.stringify(tariffs));
  }

  getLastSyncTime(): Date | null {
    const stored = localStorage.getItem('last_sync');
    return stored ? new Date(stored) : null;
  }

  isDataStale(maxAgeHours: number = 24): boolean {
    const lastSync = this.getLastSyncTime();
    if (!lastSync) return true;
    
    const ageHours = (Date.now() - lastSync.getTime()) / (1000 * 60 * 60);
    return ageHours > maxAgeHours;
  }
}

export const dataSyncService = new DataSyncService();
