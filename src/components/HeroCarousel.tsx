import { useLanguage } from "@/i18n/LanguageContext";
import { Venue } from "@/data/types";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useNavigate } from "react-router-dom";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

interface HeroCarouselProps {
  venues: Venue[];
}

const HeroCarousel = ({ venues }: HeroCarouselProps) => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: false }));

  if (venues.length === 0) return null;

  return (
    <section className="relative">
      <Carousel opts={{ loop: true }} plugins={[plugin.current]} className="w-full">
        <CarouselContent className="ml-0">
          {venues.map((venue) => (
            <CarouselItem
              key={venue.id}
              className="pl-0 cursor-pointer"
              onClick={() => navigate(`/venue/${venue.id}`)}
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={venue.image_url}
                  alt={venue.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-primary-foreground">
                  <p className="text-xs font-semibold uppercase tracking-wider opacity-80 mb-1">
                    {t("home.hero_subtitle")}
                  </p>
                  <h2 className="text-2xl font-display font-bold leading-tight">
                    {venue.name}
                  </h2>
                  <p className="text-sm opacity-90 mt-1">
                    {venue.zone} · {venue.price_level} · ⭐ {venue.rating}
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export default HeroCarousel;
