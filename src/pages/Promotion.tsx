import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Megaphone, 
  Tag, 
  Gift, 
  Percent, 
  Calendar,
  MapPin,
  Package,
  CreditCard,
  Banknote,
  Heart
} from 'lucide-react';
import Navbar from '@/components/Navbar';

const Promotion = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      <Navbar />
      <div className="container mx-auto px-4 pt-32 pb-12">
        <div className="mb-8">
          <Link to="/mis" className="inline-flex items-center text-orange-600 hover:text-orange-800 font-medium">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to MIS Dashboard
          </Link>
        </div>

        <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">
          Promotion Management
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Create and manage promotional campaigns
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Event-based offers */}
          <Link to="/mis/promotion/event-based-offers">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 cursor-pointer transform hover:-translate-y-2 border-t-4 border-blue-500">
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-100 p-3 rounded-full mb-3">
                  <Calendar className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-lg font-bold text-gray-800 mb-1">Event-based offers</h2>
                <p className="text-gray-600 text-sm">
                  Special occasion promotions
                </p>
              </div>
            </div>
          </Link>

          {/* Happy hour deals */}
          <Link to="/mis/promotion/happy-hour-deals">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 cursor-pointer transform hover:-translate-y-2 border-t-4 border-yellow-500">
              <div className="flex flex-col items-center text-center">
                <div className="bg-yellow-100 p-3 rounded-full mb-3">
                  <Calendar className="w-8 h-8 text-yellow-600" />
                </div>
                <h2 className="text-lg font-bold text-gray-800 mb-1">Happy hour deals</h2>
                <p className="text-gray-600 text-sm">
                  Time-based special offers
                </p>
              </div>
            </div>
          </Link>

          {/* Outlet-based discounts */}
          <Link to="/mis/promotion/outlet-based-discounts">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 cursor-pointer transform hover:-translate-y-2 border-t-4 border-green-500">
              <div className="flex flex-col items-center text-center">
                <div className="bg-green-100 p-3 rounded-full mb-3">
                  <MapPin className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-lg font-bold text-gray-800 mb-1">Outlet-based discounts</h2>
                <p className="text-gray-600 text-sm">
                  Location-specific offers
                </p>
              </div>
            </div>
          </Link>

          {/* Item-based offers */}
          <Link to="/mis/promotion/item-based-offers">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 cursor-pointer transform hover:-translate-y-2 border-t-4 border-purple-500">
              <div className="flex flex-col items-center text-center">
                <div className="bg-purple-100 p-3 rounded-full mb-3">
                  <Package className="w-8 h-8 text-purple-600" />
                </div>
                <h2 className="text-lg font-bold text-gray-800 mb-1">Item-based offers</h2>
                <p className="text-gray-600 text-sm">
                  Product-specific promotions
                </p>
              </div>
            </div>
          </Link>

          {/* Payment-based offers (e.g., UPI/card discounts) */}
          <Link to="/mis/promotion/payment-based-offers">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 cursor-pointer transform hover:-translate-y-2 border-t-4 border-indigo-500">
              <div className="flex flex-col items-center text-center">
                <div className="bg-indigo-100 p-3 rounded-full mb-3">
                  <CreditCard className="w-8 h-8 text-indigo-600" />
                </div>
                <h2 className="text-lg font-bold text-gray-800 mb-1">Payment-based offers (e.g., UPI/card discounts)</h2>
                <p className="text-gray-600 text-sm">
                  Payment method incentives
                </p>
              </div>
            </div>
          </Link>

          {/* Bank-account-based offers */}
          <Link to="/mis/promotion/bank-account-based-offers">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 cursor-pointer transform hover:-translate-y-2 border-t-4 border-teal-500">
              <div className="flex flex-col items-center text-center">
                <div className="bg-teal-100 p-3 rounded-full mb-3">
                  <Banknote className="w-8 h-8 text-teal-600" />
                </div>
                <h2 className="text-lg font-bold text-gray-800 mb-1">Bank-account-based offers</h2>
                <p className="text-gray-600 text-sm">
                  Bank-specific promotions
                </p>
              </div>
            </div>
          </Link>

          {/* Loyal Customer */}
          <Link to="/mis/promotion/loyal-customer">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 cursor-pointer transform hover:-translate-y-2 border-t-4 border-pink-500">
              <div className="flex flex-col items-center text-center">
                <div className="bg-pink-100 p-3 rounded-full mb-3">
                  <Heart className="w-8 h-8 text-pink-600" />
                </div>
                <h2 className="text-lg font-bold text-gray-800 mb-1">Loyal Customer</h2>
                <p className="text-gray-600 text-sm">
                  Loyalty rewards program
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Promotion;
