import { useState } from "react";
import { Product } from "@/data/products";
import { cartStore } from "@/store/cartStore";
import Icon from "@/components/ui/icon";

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  const [added, setAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!product.inStock) return;
    cartStore.add(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div
      className="group cursor-pointer animate-fade-in"
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-secondary aspect-[3/4] mb-4">
        {!imgError ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <Icon name="Package" size={40} />
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.isNew && (
            <span className="bg-foreground text-background text-[10px] font-medium px-2 py-0.5 tracking-wider uppercase">
              Новинка
            </span>
          )}
          {product.isSale && (
            <span className="bg-[hsl(var(--accent))] text-white text-[10px] font-medium px-2 py-0.5 tracking-wider uppercase">
              Скидка
            </span>
          )}
          {!product.inStock && (
            <span className="bg-muted text-muted-foreground text-[10px] font-medium px-2 py-0.5 tracking-wider uppercase">
              Нет в наличии
            </span>
          )}
        </div>

        {/* Add button */}
        <button
          onClick={handleAdd}
          disabled={!product.inStock}
          className={`absolute bottom-3 right-3 w-10 h-10 flex items-center justify-center transition-all duration-200 ${
            product.inStock
              ? added
                ? "bg-green-600 text-white opacity-100"
                : "bg-white text-foreground opacity-0 group-hover:opacity-100 hover:bg-foreground hover:text-background shadow-sm"
              : "hidden"
          }`}
        >
          <Icon name={added ? "Check" : "Plus"} size={16} />
        </button>
      </div>

      {/* Info */}
      <div>
        <p className="text-xs text-muted-foreground mb-1 tracking-wide">{product.category}</p>
        <h3 className="font-display text-lg font-light leading-tight mb-1 group-hover:opacity-70 transition-opacity">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{product.price.toLocaleString("ru-RU")} ₽</span>
          {product.oldPrice && (
            <span className="text-xs text-muted-foreground line-through">
              {product.oldPrice.toLocaleString("ru-RU")} ₽
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
