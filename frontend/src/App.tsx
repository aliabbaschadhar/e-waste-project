import { useState, useEffect } from 'react';
import { Navbar, Footer } from './components';
import { HomePage, AuthPage, FoodBrowsePage, UserDashboard, RestaurantDashboard, AdminDashboard } from './pages';
import { useAuth } from './services';

type Page = 'home' | 'auth' | 'browse' | 'dashboard';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const { user, logout } = useAuth();

  // Redirect to dashboard if logged in and on auth page
  useEffect(() => {
    if (user && currentPage === 'auth') {
      setCurrentPage('dashboard');
    }
  }, [user, currentPage]);

  const handleLogin = () => {
    setCurrentPage('dashboard');
  };

  const handleLogout = async () => {
    await logout();
    setCurrentPage('home');
  };

  const navigateToAuth = (mode: 'signin' | 'signup' = 'signin') => {
    setAuthMode(mode);
    setCurrentPage('auth');
  };

  const navigateToHome = () => {
    setCurrentPage('home');
  };

  const navigateToBrowse = () => {
    setCurrentPage('browse');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigateToAuth={navigateToAuth} onNavigateToBrowse={navigateToBrowse} />;
      case 'auth':
        return <AuthPage onLogin={handleLogin} onNavigateToHome={navigateToHome} initialMode={authMode} />;
      case 'browse':
        return <FoodBrowsePage />;
      case 'dashboard':
        if (!user) {
          setCurrentPage('home');
          return <HomePage onNavigateToAuth={navigateToAuth} onNavigateToBrowse={navigateToBrowse} />;
        }
        switch (user.role) {
          case 'USER':
            return <UserDashboard userName={user.name || 'User'} />;
          case 'RESTAURANT':
            return <RestaurantDashboard restaurantName={user.name || 'Restaurant'} />;
          case 'ADMIN':
            return <AdminDashboard />;
          default:
            return <HomePage onNavigateToAuth={navigateToAuth} onNavigateToBrowse={navigateToBrowse} />;
        }
      default:
        return <HomePage onNavigateToAuth={navigateToAuth} onNavigateToBrowse={navigateToBrowse} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        isAuthenticated={!!user}
        userRole={user?.role || null}
        userName={user?.name || null}
        onNavigateToAuth={navigateToAuth}
        onNavigateToHome={navigateToHome}
        onNavigateToDashboard={() => setCurrentPage('dashboard')}
        onLogout={handleLogout}
      />
      <main className="grow">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}

export default App;
