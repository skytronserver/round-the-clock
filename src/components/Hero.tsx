
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
      image: '/lovable-uploads/Round the Clock Logo.png',
      showButton: true
    },
    // 🌯 Chicken Roll (full screen)
    {
      type: 'menu',
      title: 'Chicken Roll',
      subtitle: 'Crispy Wrap, Tender Chicken Magic',
      price: '₹120',
      image: '/Items/Chicken Roll.jpg',
      showButton: false
    },
    // 🍜 Chicken Chow (full screen)
    {
      type: 'menu',
      title: 'Chicken Chow',
      subtitle: 'Street-Style Sizzle with Tender Chicken',
      price: '₹140',
      image: '/Items/Chicken Chow.jpg',
      showButton: false
    },
    // 🥟 Steamed Chicken Momo (full screen)
    {
      type: 'menu',
      title: 'Steamed Chicken Momo',
      subtitle: 'Hot & Juicy Chicken Delight (6pcs)',
      price: '₹80',
      image: '/Items/Nepalese-Momo.webp',
      showButton: false
    },
    // 🍦 Chocolate Almond Magnum (full screen)
    {
      type: 'menu',
      title: 'Chocolate Almond Magnum',
      subtitle: 'Premium chocolate-coated ice cream with roasted almonds',
      price: '₹90',
      image: '/IceCream/1.png',
      showButton: false
    },
    // 🍦 Magnum Cone (full screen)
    {
      type: 'menu',
      title: 'Magnum Cone',
      subtitle: 'Crispy cone filled with chocolate-dipped creamy vanilla ice cream',
      price: '₹100',
      image: '/IceCream/5.jpg',
      showButton: false
    },
    // 🍦 Cornetto Oreo (full screen)
    {
      type: 'menu',
      title: 'Cornetto Oreo',
      subtitle: 'Vanilla ice cream with Oreo chunks in a cone',
      price: '₹70',
      image: '/IceCream/11.jpg',
      showButton: false
    },
  
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
                  className="mx-auto max-h-64 md:max-h-80 lg:max-h-96"
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
