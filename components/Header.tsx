import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import type { User } from '../types';

const NavIcon: React.FC<{ children: React.ReactNode; to: string }> = ({ children, to }) => (
  <Link to={to} className="relative text-gray-600 hover:text-terracotta transition-colors duration-300">
    {children}
  </Link>
);

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkUser = () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
        console.error("Failed to parse user from localStorage", error);
      }
    };
    
    checkUser();
    
    const handleAuthChange = () => {
      checkUser();
    };
    window.addEventListener('authChange', handleAuthChange);

    return () => {
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('authChange')); 
    navigate('/');
  };

  const navLinkClasses = "py-2 text-gray-700 hover:text-terracotta transition-colors duration-300";
  const activeLinkClasses = "text-terracotta font-semibold";

  const renderNavLinks = () => {
    if (!user) {
        return (
          <>
            <NavLink to="/Home" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>Home</NavLink>
            <NavLink to="/products" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>Shop</NavLink>
            <NavLink to="/about" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>Our Story</NavLink>
          </>
        )
    }

    switch (user.role) {
      case 'client':
        return (
          <>
            <NavLink to="/Home" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>Home</NavLink>
            <NavLink to="/client" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>Shop</NavLink>
            <NavLink to="/about" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>Our Story</NavLink>
          </>
        );
      case 'artisan':
        return (
          <>
            <NavLink to="/artisan" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>My Dashboard</NavLink>
            <NavLink to="/about" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>About</NavLink>
          </>
        );
      case 'admin':
        return <NavLink to="/admin" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>Admin Dashboard</NavLink>;
      default:
        return null;
    }
  };
  
  const renderMobileNavLinks = () => {
    const closeMenu = () => setIsMenuOpen(false);
    
    if (!user) {
        return (
          <>
            <NavLink to="/Home" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`} onClick={closeMenu}>Home</NavLink>
            <NavLink to="/products" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`} onClick={closeMenu}>Shop</NavLink>
            <NavLink to="/about" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`} onClick={closeMenu}>Our Story</NavLink>
          </>
        )
    }
  
    switch (user.role) {
      case 'client':
        return (
          <>
            <NavLink to="/Home" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`} onClick={closeMenu}>Home</NavLink>
            <NavLink to="/client" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`} onClick={closeMenu}>Shop</NavLink>
            <NavLink to="/about" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`} onClick={closeMenu}>Our Story</NavLink>
          </>
        );
      case 'artisan':
        return (
          <>
            <NavLink to="/artisan" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`} onClick={closeMenu}>My Dashboard</NavLink>
            <NavLink to="/about" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`} onClick={closeMenu}>About</NavLink>
          </>
        );
      case 'admin':
        return <NavLink to="/admin" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`} onClick={closeMenu}>Admin Dashboard</NavLink>;
      default:
        return null;
    }
  };
  
  const pathsWithoutCart = ['/', '/admin', '/artisan'];
  const showCart = !pathsWithoutCart.includes(location.pathname);

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to={user ? `/${user.role}`: '/'} className="text-3xl font-bold font-montserrat text-terracotta">
          Artisana<span className="text-deep-green">Maroc</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {renderNavLinks()}
        </nav>

        {/* Icons & Auth */}
        <div className="hidden md:flex items-center space-x-6">
          <button className="text-gray-600 hover:text-terracotta transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          {showCart && (
            <NavIcon to="/cart">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="absolute -top-2 -right-2 bg-terracotta text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
            </NavIcon>
          )}
          {user ? (
             <button onClick={handleLogout} className="bg-deep-green text-white px-4 py-2 rounded-full hover:bg-opacity-90 transition-colors duration-300 text-sm">
                Sign Out
             </button>
          ) : (
            <Link to="/signin" className="bg-terracotta text-white px-4 py-2 rounded-full hover:bg-opacity-90 transition-colors duration-300 text-sm">
                Sign In
            </Link>
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 px-6">
          <nav className="flex flex-col space-y-4">
            {renderMobileNavLinks()}
            <div className="flex space-x-4 pt-4 border-t">
              {user ? (
                <>
                  <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="flex-1 bg-deep-green text-white px-4 py-2 rounded-full hover:bg-opacity-90 transition-colors duration-300 text-sm">
                    Sign Out
                  </button>
                  {showCart && (
                    <Link to="/cart" onClick={() => setIsMenuOpen(false)} className="flex-1 text-center bg-sand-beige text-terracotta px-4 py-2 rounded-full hover:bg-opacity-90 transition-colors duration-300 text-sm">
                        Cart (3)
                    </Link>
                  )}
                </>
              ) : (
                 <Link to="/signin" onClick={() => setIsMenuOpen(false)} className="flex-1 text-center bg-terracotta text-white px-4 py-2 rounded-full hover:bg-opacity-90 transition-colors duration-300 text-sm">
                    Sign In
                 </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;