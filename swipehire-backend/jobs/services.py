from .models import Job


def get_job_deck_for_user(user_email: str):
    """
    For now, just return all jobs in a fixed order.
    This is where we could later personalize based on user profile.
    """
    return Job.objects.all().order_by("job_id")
