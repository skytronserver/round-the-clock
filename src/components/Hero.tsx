
import { ArrowRight, Clock, MapPin, UtensilsCrossed } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="home" className="hero-section">
      <div className="absolute inset-0 bg-gradient-to-b from-rtc-dark/70 to-rtc-red/60 z-0"></div>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="container mx-auto px-4 pt-32 pb-20 relative z-10 flex flex-col items-center justify-center text-center"
      >
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold text-rtc-cream mb-6 drop-shadow-lg"
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
        
        {/* Features highlight */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col md:flex-row justify-center gap-4 mb-8"
        >
          <motion.div 
            variants={itemVariants}
            className="bg-white/90 backdrop-blur-sm px-5 py-4 rounded-xl shadow-lg flex items-center"
          >
            <Clock className="text-rtc-red mr-3" size={24} />
            <span className="text-rtc-dark font-medium">Open 24/7</span>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="bg-white/90 backdrop-blur-sm px-5 py-4 rounded-xl shadow-lg flex items-center"
          >
            <UtensilsCrossed className="text-rtc-red mr-3" size={24} />
            <span className="text-rtc-dark font-medium">Fresh Ingredients</span>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="bg-white/90 backdrop-blur-sm px-5 py-4 rounded-xl shadow-lg flex items-center"
          >
            <MapPin className="text-rtc-red mr-3" size={24} />
            <span className="text-rtc-dark font-medium">Multiple Locations</span>
          </motion.div>
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-rtc-cream text-lg md:text-xl max-w-2xl mb-10 drop-shadow-md"
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
          <Button
            variant="default"
            size="lg"
            asChild
            className="bg-white text-rtc-red hover:bg-rtc-cream hover:text-rtc-dark rounded-full font-bold text-base"
          >
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#menu"
              className="flex items-center gap-2"
            >
              View Our Menu <ArrowRight size={18} />
            </motion.a>
          </Button>
          
          <Button
            variant="default"
            size="lg"
            asChild
            className="bg-rtc-cream text-rtc-dark hover:bg-rtc-red hover:text-white rounded-full font-bold text-base"
          >
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#order"
              className="flex items-center gap-2"
            >
              Order Now <ArrowRight size={18} />
            </motion.a>
          </Button>
        </motion.div>
        
        {/* Decorative elements - food shapes */}
        <motion.div 
          className="absolute left-1/10 top-1/4 opacity-20 hidden md:block"
          animate={{ 
            y: [0, 15, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <div className="h-16 w-16 rounded-full bg-rtc-cream blur-sm"></div>
        </motion.div>
        
        <motion.div 
          className="absolute right-1/10 bottom-1/3 opacity-20 hidden md:block"
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 7,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <div className="h-20 w-20 rounded-full bg-rtc-cream blur-sm"></div>
        </motion.div>
      </motion.div>
      
      {/* Decorative wave separator */}
      <div className="absolute bottom-0 left-0 w-full h-16 overflow-hidden">
        <svg
          className="absolute bottom-0 w-full h-48 text-white"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            fill="currentColor"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            fill="currentColor"
          ></path>
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
