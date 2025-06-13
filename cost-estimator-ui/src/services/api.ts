import { ProjectData, CalculationResult } from "../types/index";

const API_BASE_URL = "http://localhost:8000/api";

export const calculateEstimation = async (
  data: ProjectData
): Promise<CalculationResult | null> => {
  try {
    console.log(data);
    const response = await fetch(`${API_BASE_URL}/calculate/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const response_data = await response.json();
    console.log(response_data);

    return response_data;
  } catch (error) {
    console.error("API call failed:", error);
    return null;
  }
};
