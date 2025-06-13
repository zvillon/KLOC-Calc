from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .serializers import ProjectDataSerializer, CalculationResultSerializer
from .services import calculate_estimation


@api_view(["POST"])
def calculate_api_view(request):

    input_serializer = ProjectDataSerializer(data=request.data)
    if not input_serializer.is_valid():
        return Response(input_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    validated_data = input_serializer.validated_data
    results = calculate_estimation(validated_data)

    output_serializer = CalculationResultSerializer(data=results)
    if not output_serializer.is_valid():

        return Response(
            output_serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

    return Response(output_serializer.data, status=status.HTTP_200_OK)
