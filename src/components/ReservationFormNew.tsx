// src/components/ReservationFormNew.tsx
import React, { useState } from 'react';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase/firebase.config';
import { X, Calendar, Users, Mail, Phone, User, Building, MessageSquare, CreditCard, AlertCircle, CheckCircle } from 'lucide-react';

interface ReservationFormNewProps {
  onClose: () => void;
  onSuccess: () => void;
  prefilledData?: {
    checkIn?: string;
    checkOut?: string;
    guests?: number;
  };
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  checkin: string;
  checkout: string;
  guests: number;
  message: string;
  agreeTerms: boolean;
  agreeMarketing: boolean;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  company?: string;
  checkin?: string;
  checkout?: string;
  guests?: string;
  message?: string;
  agreeTerms?: string;
  agreeMarketing?: string;
}

const ReservationFormNew: React.FC<ReservationFormNewProps> = ({ 
  onClose, 
  onSuccess, 
  prefilledData 
}) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    checkin: prefilledData?.checkIn || '',
    checkout: prefilledData?.checkOut || '',
    guests: prefilledData?.guests || 2,
    message: '',
    agreeTerms: false,
    agreeMarketing: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [step, setStep] = useState(1);

  // Výpočet ceny
  const calculatePrice = () => {
    if (!formData.checkin || !formData.checkout) return 0;
    
    const start = new Date(formData.checkin);
    const end = new Date(formData.checkout);
    const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    
    if (nights <= 0) return 0;
    
    // Cenová logika podle aktuálního ceníku
    if (nights === 2) return 23000;
    if (nights === 3) return 30000;
    if (nights === 4) return 36000;
    if (nights === 5) return 43000;
    if (nights === 6) return 49000;
    if (nights === 7) return 55000;
    
    // Pro delší pobyty
    const weeks = Math.floor(nights / 7);
    const extraDays = nights % 7;
    let totalPrice = weeks * 55000;
    
    if (extraDays > 0) {
      const extraPrices = [0, 11500, 23000, 30000, 36000, 43000, 49000];
      totalPrice += extraPrices[extraDays] || extraDays * 9000;
    }
    
    return totalPrice;
  };

  const totalPrice = calculatePrice();
  const nights = formData.checkin && formData.checkout 
    ? Math.ceil((new Date(formData.checkout).getTime() - new Date(formData.checkin).getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  // Validace formuláře
  const validateStep = (stepNumber: number): boolean => {
    const newErrors: FormErrors = {};

    if (stepNumber === 1) {
      if (!formData.checkin) newErrors.checkin = 'Vyberte datum příjezdu';
      if (!formData.checkout) newErrors.checkout = 'Vyberte datum odjezdu';
      if (formData.checkin && formData.checkout) {
        const checkinDate = new Date(formData.checkin);
        const checkoutDate = new Date(formData.checkout);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (checkinDate < today) {
          newErrors.checkin = 'Datum příjezdu nemůže být v minulosti';
        }
        if (checkoutDate <= checkinDate) {
          newErrors.checkout = 'Datum odjezdu musí být po datu příjezdu';
        }
        if (nights < 2) {
          newErrors.checkout = 'Minimální pobyt je 2 noci';
        }
      }
      if (!formData.guests || formData.guests < 1 || formData.guests > 14) {
        newErrors.guests = 'Počet hostů musí být mezi 1 a 14';
      }
    }

    if (stepNumber === 2) {
      if (!formData.firstName.trim()) newErrors.firstName = 'Vyplňte jméno';
      if (!formData.lastName.trim()) newErrors.lastName = 'Vyplňte příjmení';
      if (!formData.email.trim()) {
        newErrors.email = 'Vyplňte email';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Neplatný formát emailu';
      }
      if (!formData.phone.trim()) {
        newErrors.phone = 'Vyplňte telefon';
      } else if (!/^(\+420)?[0-9\s]{9,}$/.test(formData.phone.replace(/\s/g, ''))) {
        newErrors.phone = 'Neplatný formát telefonu';
      }
    }

    if (stepNumber === 3) {
      if (!formData.agreeTerms) {
        newErrors.agreeTerms = 'Musíte souhlasit s podmínkami';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Vymazat chybu pro dané pole
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleNextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;

    setIsSubmitting(true);
    
    try {
      const reservationData = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        name: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        company: formData.company.trim() || '',
        checkin: formData.checkin,
        checkout: formData.checkout,
        guests: formData.guests,
        totalPrice: totalPrice,
        nights: nights,
        message: formData.message.trim() || '',
        status: 'pending',
        created: Timestamp.now(),
        source: 'website-new-form',
        agreeMarketing: formData.agreeMarketing
      };
      
      const docRef = await addDoc(collection(db, 'reservations'), reservationData);
      
      console.log('Rezervace uložena s ID:', docRef.id);
      
      // Úspěšné odeslání
      onSuccess();
      
    } catch (error) {
      console.error('Chyba při ukládání rezervace:', error);
      alert('❌ Nastala chyba při odesílání rezervace.\n\nZkuste to prosím znovu nebo nás kontaktujte telefonicky.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      if (step < 3) {
        handleNextStep();
      } else {
        handleSubmit();
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-green-50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">Rezervace pobytu</h2>
              <p className="text-gray-600 mt-1">Krok {step} ze 3</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center">
              {[1, 2, 3].map((stepNum) => (
                <React.Fragment key={stepNum}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= stepNum 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step > stepNum ? <CheckCircle className="w-5 h-5" /> : stepNum}
                  </div>
                  {stepNum < 3 && (
                    <div className={`flex-1 h-1 mx-2 ${
                      step > stepNum ? 'bg-blue-600' : 'bg-gray-200'
                    }`} />
                  )}
                </React.Fragment>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-600">
              <span>Termín & hosté</span>
              <span>Kontaktní údaje</span>
              <span>Potvrzení</span>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Step 1: Termín a hosté */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <Calendar className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                <h3 className="text-xl font-medium text-gray-800">Vyberte termín pobytu</h3>
                <p className="text-gray-600">Kdy byste rádi přijeli?</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Datum příjezdu *
                  </label>
                  <input
                    type="date"
                    value={formData.checkin}
                    onChange={(e) => handleInputChange('checkin', e.target.value)}
                    onKeyPress={handleKeyPress}
                    min={new Date().toISOString().split('T')[0]}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.checkin ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                  {errors.checkin && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.checkin}
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Datum odjezdu *
                  </label>
                  <input
                    type="date"
                    value={formData.checkout}
                    onChange={(e) => handleInputChange('checkout', e.target.value)}
                    onKeyPress={handleKeyPress}
                    min={formData.checkin || new Date().toISOString().split('T')[0]}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.checkout ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                  {errors.checkout && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.checkout}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Počet hostů * (max. 14)
                </label>
                <select
                  value={formData.guests}
                  onChange={(e) => handleInputChange('guests', parseInt(e.target.value))}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.guests ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                >
                  {Array.from({ length: 14 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} {i + 1 === 1 ? 'host' : i + 1 < 5 ? 'hosté' : 'hostů'}
                    </option>
                  ))}
                </select>
                {errors.guests && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.guests}
                  </p>
                )}
              </div>

              {/* Shrnutí */}
              {nights > 0 && totalPrice > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">Shrnutí pobytu</h4>
                  <div className="text-sm text-blue-800 space-y-1">
                    <p>Pobyt na {nights} {nights === 1 ? 'noc' : nights < 5 ? 'noci' : 'nocí'}</p>
                    <p>Celý objekt pouze pro vaši skupinu</p>
                    <p className="font-semibold">Celková cena: {totalPrice.toLocaleString()} Kč</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Kontaktní údaje */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <User className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                <h3 className="text-xl font-medium text-gray-800">Kontaktní údaje</h3>
                <p className="text-gray-600">Potřebujeme vaše údaje pro potvrzení rezervace</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Jméno *
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    onKeyPress={handleKeyPress}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.firstName ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Vaše jméno"
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.firstName}
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Příjmení *
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    onKeyPress={handleKeyPress}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.lastName ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Vaše příjmení"
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  onKeyPress={handleKeyPress}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="vas@email.cz"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.email}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefon *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  onKeyPress={handleKeyPress}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="+420 123 456 789"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.phone}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Firma (volitelné)
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Název firmy"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Zpráva (volitelné)
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                  placeholder="Speciální požadavky, přání nebo dotazy..."
                />
              </div>
            </div>
          )}

          {/* Step 3: Potvrzení */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
                <h3 className="text-xl font-medium text-gray-800">Potvrzení rezervace</h3>
                <p className="text-gray-600">Zkontrolujte údaje před odesláním</p>
              </div>

              {/* Shrnutí rezervace */}
              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <h4 className="font-medium text-gray-800">Detaily pobytu</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Příjezd:</span>
                    <div className="font-medium">{new Date(formData.checkin).toLocaleDateString('cs-CZ')}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Odjezd:</span>
                    <div className="font-medium">{new Date(formData.checkout).toLocaleDateString('cs-CZ')}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Počet nocí:</span>
                    <div className="font-medium">{nights}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Počet hostů:</span>
                    <div className="font-medium">{formData.guests}</div>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium">Celková cena:</span>
                    <span className="text-2xl font-bold text-green-600">{totalPrice.toLocaleString()} Kč</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Záloha 50%: {(totalPrice * 0.5).toLocaleString()} Kč<br />
                    Doplatek při příjezdu: {(totalPrice * 0.5).toLocaleString()} Kč<br />
                    Kauce: 5 000 Kč
                  </p>
                </div>
              </div>
              
              {/* Kontaktní údaje */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-medium text-gray-800 mb-3">Kontaktní údaje</h4>
                <div className="text-sm space-y-1">
                  <div>{formData.firstName} {formData.lastName}</div>
                  <div>{formData.email}</div>
                  <div>{formData.phone}</div>
                  {formData.company && <div>{formData.company}</div>}
                </div>
              </div>

              {formData.message && (
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-medium text-gray-800 mb-3">Vaše zpráva</h4>
                  <p className="text-sm text-gray-700">{formData.message}</p>
                </div>
              )}
              
              {/* Souhlasy */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={(e) => handleInputChange('agreeTerms', e.target.checked)}
                    className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="agreeTerms" className="text-sm text-gray-700">
                    Souhlasím s <a href="#" className="text-blue-600 hover:underline">obchodními podmínkami</a> a <a href="#" className="text-blue-600 hover:underline">ubytovacím řádem</a> *
                  </label>
                </div>
                {errors.agreeTerms && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.agreeTerms}
                  </p>
                )}
                
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="agreeMarketing"
                    checked={formData.agreeMarketing}
                    onChange={(e) => handleInputChange('agreeMarketing', e.target.checked)}
                    className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="agreeMarketing" className="text-sm text-gray-700">
                    Souhlasím se zasíláním marketingových sdělení a novinek
                  </label>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">Co bude následovat:</p>
                    <ul className="space-y-1 text-blue-700">
                      <li>• Potvrdíme vaši rezervaci do 24 hodin</li>
                      <li>• Zašleme vám platební informace pro zálohu</li>
                      <li>• Po uhrazení zálohy je rezervace závazná</li>
                      <li>• Před příjezdem vás budeme kontaktovat s detaily</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={step === 1 ? onClose : handlePrevStep}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {step === 1 ? 'Zrušit' : '← Zpět'}
            </button>
            
            <div className="text-sm text-gray-500">
              Krok {step} ze 3
            </div>
            
            <button
              onClick={step === 3 ? handleSubmit : handleNextStep}
              disabled={isSubmitting}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {step === 3 ? (
                isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Odesílám...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    Odeslat rezervaci
                  </>
                )
              ) : (
                'Pokračovat →'
              )}
            </button>
          </div>

          <p className="text-xs text-gray-500 text-center mt-4">
            Po odeslání rezervace vám zašleme potvrzovací email s dalšími instrukcemi.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReservationFormNew;