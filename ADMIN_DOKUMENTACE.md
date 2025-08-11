# Králická Roubenka - Administrační dokumentace

## Přehled systému

Tento systém poskytuje kompletní správu webu Králické Roubenky včetně:
- Správy všech textů a obrázků na webu
- Správy rezervací
- Real-time aktualizací obsahu
- Bezpečného přístupu přes Firebase Authentication

## Přístup do administrace

### Přihlášení
1. Přejděte na hlavní stránku webu
2. Klikněte na tlačítko "Admin" v pravém dolním rohu
3. Přihlaste se pomocí admin účtu:
   - **Email:** admin@kralickaroubenka.cz
   - **Heslo:** admin123

### Bezpečnost
- Pouze uživatel s emailem `admin@kralickaroubenka.cz` má přístup
- Všechny změny jsou automaticky ukládány do Firebase
- Systém používá Firebase Authentication pro bezpečnost

## Funkce administrace

### 1. Správa rezervací

**Umístění:** Záložka "Rezervace"

**Funkce:**
- Zobrazení všech rezervací v real-time
- Změna stavu rezervace (Čeká na potvrzení / Potvrzeno / Zrušeno)
- Zobrazení detailů každé rezervace:
  - Kontaktní údaje
  - Termín pobytu
  - Počet hostů a nocí
  - Celková cena
  - Zpráva od hosta

**Jak změnit stav rezervace:**
1. Najděte rezervaci v seznamu
2. Klikněte na dropdown menu se stavem
3. Vyberte nový stav
4. Změna se automaticky uloží

### 2. Správa obsahu webu

**Umístění:** Záložka "Obsah webu"

**Dostupné sekce:**
- **Hlavní stránka** - Hero sekce, O roubence, Funkce, Recenze
- **O roubence** - Kompletní obsah stránky O roubence
- **Fotogalerie** - Správa kategorií a obrázků
- **Ceník** - Ceny, podmínky, platební informace
- **Kontakt** - Kontaktní údaje, formulář, FAQ
- **Recenze** - Správa recenzí a hodnocení
- **Globální nastavení** - Základní informace, SEO

#### Editace obsahu

**Postup:**
1. Vyberte sekci, kterou chcete editovat
2. Klikněte na tlačítko "Upravit" u konkrétní části
3. Proveďte změny v textových polích
4. Klikněte "Uložit" pro potvrzení změn
5. Nebo "Zrušit" pro vrácení původního obsahu

**Typy polí:**
- **Textová pole** - Krátké texty (nadpisy, popisky)
- **Textarea** - Delší texty (popisy, články)
- **URL pole** - Odkazy na obrázky
- **Číselná pole** - Ceny, hodnocení, počty

#### Správa obrázků

**Formát obrázků:**
- Zadávejte URL adresy obrázků
- Doporučené formáty: JPG, PNG, WebP
- Optimální velikost: 1200x800px pro hlavní obrázky
- Pro hero sekci: více URL adres, každá na novém řádku

**Příklad:**
```
https://example.com/image1.jpg
https://example.com/image2.jpg
https://example.com/image3.jpg
```

### 3. Globální nastavení

**Umístění:** Obsah webu → Globální nastavení

**Obsahuje:**
- Název webu
- Tagline (motto)
- Kontaktní údaje (telefon, email, adresa)
- SEO nastavení (title, description, keywords)
- Odkazy na sociální sítě

**SEO optimalizace:**
- **Title:** Hlavní nadpis pro vyhledávače (max 60 znaků)
- **Description:** Popis webu (max 160 znaků)
- **Keywords:** Klíčová slova oddělená čárkou

### 4. Správa obrázků

**Umístění:** Záložka "Správa obrázků"

*Poznámka: Tato funkce bude implementována v budoucí verzi*

### 5. Nastavení systému

**Umístění:** Záložka "Nastavení"

**Zobrazuje:**
- Stav připojení k Firebase
- Informace o přihlášeném uživateli
- Systémové informace

## Rezervační systém

### Nový rezervační formulář

