
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="hero-section">
      <div className="absolute inset-0 bg-[url('/lovable-uploads/7f021628-ea58-4817-8b40-0370371ba5e3.png')] opacity-20 bg-center bg-no-repeat bg-contain"></div>
      <div className="container mx-auto px-4 pt-24 pb-12 relative z-10 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-rtc-cream mb-6">
          Delicious Food <br className="md:hidden" />
          <span className="text-white">Round The Clock</span>
        </h1>
        <p className="text-rtc-cream text-lg md:text-xl max-w-2xl mb-10">
          Whether it's breakfast, lunch, dinner or a midnight snack, 
          we're here to serve you the best food, whenever you need it.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a 
            href="#menu" 
            className="primary-button bg-white text-rtc-red"
          >
            View Our Menu <ArrowRight size={20} />
          </a>
          <a 
            href="#order" 
            className="secondary-button"
          >
            Order Now <ArrowRight size={20} />
          </a>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default Hero;
