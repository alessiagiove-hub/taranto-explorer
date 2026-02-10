import { useState, useMemo } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { venues } from "@/data/venues";
import { useFavorites } from "@/hooks/useFavorites";
import { Category, Zone } from "@/data/types";
import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import CategoryGrid from "@/components/CategoryGrid";
import ZoneFilter from "@/components/ZoneFilter";
import VenueCard from "@/components/VenueCard";

const Index = () => {
  const { t } = useLanguage();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);

  const heroVenues = venues.filter((v) => v.is_hero && v.rating >= 4.5);

  const filteredVenues = useMemo(() => {
    return venues
      .filter((v) => v.rating >= 4.5)
      .filter((v) => !selectedCategory || v.category === selectedCategory)
      .filter((v) => !selectedZone || v.zone === selectedZone)
      .filter(
        (v) =>
          !searchQuery ||
          v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          v.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        if (a.is_premium && !b.is_premium) return -1;
        if (!a.is_premium && b.is_premium) return 1;
        return b.rating - a.rating;
      });
  }, [selectedCategory, selectedZone, searchQuery]);

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <HeroCarousel venues={heroVenues} />
      <CategoryGrid selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
      <ZoneFilter selectedZone={selectedZone} onSelectZone={setSelectedZone} />

      <section className="px-4 pb-6">
        <h2 className="text-lg font-display font-bold text-foreground mb-3">
          {t("home.top_picks")}
        </h2>
        <div className="flex flex-col gap-3">
          {filteredVenues.map((venue) => (
            <VenueCard
              key={venue.id}
              venue={venue}
              isFavorite={isFavorite(venue.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
        {filteredVenues.length === 0 && (
          <p className="text-center text-muted-foreground text-sm py-8">
            No venues found. Try adjusting your filters.
          </p>
        )}
      </section>
    </div>
  );
};

export default Index;