**Funkce:**
- 3-krokový proces rezervace
- Automatická validace údajů
- Výpočet ceny podle aktuálního ceníku
- Uložení do Firebase
- Email notifikace (bude implementováno)

**Kroky rezervace:**
1. **Termín & hosté** - Výběr data a počtu hostů
2. **Kontaktní údaje** - Osobní informace
3. **Potvrzení** - Kontrola a odeslání

### Cenová logika

**Standardní ceny:**
- 2 noci: 23 000 Kč
- 3 noci: 30 000 Kč
- 4 noci: 36 000 Kč
- 5 nocí: 43 000 Kč
- 6 nocí: 49 000 Kč
- 7 nocí: 55 000 Kč

**Delší pobyty:**
- Výpočet po týdnech (7 nocí = 55 000 Kč)
- Extra dny podle tabulky

## Technické informace

### Databázová struktura

**Firebase Collections:**
- `reservations` - Rezervace
- `website/content` - Obsah webu

**Rezervace obsahuje:**
```javascript
{
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  company?: string,
  checkin: string,
  checkout: string,
  guests: number,
  totalPrice: number,
  nights: number,
  message?: string,
  status: 'pending' | 'confirmed' | 'cancelled',
  created: Timestamp,
  source: string
}
```

### Real-time aktualizace

- Všechny změny se projeví okamžitě
- Obsah webu se aktualizuje automaticky
- Rezervace se zobrazují v real-time

### Zálohování

- Všechna data jsou automaticky zálohována v Firebase
- Historie změn je uchována
- Možnost obnovení předchozích verzí

## Řešení problémů

### Časté problémy

**1. Nelze se přihlásit**
- Zkontrolujte email a heslo
- Ujistěte se, že používáte správný email: admin@kralickaroubenka.cz

**2. Změny se neuloží**
- Zkontrolujte internetové připojení
- Obnovte stránku a zkuste znovu
- Zkontrolujte konzoli prohlížeče (F12)

**3. Obrázky se nezobrazují**
- Zkontrolujte URL adresu obrázku
- Ujistěte se, že obrázek je veřejně dostupný
- Použijte HTTPS odkazy

**4. Rezervace se nezobrazují**
- Zkontrolujte připojení k Firebase
- Obnovte stránku
- Zkontrolujte záložku Nastavení pro stav systému

### Kontakt na podporu

V případě technických problémů kontaktujte vývojáře:
- Email: support@example.com
- Telefon: +420 XXX XXX XXX

## Doporučené postupy

### Pravidelná údržba

**Denně:**
- Kontrola nových rezervací
- Odpověď na dotazy hostů

**Týdně:**
- Kontrola a aktualizace obsahu
- Ověření funkčnosti formulářů

**Měsíčně:**
- Kontrola SEO nastavení
- Aktualizace obrázků
- Kontrola cen a podmínek

### Bezpečnost

- Nikdy nesdílejte přihlašovací údaje
- Pravidelně měňte heslo
- Odhlašujte se po skončení práce
- Používejte pouze důvěryhodné sítě

### Optimalizace obsahu

**Texty:**
- Používejte jasný a srozumitelný jazyk
- Kontrolujte pravopis a gramatiku
- Aktualizujte informace pravidelně

**Obrázky:**
- Používejte kvalitní fotografie
- Optimalizujte velikost pro web
- Používejte popisné alt texty

**SEO:**
- Aktualizujte klíčová slova podle trendů
- Sledujte výkonnost ve vyhledávačích
- Optimalizujte meta popisy

## Changelog

### Verze 2.0 (Aktuální)
- ✅ Kompletní admin panel
- ✅ Správa všech textů a obrázků
- ✅ Nový rezervační formulář
- ✅ Real-time aktualizace
- ✅ Firebase integrace

### Plánované funkce
- 📋 Nahrávání obrázků přímo do systému
- 📧 Automatické email notifikace
- 📊 Statistiky a reporty
- 🔄 Automatické zálohování
- 📱 Mobilní optimalizace admin panelu

---

*Dokumentace aktualizována: 7. srpna 2025*
*Verze systému: 2.0*