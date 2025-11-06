import { Link } from 'react-router-dom';
import { ArrowLeft, Store, Carrot, UtensilsCrossed, ChefHat } from 'lucide-react';
import Navbar from '@/components/Navbar';

const Settings = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <Navbar />
      <div className="container mx-auto px-4 pt-32 pb-12">
        <div className="mb-8">
          <Link to="/mis" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to MIS Dashboard
          </Link>
        </div>

        <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">
          Settings
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Configure your system settings
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Create Outlet */}
          <Link to="/mis/settings/create-outlet">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 cursor-pointer transform hover:-translate-y-2 border-l-4 border-blue-500">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Store className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-2">Create Outlet</h2>
                  <p className="text-gray-600 text-sm">
                    Add and manage outlet locations
                  </p>
                </div>
              </div>
            </div>
          </Link>

          {/* Set/Create Raw Ingredients */}
          <Link to="/mis/settings/raw-ingredients">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 cursor-pointer transform hover:-translate-y-2 border-l-4 border-green-500">
              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Carrot className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-2">Set/Create Raw Ingredients</h2>
                  <p className="text-gray-600 text-sm">
                    Manage raw ingredients inventory
                  </p>
                </div>
              </div>
            </div>
          </Link>

          {/* Set/Create Ready to Sale Item */}
          <Link to="/mis/settings/ready-to-sale">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 cursor-pointer transform hover:-translate-y-2 border-l-4 border-purple-500">
              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <UtensilsCrossed className="w-8 h-8 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-2">Set/Create Ready to Sale Item</h2>
                  <p className="text-gray-600 text-sm">
                    Configure ready-to-sale products
                  </p>
                </div>
              </div>
            </div>
          </Link>

          {/* Set/Create Freshly Prepared Dishes */}
          <Link to="/mis/settings/freshly-prepared">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 cursor-pointer transform hover:-translate-y-2 border-l-4 border-orange-500">
              <div className="flex items-start gap-4">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <ChefHat className="w-8 h-8 text-orange-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-2">Set/Create Freshly Prepared Dishes</h2>
                  <p className="text-gray-600 text-sm">
                    Manage freshly prepared menu items
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

export default Settings;
