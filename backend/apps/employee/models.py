from django.conf import settings 
from django.db import models

# Create your models here.
GENDER = (
    ("Male", "Male"),
    ("Female", "Female")
)

ADDRESS = (
    ("Addis Ketema", "Addis Ketema"),
    ("Akaki Kaliti", "Akaki Kaliti"),
    ("Arada", "Arada"),
    ("Bole", "Bole"),
    ("Gullele", "Gullele"),
    ("Kirkos", "Kirkos"),
    ("Lideta", "Lideta"),
    ("Nifas Silk Lafto", "Nifas Silk Lafto"),
    ("Yeka", "Yeka"),
    ("Lemi Kura", "Lemi Kura"),
)

EMPLOYER_STAUTS = (
    ("On Work", "On Work"),
    ("Unavailabel", "Unavailabel")
)

JOB_TITLE = (
    ("Accountant", "Accountant"),
    ("Casher", "Casher"),
    ("Administrator", "Administrator"),
)

class Employees_data (models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="employee_data")

    # Personal Information
    gender = models.CharField(choices=GENDER, default="Male")
    date_Of_Birth = models.DateField()
    personal_photo = models.ImageField(upload_to="employee/personal_photo", null=True, blank=True)

    # Contact Information
    phone_number = models.IntegerField(max_length=10)
    Address = models.CharField(choices=ADDRESS, default="Yeka")
    emergency_contact = models.IntegerField(max_length=10)

    # Employment Information
    employee_id = models.CharField(max_length=30)
    job_title = models.CharField(choices=JOB_TITLE, default="Casher")
    hire_date = models.DateTimeField(auto_now_add=True)
    employer_status = models.CharField(choices=EMPLOYER_STAUTS, default='On Work')
    salary = models.DecimalField(max_digits=10, decimal_places=2)