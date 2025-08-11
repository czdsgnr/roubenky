// src/firebase/contentStructure.ts
// Definice struktury obsahu pro všechny stránky webu

export interface WebsiteContent {
  // Hlavní stránka
  homepage: {
    hero: {
      title: string;
      subtitle: string;
      description: string;
      images: string[];
    };
    uvodnik: {
      title: string;
      description: string;
      video: {
        url: string;
        thumbnail: string;
      };
    };
    about: {
      badge: string;
      title: string;
      subtitle: string;
      description: string;
      stats: Array<{
        number: string;
        label: string;
        sublabel: string;
      }>;
      image: string;
    };
    features: {
      title: string;
      subtitle: string;
      cards: Array<{
        title: string;
        description: string;
        image: string;
      }>;
    };
    reviews: {
      badge: string;
      title: string;
      rating: number;
      totalReviews: number;
      featuredReview: {
        text: string;
        author: string;
        date: string;
        source: string;
      };
    };
  };

  // O roubence
  about: {
    hero: {
      badge: string;
      title: string;
      description: string;
      image: string;
    };
    story: {
      badge: string;
      title: string;
      subtitle: string;
      paragraphs: string[];
      image: string;
    };
    features: {
      title: string;
      subtitle: string;
      items: Array<{
        title: string;
        description: string;
        details: string[];
      }>;
    };
    amenities: {
      title: string;
      categories: Array<{
        title: string;
        items: string[];
      }>;
    };
    values: {
      title: string;
      subtitle: string;
      items: Array<{
        title: string;
        description: string;
      }>;
    };
    technical: {
      title: string;
      stats: Array<{
        number: string;
        label: string;
        desc: string;
      }>;
      floorPlan: {
        title: string;
        groundFloor: Array<{
          name: string;
          size: string;
        }>;
        firstFloor: Array<{
          name: string;
          size: string;
        }>;
        totalArea: string;
      };
    };
    sustainability: {
      badge: string;
      title: string;
      subtitle: string;
      items: Array<{
        title: string;
        description: string;
      }>;
    };
    awards: {
      title: string;
      items: Array<{
        title: string;
        description: string;
        icon: string;
      }>;
    };
  };

  // Fotogalerie
  gallery: {
    hero: {
      title: string;
      description: string;
    };
    categories: Array<{
      id: string;
      name: string;
      count: number;
    }>;
    images: Array<{
      id: number;
      src: string;
      alt: string;
      category: string;
    }>;
  };

  // Ceník
  pricing: {
    hero: {
      badge: string;
      title: string;
      subtitle: string;
      description: string;
    };
    standard: {
      title: string;
      subtitle: string;
      plans: Array<{
        nights: string;
        price: string;
        perNight: string;
        popular?: boolean;
      }>;
    };
    special: {
      title: string;
      periods: Array<{
        name: string;
        dates: string;
        price: string;
        perNight: string;
        minimum: string;
        total: string;
        icon: string;
      }>;
    };
    seasonal: {
      title: string;
      subtitle: string;
      winter: {
        title: string;
        period: string;
        conditions: string[];
      };
      summer: {
        title: string;
        period: string;
        conditions: string[];
      };
    };
    included: {
      title: string;
      subtitle: string;
      categories: Array<{
        title: string;
        items: string[];
      }>;
      notIncluded: {
        title: string;
        description: string;
      };
    };
    payment: {
      title: string;
      subtitle: string;
      steps: Array<{
        title: string;
        description: string;
        note: string;
      }>;
      methods: {
        title: string;
        items: string[];
      };
      vat: {
        title: string;
        items: string[];
      };
    };
    notice: {
      title: string;
      description: string;
    };
  };

  // Kontakt
  contact: {
    hero: {
      badge: string;
      title: string;
      subtitle: string;
      description: string;
    };
    info: {
      title: string;
      phone: {
        number: string;
        hours: string;
      };
      email: {
        address: string;
        response: string;
      };
      address: {
        street: string;
        city: string;
        zip: string;
        gps: string;
      };
      hours: {
        checkin: string;
        checkout: string;
        note: string;
      };
    };
    form: {
      title: string;
      subtitle: string;
      subjects: Array<{
        value: string;
        label: string;
      }>;
    };
    directions: {
      title: string;
      subtitle: string;
      methods: Array<{
        title: string;
        steps: string[];
        note: string;
        icon: string;
      }>;
    };
    faq: {
      title: string;
      subtitle: string;
      items: Array<{
        question: string;
        answer: string;
      }>;
    };
  };

