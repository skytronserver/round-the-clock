import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ToggleRight, Package } from 'lucide-react';
import Navbar from '@/components/Navbar';

const ItemwiseSaleToggleReport = () => {
  const [data] = useState([
    { id: 1, itemName: 'Margherita Pizza', category: 'Pizza', status: 'On', reason: 'Available' },
    { id: 2, itemName: 'Chicken Biryani', category: 'Main Course', status: 'Off', reason: 'Out of Stock' },
    { id: 3, itemName: 'Ice Cream Cup', category: 'Dessert', status: 'On', reason: 'Available' },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100">
      <Navbar />
      <div className="container mx-auto px-4 pt-32 pb-12">
        <div className="mb-8">
          <Link to="/mis/report" className="inline-flex items-center text-emerald-600 hover:text-emerald-800 font-medium">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Reports
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <div className="bg-emerald-100 p-3 rounded-full mr-4">
              <ToggleRight className="w-8 h-8 text-emerald-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Itemwise Sale On/Off</h1>
              <p className="text-gray-600">Track which items are currently available for sale</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Item Name</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Category</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Sale Status</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Reason / Notes</th>
                </tr>
              </thead>
              <tbody>
                {data.map(row => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    <td className="border border-gray-200 px-4 py-3 font-medium text-gray-900 flex items-center gap-2">
                      <Package className="w-4 h-4 text-emerald-500" />
                      {row.itemName}
                    </td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">{row.category}</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                        row.status === 'On'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {row.status === 'On' ? 'Sale On' : 'Sale Off'}
                      </span>
                    </td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">{row.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemwiseSaleToggleReport;
