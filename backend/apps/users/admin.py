from django.contrib import admin

from django.contrib.auth.admin import UserAdmin
from .models import (
    User,
    Employee
)
# Register your models here.
admin.site.register(Employee)
@admin.register(User)
class CustomUseradmin(UserAdmin):
    pass