  // Recenze
  reviews: {
    hero: {
      badge: string;
      title: string;
      subtitle: string;
      description: string;
    };
    overview: {
      avgRating: number;
      totalReviews: number;
      stats: Array<{
        label: string;
        value: string;
        color: string;
      }>;
    };
    filters: Array<{
      id: string;
      name: string;
    }>;
    items: Array<{
      id: number;
      author: string;
      avatar: string;
      rating: number;
      date: string;
      category: string;
      title: string;
      text: string;
      helpful: number;
      verified: boolean;
    }>;
    awards: {
      title: string;
      subtitle: string;
      items: Array<{
        title: string;
        description: string;
        icon: string;
      }>;
    };
  };

  // Aktivity (pokud existuje)
  activities?: {
    hero: {
      title: string;
      description: string;
    };
    seasons: Array<{
      name: string;
      activities: Array<{
        title: string;
        description: string;
        image: string;
      }>;
    }>;
  };

  // Globální nastavení
  global: {
    siteName: string;
    tagline: string;
    phone: string;
    email: string;
    address: string;
    socialMedia: {
      facebook?: string;
      instagram?: string;
      google?: string;
    };
    seo: {
      title: string;
      description: string;
      keywords: string[];
    };
  };
}

// Výchozí obsah pro inicializaci
export const defaultContent: WebsiteContent = {
  homepage: {
    hero: {
      title: "Luxusní soukromé wellness v srdci hor",
      subtitle: "Králická Roubenka",
      description: "Exkluzivní ubytování pro 14 hostů s privátním wellness centrem a celoročně vyhřívaným bazénem v srdci Krkonoš",
      images: [
        "https://www.kralickaroubenka.cz/sites/kralickaroubenka/files/styles/banner/public/obrazky/banner/whatsappimage2021-11-28at2053242.jpeg?itok=0VJcVO79",
        "https://www.kralickaroubenka.cz/sites/kralickaroubenka/files/styles/banner/public/obrazky/banner/img0023.jpg?itok=Cs9tn_jl",
        "https://images.unsplash.com/photo-1520637836862-4d197d17c11a?q=80&w=2069&auto=format&fit=crop"
      ]
    },
    uvodnik: {
      title: "Vítejte v Králické Roubence",
      description: "Objevte krásu tradičního horského bydlení v moderním pojetí. Naše roubenka nabízí jedinečný zážitek spojující autentickou atmosféru s luxusním komfortem.",
      video: {
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop"
      }
    },
    about: {
      badge: "LUXUSNÍ UBYTOVÁNÍ",
      title: "Dokonalé spojení",
      subtitle: "tradice a luxusu",
      description: "Autentická horská roubenka v srdci přírody Králického Sněžníku nabízí jedinečnou kombinaci tradičního designu s nejmodernějším vybavením a službami na úrovni pětihvězdičkového hotelu.",
      stats: [
        { number: "14", label: "Luxusních míst", sublabel: "ve 4 apartmánech" },
        { number: "500", label: "Metrů od sjezdovky", sublabel: "ski in/ski out" },
        { number: "24/7", label: "Concierge servis", sublabel: "vždy k dispozici" },
        { number: "100%", label: "Soukromí", sublabel: "celý objekt jen pro vás" }
      ],
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop"
    },
    features: {
      title: "Objevte naši roubenku",
      subtitle: "Vše, co potřebujete pro dokonalý pobyt",
      cards: [
        {
          title: "Wellness & Spa",
          description: "Privátní wellness centrum s bazénem, saunou a vířivkou",
          image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=800&auto=format&fit=crop"
        },
        {
          title: "Hynčice a okolí",
          description: "Aktivity po celý rok - lyžování, turistika, cyklistika",
          image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop"
        },
        {
          title: "Fotogalerie",
          description: "Prohlédněte si luxusní interiéry a krásné prostředí",
          image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800&auto=format&fit=crop"
        },
        {
          title: "Transparentní ceník",
          description: "Jasné ceny včetně všech poplatků a energií",
          image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800&auto=format&fit=crop"
        },
        {
          title: "Recenze hostů",
          description: "Přečtěte si hodnocení našich spokojených hostů",
          image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=800&auto=format&fit=crop"
        },
        {
          title: "Kontakt & Rezervace",
          description: "Jsme tu pro vás 24/7. Rezervujte si svůj pobyt",
          image: "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?q=80&w=800&auto=format&fit=crop"
        }
      ]
    },
    reviews: {
      badge: "RECENZE HOSTŮ",
      title: "Hodnocení od hostů",
      rating: 4.9,
      totalReviews: 1277,
      featuredReview: {
        text: "Králická roubenka je úžasné místo pro ubytování přímo pod Králickým Sněžníkem. Už samotná stavba nás nadchla – krásný kombinet, perfektně čistá a nadstandardně vybavená. Všechno bylo připraveno do posledního detailu. Velice příjemným zážitkem, po dlouhém výletě, pro nás byl především vyhřívaný sud na zahradě a krásně zařízená sauna s výhledem na okolní přírodu. Ale celé okolí roubenky je úžasné – také zahrada s posezením, dětskou houpačkou a grilem nabízí spoustu možností k odpočinku a relaxaci.",
        author: "Klára Matoušková",
        date: "16. října 2024",
        source: "Google recenze"
      }
    }
  },
  about: {
    hero: {
      badge: "NAŠE PŘÍBĚH",
      title: "Králická Roubenka",
      description: "Autentická horská roubenka, kde se tradice setkává s luxusem v srdci Národní přírodní rezervace Králický Sněžník",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop"
    },
    story: {
      badge: "NAŠE VIZE",
      title: "Místo pro",
      subtitle: "nezapomenutelné zážitky",
      paragraphs: [
        "Králická Roubenka vznikla z hluboké lásky k horám a touhy vytvořit místo, kde se naši hosté mohou plně odpojit od každodenního spěchu a znovu se spojit s přírodou i se svými nejbližšími.",
        "Nachází se v jedinečné poloze v srdci Národní přírodní rezervace Králický Sněžník, pouhých 500 metrů od sjezdových tratí a v nadmořské výšce 1 425 metrů. Tato privilegovaná lokalita nabízí dechberoucí výhledy a přímý přístup k nejkrásnějším místům Orlických hor.",
        "Naší filozofií je propojení autenticity tradičního horského stylu s moderním luxusem a komfortem. Každý detail byl pečlivě promyšlen tak, aby vytvořil harmonické prostředí pro dokonalý odpočinek."
      ],
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop"
    },
    features: {
      title: "Vybavení roubenky",
      subtitle: "Každý detail pro váš komfort a pohodlí",
      items: [
        {
          title: "Autentická architektura",
          description: "Tradiční horská roubenka z roku 1920, kompletně zrekonstruovaná v roce 2019 s respektem k původnímu charakteru.",
          details: ["Dřevěné trámy a prvky", "Kamenné základy", "Moderní izolace"]
        },
        {
          title: "Kapacita 14 osob",
          description: "Čtyři luxusní apartmány s vlastními koupelnami a možností připojení pro větší skupiny.",
          details: ["4 apartmány", "6 ložnic", "5 koupelen"]
        },
        {
          title: "Privátní wellness",
          description: "Exkluzivní spa centrum pouze pro naše hosty s celoročním provozem.",
          details: ["Infinity bazén", "Finská sauna", "Venkovní vířivka"]
        }
      ]
    },
    amenities: {
      title: "Kompletní vybavení",
      categories: [
        {
          title: "Wellness & Spa",
          items: [
            "Infinity bazén 4,5 x 2,5 m (34°C)",
            "Finská sauna pro 8 osob",
            "Venkovní vířivka pro 6 osob",
            "Relaxační zóna s lehátky",
            "Ručníky a župany",
            "Wellness kosmetika"
          ]
        },
        {
          title: "Kuchyně & Stravování",
          items: [
            "Indukční varná deska",
            "Kombinovaná trouba",
            "Myčka nádobí Bosch",
            "Kávovar Nespresso",
            "Kompletní nádobí pro 14 osob",
            "Venkovní grill Weber"
          ]
        }
      ]
    },
    values: {
      title: "Naše hodnoty",
      subtitle: "Principy, kterými se řídíme",
      items: [
        {
          title: "Soukromí a exkluzivita",
          description: "Věříme, že skutečný luxus spočívá v možnosti být sám se sebou a svými nejbližšími. Proto pronajímáme celou roubenku vždy pouze jedné skupině."
        },
        {
          title: "Respekt k přírodě",
          description: "Nacházíme se v chráněné krajinné oblasti a plně respektujeme její jedinečnost. Používáme ekologické materiály a podporujeme udržitelný turismus."
        },
        {
          title: "Autenticita a tradice",
          description: "Ctíme historii našeho regionu a snažíme se zachovat genius loci místa. Moderní komfort propojujeme s tradičními materiály a řemeslnou prací."
        }
      ]
    },
    technical: {
      title: "Technické údaje",
      stats: [
        { number: "2019", label: "Rok rekonstrukce", desc: "Kompletní modernizace" },
        { number: "320m²", label: "Užitná plocha", desc: "Na dvou podlažích" },
        { number: "1 425m", label: "Nadmořská výška", desc: "Výhledy do krajiny" },
        { number: "500m", label: "Vzdálenost od sjezdovky", desc: "Ski in/ski out" }
      ],
      floorPlan: {
        title: "Dispozice roubenky",
        groundFloor: [
          { name: "Obývací pokoj s krbem", size: "45 m²" },
          { name: "Jídelna s kuchyní", size: "35 m²" },
          { name: "Apartmán 1 (2 osoby)", size: "25 m²" },
          { name: "Apartmán 2 (4 osoby)", size: "40 m²" },
          { name: "Wellness centrum", size: "60 m²" },
          { name: "Technická místnost", size: "15 m²" }
        ],
        firstFloor: [
          { name: "Apartmán 3 (4 osoby)", size: "45 m²" },
          { name: "Apartmán 4 (4 osoby)", size: "45 m²" },
          { name: "Společenská místnost", size: "30 m²" },
          { name: "Balkon s výhledem", size: "15 m²" }
        ],
        totalArea: "320 m²"
      }
    },
    sustainability: {
      badge: "UDRŽITELNOST",
      title: "Péče o životní prostředí",
      subtitle: "Naše závazky k ochraně přírody",
      items: [
        {
          title: "Vodní hospodářství",
          description: "Úsporné kohoutky, sběr dešťové vody pro zalévání, čistička odpadních vod."
        },
        {
          title: "Obnovitelná energie",
          description: "Solární panely, tepelné čerpadlo, LED osvětlení s čidly pohybu."
        },
        {
          title: "Místní materiály",
          description: "Dřevo z certifikovaných zdrojů, přírodní kamень z regionu."
        }
      ]
    },
    awards: {
      title: "Ocenění a certifikace",
      items: [
        {
          title: "Top Rated 2024",
          description: "Nejvyšší hodnocení hostů na booking platformách",
          icon: "🏆"
        },
        {
          title: "Eco Friendly Certificate",
          description: "Certifikát pro udržitelný turismus",
          icon: "🌱"
        },
        {
          title: "Family Friendly Award",
          description: "Ideální pro rodiny s dětmi",
          icon: "👨‍👩‍👧‍👦"
        },
        {
          title: "Luxury Standard",
          description: "Potvrzený luxusní standard ubytování",
          icon: "💎"
        }
      ]
    }
  },
  gallery: {
    hero: {
      title: "Fotogalerie",
      description: "Prohlédněte si luxusní interiéry, wellness centrum a krásné prostředí Králické Roubenky"
    },
    categories: [
      { id: "all", name: "Vše", count: 24 },
      { id: "exterior", name: "Exteriér", count: 6 },
      { id: "interior", name: "Interiér", count: 8 },
      { id: "wellness", name: "Wellness", count: 5 },
      { id: "rooms", name: "Pokoje", count: 5 }
    ],
    images: [
      { id: 1, src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format&fit=crop", alt: "Roubenka v zimě", category: "exterior" },
      { id: 2, src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1200&auto=format&fit=crop", alt: "Letní pohled", category: "exterior" },
      { id: 3, src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop", alt: "Obývací pokoj", category: "interior" },
      { id: 4, src: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1200&auto=format&fit=crop", alt: "Bazén", category: "wellness" },
      { id: 5, src: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=1200&auto=format&fit=crop", alt: "Hlavní ložnice", category: "rooms" }
    ]
  },
  pricing: {
    hero: {
      badge: "CENÍK UBYTOVÁNÍ",
      title: "Pronájem celé",
      subtitle: "roubenky",
      description: "Roubenku si můžete pronajmout výhradně jako celek. Všechny ceny jsou uvedeny s DPH."
    },
    standard: {
      title: "Standardní ceník",
      subtitle: "Ceny za pronájem celé roubenky • Minimální pobyt 2 noci",
      plans: [
        { nights: "2 noci", price: "23 000", perNight: "11 500" },
        { nights: "3 noci", price: "30 000", perNight: "10 000", popular: true },
        { nights: "4 noci", price: "36 000", perNight: "9 000" },
        { nights: "5 nocí", price: "43 000", perNight: "8 600" },
        { nights: "6 nocí", price: "49 000", perNight: "8 167" },
        { nights: "7 nocí", price: "55 000", perNight: "7 857" }
      ]
    },
    special: {
      title: "Speciální období",
      periods: [
        {
          name: "Vánoce",
          dates: "23. - 27. prosince",
          price: "11 000",
          perNight: "za noc",
          minimum: "Minimálně 4 noci",
          total: "44 000 Kč",
          icon: "🎄"
        },
        {
          name: "Silvestr",
          dates: "27. prosince - 1. ledna",
          price: "65 000",
          perNight: "za celé období",
          minimum: "5 nocí",
          total: "13 000 Kč za noc",
          icon: "🎆"
        },
        {
          name: "Velikonoce",
          dates: "Velikonoční svátky",
          price: "11 000",
          perNight: "za noc",
          minimum: "Minimálně 4 noci",
          total: "44 000 Kč",
          icon: "🐰"
        }
      ]
    },
    seasonal: {
      title: "Sezónní podmínky",
      subtitle: "Speciální pravidla pro různá období roku",
      winter: {
        title: "Zimní sezóna",
        period: "Leden, únor, březen",
        conditions: [
          "Minimální pobyt: 4 noci",
          "Standardní ceník podle délky pobytu",
          "Ideální pro lyžování a zimní sporty"
        ]
      },
      summer: {
        title: "Letní sezóna",
        period: "Červenec, srpen",
        conditions: [
          "Pronájem pouze na celý týden",
          "Sobota - sobota (7 nocí)",
          "Cena: 55 000 Kč za týden"
        ]
      }
    },
    included: {
      title: "Co je v ceně zahrnuto",
      subtitle: "Kompletní seznam služeb a vybavení",
      categories: [
        {
          title: "Wellness centrum",
          items: ["Sauna", "Celoročně vyhřívaný bazén", "Koupací sud (vířivka)"]
        },
        {
          title: "Energie a připojení",
          items: ["Elektrická energie", "WiFi připojení", "Spotřeba vody"]
        },
        {
          title: "Parkování",
          items: ["Parkování pro více vozů", "Zabezpečené parkoviště", "Zdarma"]
        }
      ],
      notIncluded: {
        title: "Pozor - není v ceně zahrnuto:",
        description: "Ručníky - prosíme, přivezte si vlastní ručníky nebo si je můžete zapůjčit za poplatek"
      }
    },
    payment: {
      title: "Platební podmínky",
      subtitle: "Jak probíhá rezervace a platba",
      steps: [
        {
          title: "1. Rezervace",
          description: "Rezervace je platná po uhrazení 50% zálohy z ceny ubytování",
          note: "Do 7 dnů od potvrzení"
        },
        {
          title: "2. Kauce",
          description: "Před nástupem k pobytu je nutné zaplatit kauci 5 000 Kč",
          note: "Vrácena po kontrole objektu"
        },
        {
          title: "3. Doplatek",
          description: "Zbývajících 50% uhradíte při příjezdu",
          note: "Hotově nebo kartou"
        }
      ],
      methods: {
        title: "Platební metody:",
        items: [
          "Bankovní převod",
          "Platební karta při příjezdu",
          "Hotovost při příjezdu"
        ]
      },
      vat: {
        title: "DPH a faktury:",
        items: [
          "Nejsme plátci DPH",
          "Všechny ceny jsou konečné",
          "Možnost vystavení faktury"
        ]
      }
    },
    notice: {
      title: "Důležité upozornění",
      description: "Ubytování psů, koček a jiných zvířat je zakázáno. Toto pravidlo platí bez výjimky pro celý objekt a jeho okolí. Děkujeme za pochopení a respektování tohoto nařízení."
    }
  },
  contact: {
    hero: {
      badge: "KONTAKTUJTE NÁS",
      title: "Jsme tu pro vás",
      subtitle: "24 hodin denně",
      description: "Máte dotazy ohledně rezervace nebo pobytu? Rádi vám pomůžeme s plánováním dokonalé dovolené."
    },
    info: {
      title: "Kontaktní informace",
      phone: {
        number: "+420 123 456 789",
        hours: "Denně 8:00 - 20:00"
      },
      email: {
        address: "info@kralickaroubenka.cz",
        response: "Odpověď do 24 hodin"
      },
      address: {
        street: "Hynčice pod Sušinou",
        city: "Králický Sněžník",
        zip: "561 69",
        gps: "50.0833°N, 16.8333°E"
      },
      hours: {
        checkin: "Check-in: 15:00 - 20:00",
        checkout: "Check-out: do 10:00",
        note: "Pozdní příjezd po domluvě"
      }
    },
    form: {
      title: "Napište nám",
      subtitle: "Vyplňte formulář a my se vám ozveme do 24 hodin",
      subjects: [
        { value: "general", label: "Obecný dotaz" },
        { value: "booking", label: "Rezervace" },
        { value: "pricing", label: "Ceník a platby" },
        { value: "services", label: "Dodatečné služby" },
        { value: "complaint", label: "Stížnost" }
      ]
    },
    directions: {
      title: "Jak se k nám dostanete",
      subtitle: "Králická Roubenka se nachází v krásném prostředí Králického Sněžníku",
      methods: [
        {
          title: "🚗 Autem z Prahy",
          steps: [
            "1. Dálnice D1 směr Brno",
            "2. D35 směr Hradec Králové",
            "3. Silnice I/14 přes Letohrad",
            "4. Králíky - Hynčice pod Sušinou"
          ],
          note: "Celkem cca 2 hodiny (150 km)",
          icon: "🚗"
        },
        {
          title: "🚌 Veřejnou dopravou",
          steps: [
            "1. Vlak z Prahy do Letohrad",
            "2. Autobus Letohrad - Králíky",
            "3. Místní autobus do Hynčic"
          ],
          note: "Na přání zajistíme odvoz z Králík",
          icon: "🚌"
        },
        {
          title: "✈️ Letecky",
          steps: [
            "• Nejbližší letiště: Pardubice (1,5 hod)",
            "• Praha Ruzyně (2,5 hod autem)",
            "• Transfer na objednávku"
          ],
          note: "",
          icon: "✈️"
        }
      ]
    },
    faq: {
      title: "Často kladené dotazy",
      subtitle: "Odpovědi na nejčastější otázky",
      items: [
        {
          question: "Jak probíhá check-in?",
          answer: "Check-in probíhá od 15:00 do 20:00. Při příjezdu vás uvítá náš personál, předá klíče a provede po objektu. Pro pozdější příjezd se předem domluvte."
        },
        {
          question: "Je možné zrušit rezervaci?",
          answer: "Ano, storno podmínky jsou: více než 30 dní předem (100% vrácení), 15-30 dní (50% vrácení), méně než 15 dní (bez vrácení)."
        },
        {
          question: "Kolik stojí parkování?",
          answer: "Parkování je zdarma v ceně ubytování. K dispozici je soukromé parkoviště pro 8 vozů včetně nabíjecí stanice pro elektromobily."
        },
        {
          question: "Můžeme přivézt domácího mazlíčka?",
          answer: "Ano, domácí mazlíčci jsou vítáni za poplatek 500 Kč/noc. Je nutné předem informovat při rezervaci."
        }
      ]
    }
  },
  reviews: {
    hero: {
      badge: "HODNOCENÍ HOSTŮ",
      title: "Recenze našich",
      subtitle: "spokojených hostů",
      description: "Přečtěte si autentické recenze od hostů, kteří u nás již pobývali"
    },
    overview: {
      avgRating: 4.9,
      totalReviews: 6,
      stats: [
        { label: "Doporučuje", value: "98%", color: "green" },
        { label: "Čistota", value: "4.9", color: "blue" },
        { label: "Lokalita", value: "5.0", color: "purple" }
      ]
    },
    filters: [
      { id: "vsechny", name: "Všechny recenze" },
      { id: "rodina", name: "Rodiny s dětmi" },
      { id: "firemni", name: "Firemní pobyty" },
      { id: "pratele", name: "Skupiny přátel" },
      { id: "par", name: "Páry" }
    ],
    items: [
      {
        id: 1,
        author: "Rodina Dvořákových",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&h=150&auto=format&fit=crop&crop=face",
        rating: 5,
        date: "Leden 2025",
        category: "rodina",
        title: "Naprosto dokonalá dovolená",
        text: "Roubenka překonala všechna naša očekávání. Vybavení je luxusní, wellness fantastické a personál úžasný. Děti si užily bazén a my rodiče saunu. Určitě se vrátíme a můžeme jen doporučit!",
        helpful: 23,
        verified: true
      },
      {
        id: 2,
        author: "StartUp tým z Prahy",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=150&h=150&auto=format&fit=crop&crop=face",
        rating: 5,
        date: "Prosinec 2024",
        category: "firemni",
        title: "Ideální místo pro firemní retreat",
        text: "Kombinace práce a relaxace v krásném prostředí. WiFi funguje perfektně, takže jsme mohli pracovat, a wellness centrum je skvělé pro večerní relaxaci. Catering byl výborný.",
        helpful: 18,
        verified: true
      }
    ],
    awards: {
      title: "Ocenění a certifikace",
      subtitle: "Naše kvalita je uznávána",
      items: [
        {
          title: "Top Rated 2024",
          description: "Nejvyšší hodnocení na booking platformách",
          icon: "🏆"
        },
        {
          title: "Eco Friendly",
          description: "Certifikát pro udržitelný turismus",
          icon: "🌱"
        },
        {
          title: "Family Friendly",
          description: "Ideální pro rodiny s dětmi",
          icon: "👨‍👩‍👧‍👦"
        },
        {
          title: "Luxury Standard",
          description: "Potvrzený luxusní standard ubytování",
          icon: "💎"
        }
      ]
    }
  },
  global: {
    siteName: "Králická Roubenka",
    tagline: "Luxusní horská roubenka v srdci Orlických hor",
    phone: "+420 123 456 789",
    email: "info@kralickaroubenka.cz",
    address: "Hynčice pod Sušinou, Králický Sněžník 561 69",
    socialMedia: {
      facebook: "https://facebook.com/kralickaroubenka",
      instagram: "https://instagram.com/kralickaroubenka",
      google: "https://maps.google.com/kralickaroubenka"
    },
    seo: {
      title: "Králická Roubenka - Luxusní horská roubenka",
      description: "Exkluzivní ubytování pro 14 hostů s privátním wellness centrem v srdci Orlických hor. Rezervujte si pobyt v luxusní roubence.",
      keywords: ["roubenka", "ubytování", "wellness", "Orlické hory", "Králický Sněžník", "luxusní ubytování", "horská chata"]
    }
  }
};