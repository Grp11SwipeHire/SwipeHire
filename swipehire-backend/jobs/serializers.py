from rest_framework import serializers
from .models import Job


class JobSerializer(serializers.ModelSerializer):
    tags = serializers.SerializerMethodField()

    class Meta:
        model = Job
        fields = ["job_id", "title", "company", "location", "description", "tags"]

    def get_tags(self, obj):
        return obj.tags