import React, { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  updateDoc,
  Timestamp 
} from 'firebase/firestore';
import { auth, db } from '../firebase/firebase.config';
import { Users, FileText, Settings, LogOut, Edit2, Save, X, Calendar, Phone, Mail, User } from 'lucide-react';

interface AdminPanelProps {
  user: any;
  onLogout: () => void;
}

interface WebContent {
  hero: {
    title: string;
    subtitle: string;
  };
  about: {
    title: string;
    description: string;
  };
  contact: {
    phone: string;
    email: string;
    address: string;
  };
}

interface Reservation {
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  checkin: string;
  checkout: string;
  guests: number;
  totalPrice: number;
  nights: number;
  message?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  created: Timestamp;
  source: string;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('reservations');
  const [content, setContent] = useState<WebContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState<string | null>(null);
  const [editedContent, setEditedContent] = useState<WebContent | null>(null);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [reservationsLoading, setReservationsLoading] = useState(true);

  // Načtení obsahu z Firebase
  useEffect(() => {
    const loadContent = async () => {
      try {
        const docRef = doc(db, 'website', 'content');
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data() as WebContent;
          setContent(data);
          setEditedContent(data);
        } else {
          // Vytvořit výchozí obsah pokud neexistuje
          const defaultContent: WebContent = {
            hero: {
              title: 'Králická Roubenka',
              subtitle: 'Luxusní horská roubenka v srdci Orlických hor'
            },
            about: {
              title: 'O naší roubence',
              description: 'Luxusní roubenka pro až 15 hostů s kompletním vybavením...'
            },
            contact: {
              phone: '+420 xxx xxx xxx',
              email: 'info@kralickaroubenka.cz',
              address: 'Králíky, Pardubický kraj'
            }
          };
          await setDoc(docRef, defaultContent);
          setContent(defaultContent);
          setEditedContent(defaultContent);
        }
      } catch (error) {
        console.error('Chyba načítání obsahu:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  // Načtení rezervací z Firebase v real-time
  useEffect(() => {
    const q = query(
      collection(db, 'reservations'), 
      orderBy('created', 'desc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const reservationsData: Reservation[] = [];
      querySnapshot.forEach((doc) => {
        reservationsData.push({
          id: doc.id,
          ...doc.data()
        } as Reservation);
      });
      setReservations(reservationsData);
      setReservationsLoading(false);
    }, (error) => {
      console.error('Chyba načítání rezervací:', error);
      setReservationsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Chyba odhlášení:', error);
    }
  };

  const handleSave = async (section: keyof WebContent) => {
    if (!editedContent) return;

    try {
      const docRef = doc(db, 'website', 'content');
      await setDoc(docRef, {
        ...content,
        [section]: editedContent[section]
      }, { merge: true });
      
      setContent(editedContent);
      setEditMode(null);
      alert('Obsah byl úspěšně uložen!');
    } catch (error) {
      console.error('Chyba ukládání:', error);
      alert('Chyba při ukládání obsahu.');
    }
  };

  const handleReservationStatusChange = async (reservationId: string, newStatus: 'pending' | 'confirmed' | 'cancelled') => {
    try {
      const reservationRef = doc(db, 'reservations', reservationId);
      await updateDoc(reservationRef, {
        status: newStatus
      });
      console.log(`Rezervace ${reservationId} změněna na ${newStatus}`);
    } catch (error) {
      console.error('Chyba při změně stavu rezervace:', error);
      alert('Chyba při změně stavu rezervace.');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Potvrzeno';
      case 'cancelled':
        return 'Zrušeno';
      default:
        return 'Čeká na potvrzení';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('cs-CZ');
  };

  const formatTimestamp = (timestamp: Timestamp) => {
    return timestamp.toDate().toLocaleString('cs-CZ');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Načítání...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Králická Roubenka</h1>
              <p className="text-sm text-gray-600">Admin Panel</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Přihlášen jako: <strong>{user?.email}</strong>
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Odhlásit
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Navigation Tabs */}
        <nav className="flex space-x-8 mb-6">
          {[
            { id: 'reservations', label: 'Rezervace', icon: Calendar, count: reservations.length },
            { id: 'content', label: 'Obsah webu', icon: FileText },
            { id: 'settings', label: 'Nastavení', icon: Settings }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-2 px-4 py-2 font-medium rounded-lg transition-colors
                ${activeTab === tab.id 
                  ? 'bg-blue-100 text-blue-700 border-2 border-blue-200' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }
              `}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              {tab.count !== undefined && (
                <span className={`
                  px-2 py-1 rounded-full text-xs font-medium
                  ${activeTab === tab.id ? 'bg-blue-200 text-blue-800' : 'bg-gray-200 text-gray-600'}
                `}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Content */}
        <main>
          {/* Rezervace Tab */}
          {activeTab === 'reservations' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">Rezervace</h2>
                <p className="text-gray-600 mt-1">Správa všech rezervací z webu</p>
              </div>
              
              <div className="p-6">
                {reservationsLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Načítání rezervací...</p>
                  </div>
                ) : reservations.length === 0 ? (
                  <div className="text-center py-12">
                    <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Zatím žádné rezervace</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Nové rezervace se budou zobrazovat automaticky
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {reservations.map((reservation) => (
                      <div key={reservation.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                              <User className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">
                                {reservation.firstName} {reservation.lastName}
                              </h3>
                              <p className="text-sm text-gray-600">
                                Vytvořeno: {formatTimestamp(reservation.created)}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <select
                              value={reservation.status}
                              onChange={(e) => handleReservationStatusChange(reservation.id, e.target.value as any)}
                              className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(reservation.status)}`}
                            >
                              <option value="pending">Čeká na potvrzení</option>
                              <option value="confirmed">Potvrzeno</option>
                              <option value="cancelled">Zrušeno</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-gray-600">
                              <Mail className="w-4 h-4" />
                              <span>{reservation.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Phone className="w-4 h-4" />
                              <span>{reservation.phone}</span>
                            </div>
                            {reservation.company && (
                              <div className="flex items-center gap-2 text-gray-600">
                                <Users className="w-4 h-4" />
                                <span>{reservation.company}</span>
                              </div>
                            )}
                          </div>

                          <div className="space-y-2">
                            <div>
                              <span className="text-gray-500">Příjezd:</span>
                              <span className="ml-2 font-medium">{formatDate(reservation.checkin)}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Odjezd:</span>
                              <span className="ml-2 font-medium">{formatDate(reservation.checkout)}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Hostů:</span>
                              <span className="ml-2 font-medium">{reservation.guests}</span>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div>
                              <span className="text-gray-500">Nocí:</span>
                              <span className="ml-2 font-medium">{reservation.nights}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Cena:</span>
                              <span className="ml-2 font-bold text-green-600">
                                {reservation.totalPrice?.toLocaleString()} Kč
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-500">Zdroj:</span>
                              <span className="ml-2 font-medium">{reservation.source}</span>
                            </div>
                          </div>
                        </div>

                        {reservation.message && (
                          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm text-gray-600 font-medium">Zpráva:</span>
                            <p className="text-sm text-gray-700 mt-1">{reservation.message}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Obsah webu Tab */}
          {activeTab === 'content' && content && (
            <div className="space-y-6">
              {/* Hero Section */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-800">Hlavní sekce</h3>
                  {editMode === 'hero' ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSave('hero')}
                        className="flex items-center gap-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                      >
                        <Save className="w-4 h-4" />
                        Uložit
                      </button>
                      <button
                        onClick={() => {
                          setEditMode(null);
                          setEditedContent(content);
                        }}
                        className="flex items-center gap-2 px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                        Zrušit
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setEditMode('hero')}
                      className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                      Upravit
                    </button>
                  )}
                </div>

                {editMode === 'hero' ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nadpis</label>
                      <input
                        type="text"
                        value={editedContent?.hero.title || ''}
                        onChange={(e) => setEditedContent(prev => prev ? {
                          ...prev,
                          hero: { ...prev.hero, title: e.target.value }
                        } : null)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Podnadpis</label>
                      <textarea
                        value={editedContent?.hero.subtitle || ''}
                        onChange={(e) => setEditedContent(prev => prev ? {
                          ...prev,
                          hero: { ...prev.hero, subtitle: e.target.value }
                        } : null)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p><strong>Nadpis:</strong> {content.hero.title}</p>
                    <p><strong>Podnadpis:</strong> {content.hero.subtitle}</p>
                  </div>
                )}
              </div>

              {/* About Section */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-800">O roubence</h3>
                  {editMode === 'about' ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSave('about')}
                        className="flex items-center gap-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                      >
                        <Save className="w-4 h-4" />
                        Uložit
                      </button>
                      <button
                        onClick={() => {
                          setEditMode(null);
                          setEditedContent(content);
                        }}
                        className="flex items-center gap-2 px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                        Zrušit
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setEditMode('about')}
                      className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                      Upravit
                    </button>
                  )}
                </div>

                {editMode === 'about' ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nadpis</label>
                      <input
                        type="text"
                        value={editedContent?.about.title || ''}
                        onChange={(e) => setEditedContent(prev => prev ? {
                          ...prev,
                          about: { ...prev.about, title: e.target.value }
                        } : null)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Popis</label>
                      <textarea
                        value={editedContent?.about.description || ''}
                        onChange={(e) => setEditedContent(prev => prev ? {
                          ...prev,
                          about: { ...prev.about, description: e.target.value }
                        } : null)}
                        rows={6}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p><strong>Nadpis:</strong> {content.about.title}</p>
                    <p><strong>Popis:</strong> {content.about.description}</p>
                  </div>
                )}
              </div>

              {/* Contact Section */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-800">Kontaktní údaje</h3>
                  {editMode === 'contact' ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSave('contact')}
                        className="flex items-center gap-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                      >
                        <Save className="w-4 h-4" />
                        Uložit
                      </button>
                      <button
                        onClick={() => {
                          setEditMode(null);
                          setEditedContent(content);
                        }}
                        className="flex items-center gap-2 px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                        Zrušit
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setEditMode('contact')}
                      className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                      Upravit
                    </button>
                  )}
                </div>

                {editMode === 'contact' ? (
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
                      <input
                        type="text"
                        value={editedContent?.contact.phone || ''}
                        onChange={(e) => setEditedContent(prev => prev ? {
                          ...prev,
                          contact: { ...prev.contact, phone: e.target.value }
                        } : null)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        value={editedContent?.contact.email || ''}
                        onChange={(e) => setEditedContent(prev => prev ? {
                          ...prev,
                          contact: { ...prev.contact, email: e.target.value }
                        } : null)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Adresa</label>
                      <input
                        type="text"
                        value={editedContent?.contact.address || ''}
                        onChange={(e) => setEditedContent(prev => prev ? {
                          ...prev,
                          contact: { ...prev.contact, address: e.target.value }
                        } : null)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p><strong>Telefon:</strong> {content.contact.phone}</p>
                    <p><strong>Email:</strong> {content.contact.email}</p>
                    <p><strong>Adresa:</strong> {content.contact.address}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Nastavení Tab */}
          {activeTab === 'settings' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Nastavení aplikace</h3>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Firebase Status</h4>
                  <p className="text-sm text-blue-800">✅ Připojeno k Firebase</p>
                  <p className="text-sm text-blue-700 mt-1">Rezervace se ukládají automaticky</p>
                </div>
                
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-2">Admin přístup</h4>
                  <p className="text-sm text-green-800">✅ Přihlášen jako: {user?.email}</p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;