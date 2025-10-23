import type { Product, Artisan } from '../types';
import { ProductCategory } from '../types';

const artisans: Artisan[] = [
  {
    id: 'artisan-1',
    name: 'Fatima Al Fassi',
    region: 'Fes',
    story: 'Fatima inherited the art of pottery from her grandmother, blending traditional Fassi blue with modern designs.',
    avatarUrl: 'https://picsum.photos/seed/fatima/100/100',
  },
  {
    id: 'artisan-2',
    name: 'Ahmed Marrakchi',
    region: 'Marrakech',
    story: 'Ahmed is a master leatherworker from the bustling souks of Marrakech, known for his durable and stylish babouches.',
    avatarUrl: 'https://picsum.photos/seed/ahmed/100/100',
  },
  {
    id: 'artisan-3',
    name: 'Amina Tafilalt',
    region: 'Atlas Mountains',
    story: 'Amina weaves beautiful Berber carpets, each telling a unique story of her tribe and the Atlas landscapes.',
    avatarUrl: 'https://picsum.photos/seed/amina/100/100',
  },
  {
    id: 'artisan-4',
    name: 'Youssef Essaouira',
    region: 'Essaouira',
    story: 'Youssef carves intricate designs from fragrant Thuya wood, a craft unique to the coastal city of Essaouira.',
    avatarUrl: 'https://picsum.photos/seed/youssef/100/100',
  },
];

export const products: Product[] = [
  {
    id: 'prod-1',
    name: 'Fassi Blue Ceramic Vase',
    location: 'Tanger',
    description: 'A hand-painted ceramic vase featuring the iconic deep blue patterns of Fes. Perfect for adding a touch of Moroccan elegance to any room.',
    price: 75.00,
    imageUrl: 'https://picsum.photos/seed/vase/400/400',
    category: ProductCategory.POTTERY,
    stock: 15,
    artisan: artisans[0],
    rating: 4.8,
    reviews: 120,
  },
  {
    id: 'prod-2',
    name: 'Marrakchi Leather Babouches',
    location: 'Tanger',
    description: 'Authentic leather slippers, handcrafted in Marrakech. Soft, comfortable, and durable for indoor wear.',
    price: 45.50,
    imageUrl: 'https://picsum.photos/seed/slippers/400/400',
    category: ProductCategory.LEATHER_GOODS,
    stock: 40,
    artisan: artisans[1],
    rating: 4.9,
    reviews: 250,
  },
  {
    id: 'prod-3',
    name: 'Berber Wool Rug',
    location: 'Tanger',
    description: 'A plush, hand-woven wool rug with traditional Berber motifs. This unique piece brings warmth and history to your home.',
    price: 350.00,
    imageUrl: 'https://picsum.photos/seed/rug/400/400',
    category: ProductCategory.TEXTILES,
    stock: 5,
    artisan: artisans[2],
    rating: 5.0,
    reviews: 45,
  },
  {
    id: 'prod-4',
    name: 'Thuya Wood Jewelry Box',
    location: 'Tanger',
    description: 'An exquisitely carved box made from aromatic Thuya wood burl, ideal for storing precious jewelry.',
    price: 90.00,
    imageUrl: 'https://picsum.photos/seed/box/400/400',
    category: ProductCategory.WOODWORK,
    stock: 22,
    artisan: artisans[3],
    rating: 4.7,
    reviews: 98,
  },
  {
    id: 'prod-5',
    name: 'Hand-hammered Brass Lantern',
    location: 'Tanger',
    description: 'Create a magical ambiance with this intricate brass lantern. It casts beautiful patterns of light when lit.',
    price: 120.00,
    imageUrl: 'https://picsum.photos/seed/lantern/400/400',
    category: ProductCategory.LANTERNS,
    stock: 12,
    artisan: artisans[1],
    rating: 4.9,
    reviews: 150,
  },
  {
    id: 'prod-6',
    name: 'Tamegroute Green Pottery Bowl',
    location: 'Tanger',
    description: 'A rustic and unique bowl from the Tamegroute village, known for its distinctive green glaze.',
    price: 55.00,
    imageUrl: 'https://picsum.photos/seed/bowl/400/400',
    category: ProductCategory.POTTERY,
    stock: 30,
    artisan: artisans[0],
    rating: 4.6,
    reviews: 75,
  },
  {
    id: 'prod-7',
    name: 'Silver Hamsa Necklace',
    location: 'Tanger',
    description: 'A delicate silver necklace featuring the Hand of Fatima (Hamsa), a symbol of protection.',
    price: 85.00,
    imageUrl: 'https://picsum.photos/seed/necklace/400/400',
    category: ProductCategory.JEWELRY,
    stock: 25,
    artisan: artisans[3],
    rating: 4.8,
    reviews: 112,
  },
  {
    id: 'prod-8',
    name: 'Handwoven Sabra Silk Scarf',
    location: 'Casablanca',
    description: 'A vibrant and soft scarf made from cactus silk (Sabra). Its colors shimmer and change in the light.',
    price: 60.00,
    imageUrl: 'https://picsum.photos/seed/scarf/400/400',
    category: ProductCategory.TEXTILES,
    stock: 50,
    artisan: artisans[2],
    rating: 4.9,
    reviews: 180,
  },
];

// Mock data for Artisan Dashboard
export const artisanProducts = [
  { id: 1, name: "Tajine traditionnel", price: 450, stock: 12 },
  { id: 2, name: "Sac en cuir artisanal", price: 850, stock: 5 },
  { id: 3, name: "Tapis berbère authentique", price: 1200, stock: 8 },
];

// Mock data for Admin Dashboard
export const pendingArtisans = [
    { 
      id: 'art-101', 
      name: 'Fatima Zahra', 
      email: 'fatima.z@example.com',
      specialty: 'Poterie', 
      city: 'Fès',
      registrationDate: '2023-10-26',
      photoUrl: 'https://i.pinimg.com/736x/63/84/06/6384062fa6f8562ad9f5578773e88987.jpg'
    },
    { 
      id: 'art-102', 
      name: 'Ahmed Bennis', 
      email: 'ahmed.bennis@example.com',
      specialty: 'Maroquinerie',
      city: 'Marrakech',
      registrationDate: '2023-10-24',
      photoUrl: 'https://i.pinimg.com/1200x/67/25/69/672569deec33c2c514fdc9b1bd4ba883.jpg'
    },
    { 
      id: 'art-103', 
      name: 'Khadija Alami',
      email: 'khadija.a@example.com',
      specialty: 'Tissage',
      city: 'Casablanca',
      registrationDate: '2023-10-22',
      photoUrl: 'https://picsum.photos/seed/person3/100/100'
    },
];

export const adminStats = {
    artisans: 12,
    clients: 58,
    ventes: 240,
};