from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from .EmployeeSerializersInfo import CreateEmployeeData
from ..attendance.attendanceSerializer import AttendanceSerializers

from .models import JOB_TITLE, GENDER, ADDRESS, EMPLOYER_STAUTS
from .models import Employees_data
from ..attendance.models import Employee_Attendance
from apps.users.models import User

# Custom Permission
from .permissions import IsAdmin
# Create your views here.

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def employee_info(request):
    user_id = request.data.get("user")
    user_instance = get_object_or_404(User, id=user_id) if user_id else request.user

    serializers = CreateEmployeeData(data=request.data)

    if serializers.is_valid():
        serializers.save(user=user_instance)

        return Response (
            serializers.data,
            status=status.HTTP_201_CREATED
        )

    return Response (
        serializers.errors,
        status=status.HTTP_400_BAD_REQUEST
    )

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_employee_info(request):

    employee_model = Employees_data.objects.get(user=request.user)
    serializer = CreateEmployeeData(employee_model)

    return Response (
        serializer.data
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


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_full_employer_list(request):

    employers = Employees_data.objects.select_related("user").all()
    serializer = CreateEmployeeData(employers, many=True)

    return Response (
        serializer.data
    )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_employee_by_id(request, employee_id):

    employee = get_object_or_404(
        Employees_data, employee_id=employee_id
    )
    serializer = CreateEmployeeData(employee)

    return Response (
        serializer.data
    )


@api_view(["GET", "PUT", "PATCH"])
@permission_classes([IsAuthenticated])
def employee_edit_info(request, employee_id):

    employee_instance = get_object_or_404(Employees_data, employee_id=employee_id)

    partial = request.method == "PATCH"
    serializers = CreateEmployeeData(employee_instance, data=request.data, partial=partial)

    if serializers.is_valid():
        serializers.save()
        return Response (
            serializers.data,
            status=status.HTTP_200_OK
        )

    return Response (
        serializers.errors,
        status=status.HTTP_400_BAD_REQUEST
    )


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_employee (request, employee_id):
    try:
        employee = Employees_data.objects.get(employee_id=employee_id)
    except Employees_data.DoesNotExist:
        return Response (
            {"error": "Employee not found."}
        )

    employee.delete()
    return Response (
        {"message": "Employee deleted successfully."},
        status=status.HTTP_204_NO_CONTENT
    )

@api_view(["GET"])
@permission_classes([IsAuthenticated, IsAdmin])
def get_all_employee (request):
    employees = Employees_data.objects.all()
    employees_attendace = Employee_Attendance.objects.all()

    EmployeeSerializers = CreateEmployeeData(employees, many=True)
    Attendance_Serializers = AttendanceSerializers(employees_attendace, many=True)

    return Response({
        "EmployeeSerializers" : EmployeeSerializers.data,
        "Attendance_Serializers" : Attendance_Serializers.data,

        "message" : "All employees are there"
    })