from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .services import record_swipe, get_liked_jobs
from jobs.serializers import JobSerializer


@api_view(["POST"])
def swipe_view(request):
    """
    Record a swipe (left/right) for a given job and user.
    Expected JSON body:
    {
        "user_email": "student@example.com",
        "job_id": "jb-101",
        "direction": "left" | "right"
    }
    """
    payload = request.data
    user_email = payload.get("user_email")
    job_id = payload.get("job_id")
    direction = payload.get("direction")

    if not (user_email and job_id and direction):
        return Response(
            {"detail": "user_email, job_id, and direction required"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        record_swipe(user_email, job_id, direction)
    except ValueError as e:
        return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    return Response({"status": "ok"})


@api_view(["GET"])
def liked_jobs_view(request):
    """
    Return all jobs a user has liked (swiped right on).

    Example:
    GET /api/likes/?user=student@example.com
    """
    user_email = request.query_params.get("user")
    if not user_email:
        return Response(
            {"detail": "user query param required"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    jobs = get_liked_jobs(user_email)
    data = JobSerializer(jobs, many=True).data
    return Response(data)