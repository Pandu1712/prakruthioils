import { useEffect } from 'react';
import { ArrowLeft, MessageSquarePlus } from 'lucide-react';

export default function ReviewsPage({ onBack }: { onBack: () => void }) {
  
  // LIVE ELFSIGHT WIDGET ID
  const ELFSIGHT_WIDGET_ID = "12d7ebe1-ea56-4027-8b4a-bbe7bfa7762e";

  useEffect(() => {
    // Dynamically inject the Elfsight script so it works perfectly in React
    const script = document.createElement("script");
    script.src = "https://elfsightcdn.com/platform.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

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
            Customer <span className="text-[#9EA233]">Reviews.</span>
          </h1>
          <p className="text-sm md:text-base text-gray-500 font-medium leading-relaxed">
            Every drop we extract carries the trust of thousands of families.
          </p>
        </div>

        {/* Live Google Reviews Widget */}
        <div className="max-w-7xl mx-auto min-h-[500px]">
           <div className={`elfsight-app-${ELFSIGHT_WIDGET_ID} w-full`} data-elfsight-app-lazy></div>
        </div>

        {/* Simplified Contact CTA */}
        <div className="mt-12 md:mt-20 text-center">
           <div className="max-w-xl mx-auto p-6 md:p-10 rounded-3xl md:rounded-[50px] border-2 border-dashed border-gray-100 hover:border-[#9EA233] transition-colors group">
              <MessageSquarePlus className="w-10 h-10 text-[#9EA233] mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Share Your Experience</h3>
              <p className="text-sm text-gray-500 font-medium mb-8 leading-relaxed">
                Your feedback helps us remain committed to our promise of purity.
              </p>
              <button 
                onClick={() => window.open('https://wa.me/918073516982?text=Hi, I want to share my feedback about Prakruthi Naturals!', '_blank')}
                className="px-8 py-3 bg-[#9EA233] text-white rounded-xl font-bold text-xs uppercase tracking-[0.2em] transform hover:scale-105 transition-all shadow-xl"
              >
                 Send Feedback via WhatsApp
              </button>
           </div>
        </div>

      </div>
    </div>
  );
}
