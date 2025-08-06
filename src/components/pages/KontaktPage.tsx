import React, { useState } from 'react';
import { ArrowLeft, Phone, Mail, MapPin, Clock, Calendar, ArrowRight, Send, CheckCircle } from 'lucide-react';
import { ImageWithFallback } from '../utils/ImageWithFallback';
import HomeNavigation from '../shared/HomeNavigation';

interface KontaktPageProps {
  navigate: (page: string) => void;
}

const KontaktPage: React.FC<KontaktPageProps> = ({ navigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    subject: 'general'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      <HomeNavigation navigate={navigate} currentPage="kontakt" variant="fixed" />

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-600 mb-6">
            <Phone className="w-4 h-4" />
            <span className="font-light tracking-wide">KONTAKTUJTE NÁS</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-thin mb-6">
            Jsme tu pro vás
            <span className="block font-light">24 hodin denně</span>
          </h1>
          <p className="text-lg font-light text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Máte dotazy ohledně rezervace nebo pobytu? Rádi vám pomůžeme 
            s plánováním dokonalé dovolené.
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Contact Details */}
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-thin mb-8">
                Kontaktní informace
              </h2>
              
              <div className="space-y-8">
                {/* Phone */}
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-light mb-2">Telefon</h3>
                    <a 
                      href="tel:+420123456789" 
                      className="text-lg text-gray-900 hover:text-gray-600 transition-colors"
                    >
                      +420 123 456 789
                    </a>
                    <p className="text-sm text-gray-500 mt-1">Denně 8:00 - 20:00</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-light mb-2">Email</h3>
                    <a 
                      href="mailto:info@kralickaroubenka.cz" 
                      className="text-lg text-gray-900 hover:text-gray-600 transition-colors"
                    >
                      info@kralickaroubenka.cz
                    </a>
                    <p className="text-sm text-gray-500 mt-1">Odpověď do 24 hodin</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-light mb-2">Adresa</h3>
                    <address className="text-lg text-gray-900 not-italic">
                      Hynčice pod Sušinou<br />
                      Králický Sněžník<br />
                      561 69
                    </address>
                    <p className="text-sm text-gray-500 mt-1">GPS: 50.0833°N, 16.8333°E</p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-light mb-2">Provozní doba</h3>
                    <div className="text-lg text-gray-900">
                      <div>Check-in: 15:00 - 20:00</div>
                      <div>Check-out: do 10:00</div>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Pozdní příjezd po domluvě</p>
                  </div>
                </div>
              </div>

              {/* Quick Booking Button */}
              <div className="mt-12 p-6 bg-gray-50 rounded-2xl">
                <h3 className="text-xl font-light mb-4">Rychlá rezervace</h3>
                <p className="text-gray-600 font-light mb-4">
                  Máte vybraný termín? Rezervujte si pobyt online.
                </p>
                <button
                  onClick={() => navigate('booking')}
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white hover:bg-gray-800 transition-all duration-300 rounded-lg"
                >
                  <Calendar className="w-5 h-5" />
                  REZERVOVAT NYNÍ
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-50 p-8 lg:p-12 rounded-2xl">
              <h2 className="text-2xl sm:text-3xl font-thin mb-2">Napište nám</h2>
              <p className="text-gray-600 font-light mb-8">
                Vyplňte formulář a my se vám ozveme do 24 hodin
              </p>

              {isSubmitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-light mb-2">Zpráva odeslána!</h3>
                  <p className="text-gray-600 font-light">Děkujeme za vaši zprávu. Brzy se vám ozveme.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="subject" className="block text-sm font-light text-gray-700 mb-2">
                      Předmět
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                    >
                      <option value="general">Obecný dotaz</option>
                      <option value="booking">Rezervace</option>
                      <option value="pricing">Ceník a platby</option>
                      <option value="services">Dodatečné služby</option>
                      <option value="complaint">Stížnost</option>
                    </select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-light text-gray-700 mb-2">
                        Jméno a příjmení *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                        placeholder="Vaše jméno"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-light text-gray-700 mb-2">
                        Telefon
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                        placeholder="+420 123 456 789"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-light text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                      placeholder="vas@email.cz"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-light text-gray-700 mb-2">
                      Zpráva *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all resize-none"
                      placeholder="Popište váš dotaz nebo požadavek..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="group w-full flex items-center justify-center gap-2 px-6 py-4 bg-gray-900 text-white hover:bg-gray-800 transition-all duration-300 rounded-lg"
                  >
                    <Send className="w-5 h-5" />
                    ODESLAT ZPRÁVU
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-thin mb-4">
              Jak se k nám dostanete
            </h2>
            <p className="text-lg text-gray-600 font-light">
              Králická Roubenka se nachází v krásném prostředí Králického Sněžníku
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Map Placeholder */}
            <div className="aspect-[4/3] relative overflow-hidden rounded-2xl shadow-xl group cursor-pointer">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop"
                alt="Mapa lokace - Králický Sněžník"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <MapPin className="w-16 h-16 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <p className="text-xl font-light mb-2">Králická Roubenka</p>
                  <p className="text-white/90">Klikněte pro interaktivní mapu</p>
                </div>
              </div>
            </div>

            {/* Directions */}
            <div>
              <h3 className="text-2xl font-light mb-6">Navigace</h3>
              
              <div className="space-y-6">
                <div className="p-6 bg-white rounded-xl shadow-sm">
                  <h4 className="font-light text-lg mb-3">🚗 Autem z Prahy</h4>
                  <ol className="text-gray-600 font-light space-y-2 text-sm">
                    <li>1. Dálnice D1 směr Brno</li>
                    <li>2. D35 směr Hradec Králové</li>
                    <li>3. Silnice I/14 přes Letohrad</li>
                    <li>4. Králíky - Hynčice pod Sušinou</li>
                  </ol>
                  <p className="text-xs text-gray-500 mt-3">Celkem cca 2 hodiny (150 km)</p>
                </div>

                <div className="p-6 bg-white rounded-xl shadow-sm">
                  <h4 className="font-light text-lg mb-3">🚌 Veřejnou dopravou</h4>
                  <ol className="text-gray-600 font-light space-y-2 text-sm">
                    <li>1. Vlak z Prahy do Letohrad</li>
                    <li>2. Autobus Letohrad - Králíky</li>
                    <li>3. Místní autobus do Hynčic</li>
                  </ol>
                  <p className="text-xs text-gray-500 mt-3">Na přání zajistíme odvoz z Králík</p>
                </div>

                <div className="p-6 bg-white rounded-xl shadow-sm">
                  <h4 className="font-light text-lg mb-3">✈️ Letecky</h4>
                  <ul className="text-gray-600 font-light space-y-2 text-sm">
                    <li>• Nejbližší letiště: Pardubice (1,5 hod)</li>
                    <li>• Praha Ruzyně (2,5 hod autem)</li>
                    <li>• Transfer na objednávku</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-thin mb-4">
              Často kladené dotazy
            </h2>
            <p className="text-lg text-gray-600 font-light">
              Odpovědi na nejčastější otázky
            </p>
          </div>
          
          <div className="space-y-4">
            {[
              {
                q: "Jak probíhá check-in?",
                a: "Check-in probíhá od 15:00 do 20:00. Při příjezdu vás uvítá náš personál, předá klíče a provede po objektu. Pro pozdější příjezd se předem domluvte."
              },
              {
                q: "Je možné zrušit rezervaci?",
                a: "Ano, storno podmínky jsou: více než 30 dní předem (100% vrácení), 15-30 dní (50% vrácení), méně než 15 dní (bez vrácení)."
              },
              {
                q: "Kolik stojí parkování?",
                a: "Parkování je zdarma v ceně ubytování. K dispozici je soukromé parkoviště pro 8 vozů včetně nabíjecí stanice pro elektromobily."
              },
              {
                q: "Můžeme přivézt domácího mazlíčka?",
                a: "Ano, domácí mazlíčci jsou vítáni za poplatek 500 Kč/noc. Je nutné předem informovat při rezervaci."
              }
            ].map((item, i) => (
              <details key={i} className="group border-b border-gray-200 pb-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <summary className="flex justify-between items-center cursor-pointer list-none py-6 px-6 hover:bg-gray-50 rounded-xl transition-colors">
                  <span className="text-lg font-light">{item.q}</span>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-open:rotate-90 transition-transform duration-300" />
                </summary>
                <div className="px-6 pb-2">
                  <p className="text-gray-600 font-light leading-relaxed">{item.a}</p>
                </div>
              </details>
            ))}
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
            Kontaktujte nás nebo si rezervujte pobyt online
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('booking')}
              className="group px-8 py-4 bg-white text-gray-900 hover:bg-gray-100 transition-all duration-300 rounded-lg flex items-center justify-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              REZERVOVAT ONLINE
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="tel:+420123456789"
              className="px-8 py-4 border border-white text-white hover:bg-white hover:text-gray-900 transition-all duration-300 rounded-lg flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              ZAVOLAT NÁM
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default KontaktPage;