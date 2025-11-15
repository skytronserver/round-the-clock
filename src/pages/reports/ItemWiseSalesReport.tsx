import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Package, Download, Filter } from 'lucide-react';
import Navbar from '@/components/Navbar';

const ItemWiseSalesReport = () => {
  const [category, setCategory] = useState('all');

  const categories = ['all', 'Pizza', 'Main Course', 'Beverages'];

  const sampleData = [
    { id: 1, itemName: 'Margherita Pizza', category: 'Pizza', quantitySold: 180, totalSales: 72000 },
    { id: 2, itemName: 'Chicken Biryani', category: 'Main Course', quantitySold: 120, totalSales: 84000 },
    { id: 3, itemName: 'Veg Burger', category: 'Main Course', quantitySold: 95, totalSales: 38000 },
    { id: 4, itemName: 'Coca-Cola 300ml', category: 'Beverages', quantitySold: 240, totalSales: 28800 },
  ];

  const filteredData = category === 'all'
    ? sampleData
    : sampleData.filter(item => item.category === category);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      <Navbar />
      <div className="container mx-auto px-4 pt-32 pb-12">
        <div className="mb-8">
          <Link to="/mis/report" className="inline-flex items-center text-orange-600 hover:text-orange-800 font-medium">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Reports
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <div className="bg-orange-100 p-3 rounded-full mr-4">
              <Package className="w-8 h-8 text-orange-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Item-wise Sales Report</h1>
              <p className="text-gray-600">Detailed sales by menu item</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <button className="w-full bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors flex items-center justify-center">
                <Filter className="w-4 h-4 mr-2" />
                Apply Filters
              </button>
            </div>
            <div className="md:col-span-2 flex items-end justify-end">
              <button className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors flex items-center">
                <Download className="w-4 h-4 mr-2" />
                Export to CSV
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Item Name</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Category</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Quantity Sold</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Total Sales</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map(row => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    <td className="border border-gray-200 px-4 py-3 font-medium text-gray-900">{row.itemName}</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">{row.category}</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">{row.quantitySold}</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">Rs.{row.totalSales.toLocaleString()}</td>
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

export default ItemWiseSalesReport;
