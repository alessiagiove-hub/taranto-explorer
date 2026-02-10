export type Language = "en" | "it";

export const translations: Record<Language, Record<string, string>> = {
  en: {
    // Header
    "app.title": "I Love Taranto",
    "search.placeholder": "Search venues...",
    
    // Categories
    "cat.eat": "Eat",
    "cat.drink": "Drink",
    "cat.beach": "Beaches",
    "cat.experiences": "Experiences",
    "cat.shopping": "Shopping",
    "cat.services": "Services",

    // Zones
    "zone.all": "All",
    "zone.taranto_centro": "Taranto Centro",
    "zone.citta_vecchia": "Città Vecchia",
    "zone.pulsano": "Pulsano/Litoranea",
    "zone.san_vito": "San Vito",

    // Home
    "home.top_picks": "Top Picks",
    "home.featured": "Featured",
    "home.hero_subtitle": "Discover the best of Taranto",

    // Detail
    "detail.call": "Call Now",
    "detail.navigate": "Navigate",
    "detail.offer": "Show this screen to get:",
    "detail.description": "Description",
    "detail.address": "Address",

    // Nav
    "nav.home": "Home",
    "nav.map": "Map",
    "nav.saved": "Saved",

    // Saved
    "saved.title": "Your Favorites",
    "saved.empty": "No saved venues yet. Tap the heart icon on any venue to save it!",

    // Map
    "map.title": "Explore Map",
    "map.coming_soon": "Interactive map coming soon",
  },
  it: {
    "app.title": "I Love Taranto",
    "search.placeholder": "Cerca luoghi...",

    "cat.eat": "Mangiare",
    "cat.drink": "Bere",
    "cat.beach": "Spiagge",
    "cat.experiences": "Esperienze",
    "cat.shopping": "Shopping",
    "cat.services": "Servizi",

    "zone.all": "Tutti",
    "zone.taranto_centro": "Taranto Centro",
    "zone.citta_vecchia": "Città Vecchia",
    "zone.pulsano": "Pulsano/Litoranea",
    "zone.san_vito": "San Vito",

    "home.top_picks": "I Migliori",
    "home.featured": "In Evidenza",
    "home.hero_subtitle": "Scopri il meglio di Taranto",

    "detail.call": "Chiama",
    "detail.navigate": "Naviga",
    "detail.offer": "Mostra questa schermata per ottenere:",
    "detail.description": "Descrizione",
    "detail.address": "Indirizzo",

    "nav.home": "Home",
    "nav.map": "Mappa",
    "nav.saved": "Salvati",

    "saved.title": "I Tuoi Preferiti",
    "saved.empty": "Nessun locale salvato. Tocca il cuore su un locale per salvarlo!",

    "map.title": "Esplora la Mappa",
    "map.coming_soon": "Mappa interattiva in arrivo",
  },
};
