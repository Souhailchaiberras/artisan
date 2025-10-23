import React, { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import { products as allProducts } from '../data/mockData';
import type { Product } from '../types';

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(allProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    location: 'all',  // ← AJOUTÉ ICI
    price: 500,
    rating: 0,
  });

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const filteredProducts = useMemo(() => {
    return allProducts
      .filter(product => {
        const matchesCategory = filters.category === 'all' || product.category === filters.category;
        const matchesLocation = filters.location === 'all' || product.location === filters.location; // ← CORRIGÉ
        const matchesPrice = product.price <= filters.price;
        const matchesRating = product.rating >= filters.rating;
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              product.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesLocation && matchesPrice && matchesRating && matchesSearch; // ← AJOUTÉ matchesLocation
      });
  }, [filters, searchTerm]);

  return (
    <div className="container mx-auto px-6 py-8">
      
      
      <div className="flex flex-col lg:flex-row gap-8 mx-2">
        {/* Filters */}
        <aside className="lg:w-1/4">
          <FilterSidebar filters={filters} onFilterChange={handleFilterChange} />
        </aside>

        {/* Products Grid */}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 mx-0">
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

export default ProductsPage;