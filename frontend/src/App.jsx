import { Routes, Route } from "react-router-dom";

import Login from "./componet/auth/login";
import Home from "./componet/home";
import Autorized from "./componet/dashboard/authorised_user";
import MainLoginComponent from "./componet/auth/Employee-auth/Main-login-component";

// side bar component
import Employees_side from "./componet/employee/employe";
import Attendance from "./componet/dashboard/Attendance/attendance";
import Payroll from "./componet/payroll/payroll";
import Profile from "./componet/profile/Profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/autorized/:username" element={<Autorized />} />
      <Route path="/employee-login" element={<MainLoginComponent />} />

      {/* side bar likes */}
      <Route path="/Employees" element={<Employees_side />} />
      <Route path="/Attendance" element={<Attendance />} />
      <Route path="/Payroll" element={<Payroll />} />
      <Route path="/Profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
