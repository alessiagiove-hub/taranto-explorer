export type Category = "Eat" | "Drink" | "Beach" | "Experiences" | "Shopping" | "Services";
export type PriceLevel = "€" | "€€" | "€€€";
export type Zone = "Taranto Centro" | "Città Vecchia" | "Pulsano/Litoranea" | "San Vito";

export interface Venue {
  id: string;
  name: string;
  category: Category;
  description: string;
  description_it: string;
  rating: number;
  price_level: PriceLevel;
  image_url: string;
  address: string;
  google_maps_link: string;
  phone: string;
  zone: Zone;
  is_premium: boolean;
  is_hero: boolean;
  special_offer: string | null;
  lat: number | null;
  lng: number | null;
}
