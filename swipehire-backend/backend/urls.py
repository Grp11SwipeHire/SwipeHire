from django.contrib import admin
from django.urls import path

from jobs.views import job_deck
from swipes.views import swipe_view, liked_jobs_view


urlpatterns = [
    path("admin/", admin.site.urls),

    # API endpoints
    path("api/jobs/deck/", job_deck),
    path("api/swipes/", swipe_view),
    path("api/likes/", liked_jobs_view),
]