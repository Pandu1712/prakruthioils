export default function HeroBanner() {
  return (
    <div className="mt-10 relative w-full h-[600px] md:h-[700px] overflow-hidden bg-gray-900">
      
      {/* Background Image */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent z-10"></div>

        <img
          src="https://res.cloudinary.com/dd4oiwnep/image/upload/v1765181679/ChatGPT_Image_Dec_8_2025_01_44_09_PM_nfxzit.png"
          alt="Natural Products"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Text Content */}
      <div className="absolute inset-0 z-20 flex items-center">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-2xl">

            {/* Animated Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4
              opacity-0 translate-y-10 animate-fadeInUp">
              100% Natural & Pure Oils 
            </h1>

            {/* Animated Subtitle */}
            <p className="text-xl md:text-2xl text-gray-200 mb-8
              opacity-0 translate-y-10 animate-fadeInUp animation-delay-300">
             "Welcome to our Organic Pure Cold Pressed Oils Shop! We produce premium organic oils from groundnut, sesame, castor, and coconut using traditional cold-press methods. Our oils retain natural nutrients, ideal for cooking, skincare, and wellness. We also offer raw materials like organic seeds and nuts. Experience pure, sustainable goodness with every drop!"
            </p>

            {/* Button (Optional) */}
            {/* 
            <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold
              opacity-0 translate-y-10 animate-fadeInUp animation-delay-500">
              Shop Now
            </button>
            */}
          </div>
        </div>
      </div>
    </div>
  );
}
