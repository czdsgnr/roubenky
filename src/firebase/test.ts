// src/firebase/test.ts
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase.config';

// Test přihlášení
export const testLogin = async () => {
  try {
    const result = await signInWithEmailAndPassword(auth, 'admin@kralickaroubenka.cz', 'admin123');
    console.log('✅ Přihlášení úspěšné:', result.user.email);
    return true;
  } catch (error: any) {
    console.error('❌ Chyba přihlášení:', error.message);
    return false;
  }
};

// Test načtení obsahu
export const testContent = async () => {
  try {
    const docRef = doc(db, 'website', 'content');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      console.log('✅ Obsah načten:', docSnap.data());
      return docSnap.data();
    } else {
      console.log('❌ Dokument neexistuje');
      return null;
    }
  } catch (error: any) {
    console.error('❌ Chyba načítání:', error.message);
    return null;
  }
};

// Spustit všechny testy
export const runAllTests = async () => {
  console.log('🔥 Spouštím Firebase testy...');
  
  const loginSuccess = await testLogin();
  const content = await testContent();
  
  if (loginSuccess && content) {
    console.log('🎉 Všechny testy prošly! Firebase je připravený.');
  } else {
    console.log('⚠️  Některé testy selhaly. Zkontrolujte nastavení.');
  }
};