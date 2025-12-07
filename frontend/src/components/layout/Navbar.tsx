import React from 'react';
import { Button } from '../ui';
import { LogOut, LayoutDashboard, LogIn, UserPlus, Leaf } from 'lucide-react';
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
    <nav className="bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 shadow-xl border-b border-gray-700">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <button onClick={onNavigateToHome} className="flex items-center space-x-3 group cursor-pointer">
            <Leaf size={28} className="text-emerald-400" />
            <span className="text-2xl font-bold bg-linear-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              FoodShare
            </span>
          </button>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <button
                  onClick={onNavigateToDashboard}
                  className="text-gray-300 hover:text-emerald-400 transition-colors font-medium cursor-pointer flex items-center space-x-2"
                >
                  <LayoutDashboard size={20} />
                  <span>Dashboard</span>
                </button>
                <span className="text-gray-400 px-3 py-1 bg-gray-800 rounded-lg border border-gray-700">
                  {userName} ({userRole})
                </span>
                <Button variant="outline" onClick={onLogout} size="sm" className="flex items-center space-x-2">
                  <LogOut size={18} />
                  <span>Logout</span>
                </Button>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={() => handleAuthClick('signin')}
                  size="sm"
                  className="border-gray-600 text-gray-300 hover:text-white hover:bg-gray-700 hover:border-gray-500 flex items-center space-x-2"
                >
                  <LogIn size={18} />
                  <span>Sign In</span>
                </Button>
                <Button
                  onClick={() => handleAuthClick('signup')}
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <UserPlus size={18} />
                  <span>Sign Up</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
