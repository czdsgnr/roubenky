import React from 'react';
import { Mountain, Heart, Users, Award, Star, Calendar, ArrowRight, Home, Sparkles, Shield, Wifi, Car, Clock, TreePine, Droplets, Zap, Coffee, Utensils, Bath } from 'lucide-react';
import { ImageWithFallback } from '../utils/ImageWithFallback';
import HomeNavigation from '../shared/HomeNavigation';

interface AboutPageProps {
  navigate: (page: string) => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ navigate }) => {
  return (
    <div className="min-h-screen bg-white">
      <HomeNavigation navigate={navigate} currentPage="about" variant="fixed" />

      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop"
          alt="Králická Roubenka v zimním prostředí"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/50"></div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white mb-6">
            <Mountain className="w-4 h-4" />
            <span className="font-light tracking-wide">NAŠE PŘÍBĚH</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-thin leading-tight mb-6 text-white">
            Králická Roubenka
          </h1>
          
          <p className="text-lg sm:text-xl font-light text-white/90 max-w-2xl mx-auto leading-relaxed">
            Autentická horská roubenka, kde se tradice setkává s luxusem 
            v srdci Národní přírodní rezervace Králický Sněžník
          </p>
        </div>
      </section>

      {/* Main Story */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-600 mb-6">
                <Heart className="w-4 h-4" />
                <span className="font-light tracking-wide">NAŠE VIZE</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-thin mb-6">
                Místo pro
                <span className="block font-light">nezapomenutelné zážitky</span>
              </h2>
              
              <div className="space-y-6 text-lg font-light text-gray-700 leading-relaxed">
                <p>
                  Králická Roubenka vznikla z hluboké lásky k horám a touhy vytvořit místo, 
                  kde se naši hosté mohou plně odpojit od každodenního spěchu a znovu se spojit 
                  s přírodou i se svými nejbližšími.
                </p>
                
                <p>
                  Nachází se v jedinečné poloze v srdci Národní přírodní rezervace Králický Sněžník, 
                  pouhých 500 metrů od sjezdových tratí a v nadmořské výšce 1 425 metrů. 
                  Tato privilegovaná lokalita nabízí dechberoucí výhledy a přímý přístup 
                  k nejkrásnějším místům Orlických hor.
                </p>
                
                <p>
                  Naší filozofií je propojení autenticity tradičního horského stylu 
                  s moderním luxusem a komfortem. Každý detail byl pečlivě promyšlen 
                  tak, aby vytvořil harmonické prostředí pro dokonalý odpočinek.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-[4/3] relative overflow-hidden rounded-2xl shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop"
                  alt="Luxusní interiér Králické Roubenky"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl border border-gray-100 max-w-xs">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <TreePine className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="font-light text-sm">Eco-friendly</div>
                    <div className="text-xs text-gray-500">Udržitelný turismus</div>
                  </div>
                </div>
                <p className="text-xs text-gray-600 font-light">
                  Respektujeme přírodu a podporujeme lokální komunitu
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features & Amenities */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-thin mb-4">
              Vybavení roubenky
            </h2>
            <p className="text-lg text-gray-600 font-light">
              Každý detail pro váš komfort a pohodlí
            </p>
          </div>
          
          {/* Main Amenities Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Home,
                title: "Autentická architektura",
                description: "Tradiční horská roubenka z roku 1920, kompletně zrekonstruovaná v roce 2019 s respektem k původnímu charakteru.",
                details: ["Dřevěné trámy a prvky", "Kamenné základy", "Moderní izolace"]
              },
              {
                icon: Users,
                title: "Kapacita 14 osob",
                description: "Čtyři luxusní apartmány s vlastními koupelnami a možností připojení pro větší skupiny.",
                details: ["4 apartmány", "6 ložnic", "5 koupelen"]
              },
              {
                icon: Sparkles,
                title: "Privátní wellness",
                description: "Exkluzivní spa centrum pouze pro naše hosty s celoročním provozem.",
                details: ["Infinity bazén", "Finská sauna", "Venkovní vířivka"]
              },
              {
                icon: Wifi,
                title: "Moderní technologie",
                description: "Vysokorychlostní internet a smart home systémy pro maximální pohodlí.",
                details: ["100 Mbps WiFi", "Smart TV", "Klimatizace"]
              },
              {
                icon: Car,
                title: "Parkování a dobíjení",
                description: "Soukromé parkoviště s možností dobíjení elektromobilů.",
                details: ["8 parkovacích míst", "EV nabíječka", "Zabezpečené parkování"]
              },
              {
                icon: Utensils,
                title: "Gourmet kuchyně",
                description: "Plně vybavená kuchyně s prémikovými spotřebiči pro kulinářské zážitky.",
                details: ["Indukční varná deska", "Kombinovaná lednice", "Myčka nádobí"]
              }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <feature.icon className="w-12 h-12 text-gray-400 mb-6" />
                <h3 className="text-xl font-light mb-4">{feature.title}</h3>
                <p className="text-gray-600 font-light leading-relaxed mb-4">{feature.description}</p>
                <ul className="text-sm text-gray-500 space-y-1">
                  {feature.details.map((detail, j) => (
                    <li key={j} className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Detailed Amenities */}
          <div className="bg-white p-8 lg:p-12 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-light mb-8 text-center">Kompletní vybavení</h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <h4 className="font-medium mb-4 flex items-center gap-2">
                  <Bath className="w-5 h-5 text-gray-400" />
                  Wellness & Spa
                </h4>
                <ul className="text-sm text-gray-600 space-y-2 font-light">
                  <li>• Infinity bazén 4,5 x 2,5 m (34°C)</li>
                  <li>• Finská sauna pro 8 osob</li>
                  <li>• Venkovní vířivka pro 6 osob</li>
                  <li>• Relaxační zóna s lehátky</li>
                  <li>• Ručníky a župany</li>
                  <li>• Wellness kosmetika</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-4 flex items-center gap-2">
                  <Utensils className="w-5 h-5 text-gray-400" />
                  Kuchyně & Stravování
                </h4>
                <ul className="text-sm text-gray-600 space-y-2 font-light">
                  <li>• Indukční varná deska</li>
                  <li>• Kombinovaná trouba</li>
                  <li>• Myčka nádobí Bosch</li>
                  <li>• Kávovar Nespresso</li>
                  <li>• Kompletní nádobí pro 14 osob</li>
                  <li>• Venkovní grill Weber</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-gray-400" />
                  Technologie
                </h4>
                <ul className="text-sm text-gray-600 space-y-2 font-light">
                  <li>• WiFi 100 Mbps</li>
                  <li>• Smart TV 65" v každém apartmánu</li>
                  <li>• Netflix, HBO předplatné</li>
                  <li>• Klimatizace ve všech pokojích</li>
                  <li>• Bezpečnostní systém</li>
                  <li>• Mobilní signál booster</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-4 flex items-center gap-2">
                  <Coffee className="w-5 h-5 text-gray-400" />
                  Komfort & Služby
                </h4>
                <ul className="text-sm text-gray-600 space-y-2 font-light">
                  <li>• Pračka a sušička</li>
                  <li>• Žehlička a žehlicí prkno</li>
                  <li>• Fén v každé koupelně</li>
                  <li>• Ložní prádlo a ručníky</li>
                  <li>• Úklidový servis</li>
                  <li>• 24/7 concierge</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values & Philosophy */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-thin mb-4">
              Naše hodnoty
            </h2>
            <p className="text-lg text-gray-600 font-light">
              Principy, kterými se řídíme
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Soukromí a exkluzivita",
                description: "Věříme, že skutečný luxus spočívá v možnosti být sám se sebou a svými nejbližšími. Proto pronajímáme celou roubenku vždy pouze jedné skupině."
              },
              {
                icon: TreePine,
                title: "Respekt k přírodě",
                description: "Nacházíme se v chráněné krajinné oblasti a plně respektujeme její jedinečnost. Používáme ekologické materiály a podporujeme udržitelný turismus."
              },
              {
                icon: Heart,
                title: "Autenticita a tradice",
                description: "Ctíme historii našeho regionu a snažíme se zachovat genius loci místa. Moderní komfort propojujeme s tradičními materiály a řemeslnou prací."
              }
            ].map((value, i) => (
              <div key={i} className="text-center p-8 bg-gray-50 rounded-2xl">
                <value.icon className="w-16 h-16 mx-auto mb-6 text-gray-400" />
                <h3 className="text-xl font-light mb-4">{value.title}</h3>
                <p className="text-gray-600 font-light leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Info & Stats */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-thin mb-4">
              Technické údaje
            </h2>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {[
              { number: "2019", label: "Rok rekonstrukce", desc: "Kompletní modernizace" },
              { number: "320m²", label: "Užitná plocha", desc: "Na dvou podlažích" },
              { number: "1 425m", label: "Nadmořská výška", desc: "Výhledy do krajiny" },
              { number: "500m", label: "Vzdálenost od sjezdovky", desc: "Ski in/ski out" }
            ].map((stat, i) => (
              <div key={i} className="text-center p-6 bg-white rounded-xl shadow-lg">
                <div className="text-3xl lg:text-4xl font-thin mb-2 text-gray-900">{stat.number}</div>
                <div className="text-lg font-light text-gray-900 mb-2">{stat.label}</div>
                <div className="text-sm text-gray-500">{stat.desc}</div>
              </div>
            ))}
          </div>

          {/* Floor Plan Info */}
          <div className="bg-white p-8 lg:p-12 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-light mb-8 text-center">Dispozice roubenky</h3>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h4 className="text-xl font-light mb-6">Přízemí</h4>
                <ul className="space-y-3 text-gray-700 font-light">
                  <li className="flex justify-between">
                    <span>Obývací pokoj s krbem</span>
                    <span className="text-gray-500">45 m²</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Jídelna s kuchyní</span>
                    <span className="text-gray-500">35 m²</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Apartmán 1 (2 osoby)</span>
                    <span className="text-gray-500">25 m²</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Apartmán 2 (4 osoby)</span>
                    <span className="text-gray-500">40 m²</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Wellness centrum</span>
                    <span className="text-gray-500">60 m²</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Technická místnost</span>
                    <span className="text-gray-500">15 m²</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-xl font-light mb-6">Patro</h4>
                <ul className="space-y-3 text-gray-700 font-light">
                  <li className="flex justify-between">
                    <span>Apartmán 3 (4 osoby)</span>
                    <span className="text-gray-500">45 m²</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Apartmán 4 (4 osoby)</span>
                    <span className="text-gray-500">45 m²</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Společenská místnost</span>
                    <span className="text-gray-500">30 m²</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Balkon s výhledem</span>
                    <span className="text-gray-500">15 m²</span>
                  </li>
                </ul>
                
                <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                  <h5 className="font-medium mb-2">Celkem</h5>
                  <div className="flex justify-between text-lg font-light">
                    <span>Užitná plocha</span>
                    <span>320 m²</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full text-sm text-green-700 mb-6">
              <TreePine className="w-4 h-4" />
              <span className="font-light tracking-wide">UDRŽITELNOST</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-thin mb-4">
              Péče o životní prostředí
            </h2>
            <p className="text-lg text-gray-600 font-light">
              Naše závazky k ochraně přírody
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Droplets,
                title: "Vodní hospodářství",
                description: "Úsporné kohoutky, sběr dešťové vody pro zalévání, čistička odpadních vod."
              },
              {
                icon: Zap,
                title: "Obnovitelná energie",
                description: "Solární panely, tepelné čerpadlo, LED osvětlení s čidly pohybu."
              },
              {
                icon: TreePine,
                title: "Místní materiály",
                description: "Dřevo z certifikovaných zdrojů, přírodní kamень z regionu."
              },
              {
                icon: Heart,
                title: "Podpora komunity",
                description: "Spolupráce s místními dodavateli, zaměstnávání místních obyvatel."
              },
              {
                icon: Award,
                title: "Certifikace",
                description: "Eco-friendly certifikát, Green Key environmental award."
              },
              {
                icon: Mountain,
                title: "Ochrana krajiny",
                description: "Respekt k chráněnému území, minimalizace dopadu na přírodu."
              }
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-green-100 hover:shadow-lg transition-all duration-300">
                <item.icon className="w-10 h-10 text-green-600 mb-4" />
                <h3 className="text-lg font-light mb-3">{item.title}</h3>
                <p className="text-gray-600 font-light text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-thin mb-12">
            Ocenění a certifikace
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Top Rated 2024",
                description: "Nejvyšší hodnocení hostů na booking platformách",
                icon: "🏆"
              },
              {
                title: "Eco Friendly Certificate",
                description: "Certifikát pro udržitelný turismus",
                icon: "🌱"
              },
              {
                title: "Family Friendly Award",
                description: "Ideální pro rodiny s dětmi",
                icon: "👨‍👩‍👧‍👦"
              },
              {
                title: "Luxury Standard",
                description: "Potvrzený luxusní standard ubytování",
                icon: "💎"
              }
            ].map((award, i) => (
              <div key={i} className="p-6 bg-gray-50 rounded-xl">
                <div className="text-4xl mb-4">{award.icon}</div>
                <h3 className="text-lg font-light mb-2">{award.title}</h3>
                <p className="text-sm text-gray-600 font-light">{award.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-thin mb-6">
            Připraveni zažít Králickou Roubenku?
          </h2>
          <p className="text-lg font-light text-white/90 mb-8">
            Rezervujte si pobyt a staňte se součástí našeho příběhu
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
              onClick={() => navigate('gallery')}
              className="px-8 py-4 border border-white text-white hover:bg-white hover:text-gray-900 transition-all duration-300 rounded-lg"
            >
              PROHLÉDNOUT GALERII
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;