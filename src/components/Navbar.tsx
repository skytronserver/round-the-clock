
import { useState, useEffect } from 'react';
import { Menu, X, Clock, ShoppingCart, BarChart3, MessageSquare } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Link } from 'react-router-dom';

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
        <a href="/" className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/Round the Clock Logo.png" 
            alt="Round The Clock Logo" 
            className={`h-20 transition-all duration-300 ${scrolled ? 'opacity-100' : 'opacity-90'}`}
          />
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-6">
          <a
            href="/"
            className={`text-rtc-cream hover:text-white
            font-medium transition-colors duration-300 text-sm`}
          >
            Home
          </a>
          <Link
            to="/menu"
            className={`text-rtc-cream hover:text-white
            font-medium transition-colors duration-300 text-sm`}
          >
            Menu
          </Link>
          {['Specials', 'About', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className={`text-rtc-cream hover:text-white
              font-medium transition-colors duration-300 text-sm`}
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
            } px-3 py-2 rounded-full font-bold transition-colors duration-300 hover:opacity-90 flex items-center gap-2 relative text-sm`}
          >
            <ShoppingCart size={16} />
            <span className="hidden xl:inline">Cart</span>
            {getTotalItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {getTotalItems()}
              </span>
            )}
          </button>
          <Link to="/reports">
            <button
              className={`${
                scrolled
                  ? 'bg-rtc-red text-white'
                  : 'bg-rtc-cream text-rtc-dark'
              } px-3 py-2 rounded-full font-bold transition-colors duration-300 hover:opacity-90 flex items-center gap-2 text-sm`}
            >
              <BarChart3 size={16} />
              <span className="hidden xl:inline">Reports</span>
            </button>
          </Link>
          <Link to="/feedback">
            <button
              className={`${
                scrolled
                  ? 'bg-rtc-red text-white'
                  : 'bg-rtc-cream text-rtc-dark'
              } px-3 py-2 rounded-full font-bold transition-colors duration-300 hover:opacity-90 flex items-center gap-2 text-sm`}
            >
              <MessageSquare size={16} />
              <span className="hidden xl:inline">Feedback</span>
            </button>
          </Link>
        </div>

        {/* Tablet Navigation - Icons Only */}
        <div className="hidden md:flex lg:hidden items-center space-x-4">
          <button
            onClick={toggleCart}
            className={`${
              scrolled
                ? 'bg-rtc-red text-white'
                : 'bg-rtc-cream text-rtc-dark'
            } p-2 rounded-full font-bold transition-colors duration-300 hover:opacity-90 relative`}
            title="Cart"
          >
            <ShoppingCart size={20} />
            {getTotalItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {getTotalItems()}
              </span>
            )}
          </button>
          <Link to="/reports">
            <button
              className={`${
                scrolled
                  ? 'bg-rtc-red text-white'
                  : 'bg-rtc-cream text-rtc-dark'
              } p-2 rounded-full font-bold transition-colors duration-300 hover:opacity-90`}
              title="Reports"
            >
              <BarChart3 size={20} />
            </button>
          </Link>
          <Link to="/feedback">
            <button
              className={`${
                scrolled
                  ? 'bg-rtc-red text-white'
                  : 'bg-rtc-cream text-rtc-dark'
              } p-2 rounded-full font-bold transition-colors duration-300 hover:opacity-90`}
              title="Feedback"
            >
              <MessageSquare size={20} />
            </button>
          </Link>
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
          <a
            href="#home"
            onClick={() => setIsOpen(false)}
            className="block py-3 text-rtc-dark hover:text-rtc-red font-medium border-b border-gray-100"
          >
            Home
          </a>
          <Link
            to="/menu"
            onClick={() => setIsOpen(false)}
            className="block py-3 text-rtc-dark hover:text-rtc-red font-medium border-b border-gray-100"
          >
            Menu
          </Link>
          {['Specials', 'About', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setIsOpen(false)}
              className="block py-3 text-rtc-dark hover:text-rtc-red font-medium border-b border-gray-100"
            >
              {item}
            </a>
          ))}
          <Link to="/reports" onClick={() => setIsOpen(false)}>
            <div className="flex items-center gap-2 py-3 text-rtc-dark hover:text-rtc-red font-medium border-b border-gray-100">
              <BarChart3 size={18} />
              Reports
            </div>
          </Link>
          <Link to="/feedback" onClick={() => setIsOpen(false)}>
            <div className="flex items-center gap-2 py-3 text-rtc-dark hover:text-rtc-red font-medium border-b border-gray-100">
              <MessageSquare size={18} />
              Feedback
            </div>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
