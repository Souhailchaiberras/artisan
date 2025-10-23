import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/mockData';
import ProductCard from '../components/ProductCard';

const HomePage: React.FC = () => {
  const featuredProducts = products.slice(0, 4);
  
  const featuredArtisans = [
    {
      name: 'Fatima Zahra',
      specialty: 'Poterie',
      imageUrl: 'https://picsum.photos/seed/artisan1/200/200',
    },
    {
      name: 'Ahmed Bennis',
      specialty: 'Maroquinerie',
      imageUrl: 'https://picsum.photos/seed/artisan2/200/200',
    },
    {
      name: 'Laila Mansouri',
      specialty: 'Tissage',
      imageUrl: 'https://picsum.photos/seed/artisan3/200/200',
    },
    {
      name: 'Youssef Alami',
      specialty: 'Bijouterie',
      imageUrl: 'https://picsum.photos/seed/artisan4/200/200',
    },
    {
      name: 'Hassan Idrissi',
      specialty: 'Menuiserie',
      imageUrl: 'https://picsum.photos/seed/artisan5/200/200',
    },
    {
      name: 'Amina Tazi',
      specialty: 'Lanternes',
      imageUrl: 'https://picsum.photos/seed/artisan6/200/200',
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section 
        className="h-[calc(100vh-80px)] min-h-[500px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('https://i.pinimg.com/1200x/0e/53/6a/0e536a1525626dec94384cf97f4e64ee.jpg')" }}
      >
        <div className="container mx-auto px-6 text-center bg-black bg-opacity-40 p-10 rounded-lg">
          <h1 className="text-4xl md:text-6xl font-bold text-white font-montserrat leading-tight">
            The Soul of Moroccan Craft
          </h1>
          <p className="text-lg md:text-xl text-sand-beige mt-4 max-w-2xl mx-auto">
            Discover authentic, handcrafted treasures that tell a story.
          </p>
          <Link 
            to="/products"
            className="mt-8 inline-block bg-terracotta text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-opacity-90 transition-transform duration-300 hover:scale-105"
          >
            Explore Collection
          </Link>
        </div>
      </section>

      {/* Artisans Section */}
      <section className="py-16 bg-sand-beige/30">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-deep-green font-montserrat mb-2">Nos Artisans</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">Découvrez les artisans talentueux derrière nos créations authentiques.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6  mx-10">
            {featuredArtisans.map(artisan => (
              <Link to={`/products?artisan=${artisan.name}`} key={artisan.name} className="block p-4 bg-white rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center">
                <img 
                  src={artisan.imageUrl}
                  alt={`Portrait of ${artisan.name}`}
                  className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-sand-beige"
                />
                <h3 className="font-semibold text-deep-green text-md">{artisan.name}</h3>
                <p className="text-sm text-terracotta">{artisan.specialty}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-deep-green font-montserrat mb-2">Featured Products</h2>
          <p className="text-center text-gray-600 mb-10">Handpicked just for you.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mx-10">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link 
              to="/products" 
              className="bg-deep-green text-white font-semibold py-3 px-8 rounded-full hover:bg-opacity-90 transition-transform duration-300 hover:scale-105"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Artisan Story Section */}
      <section className="bg-deep-green text-white py-20">
        <div className="container mx-8 px-12 flex flex-col md:flex-row items-center gap-0">
          <div className="md:w-1/2">
            <img src="https://picsum.photos/seed/artisan-work/530/330" alt="Artisan working" className="rounded-lg shadow-lg" />
          </div>
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl font-bold text-sand-beige font-montserrat mb-4">Meet the Artisans</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              Each product in our store is a piece of a story, a testament to generations of skill passed down through families. We partner directly with master artisans across Morocco to bring you authentic, high-quality crafts while ensuring they receive fair compensation for their incredible work.
            </p>
            <Link 
              to="/about"
              className="bg-sand-beige text-deep-green font-bold py-2 px-8 rounded-full hover:bg-opacity-90 transition-transform duration-300 hover:scale-105"
            >
              Our Story
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;