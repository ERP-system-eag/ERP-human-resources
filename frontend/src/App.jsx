import { Routes, Route } from "react-router-dom";

import Login from "./componet/auth/login";
import Home from "./componet/home";
import Autorized from "./componet/dashboard/authorised_user";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/autorized/:username" element={<Autorized />} />
    </Routes>
  );
}

export default App;
