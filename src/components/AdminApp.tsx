// src/components/AdminApp.tsx
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../firebase/firebase.config';
import AdminLogin from './AdminLogin';
import AdminPanel from './AdminPanel';

const AdminApp: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('Auth state changed:', user?.email || 'No user');
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLoginSuccess = (user: User) => {
    console.log('Login successful:', user.email);
    setUser(user);
  };

  const handleLogout = () => {
    console.log('Logged out');
    setUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Načítání...</p>
        </div>
      </div>
    );
  }

  // Kontrola, že je přihlášený správný admin
  if (!user || user.email !== 'admin@kralickaroubenka.cz') {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
  }

  return <AdminPanel user={user} onLogout={handleLogout} />;
};

export default AdminApp;