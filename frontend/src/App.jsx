import { Routes, Route } from "react-router-dom";

import Login from "./componet/auth/login";
import Home from "./componet/home";
import Autorized from "./componet/dashboard/authorised_user";
import MainLoginComponent from "./componet/auth/Employee-auth/Main-login-component";
import { useEffect } from "react";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/autorized/:username" element={<Autorized />} />
      <Route path="/employee-login" element={<MainLoginComponent />} />
    </Routes>
  );
}

export default App;
