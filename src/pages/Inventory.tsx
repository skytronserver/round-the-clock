import { Link } from 'react-router-dom';
import { ArrowLeft, Building2, Store } from 'lucide-react';
import Navbar from '@/components/Navbar';

const Inventory = () => {
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
          Inventory Management
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Choose inventory type to manage
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Company Inventory */}
          <Link to="/mis/inventory/company">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 cursor-pointer transform hover:-translate-y-2 border-l-4 border-blue-500">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Building2 className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-2">Company Inventory</h2>
                  <p className="text-gray-600 text-sm">
                    Manage centralized warehouse and storage inventory
                  </p>
                </div>
              </div>
            </div>
          </Link>

          {/* Outlet Inventory */}
          <Link to="/mis/inventory/outlet">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 cursor-pointer transform hover:-translate-y-2 border-l-4 border-green-500">
              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Store className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-2">Outlet Inventory</h2>
                  <p className="text-gray-600 text-sm">
                    Manage individual outlet stock levels
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

export default Inventory;
