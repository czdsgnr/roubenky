// src/components/shared/Header.tsx
import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface HeaderProps {
  navigate: (page: string) => void;
  currentPage?: string;
  title?: string;
  showBackButton?: boolean;
  variant?: 'light' | 'dark';
}

const Header: React.FC<HeaderProps> = ({ 
  navigate, 
  currentPage, 
  title, 
  showBackButton = true,
  variant = 'light' 
}) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Levá strana - Zpět tlačítko */}
          <div className="flex items-center gap-4">
            {showBackButton && (
              <button
                onClick={() => navigate('home')}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors font-medium"
              >
                <ArrowLeft className="w-5 h-5" />
                Zpět
              </button>
            )}
          </div>
          
          {/* Střed - Logo/Název */}
          <div className="flex-1 flex justify-center">
            <button
              onClick={() => navigate('home')}
              className="text-xl font-light tracking-wider hover:opacity-80 transition-opacity"
            >
              KRÁLICKÁ <span className="font-thin">ROUBENKA</span>
            </button>
          </div>

          {/* Pravá strana - Rezervace nadpis */}
          <div className="flex items-center">
            {title && <h1 className="text-lg font-light text-gray-600">{title}</h1>}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;