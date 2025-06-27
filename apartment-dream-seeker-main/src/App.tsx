
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "@/components/Header";
import { MessagingSystem } from "@/components/MessagingSystem";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useState<any>(null);
  const [showMessages, setShowMessages] = useState(false);

  const handleLogin = (email: string, password: string, role: string) => {
    // Mock login - in real app, this would make API call
    const mockUser = {
      id: 1,
      name: email.split('@')[0],
      email,
      role: email.includes('admin') ? 'admin' : role
    };
    setUser(mockUser);
    console.log("User logged in:", mockUser);
  };

  const handleSignup = (email: string, password: string, name: string, role: string) => {
    // Mock signup - in real app, this would make API call
    const mockUser = {
      id: Date.now(),
      name,
      email,
      role
    };
    setUser(mockUser);
    console.log("User signed up:", mockUser);
  };

  const handleLogout = () => {
    setUser(null);
    setShowMessages(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <Header
              user={user}
              onLogin={handleLogin}
              onSignup={handleSignup}
              onLogout={handleLogout}
              onOpenMessages={() => setShowMessages(true)}
            />
            
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<Dashboard userRole={user?.role || "renter"} />} />
              <Route path="*" element={<NotFound />} />
            </Routes>

            {showMessages && (
              <MessagingSystem onClose={() => setShowMessages(false)} />
            )}
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
