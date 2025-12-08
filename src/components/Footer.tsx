import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Droplet,
} from "lucide-react";

interface FooterProps {
  onNavigate: (page: string) => void;
  onCategoryClick: (categoryId: string) => void;
}

// SAME categories used in CategorySection
const footerCategories = [
  { id: "coldoils", name: "Cold Pressed Oils" },
  { id: "ghee", name: "Pure Ghee" },
  { id: "millets", name: "Organic Millets" },
];

export default function Footer({ onNavigate, onCategoryClick }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#9EA233] text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">

          {/* LOGO */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Droplet className="w-10 h-10 text-white" />
              <span className="text-2xl font-bold">Prakruthi Cold Oil</span>
            </div>

            <p className="text-white/90">
              Your trusted partner for 100% natural and organic products.
            </p>

            <div className="flex space-x-4 pt-4">
              <a
                href="https://www.facebook.com/share/1HTiWhMeen/"
                className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition"
              >
                <Facebook className="w-5 h-5" />
              </a>

              <a
                href="https://www.instagram.com/prakruthicoldpressedoils/"
                className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition"
              >
                <Instagram className="w-5 h-5" />
              </a>

              <a
                href="#"
                className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: "Home", id: "home" },
                { name: "Categories", id: "categories" },
                { name: "About Us", id: "about" },
                { name: "Contact", id: "contact" },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className="text-white/90 hover:text-white transition"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* PRODUCT CATEGORIES — FIXED */}
          <div>
            <h3 className="text-xl font-bold mb-4">Categories</h3>
            <ul className="space-y-3">
              {footerCategories.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => onCategoryClick(cat.id)}
                    className="text-white/90 hover:text-white transition"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT INFO */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5" />
                <span className="text-white/90">
                  SrikrishnaNandhu Nilayam, Opp Royamart Road <br />
                  Tatanagar, Bengaluru, Karnataka 560092, India
                </span>
              </li>

              <li className="flex items-start gap-3">
  <Phone className="w-5 h-5" />

  <span className="text-white/90 flex flex-col">
    <a href="tel:8073516982" className="hover:underline">
      +91 8073516982
    </a>
    <a href="tel:9160503662" className="hover:underline">
      +91 9160503662
    </a>
  </span>
</li>


              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5" />
                <a
                  href="mailto:prakruthioilsales@gmail.com"
                  className="text-white/90 hover:text-white"
                >
                  prakruthioilsales@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* FOOTER BOTTOM */}
        <div className="border-t border-white/30 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/90">
              © {currentYear} Prakruthi Cold Oils. All rights reserved.
            </p>

            <div className="flex space-x-6 mt-4 md:mt-0">
              <button className="text-white/90 hover:text-white text-sm">
                Privacy Policy
              </button>
              <button className="text-white/90 hover:text-white text-sm">
                Terms of Service
              </button>
              <button className="text-white/90 hover:text-white text-sm">
                Refund Policy
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
