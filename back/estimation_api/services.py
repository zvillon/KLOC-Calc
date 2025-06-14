import math
import numpy as np
import numpy_financial as npf


def calculate_cocomo(data):
    """Implements the basic COCOMO II model."""
    cocomo_constants = {
        "effort": {"organic": 2.4, "semi-detached": 3.0, "embedded": 3.6},
        "exponent": {"organic": 1.05, "semi-detached": 1.12, "embedded": 1.20},
        "duration_coeff": {"organic": 2.5, "semi-detached": 2.5, "embedded": 2.5},
        "duration_exp": {"organic": 0.38, "semi-detached": 0.35, "embedded": 0.32},
    }
    pc = data.get("projectClass", "organic")
    ksloc = data.get("sloc", 0) / 1000
    avg_salary_per_month = 8000
    effort = (
        cocomo_constants["effort"][pc]
        * (ksloc ** cocomo_constants["exponent"][pc])
        * data.get("eaf", 1.0)
    )
    duration = (
        cocomo_constants["duration_coeff"][pc]
        * (effort ** cocomo_constants["duration_exp"][pc])
        if effort > 0
        else 0
    )
    cost = effort * avg_salary_per_month
    return {"effort": effort, "duration": duration, "cost": cost}


def calculate_function_points(data):
    """Implements a simplified estimation based on Function Points (FP)."""

    unadjusted_fp = data.get("sloc", 0) / 50

    vaf = 1.0
    adjusted_fp = unadjusted_fp * vaf

    effort = adjusted_fp / 20
    duration = 2.5 * (effort**0.35) if effort > 0 else 0
    cost = effort * 8000
    return {"effort": effort, "duration": duration, "cost": cost}


def calculate_financials(data, total_cost, duration_months):
    """Calculates ROI, NPV, IRR, and Payback Period using standard financial logic."""
    if total_cost <= 0:
        return {
            "npv": data.get("expectedRevenue", 0) * 3,
            "irr": 0,
            "roi": float("inf"),
            "paybackPeriod": 0,
            "cashFlow": [],
        }

    annual_revenue = data.get("expectedRevenue", 0)

    cash_flow_stream = [-total_cost] + [annual_revenue] * 3

    try:
        npv = npf.npv(data.get("discountRate", 0), cash_flow_stream)
        irr = npf.irr(cash_flow_stream) * 100
    except ValueError:

        npv = sum(cash_flow_stream)
        irr = -100.0

    net_profit = sum(cash_flow_stream[1:]) - total_cost
    roi = (net_profit / total_cost) * 100

    cumulative_cash_flow = 0
    payback_period = -1.0
    for i, flow in enumerate(cash_flow_stream):
        cumulative_cash_flow += flow
        if cumulative_cash_flow >= 0:

            last_negative_flow = cumulative_cash_flow - flow
            payback_period = (i - 1) + (-last_negative_flow / flow)
            break

    return {
        "npv": npv,
        "irr": irr,
        "roi": roi,
        "paybackPeriod": payback_period,
        "cashFlow": cash_flow_stream,
    }


def run_monte_carlo_simulation(data, iterations=1000):
    """Simulates the project cost."""
    sloc_dist = np.random.triangular(
        data.get("sloc", 0) * 0.8,
        data.get("sloc", 0),
        data.get("sloc", 0) * 1.5,
        iterations,
    )
    eaf_dist = np.random.triangular(
        data.get("eaf", 1.0) * 0.9,
        data.get("eaf", 1.0),
        data.get("eaf", 1.0) * 1.2,
        iterations,
    )
    simulated_costs = []
    for i in range(iterations):
        sim_data = data.copy()
        sim_data["sloc"] = sloc_dist[i]
        sim_data["eaf"] = eaf_dist[i]
        cost_estimation = calculate_cocomo(sim_data)
        simulated_costs.append(cost_estimation["cost"])

    return {
        "mean_cost": np.mean(simulated_costs),
        "std_dev": np.std(simulated_costs),
        "p10_cost": np.percentile(simulated_costs, 10),
        "p90_cost": np.percentile(simulated_costs, 90),
    }


def calculate_risk_and_analysis(data, baseline_cost, baseline_duration):
    """Calculates risk scores and resource utilization."""
    team_size = data.get("developers", 1) + data.get("testers", 1)

    risk_technical = (
        min(
            data.get("sloc", 0) / 100000
            + {"organic": 0, "semi-detached": 0.1, "embedded": 0.2}[
                data.get("projectClass", "organic")
            ],
            1,
        )
        * 40
    )

    risk_human = min(team_size / 25, 1) * 30
    risk_budget = min(baseline_cost / 2000000, 1) * 30

    required_team_size = (
        baseline_duration > 0
        and calculate_cocomo(data)["effort"] / baseline_duration
        or 0
    )
    utilization_factor = required_team_size / team_size if team_size > 0 else 0

    dev_util = min(100, utilization_factor * 100 * 0.7)
    tester_util = min(100, utilization_factor * 100 * 0.3)

    return {
        "riskAssessment": {
            "technical": risk_technical,
            "human": risk_human,
            "budget": risk_budget,
        },
        "resourceUtilization": {"developers": dev_util, "testers": tester_util},
    }


