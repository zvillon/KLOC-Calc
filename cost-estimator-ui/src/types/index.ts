export interface ProjectData {
  projectName: string;
  sloc: number;
  projectClass: 'organic' | 'semi-detached' | 'embedded';
  eaf: number;
  discountRate: number;
  developers: number;
  testers: number;
  expectedRevenue: number;
  projectDuration: number;
}

export interface CalculationResult {
  effort: number;
  duration: number;
  teamSize: number;
  totalCost: number;
  npv: number;
  irr: number;
  roi: number;
  paybackPeriod: number;
  riskScore: number;
  confidenceInterval: {
    low: number;
    high: number;
  };
  cashFlow: number[];
  budgetTracking: {
    planned: number;
    actual: number;
    variance: number;
  };
  resourceUtilization: {
    developers: number;
    testers: number;
  };
  riskAssessment: {
    technical: number;
    human: number;
    budget: number;
  };
  sensitivityAnalysis: {
    discountRate: number;
    development: number;
    projectScale: number;
  };
  optimization: {
    currentDuration: number;
    optimizedDuration: number;
    timeSavings: number;
    costSavings: number;
  };
}