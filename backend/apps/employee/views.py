from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from .EmployeeSerializersInfo import CreateEmployeeData
from .models import JOB_TITLE, GENDER, ADDRESS, EMPLOYER_STAUTS
# Create your views here.

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def employee_info(request):

    serializers = CreateEmployeeData(data=request.data)

    if serializers.is_valid():
        serializers.save(user=request.user)

        return Response (
            serializers.data,
            status=status.HTTP_201_CREATED
        )

    return Response (
        serializers.errors,
        status=status.HTTP_400_BAD_REQUEST
    )


def format_choices(choices):
    return [
        {
            "value": value,
            "label": label
        }
        for value, label in choices
    ]

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_job_title(request):
    return Response ({
        "job_title": format_choices(JOB_TITLE),
        "gender": format_choices(GENDER),
        "address": format_choices(ADDRESS),
        "employer_status": format_choices(EMPLOYER_STAUTS)
    })