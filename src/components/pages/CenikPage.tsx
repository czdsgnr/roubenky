import React from 'react';
import { Calendar, Check, Gem, Star, ArrowRight, Info, Users, Wifi, Car, Coffee, Clock, Shield, AlertCircle, Ban, CreditCard } from 'lucide-react';
import { ImageWithFallback } from '../utils/ImageWithFallback';
import HomeNavigation from '../shared/HomeNavigation';

interface CenikPageProps {
  navigate: (page: string) => void;
}

const CenikPage: React.FC<CenikPageProps> = ({ navigate }) => {
  return (
    <div className="min-h-screen bg-white">
      <HomeNavigation navigate={navigate} currentPage="cenik" variant="fixed" />

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-600 mb-6">
            <Gem className="w-4 h-4" />
            <span className="font-light tracking-wide">CENÍK UBYTOVÁNÍ</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-thin mb-6">
            Pronájem celé
            <span className="block font-light">roubenky</span>
          </h1>
          <p className="text-lg font-light text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Roubenku si můžete pronajmout výhradně jako celek. 
            Všechny ceny jsou uvedeny s DPH.
          </p>
        </div>
      </section>

      {/* Main Pricing */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-thin mb-4">
              Standardní ceník
            </h2>
            <p className="text-lg text-gray-600 font-light">
              Ceny za pronájem celé roubenky • Minimální pobyt 2 noci
            </p>
          </div>

          {/* Standard Pricing Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {[
              { nights: "2 noci", price: "23 000", perNight: "11 500" },
              { nights: "3 noci", price: "30 000", perNight: "10 000", popular: true },
              { nights: "4 noci", price: "36 000", perNight: "9 000" },
              { nights: "5 nocí", price: "43 000", perNight: "8 600" },
              { nights: "6 nocí", price: "49 000", perNight: "8 167" },
              { nights: "7 nocí", price: "55 000", perNight: "7 857" }
            ].map((plan, i) => (
              <div key={i} className={`bg-white p-6 lg:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border relative ${
                plan.popular 
                  ? 'border-gray-300 ring-2 ring-gray-200 scale-105' 
                  : 'border-gray-100 hover:-translate-y-1'
              }`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="bg-gray-900 text-white px-4 py-1 rounded-full text-xs tracking-wide">
                      NEJOBLÍBENĚJŠÍ
                    </div>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-light mb-2">{plan.nights}</h3>
                  <div className="text-4xl lg:text-5xl font-thin mb-2">{plan.price} <span className="text-lg text-gray-500">Kč</span></div>
                  <p className="text-sm text-gray-500">{plan.perNight} Kč za noc</p>
                </div>
                
                <div className="text-center">
                  <button 
                    onClick={() => navigate('booking')}
                    className={`w-full py-3 rounded-lg transition-all duration-300 group flex items-center justify-center gap-2 text-sm tracking-wide ${
                      plan.popular 
                        ? 'bg-gray-900 text-white hover:bg-gray-800 shadow-lg' 
                        : 'border border-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    VYBRAT TERMÍN
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Special Periods */}
          <div className="bg-gray-50 p-8 lg:p-12 rounded-2xl">
            <h3 className="text-2xl font-light mb-8 text-center">Speciální období</h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="text-center mb-4">
                  <div className="text-3xl mb-2">🎄</div>
                  <h4 className="text-xl font-light">Vánoce</h4>
                  <p className="text-sm text-gray-600">23. - 27. prosince</p>
                </div>
                <div className="text-center mb-4">
                  <div className="text-3xl font-thin mb-1">11 000 <span className="text-base text-gray-500">Kč</span></div>
                  <p className="text-sm text-gray-600">za noc</p>
                  <p className="text-xs text-gray-500 mt-2">Minimálně 4 noci</p>
                </div>
                <div className="text-center text-sm text-gray-600">
                  <strong>Celkem:</strong> 44 000 Kč
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border-2 border-yellow-200">
                <div className="text-center mb-4">
                  <div className="text-3xl mb-2">🎆</div>
                  <h4 className="text-xl font-light">Silvestr</h4>
                  <p className="text-sm text-gray-600">27. prosince - 1. ledna</p>
                </div>
                <div className="text-center mb-4">
                  <div className="text-3xl font-thin mb-1">65 000 <span className="text-base text-gray-500">Kč</span></div>
                  <p className="text-sm text-gray-600">za celé období</p>
                  <p className="text-xs text-gray-500 mt-2">5 nocí</p>
                </div>
                <div className="text-center text-sm text-gray-600">
                  <strong>13 000 Kč</strong> za noc
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="text-center mb-4">
                  <div className="text-3xl mb-2">🐰</div>
                  <h4 className="text-xl font-light">Velikonoce</h4>
                  <p className="text-sm text-gray-600">Velikonoční svátky</p>
                </div>
                <div className="text-center mb-4">
                  <div className="text-3xl font-thin mb-1">11 000 <span className="text-base text-gray-500">Kč</span></div>
                  <p className="text-sm text-gray-600">za noc</p>
                  <p className="text-xs text-gray-500 mt-2">Minimálně 4 noci</p>
                </div>
                <div className="text-center text-sm text-gray-600">
                  <strong>Celkem:</strong> 44 000 Kč
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seasonal Conditions */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-thin mb-4">
              Sezónní podmínky
            </h2>
            <p className="text-lg text-gray-600 font-light">
              Speciální pravidla pro různá období roku
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center gap-4 mb-6">
                <div className="text-4xl">❄️</div>
                <div>
                  <h3 className="text-2xl font-light">Zimní sezóna</h3>
                  <p className="text-gray-500">Leden, únor, březen</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <span className="font-light">Minimální pobyt: <strong>4 noci</strong></span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  <span className="font-light">Standardní ceník podle délky pobytu</span>
                </div>
                <div className="flex items-center gap-3">
                  <Info className="w-5 h-5 text-blue-500" />
                  <span className="font-light">Ideální pro lyžování a zimní sporty</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center gap-4 mb-6">
                <div className="text-4xl">☀️</div>
                <div>
                  <h3 className="text-2xl font-light">Letní sezóna</h3>
                  <p className="text-gray-500">Červenec, srpen</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-green-500" />
                  <span className="font-light">Pronájem pouze <strong>na celý týden</strong></span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-green-500" />
                  <span className="font-light">Sobota - sobota (7 nocí)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Gem className="w-5 h-5 text-green-500" />
                  <span className="font-light">Cena: <strong>55 000 Kč</strong> za týden</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-thin mb-4">
              Co je v ceně zahrnuto
            </h2>
            <p className="text-lg text-gray-600 font-light">
              Kompletní seznam služeb a vybavení
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: Users,
                title: "Wellness centrum",
                items: ["Sauna", "Celoročně vyhřívaný bazén", "Koupací sud (vířivka)"]
              },
              {
                icon: Wifi,
                title: "Energie a připojení",
                items: ["Elektrická energie", "WiFi připojení", "Spotřeba vody"]
              },
              {
                icon: Car,
                title: "Parkování",
                items: ["Parkování pro více vozů", "Zabezpečené parkoviště", "Zdarma"]
              },
              {
                icon: Coffee,
                title: "Vybavení",
                items: ["Povlečení", "Utěrky na nádobí (2ks)", "Sušák na obuv (10 párů)"]
              },
              {
                icon: Clock,
                title: "Spotřební materiál",
                items: ["Toaletní papír", "Tablety do myčky", "Pytle na odpadky"]
              },
              {
                icon: Shield,
                title: "Služby",
                items: ["Rekreační poplatek obci", "Spotřeba dřeva na topení", "Čistící prostředky"]
              }
            ].map((category, i) => (
              <div key={i} className="bg-gray-50 p-6 rounded-2xl">
                <category.icon className="w-10 h-10 text-gray-400 mb-4" />
                <h3 className="text-lg font-light mb-4">{category.title}</h3>
                <ul className="space-y-2">
                  {category.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Not Included */}
          <div className="bg-orange-50 border border-orange-200 p-6 rounded-2xl">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-orange-600 mt-1" />
              <div>
                <h3 className="font-light text-orange-900 mb-2">Pozor - není v ceně zahrnuto:</h3>
                <p className="text-sm text-orange-800">
                  <strong>Ručníky</strong> - prosíme, přivezte si vlastní ručníky nebo si je můžete zapůjčit za poplatek
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Terms */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-thin mb-4">
              Platební podmínky
            </h2>
            <p className="text-lg text-gray-600 font-light">
              Jak probíhá rezervace a platba
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-light mb-4">1. Rezervace</h3>
              <p className="text-gray-600 font-light mb-4">
                Rezervace je platná po uhrazení <strong>50% zálohy</strong> z ceny ubytování
              </p>
              <div className="text-sm text-gray-500">
                Do 7 dnů od potvrzení
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-light mb-4">2. Kauce</h3>
              <p className="text-gray-600 font-light mb-4">
                Před nástupem k pobytu je nutné zaplatit kauci <strong>5 000 Kč</strong>
              </p>
              <div className="text-sm text-gray-500">
                Vrácena po kontrole objektu
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CreditCard className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-light mb-4">3. Doplatek</h3>
              <p className="text-gray-600 font-light mb-4">
                Zbývajících <strong>50%</strong> uhradíte při příjezdu
              </p>
              <div className="text-sm text-gray-500">
                Hotově nebo kartou
              </div>
            </div>
          </div>
          
          <div className="mt-12 bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-xl font-light mb-6 text-center">Důležité informace</h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-medium mb-4">Platební metody:</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    Bankovní převod
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    Platební karta při příjezdu
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    Hotovost při příjezdu
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-4">DPH a faktury:</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <Info className="w-4 h-4 text-blue-600" />
                    Nejsme plátci DPH
                  </li>
                  <li className="flex items-center gap-2">
                    <Info className="w-4 h-4 text-blue-600" />
                    Všechny ceny jsou konečné
                  </li>
                  <li className="flex items-center gap-2">
                    <Info className="w-4 h-4 text-blue-600" />
                    Možnost vystavení faktury
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 p-8 rounded-2xl">
            <div className="flex items-start gap-4">
              <Ban className="w-8 h-8 text-red-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-light text-red-900 mb-4">Důležité upozornění</h3>
                <p className="text-red-800 font-light leading-relaxed">
                  <strong>Ubytování psů, koček a jiných zvířat je zakázáno.</strong><br />
                  Toto pravidlo platí bez výjimky pro celý objekt a jeho okolí. 
                  Děkujeme za pochopení a respektování tohoto nařízení.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-thin mb-6">
            Připraveni rezervovat?
          </h2>
          <p className="text-lg font-light text-white/90 mb-8">
            Vyberte si termín a začněte plánovat svůj pobyt
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('booking')}
              className="group px-8 py-4 bg-white text-gray-900 hover:bg-gray-100 transition-all duration-300 rounded-lg flex items-center justify-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              REZERVOVAT NYNÍ
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => navigate('kontakt')}
              className="px-8 py-4 border border-white text-white hover:bg-white hover:text-gray-900 transition-all duration-300 rounded-lg"
            >
              KONTAKTOVAT NÁS
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CenikPage;