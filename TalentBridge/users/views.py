# from django.shortcuts import render
# from django.views.decorators.csrf import csrf_exempt
# from django.contrib.auth import authenticate, login as auth_login
# import json
# from django.http import JsonResponse
# from django.contrib.auth.models import User
# from .models import Employer, Jobseeker

# @csrf_exempt
# def register_jobseeker(request):
#     if request.method == 'POST':
#         data = request.POST

#         # Validate required fields
#         required_fields = ['username', 'email', 'password', 'firstName', 'lastName', 'skills', 'contactNumber']
#         for field in required_fields:
#             if field not in data:
#                 return JsonResponse({'error': f'{field} is required'}, status=400)

#         # Check for unique username and email
#         if User.objects.filter(username=data['username']).exists():
#             return JsonResponse({'error': 'Username already exists'}, status=400)
        
# from django.views.decorators.csrf import csrf_exempt
# from django.contrib.auth import authenticate
# from django.http import JsonResponse
# from django.contrib.auth.models import User
# from rest_framework_simplejwt.tokens import RefreshToken
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.decorators import api_view, permission_classes
# from .models import Employer, Jobseeker
# import json


# # =========================
# # REGISTER JOBSEEKER
# # =========================
# @csrf_exempt
# def register_jobseeker(request):
#     if request.method == 'POST':
#         try:
#             data = json.loads(request.body)
#         except:
#             return JsonResponse({'error': 'Invalid JSON'}, status=400)

#         required_fields = [
#             'username', 'email', 'password',
#             'firstName', 'lastName',
#             'skills', 'contactNumber'
#         ]

#         for field in required_fields:
#             if not data.get(field):
#                 return JsonResponse({'error': f'{field} is required'}, status=400)

#         if User.objects.filter(username=data['username']).exists():
#             return JsonResponse({'error': 'Username already exists'}, status=400)

#         if User.objects.filter(email=data['email']).exists():
#             return JsonResponse({'error': 'Email already exists'}, status=400)

#         try:
#             # Create a new user
#             user = User.objects.create_user(
#                 username=data['username'],
#                 email=data['email'],
#                 password=data['password']
#             )

#             # Create Jobseeker profile
#             jobseeker = Jobseeker()
#             Jobseeker.objects.create(
#                 user=user,
#                 first_name=data['firstName'],
#                 last_name=data['lastName'],
#                 skills=data['skills'],
#                 phone_number=data['contactNumber']
#             )
#             jobseeker.save()

#             return JsonResponse({'message': 'User registered successfully'}, status=201)

#         except Exception as e:
#             user.delete()  # Remove the user if Jobseeker creation fails
#             return JsonResponse({'error': str(e)}, status=400)

#     return JsonResponse({'error': 'Invalid request method'}, status=405)


# @csrf_exempt
# def register_employer(request):
#     if request.method == 'POST':
#         data = request.POST

#         # Validate required fields
#         required_fields = ['username', 'email', 'password', 'company_name', 'company_website', 'company_description', 'contact_person_name', 'contact_person_phone']
#         for field in required_fields:
#             if field not in data:
#                 return JsonResponse({'error': f'{field} is required'}, status=400)

#         # Check for unique username and email
#         if User.objects.filter(username=data['username']).exists():
#             return JsonResponse({'error': 'Username already exists'}, status=400)
#         if User.objects.filter(email=data['email']).exists():
#             return JsonResponse({'error': 'Email already exists'}, status=400)

#         try:
#             # Create a new user

#             return JsonResponse({'message': 'Jobseeker registered successfully'}, status=201)

#         except Exception as e:
#             return JsonResponse({'error': str(e)}, status=400)

#     return JsonResponse({'error': 'Invalid request method'}, status=405)
# @csrf_exempt
# def register_employer(request):
#     print("METHOD:", request.method)
#     print("RAW BODY:", request.body)

#     if request.method == 'POST':
#         try:
#             data = json.loads(request.body)
#             print("PARSED DATA:", data)
#         except Exception as e:
#             print("JSON ERROR:", str(e))
#             return JsonResponse({'error': 'Invalid JSON'}, status=400)

