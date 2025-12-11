from django.urls import path
from .views import job_deck

urlpatterns = [
    path("deck/", job_deck),
]
