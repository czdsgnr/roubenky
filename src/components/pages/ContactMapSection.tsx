import React from 'react';
import { Phone, Mail, MapPin, Calendar, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../utils/ImageWithFallback';

interface ContactMapSectionProps {
  navigate: (page: string) => void;
}

const ContactMapSection: React.FC<ContactMapSectionProps> = ({ navigate }) => {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24 bg-gray-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left side - Content */}
          <div className="space-y-8">
            {/* Header */}
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-thin leading-tight mb-4">
                Připraveni na váš
                <span className="block font-light">nezapomenutelný pobyt?</span>
              </h2>
              <p className="text-lg font-light text-white/90 leading-relaxed">
                Rezervujte si luxusní horský retreat už dnes
              </p>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              {/* Phone */}
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white/70 font-light text-sm mb-1">
                    Volejte denně 8.00 - 17.00
                  </p>
                  <a href="tel:+420777777777" className="text-xl font-normal text-white hover:text-white/80 transition-colors">
                    +420 777 777 777
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white/70 font-light text-sm mb-1">
                    Odpovíme do 24 hodin
                  </p>
                  <a href="mailto:info@kralickaroubenka.cz" className="text-xl font-normal text-white hover:text-white/80 transition-colors">
                    info@kralickaroubenka.cz
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white/70 font-light text-sm mb-1">
                    Hynčice pod Sušinou
                  </p>
                  <p className="text-xl font-normal text-white">
                    Kralický Sněžník, 561 69
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <button
                onClick={() => navigate('booking')}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 hover:bg-gray-100 transition-all duration-300 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105"
              >
                <Calendar className="w-5 h-5" />
                <span className="font-normal text-lg">Rezervovat nyní</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right side - Map */}
          <div className="relative">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?q=80&w=1000&auto=format&fit=crop"
                alt="Mapa lokace Králické Roubenky"
                className="w-full h-full object-cover"
              />
              
              {/* Map Overlay */}
              <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-[2px]"></div>
              
              {/* Location Pin & Info */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                {/* Large Pin Icon */}
                <div className="w-12 h-12 mx-auto mb-6 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <MapPin className="w-7 h-7 text-gray-900 fill-current" />
                </div>
                
                {/* Location Info */}
                <div className="text-white">
                  <h3 className="text-2xl font-light mb-2">Kralická Roubenka</h3>
                  <p className="text-lg font-light text-white/90">
                    Klikněte pro interaktivní mapu
                  </p>
                </div>
              </div>

              {/* Clickable overlay for map */}
              <button 
                className="absolute inset-0 w-full h-full hover:bg-white/5 transition-colors duration-300"
                onClick={() => window.open('https://maps.google.com/?q=Kralický+Sněžník', '_blank')}
                aria-label="Otevřít mapu v novém okně"
              >
              </button>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactMapSection;