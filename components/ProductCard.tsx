import React from 'react';
import type { Product } from '../types';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="min-w-[250px] bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_6px_16px_rgba(0,0,0,0.15)] flex flex-col" style={{ fontFamily: "'Raleway', sans-serif" }}>
      <Link to={`/products/${product.id}`} className="block flex-grow flex flex-col">
        <div className="h-[160px] relative overflow-hidden">
          <img 
            src={product.imageUrl} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2.5 bg-[#D2691E] text-white text-xs font-medium px-2.5 py-1 rounded shadow-[0_2px_4px_rgba(0,0,0,0.2)]">
            {product.category}
          </div>
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <p className="text-[0.7rem] text-[#6c6c6c] mb-[0.6rem]">by {product.artisan.name}</p>
          
          <h3 className="text-[1rem] my-[0.3rem] text-[#333] font-medium leading-normal" style={{ fontFamily: "RalewayX, sans-serif" }}>{product.name}</h3>
          
          <p className="text-[0.7rem] text-[#666] my-[0.13rem]">{product.location || 'Location'}</p>
          
          <div className="flex items-center justify-between mt-auto">
            <p className="text-[0.7rem] text-[#666] my-[0.13rem]">Prix moyen : {product.price.toFixed(0)} MAD</p>
            <div className="flex items-center">
              <span className="text-sm font-bold text-[#142a0f]">{product.rating}</span>
              <StarRating rating={product.rating} />
            </div>
          </div>
        </div>
      </Link>
      <div className="px-4 pb-4 flex gap-2.5">
        <button className="flex-1 bg-[#174100] text-white py-2 px-3 rounded-md text-[0.7rem] font-bold cursor-pointer transition-all duration-300 border border-transparent hover:bg-white hover:text-[#174100] hover:-translate-y-0.5 hover:border-[#142a0f] hover:shadow-[0_2px_6px_rgba(20,42,15,0.2)]">
          View Details
        </button>
        <button className="flex-1 bg-transparent text-[#174100] py-2 px-3 rounded-md text-[0.7rem] font-bold cursor-pointer transition-all duration-300 border border-[#174100] hover:bg-[#174100] hover:text-white hover:-translate-y-0.5 hover:shadow-[0_2px_6px_rgba(20,42,15,0.2)]">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;