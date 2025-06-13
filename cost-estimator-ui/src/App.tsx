import React, { useState } from "react";
import Header from "./components/Header";
import ProjectForm from "./components/ProjectForm";
import ResultsDashboard from "./components/ResultsDashboard";
import { ProjectData, CalculationResult } from "./types/index";
import { calculateEstimation } from "./services/api";

function App() {
  const [results, setResults] = useState<CalculationResult | null>(null);
  const [formData, setFormData] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (data: ProjectData) => {
    setLoading(true);
    setFormData(data);
    try {
      const calculationResults = await calculateEstimation(data);
      setResults(calculationResults);
    } catch (error) {
      console.error("Calculation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <Header />

      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 sm:gap-8">
          <div className="xl:col-span-4">
            <ProjectForm onSubmit={handleFormSubmit} loading={loading} />
          </div>

          <div className="xl:col-start-6 xl:col-span-8 ">
            <div className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Project Analytics Dashboard
              </h2>
              <p className="text-gray-400 text-sm sm:text-base">
                Comprehensive project analysis and insights
              </p>
            </div>

            <ResultsDashboard results={results} formData={formData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
