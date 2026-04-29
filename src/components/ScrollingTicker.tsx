import { Truck, Droplet, ShieldCheck, PhoneCall, Leaf, Star } from "lucide-react";

export default function ScrollingTicker() {
  const tickerItems = [
    { text: "FREE DELIVERY ON ORDERS ABOVE ₹1500", Icon: Truck, image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=100&auto=format&fit=crop" },
    { text: "100% PURE COLD PRESSED OILS", Icon: Droplet, image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=100&auto=format&fit=crop" },
    { text: "NO CHEMICALS OR PRESERVATIVES", Icon: ShieldCheck, image: "/coldLogo.jpg" },
    { text: "CONTACT US: +91 80735 16982", Icon: PhoneCall, image: "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?q=80&w=100&auto=format&fit=crop" },
    { text: "TRADITIONAL WOOD PRESSED EXTRACTION", Icon: Leaf, image: "https://images.unsplash.com/photo-1536993165279-22a2bbfa7969?q=80&w=100&auto=format&fit=crop" },
  ];

  return (
    <div className="bg-[#1E4620] py-4 overflow-hidden border-y border-[#D4AF37]/40 relative flex items-center shadow-2xl select-none">
      {/* Gradient fading on edges for a premium continuous look */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#1E4620] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#1E4620] to-transparent z-10 pointer-events-none"></div>

      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            display: inline-flex;
            white-space: nowrap;
            animation: marquee 50s linear infinite;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}
      </style>
      <div className="animate-marquee items-center gap-8 pl-8">
        {/* Render multiple times for seamless infinite scrolling loop */}
        {[...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems].map((item, index) => (
          <div key={index} className="flex items-center gap-8 group cursor-default">
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#D4AF37]/10 flex items-center justify-center group-hover:bg-[#D4AF37] transition-colors duration-500 shadow-sm border border-[#D4AF37]/20">
                <item.Icon className="w-4 h-4 text-[#D4AF37] group-hover:text-[#1E4620] transition-colors duration-500" />
              </div>
              <span className="text-[11px] md:text-[13px] font-bold tracking-[0.2em] uppercase text-white/95 drop-shadow-md">
                {item.text}
              </span>
            </div>
            
            {/* Premium Separator: Image + Star */}
            <div className="flex items-center gap-4 opacity-80 group-hover:opacity-100 transition-opacity duration-500">
               <Star className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]/50" />
               <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/10 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                  <img src={item.image} alt="separator" className="w-full h-full object-cover filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 hover:scale-110" />
               </div>
               <Star className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]/50" />
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}
