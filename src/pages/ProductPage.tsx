import { useState } from "react";
import { products } from "@/data/products";
import { cartStore } from "@/store/cartStore";
import ProductCard from "@/components/ProductCard";
import Icon from "@/components/ui/icon";

type Page = "home" | "catalog" | "product" | "cart" | "profile" | "contacts" | "faq";

interface Props {
  productId: number;
  onNavigate: (page: Page, id?: number) => void;
}

export default function ProductPage({ productId, onNavigate }: Props) {
  const product = products.find((p) => p.id === productId);
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-6 pt-24 text-center py-24">
        <p className="font-display text-3xl font-light mb-4">Товар не найден</p>
        <button onClick={() => onNavigate("catalog")} className="text-sm underline">
          Вернуться в каталог
        </button>
      </div>
    );
  }

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) cartStore.add(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-6 pt-20">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground py-6">
        <button onClick={() => onNavigate("home")} className="hover:text-foreground transition-colors">Главная</button>
        <span>/</span>
        <button onClick={() => onNavigate("catalog")} className="hover:text-foreground transition-colors">Каталог</button>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      {/* Main grid */}
      <div className="grid md:grid-cols-2 gap-12 lg:gap-20 pb-20">
        {/* Images */}
        <div className="flex gap-4">
          {/* Thumbnails */}
          <div className="flex flex-col gap-2 w-16">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`aspect-square overflow-hidden border-2 transition-colors ${
                  activeImg === i ? "border-foreground" : "border-transparent"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Main image */}
          <div className="flex-1 aspect-[3/4] bg-secondary overflow-hidden">
            <img
              src={product.images[activeImg]}
              alt={product.name}
              className="w-full h-full object-cover transition-opacity duration-300"
            />
          </div>
        </div>

        {/* Info */}
        <div className="py-4">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs tracking-wide text-muted-foreground">{product.category}</span>
            {product.isNew && (
              <span className="text-[10px] tracking-widest uppercase bg-foreground text-background px-2 py-0.5">
                Новинка
              </span>
            )}
            {product.isSale && (
              <span className="text-[10px] tracking-widest uppercase bg-[hsl(var(--accent))] text-white px-2 py-0.5">
                Скидка
              </span>
            )}
          </div>

          <h1 className="font-display text-4xl lg:text-5xl font-light leading-tight mb-4">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-6">
            <div className="flex">
              {[1,2,3,4,5].map((s) => (
                <span key={s} className={`text-sm ${s <= Math.round(product.rating) ? "text-amber-400" : "text-muted"}`}>
                  ★
                </span>
              ))}
            </div>
            <span className="text-sm text-muted-foreground">{product.rating} ({product.reviews} отзывов)</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mb-8">
            <span className="font-display text-3xl font-light">{product.price.toLocaleString("ru-RU")} ₽</span>
            {product.oldPrice && (
              <span className="text-lg text-muted-foreground line-through">
                {product.oldPrice.toLocaleString("ru-RU")} ₽
              </span>
            )}
          </div>

          <p className="text-muted-foreground leading-relaxed mb-8">{product.description}</p>

          {/* Details */}
          <div className="border-t border-border pt-6 mb-8">
            <p className="text-xs tracking-[0.2em] uppercase font-medium mb-4">Характеристики</p>
            <ul className="space-y-2">
              {product.details.map((d) => (
                <li key={d} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="w-1 h-1 bg-muted-foreground rounded-full inline-block" />
                  {d}
                </li>
              ))}
            </ul>
          </div>

          {/* Qty + Add */}
          {product.inStock ? (
            <div className="flex gap-3">
              <div className="flex items-center border border-border">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-10 h-12 flex items-center justify-center hover:bg-secondary transition-colors"
                >
                  <Icon name="Minus" size={14} />
                </button>
                <span className="w-10 text-center text-sm font-medium">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="w-10 h-12 flex items-center justify-center hover:bg-secondary transition-colors"
                >
                  <Icon name="Plus" size={14} />
                </button>
              </div>

              <button
                onClick={handleAdd}
                className={`flex-1 h-12 text-sm tracking-widest uppercase transition-all flex items-center justify-center gap-2 ${
                  added
                    ? "bg-green-600 text-white"
                    : "bg-foreground text-background hover:opacity-80"
                }`}
              >
                <Icon name={added ? "Check" : "ShoppingBag"} size={16} />
                {added ? "Добавлено!" : "В корзину"}
              </button>
            </div>
          ) : (
            <div className="py-4 text-center border border-border text-muted-foreground text-sm tracking-wide">
              Нет в наличии
            </div>
          )}

          <div className="mt-6 flex items-center gap-6 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Icon name="Truck" size={14} />
              Доставка 1–7 дней
            </span>
            <span className="flex items-center gap-1.5">
              <Icon name="RotateCcw" size={14} />
              Возврат 14 дней
            </span>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-border py-20">
          <h2 className="font-display text-3xl font-light mb-10">Похожие товары</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} onClick={() => onNavigate("product", p.id)} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
