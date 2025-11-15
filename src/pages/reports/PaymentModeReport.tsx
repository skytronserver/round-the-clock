import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CreditCard, Download, Filter } from 'lucide-react';
import Navbar from '@/components/Navbar';

const PaymentModeReport = () => {
  const [period, setPeriod] = useState('today');

  const sampleData = [
    { id: 1, mode: 'Cash', transactions: 120, amount: 85000, share: 45 },
    { id: 2, mode: 'UPI', transactions: 95, amount: 72000, share: 38 },
    { id: 3, mode: 'Card', transactions: 35, amount: 31000, share: 17 },
  ];

  const totalAmount = sampleData.reduce((sum, row) => sum + row.amount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-100">
      <Navbar />
      <div className="container mx-auto px-4 pt-32 pb-12">
        <div className="mb-8">
          <Link to="/mis/report" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Reports
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <div className="bg-indigo-100 p-3 rounded-full mr-4">
              <CreditCard className="w-8 h-8 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Payment Mode Report</h1>
              <p className="text-gray-600">Analyze payment method usage</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Period</label>
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
            <div className="flex items-end">
              <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center">
                <Filter className="w-4 h-4 mr-2" />
                Apply Filters
              </button>
            </div>
            <div className="md:col-span-2 flex items-end justify-end">
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors flex items-center">
                <Download className="w-4 h-4 mr-2" />
                Export to CSV
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-indigo-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Total Collection</p>
              <p className="text-2xl font-bold text-gray-900">Rs.{totalAmount.toLocaleString()}</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Payment Mode</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Transactions</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Amount</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Share</th>
                </tr>
              </thead>
              <tbody>
                {sampleData.map(row => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    <td className="border border-gray-200 px-4 py-3 font-medium text-gray-900">{row.mode}</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">{row.transactions}</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">Rs.{row.amount.toLocaleString()}</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">{row.share}%</td>
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

export default PaymentModeReport;
