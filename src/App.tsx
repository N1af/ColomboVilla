import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { Layout } from "./components/Layout";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import VillaManagement from "./pages/VillaManagement";
import DressShop from "./pages/DressShop";
import GroceryShop from "./pages/GroceryShop";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

/* 🔒 Protect routes */
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

/* 📦 App Routes */
function AppRoutes() {
  const { isAuthenticated, user } = useAuth();

  // 🧠 Role-based redirect after login
  const getDashboardPath = () => {
    switch (user?.role) {
      case "admin":
        return "/admin";
      case "villa_staff":
        return "/villas";
      case "dress_staff":
        return "/shop/dress";
      case "grocery_staff":
        return "/shop/grocery";
      default:
        return "/login";
    }
  };

  return (
    <Routes>
      {/* Public: Login Page */}
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to={getDashboardPath()} replace />
          ) : (
            <Login />
          )
        }
      />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        {/* Redirect from / -> user-specific dashboard */}
        <Route
          index
          element={<Navigate to={isAuthenticated ? getDashboardPath() : "/login"} replace />}
        />

        <Route path="admin" element={<AdminDashboard />} />
        <Route path="villas" element={<VillaManagement />} />
        <Route path="shop/dress" element={<DressShop />} />
        <Route path="shop/grocery" element={<GroceryShop />} />
      </Route>

      {/* 404 Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

/* 🌍 App Wrapper */
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
