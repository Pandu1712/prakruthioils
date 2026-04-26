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
import TrustedBadge from "./TrustedBadge";

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
    <footer className="bg-[#9EA233] text-white pt-24 pb-8 overflow-hidden relative">
      <div className="container mx-auto max-w-7xl px-4 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* About Column */}
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <img src="/coldLogo.jpg" alt="Logo" className="w-12 h-12 rounded-full border-2 border-white" />
              <div className="flex flex-col">
                <span className="text-2xl font-black text-white leading-none">Prakruthi cold pressed oils</span>
                <span className="text-xs uppercase tracking-widest text-white/80 font-bold mt-1">Cold Pressed Oils</span>
              </div>
            </div>

            <p className="text-white text-base font-medium leading-relaxed">
              We bring the ancient wisdom of cold-pressed extraction to your modern kitchen. 100% natural, ethical, and pure.
            </p>

            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/40 transition-all shadow-xl">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            <div className="pt-4">
               <TrustedBadge 
                 className="bg-transparent border-white/20 text-white !shadow-none" 
                 textColor="text-white" 
                 subtextColor="text-white/80" 
               />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[24px] font-black uppercase tracking-widest text-white mb-8">Our Brands</h3>
            <ul className="space-y-4">
              {navItemsLinks.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className="flex items-center gap-2 text-white hover:text-white/80 transition-colors group text-base font-bold"
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
            <h3 className="text-[24px] font-black uppercase tracking-widest text-white mb-8">Contact Us</h3>
            <ul className="space-y-6">
              <li className="flex gap-4 group">
                 <div className="w-10 h-10 rounded-xl bg-white/10 flex-shrink-0 flex items-center justify-center text-white">
                    <MapPin className="w-5 h-5" />
                 </div>
                  <span className="text-white text-base font-medium leading-relaxed">
                    No.839, 14th Cross Rd, A Block, <br />
                    Sahakar Nagar, Bengaluru, Karnataka
                  </span>
              </li>
              <li className="flex gap-4 group">
                 <div className="w-10 h-10 rounded-xl bg-white/10 flex-shrink-0 flex items-center justify-center text-white">
                    <Mail className="w-5 h-5" />
                 </div>
                  <a href="mailto:prakruthioilsales@gmail.com" className="text-white text-base font-medium hover:underline transition-all">
                     prakruthioilsales@gmail.com
                  </a>
              </li>
              <li className="flex gap-4 group">
                 <div className="w-10 h-10 rounded-xl bg-white/10 flex-shrink-0 flex items-center justify-center text-white">
                    <Phone className="w-5 h-5" />
                 </div>
                  <a href="tel:8073516982" className="text-white text-base font-medium hover:underline transition-all">
                     +91 80735 16982
                  </a>
              </li>
            </ul>
          </div>

          {/* Office Links */}
          <div>
            <h3 className="text-lg font-black uppercase tracking-widest text-white mb-8">Our Hours</h3>
            <ul className="space-y-4">
               <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex-shrink-0 flex items-center justify-center text-white">
                     <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-white text-sm font-bold uppercase tracking-tight">Mon - Sat</span>
                    <span className="text-white text-xs font-medium">09:00 AM - 08:00 PM</span>
                  </div>
               </li>
               <li className="flex gap-4 opacity-50">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex-shrink-0 flex items-center justify-center text-white">
                     <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-white text-sm font-bold uppercase tracking-tight">Sunday</span>
                    <span className="text-white text-xs font-medium italic">Closed</span>
                  </div>
               </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-white/20 flex flex-col md:flex-row items-center justify-between gap-6">
           <span className="text-white text-[10px] font-black uppercase tracking-[0.2em]">
              © {currentYear} Prakruthi cold pressed oils — All Rights Reserved.
           </span>
           <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-white">
              <button className="hover:underline transition-all">Privacy</button>
              <button className="hover:underline transition-all">Terms</button>
              <button className="hover:underline transition-all">Cookies</button>
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
