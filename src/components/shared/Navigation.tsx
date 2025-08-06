import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  navigate: (page: string) => void;
  currentPage?: string;
  variant?: 'light' | 'dark';
}

export const MENU_ITEMS = [
  { id: 'home', name: 'ÚVOD' },
  { id: 'about', name: 'O ROUBENCE' },
  { id: 'gallery', name: 'GALERIE' },
  { id: 'aktivity', name: 'HYNČICE A OKOLÍ' },
  { id: 'cenik', name: 'CENÍK' },
  { id: 'recenze', name: 'RECENZE' },
  { id: 'kontakt', name: 'KONTAKTY' }
];

const Navigation: React.FC<NavigationProps> = ({ navigate, currentPage = 'home', variant = 'light' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isDark = variant === 'dark';

  return (
    <>
      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6 lg:gap-8">
        {MENU_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => navigate(item.id)}
            className={`text-sm font-light tracking-wide transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:transition-all after:duration-300 ${
              currentPage === item.id
                ? `${isDark ? 'text-white' : 'text-gray-900'} after:w-full ${isDark ? 'after:bg-white' : 'after:bg-gray-900'}`
                : `${isDark ? 'text-white/80 hover:text-white after:bg-white' : 'text-gray-600 hover:text-gray-900 after:bg-gray-900'} after:w-0 hover:after:w-full`
            }`}
          >
            {item.name}
          </button>
        ))}
        <button 
          onClick={() => navigate('booking')}
          className={`px-6 py-2 text-sm tracking-wide transition-all duration-300 rounded ${
            isDark 
              ? 'bg-white text-gray-900 hover:bg-gray-100' 
              : 'bg-gray-900 text-white hover:bg-gray-800'
          }`}
        >
          REZERVOVAT
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={`md:hidden p-2 rounded-lg transition-colors ${
          isDark ? 'hover:bg-white/20' : 'hover:bg-gray-100'
        }`}
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md shadow-lg z-40">
          <div className="p-6 space-y-4">
            {MENU_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  navigate(item.id);
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left py-2 text-lg font-light text-gray-900 hover:text-gray-600 transition-colors"
              >
                {item.name}
              </button>
            ))}
            <button 
              onClick={() => {
                navigate('booking');
                setIsMenuOpen(false);
              }}
              className="w-full mt-4 py-3 bg-gray-900 text-white tracking-wide hover:bg-gray-800 transition-all duration-300"
            >
              REZERVOVAT
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;