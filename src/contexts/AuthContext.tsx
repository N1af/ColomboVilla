import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type UserRole = "admin" | "villa_staff" | "grocery_staff" | "dress_staff";

interface User {
  id: string;
  name: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  // return authenticated User on success, or null on failure
  login: (username: string, password: string) => User | null;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers = {
  admin: { id: "1", name: "Admin", role: "admin" as UserRole, password: "Dashboard" },
  villa: { id: "2", name: "Villa Staff", role: "villa_staff" as UserRole, password: "villa123" },
  grocery: { id: "3", name: "Grocery Staff", role: "grocery_staff" as UserRole, password: "grocery123" },
  dress: { id: "4", name: "Dress Staff", role: "dress_staff" as UserRole, password: "dress123" },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (username: string, password: string): User | null => {
    // Check admin login
    if (username.toLowerCase() === "dashboard" && password === "Dashboard") {
      const loggedInUser: User = { id: mockUsers.admin.id, name: mockUsers.admin.name, role: mockUsers.admin.role };
      setUser(loggedInUser);
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      return loggedInUser;
    }

    // Check other users
    const foundUser = Object.values(mockUsers).find(
      (u) => u.name.toLowerCase() === username.toLowerCase() && u.password === password
    );

    if (foundUser) {
      const userData: User = { id: foundUser.id, name: foundUser.name, role: foundUser.role };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      return userData;
    }

    return null;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated: !!user, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
