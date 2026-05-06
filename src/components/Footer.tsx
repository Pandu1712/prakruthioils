import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Clock,
  ArrowRight
} from "lucide-react";

interface FooterProps {
  onNavigate: (page: string) => void;
  onCategoryClick: (categoryId: string) => void;
}

const footerCategories = [
  { id: "coldoils", name: "Cold Pressed Oils" },
  { id: "ghee", name: "Pure Ghee" },
  { id: "millets", name: "Organic Millets" },
  { id: "snacks", name: "Healthy Snacks" },
];

export default function Footer({ onNavigate, onCategoryClick }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#EEF2C1] text-black pt-8 pb-6 overflow-hidden relative border-t border-black/5">
      <div className="container mx-auto max-w-7xl px-4 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-6">

          {/* About Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src="/coldLogo.jpg" alt="Logo" className="w-12 h-12 rounded-full border-2 border-white" />
              <div className="flex flex-col">
                <span className="text-2xl font-black text-black leading-none">Prakruthi Naturals</span>

              </div>
            </div>

            <p className="text-black/70 text-base font-medium leading-relaxed">
              We bring the ancient wisdom of cold-pressed extraction to your modern kitchen. 100% natural, ethical, and pure.
            </p>

            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-black hover:bg-black hover:text-white transition-all shadow-sm">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>

          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[18px] font-black uppercase tracking-widest text-black mb-3">Our Brands</h3>
            <ul className="space-y-4">
              {navItemsLinks.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className="flex items-center gap-2 text-black/70 hover:text-black transition-colors group text-base font-bold"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all font-bold" />
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-[18px] font-black uppercase tracking-widest text-black mb-3">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-black/5 flex-shrink-0 flex items-center justify-center text-black">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="text-black/70 text-base font-medium leading-relaxed">
                  No.839, 14th Cross Rd, A Block, <br />
                  Sahakar Nagar, Bengaluru, Karnataka
                </span>
              </li>
              <li className="flex gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-black/5 flex-shrink-0 flex items-center justify-center text-black">
                  <Mail className="w-5 h-5" />
                </div>
                <a href="mailto:prakruthioilsales@gmail.com" className="text-black/70 text-base font-medium hover:text-black transition-all">
                  prakruthioilsales@gmail.com
                </a>
              </li>
              <li className="flex gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-black/5 flex-shrink-0 flex items-center justify-center text-black">
                  <Phone className="w-5 h-5" />
                </div>
                <a href="tel:8073516982" className="text-black/70 text-base font-medium hover:text-black transition-all">
                  +91 80735 16982
                </a>
              </li>
            </ul>
          </div>

          {/* Office Links */}
          <div>
            <h3 className="text-[18px] font-black uppercase tracking-widest text-black mb-3">Our Hours</h3>
            <ul className="space-y-4">
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-black/5 flex-shrink-0 flex items-center justify-center text-black">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-black text-sm font-bold uppercase tracking-tight">All Days</span>
                  <div className="flex flex-col gap-1 mt-1">
                    <span className="text-black/60 text-xs font-medium">09:00 AM - 12:00 PM</span>
                    <span className="text-black/60 text-xs font-medium">04:30 PM - 09:15 PM</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-6 border-t border-black/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="text-black/40 text-[10px] font-black uppercase tracking-[0.2em]">
            © {currentYear} Prakruthi Naturals — All Rights Reserved.
          </span>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-black/40">
            <button className="hover:text-black transition-all">Privacy</button>
            <button className="hover:text-black transition-all">Terms</button>
            <button className="hover:text-black transition-all">Cookies</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

const navItemsLinks = [
  { name: "About", id: "about" },
  { name: "Shop", id: "products" },
  { name: "Gallery", id: "gallery" },
  { name: "Reviews", id: "reviews" },
  { name: "Contact", id: "contact" },
];
