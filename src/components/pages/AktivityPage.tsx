import React, { useState } from 'react';
import { ArrowLeft, Mountain, Bike, Camera, TreePine, Snowflake, Sun, MapPin, Calendar, ArrowRight, Users, Car, Clock, Star } from 'lucide-react';
import { ImageWithFallback } from '../utils/ImageWithFallback';
import HomeNavigation from '../shared/HomeNavigation';

interface AktivityPageProps {
  navigate: (page: string) => void;
}

const AktivityPage: React.FC<AktivityPageProps> = ({ navigate }) => {
  const [activeSeason, setActiveSeason] = useState('zima');

  return (
    <div className="min-h-screen bg-white">
      <HomeNavigation navigate={navigate} currentPage="aktivity" variant="fixed" />

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop"
          alt="Králický Sněžník"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/50"></div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white mb-6">
            <Mountain className="w-4 h-4" />
            <span className="font-light tracking-wide">KRÁLICKÝ SNĚŽNÍK</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-thin leading-tight mb-6 text-white">
            Hynčice a okolí
          </h1>
          
          <p className="text-lg sm:text-xl font-light text-white/90 max-w-2xl mx-auto leading-relaxed">
            Objevte nekonečné možnosti aktivního odpočinku v srdci Králického Sněžníku
          </p>
        </div>
      </section>

      {/* Location Info */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-600 mb-6">
                <MapPin className="w-4 h-4" />
                <span className="font-light tracking-wide">LOKACE</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-thin mb-6">
                Ideální poloha pro
                <span className="block font-light">aktivní dovolenou</span>
              </h2>
              
              <p className="text-lg font-light text-gray-600 mb-8 leading-relaxed">
                Naše roubenka se nachází v malé obci Hynčice pod Sušinou, v samém srdci 
                Národní přírodní rezervace Králický Sněžník. Tato unikátní poloha vám 
                umožňuje okamžitý přístup k nejkrásnějším místům regionu.
              </p>
              
              <div className="space-y-4">
                {[
                  { distance: "500 m", destination: "Skiareál Kraličák", time: "5 min pěšky" },
                  { distance: "2 km", destination: "Vrchol Králického Sněžníku", time: "45 min pěšky" },
                  { distance: "15 km", destination: "Mladkov - aquapark", time: "20 min autem" },
                  { distance: "120 km", destination: "Praha", time: "2 hodiny autem" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-16 text-center">
                      <div className="text-lg font-light text-gray-900">{item.distance}</div>
                    </div>
                    <div className="flex-1">
                      <div className="font-light text-gray-900">{item.destination}</div>
                      <div className="text-sm text-gray-500">{item.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-[4/3] relative overflow-hidden rounded-2xl shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2080&auto=format&fit=crop"
                  alt="Mapa okolí"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-light">1 425 m n. m.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seasonal Activities */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-thin mb-6">
              Aktivity po celý rok
            </h2>
            <p className="text-lg text-gray-600 font-light mb-8">
              Každé roční období má své kouzlo
            </p>
            
            {/* Season Toggle */}
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setActiveSeason('zima')}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-light tracking-wide transition-all duration-300 ${
                  activeSeason === 'zima'
                    ? 'bg-gray-900 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Snowflake className="w-4 h-4" />
                Zima
              </button>
              <button
                onClick={() => setActiveSeason('leto')}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-light tracking-wide transition-all duration-300 ${
                  activeSeason === 'leto'
                    ? 'bg-gray-900 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Sun className="w-4 h-4" />
                Léto
              </button>
            </div>
          </div>
          
          {/* Winter Activities */}
          {activeSeason === 'zima' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Sjezdové lyžování",
                  description: "Skiareál Kraličák přímo u roubenky",
                  details: "6 sjezdovek, 4 vleky, večerní lyžování",
                  icon: "🎿",
                  image: "https://images.unsplash.com/photo-1551524164-687a55dd1126?q=80&w=800&auto=format&fit=crop"
                },
                {
                  title: "Běžecké lyžování",
                  description: "22 km upravených tras",
                  details: "Klasický i volný styl, osvětlené úseky",
                  icon: "⛷️",
                  image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=800&auto=format&fit=crop"
                },
                {
                  title: "Skialpinismus",
                  description: "Nedotčená příroda",
                  details: "Značené i volné trasy různých obtížností",
                  icon: "🏔️",
                  image: "https://images.unsplash.com/photo-1551524164-d5b8ec3c7e05?q=80&w=800&auto=format&fit=crop"
                },
                {
                  title: "Snowpark",
                  description: "Pro freestyle nadšence",
                  details: "Jumpy, rails, halfpipe",
                  icon: "🏂",
                  image: "https://images.unsplash.com/photo-1551524164-6ca04ac833fb?q=80&w=800&auto=format&fit=crop"
                },
                {
                  title: "Sněžnice",
                  description: "Turistika v zimní krajině",
                  details: "Půjčovna přímo v roubenee",
                  icon: "👟",
                  image: "https://images.unsplash.com/photo-1578761499019-d71bb5d0cdeb?q=80&w=800&auto=format&fit=crop"
                },
                {
                  title: "Wellness po lyžování",
                  description: "Sauna a vířivka",
                  details: "Dokonalé uvolnění po aktivním dni",
                  icon: "🧘",
                  image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=800&auto=format&fit=crop"
                }
              ].map((activity, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                  <div className="aspect-video relative overflow-hidden">
                    <ImageWithFallback
                      src={activity.image}
                      alt={activity.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 text-3xl bg-white/90 rounded-lg p-2">
                      {activity.icon}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-light mb-2">{activity.title}</h3>
                    <p className="text-gray-600 font-light mb-3">{activity.description}</p>
                    <p className="text-sm text-gray-500">{activity.details}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Summer Activities */}
          {activeSeason === 'leto' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Horská turistika",
                  description: "Stovky kilometrů značených tras",
                  details: "Vrchol Králického Sněžníku, vodopády, vyhlídky",
                  icon: "🥾",
                  image: "https://images.unsplash.com/photo-1464207687429-7505649dae38?q=80&w=800&auto=format&fit=crop"
                },
                {
                  title: "Cykloturistika",
                  description: "MTB trails a silniční cyklistika",
                  details: "22 km značených MTB tras, e-bike půjčovna",
                  icon: "🚵",
                  image: "https://images.unsplash.com/photo-1544191696-15693072b57c?q=80&w=800&auto=format&fit=crop"
                },
                {
                  title: "Paragliding",
                  description: "Lety z vrcholu Sněžníku",
                  details: "Tandemové lety s instruktorem",
                  icon: "🪂",
                  image: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?q=80&w=800&auto=format&fit=crop"
                },
                {
                  title: "Horolezectví",
                  description: "Přírodní skály",
                  details: "Různé obtížnosti, kurzy s instruktorem",
                  icon: "🧗",
                  image: "https://images.unsplash.com/photo-1522163182402-834f871fd851?q=80&w=800&auto=format&fit=crop"
                },
                {
                  title: "Koupání",
                  description: "Aquapark Mladkov",
                  details: "15 minut autem, tobogány, wellness",
                  icon: "🏊",
                  image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=800&auto=format&fit=crop"
                },
                {
                  title: "Fotografování",
                  description: "Nádherná příroda",
                  details: "Východy a západy slunce, divoká zvěř",
                  icon: "📸",
                  image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop"
                }
              ].map((activity, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                  <div className="aspect-video relative overflow-hidden">
                    <ImageWithFallback
                      src={activity.image}
                      alt={activity.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 text-3xl bg-white/90 rounded-lg p-2">
                      {activity.icon}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-light mb-2">{activity.title}</h3>
                    <p className="text-gray-600 font-light mb-3">{activity.description}</p>
                    <p className="text-sm text-gray-500">{activity.details}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Services */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-thin mb-4">
              Naše služby
            </h2>
            <p className="text-lg text-gray-600 font-light">
              Vše pro váš pohodlný pobyt
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Půjčovna vybavení",
                description: "Lyže, snowboard, e-bike, sněžnice",
                icon: Bike
              },
              {
                title: "Ski servis",
                description: "Broušení, voskování, servis vybavení",
                icon: Star
              },
              {
                title: "Transfers",
                description: "Odvoz na sjezdovky a traily",
                icon: Car
              },
              {
                title: "Průvodcovské služby",
                description: "Místní průvodci pro turistiku",
                icon: Users
              }
            ].map((service, i) => (
              <div key={i} className="text-center p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all duration-300">
                <service.icon className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-light mb-3">{service.title}</h3>
                <p className="text-gray-600 font-light text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Weather & Best Times */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-thin mb-4">
              Kdy navštívit
            </h2>
            <p className="text-lg text-gray-600 font-light">
              Každé roční období má své kouzlo
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center gap-4 mb-6">
                <div className="text-4xl">❄️</div>
                <div>
                  <h3 className="text-2xl font-light">Zimní sezóna</h3>
                  <p className="text-gray-500">Prosinec - Březen</p>
                </div>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span className="font-light">Nejlepší sněhové podmínky: Leden - Únor</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mountain className="w-4 h-4 text-blue-500" />
                  <span className="font-light">Průměrná výška sněhu: 80-120 cm</span>
                </li>
                <li className="flex items-center gap-3">
                  <Snowflake className="w-4 h-4 text-blue-500" />
                  <span className="font-light">Teploty: -5°C až -15°C</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center gap-4 mb-6">
                <div className="text-4xl">☀️</div>
                <div>
                  <h3 className="text-2xl font-light">Letní sezóna</h3>
                  <p className="text-gray-500">Květen - Říjen</p>
                </div>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <Sun className="w-4 h-4 text-green-500" />
                  <span className="font-light">Nejlepší počasí: Červen - Září</span>
                </li>
                <li className="flex items-center gap-3">
                  <TreePine className="w-4 h-4 text-green-500" />
                  <span className="font-light">Ideální pro turistiku a cyklistiku</span>
                </li>
                <li className="flex items-center gap-3">
                  <Camera className="w-4 h-4 text-green-500" />
                  <span className="font-light">Teploty: 15°C až 25°C</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-thin mb-6">
            Připraveni na dobrodružství?
          </h2>
          <p className="text-lg font-light text-white/90 mb-8">
            Rezervujte si pobyt a zažijte Králický Sněžník na vlastní kůži
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

export default AktivityPage;