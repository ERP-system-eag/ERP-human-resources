from django.db import models
from django.conf import settings

# Create your models here.
class Employee_Attendance(models.Model):
    class Status(models.TextChoices):
        PRESENT = "PRESENT", "PRESENT"
        LATE = "LATE", "LATE"
        ABSENT = "ABSENT", "ABSENT"
        ON_LEAVE = "ON_LEAVE", "ON_LEAVE"

    # related user information
    employee = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="employee_attendance")

    # date check when the employee arrived and out
    # Check In
    check_in = models.DateTimeField(blank=True, null=True)
    check_in_notes = models.TextField(blank=True, null=True)

    # Check out
    check_out = models.DateTimeField(blank=True, null=True)
    check_out_notes = models.TextField(blank=True, null=True)

    date = models.DateField()

    # employee attendance status
    status = models.CharField(max_length=10, choices=Status.choices, default=Status.PRESENT, blank=True, null=True)
    created_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Attendance - {self.date}"