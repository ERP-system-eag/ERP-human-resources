from rest_framework import serializers
from .models import Employees_data

class CreateEmployeeData(serializers.ModelSerializer):
    email = serializers.EmailField(
        source="user.email",
        read_only="true"
    )
    class Meta:
        model = Employees_data
        fields = [
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