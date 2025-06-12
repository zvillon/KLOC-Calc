from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import ProjectInputSerializer, CalculationOutputSerializer
from .services import CocomoCalculationService, FinancialMetricService


class CalculationView(APIView):
    def post(self, request, *args, **kwargs):
        input_serializer = ProjectInputSerializer(data=request.data)
        input_serializer.is_valid(raise_exception=True)
        validated_data = input_serializer.validated_data

        try:
            cocomo_results = CocomoCalculationService.calculate(
                lines_of_code=validated_data["lines_of_code"],
                mode=validated_data["project_mode"],
                cost_per_person_month=validated_data["cost_per_person_month"],
            )

            cash_flows = [validated_data["projected_annual_revenue"]] * validated_data[
                "revenue_period_years"
            ]

            financial_metrics = FinancialMetricService.calculate(
                initial_investment=cocomo_results.total_cost,
                cash_flows=cash_flows,
                discount_rate=validated_data["discount_rate"] / 100,
            )

        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        output_data = {
            "cocomo_estimation": cocomo_results,
            "financial_analysis": financial_metrics,
        }

        output_serializer = CalculationOutputSerializer(output_data)
        return Response(output_serializer.data, status=status.HTTP_200_OK)
