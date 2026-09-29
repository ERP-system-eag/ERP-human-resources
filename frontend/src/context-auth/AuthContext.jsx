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

  useEffect(() => {
    const restoreAccessTokens = async () => {
      const savedAccess = localStorage.getItem("accessToken");
      const savedRefresh = localStorage.getItem("refreshToken");
      const savedInfo = localStorage.getItem("user");

      if (!savedAccess || !savedRefresh || !savedInfo) {
        setLoading(false);
        return;
      }

      try {
        setAccess(savedAccess);
        setRefresh(savedRefresh);
        setUser(JSON.parse(savedInfo));

        const response = await fetch(
          "http://127.0.0.1:8000/api/users/auth/me",
          {
            headers: {
              Authorization: `Bearer ${savedAccess}`,
            },
          },
        );

        if (!response.ok) {
          console.log("This access token is expired");
        }
      } catch (error) {
        console.error("Session restore failed: ", error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    restoreAccessTokens();
  }, []);

  const [employeeProfile, setEmployeeProfile] = useState();
  useEffect(() => {
    const fullProfile = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/users/auth/employer-auth-info",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        const data = await response.json();
        setEmployeeProfile(data);
      } catch (error) {
        console.log(error);
      }
    };
    fullProfile();
  }, [accessToken]);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        refreshToken,
        login,
        logout,
        employeeProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// create or export custom hook
export function useAuth() {
  return useContext(AuthContext);
}
