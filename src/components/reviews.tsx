import { Star } from "lucide-react";

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
      "I’ve been using Prakruthi cold pressed oils and I’m very happy with the quality.The groundnut oil is fresh, has a nice natural aroma, and makes food taste great – perfect for daily cooking.The castor oil is thick and pure, which works well.Both oils feel natural and chemical-free.Overall, very satisfied and would definitely recommend them.",
    rating: 4,
  },
  {
    id: 4,
    name: "Kaju Harshitha",
    comment:
      "I’ve been using Prakruthi Cold Pressed Oils for my daily cooking, and the quality is excellent. The oils are pure, aromatic, and much healthier than refined ones. Definitely worth the switch!Castor oil is must recommended!!",
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
    rating: 4,
  },
];

export default function ReviewsSection() {
  return (
    <section className="py-20 bg-[#FFFDF3] overflow-hidden">
      <div className="container mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
            What Our <span className="text-[#9EA233]">Customers Say</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mt-4">
            Trusted by hundreds of families for daily natural & chemical-free products.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {reviews.map((review, index) => (
            <div
              key={`${review.id}-${index}`}
              style={{ animationDelay: `${index * 120}ms` }}
              className="
                relative p-6 rounded-3xl shadow-xl
                bg-gradient-to-br from-[#fef08a]/50 to-[#9EA233]/40
                backdrop-blur-lg border border-[#d9f99d]/60
                animate-slideUp
                overflow-hidden
              "
            >
              {/* Rating Stars */}
              <div className="flex gap-1 mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-[#9EA233] fill-[#9EA233]"
                  />
                ))}
              </div>

              {/* Comment */}
              <p className="text-gray-800 text-base leading-relaxed mb-4">
                "{review.comment}"
              </p>

              {/* Name */}
              <h3 className="font-bold text-lg text-[#4a5c0f]">
                — {review.name}
              </h3>

              {/* Soft Glowing Circle */}
              <div className="absolute top-0 right-0 w-16 h-16 rounded-full bg-[#9EA233]/20 blur-xl opacity-70"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
