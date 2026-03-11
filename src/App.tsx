import { useState } from "react";
import Navbar from "@/components/Navbar";
import HomePage from "@/pages/HomePage";
import CatalogPage from "@/pages/CatalogPage";
import ProductPage from "@/pages/ProductPage";
import CartPage from "@/pages/CartPage";
import ProfilePage from "@/pages/ProfilePage";
import ContactsPage from "@/pages/ContactsPage";
import FAQPage from "@/pages/FAQPage";

type Page = "home" | "catalog" | "product" | "cart" | "profile" | "contacts" | "faq";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [productId, setProductId] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = (page: Page, id?: number) => {
    if (page === "product" && id !== undefined) {
      setProductId(id);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background font-body">
      <Navbar
        currentPage={currentPage}
        onNavigate={navigate}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main>
        {currentPage === "home" && <HomePage onNavigate={navigate} />}
        {currentPage === "catalog" && (
          <div className="pt-16">
            <CatalogPage onNavigate={navigate} searchQuery={searchQuery} />
          </div>
        )}
        {currentPage === "product" && (
          <ProductPage productId={productId} onNavigate={navigate} />
        )}
        {currentPage === "cart" && <CartPage onNavigate={navigate} />}
        {currentPage === "profile" && <ProfilePage onNavigate={navigate} />}
        {currentPage === "contacts" && <ContactsPage />}
        {currentPage === "faq" && <FAQPage />}
      </main>
    </div>
  );
}
