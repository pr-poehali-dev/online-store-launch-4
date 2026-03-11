import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { cartStore } from "@/store/cartStore";

type Page = "home" | "catalog" | "product" | "cart" | "profile" | "contacts" | "faq";

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page, id?: number) => void;
  searchQuery: string;
  onSearchChange: (v: string) => void;
}

export default function Navbar({ currentPage, onNavigate, searchQuery, onSearchChange }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const unsub = cartStore.subscribe(() => setCartCount(cartStore.count()));
    return unsub;
  }, []);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks: { label: string; page: Page }[] = [
    { label: "Каталог", page: "catalog" },
    { label: "Контакты", page: "contacts" },
    { label: "FAQ", page: "faq" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-sm border-b border-border shadow-sm" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => onNavigate("home")}
            className="font-display text-2xl font-light tracking-widest uppercase hover:opacity-70 transition-opacity"
          >
            Forma
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <button
                key={l.page}
                onClick={() => onNavigate(l.page)}
                className={`text-sm tracking-wide transition-colors ${
                  currentPage === l.page
                    ? "text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l.label}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="hidden md:flex items-center">
              {searchOpen ? (
                <div className="flex items-center border-b border-foreground">
                  <input
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => {
                      onSearchChange(e.target.value);
                      if (currentPage !== "catalog") onNavigate("catalog");
                    }}
                    placeholder="Поиск товаров..."
                    className="w-48 text-sm outline-none bg-transparent py-1 pr-2"
                    onBlur={() => { if (!searchQuery) setSearchOpen(false); }}
                  />
                  <button
                    onClick={() => { setSearchOpen(false); onSearchChange(""); }}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Icon name="X" size={16} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Icon name="Search" size={18} />
                </button>
              )}
            </div>

            <button
              onClick={() => onNavigate("profile")}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon name="User" size={18} />
            </button>

            <button
              onClick={() => onNavigate("cart")}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors relative"
            >
              <Icon name="ShoppingBag" size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-foreground text-background text-[10px] font-medium rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu */}
            <button
              className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Icon name={menuOpen ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="md:hidden pb-3 -mt-1">
          <div className="flex items-center border border-border rounded px-3 py-2 gap-2">
            <Icon name="Search" size={15} className="text-muted-foreground" />
            <input
              value={searchQuery}
              onChange={(e) => {
                onSearchChange(e.target.value);
                if (currentPage !== "catalog") onNavigate("catalog");
              }}
              placeholder="Поиск товаров..."
              className="flex-1 text-sm outline-none bg-transparent"
            />
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <div className="md:hidden border-t border-border bg-white">
          {navLinks.map((l) => (
            <button
              key={l.page}
              onClick={() => { onNavigate(l.page); setMenuOpen(false); }}
              className={`w-full text-left px-6 py-3 text-sm border-b border-border last:border-0 transition-colors ${
                currentPage === l.page ? "font-medium" : "text-muted-foreground"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
