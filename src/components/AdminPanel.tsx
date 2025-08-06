// src/components/AdminPanel.tsx
import React, { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase.config';

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

const AdminPanel: React.FC<AdminPanelProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('content');
  const [content, setContent] = useState<WebContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState<string | null>(null);
  const [editedContent, setEditedContent] = useState<WebContent | null>(null);

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
        }
      } catch (error) {
        console.error('Chyba načítání obsahu:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
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
      alert('Chyba při ukládání obsahu');
    }
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

  const tabs = [
    { id: 'content', label: 'Obsah webu', icon: '📝' },
    { id: 'reservations', label: 'Rezervace', icon: '📅' },
    { id: 'settings', label: 'Nastavení', icon: '⚙️' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
              🏠
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-800">Admin Panel</h1>
              <p className="text-sm text-gray-600">Králická Roubenka</p>
            </div>
          </div>
        </div>
        
        <nav className="mt-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-6 py-3 text-left transition-colors ${
                activeTab === tab.id 
                  ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 w-64 p-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {user.email}
            </div>
            <button 
              onClick={handleLogout}
              className="text-sm text-red-600 hover:text-red-800 transition-colors"
            >
              Odhlásit
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-800">
              {tabs.find(tab => tab.id === activeTab)?.label}
            </h2>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6">
          {activeTab === 'content' && content && (
            <div className="space-y-8">
              {/* Hero Section */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-800">Hlavní sekce</h3>
                  <button
                    onClick={() => setEditMode(editMode === 'hero' ? null : 'hero')}
                    className="px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {editMode === 'hero' ? 'Zrušit' : 'Upravit'}
                  </button>
                </div>
                
                <div className="p-6">
                  {editMode === 'hero' && editedContent ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Hlavní nadpis
                        </label>
                        <input
                          type="text"
                          value={editedContent.hero.title}
                          onChange={(e) => setEditedContent({
                            ...editedContent,
                            hero: { ...editedContent.hero, title: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Popis
                        </label>
                        <textarea
                          rows={3}
                          value={editedContent.hero.subtitle}
                          onChange={(e) => setEditedContent({
                            ...editedContent,
                            hero: { ...editedContent.hero, subtitle: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      
                      <button
                        onClick={() => handleSave('hero')}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Uložit
                      </button>
                    </div>
                  ) : (
                    <div>
                      <h4 className="text-xl font-semibold text-gray-800 mb-2">
                        {content.hero.title}
                      </h4>
                      <p className="text-gray-600">
                        {content.hero.subtitle}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* About Section */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-800">O nás</h3>
                  <button
                    onClick={() => setEditMode(editMode === 'about' ? null : 'about')}
                    className="px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {editMode === 'about' ? 'Zrušit' : 'Upravit'}
                  </button>
                </div>
                
                <div className="p-6">
                  {editMode === 'about' && editedContent ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nadpis
                        </label>
                        <input
                          type="text"
                          value={editedContent.about.title}
                          onChange={(e) => setEditedContent({
                            ...editedContent,
                            about: { ...editedContent.about, title: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Text
                        </label>
                        <textarea
                          rows={4}
                          value={editedContent.about.description}
                          onChange={(e) => setEditedContent({
                            ...editedContent,
                            about: { ...editedContent.about, description: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      
                      <button
                        onClick={() => handleSave('about')}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Uložit
                      </button>
                    </div>
                  ) : (
                    <div>
                      <h4 className="text-xl font-semibold text-gray-800 mb-2">
                        {content.about.title}
                      </h4>
                      <p className="text-gray-600">
                        {content.about.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Contact Section */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-800">Kontakt</h3>
                  <button
                    onClick={() => setEditMode(editMode === 'contact' ? null : 'contact')}
                    className="px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {editMode === 'contact' ? 'Zrušit' : 'Upravit'}
                  </button>
                </div>
                
                <div className="p-6">
                  {editMode === 'contact' && editedContent ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Telefon
                        </label>
                        <input
                          type="text"
                          value={editedContent.contact.phone}
                          onChange={(e) => setEditedContent({
                            ...editedContent,
                            contact: { ...editedContent.contact, phone: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          value={editedContent.contact.email}
                          onChange={(e) => setEditedContent({
                            ...editedContent,
                            contact: { ...editedContent.contact, email: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Adresa
                        </label>
                        <input
                          type="text"
                          value={editedContent.contact.address}
                          onChange={(e) => setEditedContent({
                            ...editedContent,
                            contact: { ...editedContent.contact, address: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      
                      <button
                        onClick={() => handleSave('contact')}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Uložit
                      </button>
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
            </div>
          )}

          {activeTab === 'reservations' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Rezervace</h3>
              <p className="text-gray-600">Rezervace budou zobrazeny zde...</p>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Nastavení</h3>
              <p className="text-gray-600">Nastavení aplikace...</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;