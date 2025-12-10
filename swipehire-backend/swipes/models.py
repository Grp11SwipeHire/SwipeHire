from django.db import models
from jobs.models import Job

class Swipe(models.Model):
    DIRECTION_CHOICES = [
        ("left", "Left"),
        ("right", "Right"),
    ]

    # For demo, identify user just by email string
    user_email = models.EmailField()
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    direction = models.CharField(max_length=5, choices=DIRECTION_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.user_email} {self.direction} {self.job.job_id}"
