from django.urls import path
from .models import Employees_data
from .views import employee_info, get_job_title, get_employee_info, get_full_employer_list, get_employee_by_id

urlpatterns = [
    path("auth/employee-info", employee_info, name="extra-employee-info"),
    path("auth/choices", get_job_title, name="job-titles-chioce"),
    path("auth/employee-info-complate/profile", get_employee_info, name="Employ_full_data"),
    path("auth/employer-data-list", get_full_employer_list, name="Employers-List"),
    path('auth/profile/employee-detail/<str:employee_id>/', get_employee_by_id, name="employee-detail")
]
