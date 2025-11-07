import { Link } from 'react-router-dom';
import { ArrowLeft, Building2, Store, CheckCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';

const Purchase = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <Navbar />
      <div className="container mx-auto px-4 pt-32 pb-12">
        <div className="mb-8">
          <Link to="/mis" className="inline-flex items-center text-green-600 hover:text-green-800 font-medium">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to MIS Dashboard
          </Link>
        </div>

        <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">
          Purchase Management
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Manage company and outlet purchases
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Company Purchase */}
          <Link to="/mis/purchase/company">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 cursor-pointer transform hover:-translate-y-2 border-l-4 border-blue-500">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Building2 className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-2">Company Purchase</h2>
                  <p className="text-gray-600 text-sm">
                    Manage centralized company-level purchases
                  </p>
                </div>
              </div>
            </div>
          </Link>

          {/* Outlet Purchase */}
          <Link to="/mis/purchase/outlet">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 cursor-pointer transform hover:-translate-y-2 border-l-4 border-green-500">
              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Store className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-2">Outlet Purchase</h2>
                  <p className="text-gray-600 text-sm">
                    Manage individual outlet purchases (requires approval)
                  </p>
                </div>
              </div>
            </div>
          </Link>

          {/* Purchase Approval */}
          <Link to="/mis/purchase/approval">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 cursor-pointer transform hover:-translate-y-2 border-l-4 border-purple-500">
              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <CheckCircle className="w-8 h-8 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-2">Purchase Approval</h2>
                  <p className="text-gray-600 text-sm">
                    Review and approve outlet purchase requests
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Purchase;
