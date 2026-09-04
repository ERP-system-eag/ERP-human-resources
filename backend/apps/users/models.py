from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.text import slugify
# Create your models here.

class User(AbstractUser):

    email = models.EmailField(unique=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username", "first_name", "last_name"]

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.email


class Employee(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    grandfather_name = models.CharField(max_length=100)
    age = models.IntegerField
    unique_id = models.CharField(max_length=30, unique=True)
    personal_phohto = models.ImageField(upload_to='Emploee/personal_photo')
    email = models.EmailField(unique=True)
    salary = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    slug = models.SlugField(unique=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(**args, **kwargs)