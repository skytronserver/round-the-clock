import { Link } from 'react-router-dom';
import { ArrowLeft, Star } from 'lucide-react';
import Navbar from '@/components/Navbar';

const BestSellingItemsReport = () => {
  const sampleData = [
    { id: 1, itemName: 'Margherita Pizza', category: 'Pizza', quantitySold: 180, revenue: 72000, share: 24 },
    { id: 2, itemName: 'Chicken Biryani', category: 'Main Course', quantitySold: 150, revenue: 105000, share: 28 },
    { id: 3, itemName: 'Paneer Tikka', category: 'Starters', quantitySold: 110, revenue: 49500, share: 13 },
    { id: 4, itemName: 'Coca-Cola 300ml', category: 'Beverages', quantitySold: 260, revenue: 31200, share: 8 },
  ];

  const totalRevenue = sampleData.reduce((sum, item) => sum + item.revenue, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100">
      <Navbar />
      <div className="container mx-auto px-4 pt-32 pb-12">
        <div className="mb-8">
          <Link to="/mis/report" className="inline-flex items-center text-yellow-600 hover:text-yellow-800 font-medium">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Reports
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <div className="bg-yellow-100 p-3 rounded-full mr-4">
              <Star className="w-8 h-8 text-yellow-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Best-selling Items</h1>
              <p className="text-gray-600">Top performing products</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Total Revenue from Top Items</p>
              <p className="text-2xl font-bold text-gray-900">Rs.{totalRevenue.toLocaleString()}</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Number of Top Items</p>
              <p className="text-2xl font-bold text-gray-900">{sampleData.length}</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Best Performer</p>
              <p className="text-2xl font-bold text-gray-900">{sampleData[1].itemName}</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Rank</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Item Name</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Category</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Quantity Sold</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Revenue</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Share of Revenue</th>
                </tr>
              </thead>
              <tbody>
                {sampleData.map((row, index) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">#{index + 1}</td>
                    <td className="border border-gray-200 px-4 py-3 font-medium text-gray-900">{row.itemName}</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">{row.category}</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">{row.quantitySold}</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">Rs.{row.revenue.toLocaleString()}</td>
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

export default BestSellingItemsReport;
