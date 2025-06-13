# Advanced Project Analytics Dashboard

An advanced decision support system for software project management. This tool provides comprehensive cost estimation, financial analysis, risk assessment, and resource optimization based on user-defined project parameters.

The application is built with a Django REST Framework backend for complex calculations and a React + Vite frontend for a dynamic and interactive user experience.

## Features

-   **Multi-Model Cost Estimation:** Implements both **COCOMO II** and **Function Point** models to provide a comparative cost and duration analysis.
-   **Comprehensive Financial Analysis:** Calculates key investment metrics including **Net Present Value (NPV)**, **Internal Rate of Return (IRR)**, **Return on Investment (ROI)**, and **Payback Period**.
-   **Advanced Risk Management:**
    -   **Monte Carlo Simulation** to model uncertainty and provide a forecasted budget with a confidence interval.
    -   **Sensitivity Analysis** to measure the impact of changes in revenue, cost, and project scale on profitability.
-   **Resource & Optimization Scenarios:** Analyzes different resource allocation strategies ("Accelerated" vs. "Economic") to show the trade-offs between cost, time, and team size.
-   **Interactive Dashboard:** A single-page application with a clean, modern interface to input data and visualize a wide range of analytical results.

## Tech Stack

-   **Backend:**
    -   Django & Django REST Framework
    -   NumPy & numpy-financial for complex calculations
    -   CORS Headers for API communication
-   **Frontend:**
    -   React & TypeScript
    -   Vite for a fast development experience
    -   Tailwind CSS for styling
-   **Database:**
    -   SQLite (for development)

## Prerequisites

Before you begin, ensure you have the following installed on your system:
-   Python 3.8+
-   `pip` and `venv`
-   Node.js 16+
-   `npm` or `yarn`

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### 1. Clone the Repository

First, clone the project repository to your local machine.

```bash
git clone <your-repository-url>
cd <project-folder-name>
Use code with caution.
Markdown
2. Setup and Run the Backend (Django)
The backend server handles all the calculations and serves the API.
# 1. Navigate to the backend directory
cd backend/

# 2. Create and activate a Python virtual environment
python -m venv venv
# On macOS/Linux:
source venv/bin/activate
# On Windows:
# venv\Scripts\activate

# 3. Install the required Python packages from requirements.txt
pip install -r requirements.txt

# 4. Apply the initial database migrations
python manage.py migrate

# 5. Run the Django development server
python manage.py runserver
Use code with caution.
```
Your Django backend should now be running at http://localhost:8000. Keep this terminal window open.
3. Setup and Run the Frontend (React)
The frontend provides the user interface to interact with the application.
# 1. Open a NEW terminal window or tab
# (Do not close the terminal running the backend server)

# 2. Navigate back to the project root and then into the frontend directory
cd ../frontend/

# 3. Install the required Node.js packages
npm install
# or if you use yarn:
# yarn install

# 4. Run the Vite development server
npm run dev
# or if you use yarn:
# yarn dev
Use code with caution.
Bash
Your React frontend should now be running, typically at http://localhost:5173.
### 4. Usage
With both servers running, open your web browser and navigate to the frontend URL (e.g., http://localhost:5173).
Fill out the "Project Configuration" form with your project's parameters.
Click the "Calculate Estimation" button.
Analyze the results displayed on the "Project Analytics Dashboard". The dashboard will update dynamically based on your inputs.