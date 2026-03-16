from django.db import models
from users.models import Employer
from django.utils import timezone

class Job(models.Model):
    EMPLOYMENT_TYPE_CHOICES = (
        ('full-time', 'Full-Time'),
        ('part-time', 'Part-Time'),
        ('contract', 'Contract'),
        ('internship', 'Internship'),
    )

    employer = models.ForeignKey(Employer, on_delete=models.CASCADE, related_name='jobs')
    job_title = models.CharField(max_length=255)
    job_description = models.TextField()
    job_location = models.CharField(max_length=255, blank=True, null=True)
    salary_range = models.CharField(max_length=100, blank=True, null=True)
    employment_type = models.CharField(max_length=20, choices=EMPLOYMENT_TYPE_CHOICES)
    posted_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.job_title

    class Meta:
        ordering = ['-posted_at']


class AptitudeTest(models.Model):
    UPLOAD_TYPE_CHOICES = (
        ('pdf', 'PDF'),
        ('json', 'JSON'),
    )

    job = models.OneToOneField(Job, on_delete=models.CASCADE, related_name='aptitude_test')
    schedule_date = models.DateField()
    schedule_time = models.TimeField()
    exam_duration = models.PositiveIntegerField(help_text="Duration in minutes")
    upload_type = models.CharField(max_length=10, choices=UPLOAD_TYPE_CHOICES)

    # For PDF upload
    exam_file = models.FileField(upload_to='aptitude_tests/pdfs/', blank=True, null=True)

    # For JSON upload
    question_count = models.PositiveIntegerField(blank=True, null=True, help_text="Number of MCQ questions")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    question = models.TextField(blank=True, null=True, help_text="JSON string containing questions and options")

    def __str__(self):
        return f"Aptitude Test for {self.job.job_title}"

    class Meta:
        ordering = ['-created_at']