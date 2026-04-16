import { ArrowLeft, Star, Quote, MessageSquarePlus, Award } from 'lucide-react';

interface Review {
  id: number;
  name: string;
  comment: string;
  rating: number;
  date: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Deepa N",
    comment: "I recently started using 'prakruthi cold pressed oils', and I must say the quality is excellent. I'm very satisfied and would definitely recommend it to anyone looking for healthy and natural cooking oils.",
    rating: 5,
    date: "Jan 2026"
  },
  {
    id: 2,
    name: "Dinesh Johna",
    comment: "I have used groundnut, sesame, and sunflower oils from here. All are good, natural, and genuine products at a decent price compared to online and other outlets.",
    rating: 5,
    date: "Dec 2025"
  },
  {
    id: 3,
    name: "Kumar Raju",
    comment: "The groundnut oil is fresh, has a nice natural aroma, and makes food taste great – perfect for daily cooking. The castor oil is thick and pure. Both oils feel natural and chemical-free.",
    rating: 5,
    date: "Nov 2025"
  },
  {
    id: 4,
    name: "Kaju Harshitha",
    comment: "I've been using Prakruthi Cold Pressed Oils for my daily cooking, and the quality is excellent. The oils are pure, aromatic, and much healthier than refined ones. Castor oil is must recommended!",
    rating: 5,
    date: "Oct 2025"
  },
  {
    id: 5,
    name: "Ramesh Babu",
    comment: "We have been using this oil from last week, very fresh and stomach is feeling happy.",
    rating: 5,
    date: "Sep 2025"
  },
  {
    id: 6,
    name: "Swarna Cheppali",
    comment: "This sesame oil is incredibly pure! Adds amazing flavor to my cooking. High quality, will buy again!",
    rating: 5,
    date: "Aug 2025"
  }
];

export default function ReviewsPage({ onBack }: { onBack: () => void }) {
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
            Every drop we extract carries the trust of thousands of families. Read their experiences with Prakruthi’s authentic cold-pressed oils.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {reviews.map((rev, i) => (
            <div 
              key={rev.id} 
              className="relative p-12 rounded-[50px] bg-white border-2 border-[#9EA233]/10 hover:border-[#9EA233] shadow-sm hover:shadow-2xl transition-all duration-700 animate-slideUp group"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <Quote className="absolute top-10 right-10 w-12 h-12 text-[#9EA233]/10 group-hover:text-[#9EA233]/20 transition-colors" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex gap-1 mb-8 text-[#9EA233]">
                   {[...Array(5)].map((_, starI) => (
                     <Star 
                       key={starI} 
                       className={`w-4 h-4 ${starI < rev.rating ? "fill-current" : "text-gray-200"}`} 
                     />
                   ))}
                </div>

                <p className="text-gray-700 font-medium italic mb-12 leading-relaxed text-lg flex-1">
                  "{rev.comment}"
                </p>

                <div className="flex items-center gap-4 border-t border-gray-50 pt-8 mt-auto">
                   <div className="w-12 h-12 rounded-full bg-[#9EA233] flex items-center justify-center text-white font-bold text-sm">
                      {rev.name[0]}
                   </div>
                   <div>
                      <h4 className="text-sm font-bold text-gray-900">— {rev.name}</h4>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{rev.date}</span>
                   </div>
                </div>
              </div>
            </div>
          ))}
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
                onClick={() => window.open('https://wa.me/918073516982?text=Hi, I want to share my feedback about Prakruthi Oils!', '_blank')}
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
