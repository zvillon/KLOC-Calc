from rest_framework import serializers

class ProjectDataSerializer(serializers.Serializer):
    projectName = serializers.CharField(max_length=100)
    projectType = serializers.CharField(max_length=50)
    duration = serializers.IntegerField(min_value=1)
    teamSize = serializers.IntegerField(min_value=1)
    estimatedLinesOfCode = serializers.IntegerField(min_value=1)
    complexityLevel = serializers.CharField(max_length=50)
    technologyStack = serializers.ListField(child=serializers.CharField(), required=False, allow_empty=True)
    hourlyRate = serializers.FloatField(min_value=0)
    infrastructureCost = serializers.FloatField(min_value=0)
    licensingCost = serializers.FloatField(min_value=0)
    technicalRisk = serializers.IntegerField(min_value=1, max_value=10)
    scheduleRisk = serializers.IntegerField(min_value=1, max_value=10)
    budgetRisk = serializers.IntegerField(min_value=1, max_value=10)
    expectedRevenue = serializers.FloatField(min_value=0)
    
    maintenanceCostPercentage = serializers.FloatField(min_value=0)
    seniorDevelopers = serializers.IntegerField(min_value=0)
    juniorDevelopers = serializers.IntegerField(min_value=0)
    projectManagers = serializers.IntegerField(min_value=0)
    qaEngineers = serializers.IntegerField(min_value=0)
    uiUxDesigners = serializers.IntegerField(min_value=0)