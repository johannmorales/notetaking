import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";
import Cookies from "js-cookie";

interface AuthContextProps {
  user: any;
  login: (token: string) => void;
  logout: () => void;
  refreshToken: () => Promise<string | undefined>;
  loading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      axios
        .get("/api/whoami", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch(() => {
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = (token: string) => {
    Cookies.set("token", token, { expires: 7 });
    setUser({});
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
  };

  const refreshToken = async (): Promise<string | undefined> => {
    const refreshToken = Cookies.get("refreshToken");
    if (refreshToken) {
      try {
        const response = await axios.post("/api/token/refresh/", {
          refresh: refreshToken,
        });
        const newToken = response.data.access;
        Cookies.set("token", newToken, { expires: 7 });
        return newToken;
      } catch (error) {
        console.error("Error refreshing token:", error);
        logout();
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, refreshToken, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
