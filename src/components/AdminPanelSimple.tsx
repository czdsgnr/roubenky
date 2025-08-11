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
import { auth, db, storage } from '../firebase/firebase.config';
import {
  Users,
  FileText,
  Settings,
  LogOut,
  Edit2,
  Save,
  X,
  Calendar,
  Phone,
  Mail,
  User,
  Camera,
  Upload,
  Plus,
  Trash2
} from 'lucide-react';
import {
  ref,
  uploadBytes,
  getDownloadURL
} from 'firebase/storage';
import { WebsiteContent, defaultContent } from '../firebase/contentStructure';

interface AdminPanelSimpleProps {
  user: any;
  onLogout: () => void;
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

const AdminPanelSimple: React.FC<AdminPanelSimpleProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('reservations');
  const [content, setContent] = useState<WebsiteContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState<string | null>(null);
  const [editedContent, setEditedContent] = useState<WebsiteContent | null>(null);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [reservationsLoading, setReservationsLoading] = useState(true);

  // Načtení obsahu z Firebase
  useEffect(() => {
    const loadContent = async () => {
      try {
        const docRef = doc(db, 'website', 'content');
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data() as WebsiteContent;
          // Sloučit s defaultContent pro zajištění kompletní struktury
          const mergedContent = {
            ...defaultContent,
            ...data,
            homepage: {
              ...defaultContent.homepage,
              ...data.homepage,
              hero: {
                ...defaultContent.homepage.hero,
                ...data.homepage?.hero
              },
              uvodnik: {
                ...defaultContent.homepage.uvodnik,
                ...data.homepage?.uvodnik
              }
            }
          };
          setContent(mergedContent);
          setEditedContent(mergedContent);
        } else {
          // Vytvořit výchozí obsah pokud neexistuje
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

  const handleSave = async (section: string) => {
    if (!editedContent) return;

    try {
      const docRef = doc(db, 'website', 'content');
      await setDoc(docRef, editedContent, { merge: true });
      
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('cs-CZ');
  };

  const formatTimestamp = (timestamp: Timestamp) => {
    return timestamp.toDate().toLocaleString('cs-CZ');
  };

  // Funkce pro aktualizaci obsahu
  const updateContent = (path: string[], value: any) => {
    if (!editedContent) return;
    
    const newContent = { ...editedContent };
    let current: any = newContent;
    
    // Bezpečně vytvořit nested objekty pokud neexistují
    for (let i = 0; i < path.length - 1; i++) {
      if (!current[path[i]]) {
        current[path[i]] = {};
      }
      current = current[path[i]];
    }
    
    current[path[path.length - 1]] = value;
    setEditedContent(newContent);
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
              <p className="text-sm text-gray-600">Admin Panel - Správa obsahu</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => window.open('/', '_blank')}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors"
                title="Otevřít web v novém okně"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Zobrazit web
              </button>
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
            { id: 'homepage', label: 'Homepage', icon: FileText },
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

          {/* Homepage Tab */}
          {activeTab === 'homepage' && (
            <div className="space-y-6">
              {!content ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="text-center py-8">
                    <div className="text-red-600 text-4xl mb-4">⚠️</div>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Obsah se nenačetl</h3>
                    <p className="text-gray-600 mb-4">Databáze neobsahuje potřebná data pro správu obsahu.</p>
                    <button
                      onClick={async () => {
                        try {
                          const { initializeWebsiteContent } = await import('../firebase/initializeContent');
                          const success = await initializeWebsiteContent();
                          if (success) {
                            window.location.reload();
                          } else {
                            alert('Chyba při inicializaci. Zkuste to znovu.');
                          }
                        } catch (error) {
                          console.error('Chyba při inicializaci:', error);
                          alert('Chyba při inicializaci obsahu.');
                        }
                      }}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Inicializovat obsah
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Hero sekce */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h3 className="text-lg font-medium text-gray-800">Hero sekce - Úvodní stránka</h3>
                        <p className="text-sm text-gray-600">Upravte hlavní nadpis, podnadpis a popis na úvodní stránce</p>
                      </div>
                    {editMode === 'homepage-hero' ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSave('homepage-hero')}
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
                        onClick={() => setEditMode('homepage-hero')}
                        className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                        Upravit
                      </button>
                    )}
                  </div>

                  {editMode === 'homepage-hero' ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Hlavní nadpis</label>
                        <input
                          type="text"
                          value={editedContent?.homepage?.hero?.title || ''}
                          onChange={(e) => updateContent(['homepage', 'hero', 'title'], e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Králická Roubenka"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Podnadpis</label>
                        <input
                          type="text"
                          value={editedContent?.homepage?.hero?.subtitle || ''}
                          onChange={(e) => updateContent(['homepage', 'hero', 'subtitle'], e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Luxusní horský pobyt v srdci Orlických hor"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Popis</label>
                        <textarea
                          value={editedContent?.homepage?.hero?.description || ''}
                          onChange={(e) => updateContent(['homepage', 'hero', 'description'], e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Objevte krásu tradičního bydlení v moderním pojetí..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">Hero obrázky (max 3)</label>
                        
                        {/* Aktuální obrázky */}
                        <div className="space-y-3 mb-4">
                          {(editedContent?.homepage?.hero?.images || []).map((imageUrl, index) => (
                            <div key={index} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg bg-gray-50">
                              <div className="w-16 h-12 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                                <img
                                  src={imageUrl}
                                  alt={`Hero obrázek ${index + 1}`}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA2NCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjQ4IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yNCAyMEwyOCAyNEwzNiAxNkw0NCAyNFYzMkgyMFYyMFoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+';
                                  }}
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <input
                                  type="url"
                                  value={imageUrl}
                                  onChange={(e) => {
                                    const newImages = [...(editedContent?.homepage?.hero?.images || [])];
                                    newImages[index] = e.target.value;
                                    updateContent(['homepage', 'hero', 'images'], newImages);
                                  }}
                                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  placeholder="https://example.com/image.jpg"
                                />
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  const newImages = (editedContent?.homepage?.hero?.images || []).filter((_, i) => i !== index);
                                  updateContent(['homepage', 'hero', 'images'], newImages);
                                }}
                                className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                                title="Odstranit obrázek"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>

                        {/* Přidat nový obrázek */}
                        {(editedContent?.homepage?.hero?.images || []).length < 3 && (
                          <div className="space-y-3">
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                              <div className="space-y-2">
                                <Camera className="w-8 h-8 text-gray-400 mx-auto" />
                                <p className="text-sm text-gray-600">
                                  Přidat obrázek {(editedContent?.homepage?.hero?.images || []).length + 1}/3
                                </p>
                                
                                {/* Upload z počítače */}
                                <div className="space-y-2">
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={async (e) => {
                                      const file = e.target.files?.[0];
                                      if (!file) return;
                                      
                                      if (file.size > 5 * 1024 * 1024) {
                                        alert('Obrázek je příliš velký. Maximální velikost je 5MB.');
                                        return;
                                      }
                                      
                                      try {
                                        // Upload do Firebase Storage
                                        const timestamp = Date.now();
                                        const fileName = `hero_${timestamp}_${file.name}`;
                                        const imageRef = ref(storage, `images/${fileName}`);
                                        
                                        await uploadBytes(imageRef, file);
                                        const downloadURL = await getDownloadURL(imageRef);
                                        
                                        // Přidat URL do seznamu
                                        const currentImages = editedContent?.homepage?.hero?.images || [];
                                        const newImages = [...currentImages, downloadURL];
                                        updateContent(['homepage', 'hero', 'images'], newImages);
                                        
                                        // Reset input
                                        e.target.value = '';
                                        
                                      } catch (error) {
                                        console.error('Chyba při nahrávání:', error);
                                        alert('Chyba při nahrávání obrázku.');
                                      }
                                    }}
                                    className="hidden"
                                    id="hero-image-upload-simple"
                                  />
                                  <label
                                    htmlFor="hero-image-upload-simple"
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
                                  >
                                    <Upload className="w-4 h-4" />
                                    Nahrát z počítače
                                  </label>
                                </div>
                                
                                {/* Nebo URL */}
                                <div className="text-sm text-gray-500">nebo</div>
                                <div className="flex gap-2">
                                  <input
                                    type="url"
                                    placeholder="Vložte URL obrázku"
                                    className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onKeyPress={(e) => {
                                      if (e.key === 'Enter') {
                                        const input = e.target as HTMLInputElement;
                                        const url = input.value.trim();
                                        if (url) {
                                          const currentImages = editedContent?.homepage?.hero?.images || [];
                                          const newImages = [...currentImages, url];
                                          updateContent(['homepage', 'hero', 'images'], newImages);
                                          input.value = '';
                                        }
                                      }
                                    }}
                                  />
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      const input = (e.target as HTMLButtonElement).previousElementSibling as HTMLInputElement;
                                      const url = input.value.trim();
                                      if (url) {
                                        const currentImages = editedContent?.homepage?.hero?.images || [];
                                        const newImages = [...currentImages, url];
                                        updateContent(['homepage', 'hero', 'images'], newImages);
                                        input.value = '';
                                      }
                                    }}
                                    className="px-3 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                                  >
                                    <Plus className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                            
                            <div className="text-xs text-gray-500 space-y-1">
                              <p>• Doporučené rozměry: 1920x1080px nebo 16:9 poměr stran</p>
                              <p>• Maximální velikost: 5MB</p>
                              <p>• Podporované formáty: JPG, PNG, WebP</p>
                            </div>
                          </div>
                        )}
                        
                        {(editedContent?.homepage?.hero?.images || []).length >= 3 && (
                          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                            <p className="text-sm text-green-800">
                              ✅ Máte nahrány všechny 3 obrázky pro hero sekci
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Hlavní nadpis:</p>
                        <p className="font-medium text-gray-900">{content?.homepage?.hero?.title || 'Nenačteno'}</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Podnadpis:</p>
                        <p className="font-medium text-gray-900">{content?.homepage?.hero?.subtitle || 'Nenačteno'}</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Popis:</p>
                        <p className="text-gray-900">{content?.homepage?.hero?.description || 'Nenačteno'}</p>
                      </div>
                    </div>
                  )}
                  </div>

                  {/* Úvodník sekce */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h3 className="text-lg font-medium text-gray-800">Úvodník - Video sekce</h3>
                        <p className="text-sm text-gray-600">Upravte nadpis, popis a video pro úvodní sekci</p>
                      </div>
                      {editMode === 'homepage-uvodnik' ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleSave('homepage-uvodnik')}
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
                          onClick={() => setEditMode('homepage-uvodnik')}
                          className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                          Upravit
                        </button>
                      )}
                    </div>

                    {editMode === 'homepage-uvodnik' ? (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Nadpis</label>
                          <input
                            type="text"
                            value={editedContent?.homepage?.uvodnik?.title || ''}
                            onChange={(e) => updateContent(['homepage', 'uvodnik', 'title'], e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Vítejte v Králické Roubence"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Popis</label>
                          <textarea
                            value={editedContent?.homepage?.uvodnik?.description || ''}
                            onChange={(e) => updateContent(['homepage', 'uvodnik', 'description'], e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Objevte krásu tradičního horského bydlení..."
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Video URL</label>
                          <input
                            type="url"
                            value={editedContent?.homepage?.uvodnik?.video?.url || ''}
                            onChange={(e) => updateContent(['homepage', 'uvodnik', 'video', 'url'], e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="https://www.youtube.com/watch?v=..."
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Náhledový obrázek videa</label>
                          <input
                            type="url"
                            value={editedContent?.homepage?.uvodnik?.video?.thumbnail || ''}
                            onChange={(e) => updateContent(['homepage', 'uvodnik', 'video', 'thumbnail'], e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="https://example.com/video-thumbnail.jpg"
                          />
                          {editedContent?.homepage?.uvodnik?.video?.thumbnail && (
                            <div className="mt-2">
                              <img
                                src={editedContent.homepage.uvodnik.video.thumbnail}
                                alt="Náhled videa"
                                className="w-32 h-20 object-cover rounded border"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).style.display = 'none';
                                }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-600 mb-1">Nadpis:</p>
                          <p className="font-medium text-gray-900">{content?.homepage?.uvodnik?.title || 'Nenačteno'}</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-600 mb-1">Popis:</p>
                          <p className="text-gray-900">{content?.homepage?.uvodnik?.description || 'Nenačteno'}</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-600 mb-1">Video URL:</p>
                          <p className="text-gray-900 break-all">{content?.homepage?.uvodnik?.video?.url || 'Nenačteno'}</p>
                        </div>
                        {content?.homepage?.uvodnik?.video?.thumbnail && (
                          <div className="p-4 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-600 mb-2">Náhled videa:</p>
                            <img
                              src={content.homepage.uvodnik.video.thumbnail}
                              alt="Náhled videa"
                              className="w-32 h-20 object-cover rounded border"
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
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

                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-medium text-yellow-900 mb-2">Obsah webu</h4>
                  <p className="text-sm text-yellow-800">✅ Hero sekce připravena k editaci</p>
                  <p className="text-sm text-yellow-700 mt-1">Další sekce budou přidány postupně</p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminPanelSimple;