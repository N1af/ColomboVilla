import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/contexts/AuthContext";
import { 
  LayoutDashboard, 
  Building2, 
  ShoppingBag, 
  ShoppingCart,
  LogOut,
  Menu,
  User
} from "lucide-react";

const getNavigationByRole = (role: string) => {
  if (role === 'admin') {
    return [
      { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
      { name: "Villa Management", href: "/villas", icon: Building2 },
      { name: "Grocery Shop", href: "/shop/grocery", icon: ShoppingCart },
      { name: "Dress Shop", href: "/shop/dress", icon: ShoppingBag },
    ];
  }
  
  if (role === 'villa_staff') {
    return [
      { name: "Villa Management", href: "/villas", icon: Building2 },
    ];
  }
  
  if (role === 'grocery_staff') {
    return [
      { name: "Grocery Shop", href: "/shop/grocery", icon: ShoppingCart },
    ];
  }
  
  if (role === 'dress_staff') {
    return [
      { name: "Dress Shop", href: "/shop/dress", icon: ShoppingBag },
    ];
  }
  
  return [];
};

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  const navigation = getNavigationByRole(user?.role || '');
  // Debugging: log navigation and pathname to help trace incorrect rendering
  // Remove or comment out in production
  console.debug("Layout render - pathname:", location.pathname, "role:", user?.role, "navigation:", navigation);
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const NavContent = () => (
    <>
      <div className="flex h-16 items-center border-b border-sidebar-border px-6">
        <Building2 className="h-8 w-8 text-sidebar-primary" />
        <span className="ml-3 text-lg font-semibold text-sidebar-foreground">
          Business Hub
        </span>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-primary"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-sidebar-border p-4 space-y-2">
        <div className="flex items-center gap-3 rounded-lg bg-sidebar-accent px-3 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sidebar-primary/10">
            <User className="h-4 w-4 text-sidebar-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-sidebar-foreground">{user?.name}</p>
            <p className="text-xs text-sidebar-foreground/60 capitalize">{user?.role.replace('_', ' ')}</p>
          </div>
        </div>
        <Button 
          variant="outline" 
          className="w-full gap-2" 
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </>
  );

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 flex-col border-r border-sidebar-border bg-sidebar lg:flex">
        <NavContent />
      </aside>

      {/* Mobile Menu */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="fixed left-4 top-4 z-40 lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 bg-sidebar p-0">
          <NavContent />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-6 lg:p-8">
          <Outlet /> {/* 👈 This replaces {children} */}
        </div>
      </main>
    </div>
  );
}
