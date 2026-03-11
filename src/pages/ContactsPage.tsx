import { useState } from "react";
import Icon from "@/components/ui/icon";

export default function ContactsPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const contacts = [
    { icon: "MapPin", label: "Адрес", value: "Москва, ул. Кузнецкий Мост, 9" },
    { icon: "Phone", label: "Телефон", value: "+7 (495) 000-00-00" },
    { icon: "Mail", label: "Email", value: "info@forma.ru" },
    { icon: "Clock", label: "Часы работы", value: "Пн–Пт 10:00–20:00 / Сб–Вс 11:00–19:00" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 pt-20 pb-24">
      <div className="pt-10 pb-16">
        <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase mb-2">Поддержка</p>
        <h1 className="font-display text-6xl font-light">Контакты</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-16">
        {/* Contact info */}
        <div>
          <h2 className="font-display text-2xl font-light mb-8">Мы всегда на связи</h2>
          <div className="space-y-6">
            {contacts.map((c) => (
              <div key={c.label} className="flex gap-4">
                <div className="w-10 h-10 border border-border flex items-center justify-center flex-shrink-0">
                  <Icon name={c.icon as never} size={16} className="text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground tracking-wide uppercase mb-0.5">{c.label}</p>
                  <p className="text-sm">{c.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Map placeholder */}
          <div className="mt-10 aspect-video bg-secondary flex items-center justify-center border border-border">
            <div className="text-center">
              <Icon name="Map" size={32} className="text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Карта магазина</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div>
          <h2 className="font-display text-2xl font-light mb-8">Написать нам</h2>

          {sent ? (
            <div className="border border-green-200 bg-green-50 p-8 text-center">
              <Icon name="CheckCircle" size={40} className="text-green-600 mx-auto mb-4" />
              <p className="font-display text-2xl font-light mb-2">Сообщение отправлено!</p>
              <p className="text-muted-foreground text-sm">Мы ответим вам в течение 24 часов.</p>
              <button
                onClick={() => { setSent(false); setForm({ name: "", email: "", message: "" }); }}
                className="mt-6 text-sm underline text-foreground"
              >
                Отправить ещё одно
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs tracking-wide text-muted-foreground block mb-1.5">Имя</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Ваше имя"
                  className="w-full border border-border px-4 py-3 text-sm outline-none focus:border-foreground transition-colors"
                />
              </div>
              <div>
                <label className="text-xs tracking-wide text-muted-foreground block mb-1.5">Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="your@email.com"
                  className="w-full border border-border px-4 py-3 text-sm outline-none focus:border-foreground transition-colors"
                />
              </div>
              <div>
                <label className="text-xs tracking-wide text-muted-foreground block mb-1.5">Сообщение</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Ваш вопрос или комментарий..."
                  className="w-full border border-border px-4 py-3 text-sm outline-none focus:border-foreground transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-foreground text-background py-4 text-sm tracking-widest uppercase hover:opacity-80 transition-opacity"
              >
                Отправить
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
