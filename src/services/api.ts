// API Service Layer for EPRA/KPLC Integration

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
const EPRA_API_URL = import.meta.env.VITE_EPRA_API_URL || '';
const KPLC_API_URL = import.meta.env.VITE_KPLC_API_URL || '';

export interface APIResponse<T> {
  data: T;
  status: number;
  message?: string;
}

async function apiClient<T>(url: string, options?: RequestInit): Promise<APIResponse<T>> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        ...options?.headers,
      },
    });

    const data = await response.json();
    return { data, status: response.status };
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

export const epraAPI = {
  getTariffStructures: () => apiClient(`${EPRA_API_URL}/tariffs`),
  getRegulatoryData: () => apiClient(`${EPRA_API_URL}/regulatory-data`),
  submitTariffProposal: (proposal: any) =>
    apiClient(`${EPRA_API_URL}/proposals`, {
      method: 'POST',
      body: JSON.stringify(proposal),
    }),
};

export const kplcAPI = {
  getHouseholdData: (filters?: any) =>
    apiClient(`${KPLC_API_URL}/households`, {
      method: 'POST',
      body: JSON.stringify(filters),
    }),
  getBillingData: (startDate: string, endDate: string) =>
    apiClient(`${KPLC_API_URL}/billing?start=${startDate}&end=${endDate}`),
  getRegionalStats: () => apiClient(`${KPLC_API_URL}/regional-stats`),
};

export const internalAPI = {
  getHouseholds: (params?: any) =>
    apiClient(`${API_BASE_URL}/households`, {
      method: 'POST',
      body: JSON.stringify(params),
    }),
  runPrediction: (simulationParams: any) =>
    apiClient(`${API_BASE_URL}/ml/predict`, {
      method: 'POST',
      body: JSON.stringify(simulationParams),
    }),
  getGISData: (region?: string) =>
    apiClient(`${API_BASE_URL}/gis/boundaries${region ? `?region=${region}` : ''}`),
  syncData: () => apiClient(`${API_BASE_URL}/sync`, { method: 'POST' }),
};
