
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="home" className="hero-section">
      <div className="absolute inset-0 bg-[url('/lovable-uploads/7f021628-ea58-4817-8b40-0370371ba5e3.png')] opacity-20 bg-center bg-no-repeat bg-contain"></div>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="container mx-auto px-4 pt-24 pb-12 relative z-10 flex flex-col items-center justify-center text-center"
      >
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold text-rtc-cream mb-6"
        >
          Delicious Food <br className="md:hidden" />
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-white"
          >
            Round The Clock
          </motion.span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-rtc-cream text-lg md:text-xl max-w-2xl mb-10"
        >
          Whether it's breakfast, lunch, dinner or a midnight snack, 
          we're here to serve you the best food, whenever you need it.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#menu" 
            className="primary-button bg-white text-rtc-red"
          >
            View Our Menu <ArrowRight size={20} />
          </motion.a>
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#order" 
            className="secondary-button"
          >
            Order Now <ArrowRight size={20} />
          </motion.a>
        </motion.div>
      </motion.div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default Hero;
