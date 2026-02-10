import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useVenue } from "@/hooks/useVenues";
import { useLanguage } from "@/i18n/LanguageContext";
import { useFavorites } from "@/hooks/useFavorites";
import { ArrowLeft, Phone, Navigation, Star, Heart, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { PageTransition, slideUp } from "@/components/animations";

const VenueDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { data: venue, isLoading } = useVenue(id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Skeleton className="w-full aspect-[4/3]" />
        <div className="px-4 mt-4 space-y-3">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-20 w-full" />
        </div>
      </div>
    );
  }

  if (!venue) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Venue not found</p>
      </div>
    );
  }

  const description = language === "it" ? venue.description_it : venue.description;
  const fav = isFavorite(venue.id);

  return (
    <PageTransition>
      <div className="min-h-screen bg-background pb-28">
        {/* Hero image with scale-in */}
        <motion.div
          className="relative aspect-[4/3] overflow-hidden"
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <img src={venue.image_url} alt={venue.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-foreground/20" />
          <motion.button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 bg-card/80 backdrop-blur-sm rounded-full p-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </motion.button>
          <motion.button
            onClick={() => toggleFavorite(venue.id)}
            className="absolute top-4 right-4 bg-card/80 backdrop-blur-sm rounded-full p-2"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            whileTap={{ scale: 1.3 }}
          >
            <Heart className={`h-5 w-5 transition-colors ${fav ? "fill-destructive text-destructive" : "text-foreground"}`} />
          </motion.button>
        </motion.div>

        <div className="px-4 -mt-6 relative z-10">
          <motion.div
            className="bg-card rounded-xl p-4 shadow-lg border border-border"
            variants={slideUp}
            initial="initial"
            animate="animate"
          >
            <h1 className="text-2xl font-display font-bold text-foreground">{venue.name}</h1>
            <div className="flex items-center gap-3 mt-1.5">
              <span className="flex items-center gap-1 text-sm font-semibold text-gold">
                <Star className="h-4 w-4 fill-current" />
                {venue.rating}
              </span>
              <span className="text-sm text-muted-foreground">{venue.price_level}</span>
              <span className="text-sm text-muted-foreground">·</span>
              <span className="text-sm text-muted-foreground">{venue.zone}</span>
            </div>
          </motion.div>

          {venue.special_offer && (
            <motion.div
              className="mt-4 rounded-xl bg-sand-light border border-sand p-4 flex items-start gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.4 }}
            >
              <Gift className="h-5 w-5 text-gold shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  {t("detail.offer")}
                </p>
                <p className="text-sm font-bold text-foreground mt-0.5">{venue.special_offer}</p>
              </div>
            </motion.div>
          )}

          <motion.div
            className="mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
          >
            <h2 className="text-sm font-bold text-foreground mb-1">{t("detail.description")}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
          </motion.div>

          <motion.div
            className="mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-sm font-bold text-foreground mb-1">{t("detail.address")}</h2>
            <p className="text-sm text-muted-foreground">{venue.address}</p>
          </motion.div>
        </div>

        {/* Sticky action bar slides up */}
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-t border-border px-4 py-3"
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.3, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex gap-3 max-w-lg mx-auto">
            {venue.phone && (
              <Button asChild className="flex-1 rounded-xl h-12 bg-primary text-primary-foreground font-semibold">
                <a href={`tel:${venue.phone}`}>
                  <Phone className="h-4 w-4 mr-2" />
                  {t("detail.call")}
                </a>
              </Button>
            )}
            <Button asChild className="flex-1 rounded-xl h-12 bg-secondary text-secondary-foreground font-semibold">
              <a href={venue.google_maps_link} target="_blank" rel="noopener noreferrer">
                <Navigation className="h-4 w-4 mr-2" />
                {t("detail.navigate")}
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default VenueDetail;
