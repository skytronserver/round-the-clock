
import { useState, useEffect } from 'react';
import { Menu, X, Clock } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
        scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="#" className="flex items-center gap-2">
          <div className={`${scrolled ? 'text-rtc-red' : 'text-rtc-cream'} font-display text-2xl font-bold flex items-center`}>
            <Clock className="mr-2" size={24} />
            <span>ROUND THE CLOCK</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {['Home', 'Menu', 'Specials', 'About', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className={`${
                scrolled ? 'text-rtc-dark hover:text-rtc-red' : 'text-rtc-cream hover:text-white'
              } font-medium transition-colors duration-300`}
            >
              {item}
            </a>
          ))}
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
        <div className="md:hidden">
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
