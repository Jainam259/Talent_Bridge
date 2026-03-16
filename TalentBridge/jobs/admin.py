from django.contrib import admin
from .models import Job, AptitudeTest

# Register your models here.
@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = ('job_title', 'employer', 'employment_type', 'job_location', 'posted_at')
    search_fields = ('job_title', 'employer__company_name')
    list_filter = ('employment_type', 'posted_at')

@admin.register(AptitudeTest)
class AptitudeTestAdmin(admin.ModelAdmin):
    list_display = ('job', 'schedule_date', 'schedule_time', 'exam_duration', 'upload_type', 'created_at','question_count','question',)
    search_fields = ('job__job_title',)
    list_filter = ('upload_type', 'schedule_date')
    readonly_fields = ('created_at', 'updated_at')