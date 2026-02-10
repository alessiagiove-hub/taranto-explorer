import { useLanguage } from "@/i18n/LanguageContext";
import { Zone } from "@/data/types";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface ZoneFilterProps {
  selectedZone: Zone | null;
  onSelectZone: (zone: Zone | null) => void;
}

const zones: { key: Zone | null; translationKey: string }[] = [
  { key: null, translationKey: "zone.all" },
  { key: "Taranto Centro", translationKey: "zone.taranto_centro" },
  { key: "Città Vecchia", translationKey: "zone.citta_vecchia" },
  { key: "Pulsano/Litoranea", translationKey: "zone.pulsano" },
  { key: "San Vito", translationKey: "zone.san_vito" },
];

const ZoneFilter = ({ selectedZone, onSelectZone }: ZoneFilterProps) => {
  const { t } = useLanguage();

  return (
    <section className="px-4 pb-2">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex gap-2">
          {zones.map(({ key, translationKey }) => {
            const isActive = selectedZone === key;
            return (
              <button
                key={translationKey}
                onClick={() => onSelectZone(key)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-muted text-muted-foreground hover:bg-border"
                }`}
              >
                {t(translationKey)}
              </button>
            );
          })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
};

export default ZoneFilter;
