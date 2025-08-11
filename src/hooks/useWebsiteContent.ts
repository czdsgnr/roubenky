// src/hooks/useWebsiteContent.ts
import { useState, useEffect } from 'react';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/firebase.config';
import { WebsiteContent, defaultContent } from '../firebase/contentStructure';

export const useWebsiteContent = () => {
  const [content, setContent] = useState<WebsiteContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const docRef = doc(db, 'website', 'content');

    // Nejdříve zkusíme načíst obsah jednou
    const loadInitialContent = async () => {
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data() as WebsiteContent;
          setContent(data);
          setError(null);
        } else {
          console.log('Dokument neexistuje, používám výchozí obsah');
          setContent(defaultContent);
          setError(null);
        }
      } catch (err) {
        console.error('Chyba při načítání obsahu:', err);
        setError('Chyba při načítání obsahu');
        setContent(defaultContent); // Vždy poskytni nějaký obsah
      } finally {
        setLoading(false);
      }
    };

    // Spustíme počáteční načtení
    loadInitialContent();

    // Pak nastavíme real-time listener
    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        try {
          if (docSnap.exists()) {
            const data = docSnap.data() as WebsiteContent;
            setContent(data);
            setError(null);
          }
          // Pokud dokument neexistuje, necháme současný obsah
        } catch (err) {
          console.error('Chyba při real-time aktualizaci:', err);
          // Neměníme obsah při chybě real-time aktualizace
        }
      },
      (err) => {
        console.error('Chyba Firebase listener:', err);
        // Neměníme obsah při chybě listeneru
      }
    );

    return () => unsubscribe();
  }, []);

  return { content, loading, error };
};

// Hook pro načítání konkrétní sekce obsahu
export const useContentSection = <T extends keyof WebsiteContent>(section: T) => {
  const { content, loading, error } = useWebsiteContent();
  
  return {
    content: content?.[section] || null,
    loading,
    error
  };
};

// Hook pro globální nastavení
export const useGlobalSettings = () => {
  return useContentSection('global');
};