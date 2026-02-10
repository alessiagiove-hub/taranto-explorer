import { Venue } from "@/data/types";
import { useLanguage } from "@/i18n/LanguageContext";
import { Badge } from "@/components/ui/badge";
import { Star, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface VenueCardProps {
  venue: Venue;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

const VenueCard = ({ venue, isFavorite, onToggleFavorite }: VenueCardProps) => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div
      className={`flex gap-3 rounded-xl overflow-hidden bg-card border transition-all cursor-pointer active:scale-[0.98] ${
        venue.is_premium ? "border-gold shadow-md" : "border-border"
      }`}
      onClick={() => navigate(`/venue/${venue.id}`)}
    >
      <div className="relative w-28 min-h-[100px] shrink-0">
        <img
          src={venue.image_url}
          alt={venue.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {venue.is_premium && (
          <Badge className="absolute top-1.5 left-1.5 bg-gold text-foreground text-[10px] px-1.5 py-0.5 border-none">
            {t("home.featured")}
          </Badge>
        )}
      </div>
      <div className="flex-1 py-2.5 pr-2 flex flex-col justify-between min-w-0">
        <div>
          <h3 className="font-semibold text-sm text-foreground leading-tight truncate font-sans">
            {venue.name}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5 truncate">{venue.zone}</p>
        </div>
        <div className="flex items-center justify-between mt-1.5">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-0.5 text-xs font-semibold text-gold">
              <Star className="h-3.5 w-3.5 fill-current" />
              {venue.rating}
            </span>
            <span className="text-xs text-muted-foreground">{venue.price_level}</span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(venue.id);
            }}
            className="p-1.5 -mr-1 rounded-full hover:bg-muted transition-colors"
            aria-label="Toggle favorite"
          >
            <Heart
              className={`h-4 w-4 transition-colors ${
                isFavorite ? "fill-destructive text-destructive" : "text-muted-foreground"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VenueCard;
