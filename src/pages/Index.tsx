
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FoodCategory from "@/components/FoodCategory";
import Specials from "@/components/Specials";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";

const Index = () => {
  // Update the page title when the component mounts
  useEffect(() => {
    document.title = "Round The Clock - Food Available 24/7";
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <AnimatePresence>
      <motion.div 
        className="min-h-screen flex flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Navbar />
        <Hero />
        <FoodCategory />
        <Specials />
        <AboutSection />
        <ContactSection />
        <Footer />
        
        {/* Back to top button */}
        <motion.div
          className="fixed bottom-6 right-6 z-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
        >
          <Button
            onClick={scrollToTop}
            size="icon"
            className="bg-rtc-red hover:bg-rtc-red/80 text-white rounded-full shadow-lg w-12 h-12"
            aria-label="Scroll to top"
          >
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowUp size={24} />
            </motion.div>
          </Button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Index;
