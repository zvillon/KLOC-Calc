import { ProjectData, CalculationResult } from '../types';

const API_BASE_URL = 'http://localhost:8000/api';

export const calculateEstimation = async (data: ProjectData): Promise<CalculationResult> => {
  try {
    const response = await fetch(`${API_BASE_URL}/calculate/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    
    // Return mock data for demonstration
    const mockResult: CalculationResult = {
      effort: calculateMockEffort(data),
      duration: calculateMockDuration(data),
      teamSize: data.developers + data.testers,
      totalCost: calculateMockCost(data),
      npv: calculateMockNPV(data),
      irr: 90.2,
      roi: 127.5,
      paybackPeriod: 1,
      riskScore: 72.0,
      confidenceInterval: {
        low: 115000,
        high: 220000,
      },
      cashFlow: [0, 75000, 125000, 175000, 200000],
      budgetTracking: {
        planned: 164.9,
        actual: 375.1,
        variance: 210.2,
      },
      resourceUtilization: {
        developers: 47.0,
        testers: 40.0,
      },
      riskAssessment: {
        technical: 24.0,
        human: 12.0,
        budget: 36.0,
      },
      sensitivityAnalysis: {
        discountRate: -2.9,
        development: 10.0,
        projectScale: 20.0,
      },
      optimization: {
        currentDuration: 40,
        optimizedDuration: 36,
        timeSavings: 4,
        costSavings: 8000,
      },
    };

    return mockResult;
  }
};

// Mock calculation functions for demonstration
const calculateMockEffort = (data: ProjectData): number => {
  const cocomoConstants = {
    organic: { a: 2.4, b: 1.05 },
    'semi-detached': { a: 3.0, b: 1.12 },
    embedded: { a: 3.6, b: 1.20 },
  };
  
  const constants = cocomoConstants[data.projectClass];
  const ksloc = data.sloc / 1000;
  return constants.a * Math.pow(ksloc, constants.b) * data.eaf;
};

const calculateMockDuration = (data: ProjectData): number => {
  const effort = calculateMockEffort(data);
  const cocomoConstants = {
    organic: { c: 2.5, d: 0.38 },
    'semi-detached': { c: 2.5, d: 0.35 },
    embedded: { c: 2.5, d: 0.32 },
  };
  
  const constants = cocomoConstants[data.projectClass];
  return constants.c * Math.pow(effort, constants.d);
};

const calculateMockCost = (data: ProjectData): number => {
  const effort = calculateMockEffort(data);
  const avgSalary = 5000; // Monthly salary assumption
  return effort * avgSalary;
};

const calculateMockNPV = (data: ProjectData): number => {
  const cost = calculateMockCost(data);
  const revenue = data.expectedRevenue;
  const cashFlows = [-cost * 0.3, -cost * 0.4, -cost * 0.3, revenue * 0.6, revenue * 0.4];
  
  let npv = 0;
  cashFlows.forEach((cf, i) => {
    npv += cf / Math.pow(1 + data.discountRate, i);
  });
  
  return npv;
};