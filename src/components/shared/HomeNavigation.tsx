import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface HomeNavigationProps {
  navigate: (page: string) => void;
  currentPage?: string;
  variant?: 'homepage' | 'fixed';
}

const HomeNavigation: React.FC<HomeNavigationProps> = ({ 
  navigate, 
  currentPage = 'home',
  variant = 'fixed'
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (variant === 'homepage') {
      const handleScroll = () => {
        setScrolled(window.scrollY > 50);
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    } else {
      setScrolled(true); // For subpages, always use scrolled style
    }
  }, [variant]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const menuItems = [
    { name: 'ÚVOD', action: () => navigate('home') },
    { name: 'O ROUBENCE', action: () => navigate('about') },
    { name: 'GALERIE', action: () => navigate('gallery') },
    { name: 'HYNČICE A OKOLÍ', action: () => navigate('aktivity') },
    { name: 'CENÍK', action: () => navigate('cenik') },
    { name: 'RECENZE', action: () => navigate('recenze') },
    { name: 'KONTAKTY', action: () => navigate('kontakt') }
  ];

  return (
    <nav className={`${variant === 'homepage' ? 'fixed' : 'sticky top-0'} w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg py-3 text-gray-900' 
        : 'bg-white/10 backdrop-blur-md py-4 text-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <button 
          onClick={() => navigate('home')}
          className="text-xl sm:text-2xl font-light tracking-wider hover:opacity-80 transition-opacity"
        >
          KRÁLICKÁ <span className="font-thin">ROUBENKA</span>
        </button>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 lg:gap-10">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={item.action}
              className={`text-sm font-light tracking-wide transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:transition-all after:duration-300 hover:after:w-full ${
                scrolled 
                  ? 'hover:text-gray-600 after:bg-gray-900' 
                  : 'hover:text-gray-200 after:bg-white'
              }`}
            >
              {item.name}
            </button>
          ))}
          <button 
            onClick={() => navigate('booking')}
            className={`px-6 lg:px-8 py-3 text-sm tracking-wide transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 ${
              scrolled 
                ? 'bg-gray-900 text-white hover:bg-gray-800' 
                : 'bg-white text-gray-900 hover:bg-gray-100'
            }`}
          >
            REZERVOVAT
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`md:hidden p-2 rounded-lg transition-colors ${
            scrolled ? 'hover:bg-gray-100' : 'hover:bg-white/20'
          }`}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm mobile-menu-enter">
          <div className="fixed inset-0 bg-white flex flex-col mobile-menu-content">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <div className="text-xl font-light tracking-wider text-gray-900">
                KRÁLICKÁ <span className="font-thin">ROUBENKA</span>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X size={24} className="text-gray-900" />
              </button>
            </div>
            
            {/* Menu Content */}
            <div className="flex-1 flex flex-col justify-center px-6 py-8">
              <div className="space-y-6">
                {menuItems.map((item, index) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      item.action();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left py-4 text-2xl font-light text-gray-900 hover:text-gray-600 transition-all duration-300 hover:translate-x-2 border-b border-gray-100 last:border-b-0"
                    style={{
                      animationDelay: `${index * 50}ms`
                    }}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
              
              <button 
                onClick={() => {
                  navigate('booking');
                  setIsMenuOpen(false);
                }}
                className="w-full mt-12 py-4 bg-gray-900 text-white text-lg tracking-wide hover:bg-gray-800 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                REZERVOVAT
              </button>
            </div>
            
            {/* Footer */}
            <div className="p-6 border-t border-gray-200 text-center text-sm text-gray-500">
              Luxusní horská roubenka
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default HomeNavigation;