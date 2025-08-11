// src/firebase/initializeContent.ts
// Script pro inicializaci Firebase databáze s výchozím obsahem

import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from './firebase.config';
import { defaultContent } from './contentStructure';

export const initializeWebsiteContent = async (): Promise<boolean> => {
  try {
    console.log('🔄 Inicializace obsahu webu...');
    
    const docRef = doc(db, 'website', 'content');
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      console.log('📝 Vytváření výchozího obsahu...');
      await setDoc(docRef, defaultContent);
      console.log('✅ Výchozí obsah byl úspěšně vytvořen!');
      
      // Ověříme, že se data skutečně uložila
      const verifySnap = await getDoc(docRef);
      if (verifySnap.exists()) {
        console.log('✅ Ověření: Data byla úspěšně uložena');
        return true;
      } else {
        console.error('❌ Ověření selhalo: Data se neuložila');
        return false;
      }
    } else {
      console.log('ℹ️ Obsah již existuje, inicializace dokončena');
      return true;
    }
  } catch (error) {
    console.error('❌ Chyba při inicializaci obsahu:', error);
    return false;
  }
};

// Funkce pro reset obsahu (pouze pro vývoj)
export const resetWebsiteContent = async () => {
  try {
    console.log('🔄 Reset obsahu webu...');
    
    const docRef = doc(db, 'website', 'content');
    await setDoc(docRef, defaultContent);
    
    console.log('✅ Obsah byl resetován na výchozí hodnoty!');
    return true;
  } catch (error) {
    console.error('❌ Chyba při resetu obsahu:', error);
    return false;
  }
};

// Funkce pro backup obsahu
export const backupWebsiteContent = async () => {
  try {
    console.log('🔄 Zálohování obsahu webu...');
    
    const docRef = doc(db, 'website', 'content');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const content = docSnap.data();
      const timestamp = new Date().toISOString();
      
      const backupRef = doc(db, 'backups', `content-${timestamp}`);
      await setDoc(backupRef, {
        ...content,
        backupDate: timestamp,
        backupType: 'manual'
      });
      
      console.log('✅ Záloha byla úspěšně vytvořena!');
      return true;
    } else {
      console.log('⚠️ Žádný obsah k zálohování');
      return false;
    }
  } catch (error) {
    console.error('❌ Chyba při zálohování:', error);
    return false;
  }
};

// Automatické spuštění inicializace při importu (pouze v development)
if (process.env.NODE_ENV === 'development') {
  // Můžete odkomentovat pro automatickou inicializaci
  // initializeWebsiteContent();
}