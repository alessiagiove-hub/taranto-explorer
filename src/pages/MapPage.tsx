import { useLanguage } from "@/i18n/LanguageContext";
import { MapPin } from "lucide-react";

const MapPage = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border px-4 py-4">
        <h1 className="text-xl font-display font-bold text-foreground">{t("map.title")}</h1>
      </header>

      <div className="flex flex-col items-center justify-center py-20 text-center px-4">
        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
          <MapPin className="h-10 w-10 text-primary" />
        </div>
        <p className="text-muted-foreground text-sm">{t("map.coming_soon")}</p>
        <p className="text-muted-foreground text-xs mt-2 max-w-[280px]">
          Google Maps integration will be set up when you add your API key.
        </p>
      </div>
    </div>
  );
};

export default MapPage;
