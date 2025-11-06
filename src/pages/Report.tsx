import { Link } from 'react-router-dom';
import { ArrowLeft, Package, TrendingUp, BarChart3, AlertCircle, Receipt } from 'lucide-react';
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
          {/* Item-Wise Report */}
          <Link to="/mis/report/item-wise">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 cursor-pointer transform hover:-translate-y-2 border-t-4 border-blue-500">
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-100 p-3 rounded-full mb-3">
                  <Package className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-lg font-bold text-gray-800 mb-1">Item-Wise</h2>
                <p className="text-gray-600 text-sm">
                  View item-wise sales and inventory
                </p>
              </div>
            </div>
          </Link>

          {/* Sales Report */}
          <Link to="/mis/report/sales">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 cursor-pointer transform hover:-translate-y-2 border-t-4 border-green-500">
              <div className="flex flex-col items-center text-center">
                <div className="bg-green-100 p-3 rounded-full mb-3">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-lg font-bold text-gray-800 mb-1">Sales</h2>
                <p className="text-gray-600 text-sm">
                  Analyze sales performance
                </p>
              </div>
            </div>
          </Link>

          {/* Analytics Report */}
          <Link to="/mis/report/analytics">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 cursor-pointer transform hover:-translate-y-2 border-t-4 border-purple-500">
              <div className="flex flex-col items-center text-center">
                <div className="bg-purple-100 p-3 rounded-full mb-3">
                  <BarChart3 className="w-8 h-8 text-purple-600" />
                </div>
                <h2 className="text-lg font-bold text-gray-800 mb-1">Analytics</h2>
                <p className="text-gray-600 text-sm">
                  Advanced business analytics
                </p>
              </div>
            </div>
          </Link>

          {/* Expiry Report */}
          <Link to="/mis/report/expiry">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 cursor-pointer transform hover:-translate-y-2 border-t-4 border-orange-500">
              <div className="flex flex-col items-center text-center">
                <div className="bg-orange-100 p-3 rounded-full mb-3">
                  <AlertCircle className="w-8 h-8 text-orange-600" />
                </div>
                <h2 className="text-lg font-bold text-gray-800 mb-1">Expiry Report</h2>
                <p className="text-gray-600 text-sm">
                  Track expiring inventory
                </p>
              </div>
            </div>
          </Link>

          {/* Bills Report */}
          <Link to="/mis/report/bills">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 cursor-pointer transform hover:-translate-y-2 border-t-4 border-red-500">
              <div className="flex flex-col items-center text-center">
                <div className="bg-red-100 p-3 rounded-full mb-3">
                  <Receipt className="w-8 h-8 text-red-600" />
                </div>
                <h2 className="text-lg font-bold text-gray-800 mb-1">Bills</h2>
                <p className="text-gray-600 text-sm">
                  View all bills and invoices
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
