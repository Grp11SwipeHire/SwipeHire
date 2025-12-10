from django.core.management.base import BaseCommand
from jobs.models import Job

SEED_JOBS = [
    {
        "job_id": "jb-101",
        "title": "Software Engineer Intern",
        "company": "Acme Labs",
        "location": "Boston, MA (Hybrid)",
        "description": "Build UI features and maintain internal tools.",
        "tags": ["React", "JavaScript", "Django"],
    },
    {
        "job_id": "jb-102",
        "title": "Data Analyst Intern",
        "company": "Northwind Analytics",
        "location": "Remote",
        "description": "Analyze product metrics and create dashboards.",
        "tags": ["SQL", "Python", "Tableau"],
    },
    {
        "job_id": "jb-103",
        "title": "Product Design Intern",
        "company": "Lumen Studio",
        "location": "New York, NY",
        "description": "Prototype user flows and run usability studies.",
        "tags": ["Figma", "UX Research", "Prototyping"],
    },
]


class Command(BaseCommand):
    help = "Seed the Job table with demo jobs."

    def handle(self, *args, **options):
        created = 0
        for j in SEED_JOBS:
            obj, is_new = Job.objects.update_or_create(
                job_id=j["job_id"],
                defaults={
                    "title": j["title"],
                    "company": j["company"],
                    "location": j["location"],
                    "description": j["description"],
                    "tags_csv": ",".join(j["tags"]),
                },
            )
            if is_new:
                created += 1
        self.stdout.write(self.style.SUCCESS(f"Seeded {created} jobs"))