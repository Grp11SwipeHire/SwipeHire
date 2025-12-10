from django.db import models

# Create your models here.
class Job(models.Model):
    """
    Simple job posting that matches what the frontend cards show.
    """
    job_id = models.CharField(max_length=32, primary_key=True)
    title = models.CharField(max_length=200)
    company = models.CharField(max_length=200)
    location = models.CharField(max_length=120)
    description = models.TextField()
    # store tags as comma-separated string for SQLite simplicity
    tags_csv = models.TextField(blank=True, default="")

    @property
    def tags(self):
        if not self.tags_csv:
            return []
        return [t.strip() for t in self.tags_csv.split(",") if t.strip()]

    @tags.setter
    def tags(self, value):
        self.tags_csv = ",".join(value or [])

    def __str__(self):
        return f"{self.title} @ {self.company}"