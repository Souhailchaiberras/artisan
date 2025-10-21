import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { User } from '../types';
import { artisanProducts } from '../data/mockData';

const ArtisanDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser: User = JSON.parse(storedUser);
        if (parsedUser.role === 'artisan') {
          setUser(parsedUser);
        } else {
          navigate(`/${parsedUser.role || ''}`);
        }
      } else {
        navigate('/');
      }
    } catch(e) {
      localStorage.removeItem('user');
      navigate('/');
    }
  }, [navigate]);

  if (!user) {
    return null; // Render nothing while redirecting
  }

  return (
    <div className="container mx-auto p-6 lg:p-12">
      <div className="flex justify-between items-center mb-8">
        <div>
            <h1 className="text-3xl font-bold text-deep-green font-montserrat">Bienvenue dans votre espace artisan</h1>
            <p className="text-gray-600 mt-1">Gérez vos produits et consultez vos ventes.</p>
        </div>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-2xl font-semibold text-terracotta">Mes Produits</h2>
          <button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-deep-green text-white font-semibold py-2 px-5 rounded-lg hover:bg-opacity-90 transition-transform hover:scale-105"
          >
            {showAddForm ? 'Fermer' : 'Ajouter un produit'}
          </button>
        </div>

        {/* Add Product Form */}
        {showAddForm && (
            <div className="bg-sand-beige/30 p-6 rounded-lg mb-6 border border-sand-beige">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                     <input type="text" placeholder="Nom du produit" className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-terracotta" />
                     <input type="number" placeholder="Prix (MAD)" className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-terracotta" />
                     <input type="number" placeholder="Stock" className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-terracotta" />
                 </div>
                 <button className="mt-4 bg-terracotta text-white font-semibold py-2 px-5 rounded-lg hover:bg-opacity-90">
                    Confirmer l'ajout
                 </button>
            </div>
        )}

        {/* Products List */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="text-xs text-deep-green uppercase bg-sand-beige/40">
              <tr>
                <th scope="col" className="px-6 py-3 rounded-l-lg">Produit</th>
                <th scope="col" className="px-6 py-3">Prix</th>
                <th scope="col" className="px-6 py-3">Stock</th>
                <th scope="col" className="px-6 py-3 text-center rounded-r-lg">Actions</th>
              </tr>
            </thead>
            <tbody>
              {artisanProducts.map((product, index) => (
                <tr key={product.id} className={`border-b ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'} hover:bg-sand-beige/30 transition-colors`}>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{product.name}</td>
                  <td className="px-6 py-4">{product.price} MAD</td>
                  <td className="px-6 py-4">{product.stock} unités</td>
                  <td className="px-6 py-4">
                      <div className="flex justify-center items-center gap-4">
                        <button className="font-medium text-deep-green hover:underline">Modifier</button>
                        <button className="font-medium text-red-600 hover:underline">Supprimer</button>
                      </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ArtisanDashboard;