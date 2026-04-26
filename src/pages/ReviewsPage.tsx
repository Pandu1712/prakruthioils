import { useEffect } from 'react';
import { ArrowLeft, MessageSquarePlus, Award } from 'lucide-react';

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
    <div className="min-h-screen bg-[#FFFEF9] pt-40 pb-24">
      <div className="container mx-auto px-6">
        
        {/* Cinematic Header */}
        <div className="mb-24 text-center">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-400 hover:text-[#9EA233] font-bold text-xs uppercase tracking-[0.3em] mb-8 mx-auto transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#9EA233]/10 text-[#7D8128] text-xs font-bold uppercase tracking-[0.3em] mb-10">
            <Award className="w-4 h-4" />
            <span>Customer Voices</span>
          </div>

          <h1 className="text-5xl md:text-8xl font-bold text-gray-900 tracking-tight leading-[1.1] mb-10">
            Stories of <br />
            <span className="text-[#9EA233]">Purity & Trust.</span>
          </h1>
          
          <p className="text-gray-500 font-medium max-w-2xl mx-auto text-lg leading-relaxed">
            Every drop we extract carries the trust of thousands of families. Read their experiences with Prakruthi cold pressed oils directly from Google.
          </p>
        </div>

        {/* Live Google Reviews Widget */}
        <div className="max-w-7xl mx-auto min-h-[500px]">
           <div className={`elfsight-app-${ELFSIGHT_WIDGET_ID} w-full`} data-elfsight-app-lazy></div>
        </div>

        {/* Simplified Contact CTA */}
        <div className="mt-32 text-center">
           <div className="max-w-xl mx-auto p-12 rounded-[50px] border-2 border-dashed border-gray-200 hover:border-[#9EA233] transition-colors group">
              <MessageSquarePlus className="w-12 h-12 text-[#9EA233] mx-auto mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Share Your Experience</h3>
              <p className="text-sm text-gray-500 font-medium mb-10 leading-relaxed">
                Your feedback helps us remain committed to our promise of purity.
              </p>
              <button 
                onClick={() => window.open('https://wa.me/918073516982?text=Hi, I want to share my feedback about Prakruthi cold pressed oils!', '_blank')}
                className="px-10 py-4 bg-[#9EA233] text-white rounded-md font-bold text-xs uppercase tracking-[0.2em] transform hover:scale-105 transition-all shadow-xl"
              >
                 Send Feedback via WhatsApp
              </button>
           </div>
        </div>

      </div>
    </div>
  );
}
