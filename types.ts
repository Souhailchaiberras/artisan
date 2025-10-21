import type { ReactNode } from "react";

export interface Artisan {
  id: string;
  name: string;
  region: string;
  story: string;
  avatarUrl: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
  artisan: Artisan;
  rating: number;
  reviews: number;
}

export enum ProductCategory {
  POTTERY = 'Pottery',
  LEATHER_GOODS = 'Leather Goods',
  TEXTILES = 'Textiles',
  JEWELRY = 'Jewelry',
  WOODWORK = 'Woodwork',
  LANTERNS = 'Lanterns'
}

export interface User {
  email: string;
  role: 'artisan' | 'client' | 'admin';
}
