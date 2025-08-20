
import { ArrowRight, Clock, Star, Utensils } from 'lucide-react';

const Hero = () => {
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

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-20 pb-28">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}

          {/* Main heading with gradient text effect */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
            <span className="block text-white mb-2 tracking-tight">
              Delicious Food
            </span>
          </h1>

           <figure>
            <img src="/lovable-uploads/Round the Clock Logo Coloured no BG_170425 (2).svg" alt="logo" />
            </figure>  

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <a 
              href="#menu" 
              className="group bg-white text-rtc-red px-8 py-4 rounded-full font-bold text-lg shadow-2xl hover:shadow-white/25 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 inline-flex items-center gap-3"
            >
              <Utensils className="w-5 h-5" />
              View Our Menu 
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
            {/* <a 
              href="#order" 
              className="group bg-rtc-cream/20 backdrop-blur-sm border-2 border-rtc-cream text-rtc-cream px-8 py-4 rounded-full font-bold text-lg hover:bg-rtc-cream hover:text-rtc-red transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 inline-flex items-center gap-3"
            >
              <Clock className="w-5 h-5" />
              Order Now 
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </a> */}
          </div>

          {/* Stats/Features */}
          {/* <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-black text-white mb-1">24/7</div>
              <div className="text-rtc-cream/80 text-sm font-medium">Always Open</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-black text-white mb-1">100+</div>
              <div className="text-rtc-cream/80 text-sm font-medium">Menu Items</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-black text-white mb-1">⭐5.0</div>
              <div className="text-rtc-cream/80 text-sm font-medium">Customer Rating</div>
            </div>
          </div> */}
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
