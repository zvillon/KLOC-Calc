from rest_framework import serializers


class ProjectDataSerializer(serializers.Serializer):
    projectName = serializers.CharField(max_length=100)
    sloc = serializers.IntegerField(min_value=1)
    projectClass = serializers.ChoiceField(
        choices=["organic", "semi-detached", "embedded"]
    )
    eaf = serializers.FloatField(min_value=0.1)
    discountRate = serializers.FloatField(min_value=0)
    developers = serializers.IntegerField(min_value=1)
    testers = serializers.IntegerField(min_value=1)
    expectedRevenue = serializers.IntegerField(min_value=0)
    projectDuration = serializers.IntegerField(min_value=1)


class EstimationModelSerializer(serializers.Serializer):
    effort = serializers.FloatField()
    duration = serializers.FloatField()
    cost = serializers.FloatField()


class FinancialMetricsSerializer(serializers.Serializer):
    npv = serializers.FloatField()
    irr = serializers.FloatField()
    roi = serializers.FloatField()
    paybackPeriod = serializers.FloatField()
    cashFlow = serializers.ListField(child=serializers.FloatField())


class MonteCarloSerializer(serializers.Serializer):
    mean_cost = serializers.FloatField()
    std_dev = serializers.FloatField()
    p10_cost = serializers.FloatField()
    p90_cost = serializers.FloatField()


class SensitivitySerializer(serializers.Serializer):
    revenue_impact = serializers.FloatField()
    cost_impact = serializers.FloatField()
    projectScale = serializers.FloatField()


class OptimizationScenarioSerializer(serializers.Serializer):
    scenario_name = serializers.CharField()
    team_size = serializers.IntegerField()
    duration = serializers.FloatField()
    cost = serializers.FloatField()
    cost_saving = serializers.FloatField()
    time_saving = serializers.FloatField()


class RiskAssessmentSerializer(serializers.Serializer):
    technical = serializers.FloatField()
    human = serializers.FloatField()
    budget = serializers.FloatField()


class BudgetTrackingSerializer(serializers.Serializer):
    planned = serializers.FloatField()
    forecasted = serializers.FloatField()
    variance = serializers.FloatField()


class ResourceUtilizationSerializer(serializers.Serializer):
    developers = serializers.FloatField()
    testers = serializers.FloatField()


class CalculationResultSerializer(serializers.Serializer):
    estimation_models = serializers.DictField(child=EstimationModelSerializer())
    financials = FinancialMetricsSerializer()
    risk_analysis = RiskAssessmentSerializer()
    monte_carlo_simulation = MonteCarloSerializer()
    sensitivity_analysis = SensitivitySerializer()
    budget_tracking = BudgetTrackingSerializer()
    optimization_scenarios = serializers.ListField(
        child=OptimizationScenarioSerializer()
    )
    resourceUtilization = ResourceUtilizationSerializer()
