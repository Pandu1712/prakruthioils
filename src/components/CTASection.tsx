import { MessageCircle, PhoneCall } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-20 bg-[#FFFEF9]">
      <div className="container mx-auto px-6">
        <div className="relative bg-[#3d0a0a] rounded-[50px] p-12 md:p-24 overflow-hidden shadow-2xl">
          {/* Diagonal Pattern Overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
               style={{ backgroundImage: 'linear-gradient(45deg, #fff 25%, transparent 25%, transparent 50%, #fff 50%, #fff 75%, transparent 75%, transparent)', backgroundSize: '40px 40px' }}></div>
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <h2 className="text-[36px] font-black text-white tracking-tight mb-8">Ready to Order?</h2>
            
            <p className="text-white/60 text-[16px] font-medium max-w-2xl mb-12">
              Experience the pure goodness of cold-pressed oils. Order now for home delivery and start your wellness journey.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-8">
              <button 
                onClick={() => window.open('https://wa.me/918073516982', '_blank')}
                className="px-8 py-4 bg-[#C1C644] text-white rounded-md font-black text-[12px] uppercase tracking-widest flex items-center gap-3 hover:bg-[#9EA233] transition-all transform hover:scale-105 shadow-xl"
              >
                <MessageCircle className="w-5 h-5" /> Order on WhatsApp
              </button>
              
              <div className="flex items-center gap-2 text-white/40 font-bold uppercase tracking-widest text-[10px]">
                <span className="w-8 h-px bg-white/10"></span>
                <span>or call now</span>
                <span className="w-8 h-px bg-white/10"></span>
              </div>

              <a href="tel:8073516982" className="flex items-center gap-2 text-[20px] font-black text-white hover:text-[#9EA233] transition-colors leading-none">
                <PhoneCall className="w-5 h-5 text-[#9EA233]" /> 
                <span>8073516982</span>
              </a>
            </div>
          </div>

          {/* Decorative Corner */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#9EA233]/5 blur-3xl rounded-full -ml-16 -ml-16"></div>
        </div>
      </div>
    </section>
  );
}
