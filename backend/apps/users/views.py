from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
# rest_framework permission
from rest_framework.permissions import IsAuthenticated

from .models import Employee

# import serializer
from .UserSerializers import EmployeeSerializers
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
        "Response" : "Authrized!! authorized_dashboard"
    })

@api_view(["POST"])
def employer_auth (request):

    serializer = EmployeeSerializers(data=request.data)

    if serializer.is_valid():
        serializer.save()

        return Response ({
            "Response" : "Employe is Authenthicated",
            "Employee" : serializer.data
        },
            status=status.HTTP_201_CREATED
        )

    return Response (
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def employer_auth_info(request):
    
    return Response ({
        "Response" : "The model of employer_auth is work",
    })