import { CheckCircle2, ArrowRight } from "lucide-react";

interface HomeAboutSectionProps {
  onReadMore: () => void;
}

export default function HomeAboutSection({ onReadMore }: HomeAboutSectionProps) {
  const points = [
    "Traditional Wooden Ghani Extraction",
    "Directly Sourced from Organic Farmers",
    "Zero Chemicals & No Added Preservatives",
    "Keeps Natural Nutrients Intact",
    "Purest Quality for Healthy Life"
  ];

  return (
    <section className="py-20 md:py-20 bg-white overflow-hidden">
      <div className="container mx-auto max-w-7xl px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
          
          {/* Left: Circular Image Montage */}
          <div className="flex-1 relative animate-fadeIn w-full max-w-[400px] md:max-w-none mx-auto">
            <div className="relative aspect-square md:aspect-square">
              <div className="absolute inset-4 md:inset-0 rounded-full overflow-hidden border-[10px] md:border-[15px] border-white shadow-2xl z-10">
                <img 
                  src="https://res.cloudinary.com/dd4oiwnep/image/upload/v1765181679/ChatGPT_Image_Dec_8_2025_01_44_09_PM_nfxzit.png" 
                  alt="Traditional Methods"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating Content */}
              <div className="absolute bottom-2 right-2 md:-bottom-6 md:-right-6 bg-zinc-900 text-white p-5 md:p-8 rounded-[25px] md:rounded-[40px] shadow-2xl z-20 transition-all duration-500 hover:scale-110">
                <div className="text-[20px] md:text-[36px] font-bold leading-none">10+</div>
                <div className="text-[8px] md:text-xs uppercase font-bold tracking-[0.2em] leading-none mt-2 text-white/80">Years of Trust</div>
              </div>

              {/* Decorative Ring */}
              <div className="absolute -inset-2 md:-inset-10 rounded-full border-2 border-[#9EA233]/10 border-dashed animate-spin-slow"></div>
            </div>
          </div>

          {/* Right: Story Content */}
          <div className="flex-1 space-y-10 animate-fadeInUp">
            <div>
              <span className="text-base font-medium text-[#9EA233] uppercase tracking-[0.3em] mb-4 block">Our Heritage</span>
              <h2 className="text-[36px] font-medium text-gray-900 tracking-tight leading-tight">
                The Essence of <br />
                <span className="text-[#9EA233]">Purity & Tradition</span>
              </h2>
            </div>
            
            <p className="text-gray-500 font-medium leading-relaxed text-[16px]">
              Prakruthi cold pressed oils is born from a vision to bring back the lost purity of traditional cooking. We believe that what you eat determines how you live. Our processes are designed to honor nature at every step.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {points.map((point, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-800 font-medium text-base">
                  <CheckCircle2 className="w-5 h-5 text-zinc-900 flex-shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <button 
              onClick={onReadMore}
              className="group flex items-center gap-3 px-8 py-4 bg-zinc-900 text-white rounded-md font-medium text-base uppercase tracking-widest hover:bg-[#9EA233] transition-all shadow-xl"
            >
              Read More Story
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
