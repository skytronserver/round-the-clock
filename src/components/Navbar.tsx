
import { useState, useEffect } from 'react';
import { Menu, X, Clock, ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { toggleCart, getTotalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-[url(/lovable-uploads/asas.png)] bg-contain bg-center shadow-md py-0' : 'bg-[url(/lovable-uploads/asas.png)] bg-contain bg-center py-0 '
      }`}
    >
      <div className="container w-full mx-auto px-4 flex justify-between items-center">
        <a href="#" className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/Round the Clock Logo Coloured no BG_170425 (2).svg" 
            alt="Round The Clock Logo" 
            className={`h-20 transition-all duration-300 ${scrolled ? 'opacity-100' : 'opacity-90'}`}
          />
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {['Home', 'Menu', 'Specials', 'About', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className={`text-rtc-cream hover:text-white
              font-medium transition-colors duration-300`}
            >
              {item}
            </a>
          ))}
          <button
            onClick={toggleCart}
            className={`${
              scrolled
                ? 'bg-rtc-red text-white'
                : 'bg-rtc-cream text-rtc-dark'
            } px-4 py-2 rounded-full font-bold transition-colors duration-300 hover:opacity-90 flex items-center gap-2 relative`}
          >
            <ShoppingCart size={18} />
            Cart
            {getTotalItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {getTotalItems()}
              </span>
            )}
          </button>
          <a
            href="#order"
            className={`${
              scrolled
                ? 'bg-rtc-red text-white'
                : 'bg-rtc-cream text-rtc-dark'
            } px-4 py-2 rounded-full font-bold transition-colors duration-300 hover:opacity-90`}
          >
            Order Now
          </a>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={toggleCart}
            className={`${
              scrolled ? 'text-rtc-red' : 'text-rtc-cream'
            } focus:outline-none relative`}
            aria-label="Open cart"
          >
            <ShoppingCart size={24} />
            {getTotalItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {getTotalItems()}
              </span>
            )}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`${
              scrolled ? 'text-rtc-red' : 'text-rtc-cream'
            } focus:outline-none`}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-white absolute top-full left-0 w-full shadow-lg py-4 px-4">
          {['Home', 'Menu', 'Specials', 'About', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setIsOpen(false)}
              className="block py-3 text-rtc-dark hover:text-rtc-red font-medium border-b border-gray-100"
            >
              {item}
            </a>
          ))}
          <a
            href="#order"
            onClick={() => setIsOpen(false)}
            className="block mt-4 bg-rtc-red text-white text-center px-4 py-2 rounded-full font-bold"
          >
            Order Now
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
