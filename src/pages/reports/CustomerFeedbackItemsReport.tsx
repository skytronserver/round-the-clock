import { Link } from 'react-router-dom';
import { ArrowLeft, MessageSquare, Star } from 'lucide-react';
import Navbar from '@/components/Navbar';

const CustomerFeedbackItemsReport = () => {
  const sampleData = [
    { id: 1, itemName: 'Margherita Pizza', avgRating: 4.6, totalReviews: 58, positiveShare: 82 },
    { id: 2, itemName: 'Chicken Biryani', avgRating: 4.4, totalReviews: 43, positiveShare: 79 },
    { id: 3, itemName: 'Veg Burger', avgRating: 4.1, totalReviews: 31, positiveShare: 73 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-pink-100">
      <Navbar />
      <div className="container mx-auto px-4 pt-32 pb-12">
        <div className="mb-8">
          <Link to="/mis/report" className="inline-flex items-center text-pink-600 hover:text-pink-800 font-medium">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Reports
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <div className="bg-pink-100 p-3 rounded-full mr-4">
              <MessageSquare className="w-8 h-8 text-pink-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Customer Feedback for Items</h1>
              <p className="text-gray-600">Item-wise ratings and reviews summary</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Item Name</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Average Rating</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Total Reviews</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Positive Feedback</th>
                </tr>
              </thead>
              <tbody>
                {sampleData.map(row => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    <td className="border border-gray-200 px-4 py-3 font-medium text-gray-900">{row.itemName}</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700 flex items-center gap-1">
                      {row.avgRating.toFixed(1)}
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    </td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">{row.totalReviews}</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">{row.positiveShare}% positive</td>
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

export default CustomerFeedbackItemsReport;
