import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Plus, Edit, Trash2, Eye } from 'lucide-react';
import Navbar from '@/components/Navbar';

const EventBasedOffers = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    eventName: '',
    offerTitle: '',
    discountType: 'percentage',
    discountValue: '',
    startDate: '',
    endDate: '',
    applicableItems: '',
    minOrderValue: '',
    maxDiscount: '',
    description: ''
  });

  // Sample data - replace with actual data from your backend
  const sampleOffers = [
    {
      id: 1,
      eventName: 'Diwali Festival',
      offerTitle: '25% Off on All Orders',
      discountType: 'percentage',
      discountValue: 25,
      startDate: '2024-11-01',
      endDate: '2024-11-05',
      status: 'active',
      applicableItems: 'All Items',
      minOrderValue: 500,
      maxDiscount: 200,
      totalUsed: 45
    },
    {
      id: 2,
      eventName: 'Christmas Special',
      offerTitle: 'Buy 2 Get 1 Free',
      discountType: 'bogo',
      discountValue: 0,
      startDate: '2024-12-20',
      endDate: '2024-12-26',
      status: 'scheduled',
      applicableItems: 'Desserts',
      minOrderValue: 0,
      maxDiscount: 0,
      totalUsed: 0
    },
    {
      id: 3,
      eventName: 'New Year Celebration',
      offerTitle: 'Flat ₹100 Off',
      discountType: 'fixed',
      discountValue: 100,
      startDate: '2024-12-31',
      endDate: '2025-01-02',
      status: 'scheduled',
      applicableItems: 'All Items',
      minOrderValue: 800,
      maxDiscount: 100,
      totalUsed: 0
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    setShowCreateForm(false);
    // Reset form
    setFormData({
      eventName: '',
      offerTitle: '',
      discountType: 'percentage',
      discountValue: '',
      startDate: '',
      endDate: '',
      applicableItems: '',
      minOrderValue: '',
      maxDiscount: '',
      description: ''
    });
  };

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      active: 'bg-green-100 text-green-800',
      scheduled: 'bg-blue-100 text-blue-800',
      expired: 'bg-red-100 text-red-800'
    };
    return statusStyles[status as keyof typeof statusStyles] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <Navbar />
      <div className="container mx-auto px-4 pt-32 pb-12">
        <div className="mb-8">
          <Link to="/mis/promotion" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Promotions
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Event-based Offers</h1>
                <p className="text-gray-600">Create and manage special occasion promotions</p>
              </div>
            </div>
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create New Offer
            </button>
          </div>

          {/* Create Form Modal */}
          {showCreateForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Event-based Offer</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Event Name</label>
                      <input
                        type="text"
                        name="eventName"
                        value={formData.eventName}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Offer Title</label>
                      <input
                        type="text"
                        name="offerTitle"
                        value={formData.offerTitle}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Discount Type</label>
                      <select
                        name="discountType"
                        value={formData.discountType}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="percentage">Percentage</option>
                        <option value="fixed">Fixed Amount</option>
                        <option value="bogo">Buy One Get One</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Discount Value</label>
                      <input
                        type="number"
                        name="discountValue"
                        value={formData.discountValue}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required={formData.discountType !== 'bogo'}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                      <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                      <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex justify-end space-x-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowCreateForm(false)}
                      className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Create Offer
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Offers List */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Event Name</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Offer Title</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Discount</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Duration</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Status</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Usage</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sampleOffers.map((offer) => (
                  <tr key={offer.id} className="hover:bg-gray-50">
                    <td className="border border-gray-200 px-4 py-3 font-medium text-gray-900">{offer.eventName}</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">{offer.offerTitle}</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">
                      {offer.discountType === 'percentage' ? `${offer.discountValue}%` :
                       offer.discountType === 'fixed' ? `₹${offer.discountValue}` : 'BOGO'}
                    </td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">
                      {offer.startDate} to {offer.endDate}
                    </td>
                    <td className="border border-gray-200 px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(offer.status)}`}>
                        {offer.status.charAt(0).toUpperCase() + offer.status.slice(1)}
                      </span>
                    </td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">{offer.totalUsed} times</td>
                    <td className="border border-gray-200 px-4 py-3">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-800">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
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

export default EventBasedOffers;
