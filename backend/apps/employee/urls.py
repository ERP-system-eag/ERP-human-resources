from django.urls import path
from .models import Employees_data
from .views import employee_info, get_job_title

urlpatterns = [
    path("auth/employee-info", employee_info, name="extra-employee-info"),
    path("auth/job-titles", get_job_title, name="job-titles-chioce")
]
