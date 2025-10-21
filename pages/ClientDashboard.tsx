import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import type { User, Product } from '../types';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import { products as allProducts } from '../data/mockData';

const ClientDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    price: 500,
    rating: 0,
  });

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser: User = JSON.parse(storedUser);
        // This page is primarily for clients, but other roles can see it too
        setUser(parsedUser);
      } else {
        navigate('/');
      }
    } catch(e) {
      localStorage.removeItem('user');
      navigate('/');
    }
  }, [navigate]);

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const filteredProducts = useMemo(() => {
    return allProducts
      .filter(product => {
        const matchesCategory = filters.category === 'all' || product.category === filters.category;
        const matchesPrice = product.price <= filters.price;
        const matchesRating = product.rating >= filters.rating;
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              product.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesPrice && matchesRating && matchesSearch;
      });
  }, [filters, searchTerm]);
  
  if (!user) {
    return null; // Render nothing while redirecting
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="bg-sand-beige p-8 rounded-lg mb-8 text-center">
          <h1 className="text-4xl font-bold text-terracotta font-montserrat">Bienvenue sur la boutique Artisana Maroc</h1>
          <p className="text-deep-green mt-2">Explore the rich tapestry of Moroccan craftsmanship.</p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-1/4">
          <FilterSidebar filters={filters} onFilterChange={handleFilterChange} />
        </aside>

        <main className="lg:w-3/4">
          <div className="mb-6">
            <input 
              type="text"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta"
            />
          </div>
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-gray-500">No products found matching your criteria.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ClientDashboard;