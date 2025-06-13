import math

COCOMO_PARAMS = {
    "organic": {"a": 2.4, "b": 1.05, "c": 2.5, "d": 0.38},
    "semi-detached": {"a": 3.0, "b": 1.12, "c": 2.5, "d": 0.35},
    "embedded": {"a": 3.6, "b": 1.20, "c": 2.5, "d": 0.32},
}


def calculate_estimation_results(data: dict) -> dict:
    """
    Fonction principale qui prend les données validées du projet
    et retourne un dictionnaire avec tous les résultats d'estimation.
    """

    kloc = data["estimatedLinesOfCode"] / 1000
    team_size = data["teamSize"]
    duration = data["duration"]
    hourly_rate = data["hourlyRate"]

    base_cost = team_size * hourly_rate * duration * 160

    project_type = data["projectType"]
    params = COCOMO_PARAMS.get(project_type, COCOMO_PARAMS["default"])

    a = params["a"]
    b = params["b"]
    c = params["c"]
    d = params["d"]

    cocomo_effort = a * (kloc**b)

    cocomo_duration = c * (cocomo_effort**d)

    cocomo_cost = (
        cocomo_effort * (base_cost / (team_size * duration))
        if (team_size * duration) > 0
        else 0
    )

    total_function_points = math.floor(data["estimatedLinesOfCode"] / 100)
    fp_effort = cocomo_effort * 0.9
    fp_cost = cocomo_cost * 0.95

    total_budget = base_cost + data["infrastructureCost"] + data["licensingCost"]
    expected_revenue = data["expectedRevenue"]

    roi = (
        ((expected_revenue - total_budget) / total_budget) * 100
        if total_budget > 0
        else 0
    )

    npv = expected_revenue - total_budget - (total_budget * 0.1)

    irr = 15.0 + (roi / 10) if roi > 0 else 0

    monthly_revenue = expected_revenue / 12 if expected_revenue > 0 else 1
    payback_period = (
        total_budget / monthly_revenue if monthly_revenue > 0 else float("inf")
    )

    tech_risk = data["technicalRisk"]
    schedule_risk = data["scheduleRisk"]
    budget_risk = data["budgetRisk"]

    overall_risk = (tech_risk + schedule_risk + budget_risk) / 3

    probability_of_success = max(10, 100 - (overall_risk * 9))

    contingency_recommendation = overall_risk * 1.5

    optimal_team_size = math.ceil(team_size * 0.9)

    results = {
        "cocomo": {
            "effort": cocomo_effort,
            "duration": cocomo_duration,
            "cost": cocomo_cost,
        },
        "functionPoints": {
            "totalFunctionPoints": total_function_points,
            "effort": fp_effort,
            "cost": fp_cost,
        },
        "budgeting": {
            "totalBudget": total_budget,
            "phaseBreakdown": {
                "planning": total_budget * 0.15,
                "development": total_budget * 0.50,
                "testing": total_budget * 0.20,
                "deployment": total_budget * 0.10,
                "maintenance": total_budget * data["maintenanceCostPercentage"] / 100,
            },
            "roi": roi,
            "npv": npv,
            "irr": irr,
            "paybackPeriod": payback_period,
        },
        "riskAnalysis": {
            "overallRisk": overall_risk,
            "riskFactors": {
                "technical": tech_risk,
                "schedule": schedule_risk,
                "budget": budget_risk,
            },
            "contingencyRecommendation": contingency_recommendation,
            "probabilityOfSuccess": probability_of_success,
        },
        "resourceOptimization": {
            "optimalTeamSize": optimal_team_size,
            "resourceAllocation": {
                "development": 60,
                "testing": 25,
                "management": 10,
                "design": 5,
            },
            "costSavingOpportunities": [
                f"Réduire la taille de l'équipe à {optimal_team_size} personnes pour économiser sur les coûts.",
                "Automatiser les tests pour économiser 15% du temps de test.",
                "Utiliser des outils open-source pour réduire les coûts de licence.",
            ],
            "scheduleOptimization": {
                "parallelTasks": [
                    "Développement UI/UX",
                    "Développement Backend",
                    "Tests unitaires",
                ],
                "criticalPath": [
                    "Architecture",
                    "Développement du noyau",
                    "Tests d'intégration",
                    "Déploiement",
                ],
            },
        },
    }

    return results
