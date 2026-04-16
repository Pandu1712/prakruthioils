import { Star, Quote } from "lucide-react";

interface Review {
  id: number;
  name: string;
  comment: string;
  rating: number;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Deepa N",
    comment:
      "I recently started using 'prakruthi cold pressed oils', and I must say the quality is excellent, I'm very satisfied and would definitely recommend it to anyone who looking for a healthy and natural cooking oils.",
    rating: 5,
  },
  {
    id: 2,
    name: "Dinesh Johna",
    comment:
      "I have used groundnut, sesame, and sunflower oils from here. All are good, natural, and genuine products at a decent price to compare online and other out lets.",
    rating: 5,
  },
  {
    id: 3,
    name: "Kumar Raju",
    comment:
      "I’ve been using Prakruthi cold pressed oils and I’m very happy with the quality. The groundnut oil is fresh, has a nice natural aroma, and makes food taste great – perfect for daily cooking.",
    rating: 5,
  },
  {
    id: 4,
    name: "Kaju Harshitha",
    comment:
      "I’ve been using Prakruthi Cold Pressed Oils for my daily cooking, and the quality is excellent. The oils are pure, aromatic, and much healthier than refined ones. Definitely worth the switch!",
    rating: 5,
  },
  {
    id: 5,
    name: "Ramesh Babu",
    comment:
      "We have been using this oil from last week, very fresh and stomach is feeling happy.",
    rating: 5,
  },
  {
    id: 6,
    name: "Swarna Cheppali",
    comment:
      "This sesame oil is incredibly pure! Adds amazing flavor to my cooking. High quality, will buy again!",
    rating: 5,
  }
];

export default function ReviewsSection() {
  return (
    <section className="py-24 bg-white overflow-hidden relative">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Heading */}
        <div className="text-center mb-16">
          <span className="text-xs font-black uppercase tracking-[0.3em] text-[#9EA233] mb-4 block">Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">What Our Customers Say</h2>
        </div>

        {/* 3x3 Style Grid (using responsive grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div
              key={review.id}
              className="group relative p-8 rounded-[30px] bg-white border-2 border-[#9EA233]/10 hover:border-[#9EA233] transition-all duration-500 shadow-sm hover:shadow-xl animate-slideUp"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Quote Icon */}
              <Quote className="absolute top-6 right-8 w-10 h-10 text-[#9EA233]/10 group-hover:text-[#9EA233]/20 transition-colors" />
              
              {/* Rating Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(review.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-[#9EA233] fill-[#9EA233]"
                  />
                ))}
              </div>

              {/* Comment */}
              <p className="text-gray-700 font-medium italic mb-8 leading-relaxed">
                "{review.comment}"
              </p>

              {/* User Info */}
              <div className="flex items-center gap-4 border-t border-gray-50 pt-6">
                 <div className="w-10 h-10 rounded-full bg-[#9EA233] flex items-center justify-center text-white font-black text-xs">
                    {review.name[0]}
                 </div>
                 <div>
                    <h3 className="font-black text-sm text-gray-900">— {review.name}</h3>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Verified Buyer</span>
                 </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Link (Optional, kept for premium feel) */}
        <div className="mt-16 text-center">
            <button className="text-sm font-black uppercase tracking-widest text-gray-400 hover:text-[#9EA233] transition-colors border-b border-gray-100 hover:border-[#9EA233] pb-2">
                Read More Reviews
            </button>
        </div>

      </div>
    </section>
  );
}
