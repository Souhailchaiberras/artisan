import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import SignInPage from './pages/SignInPage';
import ArtisanDashboard from './pages/ArtisanDashboard';
import ClientDashboard from './pages/ClientDashboard';
import AdminDashboard from './pages/AdminDashboard';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';


const ProductDetailPage: React.FC = () => <div className="text-center p-12">Product Detail Page (Placeholder)</div>;
const CartPage: React.FC = () => <div className="text-center p-12">Shopping Cart Page (Placeholder)</div>;
const AboutPage: React.FC = () => <div className="text-center p-12">About Us Page (Placeholder)</div>;

// Layout for pages that require Header and Footer
const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
    <Header />
    <main className="flex-grow">
      {children}
    </main>
    <Footer />
    
  </div>
);

const App: React.FC = () => {
  return (
    <HashRouter>
        <Routes>
          {/* Public Routes with MainLayout */}
          <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
          <Route path="/products" element={<MainLayout><ProductsPage /></MainLayout>} />
          <Route path="/about" element={<MainLayout><AboutPage /></MainLayout>} />
          
          {/* Standalone Sign-In Page */}
          <Route path="/signin" element={<SignInPage />} />

          {/* Authenticated Routes with MainLayout */}
          <Route path="/artisan" element={<MainLayout><ArtisanDashboard /></MainLayout>} />
          <Route path="/client" element={<MainLayout><ClientDashboard /></MainLayout>} />
          <Route path="/admin" element={<MainLayout><AdminDashboard /></MainLayout>} />
          
          {/* Other pages that need the main layout */}
          <Route path="/products/:id" element={<MainLayout><ProductDetailPage /></MainLayout>} />
          <Route path="/cart" element={<MainLayout><CartPage /></MainLayout>} />

          {/* Fallback route could redirect to root or a 404 page */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    </HashRouter>
  );
};

export default App;