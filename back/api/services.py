import numpy_financial as npf
from .dataclasses import CocomoResult, FinancialMetrics

COCOMO_MODES = {
    "organic": {"a": 2.4, "b": 1.05, "c": 2.5, "d": 0.38},
    "semi-detached": {"a": 3.0, "b": 1.12, "c": 2.5, "d": 0.35},
    "embedded": {"a": 3.6, "b": 1.20, "c": 2.5, "d": 0.32},
}


class CocomoCalculationService:
    @staticmethod
    def calculate(
        lines_of_code: int, mode: str, cost_per_person_month: float
    ) -> CocomoResult:
        if mode not in COCOMO_MODES:
            raise ValueError("Invalid COCOMO mode specified.")

        if lines_of_code <= 0:
            return CocomoResult(0, 0, 0)

        params = COCOMO_MODES[mode]
        kloc = lines_of_code / 1000
        
        a = params["a"]
        b = params["b"]
        c = params["c"]
        d = params["d"]

        effort = a * (kloc ** b)
        duration = c * (effort ** d)
        total_cost = effort * cost_per_person_month

        return CocomoResult(
            effort_person_months=effort, duration_months=duration, total_cost=total_cost
        )


class FinancialMetricService:
    @staticmethod
    def calculate(
        initial_investment: float, cash_flows: list[float], discount_rate: float
    ) -> FinancialMetrics:
        if initial_investment <= 0:
            return FinancialMetrics(
                npv=None, irr=None, roi=float("inf"), payback_period_years=0
            )

        try:
            npv = npf.npv(discount_rate, [-initial_investment] + cash_flows)
        except ValueError:
            npv = None

        try:
            irr = npf.irr([-initial_investment] + cash_flows)
        except ValueError:
            irr = None

        net_profit = sum(cash_flows) - initial_investment
        roi = net_profit / initial_investment

        payback_period = None
        cumulative_cash_flow = 0
        for i, cash_flow in enumerate(cash_flows):
            cumulative_cash_flow += cash_flow
            if cumulative_cash_flow >= initial_investment:
                payback_period = (
                    (i + 1) - (cumulative_cash_flow - initial_investment) / cash_flow
                    if cash_flow > 0
                    else i + 1
                )
                break

        return FinancialMetrics(
            npv=npv, irr=irr, roi=roi, payback_period_years=payback_period
        )
