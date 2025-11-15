import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Download, Filter } from 'lucide-react';
import Navbar from '@/components/Navbar';

const DailySalesReport = () => {
  const [date, setDate] = useState('');

  const sampleData = [
    { id: 1, date: '2025-03-01', totalOrders: 120, totalSales: 98000, avgOrderValue: 817 },
    { id: 2, date: '2025-03-02', totalOrders: 95, totalSales: 74000, avgOrderValue: 779 },
    { id: 3, date: '2025-03-03', totalOrders: 135, totalSales: 112000, avgOrderValue: 830 },
  ];

  const filteredData = date
    ? sampleData.filter(row => row.date === date)
    : sampleData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100">
      <Navbar />
      <div className="container mx-auto px-4 pt-32 pb-12">
        <div className="mb-8">
          <Link to="/mis/report" className="inline-flex items-center text-red-600 hover:text-red-800 font-medium">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Reports
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <div className="bg-red-100 p-3 rounded-full mr-4">
              <Calendar className="w-8 h-8 text-red-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Daily Sales Report</h1>
              <p className="text-gray-600">Day-wise sales performance</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-end">
              <button className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors flex items-center justify-center">
                <Filter className="w-4 h-4 mr-2" />
                Apply Filters
              </button>
            </div>
            <div className="md:col-span-2 flex items-end justify-end">
              <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors flex items-center">
                <Download className="w-4 h-4 mr-2" />
                Export to CSV
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Date</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Total Orders</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Total Sales</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Avg Order Value</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map(row => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    <td className="border border-gray-200 px-4 py-3 font-medium text-gray-900">{row.date}</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">{row.totalOrders}</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">Rs.{row.totalSales.toLocaleString()}</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">Rs.{row.avgOrderValue}</td>
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

export default DailySalesReport;
