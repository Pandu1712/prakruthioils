import { useEffect, useState } from "react";
import { CartProvider } from "./context/CartContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CategoriesSection from "./components/CategoriesSection";

import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import GalleryPage from "./pages/GalleryPage";
import ReviewsPage from "./pages/ReviewsPage";

import StickyCartIcon from "./components/StickyCartIcon";
import WhatsAppButton from "./components/WhatsAppButton";

import { Product } from "./types";
import TrustedBadge from "./components/TrustedBadge";

type Page =
  | "home"
  | "products"
  | "product-detail"
  | "cart"
  | "checkout"
  | "contact"
  | "about"
  | "categories"
  | "reviews"
  | "gallery";

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state?.page) {
        setCurrentPage(event.state.page);
      } else {
        setCurrentPage("home");
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigateWithHistory = (page: Page) => {
    window.history.pushState({ page }, "", "");
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavigate = (page: string) => {
    if (page === "products") {
      setSelectedCategory("");
      setSearchQuery("");
    }
    navigateWithHistory(page as Page);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSelectedCategory(""); // clear category when searching from header
    navigateWithHistory("products");
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSearchQuery(""); // clear search when clicking category
    navigateWithHistory("products");
  };

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    navigateWithHistory("product-detail");
  };

  const handleCheckoutSuccess = () => {
    navigateWithHistory("home");
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return (
          <HomePage 
            onCategoryClick={handleCategoryClick} 
            onViewProduct={handleViewDetails} 
            onNavigate={handleNavigate}
          />
        );

      case "products":
        return (
          <ProductsPage
            categoryId={selectedCategory}
            initialSearchQuery={searchQuery}
            onBack={() => navigateWithHistory("home")}
            onViewDetails={handleViewDetails}
          />
        );

      case "product-detail":
        return (
          selectedProduct && (
            <ProductDetailPage
              product={selectedProduct}
              onBack={() => navigateWithHistory("products")}
            />
          )
        );

      case "cart":
        return (
          <CartPage
            onBack={() => navigateWithHistory("home")}
            onCheckout={() => navigateWithHistory("checkout")}
          />
        );

      case "checkout":
        return (
          <CheckoutPage
            onBack={() => navigateWithHistory("cart")}
            onSuccess={handleCheckoutSuccess}
          />
        );

      case "contact":
        return <ContactPage />;

      case "about":
        return <AboutPage />;

      case "categories":
        return <CategoriesSection onCategoryClick={handleCategoryClick} />;

      case "reviews":
        return <ReviewsPage onBack={() => navigateWithHistory("home")} />;

      case "gallery":
        return <GalleryPage onBack={() => navigateWithHistory("home")} />;

      default:
        return <HomePage onCategoryClick={handleCategoryClick} onViewProduct={handleViewDetails} />;
    }
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-white">
        <Navbar 
          onNavigate={handleNavigate} 
          currentPage={currentPage} 
          onSearch={handleSearch}
          onViewProduct={handleViewDetails}
        />

        <main>{renderPage()}</main>

        <Footer
          onNavigate={handleNavigate}
          onCategoryClick={handleCategoryClick}
        />

        <StickyCartIcon onClick={() => navigateWithHistory("cart")} />
        <WhatsAppButton />
        <TrustedBadge />
      </div>
    </CartProvider>
  );
}

export default App;
