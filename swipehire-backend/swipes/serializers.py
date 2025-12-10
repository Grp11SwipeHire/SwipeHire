from rest_framework import serializers
from .models import Swipe
from jobs.serializers import JobSerializer


class SwipeSerializer(serializers.ModelSerializer):
    job = JobSerializer()

    class Meta:
        model = Swipe
        fields = ["id", "user_email", "direction", "created_at", "job"]