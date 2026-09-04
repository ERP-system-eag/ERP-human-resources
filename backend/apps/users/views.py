from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
# rest_framework permission
from rest_framework.permissions import IsAuthenticated
# Create your views here.

# endpoints
@api_view(["GET"])
def login_endpoint (request):
    return Response ({
        "Response" : "API Is Working!"
    })

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def profile_info (request):
    return Response ({
        "Response" : "This is Employee Profile",
        "user" : request.user.username,
        "firstname" : request.user.first_name,
        "lastname" : request.user.last_name,
        "is_admin" : request.user.is_staff,
    })

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def protected_test(request):
    return Response ({
        "Response" : "This is Protected API",
        "user" : request.user.username
    })


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def authorized_dashboard(request, username):
    return Response ({
        "Response" : "Authrized!!"
    })

@api_view(["GET"])
def employer_auth (request, slug):
    return Response ({
        "Response" : "Employe is Authenthicated",
        "first_name" : request.user.first_name,
        "last_name" : request.user.last_name,
        "grandfather_name" : request.user.grandfather_name,
        "age" : request.user.age,
        "email" : request.user.email,
        "unique_id" : request.user.unique_id,
        "personal_phohto" : request.user.personal_phohto,
        "salary" : request.user.salary,
        "slug" : request.user.slug
    })