#         required_fields = ['username', 'email', 'password', 'company_name']

#         for field in required_fields:
#             if field not in data:
#                 print("MISSING FIELD:", field)
#                 return JsonResponse({'error': f'{field} is required'}, status=400)

#         try:
#             user = User.objects.create_user(
#                 username=data['username'],
#                 email=data['email'],
#                 password=data['password']
#             )

#             # Create Employer profile
#             employer = Employer(
#                 user=user,
#                 company_name=data['company_name'],
#                 company_website=data['company_website'],
#                 company_description=data['company_description'],
#                 contact_person_name=data['contact_person_name'],
#                 contact_person_phone=data['contact_person_phone']
#             )
#             employer.save()
#             Employer.objects.create(
#                 user=user,
#                 company_name=data['company_name'],
#                 company_website=data.get('company_website'),
#                 company_description=data.get('company_description'),
#                 contact_person_name=data.get('contact_person_name'),
#                 contact_person_phone=data.get('contact_person_phone')
#             )

#             return JsonResponse({'message': 'Employer registered successfully'}, status=201)

#         except Exception as e:
#             user.delete()  # Remove the user if Employer creation fails
#             return JsonResponse({'error': str(e)}, status=400)

#     return JsonResponse({'error': 'Invalid request method'}, status=405)



# @csrf_exempt
# def login(request):
#     if request.method == 'POST':

#             print("DB ERROR:", str(e))
#             return JsonResponse({'error': str(e)}, status=400)

#     return JsonResponse({'error': 'Invalid request method'}, status=405)
# # =========================
# # LOGIN WITH JWT
# # =========================
# @csrf_exempt
# def login(request):
#     if request.method == 'POST':
#         try:
#             data = json.loads(request.body)
#             username = data.get('username')
#             password = data.get('password')

#             # Authenticate user with username
#             user = authenticate(request, username=username, password=password)
#             if user is not None:
#                 auth_login(request, user)

#                 # Determine user type using a more efficient approach
#                 user_type = 'employer' if Employer.objects.filter(user=user).exists() else 'jobseeker' if Jobseeker.objects.filter(user=user).exists() else None

#                 return JsonResponse({
#                     'message': 'Login successful',
#                     'user': {
#                         'username': user.username,
#                         'email': user.email,
#                         'type': user_type
#                     }
#                 }, status=200)
#             else:
#                 return JsonResponse({'error': 'Invalid credentials'}, status=400)

#         except json.JSONDecodeError:
#             return JsonResponse({'error': 'Invalid JSON'}, status=400)
#         except Exception as e:
#             return JsonResponse({'error': str(e)}, status=500)

#     return JsonResponse({'error': 'Invalid request method'}, status=405)

# from django.contrib.auth import logout

# @csrf_exempt
# def logout_view(request):
#     if request.method == 'POST':
#         logout(request)
#         return JsonResponse({'message': 'Logout successful'}, status=200)
#     return JsonResponse({'error': 'Invalid request method'}, status=405)


# def profile(request, user_id):
#     # Logic to fetch and return user profile
#     return JsonResponse({'user_id': user_id})

#         except:
#             return JsonResponse({'error': 'Invalid JSON'}, status=400)

#         user = authenticate(username=username, password=password)

#         if user is None:
#             return JsonResponse({'error': 'Invalid credentials'}, status=400)

#         refresh = RefreshToken.for_user(user)

#         user_type = 'employer' if Employer.objects.filter(user=user).exists() else 'jobseeker'

#         return JsonResponse({
#             'message': 'Login successful',
#             'access': str(refresh.access_token),
#             'refresh': str(refresh),
#             'user': {
#                 'username': user.username,
#                 'email': user.email,
#                 'type': user_type
#             }
#         }, status=200)

#     return JsonResponse({'error': 'Invalid request method'}, status=405)