def generate_optimization_scenarios(data, baseline):
    """Generates optimization scenarios by adjusting project parameters."""
    scenarios = []

    data_fast = data.copy()
    data_fast.update(
        {
            "developers": data["developers"] * 1.5,
            "testers": data["testers"] * 1.5,
            "eaf": data["eaf"] * 0.9,
        }
    )
    fast_result = calculate_cocomo(data_fast)
    scenarios.append(
        {
            "scenario_name": "Accelerated",
            "team_size": int(data_fast["developers"] + data_fast["testers"]),
            "duration": fast_result["duration"],
            "cost": fast_result["cost"],
            "cost_saving": baseline["cost"] - fast_result["cost"],
            "time_saving": baseline["duration"] - fast_result["duration"],
        }
    )

    data_cheap = data.copy()
    data_cheap.update(
        {
            "developers": data["developers"] * 0.75,
            "testers": data["testers"] * 0.75,
            "eaf": data["eaf"] * 1.1,
        }
    )
    cheap_result = calculate_cocomo(data_cheap)
    scenarios.append(
        {
            "scenario_name": "Economical",
            "team_size": int(data_cheap["developers"] + data_cheap["testers"]),
            "duration": cheap_result["duration"],
            "cost": cheap_result["cost"],
            "cost_saving": baseline["cost"] - cheap_result["cost"],
            "time_saving": baseline["duration"] - cheap_result["duration"],
        }
    )
    return scenarios


def calculate_estimation(data: dict) -> dict:
    """Orchestrates all calculation modules to generate a complete report."""
    cocomo_result = calculate_cocomo(data)
    fp_result = calculate_function_points(data)

    baseline_cost = cocomo_result["cost"]
    baseline_duration = cocomo_result["duration"]

    financials = calculate_financials(data, baseline_cost, baseline_duration)
    analysis = calculate_risk_and_analysis(data, baseline_cost, baseline_duration)
    monte_carlo = run_monte_carlo_simulation(data)

    sensitivity = calculate_sensitivity_analysis(
        data, financials, baseline_cost, baseline_duration
    )

    optimization_scenarios = generate_optimization_scenarios(data, cocomo_result)

    return {
        "estimation_models": {"cocomo": cocomo_result, "function_point": fp_result},
        "financials": financials,
        "risk_analysis": analysis["riskAssessment"],
        "monte_carlo_simulation": monte_carlo,
        "sensitivity_analysis": sensitivity,
        "budget_tracking": {
            "planned": baseline_cost,
            "forecasted": monte_carlo["mean_cost"],
            "variance": monte_carlo["mean_cost"] - baseline_cost,
        },
        "optimization_scenarios": optimization_scenarios,
        "resourceUtilization": analysis["resourceUtilization"],
    }


def calculate_sensitivity_analysis(data, baseline_financials, baseline_cost, duration):
    """Analyzes the impact of a 10% change in key parameters on the NPV."""
    baseline_npv = baseline_financials.get("npv", 0)

    data_revenue_plus = data.copy()
    data_revenue_plus["expectedRevenue"] *= 1.1
    financials_revenue_plus = calculate_financials(
        data_revenue_plus, baseline_cost, duration
    )

    if baseline_npv != 0:
        revenue_impact_on_npv = (
            (financials_revenue_plus.get("npv", 0) - baseline_npv)
            / abs(baseline_npv)
            * 100
        )
    else:
        revenue_impact_on_npv = (
            float("inf") if financials_revenue_plus.get("npv", 0) > 0 else 0
        )

    cost_plus = baseline_cost * 1.1
    financials_cost_plus = calculate_financials(data, cost_plus, duration)

    if baseline_npv != 0:
        cost_impact_on_npv = (
            (financials_cost_plus.get("npv", 0) - baseline_npv)
            / abs(baseline_npv)
            * 100
        )
    else:
        cost_impact_on_npv = (
            float("-inf") if financials_cost_plus.get("npv", 0) < 0 else 0
        )

    data_sloc_plus = data.copy()
    data_sloc_plus["sloc"] *= 1.1
    cost_sloc_plus = calculate_cocomo(data_sloc_plus)["cost"]
    financials_sloc_plus = calculate_financials(data, cost_sloc_plus, duration)

    if baseline_npv != 0:
        sloc_impact_on_npv = (
            (financials_sloc_plus.get("npv", 0) - baseline_npv)
            / abs(baseline_npv)
            * 100
        )
    else:
        sloc_impact_on_npv = (
            float("-inf") if financials_sloc_plus.get("npv", 0) < 0 else 0
        )

    return {
        "revenue_impact": revenue_impact_on_npv,
        "cost_impact": cost_impact_on_npv,
        "projectScale": sloc_impact_on_npv,
    }
