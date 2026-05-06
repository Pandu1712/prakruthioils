import {
  CheckCircle2,
  ArrowLeft
} from "lucide-react";

export default function AboutPage({ onBack }: { onBack: () => void }) {
  const points = [
    "Traditional Wooden Ghani Extraction",
    "Directly Sourced from Organic Farmers",
    "Zero Chemicals & No Added Preservatives",
    "Keeps Natural Nutrients Intact",
    "Purest Quality for Healthy Life"
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFD] pt-40 md:pt-48 pb-24">
      <div className="container mx-auto max-w-7xl px-6 md:px-12">

        {/* Header */}
        <div className="mb-10">
          <button
            onClick={onBack}
            className="group flex items-center gap-3 text-gray-400 hover:text-[#9EA233] font-medium text-base tracking-widest mb-3 transition-all"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>

          <h1 className="text-[30px] font-bold text-gray-900 tracking-tight leading-none mb-2">
            Our <span className="text-[#9EA233]">Heritage.</span>
          </h1>
          <p className="text-sm md:text-base text-gray-500 font-medium leading-relaxed">
            At Prakruthi Naturals, we believe in the intelligence of nature and ancient traditions.
          </p>
        </div>

        {/* ===== OUR STORY SECTION (PREMIUM) ===== */}
        <section className="py-12 bg-white overflow-hidden rounded-[40px] border border-zinc-100 shadow-sm">
          <div className="container mx-auto px-6 md:px-12">
            <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
              {/* Left: Content */}
              <div className="flex-1 space-y-8">
                <div>
                  <h2 className="text-2xl md:text-4xl font-bold text-gray-900 tracking-tight leading-tight">
                    Honoring the <span className="text-[#9EA233]">Ancient Ghani</span>
                  </h2>
                </div>

                <div className="space-y-6 text-gray-500 font-medium leading-relaxed text-lg">
                  <p>
                    Prakruthi Naturals was born from a simple realization: the soul of great cooking lies in the purity of its foundation. Modern refinement strips away the very nutrients our bodies crave.
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
              <div className="flex-1 relative">
                <div className="relative w-full aspect-square max-w-[400px] mx-auto">
                  <div className="absolute inset-0 rounded-[30px] md:rounded-[60px] overflow-hidden shadow-2xl border-[8px] md:border-[15px] border-white group">
                    <img
                      src="https://res.cloudinary.com/dd4oiwnep/image/upload/v1765181679/ChatGPT_Image_Dec_8_2025_01_44_09_PM_nfxzit.png"
                      alt="Traditional Methods"
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== STATS SECTION (PURE WISDOM) ===== */}
        <section className="mt-20 text-center">
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              Pure <span className="text-[#9EA233]">Wisdom,</span>
            </h2>
            <p className="text-[10px] md:text-[14px] font-black text-[#9EA233] uppercase tracking-[0.3em] mb-6 md:mb-8">
              Traditional Roots.
            </p>
            <p className="text-[16px] text-gray-500 font-medium leading-relaxed max-w-2xl mx-auto">
              At Prakruthi cold pressed oils, we believe in the intelligence of nature.
              Our oils are extracted using ancient wooden Ghani methods to preserve every drop of vital nutrition.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            { [
              { label: "Happy Customers", value: "5000+" },
              { label: "Organic Farms", value: "50+" },
              { label: "Purity Rate", value: "100%" }
            ].map((stat, i) => (
              <div key={i} className="bg-white p-6 md:p-10 rounded-3xl md:rounded-[40px] border border-zinc-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group">
                <p className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-3 group-hover:text-[#9EA233] transition-colors">{stat.value}</p>
                <p className="text-[10px] md:text-[12px] font-black text-[#9EA233] uppercase tracking-[0.2em]">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
