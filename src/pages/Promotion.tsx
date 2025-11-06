import { Link } from 'react-router-dom';
import { ArrowLeft, Megaphone, Tag, Gift, Percent } from 'lucide-react';
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
          {/* Active Promotions */}
          <Link to="/mis/promotion/active">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 cursor-pointer transform hover:-translate-y-2 border-t-4 border-green-500">
              <div className="flex flex-col items-center text-center">
                <div className="bg-green-100 p-3 rounded-full mb-3">
                  <Megaphone className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-lg font-bold text-gray-800 mb-1">Active Promotions</h2>
                <p className="text-gray-600 text-sm">
                  View currently running promotions
                </p>
              </div>
            </div>
          </Link>

          {/* Create Offer */}
          <Link to="/mis/promotion/create-offer">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 cursor-pointer transform hover:-translate-y-2 border-t-4 border-blue-500">
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-100 p-3 rounded-full mb-3">
                  <Tag className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-lg font-bold text-gray-800 mb-1">Create Offer</h2>
                <p className="text-gray-600 text-sm">
                  Set up new promotional offers
                </p>
              </div>
            </div>
          </Link>

          {/* Discount Management */}
          <Link to="/mis/promotion/discounts">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 cursor-pointer transform hover:-translate-y-2 border-t-4 border-purple-500">
              <div className="flex flex-col items-center text-center">
                <div className="bg-purple-100 p-3 rounded-full mb-3">
                  <Percent className="w-8 h-8 text-purple-600" />
                </div>
                <h2 className="text-lg font-bold text-gray-800 mb-1">Discounts</h2>
                <p className="text-gray-600 text-sm">
                  Manage discount schemes
                </p>
              </div>
            </div>
          </Link>

          {/* Loyalty Programs */}
          <Link to="/mis/promotion/loyalty">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 cursor-pointer transform hover:-translate-y-2 border-t-4 border-orange-500">
              <div className="flex flex-col items-center text-center">
                <div className="bg-orange-100 p-3 rounded-full mb-3">
                  <Gift className="w-8 h-8 text-orange-600" />
                </div>
                <h2 className="text-lg font-bold text-gray-800 mb-1">Loyalty Programs</h2>
                <p className="text-gray-600 text-sm">
                  Manage customer loyalty rewards
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
