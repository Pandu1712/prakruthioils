import { ArrowRight, Star } from "lucide-react";

interface HeroSectionProps {
  onExplore: () => void;
}

export default function HeroSection({ onExplore }: HeroSectionProps) {
  return (
    <div className="relative pt-32 pb-2 md:pt-40 md:pb-4 overflow-hidden bg-[#FFFEF9]">
      {/* Background Dots/Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

      <div className="container mx-auto max-w-7xl px-6 md:px-12 relative flex flex-col md:flex-row items-center gap-12 lg:gap-20">
        
        {/* Left Content */}
        <div className="flex-1 text-center md:text-left animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/5 text-zinc-900 text-xs font-medium tracking-[0.3em] mb-8">
            <Star className="w-3 h-3 fill-current" />
            <span>Discover the Purest Purity</span>
          </div>
          
          <h1 className="text-[36px] md:text-[36px] font-medium text-zinc-900 leading-[1.1] mb-8 tracking-tight">
            Authentic <br />
            <span className="text-zinc-900">Cold Pressed.</span>
          </h1>
          
          <p className="text-base text-zinc-500 mb-10 max-w-xl leading-relaxed mx-auto md:mx-0 font-medium">
            Experience the rich heritage of traditional wood-pressed extraction. 100% natural, nutrient-dense, and chemical-free oils for your family's health.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
            <button 
              onClick={onExplore}
                className="px-8 py-4 bg-[#9EA233] text-white rounded-md font-medium text-base tracking-widest flex items-center gap-3 hover:bg-[#7D8128] transition-all transform hover:scale-105 shadow-xl"
            >
              Buy Now
            </button>
            <button 
              onClick={onExplore}
              className="px-8 py-4 bg-white border border-gray-200 text-gray-700 rounded-md font-medium text-base tracking-wider hover:border-[#9EA233] hover:text-[#9EA233] transition-all"
            >
              Explore Products
            </button>
          </div>

          <div className="mt-12 flex items-center gap-6 justify-center md:justify-start">
              <div className="flex flex-col">
                <span className="text-[24px] font-medium text-gray-900">10k+</span>
                <span className="text-xs text-gray-500 font-medium tracking-widest">Happy Customers</span>
              </div>
             <div className="w-px h-10 bg-gray-200"></div>
              <div className="flex flex-col">
                <span className="text-[24px] font-medium text-gray-900">100%</span>
                <span className="text-xs text-gray-500 font-medium tracking-widest">Organic & Pure</span>
              </div>
          </div>
        </div>

        {/* Right Content - Circular Image Box */}
        <div className="flex-1 relative animate-fadeInUp">
           <div className="relative w-full max-w-[500px] aspect-square mx-auto">
              {/* Main Circular Image */}
              <div className="absolute inset-0 rounded-full border-[15px] border-white shadow-2xl overflow-hidden z-10 transition-transform hover:scale-105 duration-700">
                 <img 
                    src="https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=2036&auto=format&fit=crop" 
                    alt="Authentic Oil"
                    className="w-full h-full object-cover"
                 />
              </div>

              {/* Decorative Circle Background */}
              <div className="absolute -inset-4 rounded-full border-2 border-dashed border-[#9EA233]/30 animate-spin-slow"></div>

              {/* Floating Badge */}
              <div className="absolute -top-4 right-4 z-20 bg-white p-4 rounded-2xl shadow-xl flex flex-col items-center">
                 <span className="text-[24px] font-medium text-zinc-900">100%</span>
                 <span className="text-xs font-medium text-gray-400 tracking-widest">Pure</span>
              </div>

              <div className="absolute -bottom-4 left-4 z-20 bg-white p-4 rounded-full shadow-xl">
                 <div
                    onClick={onExplore}
                    className="w-12 h-12 rounded-full bg-[#9EA233] flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform"
                 >
                    <ArrowRight className="w-6 h-6" />
                 </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}
