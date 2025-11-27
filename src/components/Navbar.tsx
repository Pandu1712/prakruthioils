import { useState, useEffect } from "react";
import { ShoppingCart, Menu, X, Droplet } from "lucide-react";
import { useCart } from "../context/CartContext";

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export default function Navbar({ onNavigate, currentPage }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getTotalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", id: "home" },
    { name: "Categories", id: "categories" },
    { name: "About Us", id: "about" },
    { name: "Contact", id: "contact" },
  ];

  const totalItems = getTotalItems();

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-[#9ACD32] shadow-lg py-2" : "bg-[#9ACD32] py-4"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">

          {/* Logo Section */}
          <div
            onClick={() => onNavigate("home")}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <Droplet className="w-9 h-9 text-white transition-all duration-300 group-hover:rotate-12 group-hover:scale-110" />
            <img
              src="/coldLogo.jpg"
              alt="Logo"
              className="w-14 h-14 object-cover rounded-full shadow-md transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`relative px-5 py-2 font-medium text-white transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl
                  ${currentPage === item.id ? "bg-white/20 text-white" : "bg-white/10 hover:bg-white/20"}
                  transform hover:-translate-y-1
                  `}
              >
                <span className="relative z-10">{item.name}</span>

                {/* Animated underline */}
                <span
                  className={`absolute left-0 bottom-0 h-[3px] rounded-full bg-white transition-all duration-300 ${
                    currentPage === item.id ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </button>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onNavigate("cart")}
              className="relative p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <ShoppingCart className="w-6 h-6 text-white" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg animate-slideDown">
          <div className="px-6 py-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 rounded-lg transition duration-300 ${
                  currentPage === item.id
                    ? "bg-[#9ACD32] text-white font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
