import React from 'react';
import { 
  Clock, 
  Users, 
  DollarSign, 
  TrendingUp, 
  BarChart3, 
  AlertTriangle,
  Target,
  Zap
} from 'lucide-react';
import { CalculationResult } from '../types';
import MetricCard from './MetricCard';
import ProgressBar from './ProgressBar';

interface ResultsDashboardProps {
  results: CalculationResult | null;
}

const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ results }) => {
  if (!results) {
    return (
      <div className="flex items-center justify-center h-96 text-gray-400">
        <div className="text-center">
          <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p className="text-sm sm:text-base">Submit project data to see analysis results</p>
        </div>
      </div>
    );
  }

  const formatCurrency = (value: number) => `$${(value / 1000).toFixed(0)}K`;
  const formatPercentage = (value: number) => `${value.toFixed(1)}%`;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <MetricCard
          title="Duration"
          value={`${results.duration.toFixed(1)} months`}
          subtitle={`Team of ${results.teamSize} people`}
          icon={Clock}
          color="blue"
        />
        <MetricCard
          title="Effort"
          value={`${results.effort.toFixed(1)} PM`}
          subtitle="Person-months"
          icon={Users}
          color="green"
        />
        <MetricCard
          title="Total Cost"
          value={formatCurrency(results.totalCost)}
          subtitle={`EAF: ${results.eaf || 1}`}
          icon={DollarSign}
          color="orange"
        />
        <MetricCard
          title="NPV"
          value={formatCurrency(results.npv)}
          subtitle={`${formatPercentage(results.discountRate * 100)} discount rate`}
          icon={TrendingUp}
          color="green"
        />
      </div>

      <div id="financial-section" className="scroll-mt-20">
        <div className="flex items-center space-x-2 mb-6">
          <TrendingUp className="w-5 h-5 text-emerald-500" />
          <h2 className="text-xl font-bold text-white">Financial Analysis</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <MetricCard
            title="IRR"
            value={formatPercentage(results.irr)}
            subtitle="Internal Rate of Return"
            icon={TrendingUp}
            color="blue"
          />
          <MetricCard
            title="ROI"
            value={formatPercentage(results.roi)}
            subtitle="Return on Investment"
            icon={DollarSign}
            color="green"
          />
          <MetricCard
            title="Payback Period"
            value={`${results.paybackPeriod} periods`}
            subtitle="Time to break even"
            icon={Clock}
            color="purple"
          />
          <MetricCard
            title="Risk Score"
            value={formatPercentage(results.riskScore)}
            subtitle={`${formatCurrency(results.confidenceInterval.low)} - ${formatCurrency(results.confidenceInterval.high)}`}
            icon={AlertTriangle}
            color="red"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <div className="bg-gradient-to-br from-emerald-900/20 to-emerald-800/10 rounded-xl border border-emerald-700/30 p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span>Cash Flow Analysis (K$)</span>
            </h3>
            <div className="space-y-4">
              {results.cashFlow.map((value, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-400 w-8">P{index}</span>
                  <div className="flex-1 mx-4">
                    <div className="w-full bg-gray-800/50 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-3 rounded-full transition-all duration-700 ease-out"
                        style={{ width: `${Math.min((value / Math.max(...results.cashFlow)) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-sm text-white font-medium w-16 text-right">
                    {formatCurrency(value)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/10 rounded-xl border border-blue-700/30 p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Budget Tracking (K$)</span>
            </h3>
            <div className="space-y-4">
              <ProgressBar
                label="Planned"
                value={results.budgetTracking.planned}
                maxValue={400}
                color="blue"
              />
              <ProgressBar
                label="Actual"
                value={results.budgetTracking.actual}
                maxValue={400}
                color="green"
              />
              <ProgressBar
                label="Variance"
                value={results.budgetTracking.variance}
                maxValue={400}
                color="orange"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        <div className="bg-gradient-to-br from-purple-900/20 to-purple-800/10 rounded-xl border border-purple-700/30 p-6 shadow-xl">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span>Resource Utilization (%)</span>
          </h3>
          <div className="space-y-4">
            <ProgressBar
              label="Developers"
              value={results.resourceUtilization.developers}
              color="purple"
            />
            <ProgressBar
              label="Testers"
              value={results.resourceUtilization.testers}
              color="purple"
            />
          </div>
        </div>

        <div id="risk-section" className="bg-gradient-to-br from-red-900/20 to-red-800/10 rounded-xl border border-red-700/30 p-6 shadow-xl scroll-mt-20">
          <div className="flex items-center space-x-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <h3 className="text-lg font-semibold text-white">Risk Assessment (%)</h3>
          </div>
          <div className="space-y-4">
            <ProgressBar
              label="Technical Complexity"
              value={results.riskAssessment.technical}
              color="red"
            />
            <ProgressBar
              label="Human Resources"
              value={results.riskAssessment.human}
              color="red"
            />
            <ProgressBar
              label="Budget Overrun"
              value={results.riskAssessment.budget}
              color="red"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        <div className="bg-gradient-to-br from-red-900/20 to-orange-900/20 rounded-xl border border-red-700/30 p-6 shadow-xl">
          <div className="flex items-center space-x-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <h3 className="text-lg font-semibold text-white">Risk Analysis</h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-800/30 rounded-lg">
              <span className="text-gray-400">Total Risk Score</span>
              <span className="text-red-400 font-bold text-lg">{formatPercentage(results.riskScore)}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-800/30 rounded-lg">
              <span className="text-gray-400">Expected Value</span>
              <span className="text-white font-medium">{formatCurrency(results.npv)}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-800/30 rounded-lg">
              <span className="text-gray-400">Confidence Interval</span>
              <span className="text-gray-300 text-sm">
                {formatCurrency(results.confidenceInterval.low)} - {formatCurrency(results.confidenceInterval.high)}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-900/20 to-emerald-800/10 rounded-xl border border-green-700/30 p-6 shadow-xl">
          <div className="flex items-center space-x-2 mb-4">
            <Target className="w-5 h-5 text-green-400" />
            <h3 className="text-lg font-semibold text-white">Project Optimization</h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-800/30 rounded-lg">
              <span className="text-gray-400">Current Duration</span>
              <span className="text-white">{results.optimization.currentDuration} days</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-800/30 rounded-lg">
              <span className="text-gray-400">Optimized Duration</span>
              <span className="text-green-400 font-medium">{results.optimization.optimizedDuration} days</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-800/30 rounded-lg">
              <span className="text-gray-400">Time Savings</span>
              <span className="text-green-400 font-bold">{results.optimization.timeSavings} days</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-800/30 rounded-lg">
              <span className="text-gray-400">Cost Savings</span>
              <span className="text-green-400 font-bold">{formatCurrency(results.optimization.costSavings)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-orange-900/20 to-yellow-900/20 rounded-xl border border-orange-700/30 p-6 shadow-xl">
        <div className="flex items-center space-x-2 mb-6">
          <Zap className="w-5 h-5 text-orange-400" />
          <h3 className="text-lg font-semibold text-white">Sensitivity Analysis (%)</h3>
        </div>
        <div className="space-y-4">
          <ProgressBar
            label="Discount Rate Impact"
            value={Math.abs(results.sensitivityAnalysis.discountRate)}
            maxValue={25}
            color="red"
          />
          <ProgressBar
            label="Development Cost Impact"
            value={results.sensitivityAnalysis.development}
            maxValue={25}
            color="orange"
          />
          <ProgressBar
            label="Project Scale Impact"
            value={results.sensitivityAnalysis.projectScale}
            maxValue={25}
            color="orange"
          />
        </div>
      </div>
    </div>
  );
};

export default ResultsDashboard;