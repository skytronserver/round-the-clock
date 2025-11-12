import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Package, 
  TrendingUp, 
  BarChart3, 
  AlertCircle, 
  Receipt, 
  Clock,
  MapPin,
  DollarSign,
  ShoppingCart,
  Calendar,
  Star,
  CreditCard,
  MessageSquare,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import Navbar from '@/components/Navbar';

const Report = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100">
      <Navbar />
      <div className="container mx-auto px-4 pt-32 pb-12">
        <div className="mb-8">
          <Link to="/mis" className="inline-flex items-center text-purple-600 hover:text-purple-800 font-medium">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to MIS Dashboard
          </Link>
        </div>

        <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">
          Reports & Analytics
        </h1>
        <p className="text-center text-gray-600 mb-12">
          View comprehensive business reports
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Items Time Report */}
          <Link to="/mis/report/items-time">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 cursor-pointer transform hover:-translate-y-2 border-t-4 border-blue-500">
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-100 p-3 rounded-full mb-3">
                  <Clock className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-lg font-bold text-gray-800 mb-1">Items Time</h2>
                <p className="text-gray-600 text-sm">
                  Time-based item analysis
                </p>
              </div>
            </div>
          </Link>

          {/* Outlet Report */}
          <Link to="/mis/report/outlet">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 cursor-pointer transform hover:-translate-y-2 border-t-4 border-green-500">
              <div className="flex flex-col items-center text-center">
                <div className="bg-green-100 p-3 rounded-full mb-3">
                  <MapPin className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-lg font-bold text-gray-800 mb-1">Outlet</h2>
                <p className="text-gray-600 text-sm">
                  Outlet performance analysis
                </p>
              </div>
            </div>
          </Link>

          {/* Profit & Loss Report */}
          <Link to="/mis/report/profit-loss">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 cursor-pointer transform hover:-translate-y-2 border-t-4 border-purple-500">
              <div className="flex flex-col items-center text-center">
                <div className="bg-purple-100 p-3 rounded-full mb-3">
                  <DollarSign className="w-8 h-8 text-purple-600" />
                </div>
                <h2 className="text-lg font-bold text-gray-800 mb-1">Profit & Loss Report</h2>
                <p className="text-gray-600 text-sm">
                  Financial performance analysis
                </p>
              </div>
            </div>
          </Link>

          {/* Item-wise Sales Report */}
          <Link to="/mis/report/item-wise-sales">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 cursor-pointer transform hover:-translate-y-2 border-t-4 border-orange-500">
              <div className="flex flex-col items-center text-center">
                <div className="bg-orange-100 p-3 rounded-full mb-3">
                  <Package className="w-8 h-8 text-orange-600" />
                </div>
                <h2 className="text-lg font-bold text-gray-800 mb-1">Item-wise Sales Report</h2>
                <p className="text-gray-600 text-sm">
                  Detailed item sales analysis
                </p>
              </div>
            </div>
          </Link>

          {/* Daily Sales Report */}
          <Link to="/mis/report/daily-sales">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 cursor-pointer transform hover:-translate-y-2 border-t-4 border-red-500">
              <div className="flex flex-col items-center text-center">
                <div className="bg-red-100 p-3 rounded-full mb-3">
                  <Calendar className="w-8 h-8 text-red-600" />
                </div>
                <h2 className="text-lg font-bold text-gray-800 mb-1">Daily Sales Report</h2>
                <p className="text-gray-600 text-sm">
                  Daily sales performance
                </p>
              </div>
            </div>
          </Link>

          {/* Best-selling Items */}
          <Link to="/mis/report/best-selling">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 cursor-pointer transform hover:-translate-y-2 border-t-4 border-yellow-500">
              <div className="flex flex-col items-center text-center">
                <div className="bg-yellow-100 p-3 rounded-full mb-3">
                  <Star className="w-8 h-8 text-yellow-600" />
                </div>
                <h2 className="text-lg font-bold text-gray-800 mb-1">Best-selling Items</h2>
                <p className="text-gray-600 text-sm">
                  Top performing products
                </p>
              </div>
            </div>
          </Link>

          {/* Payment Mode Report */}
          <Link to="/mis/report/payment-mode">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 cursor-pointer transform hover:-translate-y-2 border-t-4 border-indigo-500">
              <div className="flex flex-col items-center text-center">
                <div className="bg-indigo-100 p-3 rounded-full mb-3">
                  <CreditCard className="w-8 h-8 text-indigo-600" />
                </div>
                <h2 className="text-lg font-bold text-gray-800 mb-1">Payment Mode Report</h2>
                <p className="text-gray-600 text-sm">
                  Payment method analysis
                </p>
              </div>
            </div>
          </Link>

          {/* Customer Feedback/Ratings for Items */}
          <Link to="/mis/report/customer-feedback-items">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 cursor-pointer transform hover:-translate-y-2 border-t-4 border-pink-500">
              <div className="flex flex-col items-center text-center">
                <div className="bg-pink-100 p-3 rounded-full mb-3">
                  <MessageSquare className="w-8 h-8 text-pink-600" />
                </div>
                <h2 className="text-lg font-bold text-gray-800 mb-1">Customer Feedback/Ratings for Items</h2>
                <p className="text-gray-600 text-sm">
                  Item feedback analysis
                </p>
              </div>
            </div>
          </Link>

          {/* Customer Feedback/Ratings for Outlets */}
          <Link to="/mis/report/customer-feedback-outlets">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 cursor-pointer transform hover:-translate-y-2 border-t-4 border-teal-500">
              <div className="flex flex-col items-center text-center">
                <div className="bg-teal-100 p-3 rounded-full mb-3">
                  <MessageSquare className="w-8 h-8 text-teal-600" />
                </div>
                <h2 className="text-lg font-bold text-gray-800 mb-1">Customer Feedback/Ratings for Outlets</h2>
                <p className="text-gray-600 text-sm">
                  Outlet feedback analysis
                </p>
              </div>
            </div>
          </Link>

          {/* Outletwise Sale On/Off */}
          <Link to="/mis/report/outletwise-sale-toggle">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 cursor-pointer transform hover:-translate-y-2 border-t-4 border-cyan-500">
              <div className="flex flex-col items-center text-center">
                <div className="bg-cyan-100 p-3 rounded-full mb-3">
                  <ToggleLeft className="w-8 h-8 text-cyan-600" />
                </div>
                <h2 className="text-lg font-bold text-gray-800 mb-1">Outletwise Sale On/Off</h2>
                <p className="text-gray-600 text-sm">
                  Outlet sales status tracking
                </p>
              </div>
            </div>
          </Link>

          {/* Itemwise Sale On/Off */}
          <Link to="/mis/report/itemwise-sale-toggle">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 cursor-pointer transform hover:-translate-y-2 border-t-4 border-emerald-500">
              <div className="flex flex-col items-center text-center">
                <div className="bg-emerald-100 p-3 rounded-full mb-3">
                  <ToggleRight className="w-8 h-8 text-emerald-600" />
                </div>
                <h2 className="text-lg font-bold text-gray-800 mb-1">Itemwise Sale On/Off</h2>
                <p className="text-gray-600 text-sm">
                  Item availability tracking
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Report;
