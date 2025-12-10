from django.test import TestCase
from jobs.models import Job
from jobs.services import get_job_deck_for_user


class JobServicesTests(TestCase):
    def setUp(self):
        Job.objects.create(
            job_id="jb-201",
            title="Test SWE Intern",
            company="TestCo",
            location="Test City",
            description="Test description",
            tags_csv="Python,Django",
        )

        Job.objects.create(
            job_id="jb-202",
            title="Test Data Intern",
            company="DataCo",
            location="Data City",
            description="Another test description",
            tags_csv="SQL,Python",
        )

    def test_get_job_deck_for_user_returns_all_jobs_in_order(self):
        deck = list(get_job_deck_for_user("student@example.com"))

        # We created 2 jobs in setUp
        self.assertEqual(len(deck), 2)

        # Ordered by job_id ascending (201 then 202)
        self.assertEqual(deck[0].job_id, "jb-201")
        self.assertEqual(deck[1].job_id, "jb-202")