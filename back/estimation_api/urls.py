from django.urls import path
from . import views

urlpatterns = [
    path("calculate/", views.calculate_api_view, name="calculate"),
]
