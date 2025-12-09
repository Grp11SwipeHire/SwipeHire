from django.test import TestCase
from rest_framework.test import APIClient

from jobs.models import Job
from swipes.models import Swipe


class SwipeApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()

        Job.objects.create(
            job_id="jb-301",
            title="API Test Intern",
            company="APICo",
            location="API City",
            description="API test description",
            tags_csv="APITag",
        )

    def test_swipe_right_creates_swipe_and_like(self):
        payload = {
            "user_email": "student@example.com",
            "job_id": "jb-301",
            "direction": "right",
        }

        response = self.client.post("/api/swipes/", payload, format="json")

        # API should respond OK
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data.get("status"), "ok")

        # A Swipe row should be created
        self.assertEqual(Swipe.objects.count(), 1)
        swipe = Swipe.objects.first()
        self.assertEqual(swipe.user_email, "student@example.com")
        self.assertEqual(swipe.job.job_id, "jb-301")
        self.assertEqual(swipe.direction, "right")

    def test_liked_jobs_endpoint_returns_liked_job(self):
        # First, create a swipe
        Swipe.objects.create(
            user_email="student@example.com",
            job=Job.objects.get(job_id="jb-301"),
            direction="right",
        )

        response = self.client.get("/api/likes/?user=student@example.com")

        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(len(data), 1)
        self.assertEqual(data[0]["job_id"], "jb-301")