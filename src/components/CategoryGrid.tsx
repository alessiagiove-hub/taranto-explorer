import { useLanguage } from "@/i18n/LanguageContext";
import { Category } from "@/data/types";
import { UtensilsCrossed, Wine, Umbrella, Compass, ShoppingBag, Bus } from "lucide-react";

interface CategoryGridProps {
  selectedCategory: Category | null;
  onSelectCategory: (cat: Category | null) => void;
}

const categories: { key: Category; icon: React.ElementType; translationKey: string }[] = [
  { key: "Eat", icon: UtensilsCrossed, translationKey: "cat.eat" },
  { key: "Drink", icon: Wine, translationKey: "cat.drink" },
  { key: "Beach", icon: Umbrella, translationKey: "cat.beach" },
  { key: "Experiences", icon: Compass, translationKey: "cat.experiences" },
  { key: "Shopping", icon: ShoppingBag, translationKey: "cat.shopping" },
  { key: "Services", icon: Bus, translationKey: "cat.services" },
];

const CategoryGrid = ({ selectedCategory, onSelectCategory }: CategoryGridProps) => {
  const { t } = useLanguage();

  return (
    <section className="px-4 py-4">
      <div className="grid grid-cols-3 gap-3">
        {categories.map(({ key, icon: Icon, translationKey }) => {
          const isActive = selectedCategory === key;
          return (
            <button
              key={key}
              onClick={() => onSelectCategory(isActive ? null : key)}
              className={`flex flex-col items-center gap-1.5 rounded-xl py-3 px-2 transition-all ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-card text-muted-foreground hover:bg-muted border border-border"
              }`}
            >
              <Icon className="h-6 w-6" />
              <span className="text-xs font-semibold">{t(translationKey)}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default CategoryGrid;
