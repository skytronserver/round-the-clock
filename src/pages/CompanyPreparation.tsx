import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ChefHat, 
  Beaker, 
  Package2, 
  Clock, 
  Users, 
  BarChart3
} from 'lucide-react';
import Navbar from '@/components/Navbar';

const CompanyPreparation = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100">
      <Navbar />
      <div className="container mx-auto px-4 pt-32 pb-12">
        <div className="mb-8">
          <Link to="/mis" className="inline-flex items-center text-yellow-600 hover:text-yellow-800 font-medium">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to MIS Dashboard
          </Link>
        </div>

        <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">
          Company Preparation Center
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Centralized production and item creation facility
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Create Item Mixes */}
          <Link to="/mis/company-item-preparation">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 cursor-pointer transform hover:-translate-y-2 border-t-4 border-blue-500">
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-100 p-4 rounded-full mb-4">
                  <Beaker className="w-12 h-12 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Create Item Mixes</h2>
                <p className="text-gray-600 text-sm">
                  Prepare sauces, spice mixes, and dough from raw ingredients
                </p>
              </div>
            </div>
          </Link>

          {/* Create Complete Items */}
          <Link to="/mis/company-item-preparation">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 cursor-pointer transform hover:-translate-y-2 border-t-4 border-green-500">
              <div className="flex flex-col items-center text-center">
                <div className="bg-green-100 p-4 rounded-full mb-4">
                  <Package2 className="w-12 h-12 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Create Complete Items</h2>
                <p className="text-gray-600 text-sm">
                  Prepare final dishes ready for dispatch to outlets
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CompanyPreparation;
