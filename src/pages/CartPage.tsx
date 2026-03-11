import { useCart } from "@/store/cartStore";
import Icon from "@/components/ui/icon";

type Page = "home" | "catalog" | "product" | "cart" | "profile" | "contacts" | "faq";

interface Props {
  onNavigate: (page: Page, id?: number) => void;
}

export default function CartPage({ onNavigate }: Props) {
  const { items, remove, updateQty, total, clear } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-24 text-center">
        <Icon name="ShoppingBag" size={48} className="text-muted-foreground mx-auto mb-6" />
        <h1 className="font-display text-4xl font-light mb-3">Корзина пуста</h1>
        <p className="text-muted-foreground mb-8">Добавьте товары из каталога, чтобы оформить заказ</p>
        <button
          onClick={() => onNavigate("catalog")}
          className="bg-foreground text-background px-8 py-3.5 text-sm tracking-widest uppercase hover:opacity-80 transition-opacity"
        >
          Перейти в каталог
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 pt-20 pb-24">
      <div className="pt-10 pb-8 flex items-baseline justify-between">
        <div>
          <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase mb-2">Мой заказ</p>
          <h1 className="font-display text-5xl font-light">Корзина</h1>
        </div>
        <button
          onClick={clear}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors underline"
        >
          Очистить всё
        </button>
      </div>

      <div className="grid lg:grid-cols-[1fr_360px] gap-12">
        {/* Items */}
        <div>
          {/* Header */}
          <div className="hidden sm:grid grid-cols-[1fr_120px_100px_40px] gap-4 pb-4 border-b border-border text-xs tracking-wide text-muted-foreground uppercase">
            <span>Товар</span>
            <span className="text-center">Количество</span>
            <span className="text-right">Сумма</span>
            <span />
          </div>

          {items.map((item) => (
            <div
              key={item.product.id}
              className="py-6 border-b border-border grid sm:grid-cols-[1fr_120px_100px_40px] gap-4 items-center animate-fade-in"
            >
              {/* Product info */}
              <div className="flex gap-4">
                <button
                  onClick={() => onNavigate("product", item.product.id)}
                  className="w-20 h-24 bg-secondary flex-shrink-0 overflow-hidden"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </button>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">{item.product.category}</p>
                  <button
                    onClick={() => onNavigate("product", item.product.id)}
                    className="font-display text-xl font-light hover:opacity-70 transition-opacity text-left"
                  >
                    {item.product.name}
                  </button>
                  <p className="text-sm text-muted-foreground mt-1">
                    {item.product.price.toLocaleString("ru-RU")} ₽ / шт.
                  </p>
                </div>
              </div>

              {/* Qty */}
              <div className="flex items-center border border-border w-fit sm:mx-auto">
                <button
                  onClick={() => updateQty(item.product.id, item.quantity - 1)}
                  className="w-8 h-9 flex items-center justify-center hover:bg-secondary transition-colors"
                >
                  <Icon name="Minus" size={12} />
                </button>
                <span className="w-8 text-center text-sm">{item.quantity}</span>
                <button
                  onClick={() => updateQty(item.product.id, item.quantity + 1)}
                  className="w-8 h-9 flex items-center justify-center hover:bg-secondary transition-colors"
                >
                  <Icon name="Plus" size={12} />
                </button>
              </div>

              {/* Subtotal */}
              <div className="text-right font-medium">
                {(item.product.price * item.quantity).toLocaleString("ru-RU")} ₽
              </div>

              {/* Remove */}
              <button
                onClick={() => remove(item.product.id)}
                className="text-muted-foreground hover:text-foreground transition-colors ml-auto sm:ml-0"
              >
                <Icon name="X" size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div>
          <div className="border border-border p-6 sticky top-24">
            <h2 className="font-display text-2xl font-light mb-6">Итого</h2>

            <div className="space-y-3 pb-6 border-b border-border mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Товары ({items.length})</span>
                <span>{total.toLocaleString("ru-RU")} ₽</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Доставка</span>
                <span className="text-green-600">Бесплатно</span>
              </div>
            </div>

            <div className="flex justify-between mb-8">
              <span className="font-medium">К оплате</span>
              <span className="font-display text-2xl font-light">{total.toLocaleString("ru-RU")} ₽</span>
            </div>

            <button className="w-full bg-foreground text-background py-4 text-sm tracking-widest uppercase hover:opacity-80 transition-opacity">
              Оформить заказ
            </button>

            <div className="mt-4 flex items-center justify-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Icon name="Shield" size={12} />
                Защищённая оплата
              </span>
              <span className="flex items-center gap-1">
                <Icon name="RotateCcw" size={12} />
                Возврат 14 дней
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
