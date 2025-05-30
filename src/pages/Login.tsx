// src/pages/Login.tsx - Updated with theme support
import React, { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import ThemeToggle from '../components/ThemeToggle';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, user, isLoading } = useAuth();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  if (user) {
    return <Navigate to={from} replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = await login(email, password);
    if (!success) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-theme-secondary py-xl px-md sm:px-lg lg:px-xl">
      <div className="max-w-md w-full space-y-xl">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-md">
            <ThemeToggle />
          </div>
          <h2 className="text-heading-1 text-text-primary">
            Sign in to HPRRDA DPIU
          </h2>
          <p className="mt-sm text-body text-text-muted">
            Use: admin@example.com / password
          </p>
        </div>

        {/* Login Form */}
        <div className="card">
          <div className="card-body">
            <form className="space-y-lg" onSubmit={handleSubmit}>
              <div className="space-y-md">
                <Input
                  id="email"
                  label="Email Address"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                
                <div className="relative">
                  <Input
                    id="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-8 text-text-muted hover:text-text-secondary transition-colors duration-fast"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FiEyeOff className="h-5 w-5" />
                    ) : (
                      <FiEye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div className="p-md bg-error-50 border border-error-200 rounded-md">
                  <p className="text-body-small text-error-700">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={isLoading}
                isLoading={isLoading}
              >
                Sign in
              </Button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-body-small text-text-muted">
            Secure access to HPRRDA project management system
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;