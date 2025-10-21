
import React from 'react';
import type { Product } from '../types';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative overflow-hidden">
          <img 
            src={product.imageUrl} 
            alt={product.name}
            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-0 right-0 bg-terracotta text-white text-sm font-semibold px-3 py-1 m-2 rounded-full">
            {product.category}
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-deep-green truncate group-hover:text-terracotta transition-colors">{product.name}</h3>
          <p className="text-sm text-gray-500 mb-2">by {product.artisan.name}</p>
          <div className="flex items-center justify-between">
            <p className="text-xl font-bold text-terracotta">${product.price.toFixed(2)}</p>
            <div className="flex items-center">
              <StarRating rating={product.rating} />
              <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
            </div>
          </div>
        </div>
      </Link>
      <div className="px-4 pb-4">
          <button className="w-full bg-deep-green text-white py-2 rounded-lg hover:bg-opacity-90 transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0">
            Add to Cart
          </button>
      </div>
    </div>
  );
};

export default ProductCard;
