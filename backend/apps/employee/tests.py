from datetime import date

from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase

from apps.employee.models import Employees_data


class EmployeeInfoUpdateTests(APITestCase):
    def test_employee_update_keeps_original_user(self):
        User = get_user_model()
        owner = User.objects.create_user(
            email="owner@example.com",
            password="password123",
            first_name="Owner",
            last_name="Person",
            grandfather_name="Family",
        )
        editor = User.objects.create_user(
            email="editor@example.com",
            password="password123",
            first_name="Editor",
            last_name="Person",
            grandfather_name="Family",
        )
        employee = Employees_data.objects.create(
            user=owner,
            gender="Male",
            date_Of_Birth=date(1995, 1, 1),
            phone_number=911111111,
            Address="Yeka",
            emergency_contact=922222222,
            employee_id="EMP-001",
            job_title="Casher",
            hire_date=date(2024, 1, 1),
            employer_status="On Work",
            salary="10000.00",
        )

        self.client.force_authenticate(user=editor)
        response = self.client.patch(
            f"/api/employee/auth/profile/employee-update/{employee.employee_id}/",
            {"phone_number": 933333333},
            format="json",
        )

        self.assertEqual(response.status_code, 200)
        employee.refresh_from_db()
        self.assertEqual(employee.user, owner)
        self.assertEqual(employee.phone_number, 933333333)
