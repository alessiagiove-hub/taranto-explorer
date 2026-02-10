import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GoogleMap, useJsApiLoader, MarkerF, InfoWindowF } from "@react-google-maps/api";
import { useLanguage } from "@/i18n/LanguageContext";
import { useVenues } from "@/hooks/useVenues";
import { useGoogleMapsKey } from "@/hooks/useGoogleMapsKey";
import { useFavorites } from "@/hooks/useFavorites";
import { Category, Venue } from "@/data/types";
import { PageTransition } from "@/components/animations";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Star, Heart, Navigation, MapPin, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const TARANTO_CENTER = { lat: 40.4748, lng: 17.2382 };

const categoryColors: Record<Category, string> = {
  Eat: "#e74c3c",
  Drink: "#8e44ad",
  Beach: "#3498db",
  Experiences: "#27ae60",
  Shopping: "#f39c12",
  Services: "#95a5a6",
};

const MapPage = () => {
  const { t } = useLanguage();
  const { data: venues = [] } = useVenues();
  const { data: apiKey, isLoading: keyLoading } = useGoogleMapsKey();
  const { isFavorite, toggleFavorite } = useFavorites();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey || "",
    id: "google-map-script",
  });

  const filteredVenues = useMemo(
    () =>
      venues.filter(
        (v) => v.lat && v.lng && (!selectedCategory || v.category === selectedCategory)
      ),
    [venues, selectedCategory]
  );

  const categories: Category[] = ["Eat", "Drink", "Beach", "Experiences", "Shopping", "Services"];

  const categoryTranslations: Record<Category, string> = {
    Eat: t("cat.eat"),
    Drink: t("cat.drink"),
    Beach: t("cat.beach"),
    Experiences: t("cat.experiences"),
    Shopping: t("cat.shopping"),
    Services: t("cat.services"),
  };

  const onMapClick = useCallback(() => setSelectedVenue(null), []);

  if (keyLoading) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-background pb-20 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-background pb-20 flex flex-col">
        <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border px-4 py-3">
          <h1 className="text-xl font-display font-bold text-foreground mb-2">
            {t("map.title")}
          </h1>
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-all whitespace-nowrap ${
                  !selectedCategory
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {t("zone.all")}
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-all whitespace-nowrap ${
                    selectedCategory === cat
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {categoryTranslations[cat]}
                </button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </header>

        <div className="flex-1 relative">
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "calc(100vh - 140px)" }}
              center={TARANTO_CENTER}
              zoom={13}
              onClick={onMapClick}
              options={{
                disableDefaultUI: true,
                zoomControl: true,
                mapTypeControl: false,
                streetViewControl: false,
                fullscreenControl: false,
                styles: [
                  { featureType: "water", elementType: "geometry", stylers: [{ color: "#a3d5e0" }] },
                  { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#f5f0e8" }] },
                  { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#c5e8c5" }] },
                ],
              }}
            >
              {filteredVenues.map((venue) => (
                <MarkerF
                  key={venue.id}
                  position={{ lat: venue.lat!, lng: venue.lng! }}
                  onClick={() => setSelectedVenue(venue)}
                  icon={{
                    path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z",
                    fillColor: categoryColors[venue.category],
                    fillOpacity: 1,
                    strokeColor: "#fff",
                    strokeWeight: 2,
                    scale: 1.5,
                    anchor: new google.maps.Point(12, 22),
                  }}
                />
              ))}

              {selectedVenue && selectedVenue.lat && selectedVenue.lng && (
                <InfoWindowF
                  position={{ lat: selectedVenue.lat, lng: selectedVenue.lng }}
                  onCloseClick={() => setSelectedVenue(null)}
                >
                  <div
                    className="min-w-[200px] max-w-[260px] cursor-pointer p-0"
                    onClick={() => navigate(`/venue/${selectedVenue.id}`)}
                  >
                    <img
                      src={selectedVenue.image_url}
                      alt={selectedVenue.name}
                      className="w-full h-24 object-cover rounded-t-md"
                    />
                    <div className="p-2">
                      <h3 className="font-semibold text-sm">{selectedVenue.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="flex items-center gap-0.5 text-xs" style={{ color: "#d4a017" }}>
                          <Star style={{ width: 12, height: 12, fill: "currentColor" }} />
                          {selectedVenue.rating}
                        </span>
                        <span className="text-xs text-gray-500">{selectedVenue.price_level}</span>
                        <span className="text-xs text-gray-500">{selectedVenue.zone}</span>
                      </div>
                      <p className="text-xs text-blue-600 mt-1">Tap to view details →</p>
                    </div>
                  </div>
                </InfoWindowF>
              )}
            </GoogleMap>
          ) : (
            <div className="flex items-center justify-center h-[60vh]">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default MapPage;
