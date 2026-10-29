from django.urls import path
from .views import (
    get_employee_attendance
)

urlpatterns = [
    path('get_employee/attendace/<str:employee_id>/', get_employee_attendance, name="employee attendace")
]
