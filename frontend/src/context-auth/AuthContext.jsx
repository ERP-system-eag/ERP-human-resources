import { useContext, createContext, useState } from "react";

const AuthContext = createContext();
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccess] = useState(null);
  const [refreshToken, setRefresh] = useState(null);

  const login = (userData, access, refresh) => {
    setUser(userData);
    setAccess(access);
    setRefresh(refresh);
  };

  const logout = () => {
    setUser(null);
    setAccess(null);
    setRefresh(null);
  };

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
