import React, { useState } from 'react';

const EstimationForm = ({ onSubmit, isLoading }) => {
  // CORRECTED: State keys now match the Django serializer
  const [formData, setFormData] = useState({
    lines_of_code: 50000,
    project_mode: 'semi-detached',
    cost_per_person_month: 8000,
    revenue_period_years: 5,
    projected_annual_revenue: 250000,
    discount_rate: 8,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>COCOMO Parameters</legend>
        <div className="form-group">
          <label htmlFor="lines_of_code">Estimated Lines of Code (LOC) (And NOT KLOC)</label>
          {/* CORRECTED: name attribute */}
          <input type="number" id="lines_of_code" name="lines_of_code" value={formData.lines_of_code} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="project_mode">Project Mode</label>
          {/* CORRECTED: name attribute */}
          <select id="project_mode" name="project_mode" value={formData.project_mode} onChange={handleChange}>
            <option value="organic">Organic</option>
            <option value="semi-detached">Semi-Detached</option>
            <option value="embedded">Embedded</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="cost_per_person_month">Cost per Person-Month ($)</label>
          {/* CORRECTED: name attribute */}
          <input type="number" id="cost_per_person_month" name="cost_per_person_month" value={formData.cost_per_person_month} onChange={handleChange} required />
        </div>
      </fieldset>

      <fieldset>
        <legend>Financial Parameters</legend>
        <div className="form-group">
          <label htmlFor="revenue_period_years">Revenue Period (Years)</label>
          {/* CORRECTED: name attribute */}
          <input type="number" id="revenue_period_years" name="revenue_period_years" value={formData.revenue_period_years} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="projected_annual_revenue">Projected Annual Revenue ($)</label>
          {/* CORRECTED: name attribute */}
          <input type="number" id="projected_annual_revenue" name="projected_annual_revenue" value={formData.projected_annual_revenue} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="discount_rate">Discount Rate (%)</label>
          {/* CORRECTED: name attribute */}
          <input type="number" id="discount_rate" name="discount_rate" value={formData.discount_rate} onChange={handleChange} required />
        </div>
      </fieldset>

      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Calculating...' : 'Calculate'}
      </button>
    </form>
  );
};

export default EstimationForm;