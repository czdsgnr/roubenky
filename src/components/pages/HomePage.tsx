import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  Users,
  Calendar,
  Phone,
  Mail,
  Star,
  Menu,
  X,
  Mountain,
  Play,
  ArrowRight,
  Clock,
  Shield,
  Gem,
  Check,
  Sparkles,
} from "lucide-react";
import { ImageWithFallback } from '../utils/ImageWithFallback';
import HomeNavigation from '../shared/HomeNavigation';
import FAQSection from "./FAQSection";
import ContactMapSection from "./ContactMapSection";

interface HomePageProps {
  navigate: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ navigate }) => {
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const heroImages = [
    "https://www.kralickaroubenka.cz/sites/kralickaroubenka/files/styles/banner/public/obrazky/banner/whatsappimage2021-11-28at2053242.jpeg?itok=0VJcVO79",
    "https://www.kralickaroubenka.cz/sites/kralickaroubenka/files/styles/banner/public/obrazky/banner/img0023.jpg?itok=Cs9tn_jl",
    "https://images.unsplash.com/photo-1520637836862-4d197d17c11a?q=80&w=2069&auto=format&fit=crop",
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <HomeNavigation
        navigate={navigate}
        currentPage="home"
        variant="homepage"
      />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          {heroImages.map((src, index) => (
            <ImageWithFallback
              key={index}
              src={src}
              alt={`Hero image ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                index === activeImage
                  ? "opacity-100"
                  : "opacity-0"
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50"></div>
        </div>

        <div className="relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white mb-6 hover:bg-white/30 transition-colors">
            <Mountain className="w-4 h-4" />
            <span className="font-light tracking-wide">
              KRÁLICKÝ SNĚŽNÍK
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-thin leading-tight mb-6 text-white">
            Luxusní soukromé wellness
            <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light">
              v srdci hor
            </span>
          </h1>

          <p className="text-lg sm:text-xl font-light text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Exkluzivní ubytování pro 14 hostů s privátním
            wellness centrem a celoročně vyhřívaným bazénem v
            srdci Krkonoš
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("booking")}
              className="group px-8 lg:px-10 py-4 bg-white text-gray-900 hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              Ověřit dostupnost
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => navigate("gallery")}
              className="group px-8 lg:px-10 py-4 border-2 border-white text-white hover:bg-white hover:text-gray-900 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5" />
              Prohlídka roubenky
            </button>
          </div>
        </div>

        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 cursor-pointer"
          onClick={() =>
            window.scrollTo({
              top: window.innerHeight,
              behavior: "smooth",
            })
          }
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm font-light">
              Objevte více
            </span>
            <ChevronDown className="w-6 h-6 animate-bounce" />
          </div>
        </div>

        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveImage(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === activeImage
                  ? "w-8 bg-white"
                  : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Představení */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-600 mb-6">
                <Sparkles className="w-4 h-4" />
                <span className="font-light tracking-wide">
                  LUXUSNÍ UBYTOVÁNÍ
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-thin mb-6 lg:mb-8">
                Dokonalé spojení
                <span className="block font-light">
                  tradice a luxusu
                </span>
              </h2>
              <p className="text-lg font-light text-gray-600 mb-8 lg:mb-12 leading-relaxed">
                Autentická horská roubenka v srdci přírody
                Králického Sněžníku nabízí jedinečnou kombinaci
                tradičního designu s nejmodernějším vybavením a
                službami na úrovni pětihvězdičkového hotelu.
              </p>

              <div className="grid grid-cols-2 gap-4 lg:gap-6 mb-8">
                {[
                  {
                    number: "14",
                    label: "Luxusních míst",
                    sublabel: "ve 4 apartmánech",
                    icon: Users,
                  },
                  {
                    number: "500",
                    label: "Metrů od sjezdovky",
                    sublabel: "ski in/ski out",
                    icon: Mountain,
                  },
                  {
                    number: "24/7",
                    label: "Concierge servis",
                    sublabel: "vždy k dispozici",
                    icon: Clock,
                  },
                  {
                    number: "100%",
                    label: "Soukromí",
                    sublabel: "celý objekt jen pro vás",
                    icon: Shield,
                  },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="group text-center p-4 lg:p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300 hover:shadow-md"
                  >
                    <stat.icon className="w-8 h-8 mx-auto mb-3 text-gray-400 group-hover:text-gray-600 transition-colors" />
                    <div className="text-3xl lg:text-4xl font-thin mb-2 text-gray-900">
                      {stat.number}
                    </div>
                    <div className="text-sm font-light text-gray-900">
                      {stat.label}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {stat.sublabel}
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => navigate("booking")}
                className="group inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white hover:bg-gray-800 transition-all duration-300 rounded-lg"
              >
                Rezervovat pobyt
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="order-1 lg:order-2 relative">
              <div className="aspect-square relative overflow-hidden rounded-2xl shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop"
                  alt="Luxusní interiér roubenky"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                <button
                  onClick={() => navigate("gallery")}
                  className="group absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 lg:w-20 lg:h-20 bg-white/90 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                >
                  <Play className="w-6 h-6 lg:w-8 lg:h-8 ml-1 text-gray-900 group-hover:scale-110 transition-transform" />
                </button>
              </div>

              <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-xl shadow-xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="font-light text-sm">
                      Dostupné
                    </div>
                    <div className="text-xs text-gray-500">
                      Tento víkend
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -left-4 bg-white p-4 rounded-xl shadow-xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Star className="w-5 h-5 text-yellow-600 fill-current" />
                  </div>
                  <div>
                    <div className="font-light text-sm">
                      4.9/5
                    </div>
                    <div className="text-xs text-gray-500">
                      127 recenzí
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Preview Cards */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-thin mb-4">
              Objevte naši roubenku
            </h2>
            <p className="text-lg text-gray-600 font-light">
              Vše, co potřebujete pro dokonalý pobyt
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Wellness & Spa",
                description:
                  "Privátní wellness centrum s bazénem, saunou a vířivkou",
                image:
                  "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=800&auto=format&fit=crop",
                action: () => navigate("about"),
              },
              {
                title: "Hynčice a okolí",
                description:
                  "Aktivity po celý rok - lyžování, turistika, cyklistika",
                image:
                  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop",
                action: () => navigate("aktivity"),
              },
              {
                title: "Fotogalerie",
                description:
                  "Prohlédněte si luxusní interiéry a krásné prostředí",
                image:
                  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800&auto=format&fit=crop",
                action: () => navigate("gallery"),
              },
              {
                title: "Transparentní ceník",
                description:
                  "Jasné ceny včetně všech poplatků a energií",
                image:
                  "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800&auto=format&fit=crop",
                action: () => navigate("cenik"),
              },
              {
                title: "Recenze hostů",
                description:
                  "Přečtěte si hodnocení našich spokojených hostů",
                image:
                  "https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=800&auto=format&fit=crop",
                action: () => navigate("recenze"),
              },
              {
                title: "Kontakt & Rezervace",
                description:
                  "Jsme tu pro vás 24/7. Rezervujte si svůj pobyt",
                image:
                  "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?q=80&w=800&auto=format&fit=crop",
                action: () => navigate("kontakt"),
              },
            ].map((card, i) => (
              <div
                key={i}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                onClick={card.action}
              >
                <div className="aspect-video relative overflow-hidden">
                  <ImageWithFallback
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-light mb-3 group-hover:text-gray-600 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 font-light leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 lg:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-600 mb-6">
              <Star className="w-4 h-4" />
              <span className="font-light tracking-wide">
                RECENZE HOSTŮ
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-thin mb-6">
              Hodnocení od hostů
            </h2>
            
            {/* Rating Display */}
            <div className="flex items-center justify-center gap-2 mb-8">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-2xl font-light ml-2">4.9</span>
              <span className="text-gray-600 font-light">z 1277 recenzí</span>
            </div>
          </div>

          {/* Featured Review */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-gray-50 rounded-2xl p-8 lg:p-12">
              <div className="flex gap-1 mb-6 justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              <blockquote className="text-lg lg:text-xl font-light text-gray-700 leading-relaxed text-center mb-8 italic">
                "Králická roubenka je úžasné místo pro ubytování přímo pod Králickým Sněžníkem. Už samotná stavba nás nadchla – krásný kombinet, perfektně čistá a nadstandardně vybavená. Všechno bylo připraveno do posledního detailu. Velice příjemným zážitkem, po dlouhém výletě, pro nás byl především vyhřívaný sud na zahradě a krásně zařízená sauna s výhledem na okolní přírodu. Ale celé okolí roubenky je úžasné – také zahrada s posezením, dětskou houpačkou a grilem nabízí spoustu možností k odpočinku a relaxaci."
              </blockquote>
              
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-light">
                  KM
                </div>
                <div className="text-center">
                  <div className="font-light text-gray-900">Klára Matoušková</div>
                  <div className="text-sm text-gray-500">16. října 2024</div>
                  <div className="flex items-center gap-1 mt-1 justify-center">
                    <div className="w-4 h-4 text-blue-600">G</div>
                    <span className="text-xs text-gray-500">Google recenze</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Review indicators */}
          <div className="flex justify-center gap-2 mb-8">
            <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <button
              onClick={() => navigate("recenze")}
              className="group inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white hover:bg-gray-800 transition-all duration-300 rounded-lg"
            >
              Více recenzí
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection navigate={navigate} />

      {/* Contact & Map Section */}
      <ContactMapSection navigate={navigate} />

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-950 text-gray-400 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm font-light">
              © 2025 Králická Roubenka. Všechna práva
              vyhrazena.
            </p>
            <div className="flex gap-6 text-sm">
              <a
                href="#"
                className="hover:text-white transition-colors"
              >
                Obchodní podmínky
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors"
              >
                GDPR
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors"
              >
                Storno podmínky
              </a>
              <button 
  onClick={() => navigate('admin')}
  className="fixed bottom-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg"
>
  Admin
</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;