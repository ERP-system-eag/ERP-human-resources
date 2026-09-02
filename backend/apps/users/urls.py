from django.urls import path
from .views import (
    login_endpoint,
    protected_test,
    profile_info
)

# simpleJWT
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView
)

urlpatterns = [
    # Token url path
    path('auth/login/', TokenObtainPairView.as_view(), name="LoginAPI"),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name="token_refresh"),
    path('auth/test', protected_test, name="protected_api"),
    path('auth/me', profile_info, name="my_info")
]