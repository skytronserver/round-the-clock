import { Link } from 'react-router-dom';
import { ArrowLeft, Carrot, ChefHat, Package, Utensils } from 'lucide-react';
import Navbar from '@/components/Navbar';

const CompanyInventory = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <Navbar />
      <div className="container mx-auto px-4 pt-32 pb-12">
        <div className="mb-8">
          <Link to="/mis/inventory" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Inventory
          </Link>
        </div>

        <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">
          Company Inventory
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Choose inventory type to manage
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {/* Raw Ingredients */}
          <Link to="/mis/inventory/company/raw-ingredients">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 cursor-pointer transform hover:-translate-y-2 border-l-4 border-blue-500">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Carrot className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-2">Raw Ingredients</h2>
                  <p className="text-gray-600 text-sm">
                    Manage raw materials and ingredients inventory
                  </p>
                </div>
              </div>
            </div>
          </Link>

          {/* Ready-Made Items */}
          <Link to="/mis/inventory/company/ready-made">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 cursor-pointer transform hover:-translate-y-2 border-l-4 border-indigo-500">
              <div className="flex items-start gap-4">
                <div className="bg-indigo-100 p-3 rounded-lg">
                  <Package className="w-8 h-8 text-indigo-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-2">Ready-Made Items</h2>
                  <p className="text-gray-600 text-sm">
                    Purchased/stocked items (beverages, packaged goods)
                  </p>
                </div>
              </div>
            </div>
          </Link>

          {/* Item Mix */}
          <Link to="/mis/inventory/company/item-mix">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 cursor-pointer transform hover:-translate-y-2 border-l-4 border-orange-500">
              <div className="flex items-start gap-4">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <ChefHat className="w-8 h-8 text-orange-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-2">Item Mix</h2>
                  <p className="text-gray-600 text-sm">
                    Items created from raw ingredients (sauces, dough, mixes)
                  </p>
                </div>
              </div>
            </div>
          </Link>

          {/* Complete Items */}
          <Link to="/mis/inventory/company/complete-items">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 cursor-pointer transform hover:-translate-y-2 border-l-4 border-purple-500">
              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Utensils className="w-8 h-8 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-2">Complete Items</h2>
                  <p className="text-gray-600 text-sm">
                    Final products ready to sell (pizza, biryani, meals)
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

export default CompanyInventory;
