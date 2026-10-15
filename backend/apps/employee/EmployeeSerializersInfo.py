from rest_framework import serializers
from .models import Employees_data
from ..users.UserSerializers import EmployeeSerializers

class CreateEmployeeData(serializers.ModelSerializer):
    email = serializers.EmailField(
        source="user.email",
        read_only=True
    )

    user = EmployeeSerializers(read_only=True)
    class Meta:
        model = Employees_data
        fields = [
            "id",
            "user",

            "email",
            "gender",
            "date_Of_Birth",
            "phone_number",
            "personal_photo",
            "Address",
            "emergency_contact",
            "employee_id",
            "job_title",
            "hire_date",
            "employer_status",
            "salary",
        ]
