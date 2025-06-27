
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { User, LogOut, Settings, MessageCircle } from "lucide-react";
import { AuthModal } from "./AuthModal";

interface HeaderProps {
  user: any;
  onLogin: (email: string, password: string, role: string) => void;
  onSignup: (email: string, password: string, name: string, role: string) => void;
  onLogout: () => void;
  onOpenMessages: () => void;
}

export const Header = ({ user, onLogin, onSignup, onLogout, onOpenMessages }: HeaderProps) => {
  const [showAuth, setShowAuth] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            HouseHunt
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Button
                variant="ghost"
                onClick={onOpenMessages}
                className="flex items-center space-x-2"
              >
                <MessageCircle className="h-4 w-4" />
                <span className="hidden md:inline">Messages</span>
              </Button>
              
              <div className="flex items-center space-x-2 bg-gray-50 rounded-lg px-3 py-2">
                <User className="h-4 w-4" />
                <span className="text-sm font-medium">{user.name}</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {user.role}
                </span>
              </div>
              
              {user.role === "admin" && (
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Admin
                </Button>
              )}
              
              <Button variant="ghost" onClick={onLogout} size="sm">
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <Button onClick={() => setShowAuth(true)}>
              Login / Sign Up
            </Button>
          )}
        </div>
      </div>

      <AuthModal
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        onLogin={onLogin}
        onSignup={onSignup}
      />
    </header>
  );
};
