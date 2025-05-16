
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-rtc-dark text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-rtc-cream">Round The Clock</h3>
            <p className="text-gray-300 mb-4">
              Delicious food available 24/7, because hunger doesn't follow a schedule.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-rtc-cream transition-colors duration-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-rtc-cream transition-colors duration-300">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-rtc-cream transition-colors duration-300">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-rtc-cream transition-colors duration-300">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 text-rtc-cream">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-300 hover:text-rtc-cream transition-colors duration-300">Home</a></li>
              <li><a href="#menu" className="text-gray-300 hover:text-rtc-cream transition-colors duration-300">Menu</a></li>
              <li><a href="#specials" className="text-gray-300 hover:text-rtc-cream transition-colors duration-300">Specials</a></li>
              <li><a href="#about" className="text-gray-300 hover:text-rtc-cream transition-colors duration-300">About Us</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-rtc-cream transition-colors duration-300">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 text-rtc-cream">Opening Hours</h3>
            <p className="text-gray-300">Monday - Sunday</p>
            <p className="text-white font-bold">24 Hours</p>
            <p className="text-rtc-cream mt-2">Always Open, Always Fresh</p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 text-rtc-cream">Newsletter</h3>
            <p className="text-gray-300 mb-4">Subscribe to get special offers and promotions.</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 w-full text-gray-900 rounded-l-md focus:outline-none"
              />
              <button
                type="submit"
                className="bg-rtc-red px-4 py-2 rounded-r-md hover:bg-rtc-red/90 transition-colors duration-300"
              >
                Go
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Round The Clock. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
