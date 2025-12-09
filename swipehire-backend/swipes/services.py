from typing import Iterable
from .models import Swipe
from jobs.models import Job


def record_swipe(user_email: str, job_id: str, direction: str) -> Swipe:
    """
    Create a swipe record for a given job and user.
    Raises ValueError if direction is invalid.
    """
    if direction not in ("left", "right"):
        raise ValueError("direction must be 'left' or 'right'")

    job = Job.objects.get(job_id=job_id)
    swipe = Swipe.objects.create(user_email=user_email, job=job, direction=direction)
    return swipe


def get_liked_jobs(user_email: str) -> Iterable[Job]:
    """
    Return all jobs the user has swiped right on (liked).
    """
    job_ids = (
        Swipe.objects.filter(user_email=user_email, direction="right")
        .values_list("job__job_id", flat=True)
        .distinct()
    )
    return Job.objects.filter(job_id__in=job_ids)
