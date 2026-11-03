from rest_framework import serializers
from .models import Employees_data
from ..attendance.models import Employee_Attendance
from ..users.UserSerializers import EmployeeSerializers

class EmployeeAttendanceDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee_Attendance
        fields = "__all__"
class CreateEmployeeData(serializers.ModelSerializer):
    email = serializers.EmailField(
        source="user.email",
        read_only=True
    )

    user = EmployeeSerializers(read_only=True)
    attendance = EmployeeAttendanceDetailsSerializer(
        source="user.employee_attendance",
        many=True,
        read_only=True
    )
    class Meta:
        model = Employees_data
        fields="__all__"
