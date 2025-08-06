import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Calendar, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../utils/ImageWithFallback';
import HomeNavigation from '../shared/HomeNavigation';

interface GalleryPageProps {
  navigate: (page: string) => void;
}

const GalleryPage: React.FC<GalleryPageProps> = ({ navigate }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const categories = [
    { id: 'all', name: 'Vše', count: 24 },
    { id: 'exterior', name: 'Exteriér', count: 6 },
    { id: 'interior', name: 'Interiér', count: 8 },
    { id: 'wellness', name: 'Wellness', count: 5 },
    { id: 'rooms', name: 'Pokoje', count: 5 }
  ];

  const allImages = [
    // Exterior images
    { id: 1, src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format&fit=crop", alt: "Roubenka v zimě", category: 'exterior' },
    { id: 2, src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1200&auto=format&fit=crop", alt: "Letní pohled", category: 'exterior' },
    { id: 3, src: "https://images.unsplash.com/photo-1520637836862-4d197d17c11a?q=80&w=1200&auto=format&fit=crop", alt: "Terasa s výhledem", category: 'exterior' },
    { id: 4, src: "https://images.unsplash.com/photo-1464207687429-7505649dae38?q=80&w=1200&auto=format&fit=crop", alt: "Horský výhled", category: 'exterior' },
    { id: 5, src: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=1200&auto=format&fit=crop", alt: "Parkování", category: 'exterior' },
    { id: 6, src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop", alt: "Venkovní grill", category: 'exterior' },
    
    // Interior images
    { id: 7, src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop", alt: "Obývací pokoj", category: 'interior' },
    { id: 8, src: "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?q=80&w=1200&auto=format&fit=crop", alt: "Kuchyň", category: 'interior' },
    { id: 9, src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200&auto=format&fit=crop", alt: "Jídelní stůl", category: 'interior' },
    { id: 10, src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=1200&auto=format&fit=crop", alt: "Společenská místnost", category: 'interior' },
    { id: 11, src: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=1200&auto=format&fit=crop", alt: "Krb", category: 'interior' },
    { id: 12, src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200&auto=format&fit=crop", alt: "Knihovna", category: 'interior' },
    { id: 13, src: "https://images.unsplash.com/photo-1558618047-71c0c3d54a28?q=80&w=1200&auto=format&fit=crop", alt: "Chodba", category: 'interior' },
    { id: 14, src: "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?q=80&w=1200&auto=format&fit=crop", alt: "Detail interiéru", category: 'interior' },
    
    // Wellness images
    { id: 15, src: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1200&auto=format&fit=crop", alt: "Bazén", category: 'wellness' },
    { id: 16, src: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1200&auto=format&fit=crop", alt: "Vířivka", category: 'wellness' },
    { id: 17, src: "https://images.unsplash.com/photo-1586105251261-72a756497a11?q=80&w=1200&auto=format&fit=crop", alt: "Sauna", category: 'wellness' },
    { id: 18, src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1200&auto=format&fit=crop", alt: "Relaxační zóna", category: 'wellness' },
    { id: 19, src: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=1200&auto=format&fit=crop", alt: "Wellness prostor", category: 'wellness' },
    
    // Room images
    { id: 20, src: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=1200&auto=format&fit=crop", alt: "Hlavní ložnice", category: 'rooms' },
    { id: 21, src: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1200&auto=format&fit=crop", alt: "Apartmán 1", category: 'rooms' },
    { id: 22, src: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=1200&auto=format&fit=crop", alt: "Koupelna", category: 'rooms' },
    { id: 23, src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=1200&auto=format&fit=crop", alt: "Dětský pokoj", category: 'rooms' },
    { id: 24, src: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?q=80&w=1200&auto=format&fit=crop", alt: "Apartmán 2", category: 'rooms' }
  ];

  const filteredImages = activeFilter === 'all' 
    ? allImages 
    : allImages.filter(img => img.category === activeFilter);

  const openLightbox = (src: string) => {
    setLightboxImage(src);
    setLightboxIndex(filteredImages.findIndex(img => img.src === src));
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  const navigateLightbox = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev' 
      ? (lightboxIndex - 1 + filteredImages.length) % filteredImages.length
      : (lightboxIndex + 1) % filteredImages.length;
    
    setLightboxIndex(newIndex);
    setLightboxImage(filteredImages[newIndex].src);
  };

  return (
    <div className="min-h-screen bg-white">
      <HomeNavigation navigate={navigate} currentPage="gallery" variant="fixed" />

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-thin mb-6">
            Fotogalerie
          </h1>
          <p className="text-lg font-light text-gray-600 leading-relaxed">
            Prohlédněte si luxusní interiéry, wellness centrum a krásné prostředí Králické Roubenky
          </p>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`px-6 py-3 rounded-full text-sm font-light tracking-wide transition-all duration-300 ${
                  activeFilter === category.id
                    ? 'bg-gray-900 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {filteredImages.map((image, index) => (
              <div 
                key={image.id}
                className={`relative overflow-hidden rounded-lg group cursor-pointer shadow-md hover:shadow-xl transition-all duration-500 ${
                  index % 7 === 0 ? 'md:col-span-2 md:row-span-2' : 
                  index % 5 === 0 ? 'md:row-span-2' : ''
                } aspect-square`}
                onClick={() => openLightbox(image.src)}
              >
                <ImageWithFallback 
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-white text-center">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-2">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <p className="text-sm font-light">{image.alt}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-thin mb-6">
            Líbí se vám, co vidíte?
          </h2>
          <p className="text-lg font-light text-white/90 mb-8">
            Rezervujte si pobyt a zažijte Králickou Roubenku na vlastní kůži
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('booking')}
              className="group px-8 py-4 bg-white text-gray-900 hover:bg-gray-100 transition-all duration-300 rounded-lg flex items-center justify-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              REZERVOVAT POBYT
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => navigate('cenik')}
              className="px-8 py-4 border border-white text-white hover:bg-white hover:text-gray-900 transition-all duration-300 rounded-lg"
            >
              ZOBRAZIT CENÍK
            </button>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImage && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>
          
          <button
            onClick={() => navigateLightbox('prev')}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={() => navigateLightbox('next')}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          
          <img
            src={lightboxImage}
            alt={filteredImages[lightboxIndex]?.alt}
            className="max-w-[90vw] max-h-[90vh] object-contain"
          />
          
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm">
            {lightboxIndex + 1} / {filteredImages.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;