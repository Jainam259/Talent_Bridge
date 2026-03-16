from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Job, AptitudeTest
import json
from django.contrib.auth.models import User
from users.models import Employer

@csrf_exempt
def job_list(request):
    if request.method == 'GET':
        jobs=Job.objects.all()
        job_list=[]
        for job in jobs:
            job_list.append({
                'id':job.id,
                'title':job.job_title,
                'description':job.job_description,
                'location':job.job_location,
                'type':job.employment_type
            })
        return JsonResponse(job_list,safe=False)

@csrf_exempt
def employer_job_list(request):
    data = request.GET
    try:
        user = User.objects.get(username=data['username'])
        employer = Employer.objects.get(user=user)
        jobs = employer.jobs.all()
        job_list=[]
        # Serialize job data
        for job in jobs:
            job_list.append(
                
                {
                'id': job.id,
                'title': job.job_title,
                'description': job.job_description,
                }
            
            )
             
        return JsonResponse(job_list, safe=False)

    except User.DoesNotExist:
        return JsonResponse({'error': 'User not found'}, status=404)
    except Employer.DoesNotExist:
        return JsonResponse({'error': 'Employer not found'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
@csrf_exempt
def create_job(request):
    if request.method == 'POST':
        data=request.POST
        print(data['job_title'])
        user=User.objects.get(username=data['username'])
        employer=Employer.objects.get(user=user)
        job = Job.objects.create(
            employer=employer,
            job_title=data['job_title'],
            job_description=data['job_description'],
            job_location=data['job_location'],
            salary_range=data['salary_range'],
            employment_type=data['employment_type'],
        )
        return JsonResponse({'message': 'Job created successfully', 'job_id': job.id}, status=201)

@csrf_exempt
def job_detail(request, job_id):
    try:
        job = Job.objects.get(id=job_id)
        return JsonResponse({
            'job_id': job.id,
            'job_title': job.job_title,
            'job_description': job.job_description,
            'job_location': job.job_location,
            'salary_range': job.salary_range,
            'employment_type': job.employment_type,
            'company_name':job.employer.company_name,
            'posted_at': job.posted_at,
        })
    except Job.DoesNotExist:
        return JsonResponse({'error': 'Job not found'}, status=404)

@csrf_exempt
def edit_job(request, job_id):
    try:
        job = Job.objects.get(id=job_id)
        if request.method == 'PUT':
            data = json.loads(request.body)
            job.job_title = data.get('job_title', job.job_title)
            job.job_description = data.get('job_description', job.job_description)
            job.job_location = data.get('job_location', job.job_location)
            job.salary_range = data.get('salary_range', job.salary_range)
            job.employment_type = data.get('employment_type', job.employment_type)
            job.save()
            return JsonResponse({'message': 'Job updated successfully'})
    except Job.DoesNotExist:
        return JsonResponse({'error': 'Job not found'}, status=404)

@csrf_exempt
def delete_job(request, job_id):
    try:
        job = Job.objects.get(id=job_id)
        job.delete()
        return JsonResponse({'message': 'Job deleted successfully'})
    except Job.DoesNotExist:
        return JsonResponse({'error': 'Job not found'}, status=404)


# @csrf_exempt
# def create_aptitude_test(request):
#     if request.method == 'POST':
#         try:
#             job_id       = request.POST.get('job_id')
#             schedule_date = request.POST.get('schedule_date')   # "YYYY-MM-DD"
#             schedule_time = request.POST.get('schedule_time')   # "HH:MM"
#             exam_duration = request.POST.get('exam_duration')   # "25"
#             upload_type  = request.POST.get('upload_type')      # "pdf" | "json"
#             jsonText     = request.POST.get('exam_json', '')    # JSON string for questions (if upload_type is "json")

#             # Validate required fields
#             if not all([job_id, schedule_date, schedule_time, exam_duration, upload_type]):
#                 return JsonResponse({'error': 'Missing required fields'}, status=400)

#             job = Job.objects.get(id=job_id)

#             # Delete old test if one already exists for this job (upsert behaviour)
#             AptitudeTest.objects.filter(job=job).delete()

#             aptitude_test = AptitudeTest(
#                 job=job,
#                 schedule_date=schedule_date,
#                 schedule_time=schedule_time,
#                 exam_duration=int(exam_duration),
#                 upload_type=upload_type,
#             )

#             if upload_type == 'pdf':
#                 exam_file = request.FILES.get('exam_file')
#                 if not exam_file:
#                     return JsonResponse({'error': 'PDF file is required'}, status=400)
#                 aptitude_test.exam_file = exam_file

#             elif upload_type == 'json':
#                 exam_json_raw = request.POST.get('exam_json', '')
#                 if not exam_json_raw.strip():
#                     return JsonResponse({'error': 'JSON content is required'}, status=400)
#                 try:
#                     import json as json_lib
#                     parsed = json_lib.loads(exam_json_raw)  # parse string → list/dict

#                     # ── Count questions only, do NOT store the full JSON ──
#                     if isinstance(parsed, list):
#                         # format: [ {id, question, ...}, ... ]
#                         aptitude_test.question_count = len(parsed)
#                     elif isinstance(parsed, dict):
#                         # format: { "aptitude_mcqs": [ ... ] }  ← your exact format
#                         questions_list = next(iter(parsed.values()))  # get first key's value
#                         aptitude_test.question_count = len(questions_list) if isinstance(questions_list, list) else 0
#                     else:
#                         aptitude_test.question_count = 0

#                 except Exception:
#                     aptitude_test.question_count = 0  # fallback

#             aptitude_test.save()

#             return JsonResponse({
#                 'message': 'Aptitude test scheduled successfully',
#                 'test_id': aptitude_test.id,
#                 'job': job.job_title,
#                 'schedule_date': str(aptitude_test.schedule_date),
#                 'schedule_time': str(aptitude_test.schedule_time),
#                 'exam_duration': aptitude_test.exam_duration,
#                 'upload_type': aptitude_test.upload_type,
#                 'question_count': aptitude_test.question_count,
#                 'question': aptitude_test.question,
#             }, status=201)

#         except Job.DoesNotExist:
#             return JsonResponse({'error': 'Job not found'}, status=404)
#         except Exception as e:
#             return JsonResponse({'error': str(e)}, status=500)

#     return JsonResponse({'error': 'Method not allowed'}, status=405)

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def create_aptitude_test(request):
    if request.method == 'POST':
        try:
            job_id = request.POST.get('job_id')
            schedule_date = request.POST.get('schedule_date')
            schedule_time = request.POST.get('schedule_time')
            exam_duration = request.POST.get('exam_duration')
            upload_type = request.POST.get('upload_type')

            # Validate required fields
            if not all([job_id, schedule_date, schedule_time, exam_duration, upload_type]):
                return JsonResponse({'error': 'Missing required fields'}, status=400)

            job = Job.objects.get(id=job_id)

            # Remove old test if exists
            AptitudeTest.objects.filter(job=job).delete()

            aptitude_test = AptitudeTest(
                job=job,
                schedule_date=schedule_date,
                schedule_time=schedule_time,
                exam_duration=int(exam_duration),
                upload_type=upload_type,
            )

            # =========================
            # PDF Upload
            # =========================
            if upload_type == 'pdf':
                exam_file = request.FILES.get('exam_file')

                if not exam_file:
                    return JsonResponse({'error': 'PDF file is required'}, status=400)

                aptitude_test.exam_file = exam_file


            # =========================
            # JSON Upload
            # =========================
            elif upload_type == 'json':

                exam_json_raw = request.POST.get('exam_json', '')

                if not exam_json_raw.strip():
                    return JsonResponse({'error': 'JSON content is required'}, status=400)

                try:
                    parsed_json = json.loads(exam_json_raw)

                    # ✅ Store JSON in DB
                    aptitude_test.question = exam_json_raw

                    # Count questions
                    if isinstance(parsed_json, list):
                        aptitude_test.question_count = len(parsed_json)

                    elif isinstance(parsed_json, dict):
                        questions_list = next(iter(parsed_json.values()))
                        aptitude_test.question_count = len(questions_list) if isinstance(questions_list, list) else 0

                    else:
                        aptitude_test.question_count = 0

                except json.JSONDecodeError:
                    return JsonResponse({'error': 'Invalid JSON format'}, status=400)

            # Save test
            aptitude_test.save()

            return JsonResponse({
                'message': 'Aptitude test scheduled successfully',
                'test_id': aptitude_test.id,
                'job': job.job_title,
                'schedule_date': str(aptitude_test.schedule_date),
                'schedule_time': str(aptitude_test.schedule_time),
                'exam_duration': aptitude_test.exam_duration,
                'upload_type': aptitude_test.upload_type,
                'question_count': aptitude_test.question_count,
                'question': aptitude_test.question
            }, status=201)

        except Job.DoesNotExist:
            return JsonResponse({'error': 'Job not found'}, status=404)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Method not allowed'}, status=405)

@csrf_exempt
def get_aptitude_test(request, job_id):
    try:
        test = AptitudeTest.objects.get(job_id=job_id)
        return JsonResponse({
            'test_id': test.id,
            'job_id': test.job.id,
            'job_title': test.job.job_title,
            'schedule_date': str(test.schedule_date),
            'schedule_time': str(test.schedule_time),
            'exam_duration': test.exam_duration,
            'upload_type': test.upload_type,
            'exam_file': test.exam_file.url if test.exam_file else None,
            'question_count': test.question_count,
            'created_at': str(test.created_at),
            'question': test.question,
        })
    except AptitudeTest.DoesNotExist:
        return JsonResponse({'error': 'No aptitude test found for this job'}, status=404)
