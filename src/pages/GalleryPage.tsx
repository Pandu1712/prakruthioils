import { ArrowLeft, ZoomIn } from 'lucide-react';
import { useData } from '../context/DataContext';

const galleryImages = [
  {
    url: "https://res.cloudinary.com/dd4oiwnep/image/upload/v1765181679/ChatGPT_Image_Dec_8_2025_01_44_09_PM_nfxzit.png",
    caption: "Traditional Wood Pressing"
  },
  {
    url: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=2036&auto=format&fit=crop",
    caption: "Pure Liquid Gold"
  },
  {
    url: "https://img1.exportersindia.com/product_images/bc-full/dir_115/3435522/organic-millets-1762979.jpg",
    caption: "Organic Millets Source"
  },
  {
    url: "https://ishavasyamproducts.com/cdn/shop/products/9.jpg?v=1634646181",
    caption: "Natural Wild Honey"
  },
  {
    url: "https://images.unsplash.com/photo-1610450938010-0925232d399c?q=80&w=2070&auto=format&fit=crop",
    caption: "Fresh Coconut Extraction"
  },
  {
    url: "https://images.unsplash.com/photo-1598236187930-bc537021f1e9?q=80&w=2070&auto=format&fit=crop",
    caption: "Premium Bottle Packaging"
  },
  {
    url: "https://images.unsplash.com/photo-1510629954389-c1e0da47d414?q=80&w=2036&auto=format&fit=crop",
    caption: "Ghani Machine Close-up"
  },
  {
    url: "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?q=80&w=2070&auto=format&fit=crop",
    caption: "Our Organic Farms"
  }
];

export default function GalleryPage({ onBack }: { onBack: () => void }) {
  const { gallery } = useData();
  const displayImages = gallery.length > 0 ? gallery : galleryImages;

  return (
    <div className="min-h-screen bg-[#FDFDFD] pt-32 md:pt-40 pb-24">
      <div className="container mx-auto max-w-7xl px-6 md:px-12">
        
        {/* Header */}
        <div className="mb-20">
          <button
            onClick={onBack}
            className="group flex items-center gap-3 text-gray-400 hover:text-[#9EA233] font-medium text-base tracking-widest mb-10 transition-all"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>
          
          <h1 className="text-[36px] md:text-[64px] font-medium text-gray-900 tracking-tighter leading-[1.1] mb-6">
            The Purity <br />
            <span className="text-[#9EA233]">In Frames.</span>
          </h1>
          <p className="text-base text-gray-500 font-medium max-w-2xl leading-relaxed">
            Take a look into our traditional extraction process, our organic farms, and the purity we deliver to your doorstep.
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-8 space-y-8">
          {displayImages.map((img, i) => (
            <div 
              key={i} 
              className="relative group overflow-hidden rounded-[32px] shadow-sm animate-fadeIn break-inside-avoid transition-all hover:shadow-2xl hover:-translate-y-2 duration-500 border border-zinc-100"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <img 
                src={img.url} 
                alt={img.caption} 
                className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                 <div className="text-center p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <ZoomIn className="w-8 h-8 text-white mx-auto mb-3" />
                    <span className="text-white text-sm font-medium tracking-widest">{img.caption}</span>
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
