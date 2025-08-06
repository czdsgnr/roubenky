import React, { useState } from 'react';
import { ArrowLeft, Star, Award, Users, Calendar, ArrowRight, ThumbsUp, Heart, CheckCircle } from 'lucide-react';
import { ImageWithFallback } from '../utils/ImageWithFallback';
import HomeNavigation from '../shared/HomeNavigation';

interface RecenzePageProps {
  navigate: (page: string) => void;
}

const RecenzePage: React.FC<RecenzePageProps> = ({ navigate }) => {
  const [activeFilter, setActiveFilter] = useState('vsechny');

  const reviews = [
    {
      id: 1,
      author: "Rodina Dvořákových",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&h=150&auto=format&fit=crop&crop=face",
      rating: 5,
      date: "Leden 2025",
      category: "rodina",
      title: "Naprosto dokonalá dovolená",
      text: "Roubenka překonala všechna naša očekávání. Vybavení je luxusní, wellness fantastické a personál úžasný. Děti si užily bazén a my rodiče saunu. Určitě se vrátíme a můžeme jen doporučit!",
      helpful: 23,
      verified: true
    },
    {
      id: 2,
      author: "StartUp tým z Prahy",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=150&h=150&auto=format&fit=crop&crop=face",
      rating: 5,
      date: "Prosinec 2024",
      category: "firemni",
      title: "Ideální místo pro firemní retreat",
      text: "Kombinace práce a relaxace v krásném prostředí. WiFi funguje perfektně, takže jsme mohli pracovat, a wellness centrum je skvělé pro večerní relaxaci. Catering byl výborný.",
      helpful: 18,
      verified: true
    },
    {
      id: 3,
      author: "Skupina přátel",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&h=150&auto=format&fit=crop&crop=face",
      rating: 5,
      date: "Únor 2024",
      category: "pratele",
      title: "Lyžování přímo od domu",
      text: "Fantastická poloha - ráno jsme vyšli z roubenky a za 2 minuty jsme byli na sjezdovce. Večer sauna a vířivka pod hvězdami. Obsluha velmi vstřícná, vše bylo perfektní.",
      helpful: 31,
      verified: true
    },
    {
      id: 4,
      author: "Manželé Novotní",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&h=150&auto=format&fit=crop&crop=face",
      rating: 5,
      date: "Listopad 2024",
      category: "par",
      title: "Romantický víkend",
      text: "Úžasný romantický pobyt. Soukromí celé roubenky jen pro nás dva, nádherné prostředí a luxusní wellness. Personál nás překvapil romantickou večeří. Nezapomenutelný zážitek!",
      helpful: 15,
      verified: true
    },
    {
      id: 5,
      author: "Firma TechSolutions",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=150&h=150&auto=format&fit=crop&crop=face",
      rating: 4,
      date: "Říjen 2024",
      category: "firemni",
      title: "Skvělé pro team building",
      text: "Využili jsme roubenku pro třídenní team building. Prostory jsou ideální pro workshopy, wellness pomohl s teamem bonding. Jediné mínus - trochu slabší mobilní signál, ale WiFi funguje skvěle.",
      helpful: 12,
      verified: true
    },
    {
      id: 6,
      author: "Rodina s dětmi",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=150&h=150&auto=format&fit=crop&crop=face",
      rating: 5,
      date: "Srpen 2024",
      category: "rodina",
      title: "Děti nadšené z bazénu",
      text: "Strávili jsme zde týden v létě. Děti byly nadšené z bazénu a my z krásné přírody kolem. Skvělé výlety, čistý vzduch a luxusní ubytování. Jedna z nejlepších dovolených!",
      helpful: 27,
      verified: true
    }
  ];

  const filteredReviews = activeFilter === 'vsechny' 
    ? reviews 
    : reviews.filter(review => review.category === activeFilter);

  const avgRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const totalReviews = reviews.length;

  const ratingDistribution = [
    { stars: 5, count: reviews.filter(r => r.rating === 5).length },
    { stars: 4, count: reviews.filter(r => r.rating === 4).length },
    { stars: 3, count: reviews.filter(r => r.rating === 3).length },
    { stars: 2, count: reviews.filter(r => r.rating === 2).length },
    { stars: 1, count: reviews.filter(r => r.rating === 1).length },
  ];

  return (
    <div className="min-h-screen bg-white">
      <HomeNavigation navigate={navigate} currentPage="recenze" variant="fixed" />

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-600 mb-6">
            <Award className="w-4 h-4" />
            <span className="font-light tracking-wide">HODNOCENÍ HOSTŮ</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-thin mb-6">
            Recenze našich
            <span className="block font-light">spokojených hostů</span>
          </h1>
          <p className="text-lg font-light text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Přečtěte si autentické recenze od hostů, kteří u nás již pobývali
          </p>
        </div>
      </section>

      {/* Rating Overview */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Overall Rating */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 p-8 rounded-2xl text-center">
                <div className="text-6xl font-thin mb-4 text-gray-900">{avgRating.toFixed(1)}</div>
                <div className="flex justify-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-lg font-light text-gray-600 mb-2">Celkové hodnocení</p>
                <p className="text-sm text-gray-500">Na základě {totalReviews} recenzí</p>
              </div>
            </div>

            {/* Rating Distribution */}
            <div className="lg:col-span-2">
              <h3 className="text-xl font-light mb-6">Rozložení hodnocení</h3>
              <div className="space-y-4">
                {ratingDistribution.map((item) => (
                  <div key={item.stars} className="flex items-center gap-4">
                    <div className="flex items-center gap-1 w-12">
                      <span className="text-sm">{item.stars}</span>
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-yellow-400 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(item.count / totalReviews) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-8">{item.count}</span>
                  </div>
                ))}
              </div>
              
              {/* Key Stats */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-light text-green-600 mb-1">98%</div>
                  <div className="text-sm text-gray-600">Doporučuje</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-light text-blue-600 mb-1">4.9</div>
                  <div className="text-sm text-gray-600">Čistota</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-light text-purple-600 mb-1">5.0</div>
                  <div className="text-sm text-gray-600">Lokalita</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-50 border-y border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { id: 'vsechny', name: 'Všechny recenze', icon: Users },
              { id: 'rodina', name: 'Rodiny s dětmi', icon: Heart },
              { id: 'firemni', name: 'Firemní pobyty', icon: Award },
              { id: 'pratele', name: 'Skupiny přátel', icon: Users },
              { id: 'par', name: 'Páry', icon: Heart }
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-light tracking-wide transition-all duration-300 ${
                  activeFilter === filter.id
                    ? 'bg-gray-900 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <filter.icon className="w-4 h-4" />
                {filter.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews List */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-8">
            {filteredReviews.map((review) => (
              <div key={review.id} className="bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start gap-6">
                  <ImageWithFallback
                    src={review.avatar}
                    alt={review.author}
                    className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-light">{review.author}</h3>
                          {review.verified && (
                            <div className="flex items-center gap-1 px-2 py-1 bg-green-100 rounded-full">
                              <CheckCircle className="w-3 h-3 text-green-600" />
                              <span className="text-xs text-green-700">Ověřený pobyt</span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                          <span>{review.date}</span>
                          <span>•</span>
                          <span className="capitalize">{review.category === 'rodina' ? 'Rodina s dětmi' : 
                                                       review.category === 'firemni' ? 'Firemní pobyt' : 
                                                       review.category === 'pratele' ? 'Skupina přátel' : 
                                                       'Pár'}</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-5 h-5 ${
                              i < review.rating 
                                ? 'fill-yellow-400 text-yellow-400' 
                                : 'text-gray-300'
                            }`} 
                          />
                        ))}
                      </div>
                    </div>
                    
                    <h4 className="text-xl font-light mb-3">{review.title}</h4>
                    <p className="text-gray-700 font-light leading-relaxed mb-4">{review.text}</p>
                    
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors">
                        <ThumbsUp className="w-4 h-4" />
                        Užitečné ({review.helpful})
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Certifications */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-thin mb-4">
              Ocenění a certifikace
            </h2>
            <p className="text-lg text-gray-600 font-light">
              Naše kvalita je uznávána
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Top Rated 2024",
                description: "Nejvyšší hodnocení na booking platformách",
                icon: "🏆"
              },
              {
                title: "Eco Friendly",
                description: "Certifikát pro udržitelný turismus",
                icon: "🌱"
              },
              {
                title: "Family Friendly",
                description: "Ideální pro rodiny s dětmi",
                icon: "👨‍👩‍👧‍👦"
              },
              {
                title: "Luxury Standard",
                description: "Potvrzený luxusní standard ubytování",
                icon: "💎"
              }
            ].map((award, i) => (
              <div key={i} className="text-center p-6 bg-white rounded-2xl shadow-lg">
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
            Staňte se dalším spokojeným hostem
          </h2>
          <p className="text-lg font-light text-white/90 mb-8">
            Rezervujte si pobyt a vytvořte si vlastní nezapomenutelné vzpomínky
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

export default RecenzePage;