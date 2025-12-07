import React from 'react';
import { Button } from '../ui';
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
            <div className="text-3xl transform group-hover:scale-110 transition-transform">🍃</div>
            <span className="text-2xl font-bold bg-linear-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              FoodShare
            </span>
          </button>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <button
                  onClick={onNavigateToDashboard}
                  className="text-gray-300 hover:text-emerald-400 transition-colors font-medium cursor-pointer"
                >
                  Dashboard
                </button>
                <span className="text-gray-400 px-3 py-1 bg-gray-800 rounded-lg border border-gray-700">
                  {userName} ({userRole})
                </span>
                <Button variant="outline" onClick={onLogout} size="sm">
                  Logout
                </Button>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={() => handleAuthClick('signin')}
                  size="sm"
                  className="border-gray-600 text-gray-300 hover:text-white hover:bg-gray-700 hover:border-gray-500"
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => handleAuthClick('signup')}
                  size="sm"
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
