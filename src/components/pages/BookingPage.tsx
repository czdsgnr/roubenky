import React, { useState } from 'react';
import { Calendar, Users, Check, AlertCircle, Info, Star, Gem, X, FileText, Shield } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';
import Header from '../shared/Header';
import AvailabilityCalendar from './AvailabilityCalendar';

interface BookingPageProps {
  navigate: (page: string) => void;
}

const BookingPage: React.FC<BookingPageProps> = ({ navigate }) => {
  const [step, setStep] = useState(1);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    totalPrice: 0
  });

  const calculatePrice = () => {
    if (!bookingData.checkIn || !bookingData.checkOut) return 0;
    
    const start = new Date(bookingData.checkIn);
    const end = new Date(bookingData.checkOut);
    const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    
    // Price calculation based on real pricing from ceník
    if (nights === 2) return 23000;
    if (nights === 3) return 30000;
    if (nights === 4) return 36000;
    if (nights === 5) return 43000;
    if (nights === 6) return 49000;
    if (nights === 7) return 55000;
    
    // For longer stays, use 7-day rate as base
    const weeks = Math.floor(nights / 7);
    const extraDays = nights % 7;
    let totalPrice = weeks * 55000;
    
    // Add price for extra days
    if (extraDays > 0) {
      const extraPrices = [0, 11500, 23000, 30000, 36000, 43000, 49000];
      totalPrice += extraPrices[extraDays] || extraDays * 9000;
    }
    
    return totalPrice;
  };

  const handleDateSelect = (date: string, type: 'checkin' | 'checkout') => {
    if (type === 'checkin') {
      setBookingData(prev => ({ ...prev, checkIn: date, checkOut: '' }));
    } else {
      setBookingData(prev => ({ ...prev, checkOut: date }));
    }
  };

  const handleSubmit = () => {
    if (!termsAccepted) {
      setShowTermsModal(true);
      return;
    }
    
    alert('Rezervace byla úspěšně odeslána! Brzy vás budeme kontaktovat pro potvrzení a platební informace.');
    navigate('home');
  };

  const handleTermsAccept = () => {
    setTermsAccepted(true);
    setShowTermsModal(false);
    handleSubmit();
  };

  const isStepValid = (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        return bookingData.checkIn && bookingData.checkOut && bookingData.guests;
      case 2:
        return bookingData.firstName && bookingData.lastName && bookingData.email && bookingData.phone;
      default:
        return true;
    }
  };

  const totalPrice = calculatePrice();
  const nights = bookingData.checkIn && bookingData.checkOut 
    ? Math.ceil((new Date(bookingData.checkOut).getTime() - new Date(bookingData.checkIn).getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header navigate={navigate} currentPage="booking" title="Rezervace" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            {/* Enhanced Progress Steps */}
            <div className="mb-8">
              <div className="flex items-center justify-between relative">
                {/* Progress Line */}
                <div className="absolute top-5 left-5 right-5 h-0.5 bg-gray-200 -z-10">
                  <div 
                    className="h-full bg-gray-900 transition-all duration-500 ease-out"
                    style={{ width: `${((step - 1) / 2) * 100}%` }}
                  />
                </div>

                {[1, 2, 3].map((stepNumber) => (
                  <div key={stepNumber} className="flex flex-col items-center relative">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                      step >= stepNumber 
                        ? 'bg-gray-900 text-white shadow-lg' 
                        : 'bg-white text-gray-600 border-2 border-gray-200'
                    }`}>
                      {step > stepNumber ? <Check className="w-5 h-5" /> : stepNumber}
                    </div>
                    <div className={`mt-2 text-sm font-light transition-colors duration-300 ${
                      step >= stepNumber ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {stepNumber === 1 && 'Termín & hosté'}
                      {stepNumber === 2 && 'Kontaktní údaje'}  
                      {stepNumber === 3 && 'Potvrzení'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 1: Date & Guests with Calendar */}
            {step === 1 && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Vyberte termín pobytu
                    </CardTitle>
                    <CardDescription>
                      Klikněte na datum příjezdu a odjezdu v kalendáři
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AvailabilityCalendar
                      selectedCheckIn={bookingData.checkIn}
                      selectedCheckOut={bookingData.checkOut}
                      onDateSelect={handleDateSelect}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Počet hostů
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="guests">Počet hostů (max. 14)</Label>
                        <Select value={bookingData.guests} onValueChange={(value) => setBookingData(prev => ({ ...prev, guests: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Vyberte počet hostů" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 14 }, (_, i) => (
                              <SelectItem key={i + 1} value={(i + 1).toString()}>
                                {i + 1} {i + 1 === 1 ? 'host' : i + 1 < 5 ? 'hosté' : 'hostů'}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {bookingData.checkIn && bookingData.checkOut && (
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="p-4 bg-gray-50 rounded-lg">
                            <div className="text-sm text-gray-600">Příjezd</div>
                            <div className="font-medium">
                              {new Date(bookingData.checkIn).toLocaleDateString('cs-CZ', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </div>
                          </div>
                          <div className="p-4 bg-gray-50 rounded-lg">
                            <div className="text-sm text-gray-600">Odjezd</div>
                            <div className="font-medium">
                              {new Date(bookingData.checkOut).toLocaleDateString('cs-CZ', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </div>
                          </div>
                        </div>
                      )}

                      {nights > 0 && (
                        <Alert>
                          <Info className="h-4 w-4" />
                          <AlertDescription>
                            Pobyt na {nights} {nights === 1 ? 'noc' : nights < 5 ? 'noci' : 'nocí'} • 
                            Celý objekt pouze pro vaši skupinu • 
                            Cena: {totalPrice.toLocaleString()} Kč
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Step 2: Contact Details */}
            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Kontaktní údaje
                  </CardTitle>
                  <CardDescription>
                    Potřebujeme vaše údaje pro potvrzení rezervace
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Jméno *</Label>
                      <Input
                        id="firstName"
                        value={bookingData.firstName}
                        onChange={(e) => setBookingData(prev => ({ ...prev, firstName: e.target.value }))}
                        placeholder="Vaše jméno"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Příjmení *</Label>
                      <Input
                        id="lastName"
                        value={bookingData.lastName}
                        onChange={(e) => setBookingData(prev => ({ ...prev, lastName: e.target.value }))}
                        placeholder="Vaše příjmení"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={bookingData.email}
                      onChange={(e) => setBookingData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="vas@email.cz"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefon *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={bookingData.phone}
                      onChange={(e) => setBookingData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="+420 123 456 789"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="company">Firma (volitelné)</Label>
                    <Input
                      id="company"
                      value={bookingData.company}
                      onChange={(e) => setBookingData(prev => ({ ...prev, company: e.target.value }))}
                      placeholder="Název firmy"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Zpráva (volitelné)</Label>
                    <Textarea
                      id="message"
                      value={bookingData.message}
                      onChange={(e) => setBookingData(prev => ({ ...prev, message: e.target.value }))}
                      placeholder="Speciální požadavky, přání nebo dotazy..."
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Confirmation */}
            {step === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Check className="w-5 h-5" />
                    Potvrzení rezervace
                  </CardTitle>
                  <CardDescription>
                    Zkontrolujte údaje před odesláním rezervace
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                    <h3 className="font-medium">Detaily pobytu</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Příjezd:</span>
                        <div className="font-medium">{new Date(bookingData.checkIn).toLocaleDateString('cs-CZ')}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Odjezd:</span>
                        <div className="font-medium">{new Date(bookingData.checkOut).toLocaleDateString('cs-CZ')}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Počet nocí:</span>
                        <div className="font-medium">{nights}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Počet hostů:</span>
                        <div className="font-medium">{bookingData.guests}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                    <h3 className="font-medium">Kontaktní údaje</h3>
                    <div className="text-sm space-y-2">
                      <div>{bookingData.firstName} {bookingData.lastName}</div>
                      <div>{bookingData.email}</div>
                      <div>{bookingData.phone}</div>
                      {bookingData.company && <div>{bookingData.company}</div>}
                    </div>
                  </div>

                  {bookingData.message && (
                    <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                      <h3 className="font-medium">Vaše zpráva</h3>
                      <p className="text-sm text-gray-700">{bookingData.message}</p>
                    </div>
                  )}
                  
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Po odeslání rezervace vás budeme kontaktovat do 24 hodin pro potvrzení 
                      a domluvení platebních podmínek. Před odesláním si prosím přečtěte ubytovací řád.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            )}

            {/* Enhanced Navigation Buttons */}
            <div className="flex justify-between items-center mt-8 p-6 bg-white rounded-lg border border-gray-200">
              <Button
                variant="outline"
                onClick={() => setStep(Math.max(1, step - 1))}
                disabled={step === 1}
                className="px-6"
              >
                ← Zpět
              </Button>
              
              <div className="text-sm text-gray-500">
                Krok {step} z 3
              </div>
              
              <Button
                onClick={() => {
                  if (step === 3) {
                    handleSubmit();
                  } else {
                    setStep(step + 1);
                  }
                }}
                disabled={!isStepValid(step)}
                className="bg-gray-900 hover:bg-gray-800 px-6"
              >
                {step === 3 ? 'Odeslat rezervaci' : 'Pokračovat →'}
              </Button>
            </div>
          </div>

          {/* Sidebar - Price Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gem className="w-5 h-5" />
                    Shrnutí rezervace
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="aspect-video relative overflow-hidden rounded-lg">
                    <img
                      src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=600&auto=format&fit=crop"
                      alt="Králická Roubenka"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Králická Roubenka</h3>
                    <div className="flex items-center gap-1 text-sm text-gray-600 mb-4">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>4.9 • Luxusní horská roubenka</span>
                    </div>
                  </div>
                  
                  {totalPrice > 0 && (
                    <>
                      <div className="border-t pt-6 space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>Ubytování ({nights} {nights === 1 ? 'noc' : nights < 5 ? 'noci' : 'nocí'})</span>
                          <span>{totalPrice.toLocaleString()} Kč</span>
                        </div>
                        
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>Veškeré poplatky a energie</span>
                          <span>Zahrnuto</span>
                        </div>
                        
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>Wellness centrum</span>
                          <span>Zahrnuto</span>
                        </div>
                      </div>
                      
                      <div className="border-t pt-4">
                        <div className="flex justify-between font-medium text-lg">
                          <span>Celková cena</span>
                          <span>{totalPrice.toLocaleString()} Kč</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">
                          Záloha 50%: {(totalPrice * 0.5).toLocaleString()} Kč<br />
                          Doplatek při příjezdu: {(totalPrice * 0.5).toLocaleString()} Kč<br />
                          Kauce: 5 000 Kč
                        </p>
                      </div>
                    </>
                  )}
                  
                  <div className="bg-gray-50 p-4 rounded-lg text-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="font-medium">V ceně zahrnuto:</span>
                    </div>
                    <ul className="space-y-1 text-gray-600 text-sm">
                      <li>• Celý objekt jen pro vás</li>
                      <li>• Všechny energie a poplatky</li>
                      <li>• WiFi zdarma</li>
                      <li>• Parkování</li>
                      <li>• Wellness centrum 24/7</li>
                      <li>• Povlečení a základní vybavení</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Terms Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-gray-600" />
                <h2 className="text-2xl font-light">Ubytovací řád</h2>
              </div>
              <button
                onClick={() => setShowTermsModal(false)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[60vh] text-sm leading-relaxed">
              <div className="space-y-6">
                <section>
                  <h3 className="font-medium text-lg mb-3">1. Všeobecné podmínky</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Ubytování je určeno výhradně pro osoby starší 18 let</li>
                    <li>• Maximální kapacita objektu je 14 osob</li>
                    <li>• Celý objekt je pronajímán výhradně jedné skupině hostů</li>
                    <li>• Kouření je povoleno pouze na venkovních prostorách</li>
                    <li>• Ubytování psů, koček a jiných zvířat je zakázáno</li>
                  </ul>
                </section>

                <section>
                  <h3 className="font-medium text-lg mb-3">2. Check-in a Check-out</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Check-in: 15:00</li>
                    <li>• Check-out: do 10:00</li>
                    <li>• Při příjezdu je nutné předložit platný doklad totožnosti</li>
                  </ul>
                </section>

                <section>
                  <h3 className="font-medium text-lg mb-3">3. Platební podmínky</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Rezervace je platná po uhrazení 50% zálohy</li>
                    <li>• Kauce 5 000 Kč je požadována při check-in</li>
                    <li>• Doplatek je splatný při příjezdu</li>
                  </ul>
                </section>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center gap-4 mb-4">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="text-sm text-gray-700">
                  Přečetl/a jsem si ubytovací řád a souhlasím s podmínkami pobytu
                </span>
              </div>
              <div className="flex gap-3 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setShowTermsModal(false)}
                >
                  Zrušit
                </Button>
                <Button
                  onClick={handleTermsAccept}
                  className="bg-gray-900 hover:bg-gray-800"
                >
                  Souhlasím a odeslat rezervaci
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPage;