import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ToggleLeft, MapPin } from 'lucide-react';
import Navbar from '@/components/Navbar';

const OutletwiseSaleToggleReport = () => {
  const [data] = useState([
    { id: 1, outlet: 'Downtown Branch', status: 'On', reason: 'Normal Operations' },
    { id: 2, outlet: 'Mall Branch', status: 'On', reason: 'Normal Operations' },
    { id: 3, outlet: 'Airport Branch', status: 'Off', reason: 'Maintenance' },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-cyan-100">
      <Navbar />
      <div className="container mx-auto px-4 pt-32 pb-12">
        <div className="mb-8">
          <Link to="/mis/report" className="inline-flex items-center text-cyan-600 hover:text-cyan-800 font-medium">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Reports
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <div className="bg-cyan-100 p-3 rounded-full mr-4">
              <ToggleLeft className="w-8 h-8 text-cyan-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Outletwise Sale On/Off</h1>
              <p className="text-gray-600">Track which outlets are open for sale</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Outlet</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Sale Status</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Reason / Notes</th>
                </tr>
              </thead>
              <tbody>
                {data.map(row => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    <td className="border border-gray-200 px-4 py-3 font-medium text-gray-900 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-cyan-500" />
                      {row.outlet}
                    </td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                        row.status === 'On'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {row.status === 'On' ? 'Sale On' : 'Sale Off'}
                      </span>
                    </td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">{row.reason}</td>
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

export default OutletwiseSaleToggleReport;
