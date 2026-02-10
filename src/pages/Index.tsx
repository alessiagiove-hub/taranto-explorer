import { useState, useMemo } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useVenues } from "@/hooks/useVenues";
import { useFavorites } from "@/hooks/useFavorites";
import { Category, Zone } from "@/data/types";
import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import CategoryGrid from "@/components/CategoryGrid";
import ZoneFilter from "@/components/ZoneFilter";
import VenueCard from "@/components/VenueCard";
import { Skeleton } from "@/components/ui/skeleton";

const Index = () => {
  const { t } = useLanguage();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { data: venues = [], isLoading } = useVenues();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);

  const heroVenues = venues.filter((v) => v.is_hero);

  const filteredVenues = useMemo(() => {
    return venues
      .filter((v) => !selectedCategory || v.category === selectedCategory)
      .filter((v) => !selectedZone || v.zone === selectedZone)
      .filter(
        (v) =>
          !searchQuery ||
          v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          v.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
  }, [venues, selectedCategory, selectedZone, searchQuery]);

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      
      {isLoading ? (
        <div className="px-4 py-6 space-y-4">
          <Skeleton className="w-full aspect-[16/9] rounded-xl" />
          <div className="grid grid-cols-3 gap-3">
            {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-20 rounded-xl" />)}
          </div>
          {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-24 rounded-xl" />)}
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default Index;
