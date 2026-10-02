from django.urls import path
from .views import (
    protected_test,
    profile_info,
    authorized_dashboard,
    employer_auth_info,
    employer_auth,
    admin_employee_list,
    employee_Profile
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
    path('authrized/employe/create', employer_auth, name="Employee_info's"),
    path('auth/employer-auth-info', employer_auth_info, name="Employer_auth_info's"),
    path('auth/admin-employ-list', admin_employee_list, name="Employe_List"),
    path('auth/employer-info/profile', employee_Profile, name="Employer_Profile")
]