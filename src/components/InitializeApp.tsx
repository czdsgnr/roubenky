// src/components/InitializeApp.tsx
import React, { useEffect, useState } from 'react';
import { initializeWebsiteContent } from '../firebase/initializeContent';

interface InitializeAppProps {
  children: React.ReactNode;
}

const InitializeApp: React.FC<InitializeAppProps> = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initialize = async () => {
      try {
        console.log('🔄 Inicializace aplikace...');
        const success = await initializeWebsiteContent();
        
        if (success) {
          setIsInitialized(true);
          console.log('✅ Aplikace inicializována');
          // Krátké zpoždění pro zajištění, že Firebase data jsou dostupná
          setTimeout(() => {
            setIsInitializing(false);
          }, 1000);
        } else {
          throw new Error('Inicializace se nezdařila');
        }
      } catch (err) {
        console.error('❌ Chyba při inicializaci:', err);
        setError('Chyba při inicializaci databáze');
        setIsInitializing(false);
      }
    };

    initialize();
  }, []);

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Inicializace aplikace...</p>
          <p className="mt-2 text-sm text-gray-500">Nastavování databáze a obsahu</p>
          {isInitialized && (
            <p className="mt-2 text-sm text-green-600">✅ Databáze připravena, načítání...</p>
          )}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Chyba inicializace</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-y-3">
            <button
              onClick={() => window.location.reload()}
              className="block w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Zkusit znovu
            </button>
            <button
              onClick={() => {
                setError(null);
                setIsInitializing(false);
              }}
              className="block w-full px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Pokračovat bez inicializace
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default InitializeApp;