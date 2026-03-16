from django.urls import path
from . import views

urlpatterns = [
    path('api/employer-jobs/', views.employer_job_list, name='employer_job_list'),
    path('api/jobs/', views.job_list, name='job_list'),
    path('api/jobs/create/', views.create_job, name='create_job'),
    path('api/jobs/<int:job_id>/', views.job_detail, name='job_detail'),
    path('api/jobs/edit/<int:job_id>/', views.edit_job, name='edit_job'),
    path('api/jobs/delete/<int:job_id>/', views.delete_job, name='delete_job'),

    # Aptitude Test
    path('api/jobs/aptitude-test/create/', views.create_aptitude_test, name='create_aptitude_test'),
    path('api/jobs/aptitude-test/<int:job_id>/', views.get_aptitude_test, name='get_aptitude_test'),
]