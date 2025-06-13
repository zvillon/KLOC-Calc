import React from "react";
import {
  TrendingUp,
  DollarSign,
  Clock,
  AlertTriangle,
  Zap,
  BarChart3,
  Rocket,
} from "lucide-react";
import { CalculationResult, ProjectData } from "../types/index";
import MetricCard from "./MetricCard";
import ProgressBar from "./ProgressBar";

interface ResultsDashboardProps {
  results: CalculationResult | null;
  formData: ProjectData | null;
}

const ResultsDashboard: React.FC<ResultsDashboardProps> = ({
  results,
  formData,
}) => {
  if (!results || !formData) {
    return (
      <div className="flex items-center justify-center h-96 text-gray-400">
        <div className="text-center">
          <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p className="text-sm sm:text-base">
            Submit project data to see analysis results
          </p>
        </div>
      </div>
    );
  }

  const formatCurrency = (value?: number) => {
    const num = value || 0;
    if (Math.abs(num) >= 1_000_000) return `$${(num / 1_000_000).toFixed(2)}M`;
    if (Math.abs(num) >= 1_000) return `$${(num / 1_000).toFixed(2)}K`;
    return `$${num.toFixed(2)}`;
  };
  const formatPercentage = (value?: number) => `${(value || 0).toFixed(2)}%`;

  const {
    financials = { npv: 0, irr: 0, roi: 0, paybackPeriod: -1, cashFlow: [] },
    budget_tracking = { planned: 0, forecasted: 0, variance: 0 },
    monte_carlo_simulation = {
      mean_cost: 0,
      std_dev: 0,
      p10_cost: 0,
      p90_cost: 0,
    },
    optimization_scenarios = [],
    risk_analysis = { technical: 0, human: 0, budget: 0 },
    sensitivity_analysis = {
      revenue_impact: 0,
      cost_impact: 0,
      projectScale: 0,
    },
    resourceUtilization = { developers: 0, testers: 0 },
    estimation_models = {
      cocomo: { effort: 0, duration: 0, cost: 0 },
      function_point: { effort: 0, duration: 0, cost: 0 },
    },
  } = results || {};

  const totalRiskScore =
    risk_analysis.technical + risk_analysis.human + risk_analysis.budget;
  const paybackPeriodText =
    financials.paybackPeriod === -1
      ? "Never"
      : `${financials.paybackPeriod.toFixed(2)} years`;

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-2">
        <TrendingUp className="w-5 h-5 text-green-400" />
        <h2 className="text-xl font-bold text-white">Financial Analysis</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="IRR"
          value={formatPercentage(financials.irr)}
          subtitle="Internal Rate of Return"
          icon={TrendingUp}
          color="blue"
        />
        <MetricCard
          title="ROI"
          value={formatPercentage(financials.roi)}
          subtitle="Return on Investment"
          icon={DollarSign}
          color="green"
        />
        <MetricCard
          title="Payback Period"
          value={paybackPeriodText}
          subtitle="Time to break even"
          icon={Clock}
          color="purple"
        />
        <MetricCard
          title="Risk Score"
          value={formatPercentage(totalRiskScore)}
          subtitle={`${formatCurrency(
            monte_carlo_simulation.p90_cost
          )} - ${formatCurrency(monte_carlo_simulation.p10_cost)}`}
          icon={AlertTriangle}
          color="red"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-700/50">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
            Cash Flow Analysis (Annual)
          </h3>
          <div className="space-y-4">
            {(financials.cashFlow || []).map((value, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-400 w-8">P{index}</span>
                <div className="flex-1 mx-4 h-3 bg-gray-700/50 rounded-full">
                  <div
                    className={`h-3 rounded-full bg-gradient-to-r ${
                      value >= 0
                        ? "from-green-500 to-emerald-400"
                        : "from-red-500 to-rose-400"
                    }`}
                    style={{
                      width: `${
                        (Math.abs(value) /
                          Math.max(1, ...financials.cashFlow.map(Math.abs))) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
                <span className="text-sm text-white font-medium w-16 text-right">
                  {formatCurrency(value)}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-700/50">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
            Budget Tracking
          </h3>
          <div className="space-y-4">
            <ProgressBar
              label="Planned"
              value={formatCurrency(budget_tracking.forecasted)}
              displayValue={formatCurrency(budget_tracking.planned)}
              maxValue={budget_tracking.forecasted * 1.2 || 1}
              color="blue"
            />
            <ProgressBar
              label="Forecasted (MC)"
              value={formatCurrency(budget_tracking.forecasted)}
              displayValue={formatCurrency(budget_tracking.forecasted)}
              maxValue={budget_tracking.forecasted * 1.2 || 1}
              color="green"
            />
            <ProgressBar
              label="Variance"
              value={formatCurrency(Math.abs(budget_tracking.variance))}
              displayValue={formatCurrency(budget_tracking.variance)}
              maxValue={budget_tracking.forecasted * 0.2 || 1}
              color="orange"
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-700/50">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
            Resource Utilization (%)
          </h3>
          <div className="space-y-4">
            <ProgressBar
              label="Developers"
              value={resourceUtilization.developers.toFixed(2)}
              displayValue={resourceUtilization.developers.toFixed(2)}
              color="purple"
            />
            <ProgressBar
              label="Testers"
              value={resourceUtilization.testers.toFixed(2)}
              displayValue={resourceUtilization.testers.toFixed(2)}
              color="purple"
            />
          </div>
        </div>
        <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-700/50">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <div className="w-2 h-2 bg-red-400 rounded-full mr-3"></div>
            Risk Assessment (%)
          </h3>
          <div className="space-y-4">
            <ProgressBar
              label="Technical Complexity"
              value={risk_analysis.technical.toFixed(2)}
              displayValue={risk_analysis.technical.toFixed(2)}
              maxValue={100}
              color="red"
            />
            <ProgressBar
              label="Human Resources"
              value={risk_analysis.human.toFixed(2)}
              displayValue={risk_analysis.human.toFixed(2)}
              maxValue={100}
              color="red"
            />
            <ProgressBar
              label="Budget"
              value={risk_analysis.budget.toFixed(2)}
              displayValue={risk_analysis.budget.toFixed(2)}
              maxValue={100}
              color="red"
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-red-900/20 p-6 rounded-xl border border-red-700/30">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <AlertTriangle className="w-5 h-5 text-red-400 mr-2" />
            Risk Analysis
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Total Risk Score</span>{" "}
              <span className="font-bold text-lg text-red-400">
                {formatPercentage(totalRiskScore)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Expected Value (NPV)</span>{" "}
              <span className="font-medium text-white">
                {formatCurrency(financials.npv)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Confidence Interval (Cost)</span>{" "}
              <span className="font-medium text-white">
                {formatCurrency(monte_carlo_simulation.p90_cost)} -{" "}
                {formatCurrency(monte_carlo_simulation.p10_cost)}
              </span>
            </div>
          </div>
        </div>
        <div className="bg-green-900/20 p-6 rounded-xl border border-green-700/30">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Rocket className="w-5 h-5 text-green-400 mr-2" />
            Project Optimization
          </h3>
          <div className="space-y-3 text-sm">
            {(() => {
              const baseline = estimation_models.cocomo;
              const optimized = optimization_scenarios.find(
                (s) => s.scenario_name === "Accéléré"
              );
              if (!optimized)
                return (
                  <p className="text-gray-400">
                    No optimization scenario available.
                  </p>
                );
              const timeSavingsInDays = Math.round(
                optimized.time_saving * 30.4
              );
              return (
                <>
                  {" "}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Current Duration</span>{" "}
                    <span className="font-medium text-white">
                      {baseline.duration.toFixed(2)} months
                    </span>
                  </div>{" "}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Optimized Duration</span>{" "}
                    <span className="font-bold text-green-400">
                      {optimized.duration.toFixed(2)} months
                    </span>
                  </div>{" "}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Time Savings</span>{" "}
                    <span className="font-bold text-green-400">
                      {timeSavingsInDays} days
                    </span>
                  </div>{" "}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Cost Savings</span>{" "}
                    <span className="font-bold text-green-400">
                      {formatCurrency(optimized.cost_saving)}
                    </span>
                  </div>{" "}
                </>
              );
            })()}
          </div>
        </div>
      </div>
      <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-700/50">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Zap className="w-5 h-5 text-orange-400 mr-2" />
          Sensitivity Analysis (%)
        </h3>
        <div className="space-y-4">
          <ProgressBar
            label="Revenue Impact"
            value={Math.abs(sensitivity_analysis.revenue_impact).toFixed(2)}
            displayValue={sensitivity_analysis.revenue_impact.toFixed(2)}
            maxValue={50}
            color="orange"
          />
          <ProgressBar
            label="Development Cost Impact"
            value={Math.abs(sensitivity_analysis.cost_impact).toFixed(2)}
            displayValue={sensitivity_analysis.cost_impact.toFixed(2)}
            maxValue={50}
            color="orange"
          />
          <ProgressBar
            label="Project Scale Impact"
            value={sensitivity_analysis.projectScale.toFixed(2)}
            displayValue={sensitivity_analysis.projectScale.toFixed(2)}
            maxValue={50}
            color="orange"
          />
        </div>
      </div>
    </div>
  );
};

export default ResultsDashboard;
