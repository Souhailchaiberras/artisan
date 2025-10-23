
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-deep-green text-white">
      <div className="container mx-auto px-6 py-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold font-montserrat text-sand-beige mb-4">ArtisanaMaroc</h3>
            <p className="text-gray-300 leading-relaxed">
              Connecting you with the heart of Moroccan craftsmanship. Authentic, handmade products from talented local artisans.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-sand-beige mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-light-gold transition-colors">About Us</Link></li>
              <li><Link to="/products" className="hover:text-light-gold transition-colors">Shop All</Link></li>
              <li><a href="#" className="hover:text-light-gold transition-colors">Become an Artisan</a></li>
              <li><a href="#" className="hover:text-light-gold transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-sand-beige mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Email: support@artisan.com</li>
              <li>Phone: +212 5 00 00 00 00</li>
              <li>Marrakech, Morocco</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-sand-beige mb-4">Newsletter</h3>
            <p className="text-gray-300 mb-4">Subscribe for exclusive offers and stories from our artisans.</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="w-full rounded-l-md px-4 py-2 text-gray-800 focus:outline-none"
              />
              <button className="bg-terracotta text-white px-4 py-2 rounded-r-md hover:bg-opacity-90 transition-colors">
                Go
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-2 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center text-center">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} Artisana Maroc. All Rights Reserved.</p>
          <div className="flex space-x-2 mt-1 md:mt-0">
            {/* Social Icons Placeholder */}
            <a href="#" className="hover:text-light-gold transition-colors">FB</a>
            <a href="#" className="hover:text-light-gold transition-colors">IG</a>
            <a href="#" className="hover:text-light-gold transition-colors">PN</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
