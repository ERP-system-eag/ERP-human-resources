from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from ..employee import permissions
from rest_framework.permissions import IsAuthenticated
from .models import Employee_Attendance
from .attendanceSerializer import AttendanceSerializers
from rest_framework.response import Response
from ..employee.models import Employees_data
from django.shortcuts import get_object_or_404
from rest_framework import status
# Create your views here.

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_employee_attendance(request, employee_id):

    try:
        emp_data = get_object_or_404(Employees_data, employee_id=employee_id)
    except Employees_data.DoesNotExist:
        return Response (
            {"error" : "Employee not found!"},
            status=status.HTTP_404_NOT_FOUND
        )

    try:
        employee_attend = Employee_Attendance.objects.get(employee=emp_data.user)
    except Employees_data.DoesNotExist:
        return Response (
            {
                "employee_id" : employee_id,
                "attendance": None,
                "message": "No attendance record exists for this employee.",
            },
            status=status.HTTP_200_OK
        )