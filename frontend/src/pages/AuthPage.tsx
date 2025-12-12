import React, { useState } from 'react';
import { Button, Input, Logo } from '../components/ui';
import { Users, UtensilsCrossed, Shield, ArrowLeft } from 'lucide-react';
import { useAuth } from '../services';
import type { UserRole } from '../types';

interface AuthPageProps {
  onLogin: (role: UserRole, name: string) => void;
  onNavigateToHome: () => void;
  initialMode?: 'signin' | 'signup';
}

export const AuthPage: React.FC<AuthPageProps> = ({ onLogin, onNavigateToHome, initialMode = 'signin' }) => {
  const { signup, login, isLoading, error } = useAuth();
  const [isSignUp, setIsSignUp] = useState(initialMode === 'signup');
  const [selectedRole, setSelectedRole] = useState<UserRole>('USER');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    // Validation
    if (!formData.email || !formData.password) {
      setLocalError('Email and password are required');
      return;
    }

    if (isSignUp) {
      if (!formData.name) {
        setLocalError('Name is required');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setLocalError('Passwords do not match');
        return;
      }
      if (formData.password.length < 6) {
        setLocalError('Password must be at least 6 characters');
        return;
      }

      try {
        await signup(formData.email, formData.password, formData.name, selectedRole);
        onLogin(selectedRole, formData.name);
      } catch (err: any) {
        setLocalError(err.message);
      }
    } else {
      try {
        await login(formData.email, formData.password);
        const userName = formData.email.split('@')[0];
        onLogin(selectedRole, userName);
      } catch (err: any) {
        setLocalError(err.message);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const displayError = localError || error;

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 to-slate-800 flex flex-col">
      {/* Navigation Bar */}
      <nav className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo />
            <span className="text-xl font-bold text-white hidden sm:inline">E-Waste</span>
          </div>
          <button
            onClick={onNavigateToHome}
            className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            Back
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="bg-slate-800 rounded-lg border border-slate-700 shadow-2xl p-8">
            {/* Header */}
            <h1 className="text-3xl font-bold text-white mb-2">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h1>
            <p className="text-slate-400 mb-8">
              {isSignUp ? 'Join us to manage e-waste responsibly' : 'Sign in to your account'}
            </p>

            {/* Role Selection for SignUp */}
            {isSignUp && (
              <div className="mb-8">
                <label className="block text-sm font-medium text-slate-300 mb-4">Select your role</label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedRole('USER')}
                    className={`p-4 rounded-lg border-2 transition-all ${selectedRole === 'USER'
                        ? 'border-blue-500 bg-blue-500/10'
                        : 'border-slate-600 bg-slate-700 hover:border-slate-500'
                      }`}
                  >
                    <Users size={24} className="mx-auto mb-2 text-blue-400" />
                    <span className="text-sm font-medium text-white">User</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedRole('RESTAURANT')}
                    className={`p-4 rounded-lg border-2 transition-all ${selectedRole === 'RESTAURANT'
                        ? 'border-orange-500 bg-orange-500/10'
                        : 'border-slate-600 bg-slate-700 hover:border-slate-500'
                      }`}
                  >
                    <UtensilsCrossed size={24} className="mx-auto mb-2 text-orange-400" />
                    <span className="text-sm font-medium text-white">Restaurant</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedRole('ADMIN')}
                    className={`p-4 rounded-lg border-2 transition-all ${selectedRole === 'ADMIN'
                        ? 'border-purple-500 bg-purple-500/10'
                        : 'border-slate-600 bg-slate-700 hover:border-slate-500'
                      }`}
                  >
                    <Shield size={24} className="mx-auto mb-2 text-purple-400" />
                    <span className="text-sm font-medium text-white">Admin</span>
                  </button>
                </div>
              </div>
            )}

            {/* Error Message */}
            {displayError && (
              <div className="mb-4 p-4 bg-red-500/10 border border-red-500/50 rounded-lg">
                <p className="text-red-400 text-sm">{displayError}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Name</label>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full"
                    disabled={isLoading}
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                <Input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full"
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                <Input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full"
                  required
                  disabled={isLoading}
                />
              </div>

              {isSignUp && (
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Confirm Password</label>
                  <Input
                    type="password"
                    name="confirmPassword"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full"
                    required
                    disabled={isLoading}
                  />
                </div>
              )}

              <Button type="submit" className="w-full mt-6" disabled={isLoading}>
                {isLoading ? 'Loading...' : isSignUp ? 'Create Account' : 'Sign In'}
              </Button>
            </form>

            {/* Toggle Form */}
            <p className="text-center text-slate-400 mt-6">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setLocalError(null);
                }}
                className="text-blue-400 hover:text-blue-300 font-medium ml-2"
                disabled={isLoading}
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
