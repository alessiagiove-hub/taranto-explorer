import { useLanguage } from "@/i18n/LanguageContext";
import { useFavorites } from "@/hooks/useFavorites";
import { venues } from "@/data/venues";
import VenueCard from "@/components/VenueCard";
import { Heart } from "lucide-react";

const Saved = () => {
  const { t } = useLanguage();
  const { favorites, isFavorite, toggleFavorite } = useFavorites();

  const savedVenues = venues.filter((v) => favorites.includes(v.id));

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border px-4 py-4">
        <h1 className="text-xl font-display font-bold text-foreground">{t("saved.title")}</h1>
      </header>

      <section className="px-4 py-4">
        {savedVenues.length > 0 ? (
          <div className="flex flex-col gap-3">
            {savedVenues.map((venue) => (
              <VenueCard
                key={venue.id}
                venue={venue}
                isFavorite={isFavorite(venue.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Heart className="h-12 w-12 text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground text-sm max-w-[250px]">{t("saved.empty")}</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Saved;
