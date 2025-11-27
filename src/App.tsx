import { useEffect, useState } from 'react';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import StickyCartIcon from './components/StickyCartIcon';
import WhatsAppButton from './components/WhatsAppButton';
import { Product } from './types';
import CategoriesSection from './components/CategoriesSection';

type Page =
  | 'home'
  | 'categories'
  | 'products'
  | 'product-detail'
  | 'cart'
  | 'checkout'
  | 'contact'
  | 'about';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  /* -----------------------------------
     ENABLE BACK BUTTON / SWIPE SUPPORT
  -------------------------------------- */
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state?.page) {
        setCurrentPage(event.state.page);
      } else {
        // No more history → go to Home instead of closing site
        setCurrentPage('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  /* -----------------------------------
     NAVIGATION HELPERS (WITH HISTORY)
  -------------------------------------- */

  const navigateWithHistory = (page: Page) => {
    window.history.pushState({ page }, '', '');
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (page: string) => {
    navigateWithHistory(page as Page);
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    navigateWithHistory('products');
  };

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    navigateWithHistory('product-detail');
  };

  const handleCheckoutSuccess = () => {
    navigateWithHistory('home');
  };

  /* -----------------------------------
     PAGE RENDERING
  -------------------------------------- */

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onCategoryClick={handleCategoryClick} />;

      case 'categories':
        return <CategoriesSection onCategoryClick={handleCategoryClick} />;

      case 'products':
        return (
          <ProductsPage
            categoryId={selectedCategory}
            onBack={() => navigateWithHistory('home')}
            onViewDetails={handleViewDetails}
          />
        );

      case 'product-detail':
        return (
          selectedProduct && (
            <ProductDetailPage
              product={selectedProduct}
              onBack={() => navigateWithHistory('products')}
            />
          )
        );

      case 'cart':
        return (
          <CartPage
            onBack={() => navigateWithHistory('home')}
            onCheckout={() => navigateWithHistory('checkout')}
          />
        );

      case 'checkout':
        return (
          <CheckoutPage
            onBack={() => navigateWithHistory('cart')}
            onSuccess={handleCheckoutSuccess}
          />
        );

      case 'contact':
        return <ContactPage />;

      case 'about':
        return <AboutPage />;

      default:
        return <HomePage onCategoryClick={handleCategoryClick} />;
    }
  };

  /* -----------------------------------
     LAYOUT
  -------------------------------------- */

  return (
    <CartProvider>
      <div className="min-h-screen bg-white">
        <Navbar onNavigate={handleNavigate} currentPage={currentPage} />
        <main>{renderPage()}</main>
        <Footer onNavigate={handleNavigate} />
        <StickyCartIcon onClick={() => navigateWithHistory('cart')} />
        <WhatsAppButton />
      </div>
    </CartProvider>
  );
}

export default App;
