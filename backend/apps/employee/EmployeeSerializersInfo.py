from rest_framework import serializers
from .models import Employees_data

class CreateEmployeeData(serializers.ModelSerializer):
    class Meta:
        model = Employees_data
        fields = [
            "gender",
            "date_Of_Birth",
            "phone_number",
            "Address",
            "emergency_contact",
            "employee_id",
            "job_title",
            "hire_date",
            "employer_status",
        ]