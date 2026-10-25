from django.db import models
from django.conf import settings

# Create your models here.
class Employee_Attendance(models.Model):
    class Status(models.TextChoices):
        PRESENT = "PRESENT", "Present"
        LATE = "LATE", "Late"
        ABSENT = "ABSENT", "Absent"
        ON_LEAVE = "ON_LEAVE", "On_leave"

    # related user information
    employee = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="employee_attendance")

    # date check when the employee arrived and out
    date = models.DateField()
    check_in = models.DateTimeField()
    check_out = models.DateTimeField()

    # employee attendance status
    status = models.CharField(max_length=10, choices=Status.choices, default=Status.PRESENT)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Attendance - {self.date}"