from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from ..employee import permissions
from rest_framework.permissions import IsAuthenticated
from .models import Employee_Attendance
from .attendanceSerializer import AttendanceSerializers
from rest_framework.response import Response
from ..employee.models import Employees_data
from django.shortcuts import get_object_or_404
from django.http import Http404
from rest_framework import status

from django.utils import timezone
# Create your views here.

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_employee_attendance(request, employee_id):

    try:
        emp_data = get_object_or_404(Employees_data, employee_id=employee_id)
    except Http404:
        return Response (
            {"error" : "Employee not found!"},
            status=status.HTTP_404_NOT_FOUND
        )

    try:
        employee_attend = Employee_Attendance.objects.get(employee=emp_data.user)
    except Employee_Attendance.DoesNotExist:
        return Response (
            {
                "employee_id" : employee_id,
                "attendance": None,
                "message": "No attendance record exists for this employee.",
            },
            status=status.HTTP_200_OK
        )

    return Response(
        AttendanceSerializers(employee_attend).data,
        status=status.HTTP_200_OK
    )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def save_employee_attendance(request, employee_id):

    employee_instance = get_object_or_404(Employees_data, employee_id=employee_id)
    user = employee_instance.user

    today = timezone.now().date()

    attendace_obj = Employee_Attendance.objects.filter(
        employee=user,
        date=today,
    ).first()

    serializer = AttendanceSerializers(
        attendace_obj,
        data=request.data,
        partial=attendace_obj is not None,
    )
    if serializer.is_valid():
        serializer.save(employee=user, date=today)
        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )
