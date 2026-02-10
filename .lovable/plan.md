

# I Love Taranto — Digital Concierge for Tourists

## Overview
A mobile-first travel web app serving as a digital concierge for tourists visiting Taranto, Puglia. Think Airbnb meets TripAdvisor, but simplified and focused on one destination. Bilingual (English + Italian) with a coastal design theme.

---

## Design & Theme
- **Color Palette:** Deep Teal/Blue (primary — sea), Sand/Gold (secondary — beaches/history), White/Light Gray backgrounds
- **Typography:** Clean sans-serif, optimized for readability on mobile
- **Layout:** Mobile-first with sticky bottom navigation bar (Home, Map, Saved)
- **Inspiration:** Airbnb-style cards, clean and fast

---

## Pages & Features

### 1. Home Page
- **Header:** "I Love Taranto" logo + search bar
- **Hero Carousel:** Full-width image slider showcasing sponsor venues (is_hero = true)
- **Category Grid:** 6 tappable icons — Eat, Drink, Beaches, Experiences, Shopping, Services
- **Zone Filter:** Horizontal scrollable pills — All, Taranto Centro, Città Vecchia, Pulsano/Litoranea, San Vito
- **Top Picks List:** Venue cards with image, name, star rating, price level, and zone. Premium venues get a gold "Featured" badge and appear first

### 2. Venue Detail Page
- **Hero Image:** Full-width at top
- **Title, Rating & Price Level**
- **Sticky Action Bar:** "Call Now" and "Navigate" (opens Google Maps link) buttons
- **Special Offer Box:** Highlighted banner if a special offer exists — "Show this screen to get: [offer]"
- **Description & Address**

### 3. Map Page
- **Interactive Google Maps** view with venue pins, filterable by category
- Tapping a pin shows a mini venue card with link to detail page

### 4. Saved Page
- **Local storage favorites** — users can heart/save venues and view them here
- No login required

### 5. Language Toggle
- English/Italian toggle in the header
- All UI text and venue descriptions support both languages

---

## Bottom Navigation Bar
- 🏠 Home
- 🗺️ Map
- ❤️ Saved

---

## Backend (Supabase)
- **venues table** with: id, name, category, description, rating, price_level, image_url, address, google_maps_link, phone, zone, is_premium, is_hero, special_offer
- Only venues with rating ≥ 4.5 are displayed
- Seeded with realistic Taranto data (Lido Gandoli, Ristorante Al Canale, Gente di Mare, Caffè Letterario, Jonian Dolphin Conservation, Ceramiche Grottaglie Shop, and more)

---

## Technical Notes
- Google Maps API key will be needed for the Map page — we'll set this up via Supabase secrets
- Favorites stored in browser local storage (no auth needed)
- Bilingual support via a simple i18n context with JSON translation files

