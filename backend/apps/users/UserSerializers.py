from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import User

User = get_user_model()

class EmployeeSerializers(serializers.ModelSerializer):

    email = serializers.EmailField(write_only=True)
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "password",
            "first_name",
            "last_name",
            "grandfather_name"
        ]

    def create(self, validated_data):
        email = validated_data.pop("email")
        password = validated_data.pop("password")

        user = User.objects.create_user(
            email=email,
            password=password,
            **validated_data
        )

        return user