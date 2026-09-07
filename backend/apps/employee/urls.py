from django.urls import path
from .models import Employees_data
from .views import employee_info

urlpatterns = [
    path("auth/employee-info", employee_info, name="extra-employee-info"),
]
