from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404, render
from .models import Application
from jobs.models import Job, AptitudeTest   # ← added AptitudeTest
from users.models import Jobseeker, User
import json
import os
from django.conf import settings

@csrf_exempt
def apply_job(request, job_id):
    if request.method == 'POST':
        data = json.loads(request.body)
        try:
            job = Job.objects.get(id=job_id)
            jobseeker = Jobseeker.objects.get(user_id=data['user_id'])
            application = Application.objects.create(
                job=job,
                jobseeker=jobseeker
            )
            return JsonResponse({'message': 'Application submitted successfully', 'application_id': application.id}, status=201)
        except (Job.DoesNotExist, Jobseeker.DoesNotExist):
            return JsonResponse({'error': 'Job or Jobseeker not found'}, status=404)


@csrf_exempt
def application_status(request, application_id):
    try:
        application = Application.objects.get(id=application_id)
        return JsonResponse({
            'application_id': application.id,
            'job_title': application.job.job_title,
            'application_status': application.application_status,
            'applied_at': application.applied_at,
        })
    except Application.DoesNotExist:
        return JsonResponse({'error': 'Application not found'}, status=404)


@csrf_exempt
def apply_job_jobseeker(request, job_id):
    if request.method == "POST":
        job_detail = get_object_or_404(Job, id=job_id)

        userdetails = request.POST.get('user')
        user = get_object_or_404(User, username=userdetails)
        jobseeker = get_object_or_404(Jobseeker, user=user)

        resume_file = request.FILES.get('resume_url')
        
        if not resume_file:
            return JsonResponse({"error": "Resume file is required."}, status=400)

        application = Application.objects.create(
            job=job_detail,
            jobseeker=jobseeker,
            resume_url=resume_file,
        )

        return JsonResponse({
            "message": "Application submitted successfully",
            "application_id": application.id,
        }, status=201)

    return JsonResponse({"error": "Invalid request method"}, status=405)


@csrf_exempt
def applied(request):
    if request.method == 'GET':
        userdetails = request.GET.get('user')

        if not userdetails:
            return JsonResponse({'error': 'No user provided'}, status=400)

        user = get_object_or_404(User, username=userdetails)
        jobseeker = get_object_or_404(Jobseeker, user=user)

        try:
            print("User requested:", userdetails)
            applications = Application.objects.filter(jobseeker=jobseeker)

            details = []
            for detail in applications:

                # ── Fetch aptitude test for this job (if any) ──
                aptitude_test = None
                try:
                    test = AptitudeTest.objects.get(job=detail.job)
                    aptitude_test = {
                        'job_title':     test.job.job_title,
                        'exam_duration': test.exam_duration,
                        'schedule_date': str(test.schedule_date),   # e.g. "2026-03-07"
                        'schedule_time': str(test.schedule_time),   # e.g. "10:00:00"
                        'upload_type':   test.upload_type,
                        'questions':     test.question
                    }
                except AptitudeTest.DoesNotExist:
                    aptitude_test = None

                details.append({
                    'id':              detail.id,
                    'jobTitle':        detail.job.job_title,
                    'companyName':     detail.job.employer.company_name,
                    'jobType':         detail.job.employment_type,
                    'applicationDate': detail.applied_at.isoformat(),
                    'status':          detail.application_status,
                    'aptitude_test':   aptitude_test,   # ← new field
                })

            return JsonResponse(details, safe=False)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=405)


@csrf_exempt
def applied_candidate(request, job_id):
    job_detail = get_object_or_404(Job, id=job_id)
    candidate = Application.objects.filter(job=job_detail, application_status='applied')
    print(candidate, "hi")
    details = [
        {
            'id':    detail.id,
            'name':  detail.jobseeker.first_name,
            'email': detail.jobseeker.user.email,
            'resume': detail.resume_url.url if detail.resume_url else None
        }
        for detail in candidate
    ]
    return JsonResponse(details, safe=False)


@csrf_exempt
def update_status(request, applicant_id):
    if request.method not in ['POST', 'PATCH']:
        return JsonResponse({"error": "Only POST or PATCH methods are allowed."}, status=405)

    try:
        application = Application.objects.get(id=applicant_id)
    except Application.DoesNotExist:
        return JsonResponse({"error": "Application not found."}, status=404)

    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON."}, status=400)

    status_to_update = data.get('status')

    if status_to_update:
        application.application_status = status_to_update
        application.save()
        return JsonResponse({"done": "true"}, status=200)
    else:
        return JsonResponse({"error": "Status not provided."}, status=400)
    

from .atsengine import run_ats
@csrf_exempt
def ats_ranking(request):

    if request.method != "POST":
        return JsonResponse({"error": "Only POST method allowed."}, status=405)

    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON."}, status=400)

    job_id = data.get("job_id")
    applicants = data.get("applicants", [])

    if not job_id:
        return JsonResponse({"error": "job_id is required"}, status=400)

    try:
        job = Job.objects.get(id=job_id)
    except Job.DoesNotExist:
        return JsonResponse({"error": "Job not found"}, status=404)

    print(f"Job: {job.job_title}")
    print(f"Applicants received: {len(applicants)}")

    resume_paths = []

    for applicant in applicants:
        resume_field = applicant.get("resume")

        if not resume_field:
            print(f"[ATS] Skipping — no resume: {applicant.get('name')}")
            continue

        relative_path = resume_field.lstrip("/")
        if relative_path.startswith("media/"):
            relative_path = relative_path[len("media/"):]

        abs_path = os.path.join(settings.MEDIA_ROOT, relative_path)

        print(f"[ATS DEBUG] resume_field = {resume_field}")
        print(f"[ATS DEBUG] abs_path     = {abs_path}")
        print(f"[ATS DEBUG] exists       = {os.path.exists(abs_path)}")

        if os.path.exists(abs_path):
            resume_paths.append(abs_path)
        else:
            print(f"[ATS WARNING] Missing file: {abs_path}")

    if not resume_paths:
        return JsonResponse(
            {"error": "No resume files found. Check DEBUG output for path issues."},
            status=404,
        )

    print(f"[ATS] Running → {len(resume_paths)} resumes")

    try:
        rankings = run_ats(resume_paths, job.job_title.strip())
    except Exception as e:
        return JsonResponse({"error": f"ATS crashed: {str(e)}"}, status=500)

    if rankings is None or rankings.empty:
        return JsonResponse({"error": "ATS returned no results"}, status=500)

    data = rankings.to_dict(orient="records")

    return JsonResponse(data, safe=False)