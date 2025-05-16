
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FoodCategory from "@/components/FoodCategory";
import Specials from "@/components/Specials";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Index = () => {
  // Update the page title when the component mounts
  useEffect(() => {
    document.title = "Round The Clock - Food Available 24/7";
  }, []);

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
      </motion.div>
    </AnimatePresence>
  );
};

export default Index;
