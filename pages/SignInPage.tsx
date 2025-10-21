import React, { useState, FormEvent, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import type { User } from '../types';

const mockUsers = [
  { email: "artisan@example.com", password: "artisan123", role: "artisan" },
  { email: "client@example.com", password: "client123", role: "client" },
  { email: "admin@example.com", password: "admin123", role: "admin" },
];

const SignInPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user: User = JSON.parse(storedUser);
        navigate(`/${user.role}`);
      } catch (e) {
        localStorage.removeItem('user');
      }
    }
  }, [navigate]);


  const handleSignIn = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    const foundUser = mockUsers.find(
      user => user.email === email && user.password === password
    );

    if (foundUser) {
      const userData: User = { email: foundUser.email, role: foundUser.role as User['role'] };
      localStorage.setItem('user', JSON.stringify(userData));
      window.dispatchEvent(new Event('authChange'));
      
      navigate(`/${userData.role}`);
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-sand-beige/30 p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold font-montserrat text-terracotta">
                    Artisana<span className="text-deep-green">Maroc</span>
                </h1>
                <p className="text-gray-600 mt-2">Sign in to access your account.</p>
            </div>

            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md text-sm" role="alert">{error}</div>}

            <form className="space-y-6" onSubmit={handleSignIn}>
                <div>
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">Email address</label>
                    <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-terracotta focus:border-terracotta sm:text-sm"
                    placeholder="you@example.com"
                    />
                </div>

                <div>
                    <label htmlFor="password"  className="text-sm font-medium text-gray-700">Password</label>
                    <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-terracotta focus:border-terracotta sm:text-sm"
                    placeholder="••••••••"
                    />
                </div>

                <div>
                    <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-terracotta hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-terracotta transition"
                    >
                    Sign In
                    </button>
                </div>
            </form>
            <div className="text-center text-sm text-gray-600">
                <p>
                    Don't have an account? <Link to="#" className="font-medium text-deep-green hover:underline">Sign up</Link>
                </p>
            </div>
        </div>
    </div>
  );
};

export default SignInPage;
