from django.urls import path
from .models import Employees_data
from .views import employee_info, get_job_title, employee_Profile

urlpatterns = [
    path("auth/employee-info", employee_info, name="extra-employee-info"),
    path("auth/employee-info-profile", employee_Profile, name="extra-employee-info-profile"),
    path("auth/choices", get_job_title, name="job-titles-chioce")
]
