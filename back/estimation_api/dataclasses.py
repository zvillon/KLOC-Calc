from dataclasses import dataclass

@dataclass(frozen=True)
class CocomoResult:
    effort_person_months: float
    duration_months: float
    total_cost: float

@dataclass(frozen=True)
class FinancialMetrics:
    npv: float | None
    irr: float | None
    roi: float
    payback_period_years: float | None