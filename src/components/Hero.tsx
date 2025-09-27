
import { ArrowRight, Clock, Star, Utensils } from 'lucide-react';
import { useState, useEffect } from 'react';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Slider content: starts with main slide, then shows menu items
  const slides = [
    // Welcome slide - "Delicious Food" + Logo + Button
    {
      type: 'main',
      title: 'Delicious Food',
      subtitle: '',
      image: '/lovable-uploads/Round the Clock Logo Coloured no BG_170425 (2).svg',
      showButton: true
    },
    // 🍔 Chicken Burger (full screen)
    {
      type: 'menu',
      title: 'Chicken Burger',
      subtitle: 'Grilled chicken patty with fresh lettuce, tomato, and our special sauce',
      price: '₹299',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1899&auto=format&fit=crop',
      showButton: false
    },
    // 🥞 Pancakes (full screen)
    {
      type: 'menu',
      title: 'Fluffy Pancakes',
      subtitle: 'Stack of golden pancakes with maple syrup and fresh berries',
      price: '₹199',
      image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=1980&auto=format&fit=crop',
      showButton: false
    },
    // 🍗 Grilled Chicken (full screen)
    {
      type: 'menu',
      title: 'Grilled Chicken',
      subtitle: 'Tender grilled chicken breast with herbs and crispy fries',
      price: '₹499',
      image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=2070&auto=format&fit=crop',
      showButton: false
    },
    // 🍝 Pasta Carbonara (full screen)
    {
      type: 'menu',
      title: 'Pasta Carbonara',
      subtitle: 'Creamy pasta with bacon, eggs, and parmesan cheese',
      price: '₹349',
      image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=1771&auto=format&fit=crop',
      showButton: false
    },
    // 🍰 Chocolate Cake (full screen)
    {
      type: 'menu',
      title: 'Chocolate Cake',
      subtitle: 'Rich and moist chocolate cake with creamy frosting',
      price: '₹149',
      image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=1887&auto=format&fit=crop',
      showButton: false
    },
    // ☕ Cappuccino (full screen)
    {
      type: 'menu',
      title: 'Cappuccino',
      subtitle: 'Rich espresso with steamed milk and perfect foam art',
      price: '₹99',
      image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=1887&auto=format&fit=crop',
      showButton: false
    },
    // 🍨 Ice Cream Sundae (full screen)
    {
      type: 'menu',
      title: 'Ice Cream Sundae',
      subtitle: 'Vanilla ice cream with chocolate sauce, nuts, and cherry',
      price: '₹129',
      image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=1827&auto=format&fit=crop',
      showButton: false
    }
  ];

  // Auto-slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const currentContent = slides[currentSlide];

  return (
    <section id="home" className="relative min-h-screen overflow-hidden pt-4">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-rtc-red via-rtc-red to-red-700">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 border border-rtc-cream rounded-full animate-ping-slow"></div>
          <div className="absolute top-40 right-20 w-24 h-24 border border-rtc-cream rounded-full animate-ping-slow" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-32 left-1/4 w-28 h-28 border border-rtc-cream rounded-full animate-ping-slow" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-20 right-1/3 w-20 h-20 border border-rtc-cream rounded-full animate-ping-slow" style={{animationDelay: '0.5s'}}></div>
        </div>
        
        {/* Floating food icons */}
        <div className="absolute inset-0 overflow-hidden">
          <Utensils className="absolute top-24 left-16 w-6 h-6 text-rtc-cream opacity-30 animate-float" />
          <Clock className="absolute top-1/3 right-24 w-8 h-8 text-rtc-cream opacity-20 animate-float" style={{animationDelay: '1.5s'}} />
          <Star className="absolute bottom-1/3 left-1/3 w-5 h-5 text-rtc-cream opacity-25 animate-float" style={{animationDelay: '0.8s'}} />
        </div>
      </div>

      {/* Full Screen Image for Menu Items */}
      {currentContent.type === 'menu' && (
        <div className="absolute inset-0 z-5">
          <img 
            src={currentContent.image} 
            alt="Delicious Food"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
      )}

      {/* Main content - Slider */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-20 pb-28">
        <div className="text-center max-w-4xl mx-auto">
          {/* Slider Content */}
          <div className="transition-all duration-1000 ease-in-out">
            {/* Main heading - only show for main slides */}
            {currentContent.type === 'main' && currentContent.title && (
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
                <span className="block text-white mb-2 tracking-tight">
                  {currentContent.title}
                </span>
              </h1>
            )}

            {/* Menu item details - only show for menu slides */}
            {currentContent.type === 'menu' && (
              <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 max-w-2xl mx-auto mb-8">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                  {currentContent.title}
                </h2>
                <p className="text-lg md:text-xl text-rtc-cream mb-6 leading-relaxed">
                  {currentContent.subtitle}
                </p>
                <div className="text-4xl md:text-5xl font-black text-white bg-rtc-red px-6 py-3 rounded-full inline-block shadow-2xl">
                  {currentContent.price}
                </div>
              </div>
            )}

            {/* Logo - only show for main slides */}
            {currentContent.type === 'main' && (
              <figure className="mb-8">
                <img 
                  src={currentContent.image} 
                  alt="Round The Clock Logo" 
                  className="mx-auto max-h-32 md:max-h-40"
                />
              </figure>
            )}

            {/* CTA Button - only show for main slides */}
            {currentContent.showButton && (
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                <a 
                  href="#menu" 
                  className="group bg-white text-rtc-red px-8 py-4 rounded-full font-bold text-lg shadow-2xl hover:shadow-white/25 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 inline-flex items-center gap-3"
                >
                  <Utensils className="w-5 h-5" />
                  View Our Menu 
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Bottom wave effect */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg className="w-full h-20 md:h-32" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path 
            d="M0,0 C150,100 350,0 600,50 C850,100 1050,0 1200,50 L1200,120 L0,120 Z" 
            fill="white" 
            className="opacity-100"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
