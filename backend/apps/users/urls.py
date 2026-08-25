from django.urls import path
from .views import login_endpoint

# simpleJWT
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView
)

urlpatterns = [
    # Token url path
    path('/auth/login', TokenObtainPairView.as_view(), name="LoginAPI"),
    path('/auth/refresh', TokenRefreshView.as_view(), name="token_refresh")
]