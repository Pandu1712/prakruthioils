import {
  Leaf,
  Heart,
  Award,
  Droplet,
  CheckCircle2,
  Sprout,
  Wheat,
  Recycle,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#fafaf6] pt-24 pb-24">

      {/* ===== HERO SECTION ===== */}
      <section className="container mx-auto px-6 text-center mb-24">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
          Pure, Traditional & Healthy —
          <span className="text-[#9EA233]"> Prakruthi Cold Oils</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mt-4">
          100% natural cold-pressed oils, organic millets, and premium ghee —
          crafted using traditional wooden ghani extraction for unmatched purity.
        </p>

        <div className="mt-10 flex justify-center">
          <img
            src="Banner1.png"
            alt="Prakruthi Oils"
            className="rounded-3xl w-full max-w-4xl shadow-2xl object-cover"
          />
        </div>
      </section>

      {/* ===== OUR STORY (NEW LAYOUT) ===== */}
      <section className="container mx-auto px-6 mb-24">
        <div className="grid md:grid-cols-2 gap-12 items-center bg-white p-10 rounded-3xl shadow-xl border border-[#9EA233]">

          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-5">
              Our Journey
            </h2>

            <p className="text-gray-700 leading-relaxed mb-4">
              Prakruthi Cold Oils began with a single mission — to revive India’s
              traditional nutrient-rich food culture through natural, chemical-free products.
            </p>

            <p className="text-gray-700 leading-relaxed mb-4">
              Every drop of oil is wooden cold-pressed, preserving antioxidants,
              aroma, and purity. Our ghee is prepared in small batches using
              bilona method, and our millets come from trusted organic farmers.
            </p>

            <p className="text-gray-700 leading-relaxed">
              With transparency and wellness as our foundation, we bring nature’s
              goodness straight to your home.
            </p>
          </div>

         <div className="relative w-full">
  <img
    src="https://res.cloudinary.com/dd4oiwnep/image/upload/v1765181679/ChatGPT_Image_Dec_8_2025_01_44_09_PM_nfxzit.png"
    alt="Our Story"
    className="
      w-full 
      rounded-3xl 
      shadow-2xl 
      object-cover 
      aspect-[16/9]     /* Desktop ratio */
      md:aspect-[4/3]    /* Tablet ratio */
      sm:aspect-[1/1]    /* Mobile square */
    "
  />
</div>

        </div>
      </section>

      {/* ===== WHAT WE OFFER (NEW DESIGN) ===== */}
      <section className="container mx-auto px-6 mb-24">
        <h2 className="text-3xl font-bold text-center mb-12">What We Offer</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            {
              icon: Droplet,
              title: "Cold Pressed Oils",
              desc: "Extracted using traditional wooden ghani machines to retain natural nutrients.",
            },
            {
              icon: Award,
              title: "Pure Desi Ghee",
              desc: "Hand-crafted using bilona method from grass-fed cow milk.",
            },
            {
              icon: Leaf,
              title: "Organic Millets",
              desc: "Wholesome grains grown naturally, without chemicals or pesticides.",
            },
            {
              icon: Heart,
              title: "Ayurvedic Wellness",
              desc: "Products that support digestion, immunity, and overall wellness.",
            },
            {
              icon: Sprout,
              title: "Sustainable Farming",
              desc: "We partner with eco-friendly farms that protect soil and biodiversity.",
            },
            {
              icon: Wheat,
              title: "Raw Ingredients",
              desc: "Premium quality nuts, seeds, and grains sourced responsibly.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-3xl shadow-lg border border-[#9EA233] hover:shadow-2xl transition"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#9EA233] text-white flex items-center justify-center mb-6">
                <item.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== MISSION (NEW DESIGN) ===== */}
      <section className="container mx-auto px-6 mb-24">
        <div className="bg-[#9EA233]/15 rounded-3xl p-14 shadow-lg border border-[#9EA233] text-center">

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Our Mission
          </h2>

          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-10 leading-relaxed">
            To provide natural, authentic, and nutrient-rich oils, ghee, and millets
            while supporting sustainable agriculture and empowering local farmers.
          </p>

          <div className="flex flex-wrap justify-center gap-8">
            {[
              "Zero Chemical Processing",
              "Eco-Friendly Packaging",
              "Ethical Sourcing",
              "Traditional Methods",
            ].map((v, idx) => (
              <div key={idx} className="flex items-center gap-2 text-lg text-gray-800">
                <CheckCircle2 className="w-6 h-6 text-[#9EA2339EA233]" />
                <span>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CORE VALUES (NEW LAYOUT) ===== */}
      <section className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>

        <div className="grid md:grid-cols-2 gap-10">
          {[
            {
              title: "Purity First",
              desc: "All products are 100% natural with no chemicals, preservatives or artificial flavor.",
              icon: Droplet,
            },
            {
              title: "Sustainability",
              desc: "We prioritize eco-friendly, earth-positive sourcing and packaging.",
              icon: Recycle,
            },
            {
              title: "Transparency",
              desc: "Honest labeling, clear sourcing, and full transparency from farm to home.",
              icon: Award,
            },
            {
              title: "Community Support",
              desc: "Empowering local farmers with fair pricing and long-term partnerships.",
              icon: Heart,
            },
          ].map((value, index) => (
            <div
              key={index}
              className="flex gap-4 bg-white p-7 rounded-3xl border border-[#9EA233] shadow-lg hover:shadow-2xl transition"
            >
              <div className="bg-[#9EA233] text-white p-3 rounded-xl">
                <value.icon className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {value.title}
                </h3>
                <p className="text-gray-700 mt-1">{value.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
