import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Download, Filter, BarChart3 } from 'lucide-react';
import Navbar from '@/components/Navbar';

const OutletReport = () => {
  const [selectedOutlet, setSelectedOutlet] = useState('all');

  const outlets = ['all', 'Downtown Branch', 'Mall Branch', 'Airport Branch'];

  const sampleData = [
    {
      id: 1,
      outlet: 'Downtown Branch',
      totalSales: 152340,
      totalOrders: 420,
      avgOrderValue: 363,
      bestItem: 'Margherita Pizza',
      customerRating: 4.5,
      status: 'Online'
    },
    {
      id: 2,
      outlet: 'Mall Branch',
      totalSales: 98340,
      totalOrders: 280,
      avgOrderValue: 351,
      bestItem: 'Chicken Biryani',
      customerRating: 4.2,
      status: 'Online'
    },
    {
      id: 3,
      outlet: 'Airport Branch',
      totalSales: 56320,
      totalOrders: 140,
      avgOrderValue: 402,
      bestItem: 'Veg Sandwich',
      customerRating: 4.0,
      status: 'Offline'
    }
  ];

  const filteredData = selectedOutlet === 'all'
    ? sampleData
    : sampleData.filter(item => item.outlet === selectedOutlet);

  const totalSales = filteredData.reduce((sum, o) => sum + o.totalSales, 0);
  const totalOrders = filteredData.reduce((sum, o) => sum + o.totalOrders, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <Navbar />
      <div className="container mx-auto px-4 pt-32 pb-12">
        <div className="mb-8">
          <Link to="/mis/report" className="inline-flex items-center text-green-600 hover:text-green-800 font-medium">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Reports
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <MapPin className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Outlet Performance Report</h1>
              <p className="text-gray-600">Compare sales and ratings across outlets</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Total Sales</p>
              <p className="text-2xl font-bold text-gray-900">Rs.{totalSales.toLocaleString()}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{totalOrders.toLocaleString()}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Average Rating</p>
              <p className="text-2xl font-bold text-gray-900">
                {filteredData.length > 0
                  ? (filteredData.reduce((sum, o) => sum + o.customerRating, 0) / filteredData.length).toFixed(1)
                  : '0.0'}
                /5
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Outlet</label>
              <select
                value={selectedOutlet}
                onChange={(e) => setSelectedOutlet(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {outlets.map(outlet => (
                  <option key={outlet} value={outlet}>
                    {outlet === 'all' ? 'All Outlets' : outlet}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <button className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center">
                <Filter className="w-4 h-4 mr-2" />
                Apply Filters
              </button>
            </div>
            <div className="flex items-end justify-end">
              <button className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center">
                <Download className="w-4 h-4 mr-2" />
                Export to CSV
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Outlet</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Total Sales</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Total Orders</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Avg Order Value</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Best Selling Item</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Customer Rating</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map(row => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    <td className="border border-gray-200 px-4 py-3 font-medium text-gray-900">{row.outlet}</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">Rs.{row.totalSales.toLocaleString()}</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">{row.totalOrders}</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">Rs.{row.avgOrderValue}</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">{row.bestItem}</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">{row.customerRating.toFixed(1)}/5</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700 flex items-center gap-2">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                          row.status === 'Online'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        <BarChart3 className="w-3 h-3 mr-1" />
                        {row.status}
                      </span>
                    </td>
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

export default OutletReport;
