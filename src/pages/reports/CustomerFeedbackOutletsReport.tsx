import { Link } from 'react-router-dom';
import { ArrowLeft, MessageSquare, MapPin, Star } from 'lucide-react';
import Navbar from '@/components/Navbar';

const CustomerFeedbackOutletsReport = () => {
  const sampleData = [
    { id: 1, outlet: 'Downtown Branch', avgRating: 4.5, totalReviews: 62, recommendationRate: 88 },
    { id: 2, outlet: 'Mall Branch', avgRating: 4.2, totalReviews: 47, recommendationRate: 82 },
    { id: 3, outlet: 'Airport Branch', avgRating: 4.0, totalReviews: 29, recommendationRate: 76 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100">
      <Navbar />
      <div className="container mx-auto px-4 pt-32 pb-12">
        <div className="mb-8">
          <Link to="/mis/report" className="inline-flex items-center text-teal-600 hover:text-teal-800 font-medium">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Reports
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <div className="bg-teal-100 p-3 rounded-full mr-4">
              <MapPin className="w-8 h-8 text-teal-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Customer Feedback for Outlets</h1>
              <p className="text-gray-600">Outlet-wise ratings and satisfaction</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Outlet</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Average Rating</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Total Reviews</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Recommendation Rate</th>
                </tr>
              </thead>
              <tbody>
                {sampleData.map(row => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    <td className="border border-gray-200 px-4 py-3 font-medium text-gray-900 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-teal-500" />
                      {row.outlet}
                    </td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700 flex items-center gap-1">
                      {row.avgRating.toFixed(1)}
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    </td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">{row.totalReviews}</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">{row.recommendationRate}%</td>
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

export default CustomerFeedbackOutletsReport;
