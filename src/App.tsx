import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ClientView } from './components/ClientView';
import { AdminPanel } from './components/AdminPanel';
import { LoginForm } from './components/LoginForm';
import { ChefHat } from 'lucide-react';
import { useAuthStore } from './store/authStore';

function App() {
  const { isAuthenticated, logout } = useAuthStore();

  return (
    <BrowserRouter>
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-2">
                <ChefHat className="text-emerald-500" size={24} />
                <span className="font-bold text-gray-800">Restaurant Menu</span>
              </Link>
            </div>
            <div className="flex items-center">
              {isAuthenticated ? (
                <button
                  onClick={() => logout()}
                  className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Admin Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<ClientView />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;