export interface EstimationModel {
  effort: number;
  duration: number;
  cost: number;
}

export interface FinancialMetrics {
  npv: number;
  irr: number;
  roi: number;
  paybackPeriod: number;
  cashFlow: number[];
}

export interface MonteCarloSimulation {
  mean_cost: number;
  std_dev: number;
  p10_cost: number;
  p90_cost: number;
}

export interface SensitivityAnalysis {
  revenue_impact: number;
  cost_impact: number;
  projectScale: number;
}

export interface OptimizationScenario {
  scenario_name: string;
  team_size: number;
  duration: number;
  cost: number;
  cost_saving: number;
  time_saving: number;
}

export interface RiskAssessment {
  technical: number;
  human: number;
  budget: number;
}

export interface BudgetTracking {
  planned: number;
  forecasted: number;
  variance: number;
}

export interface ResourceUtilization {
  developers: number;
  testers: number;
}

export interface CalculationResult {
  estimation_models: {
    cocomo: EstimationModel;
    function_point: EstimationModel;
  };
  financials: FinancialMetrics;
  risk_analysis: RiskAssessment;
  monte_carlo_simulation: MonteCarloSimulation;
  sensitivity_analysis: SensitivityAnalysis;
  budget_tracking: BudgetTracking;
  optimization_scenarios: OptimizationScenario[];
  resourceUtilization: ResourceUtilization;
}

export interface ProjectData {
  projectName: string;
  sloc: number;
  projectClass: "organic" | "semi-detached" | "embedded";
  eaf: number;
  discountRate: number;
  developers: number;
  testers: number;
  expectedRevenue: number;
  projectDuration: number;
}
