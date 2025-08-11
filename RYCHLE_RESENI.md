# 🚨 Rychlé řešení chyby "Chyba při načítání obsahu"

## Problém
Aplikace zobrazuje "Chyba při načítání obsahu" protože Firebase databáze ještě neobsahuje potřebná data.

## ✅ Řešení (3 kroky)

### 1. Spusťte aplikaci
```bash
npm run dev
```

### 2. Otevřete konzoli prohlížeče
- Stiskněte **F12** nebo **Ctrl+Shift+I**
- Přejděte na záložku **Console**

### 3. Inicializujte databázi
V konzoli prohlížeče spusťte:

```javascript
// Importujte inicializační funkci
import('./src/firebase/initializeContent.js').then(module => {
  module.initializeWebsiteContent().then(() => {
    console.log('✅ Databáze inicializována!');
    window.location.reload();
  });
});
```

**NEBO** použijte admin panel:

1. Klikněte na tlačítko "Admin" (pravý dolní roh)
2. Přihlaste se:
   - Email: `admin@kralickaroubenka.cz`
   - Heslo: `admin123`
3. Systém automaticky vytvoří potřebná data

## 🔧 Alternativní řešení

### Ruční inicializace přes Firebase Console
1. Přejděte na [Firebase Console](https://console.firebase.google.com)
2. Vyberte projekt `roubenky-f603c`
3. Přejděte na **Firestore Database**
4. Vytvořte kolekci `website`
5. Vytvořte dokument `content`
6. Zkopírujte obsah z `src/firebase/contentStructure.ts` (defaultContent)

### Kontrola Firebase konfigurace
Zkontrolujte soubor `src/firebase/firebase.config.ts`:

```typescript
const firebaseConfig = {
  apiKey: "AIzaSyB9QzqXzBBZmTBQNJpP9_XQi5DRrlFOvTQ",
  authDomain: "roubenky-f603c.firebaseapp.com",
  projectId: "roubenky-f603c",
  storageBucket: "roubenky-f603c.appspot.com",
  messagingSenderId: "1092370973976",
  appId: "1:1092370973976:web:YOUR_APP_ID_HERE"
};
```

**Poznámka:** Možná bude potřeba aktualizovat `appId` na správnou hodnotu.

## 🎯 Co se stane po inicializaci

1. **Databáze se naplní** výchozím obsahem
2. **Hlavní stránka se načte** s editovatelným obsahem
3. **Admin panel bude funkční** pro správu obsahu
4. **Rezervační formulář bude fungovat**

## 🔍 Diagnostika problémů

### Zkontrolujte konzoli
Hledejte tyto zprávy:
- ✅ `"🔄 Inicializace aplikace..."`
- ✅ `"✅ Aplikace inicializována"`
- ❌ `"❌ Chyba při inicializaci:"`

### Zkontrolujte síťové připojení
- Ujistěte se, že máte připojení k internetu
- Firebase vyžaduje HTTPS v produkci

### Zkontrolujte Firebase pravidla
V Firebase Console → Firestore → Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Povolit čtení pro všechny
    match /website/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Rezervace pouze pro přihlášené
    match /reservations/{document} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## 📞 Kontakt

Pokud problém přetrvává:
1. Zkontrolujte všechny kroky výše
2. Podívejte se do konzole prohlížeče na chybové zprávy
3. Zkontrolujte Firebase Console pro chyby

## 🚀 Po vyřešení

Jakmile se aplikace načte správně:
1. **Otestujte admin panel** - klikněte "Admin" a přihlaste se
2. **Vyzkoušejte editaci** - změňte nějaký text v admin panelu
3. **Zkontrolujte rezervace** - otestujte rezervační formulář

---

*Tento problém se vyskytuje pouze při prvním spuštění. Po inicializaci databáze bude vše fungovat automaticky.*