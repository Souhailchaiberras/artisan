import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { User } from '../types';
import { adminStats, pendingArtisans as initialPendingArtisans } from '../data/mockData';

const StatCard: React.FC<{ title: string; value: number; icon: React.ReactNode }> = ({ title, value, icon }) => (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 transition-transform duration-300 hover:-translate-y-1">
        <div className="bg-sand-beige/50 p-4 rounded-full text-terracotta">
            {icon}
        </div>
        <div>
            <p className="text-gray-600 text-sm font-medium">{title}</p>
            <p className="text-2xl font-bold text-deep-green">{value}</p>
        </div>
    </div>
);

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [pendingArtisans, setPendingArtisans] = useState(initialPendingArtisans);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser: User = JSON.parse(storedUser);
        if (parsedUser.role === 'admin') {
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

  const handleArtisanValidation = (artisanId: string, action: 'approve' | 'reject') => {
      const artisan = pendingArtisans.find(a => a.id === artisanId);
      // In a real app, you'd make an API call here.
      // For the mock, we just log and remove from the list.
      console.log(`Artisan "${artisan?.name}" action: ${action}.`);
      setPendingArtisans(currentArtisans => 
        currentArtisans.filter(a => a.id !== artisanId)
      );
  };

  if (!user) {
    return null; // Render nothing while redirecting
  }

  return (
    <div className="container mx-auto p-6 lg:p-12 bg-gray-50/50">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8 gap-4">
        <div>
            <h1 className="text-3xl font-bold text-deep-green font-montserrat">Tableau de bord administrateur</h1>
            <p className="text-gray-600 mt-1">Vue d'ensemble de la plateforme.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <StatCard 
            title="Artisans Actifs" 
            value={adminStats.artisans} 
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>} 
        />
        <StatCard 
            title="Clients Inscrits" 
            value={adminStats.clients} 
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
        />
        <StatCard 
            title="Ventes (ce mois)" 
            value={adminStats.ventes}
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
        />
      </div>

      {/* Pending Artisans Table */}
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-terracotta mb-6 border-b pb-4">Artisans en attente de validation</h2>
        
        <div className="overflow-x-auto">
            {pendingArtisans.length > 0 ? (
                <table className="w-full text-sm text-left text-gray-600">
                    <thead className="text-xs text-deep-green uppercase bg-sand-beige/40">
                        <tr>
                            <th scope="col" className="px-6 py-3 rounded-l-lg">Photo</th>
                            <th scope="col" className="px-6 py-3">Nom</th>
                            <th scope="col" className="px-6 py-3">Email</th>
                            <th scope="col" className="px-6 py-3">Spécialité</th>
                            <th scope="col" className="px-6 py-3">Ville</th>
                            <th scope="col" className="px-6 py-3">Date d'inscription</th>
                            <th scope="col" className="px-6 py-3 text-center rounded-r-lg">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pendingArtisans.map((artisan, index) => (
                            <tr key={artisan.id} className={`border-b ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'} hover:bg-sand-beige/30 transition-colors`}>
                                <td className="px-6 py-4">
                                    <img className="w-10 h-10 rounded-full object-cover" src={artisan.photoUrl} alt={artisan.name} />
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{artisan.name}</td>
                                <td className="px-6 py-4">{artisan.email}</td>
                                <td className="px-6 py-4">{artisan.specialty}</td>
                                <td className="px-6 py-4">{artisan.city}</td>
                                <td className="px-6 py-4">{artisan.registrationDate}</td>
                                <td className="px-6 py-4 text-center">
                                    <div className="flex justify-center items-center gap-2">
                                        <button 
                                            onClick={() => handleArtisanValidation(artisan.id, 'approve')}
                                            className="font-medium text-white bg-deep-green hover:bg-opacity-80 focus:ring-4 focus:ring-green-300 rounded-lg text-xs px-3 py-1.5 transition"
                                        >
                                            Valider
                                        </button>
                                        <button 
                                            onClick={() => handleArtisanValidation(artisan.id, 'reject')}
                                            className="font-medium text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 rounded-lg text-xs px-3 py-1.5 transition"
                                        >
                                            Refuser
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="text-center py-10">
                    <p className="text-gray-500">Aucun artisan en attente de validation.</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;