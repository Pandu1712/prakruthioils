import {
  Leaf,
  Heart,
  Award,
  Droplet,
  CheckCircle2,
  Sprout,
  Wheat,
  ArrowRight,
} from "lucide-react";

export default function AboutPage() {
  const points = [
    "Traditional Wooden Ghani Extraction",
    "Directly Sourced from Organic Farmers",
    "Zero Chemicals & No Added Preservatives",
    "Keeps Natural Nutrients Intact",
    "Purest Quality for Healthy Life"
  ];

  const values = [
    {
      icon: Droplet,
      title: "Purity First",
      desc: "All products are 100% natural with no chemicals, preservatives or artificial flavor.",
    },
    {
      icon: Leaf,
      title: "Sustainability",
      desc: "We prioritize eco-friendly, earth-positive sourcing and packaging.",
    },
    {
      icon: Award,
      title: "Transparency",
      desc: "Honest labeling, clear sourcing, and full transparency from farm to home.",
    },
    {
      icon: Heart,
      title: "Empowerment",
      desc: "Empowering local farmers with fair pricing and long-term partnerships.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFFEF9]">
      
      {/* ===== CINEMATIC HERO SECTION ===== */}
      <section className="relative pt-32 md:pt-40 pb-16 md:pb-24 overflow-hidden bg-white">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        
        <div className="relative z-10 text-center px-6">
          <span className="text-[14px] font-bold text-[#9EA233] uppercase tracking-[0.4em] mb-6 block animate-fadeIn">Our Heritage</span>
          <h1 className="text-[36px] md:text-[48px] font-bold text-gray-900 tracking-tight leading-[1.1] mb-8 animate-slideUp">
            Pure Wisdom, <br />
            <span className="text-[#9EA233]">Traditional Roots.</span>
          </h1>
          <p className="text-[16px] text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            At Prakruthi cold pressed oils, we believe in the intelligence of nature. Our oils are extracted using ancient wooden Ghani methods to preserve every drop of vital nutrition.
          </p>
        </div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <section className="container mx-auto max-w-7xl px-6 md:px-12 -mt-16 md:-mt-20 relative z-10 mb-20 md:mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             { label: "Happy Customers", value: "10,000+" },
             { label: "Organic Farms", value: "50+" },
             { label: "Purity Rate", value: "100%" }
           ].map((stat, i) => (
             <div key={i} className="bg-white p-10 rounded-[40px] shadow-2xl border border-gray-100 flex flex-col items-center text-center animate-fadeInUp" style={{ animationDelay: `${i * 100}ms` }}>
                <span className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</span>
                <span className="text-xs font-bold text-[#9EA233] uppercase tracking-[0.2em]">{stat.label}</span>
             </div>
           ))}
        </div>
      </section>

      {/* ===== OUR STORY SECTION (PREMIUM) ===== */}
      <section className="py-16 md:py-20 bg-white overflow-hidden">
        <div className="container mx-auto max-w-7xl px-6 md:px-12">
          <div className="flex flex-col md:flex-row items-center gap-20">
            {/* Left: Content */}
            <div className="flex-1 space-y-10 animate-fadeInUp">
              <div>
                <span className="text-xs font-bold text-[#9EA233] uppercase tracking-[0.3em] mb-4 block">The Beginning</span>
                <h2 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight leading-[1.1]">
                  Honoring the <br />
                  <span className="text-[#9EA233]">Ancient Ghani</span>
                </h2>
              </div>
              
              <div className="space-y-6 text-gray-500 font-medium leading-relaxed text-lg">
                <p>
                  Prakruthi cold pressed oils was born from a simple realization: the soul of great cooking lies in the purity of its foundation. Modern refinement strips away the very nutrients our bodies crave.
                </p>
                <p>
                  By reviving the traditional wood-press method, we ensure that every bottle preserves the natural antioxidants, intense aroma, and therapeutic properties that nature intended.
                </p>
              </div>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {points.map((point, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-800 font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5 text-[#9EA233] flex-shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Premium Image Container */}
            <div className="flex-1 relative animate-fadeIn">
               <div className="relative w-full aspect-square max-w-[500px] mx-auto">
                 <div className="absolute inset-0 rounded-[80px] overflow-hidden shadow-2xl border-[20px] border-white group">
                    <img 
                      src="https://res.cloudinary.com/dd4oiwnep/image/upload/v1765181679/ChatGPT_Image_Dec_8_2025_01_44_09_PM_nfxzit.png" 
                      alt="Traditional Methods"
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                 </div>
                 <div className="absolute -inset-10 rounded-[100px] border-2 border-[#9EA233]/10 border-dashed animate-spin-slow"></div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CORE VALUES (GRID DESIGN) ===== */}
      <section className="py-16 md:py-20 bg-[#FFFEF9]">
        <div className="container mx-auto max-w-7xl px-6 md:px-12">
           <div className="text-center mb-16">
              <span className="text-xs font-bold text-[#9EA233] uppercase tracking-[0.3em] mb-4 block">Our DNA</span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">Built on Core Values</h2>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((v, i) => (
                <div key={i} className="bg-white p-10 rounded-[40px] border-2 border-[#9EA233]/10 hover:border-[#9EA233] transition-all duration-500 group shadow-sm hover:shadow-2xl">
                   <div className="w-16 h-16 rounded-2xl bg-[#9EA233]/10 text-[#9EA233] flex items-center justify-center mb-8 group-hover:bg-[#9EA233] group-hover:text-white transition-all">
                      <v.icon className="w-8 h-8" />
                   </div>
                   <h3 className="text-xl font-bold text-gray-900 mb-4 tracking-tight">{v.title}</h3>
                   <p className="text-sm text-gray-500 font-medium leading-relaxed">{v.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* ===== MISSION & EXTRA POINTS (CLEAN VERSION) ===== */}
      <section className="py-16 md:py-20 bg-white">
         <div className="container mx-auto max-w-7xl px-6 md:px-12">
            <div className="text-center mb-20">
               <span className="text-xs font-bold text-[#9EA233] uppercase tracking-[0.3em] mb-4 block">Our Commitment</span>
               <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">Our Mission & Vision</h2>
               <div className="w-20 h-1.5 bg-[#9EA233] mx-auto mt-6"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
               {[
                 { title: "Preserving Heritage", desc: "Reviving ancient wood-press methods that have nourished generations." },
                 { title: "100% Traceability", desc: "Every bottle can be traced back to the specific farm and batch." },
                 { title: "Farmer Empowerment", desc: "Ensuring fair pricing and sustainable livelihoods for our rural farmers." },
                 { title: "No Refined Junk", desc: "Absolutely zero chemical refining, bleaching, or deodorizing process." },
                 { title: "Vocal for Local", desc: "Strengthening our local economy by sourcing within our agricultural regions." },
                 { title: "Freshness Guaranteed", desc: "Small batch extraction ensures you get the freshest oil possible." },
                 { title: "Nutrient Dense", desc: "Cold extraction keeps vital Omega-3 and Vitamin E intact." },
                 { title: "Eco-Conscious", desc: "Reducing plastic waste through sustainable packaging initiatives." },
                 { title: "Pure Aroma", desc: "Experience the authentic, rich scent of pure extracted seeds." },
               ].map((point, i) => (
                 <div key={i} className="flex gap-4 group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full border border-[#9EA233]/20 flex items-center justify-center text-[#9EA233] group-hover:bg-[#9EA233] group-hover:text-white transition-all duration-300">
                       <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                       <h4 className="text-lg font-bold text-gray-900 mb-2">{point.title}</h4>
                       <p className="text-sm text-gray-500 font-medium leading-relaxed">{point.desc}</p>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

    </div>
  );
}
