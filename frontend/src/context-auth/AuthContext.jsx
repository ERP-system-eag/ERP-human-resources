import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
export function AuthProvider({ children }) {
  // url
  const navigate = useNavigate("");

  const [user, setUser] = useState(null);
  const [accessToken, setAccess] = useState(null);
  const [refreshToken, setRefresh] = useState(null);

  const [loading, setLoading] = useState(true);

  const login = (userData, access, refresh) => {
    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);
    localStorage.setItem("user", JSON.stringify(userData));

    setUser(userData);
    setAccess(access);
    setRefresh(refresh);
  };

  const logout = () => {
    console.log("logout Clicked!!");
    setUser(null);
    setAccess(null);
    setRefresh(null);

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const access = localStorage.getItem("accessToken");
    const refresh = localStorage.getItem("refreshToken");
    const savedUser = localStorage.getItem("user");

    if (access && refresh && savedUser) {
      setAccess(access);
      setRefresh(refresh);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, accessToken, refreshToken, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// create or export custom hook
export function useAuth() {
  return useContext(AuthContext);
}
