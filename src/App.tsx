import { useEffect, useState } from "react";
import { CartProvider } from "./context/CartContext";
import { DataProvider } from "./context/DataContext";

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
import MobileBottomBar from "./components/MobileBottomBar";

// Admin Auth and Pages
import { AdminAuthProvider, useAdminAuth } from "./context/AdminAuthContext";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboard from "./pages/AdminDashboard";

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
  | "gallery"
  | "admin-login"
  | "admin-dashboard";

function App() {
  const getInitialPage = (): Page => {
    const pathname = window.location.pathname;
    if (pathname === '/admin-login' || pathname === '/admin') {
      return 'admin-login';
    }
    if (pathname === '/admin-dashboard') {
      return 'admin-dashboard';
    }

    const params = new URLSearchParams(window.location.search);
    const pageParam = params.get('page');
    if (pageParam === 'admin-login' || pageParam === 'admin') {
       return 'admin-login';
    }
    return "home";
  };

  const [currentPage, setCurrentPage] = useState<Page>(getInitialPage());
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
    let newUrl = "/";
    if (page === "admin-login") newUrl = "/admin-login";
    else if (page === "admin-dashboard") newUrl = "/admin-dashboard";
    else newUrl = "/"; // default logic without strict URL paths for legacy support

    window.history.pushState({ page }, "", newUrl);
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

      case "admin-login":
        return (
          <AdminLoginPage 
            onBack={() => navigateWithHistory("home")} 
            onLoginSuccess={() => navigateWithHistory("admin-dashboard")} 
          />
        );

      case "admin-dashboard":
        return <AdminProtectedRoute><AdminDashboard onLogout={() => navigateWithHistory("home")} /></AdminProtectedRoute>;

      default:
        return <HomePage onCategoryClick={handleCategoryClick} onViewProduct={handleViewDetails} onNavigate={handleNavigate} />;
    }
  };

  return (
    <AdminAuthProvider>
      <DataProvider>
        <CartProvider>
          <div className={`min-h-screen bg-white overflow-x-hidden ${currentPage === 'cart' || currentPage === 'checkout' ? 'pb-0' : 'pb-20 md:pb-0'}`}>
          {/* Hide Navbar and Footer on Admin pages if preferred, but for now we'll show them or we can conditionally hide them */}
          {currentPage !== 'admin-login' && currentPage !== 'admin-dashboard' && (
            <Navbar 
              onNavigate={handleNavigate} 
              currentPage={currentPage} 
              onSearch={handleSearch}
              onViewProduct={handleViewDetails}
            />
          )}

          <main>{renderPage()}</main>

          {currentPage !== 'admin-login' && currentPage !== 'admin-dashboard' && (
            <>
              <Footer
                onNavigate={handleNavigate}
                onCategoryClick={handleCategoryClick}
              />
              <div className="hidden md:block">
                <StickyCartIcon onClick={() => navigateWithHistory("cart")} />
              </div>
              
              {currentPage !== 'cart' && currentPage !== 'checkout' && (
                <>
                  <WhatsAppButton />
                  <div className="fixed bottom-6 left-6 z-[60] md:bottom-10 md:left-10 pointer-events-none scale-90 md:scale-100 origin-bottom-left">
                    <TrustedBadge className="shadow-xl md:shadow-2xl md:shadow-zinc-900/10 pointer-events-auto" />
                  </div>
                </>
              )}
              <MobileBottomBar onNavigate={navigateWithHistory} currentPage={currentPage} />
            </>
          )}
          </div>
        </CartProvider>
      </DataProvider>
    </AdminAuthProvider>
  );
}

// Simple Protected Route Component
const AdminProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAdmin, loading } = useAdminAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div></div>;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
        <p className="text-gray-600 mb-6">You do not have permission to view this page.</p>
        <button 
          onClick={() => window.location.href = '/admin-login'}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return <>{children}</>;
};

export default App;
