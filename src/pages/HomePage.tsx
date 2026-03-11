import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

type Page = "home" | "catalog" | "product" | "cart" | "profile" | "contacts" | "faq";

interface Props {
  onNavigate: (page: Page, id?: number) => void;
}

export default function HomePage({ onNavigate }: Props) {
  const featured = products.slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="min-h-screen flex items-center relative overflow-hidden bg-[#f7f5f2]">
        <div className="max-w-7xl mx-auto px-6 w-full py-24 grid md:grid-cols-2 gap-16 items-center">
          <div className="animate-slide-up">
            <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase mb-6">
              Коллекция 2026
            </p>
            <h1 className="font-display text-6xl md:text-8xl font-light leading-[0.95] mb-8">
              Вещи,<br />
              <em>которые</em><br />
              остаются
            </h1>
            <p className="text-muted-foreground max-w-sm leading-relaxed mb-10">
              Предметы для дома и жизни. Выбранные с вниманием к материалу, форме и долговечности.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => onNavigate("catalog")}
                className="bg-foreground text-background px-8 py-3.5 text-sm tracking-widest uppercase hover:opacity-80 transition-opacity"
              >
                Смотреть каталог
              </button>
              <button
                onClick={() => onNavigate("catalog")}
                className="border border-foreground text-foreground px-8 py-3.5 text-sm tracking-widest uppercase hover:bg-foreground hover:text-background transition-all"
              >
                Новинки
              </button>
            </div>
          </div>

          <div className="relative animate-fade-in hidden md:block">
            <div className="aspect-[4/5] bg-secondary overflow-hidden">
              <img
                src="https://picsum.photos/seed/hero1/800/1000"
                alt="Главное изображение"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-8 bg-white p-4 shadow-lg w-44">
              <p className="font-display text-3xl font-light">120+</p>
              <p className="text-xs text-muted-foreground mt-1">товаров в наличии</p>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <div className="w-px h-12 bg-muted-foreground/30" />
        </div>
      </section>

      {/* Categories strip */}
      <section className="border-y border-border overflow-x-auto">
        <div className="flex max-w-7xl mx-auto">
          {["Декор", "Аксессуары", "Электроника", "Текстиль", "Ароматы", "Кухня"].map((cat, i) => (
            <button
              key={cat}
              onClick={() => onNavigate("catalog")}
              className={`flex-1 min-w-[120px] py-5 text-sm tracking-wide text-center transition-colors hover:bg-secondary ${
                i < 5 ? "border-r border-border" : ""
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex items-baseline justify-between mb-12">
          <div>
            <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase mb-2">Избранное</p>
            <h2 className="font-display text-4xl font-light">Популярные товары</h2>
          </div>
          <button
            onClick={() => onNavigate("catalog")}
            className="hidden sm:flex items-center gap-2 text-sm hover:opacity-70 transition-opacity"
          >
            Все товары
            <span>→</span>
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} onClick={() => onNavigate("product", p.id)} />
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => onNavigate("catalog")}
            className="sm:hidden border border-foreground px-8 py-3 text-sm tracking-widest uppercase"
          >
            Все товары
          </button>
        </div>
      </section>

      {/* Banner */}
      <section className="bg-foreground text-background py-24">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs tracking-[0.3em] text-background/50 uppercase mb-6">О нас</p>
            <h2 className="font-display text-5xl font-light leading-tight mb-6">
              Выбираем осознанно
            </h2>
            <p className="text-background/70 leading-relaxed mb-8 max-w-md">
              Каждый товар в нашем магазине проходит строгий отбор. Мы работаем только с производителями,
              которые разделяют наши ценности: качество материалов, честное производство и долговечность.
            </p>
            <button
              onClick={() => onNavigate("contacts")}
              className="border border-background text-background px-8 py-3.5 text-sm tracking-widest uppercase hover:bg-background hover:text-foreground transition-all"
            >
              Связаться с нами
            </button>
          </div>
          <div className="grid grid-cols-3 gap-px">
            {[
              { num: "5+", label: "лет на рынке" },
              { num: "120+", label: "товаров" },
              { num: "4.8", label: "средняя оценка" },
            ].map((s) => (
              <div key={s.label} className="bg-foreground border border-background/10 p-8 text-center">
                <p className="font-display text-5xl font-light mb-2">{s.num}</p>
                <p className="text-xs text-background/50 tracking-wide uppercase">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Second products row */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex items-baseline justify-between mb-12">
          <div>
            <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase mb-2">Коллекция</p>
            <h2 className="font-display text-4xl font-light">Новые поступления</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.slice(4).map((p) => (
            <ProductCard key={p.id} product={p} onClick={() => onNavigate("product", p.id)} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">
          <div>
            <p className="font-display text-xl tracking-widest uppercase mb-4">Forma</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Предметы для дома и жизни с фокусом на качество и дизайн.
            </p>
          </div>
          {[
            {
              title: "Магазин",
              links: ["Каталог", "Новинки", "Скидки"],
            },
            {
              title: "Информация",
              links: ["FAQ", "Контакты", "Доставка"],
            },
            {
              title: "Контакты",
              links: ["info@forma.ru", "+7 (495) 000-00-00", "Москва, Кузнецкий Мост, 9"],
            },
          ].map((col) => (
            <div key={col.title}>
              <p className="text-xs tracking-[0.2em] uppercase font-medium mb-4">{col.title}</p>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l}>
                    <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                      {l}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-10 mt-10 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">© 2026 Forma. Все права защищены.</p>
          <p className="text-xs text-muted-foreground">Политика конфиденциальности</p>
        </div>
      </footer>
    </div>
  );
}
