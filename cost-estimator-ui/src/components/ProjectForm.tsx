import React, { useState } from "react";
import { Send, Settings, ToggleLeft, ToggleRight } from "lucide-react";
import { ProjectData } from "../types/index";

interface ProjectFormProps {
  onSubmit: (data: ProjectData) => void;
  loading: boolean;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState<ProjectData>({
    projectName: "",
    sloc: 25000,
    projectClass: "organic",
    eaf: 2.0,
    discountRate: 0.1,
    developers: 8,
    testers: 1,
    expectedRevenue: 150000,
    projectDuration: 6,
  });

  const [useSliderForEAF, setUseSliderForEAF] = useState(true);
  const [useSliderForDiscount, setUseSliderForDiscount] = useState(true);
  const [useSliderForDuration, setUseSliderForDuration] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (
    field: keyof ProjectData,
    value: string | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const InputToggle: React.FC<{
    enabled: boolean;
    onToggle: () => void;
    label: string;
  }> = ({ enabled, onToggle, label }) => (
    <button
      type="button"
      onClick={onToggle}
      className="flex items-center space-x-2 text-xs text-gray-400 hover:text-gray-300 transition-colors"
    >
      {enabled ? (
        <ToggleRight className="w-4 h-4 text-blue-500" />
      ) : (
        <ToggleLeft className="w-4 h-4" />
      )}
      <span>{label}</span>
    </button>
  );

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 p-4 sm:p-6 shadow-2xl min-w-[450px]">
      <div className="flex items-center space-x-2 mb-6">
        <div className="p-2 bg-blue-500/10 rounded-lg">
          <Settings className="w-5 h-5 text-blue-500" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">
            Project Configuration
          </h2>
          <p className="text-xs text-gray-400">
            Configure your project parameters
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-6">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <h3 className="text-sm font-medium text-gray-300">
              Project Information
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Project Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.projectName}
                  onChange={(e) =>
                    handleInputChange("projectName", e.target.value)
                  }
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                  placeholder="Enter project name"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-300">
                  Discount Rate
                </label>
                <InputToggle
                  enabled={useSliderForDiscount}
                  onToggle={() =>
                    setUseSliderForDiscount(!useSliderForDiscount)
                  }
                  label="Slider"
                />
              </div>
              <div className="relative">
                {useSliderForDiscount ? (
                  <>
                    <input
                      type="range"
                      step="0.01"
                      min="0"
                      max="1"
                      value={formData.discountRate}
                      onChange={(e) =>
                        handleInputChange(
                          "discountRate",
                          parseFloat(e.target.value)
                        )
                      }
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>0%</span>
                      <span className="text-blue-400 font-medium">
                        {(formData.discountRate * 100).toFixed(1)}%
                      </span>
                      <span>100%</span>
                    </div>
                  </>
                ) : (
                  <div className="relative">
                    <input
                      type="number"
                      step="0.001"
                      min="0"
                      value={formData.discountRate}
                      onChange={(e) =>
                        handleInputChange(
                          "discountRate",
                          parseFloat(e.target.value) || 0
                        )
                      }
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      placeholder="0.10"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <span className="text-gray-500 text-sm">rate</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <h3 className="text-sm font-medium text-gray-300">
              COCOMO Parameters
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex flex-col justify-between">
              <label className="block text-sm font-medium text-gray-300">
                Source Lines of Code (SLOC)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  value={formData.sloc}
                  onChange={(e) =>
                    handleInputChange("sloc", parseInt(e.target.value) || 0)
                  }
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-200 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
            </div>

            <div className="flex flex-col justify-between">
              <label className="block text-sm font-medium text-gray-300">
                Project Type
              </label>
              <div className="relative">
                <select
                  value={formData.projectClass}
                  onChange={(e) =>
                    handleInputChange(
                      "projectClass",
                      e.target.value as ProjectData["projectClass"]
                    )
                  }
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-200 appearance-none cursor-pointer"
                >
                  <option value="organic">Organic</option>
                  <option value="semi-detached">Semi-detached</option>
                  <option value="embedded">Embedded</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-300">
                  Effort Adjustment Factor (EAF)
                </label>
                <InputToggle
                  enabled={useSliderForEAF}
                  onToggle={() => setUseSliderForEAF(!useSliderForEAF)}
                  label="Slider"
                />
              </div>
              <div className="relative">
                {useSliderForEAF ? (
                  <>
                    <input
                      type="range"
                      step="0.05"
                      min="0.1"
                      max="5.0"
                      value={formData.eaf}
                      onChange={(e) =>
                        handleInputChange("eaf", parseFloat(e.target.value))
                      }
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>0.1</span>
                      <span className="text-green-400 font-medium">
                        {formData.eaf}
                      </span>
                      <span>5.0</span>
                    </div>
                  </>
                ) : (
                  <input
                    type="number"
                    step="0.1"
                    min="0.1"
                    value={formData.eaf}
                    onChange={(e) =>
                      handleInputChange(
                        "eaf",
                        parseFloat(e.target.value) || 0.1
                      )
                    }
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-200 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder="1.0"
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <h3 className="text-sm font-medium text-gray-300">
              Resource Capacity
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col justify-between h-full">
              <label className="block text-sm font-medium text-gray-300">
                Developers
              </label>
              <div className="space-y-1">
                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={() =>
                      handleInputChange(
                        "developers",
                        Math.max(1, formData.developers - 1)
                      )
                    }
                    className="w-10 h-10 bg-gray-800 border border-gray-700 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={formData.developers}
                    onChange={(e) =>
                      handleInputChange(
                        "developers",
                        parseInt(e.target.value) || 1
                      )
                    }
                    className="w-full px-3 py-2.5 h-10 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white text-center focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-200 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      handleInputChange("developers", formData.developers + 1)
                    }
                    className="w-10 h-10 bg-gray-800 border border-gray-700 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                  >
                    +
                  </button>
                </div>
                <div className="text-xs text-gray-400 text-center mt-1">
                  people
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between h-full">
              <label className="block text-sm font-medium text-gray-300">
                Testers
              </label>
              <div className="space-y-1">
                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={() =>
                      handleInputChange(
                        "testers",
                        Math.max(1, formData.testers - 1)
                      )
                    }
                    className="w-10 h-10 bg-gray-800 border border-gray-700 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={formData.testers}
                    onChange={(e) =>
                      handleInputChange(
                        "testers",
                        parseInt(e.target.value) || 1
                      )
                    }
                    className="w-full px-3 py-2.5 h-10 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white text-center focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-200 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      handleInputChange("testers", formData.testers + 1)
                    }
                    className="w-10 h-10 bg-gray-800 border border-gray-700 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                  >
                    +
                  </button>
                </div>
                <div className="text-xs text-gray-400 text-center mt-1">
                  people
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <h3 className="text-sm font-medium text-gray-300">
              Financial Parameters
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2 flex flex-col justify-between h-full">
              <label className="block text-sm font-medium text-gray-300">
                Expected Revenue ($)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-gray-500">$</span>
                </div>
                <input
                  type="number"
                  min="0"
                  value={formData.expectedRevenue}
                  onChange={(e) =>
                    handleInputChange(
                      "expectedRevenue",
                      parseInt(e.target.value) || 0
                    )
                  }
                  className="w-full pl-8 pr-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all duration-200 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
            </div>

            <div className="space-y-2 flex flex-col justify-between h-full">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-300">
                  Project Duration (months)
                </label>
                <InputToggle
                  enabled={useSliderForDuration}
                  onToggle={() =>
                    setUseSliderForDuration(!useSliderForDuration)
                  }
                  label="Slider"
                />
              </div>
              <div className="relative">
                {useSliderForDuration ? (
                  <>
                    <input
                      type="range"
                      min="1"
                      max="60"
                      value={formData.projectDuration}
                      onChange={(e) =>
                        handleInputChange(
                          "projectDuration",
                          parseInt(e.target.value)
                        )
                      }
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>1 month</span>
                      <span className="text-orange-400 font-medium">
                        {formData.projectDuration} months
                      </span>
                      <span>60 months</span>
                    </div>
                  </>
                ) : (
                  <div className="relative">
                    <input
                      type="number"
                      min="1"
                      value={formData.projectDuration}
                      onChange={(e) =>
                        handleInputChange(
                          "projectDuration",
                          parseInt(e.target.value) || 1
                        )
                      }
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all duration-200 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      placeholder="12"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <span className="text-gray-500 text-sm">months</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-blue-800 disabled:to-blue-900 disabled:cursor-not-allowed text-white font-medium py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:transform-none"
        >
          <Send className="w-5 h-5" />
          <span>{loading ? "Calculating..." : "Calculate Estimation"}</span>
        </button>
      </form>
    </div>
  );
};

export default ProjectForm;
