import { createContext, useContext, useState, ReactNode } from 'react';

type UserRole = 'admin' | 'villa_staff' | 'grocery_staff' | 'dress_staff';

interface User {
  id: string;
  name: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers = {
  admin: { id: '1', name: 'Admin', role: 'admin' as UserRole, password: 'Dashboard' },
  villa: { id: '2', name: 'Villa Staff', role: 'villa_staff' as UserRole, password: 'villa123' },
  grocery: { id: '3', name: 'Grocery Staff', role: 'grocery_staff' as UserRole, password: 'grocery123' },
  dress: { id: '4', name: 'Dress Staff', role: 'dress_staff' as UserRole, password: 'dress123' },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (username: string, password: string): boolean => {
    // Check admin login
    if (username.toLowerCase() === 'dashboard' && password === 'Dashboard') {
      setUser(mockUsers.admin);
      return true;
    }
    
    // Check other users
    const foundUser = Object.values(mockUsers).find(
      u => u.name.toLowerCase() === username.toLowerCase() && u.password === password
    );
    
    if (foundUser) {
      setUser({ id: foundUser.id, name: foundUser.name, role: foundUser.role });
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
