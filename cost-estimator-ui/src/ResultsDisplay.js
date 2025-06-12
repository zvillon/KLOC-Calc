import React from 'react';

const ResultsDisplay = ({ data }) => {
  if (!data) return null;

  const { cocomo_estimation, financial_analysis } = data;

  return (
    <div className="results-grid">
      <div className="result-card">
        <h3>COCOMO Estimation</h3>
        <p><strong>Effort:</strong> {cocomo_estimation.effort}</p>
        <p><strong>Duration:</strong> {cocomo_estimation.duration}</p>
        <p><strong>Estimated Total Cost:</strong> {cocomo_estimation.estimated_cost}</p>
      </div>

      <div className="result-card">
        <h3>Economic Metrics</h3>
        <p><strong>Net Present Value (NPV):</strong> {financial_analysis.net_present_value}</p>
        <p><strong>Return on Investment (ROI):</strong> {financial_analysis.return_on_investment}</p>
        <p><strong>Internal Rate of Return (IRR):</strong> {financial_analysis.internal_rate_of_return}</p>
        <p><strong>Payback Period:</strong> {financial_analysis.payback_period}</p>
      </div>
    </div>
  );
};

export default ResultsDisplay;