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
    Only includes jobs where the most recent swipe was "right".
    If a job was liked then later passed, it won't appear here.
    """
    from django.db.models import Max
    
    job_ids = []
    
    all_job_ids = Swipe.objects.filter(user_email=user_email).values_list('job__job_id', flat=True).distinct()
    
    for job_id in all_job_ids:
        latest_swipe = Swipe.objects.filter(
            user_email=user_email,
            job__job_id=job_id
        ).order_by('-created_at').first()
        
        if latest_swipe and latest_swipe.direction == "right":
            job_ids.append(job_id)
    
    return Job.objects.filter(job_id__in=job_ids)
