import Navbar from "@/components/Navbar";
import FoodCard from "@/components/FoodCard";
import Footer from "@/components/Footer";
import CartModal from "@/components/CartModal";
import { useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

// Menu data for all items except ice cream
const allMenuItems = [
  // Rolls
  { id: 1, name: 'Chicken Roll', description: 'Crispy Wrap, Tender Chicken Magic', price: '₹120', image: '/Items/Chicken Roll.jpg' },
  { id: 2, name: 'Special Chicken Roll', description: 'Double Loaded! Egg + Chicken Indulgence', price: '₹155', image: '/Items/ChickenEggRoll.jpg' },
  { id: 3, name: 'Egg Roll', description: 'Scrambled eggs, sausage, cheese and salsa wrapped in a tortilla', price: '₹90', image: '/Items/Egg roll.jpg' },
  
  // Chowmin
  { id: 5, name: 'Chicken Chow', description: 'Street-Style Sizzle with Tender Chicken', price: '₹140', image: '/Items/Chicken Chow.jpg' },
  { id: 6, name: 'Egg Chow', description: 'Egg-Citing Taste, Every Bite!', price: '₹130', image: '/Items/Egg Chow.jpg' },
  { id: 7, name: 'Veg Chow', description: 'Wok-Tossed Goodness, Garden Fresh', price: '₹120', image: '/Items/Veg Chow.jpg' },
  
  // Momo
  { id: 9, name: 'Steamed Chicken Momo(6pcs)', description: 'Hot & Juicy Chicken Delight', price: '₹80', image:'/Items/Veg_momo.webp'},
  { id: 10, name: 'Steamed Pork Momo(6pcs)', description: 'Smoky & Succulent Himalayan Bites', price: '₹80', image:  '/Items/Nepalese-Momo.webp'},
  
  // Drinks
  { id: 47, name: 'Tea 200ml', description: 'Soothing. Strong. Simply Assam. (or "Chai with a Punch!', price: '₹40', image: '/Items/tea.jpg' },
  { id: 48, name: 'Coffee 200ml', description: 'Fresh Brew. Real Buzz.', price: '₹60', image: '/Items/coffee.jpg' },
  { id: 49, name: 'Water Bottle 500 ml', description: 'Fresh & Pure Hydration', price: '₹10', image: '/IceCream/27.jpg' },
  { id: 50, name: 'Water Bottle 1000 ml', description: 'Fresh & Pure Hydration - Large Size', price: '₹20', image: '/IceCream/27.jpg' },
];

const Menu = () => {
  const { addItem } = useCart();

  // Update the page title when the component mounts
  useEffect(() => {
    document.title = "Menu - Round The Clock";
  }, []);

  const handleAddToCart = (item: any) => {
    addItem(item);
    toast.success(`${item.name} added to cart!`);
  };

  return (
    <div className="min-h-screen w-full flex flex-col">
      <Navbar />
      
      {/* Menu Section - Full Height */}
      <section className="relative bg-[url(/lovable-uploads/lol2.png)] bg-contain overflow-hidden h-screen flex flex-col">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-white/50"></div>
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-20 h-20 border border-rtc-red rounded-full animate-ping-slow"></div>
          <div className="absolute top-1/3 right-10 w-16 h-16 border border-rtc-red rounded-full animate-ping-slow" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute bottom-20 left-1/4 w-18 h-18 border border-rtc-red rounded-full animate-ping-slow" style={{animationDelay: '3s'}}></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10 flex-1 flex flex-col justify-center">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 text-rtc-dark leading-tight drop-shadow-sm">
              Our Complete <span className="text-rtc-red">Menu</span>
            </h1>
            <p className="text-gray-700 text-base md:text-lg max-w-2xl mx-auto font-medium">
              Explore our full selection of delicious food items.
            </p>
          </div>

          {/* Menu Items Grid - Enhanced Visibility */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {allMenuItems.map(item => (
              <div key={item.id} className="menu-card-enhanced group">
                <div className="relative h-32 md:h-36 overflow-hidden rounded-t-xl">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-2 right-2 bg-rtc-red text-white px-3 py-1 rounded-full font-bold text-sm shadow-lg">
                    {item.price}
                  </div>
                </div>
                <div className="p-3 bg-white">
                  <h3 className="font-bold text-sm md:text-base mb-2 text-rtc-dark line-clamp-2 leading-tight">{item.name}</h3>
                  <p className="text-gray-700 text-xs md:text-sm mb-3 line-clamp-2 leading-relaxed">{item.description}</p>
                  <button 
                    onClick={() => handleAddToCart(item)}
                    className="w-full bg-rtc-red text-white py-2 px-3 rounded-full font-bold hover:bg-rtc-red/90 transition-all duration-300 text-sm shadow-md hover:shadow-lg"
                  >
                    Add to Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
      <CartModal />
    </div>
  );
};

export default Menu;
