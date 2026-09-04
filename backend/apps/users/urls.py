from django.urls import path
from .views import (
    login_endpoint,
    protected_test,
    profile_info,
    authorized_dashboard,
    employer_auth
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
    path('auth/me', profile_info, name="my_info"),
    path('authrized/<slug:username>/', authorized_dashboard, name="authrized_dashboard"),
    path('authrized/employe/<slug:slug>/', employer_auth, name="Employee_info's"),
]