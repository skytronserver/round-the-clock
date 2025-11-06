import { Link } from 'react-router-dom';
import { Settings, ShoppingBag, FileText, Megaphone } from 'lucide-react';
import Navbar from '@/components/Navbar';

const MIS = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 pt-32 pb-12">
        <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">
          MIS Dashboard
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Management Information System
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {/* Settings Card */}
          <Link to="/mis/settings">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 cursor-pointer transform hover:-translate-y-2 border-t-4 border-blue-500">
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-100 p-4 rounded-full mb-4">
                  <Settings className="w-12 h-12 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Settings</h2>
                <p className="text-gray-600 text-sm">
                  Configure outlets, ingredients, and menu items
                </p>
              </div>
            </div>
          </Link>

          {/* Purchase Card */}
          <Link to="/mis/purchase">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 cursor-pointer transform hover:-translate-y-2 border-t-4 border-green-500">
              <div className="flex flex-col items-center text-center">
                <div className="bg-green-100 p-4 rounded-full mb-4">
                  <ShoppingBag className="w-12 h-12 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Purchase</h2>
                <p className="text-gray-600 text-sm">
                  Manage company and outlet purchases
                </p>
              </div>
            </div>
          </Link>

          {/* Report Card */}
          <Link to="/mis/report">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 cursor-pointer transform hover:-translate-y-2 border-t-4 border-purple-500">
              <div className="flex flex-col items-center text-center">
                <div className="bg-purple-100 p-4 rounded-full mb-4">
                  <FileText className="w-12 h-12 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Report</h2>
                <p className="text-gray-600 text-sm">
                  View analytics, sales, and inventory reports
                </p>
              </div>
            </div>
          </Link>

          {/* Promotion Card */}
          <Link to="/mis/promotion">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 cursor-pointer transform hover:-translate-y-2 border-t-4 border-orange-500">
              <div className="flex flex-col items-center text-center">
                <div className="bg-orange-100 p-4 rounded-full mb-4">
                  <Megaphone className="w-12 h-12 text-orange-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Promotion</h2>
                <p className="text-gray-600 text-sm">
                  Manage promotional campaigns and offers
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MIS;
