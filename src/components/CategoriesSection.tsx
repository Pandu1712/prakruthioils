import { ArrowRight } from "lucide-react";

interface Category {
  id: string;
  name: string;
  image: string;
}

interface CategoriesSectionProps {
  onCategoryClick: (categoryId: string) => void;
}

// Sample 3 categories
const categories: Category[] = [
  {
    id: "coldoils",
    name: "Cold Pressed Oils",
    image: "https://res.cloudinary.com/dd4oiwnep/image/upload/v1764735204/DVK_8693_tovhj7.jpg",
  },
  {
    id: "ghee",
    name: "Pure Ghee",
    image: "https://cdn.shopify.com/s/files/1/0586/8234/3501/files/cow_desi_ghee_image.webp?v=1742634983",
  },
  {
    id: "millets",
    name: "Organic Millets",
    image: "https://img1.exportersindia.com/product_images/bc-full/dir_115/3435522/organic-millets-1762979.jpg",
  },
];

export default function CategoriesSection({
  onCategoryClick,
}: CategoriesSectionProps) {
  return (
    <section id="categories" className="py-20 bg-[#FFFDF3] mt-5">
      <div className="container mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-14">
         
           <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4 tracking-tight">
          Explore Our<span className="text-[#9EA233]"> Premium Products</span>
        </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mt-3">
            Handpicked, natural, and organic products crafted for your healthy lifestyle.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 text-center">
          {categories.map((category, index) => (
            <div
              key={category.id}
              onClick={() => onCategoryClick(category.id)}
              style={{ animationDelay: `${index * 100}ms` }}
              className="group cursor-pointer animate-slideUp"
            >
              {/* Square Card */}
              <div
                className="
                  w-full h-72 mx-auto bg-white relative rounded-2xl overflow-hidden
                  shadow-lg transition-all duration-500
                  group-hover:scale-105 group-hover:shadow-2xl
                  border-4 border-[#9EA233]
                "
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:brightness-110"
                />

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-[#9EA233]/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
              </div>

              {/* Category Name */}
              <h3 className="text-2xl font-semibold text-gray-900 mt-4 group-hover:text-[#9EA233] transition-colors">
                {category.name}
              </h3>

              {/* Explore Button */}
              <div className="flex items-center justify-center gap-2 mt-2 text-[#9EA233] font-semibold opacity-90 group-hover:opacity-100 transition-all">
                <span>Explore</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
