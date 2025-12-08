import React from 'react';
import { Button, Logo } from '../ui';
import { LogOut, LayoutDashboard, LogIn, UserPlus } from 'lucide-react';
import type { UserRole } from '../../types';

interface NavbarProps {
  isAuthenticated: boolean;
  userRole: UserRole | null;
  userName: string | null;
  onNavigateToAuth: (mode?: 'signin' | 'signup') => void;
  onNavigateToHome: () => void;
  onNavigateToDashboard: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isAuthenticated,
  userRole,
  userName,
  onNavigateToAuth,
  onNavigateToHome,
  onNavigateToDashboard,
  onLogout,
}) => {
  const handleAuthClick = (mode: 'signin' | 'signup') => {
    onNavigateToAuth(mode);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-emerald-100 shadow-sm transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button onClick={onNavigateToHome} className="cursor-pointer hover:opacity-90 transition-opacity">
            <Logo size="md" variant="light" showText={true} />
          </button>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <button
                  onClick={onNavigateToDashboard}
                  className="flex items-center space-x-2 text-gray-600 hover:text-emerald-600 transition-colors font-medium px-3 py-2 rounded-md hover:bg-emerald-50"
                  title="Dashboard"
                >
                  <LayoutDashboard size={20} />
                  <span className="hidden sm:inline">Dashboard</span>
                </button>
                <div className="hidden md:flex items-center px-3 py-1.5 bg-gray-100 rounded-full border border-gray-200">
                  <span className="text-sm text-gray-700 font-medium">
                    {userName}
                  </span>
                  <span className="mx-2 text-gray-400">|</span>
                  <span className="text-xs text-emerald-600 uppercase tracking-wider font-semibold">
                    {userRole}
                  </span>
                </div>
                <Button
                  variant="outline"
                  onClick={onLogout}
                  size="sm"
                  className="border-gray-200 text-gray-600 hover:text-red-600 hover:bg-red-50 hover:border-red-200 transition-all duration-200"
                  title="Logout"
                >
                  <LogOut size={18} className="sm:mr-2" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  onClick={() => handleAuthClick('signin')}
                  size="sm"
                  className="text-gray-600 hover:text-emerald-600 hover:bg-emerald-50"
                >
                  <LogIn size={18} className="sm:mr-2" />
                  <span className="hidden sm:inline">Sign In</span>
                </Button>
                <Button
                  onClick={() => handleAuthClick('signup')}
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white border-none shadow-lg shadow-emerald-600/20"
                >
                  <UserPlus size={18} className="sm:mr-2" />
                  <span className="hidden sm:inline">Sign Up</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
