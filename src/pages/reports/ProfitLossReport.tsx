import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, DollarSign, Download, Filter, TrendingUp } from 'lucide-react';
import Navbar from '@/components/Navbar';

const ProfitLossReport = () => {
  const [period, setPeriod] = useState('monthly');

  const sampleData = [
    {
      id: 1,
      period: 'Jan 2025',
      sales: 250000,
      costOfGoods: 140000,
      operatingExpenses: 60000,
      profit: 50000,
    },
    {
      id: 2,
      period: 'Feb 2025',
      sales: 220000,
      costOfGoods: 130000,
      operatingExpenses: 55000,
      profit: 35000,
    },
    {
      id: 3,
      period: 'Mar 2025',
      sales: 270000,
      costOfGoods: 150000,
      operatingExpenses: 65000,
      profit: 55000,
    },
  ];

  const totalSales = sampleData.reduce((sum, r) => sum + r.sales, 0);
  const totalProfit = sampleData.reduce((sum, r) => sum + r.profit, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100">
      <Navbar />
      <div className="container mx-auto px-4 pt-32 pb-12">
        <div className="mb-8">
          <Link to="/mis/report" className="inline-flex items-center text-purple-600 hover:text-purple-800 font-medium">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Reports
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <div className="bg-purple-100 p-3 rounded-full mr-4">
              <DollarSign className="w-8 h-8 text-purple-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Profit & Loss Report</h1>
              <p className="text-gray-600">Financial performance overview</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Total Sales</p>
              <p className="text-2xl font-bold text-gray-900">Rs.{totalSales.toLocaleString()}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Total Profit</p>
              <p className="text-2xl font-bold text-gray-900">Rs.{totalProfit.toLocaleString()}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Profit Margin</p>
              <p className="text-2xl font-bold text-gray-900">
                {totalSales > 0 ? ((totalProfit / totalSales) * 100).toFixed(1) : '0.0'}%
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Report Period</label>
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
            <div className="flex items-end">
              <button className="w-full bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors flex items-center justify-center">
                <Filter className="w-4 h-4 mr-2" />
                Apply Filters
              </button>
            </div>
            <div className="md:col-span-2 flex items-end justify-end">
              <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors flex items-center">
                <Download className="w-4 h-4 mr-2" />
                Export to CSV
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Period</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Sales</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Cost of Goods</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Operating Expenses</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Profit</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Profit Margin</th>
                </tr>
              </thead>
              <tbody>
                {sampleData.map(row => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    <td className="border border-gray-200 px-4 py-3 font-medium text-gray-900">{row.period}</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">Rs.{row.sales.toLocaleString()}</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">Rs.{row.costOfGoods.toLocaleString()}</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">Rs.{row.operatingExpenses.toLocaleString()}</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">Rs.{row.profit.toLocaleString()}</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700 flex items-center gap-1">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      {((row.profit / row.sales) * 100).toFixed(1)}%
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

export default ProfitLossReport;
