from django.urls import path
from .views import (
    get_employee_attendance,
    save_employee_attendance
)

urlpatterns = [
    path('get_employee/attendace/<str:employee_id>/', get_employee_attendance, name="employee attendace"),
    path('attendanc/save_employee/information/<str:employee_id>/', save_employee_attendance, name="Save employee attendace")
]
