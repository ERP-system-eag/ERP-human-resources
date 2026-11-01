from rest_framework import serializers
from .models import Employee_Attendance
from ..users.UserSerializers import EmployeeSerializers

class AttendanceSerializers (serializers.ModelSerializer):
    # user = EmployeeSerializers(read_only=True)

    class Meta:
        model = Employee_Attendance
        fields = [
            "employee",
            "id",
            
            "date",
            "check_in",
            "check_in_notes"
            
            "status",
        ]