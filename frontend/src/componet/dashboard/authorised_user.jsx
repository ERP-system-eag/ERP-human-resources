import { useParams } from "react-router-dom";

// Other component
import Navbar from "./autorized-component/nav-bar";

function Autorized() {
  const { username } = useParams();
  return (
    <>
      <div className="w-100 vh-100">
        <div className="w-100 vh-50 bg-danger-subtle overflow-hidden">
          <Navbar />
        </div>
      </div>
    </>
  );
}

export default Autorized;
