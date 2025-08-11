// src/firebase/testConnection.ts
// Script pro testování Firebase připojení

import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase.config';

export const testFirebaseConnection = async () => {
  try {
    console.log('🔄 Testování Firebase připojení...');
    
    // Test čtení
    const testDoc = doc(db, 'test', 'connection');
    const docSnap = await getDoc(testDoc);
    
    console.log('✅ Čtení z Firebase funguje');
    
    // Test zápisu
    await setDoc(testDoc, {
      timestamp: new Date().toISOString(),
      test: 'Firebase connection test'
    });
    
    console.log('✅ Zápis do Firebase funguje');
    console.log('🎉 Firebase připojení je funkční!');
    
    return true;
  } catch (error) {
    console.error('❌ Chyba Firebase připojení:', error);
    return false;
  }
};

// Spustit test při importu (pouze v development)
if (process.env.NODE_ENV === 'development') {
  testFirebaseConnection();
}