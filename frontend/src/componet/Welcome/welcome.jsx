import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context-auth/AuthContext";

function Welcome() {
  const { user } = useAuth();
  const navigate = useNavigate("");

  //   welcome page timer
  const lastwelcome = localStorage.getItem("lastWelcome");
  const now = Date.now();

  const DAY_30 = 30 * 24 * 60 * 60 * 1000;

  if (!lastwelcome || now - Number(lastwelcome) > DAY_30) {
    navigate("/welcome");
  } else {
    navigate("/login");
  }
  return (
    <>
      <h1>Welcome</h1>
    </>
  );
}

export default Welcome;
