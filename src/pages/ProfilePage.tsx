import { useState } from "react";
import Icon from "@/components/ui/icon";

type Page = "home" | "catalog" | "product" | "cart" | "profile" | "contacts" | "faq";

interface Props {
  onNavigate: (page: Page, id?: number) => void;
}

const mockOrders = [
  { id: "ORD-2841", date: "12 февраля 2026", items: 2, total: 11100, status: "Доставлен" },
  { id: "ORD-2756", date: "3 января 2026", items: 1, total: 4900, status: "Доставлен" },
  { id: "ORD-2671", date: "28 декабря 2025", items: 3, total: 18200, status: "Доставлен" },
];

export default function ProfilePage({ onNavigate }: Props) {
  const [activeTab, setActiveTab] = useState<"orders" | "data" | "addresses">("orders");
  const [isLoggedIn] = useState(true);

  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto px-6 pt-32 pb-24">
        <h1 className="font-display text-4xl font-light mb-8 text-center">Войти в аккаунт</h1>
        <div className="space-y-4">
          <input className="w-full border border-border px-4 py-3 text-sm outline-none focus:border-foreground transition-colors" placeholder="Email" />
          <input type="password" className="w-full border border-border px-4 py-3 text-sm outline-none focus:border-foreground transition-colors" placeholder="Пароль" />
          <button className="w-full bg-foreground text-background py-3.5 text-sm tracking-widest uppercase hover:opacity-80 transition-opacity">
            Войти
          </button>
          <p className="text-center text-sm text-muted-foreground">
            Нет аккаунта?{" "}
            <button className="underline text-foreground">Зарегистрироваться</button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 pt-20 pb-24">
      <div className="pt-10 pb-8">
        <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase mb-2">Личный кабинет</p>
        <div className="flex items-center justify-between">
          <h1 className="font-display text-5xl font-light">Профиль</h1>
          <button className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5">
            <Icon name="LogOut" size={15} />
            Выйти
          </button>
        </div>
      </div>

      {/* User summary */}
      <div className="flex items-center gap-5 mb-10 p-6 border border-border">
        <div className="w-14 h-14 bg-secondary rounded-full flex items-center justify-center">
          <Icon name="User" size={24} className="text-muted-foreground" />
        </div>
        <div>
          <p className="font-medium">Алексей Петров</p>
          <p className="text-sm text-muted-foreground">a.petrov@email.com</p>
        </div>
        <div className="ml-auto hidden sm:flex gap-8 text-center">
          <div>
            <p className="font-display text-2xl font-light">{mockOrders.length}</p>
            <p className="text-xs text-muted-foreground">заказа</p>
          </div>
          <div>
            <p className="font-display text-2xl font-light">
              {mockOrders.reduce((s, o) => s + o.total, 0).toLocaleString("ru-RU")} ₽
            </p>
            <p className="text-xs text-muted-foreground">потрачено</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border mb-8">
        {(["orders", "data", "addresses"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 text-sm transition-colors border-b-2 -mb-px ${
              activeTab === tab
                ? "border-foreground text-foreground font-medium"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab === "orders" && "Заказы"}
            {tab === "data" && "Данные"}
            {tab === "addresses" && "Адреса"}
          </button>
        ))}
      </div>

      {/* Orders */}
      {activeTab === "orders" && (
        <div className="space-y-4">
          {mockOrders.map((order) => (
            <div key={order.id} className="border border-border p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-medium text-sm">{order.id}</span>
                  <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 border border-green-100">
                    {order.status}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{order.date} · {order.items} товара</p>
              </div>
              <div className="flex items-center gap-6">
                <p className="font-display text-xl font-light">{order.total.toLocaleString("ru-RU")} ₽</p>
                <button
                  onClick={() => onNavigate("catalog")}
                  className="text-xs border border-border px-4 py-2 hover:bg-secondary transition-colors"
                >
                  Повторить
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Personal data */}
      {activeTab === "data" && (
        <div className="max-w-lg space-y-4">
          {[
            { label: "Имя", value: "Алексей" },
            { label: "Фамилия", value: "Петров" },
            { label: "Email", value: "a.petrov@email.com" },
            { label: "Телефон", value: "+7 (900) 000-00-00" },
          ].map((f) => (
            <div key={f.label}>
              <label className="text-xs tracking-wide text-muted-foreground block mb-1.5">{f.label}</label>
              <input
                defaultValue={f.value}
                className="w-full border border-border px-4 py-3 text-sm outline-none focus:border-foreground transition-colors"
              />
            </div>
          ))}
          <button className="bg-foreground text-background px-8 py-3 text-sm tracking-widest uppercase hover:opacity-80 transition-opacity mt-2">
            Сохранить
          </button>
        </div>
      )}

      {/* Addresses */}
      {activeTab === "addresses" && (
        <div>
          <div className="border border-border p-5 mb-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-sm mb-1">Домашний адрес</p>
                <p className="text-sm text-muted-foreground">Москва, ул. Тверская, д. 15, кв. 42, 125009</p>
              </div>
              <button className="text-xs text-muted-foreground hover:text-foreground underline">Изменить</button>
            </div>
          </div>
          <button className="flex items-center gap-2 text-sm border border-dashed border-border px-6 py-4 w-full hover:border-foreground transition-colors text-muted-foreground hover:text-foreground">
            <Icon name="Plus" size={16} />
            Добавить адрес
          </button>
        </div>
      )}
    </div>
  );
}