# # =========================
# # PROTECTED PROFILE ROUTE
# # =========================
# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def profile(request, user_id):
#     return JsonResponse({
#         'message': 'Authenticated access granted',
#         'requested_user_id': user_id,
#         'logged_in_user': request.user.username
#     })






















from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, logout
from django.http import JsonResponse
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from .models import Employer, Jobseeker
import json


# =========================
# GET REQUEST DATA (JSON OR FORM)
# =========================
def get_request_data(request):
    try:
        return json.loads(request.body)
    except:
        return request.POST


# =========================
# REGISTER JOBSEEKER
# =========================
@csrf_exempt
def register_jobseeker(request):

    if request.method == "POST":

        data = get_request_data(request)

        required_fields = [
            "username",
            "email",
            "password",
            "firstName",
            "lastName",
            "skills",
            "contactNumber",
        ]

        for field in required_fields:
            if not data.get(field):
                return JsonResponse({"error": f"{field} is required"}, status=400)

        if User.objects.filter(username=data["username"]).exists():
            return JsonResponse({"error": "Username already exists"}, status=400)

        if User.objects.filter(email=data["email"]).exists():
            return JsonResponse({"error": "Email already exists"}, status=400)

        try:

            user = User.objects.create_user(
                username=data["username"],
                email=data["email"],
                password=data["password"],
            )

            Jobseeker.objects.create(
                user=user,
                first_name=data["firstName"],
                last_name=data["lastName"],
                skills=data["skills"],
                phone_number=data["contactNumber"],
            )

            return JsonResponse(
                {"message": "Jobseeker registered successfully"}, status=201
            )

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"error": "Invalid request method"}, status=405)


# =========================
# REGISTER EMPLOYER
# =========================
@csrf_exempt
def register_employer(request):

    if request.method == "POST":

        data = get_request_data(request)

        required_fields = ["username", "email", "password", "company_name"]

        for field in required_fields:
            if not data.get(field):
                return JsonResponse({"error": f"{field} is required"}, status=400)

        if User.objects.filter(username=data["username"]).exists():
            return JsonResponse({"error": "Username already exists"}, status=400)

        if User.objects.filter(email=data["email"]).exists():
            return JsonResponse({"error": "Email already exists"}, status=400)

        try:

            user = User.objects.create_user(
                username=data["username"],
                email=data["email"],
                password=data["password"],
            )

            Employer.objects.create(
                user=user,
                company_name=data["company_name"],
                company_website=data.get("company_website"),
                company_description=data.get("company_description"),
                contact_person_name=data.get("contact_person_name"),
                contact_person_phone=data.get("contact_person_phone"),
            )

            return JsonResponse(
                {"message": "Employer registered successfully"}, status=201
            )

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"error": "Invalid request method"}, status=405)


# =========================
# LOGIN (JWT)
# =========================
@csrf_exempt
def login(request):

    if request.method == "POST":

        data = get_request_data(request)

        username = data.get("username")
        password = data.get("password")

        user = authenticate(username=username, password=password)

        if user is None:
            return JsonResponse({"error": "Invalid credentials"}, status=400)

        refresh = RefreshToken.for_user(user)

        user_type = (
            "employer"
            if Employer.objects.filter(user=user).exists()
            else "jobseeker"
        )

        return JsonResponse(
            {
                "message": "Login successful",
                "access": str(refresh.access_token),
                "refresh": str(refresh),
                "user": {
                    "username": user.username,
                    "email": user.email,
                    "type": user_type,
                },
            },
            status=200,
        )

    return JsonResponse({"error": "Invalid request method"}, status=405)


# =========================
# LOGOUT
# =========================
@csrf_exempt
def logout_view(request):

    if request.method == "POST":
        logout(request)
        return JsonResponse({"message": "Logout successful"}, status=200)

    return JsonResponse({"error": "Invalid request method"}, status=405)


# =========================
# PROTECTED PROFILE
# =========================
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def profile(request, user_id):

    return JsonResponse(
        {
            "message": "Authenticated access granted",
            "requested_user_id": user_id,
            "logged_in_user": request.user.username,
        }
    )