from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .serializers import ProjectDataSerializer
from .services import calculate_estimation_results


@api_view(["POST"])
def estimate_project(request):
    """
    Endpoint de l'API pour estimer le coût d'un projet logiciel.
    """

    serializer = ProjectDataSerializer(data=request.data)

    if serializer.is_valid():

        project_data = serializer.validated_data

        try:

            results = calculate_estimation_results(project_data)

            return Response(results, status=status.HTTP_200_OK)

        except Exception as e:

            error_message = {"error": f"An error occurred during calculation: {str(e)}"}
            return Response(error_message, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    else:

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
