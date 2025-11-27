import HeroCarousel from '../components/HeroCarousel';
import CategoriesSection from '../components/CategoriesSection';
import AboutPage from './AboutPage';
import ContactPage from './ContactPage';

interface HomePageProps {
  onCategoryClick: (categoryId: string) => void;
}

export default function HomePage({ onCategoryClick }: HomePageProps) {
  return (
    <div>
      <HeroCarousel />
      <CategoriesSection onCategoryClick={onCategoryClick} />
      <AboutPage/>
      <ContactPage/>
    </div>
  );
}
