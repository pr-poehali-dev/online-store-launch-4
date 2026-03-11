import { useState, useMemo } from "react";
import { products, categories } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Icon from "@/components/ui/icon";

type Page = "home" | "catalog" | "product" | "cart" | "profile" | "contacts" | "faq";

interface Props {
  onNavigate: (page: Page, id?: number) => void;
  searchQuery: string;
}

type SortOption = "default" | "price_asc" | "price_desc" | "rating";

export default function CatalogPage({ onNavigate, searchQuery }: Props) {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [sort, setSort] = useState<SortOption>("default");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = [...products];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.details.some((d) => d.toLowerCase().includes(q))
      );
    }

    if (activeCategory !== "Все") {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (sort === "price_asc") result.sort((a, b) => a.price - b.price);
    if (sort === "price_desc") result.sort((a, b) => b.price - a.price);
    if (sort === "rating") result.sort((a, b) => b.rating - a.rating);

    return result;
  }, [searchQuery, activeCategory, sort]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="pt-10 pb-8">
        <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase mb-2">Магазин</p>
        <div className="flex items-baseline justify-between">
          <h1 className="font-display text-5xl font-light">Каталог</h1>
          <span className="text-sm text-muted-foreground">{filtered.length} товаров</span>
        </div>
      </div>

      {/* Search result notice */}
      {searchQuery && (
        <div className="mb-6 py-3 px-4 bg-secondary flex items-center gap-2">
          <Icon name="Search" size={15} className="text-muted-foreground" />
          <span className="text-sm">
            Результаты по запросу: <strong>{searchQuery}</strong>
          </span>
        </div>
      )}

      {/* Filters row */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8 pb-6 border-b border-border">
        {/* Categories - desktop */}
        <div className="hidden sm:flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 text-sm transition-all ${
                activeCategory === cat
                  ? "bg-foreground text-background"
                  : "border border-border hover:border-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Mobile filter toggle */}
        <button
          className="sm:hidden flex items-center gap-2 text-sm border border-border px-4 py-2"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Icon name="SlidersHorizontal" size={15} />
          Фильтры
        </button>

        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          className="border border-border text-sm px-3 py-2 bg-white outline-none cursor-pointer"
        >
          <option value="default">По умолчанию</option>
          <option value="price_asc">Цена: по возрастанию</option>
          <option value="price_desc">Цена: по убыванию</option>
          <option value="rating">По рейтингу</option>
        </select>
      </div>

      {/* Mobile categories */}
      {showFilters && (
        <div className="sm:hidden flex flex-wrap gap-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setShowFilters(false); }}
              className={`px-3 py-1.5 text-sm transition-all ${
                activeCategory === cat
                  ? "bg-foreground text-background"
                  : "border border-border"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Products grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} onClick={() => onNavigate("product", p.id)} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24">
          <Icon name="SearchX" size={40} className="text-muted-foreground mx-auto mb-4" />
          <p className="font-display text-2xl font-light mb-2">Ничего не найдено</p>
          <p className="text-muted-foreground text-sm">Попробуйте изменить запрос или категорию</p>
        </div>
      )}
    </div>
  );
}
