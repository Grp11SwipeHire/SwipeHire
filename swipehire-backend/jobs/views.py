from rest_framework.decorators import api_view
from rest_framework.response import Response

from .services import get_job_deck_for_user
from .serializers import JobSerializer


@api_view(["GET"])
def job_deck(request):
    """
    Return the deck of jobs for a given user.
    For now, user is optional and not used to personalize.
    """
    user_email = request.query_params.get("user", "demo@student.edu")
    jobs = get_job_deck_for_user(user_email)
    data = JobSerializer(jobs, many=True).data
    return Response(data)