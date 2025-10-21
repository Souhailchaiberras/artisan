
import React from 'react';
import { ProductCategory } from '../types';

interface FilterSidebarProps {
  filters: {
    category: string;
    price: number;
    rating: number;
  };
  onFilterChange: (filters: FilterSidebarProps['filters']) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, onFilterChange }) => {
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filters, category: e.target.value });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, price: Number(e.target.value) });
  };

  const handleRatingChange = (rating: number) => {
    onFilterChange({ ...filters, rating });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
      <h3 className="text-xl font-bold text-deep-green mb-6 border-b pb-3">Filters</h3>

      {/* Category Filter */}
      <div className="mb-6">
        <label htmlFor="category" className="block text-md font-semibold text-gray-700 mb-2">Category</label>
        <select
          id="category"
          value={filters.category}
          onChange={handleCategoryChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-terracotta"
        >
          <option value="all">All Categories</option>
          {Object.values(ProductCategory).map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Price Filter */}
      <div className="mb-6">
        <label htmlFor="price" className="block text-md font-semibold text-gray-700 mb-2">
          Max Price: <span className="font-bold text-terracotta">${filters.price}</span>
        </label>
        <input
          type="range"
          id="price"
          min="10"
          max="500"
          step="10"
          value={filters.price}
          onChange={handlePriceChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-terracotta"
        />
      </div>

      {/* Rating Filter */}
      <div>
        <h4 className="text-md font-semibold text-gray-700 mb-2">Rating</h4>
        <div className="flex space-x-2">
          {[4, 3, 2, 1].map(star => (
            <button
              key={star}
              onClick={() => handleRatingChange(star)}
              className={`px-3 py-1 border rounded-md transition-colors text-sm ${
                filters.rating === star
                  ? 'bg-terracotta text-white border-terracotta'
                  : 'bg-white text-gray-600 border-gray-300 hover:bg-sand-beige'
              }`}
            >
              {star}+ ★
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
