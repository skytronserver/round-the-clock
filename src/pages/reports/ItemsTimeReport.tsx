import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Download, Filter } from 'lucide-react';
import Navbar from '@/components/Navbar';

const ItemsTimeReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedOutlet, setSelectedOutlet] = useState('all');

  // Sample data - replace with actual data from your backend
  const sampleData = [
    {
      id: 1,
      itemName: 'Margherita Pizza',
      category: 'Pizza',
      preparationTime: '15 mins',
      avgOrderTime: '12:30 PM',
      peakHours: '7:00 PM - 9:00 PM',
      totalOrders: 45,
      outlet: 'Downtown Branch'
    },
    {
      id: 2,
      itemName: 'Chicken Biryani',
      category: 'Main Course',
      preparationTime: '25 mins',
      avgOrderTime: '1:15 PM',
      peakHours: '12:00 PM - 2:00 PM',
      totalOrders: 32,
      outlet: 'Mall Branch'
    },
    {
      id: 3,
      itemName: 'Caesar Salad',
      category: 'Salads',
      preparationTime: '8 mins',
      avgOrderTime: '2:45 PM',
      peakHours: '1:00 PM - 3:00 PM',
      totalOrders: 18,
      outlet: 'Downtown Branch'
    }
  ];

  const outlets = ['all', 'Downtown Branch', 'Mall Branch', 'Airport Branch'];

  const filteredData = selectedOutlet === 'all' 
    ? sampleData 
    : sampleData.filter(item => item.outlet === selectedOutlet);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <Navbar />
      <div className="container mx-auto px-4 pt-32 pb-12">
        <div className="mb-8">
          <Link to="/mis/report" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Reports
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Items Time Report</h1>
              <p className="text-gray-600">Analyze item preparation times and ordering patterns</p>
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Outlet</label>
              <select
                value={selectedOutlet}
                onChange={(e) => setSelectedOutlet(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {outlets.map(outlet => (
                  <option key={outlet} value={outlet}>
                    {outlet === 'all' ? 'All Outlets' : outlet}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center">
                <Filter className="w-4 h-4 mr-2" />
                Apply Filters
              </button>
            </div>
          </div>

          {/* Export Button */}
          <div className="flex justify-end mb-6">
            <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Export to CSV
            </button>
          </div>

          {/* Data Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Item Name</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Category</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Prep Time</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Avg Order Time</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Peak Hours</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Total Orders</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Outlet</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="border border-gray-200 px-4 py-3 font-medium text-gray-900">{item.itemName}</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">{item.category}</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">{item.preparationTime}</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">{item.avgOrderTime}</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">{item.peakHours}</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">{item.totalOrders}</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">{item.outlet}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredData.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No data available for the selected filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemsTimeReport;
