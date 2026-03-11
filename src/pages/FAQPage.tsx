import { useState } from "react";
import { faqItems } from "@/data/products";
import Icon from "@/components/ui/icon";

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="max-w-3xl mx-auto px-6 pt-20 pb-24">
      <div className="pt-10 pb-16">
        <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase mb-2">Помощь</p>
        <h1 className="font-display text-6xl font-light">FAQ</h1>
      </div>

      <div className="space-y-0">
        {faqItems.map((item, i) => (
          <div key={i} className="border-b border-border">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between py-6 text-left"
            >
              <span className="font-medium pr-6">{item.question}</span>
              <span
                className={`flex-shrink-0 transition-transform duration-200 ${open === i ? "rotate-180" : ""}`}
              >
                <Icon name="ChevronDown" size={18} className="text-muted-foreground" />
              </span>
            </button>
            {open === i && (
              <div className="pb-6 text-sm text-muted-foreground leading-relaxed animate-fade-in">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-16 p-8 bg-secondary text-center">
        <h2 className="font-display text-2xl font-light mb-2">Не нашли ответ?</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Напишите нам — ответим в течение нескольких часов
        </p>
        <a
          href="mailto:info@forma.ru"
          className="inline-block bg-foreground text-background px-8 py-3 text-sm tracking-widest uppercase hover:opacity-80 transition-opacity"
        >
          Написать нам
        </a>
      </div>
    </div>
  );
}
