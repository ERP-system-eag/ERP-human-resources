from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.utils.text import slugify
# Create your models here.

class Usermanager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):

        if not email:
            raise ValueError("Eamil is required!!")

        email = self.normalize_email(email)
        user = self.model(
            email=email,
            **extra_fields
        )

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError ("Superuser must have is_staff=True")

        if extra_fields.get("is_superuser") is not True:
            raise ValueError ("Superuser must have is_superuser=True")

        return self.create_user(
            email=email,
            password=password,
            **extra_fields
        )
    
class User(AbstractUser):

    username = None
    

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = Usermanager()

    
    email = models.EmailField(unique=True)
    password = models.CharField()

    # Name
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    grandfather_name = models.CharField(max_length=100)

    # permission check
    is_admin = models.BooleanField(default=False)
    # is active

    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.email