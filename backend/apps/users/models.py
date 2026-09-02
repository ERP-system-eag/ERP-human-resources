from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class User(AbstractUser):

    email = models.EmailField(unique=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username", "first_name", "last_name"]

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.email


class Employee(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    salary = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )