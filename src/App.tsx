import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import VillaManagement from "./pages/VillaManagement";
import DressShop from "./pages/DressShop";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Dashboard /></Layout>} />
          <Route path="/villas" element={<Layout><VillaManagement /></Layout>} />
          <Route path="/shop" element={<Layout><DressShop /></Layout>} />
          <Route path="/staff" element={<Layout><div className="text-center py-12"><h2>Staff Management</h2><p className="text-muted-foreground mt-2">Coming soon</p></div></Layout>} />
          <Route path="/settings" element={<Layout><div className="text-center py-12"><h2>Settings</h2><p className="text-muted-foreground mt-2">Coming soon</p></div></Layout>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
