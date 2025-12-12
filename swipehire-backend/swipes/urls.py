from django.urls import path
from . import views

urlpatterns = [
    path("", views.swipe_view, name="swipe"),
    path("liked/", views.liked_jobs_view, name="liked-jobs"),
]
