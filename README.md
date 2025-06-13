# 📊 Advanced Project Analytics Dashboard

A comprehensive decision support system for software project management featuring advanced cost estimation, financial analysis, and risk assessment capabilities.

## ✨ Key Features

**📈 Smart Cost Estimation**
- COCOMO II and Function Point models for accurate project cost and duration analysis
- Comparative analysis between multiple estimation approaches

**💰 Financial Intelligence**
- Complete investment metrics: NPV, IRR, ROI, and Payback Period
- Data-driven financial decision support

**🎯 Risk Management**
- Monte Carlo simulation for uncertainty modeling
- Sensitivity analysis for impact assessment
- Budget forecasting with confidence intervals

**⚡ Resource Optimization**
- Multiple resource allocation scenarios (Accelerated vs Economic)
- Trade-off analysis for cost, time, and team size

## 🛠️ Tech Stack

| Component | Technology |
|-----------|------------|
| **Backend** | Django REST Framework, NumPy |
| **Frontend** | React + TypeScript, Vite, Tailwind CSS |
| **Database** | SQLite |

## 🚀 Quick Start

### Prerequisites
- **Python 3.8+** with pip
- **Node.js 16+** with npm

### Installation

**1. Clone & Setup Backend**
```bash
git clone <repository-url>
cd <project-folder>/backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Linux/Mac
# venv\Scripts\activate   # Windows

# Install dependencies & run
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

**2. Setup Frontend** *(in new terminal)*
```bash
cd ../frontend
npm install
npm run dev
```

### 🌐 Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000

## 💡 How to Use

1. **Configure Project Parameters** - Fill out the project configuration form
2. **Generate Analysis** - Click "Calculate Estimation" 
3. **Review Results** - Analyze the comprehensive dashboard with all metrics
4. **Compare Scenarios** - Explore different resource allocation strategies

## 📋 Project Structure
```
├── backend/          # Django REST API
├── frontend/         # React application  
└── README.md
```

---

🔧 **Need Help?** Make sure both servers are running simultaneously for full functionality.
