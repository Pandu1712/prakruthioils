import HeroCarousel from '../components/HeroCarousel';
import CategoriesSection from '../components/CategoriesSection';
import BestsellersSection from '../components/BestsellersSection';
import HomeAboutSection from '../components/HomeAboutSection';
import ReviewsSection from '../components/reviews';
import { Product } from '../types';

interface HomePageProps {
  onCategoryClick: (categoryId: string) => void;
  onViewProduct: (product: Product) => void;
  onNavigate: (page: string) => void;
}

export default function HomePage({ onCategoryClick, onViewProduct, onNavigate }: HomePageProps) {
  return (
    <div className="flex flex-col">
      <HeroCarousel onExplore={() => onCategoryClick("")} />
      
      <section id="categories">
        <CategoriesSection onCategoryClick={onCategoryClick} />
      </section>
      
      <section id="bestsellers">
        <BestsellersSection 
          onViewProduct={onViewProduct} 
          onViewAll={() => onCategoryClick("")} 
        />
      </section>
      
      <section id="about">
        <HomeAboutSection onReadMore={() => onNavigate("about")} />
      </section>
      
      <section id="reviews">
        <ReviewsSection />
      </section>
    </div>
  );
}
