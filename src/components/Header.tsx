import { useLanguage } from "@/i18n/LanguageContext";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const Header = ({ searchQuery, onSearchChange }: HeaderProps) => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border px-4 py-3">
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-xl font-display font-bold text-primary tracking-tight">
          🩵 {t("app.title")}
        </h1>
        <button
          onClick={() => setLanguage(language === "en" ? "it" : "en")}
          className="flex items-center gap-1 rounded-full bg-muted px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          {language === "en" ? "🇮🇹 IT" : "🇬🇧 EN"}
        </button>
      </div>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder={t("search.placeholder")}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 h-10 rounded-xl bg-muted border-none text-sm"
        />
      </div>
    </header>
  );
};

export default Header;
