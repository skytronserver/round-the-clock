
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FoodCategory from "@/components/FoodCategory";
import Specials from "@/components/Specials";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import CartModal from "@/components/CartModal";
import { useEffect } from "react";

const Index = () => {
  // Update the page title when the component mounts
  useEffect(() => {
    document.title = "Round The Clock - Food Available 24/7";
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col">
      <Navbar />
      <Hero />
      <FoodCategory />
      <Specials />
      <AboutSection />
      <ContactSection />
      <Footer />
      <CartModal />
    </div>
  );
};

export default Index;
