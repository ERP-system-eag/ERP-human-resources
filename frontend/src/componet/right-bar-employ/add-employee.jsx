import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context-auth/AuthContext";
import { toast } from "react-toastify";
import "../dashboard/dashboard-layout.css";
import StepOneEmployee from "./create-step/step_one";
import StepTwoEmployee from "./create-step/step_two";

function AddEmployee() {
  const { accessToken, reloadPage } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [AddEmployee, setAddEmployee] = useState({
    first: "",
    last: "",
    grand: "",
    email: "",
    password: "",
  });
  const [choices, setChoices] = useState({
    job_title: [],
    gender: [],
    address: [],
    employer_status: [],
  });

  const [formData, setFormData] = useState({
    employee_id: "",
    phone_number: "",
    emergency_contact: "",
    Address: "",
    job_title: "",
    employer_status: "",
    salary: "",
    hire_date: "",
    date_Of_Birth: "",
    gender: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [step, setStep] = useState(1);

  useEffect(() => {
    const fetchChoices = async () => {
      try {
        const res = await fetch(
          "http://127.0.0.1:8000/api/employee/auth/choices",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        if (res.ok) {
          const data = await res.json();
          setChoices(data);
        }
      } catch (error) {
        console.error("Failed to fetch choices:", error);
      }
    };
    if (accessToken) {
      fetchChoices();
    }
  }, [accessToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // STEP 1: Create the employee account
    const accountFormData = new FormData();

    accountFormData.append("first_name", AddEmployee.first);
    accountFormData.append("last_name", AddEmployee.last);
    accountFormData.append("grandfather_name", AddEmployee.grand);
    accountFormData.append("email", AddEmployee.email);
    accountFormData.append("password", AddEmployee.password);

    try {
      const accountResponse = await fetch(
        "http://127.0.0.1:8000/api/users/authrized/employe/create",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: accountFormData,
        },
      );

      if (!accountResponse.ok) {
        const errorData = await accountResponse.json();
        console.error("Account creation error:", errorData);
        toast.error("Failed to create employee account");
        return;
      }

      const accountData = await accountResponse.json();
      const createdUserId = accountData.Employee?.id;
      toast.success("Employee Sign up Successfully!!");

      // STEP 2: Submit employee profile information
      const payload = new FormData();
      if (selectedImage) {
        payload.append("personal_photo", selectedImage);
      }

      if (createdUserId) {
        payload.append("user", createdUserId);
      }

      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== "") {
          payload.append(key, value);
        }
      });

      const profileResponse = await fetch(
        "http://127.0.0.1:8000/api/employee/auth/employee-info",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: payload,
        },
      );

      if (!profileResponse.ok) {
        const profileError = await profileResponse.json();
        console.error("Profile creation error:", profileError);
        toast.error("Failed to save employee info");
        return;
      }

      await profileResponse.json();

      // STEP 3: Both requests succeeded
      toast.success("Employee account and profile created successfully!");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.log("Request error", error);
      toast.error("invalid");
    }
  };

  return (
    <div className="Right_dashboard-sidebar border-start border-bottom rounded-bottom-1 p-3">
      <div className="dashboard-sidebar-inner px-2">
        {step === 1 && (
          <StepOneEmployee
            setStep={setStep}
            setAddEmployee={setAddEmployee}
            AddEmployee={AddEmployee}
          />
        )}

        {step === 2 && (
          <StepTwoEmployee
            setSelectedImage={setSelectedImage}
            setPreviewImage={setPreviewImage}
            handleSubmit={handleSubmit}
            previewImage={previewImage}
            handleChange={handleChange}
            formData={formData}
            loading={loading}
            choices={choices}
            AddEmployee={AddEmployee}
          />
        )}
      </div>
    </div>
  );
}

export default AddEmployee;
