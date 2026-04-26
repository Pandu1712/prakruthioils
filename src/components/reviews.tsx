import { useEffect } from "react";
import { Star } from "lucide-react";

export default function ReviewsSection() {
  
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
    <section className="py-16 md:py-20 bg-[#FAFAFA] overflow-hidden relative">
      <div className="container mx-auto max-w-7xl px-6 md:px-12 relative z-10">
        
        {/* Heading */}
        <div className="text-center mb-16">
          <span className="text-xs font-medium tracking-[0.3em] text-zinc-900 mb-4 block">Trusted by Locals</span>
          <h2 className="text-[36px] font-medium text-zinc-900 tracking-tight leading-none">Google Reviews</h2>
        </div>

        {/* Widget Container */}
        <div className="max-w-6xl mx-auto min-h-[400px] flex items-center justify-center bg-white rounded-3xl border border-zinc-200 shadow-sm p-8">
           {ELFSIGHT_WIDGET_ID === "YOUR_WIDGET_ID_HERE" ? (
              <div className="text-center bg-zinc-50 p-8 rounded-2xl border border-zinc-200">
                 <p className="text-lg font-medium text-zinc-900 mb-2">Google Reviews Widget Ready</p>
                 <p className="text-sm font-medium text-zinc-500 max-w-md mx-auto mb-6">
                    Create a free account at <strong>Elfsight.com</strong>, build a Google Reviews widget, and paste your Widget ID in the code to display live reviews.
                 </p>
                 <code className="bg-zinc-200 px-4 py-2 rounded-lg text-zinc-800 font-mono text-sm block max-w-sm mx-auto">
                    src/components/reviews.tsx
                 </code>
              </div>
           ) : (
              // The actual widget div that Elfsight targets
              <div className={`elfsight-app-${ELFSIGHT_WIDGET_ID} w-full`} data-elfsight-app-lazy></div>
           )}
        </div>

      </div>
    </section>
  );
}
